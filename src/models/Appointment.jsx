class Appointment {
    constructor(id = null, status = "", patientName = "", doctorName = "", appointmentType = "", date = "") {
        this.id = id;
        this.status = status;
        this.patientName = patientName;
        this.doctorName = doctorName;
        this.appointmentType = appointmentType;
        this.date = date;
    }
}

export default Appointment;
