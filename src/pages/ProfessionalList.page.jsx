import React, { useEffect, useState } from "react";
import Professional from "../models/Professional";
import ProfessionalService from "../shared/Professional.service";

const ProfessionalList = () => {



    const handleFetchData = async () => {
        const data = await ProfessionalService.GetProfessional(searchQuery, 0, 50, "");
        setProfessionals(data.map(item => new Professional(item.id, item.name, item.phone, item.userName, item.jobPosition, item.permission)))
    }

    useEffect(() => {
        handleFetchData();
    }, [])

    const [searchQuery, setSearchQuery] = useState("");
    useEffect(() => {
        setTimeout(() => { handleFetchData() }, 500);
    }, [searchQuery])

    const [professionals, setProfessionals] = useState([]);

    const [selectedProfessional, setSelectedProfessional] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddingNew, setIsAddingNew] = useState(false); // New state to track whether adding a new professional

    const [isModalInfoOpen, setisModalInfoOpen] = useState(false);
    const [ModalInfoState, setModalInfoState] = useState(false);
    const [firstTimePassword, setFirstTimePassword] = useState("");

    //   const filteredProfessionals = professionals.filter((prof) =>
    //     Object.values(prof).some((val) =>
    //       val.toString().toLowerCase().includes(searchQuery.toLowerCase())
    //     )
    //   );

    // Open the modal for editing or adding a new professional
    const openModal = (professional = null) => {
        if (professional) {
            setIsAddingNew(false); // Editing an existing professional
            setSelectedProfessional({ ...professional });
        } else {
            setIsAddingNew(true); // Adding a new professional
            setSelectedProfessional(new Professional());
        }
        setIsModalOpen(true);
    };

    // Close the modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProfessional(null);
        setIsAddingNew(false);
    };

    // Handle form changes
    const handleChange = (e) => {
        setSelectedProfessional({
            ...selectedProfessional,
            [e.target.name]: e.target.value,
        });
    };

    const resetPassword = async () => {
        let response = await ProfessionalService.ResetPasswordProfessional(selectedProfessional.id);
            if (response != null) {
                setFirstTimePassword(response);
                setModalInfoState(true);
                closeModal(true);
                setisModalInfoOpen(true);
            } else {
                setModalInfoState(false);
                setisModalInfoOpen(true);
            }
    }

    // Save changes or add a new professional
    const saveChanges = async () => {
        if (isAddingNew) {
            console.log(selectedProfessional);
            let response = await ProfessionalService.AddProfessional(selectedProfessional);
            if (response != null) {
                setFirstTimePassword(response);
                setModalInfoState(true);
                closeModal(true);
                setisModalInfoOpen(true);
            } else {
                setModalInfoState(false);
                setisModalInfoOpen(true);
            }

        } else {
            if (await ProfessionalService.UpdateProfessional(selectedProfessional)) {
                handleFetchData();
                closeModal(true);
            } else {
                setModalInfoState(false);
                setisModalInfoOpen(true);
            }
        }
        handleFetchData();
    };

    const deleteProfessional = async () => {
        if (await ProfessionalService.DeleteProfessional(selectedProfessional.id)) {
            handleFetchData();
            closeModal();
        } else {
            setModalInfoState(false);
            setisModalInfoOpen(true);
        }
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", position: "relative" }}>
            <h1>Funcionário</h1>

            {/* Search Bar */}
            <input
                type="text"
                placeholder="Pesquise por nome funcionário, cargo, documento..."
                style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "20px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    fontSize: "16px",
                }}
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); }}
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
                            <th style={thStyle}>Nome</th>
                            <th style={thStyle}>Nome de usário</th>
                            <th style={thStyle}>Telefone</th>
                            <th style={thStyle}>Cargo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {professionals.map((prof) => (
                            <tr
                                key={prof.id}
                                style={{ borderBottom: "1px solid #ddd", cursor: "pointer" }}
                                onClick={() => openModal(prof)}
                            >
                                <td style={tdStyle}>{prof.name}</td>
                                <td style={tdStyle}>{prof.username}</td>
                                <td style={tdStyle}>{prof.phone}</td>
                                <td style={tdStyle}>{prof.JobPosition}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <button
                onClick={() => openModal()}
                style={floatingButtonStyle}
                title="Add New Professional"
            >
                +
            </button>

            {isModalOpen && (
                <div style={modalOverlayStyle}>
                    <div style={modalStyle}>
                        <div className="d-flex flex-row">
                            <h2>{isAddingNew ? "Novo Professional" : "Editar Professional"}</h2>
                            <h2 className="ms-auto" style={{ cursor: "pointer" }} onClick={() => { setIsModalOpen(false); }}>x</h2>
                        </div>
                        <form>
                            <div style={{ marginBottom: "10px" }}>
                                <label>Nome:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={selectedProfessional.name}
                                    onChange={handleChange}
                                    style={inputStyle}
                                />
                            </div>
                            <div style={{ marginBottom: "10px" }}>
                                <label>UserName:</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={selectedProfessional.username}
                                    onChange={handleChange}
                                    style={inputStyle}
                                />
                            </div>
                            <div style={{ marginBottom: "10px" }}>
                                <label>Telefone:</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={selectedProfessional.phone}
                                    onChange={handleChange}
                                    style={inputStyle}
                                />
                            </div>
                            <div style={{ marginBottom: "10px" }}>
                                <label>Cargo:</label>
                                <input
                                    type="text"
                                    name="JobPosition"
                                    value={selectedProfessional.JobPosition}
                                    onChange={handleChange}
                                    style={inputStyle}
                                />
                            </div>
                            <div style={{ marginBottom: "10px" }}>
                                <label>Documento profissional:</label>
                                <input
                                    type="text"
                                    name="Permission"
                                    value={selectedProfessional.Permission}
                                    onChange={handleChange}
                                    style={inputStyle}
                                />
                            </div>
                        </form>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            {!isAddingNew && (
                                <button onClick={deleteProfessional} style={deleteButtonStyle}>
                                    Deletar
                                </button>
                            )}

                            {!isAddingNew && (
                                <button onClick={resetPassword} style={resetPasswordButtonStyle}>
                                    Resetar Senha
                                </button>
                            )}
                            <button onClick={saveChanges} style={saveButtonStyle}>
                                Salvar
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {isModalInfoOpen && (
                <div style={modalOverlayStyle}>
                    <div style={modalStyle}>
                        <div className="d-flex flex-row">
                            <h2>{ModalInfoState ? "Sucesso" : "Erro"}</h2>
                            <h2 className="ms-auto" style={{ cursor: "pointer" }} onClick={() => { setisModalInfoOpen(false); }}>x</h2>
                        </div>
                        <div>
                            {ModalInfoState ? <h5>Senha de primeiro acesso do profissional: {firstTimePassword}</h5> : <h5>Erro, tente novamente</h5>
                            }
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <button onClick={() => { setisModalInfoOpen(false); }} style={saveButtonStyle}>
                                Ok
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

const resetPasswordButtonStyle = {
    backgroundColor: "rgb(46 128 204)",
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

export default ProfessionalList;
