import React, { useEffect, useState } from "react";
import Appointment from "../models/Appointment";
import AppointmentService from "../shared/Appointment.service";

const AppointmentsList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const handleFetchData = async () => {
    const data = await AppointmentService.GetAppointments(searchQuery, 0, 50, "");
    setAppointments(
      data.map(
        (item) =>
          new Appointment(
            item.id,
            item.status,
            item.patientName,
            item.doctorName,
            item.appointmentType,
            item.date
          )
      )
    );
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleFetchData();
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const openModal = (appointment = null) => {
    if (appointment) {
      setIsAddingNew(false);
      setSelectedAppointment({ ...appointment });
    } else {
      setIsAddingNew(true);
      setSelectedAppointment(new Appointment());
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAppointment(null);
    setIsAddingNew(false);
  };

  const handleChange = (e) => {
    setSelectedAppointment({
      ...selectedAppointment,
      [e.target.name]: e.target.value,
    });
  };

  const saveChanges = async () => {
    if (isAddingNew) {
      if (await AppointmentService.AddAppointment(selectedAppointment)) {
        handleFetchData();
        closeModal();
      }
    } else {
      if (await AppointmentService.UpdateAppointment(selectedAppointment)) {
        handleFetchData();
        closeModal();
      }
    }
  };

  const deleteAppointment = async () => {
    if (await AppointmentService.DeleteAppointment(selectedAppointment.id)) {
      handleFetchData();
      closeModal();
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", position: "relative" }}>
      <h1>Consultas e Agendamentos</h1>
      
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Pesquise por nome paciente, médico, tipo de consulta..."
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          fontSize: "16px",
        }}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Scrollable Table */}
      <div
        style={{
          maxHeight: "75vh",
          overflowY: "auto",
          border: "1px solid #ddd",
          borderRadius: "5px",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f0f0f0", textAlign: "left" }}>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Nome do Paciente</th>
              <th style={thStyle}>Nome do Médico</th>
              <th style={thStyle}>Tipo de Consulta</th>
              <th style={thStyle}>Data</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr
                key={appointment.id}
                style={{ borderBottom: "1px solid #ddd", cursor: "pointer" }}
                onClick={() => openModal(appointment)}
              >
                <td style={tdStyle}>{appointment.status}</td>
                <td style={tdStyle}>{appointment.patientName}</td>
                <td style={tdStyle}>{appointment.doctorName}</td>
                <td style={tdStyle}>{appointment.appointmentType}</td>
                <td style={tdStyle}>{appointment.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={() => openModal()}
        style={floatingButtonStyle}
        title="Adicionar Nova Consulta"
      >
        +
      </button>

      {isModalOpen && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <h2>{isAddingNew ? "Nova Consulta" : "Editar Consulta"}</h2>
            <form>
              <div style={{ marginBottom: "10px" }}>
                <label>Status:</label>
                <input
                  type="text"
                  name="status"
                  value={selectedAppointment.status}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <label>Nome do Paciente:</label>
                <input
                  type="text"
                  name="patientName"
                  value={selectedAppointment.patientName}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <label>Nome do Médico:</label>
                <input
                  type="text"
                  name="doctorName"
                  value={selectedAppointment.doctorName}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <label>Tipo de Consulta:</label>
                <input
                  type="text"
                  name="appointmentType"
                  value={selectedAppointment.appointmentType}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <label>Data:</label>
                <input
                  type="date"
                  name="date"
                  value={selectedAppointment.date}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>
            </form>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {!isAddingNew && (
                <button onClick={deleteAppointment} style={deleteButtonStyle}>
                  Deletar
                </button>
              )}
              <button onClick={saveChanges} style={saveButtonStyle}>
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const thStyle = { padding: "10px", fontWeight: "bold", borderBottom: "2px solid #ddd" };
const tdStyle = { padding: "10px" };

const modalOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalStyle = {
  background: "#fff",
  padding: "20px",
  borderRadius: "5px",
  width: "400px",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
};

const inputStyle = {
  width: "100%",
  padding: "8px",
  marginTop: "5px",
  borderRadius: "4px",
  border: "1px solid #ddd",
};

const deleteButtonStyle = {
  backgroundColor: "#e74c3c",
  color: "#fff",
  padding: "10px 20px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const saveButtonStyle = {
  backgroundColor: "#2ecc71",
  color: "#fff",
  padding: "10px 20px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const floatingButtonStyle = {
  position: "fixed",
  bottom: "20px",
  right: "20px",
  width: "60px",
  height: "60px",
  backgroundColor: "#2ecc71",
  color: "#fff",
  borderRadius: "50%",
  border: "none",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  fontSize: "24px",
  cursor: "pointer",
  zIndex: 1000,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export default AppointmentsList;
