import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SettingsPage = () => {
    const [isModalInfoOpen, setisModalInfoOpen] = useState(false);
    const [ModalInfoState, setModalInfoState] = useState(false);
    const [isModalLogoutOpen, setIsModalLogoutOpen] = useState(false);
    const [isModalChangePasswordOpen, setIsModalChangePasswordOpen] = useState(false);


    const [currentPassword, setCurrentPassoword] = useState("");
    const [newPassword, setNewPassword] = useState("");


    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('authToken');
        navigate("/");
    }

    return (
        <div className='container-fluid'>
            <div onClick={() => { setIsModalChangePasswordOpen(true) }} className='row w-100'>
                <h4>Mudar de senha</h4>
            </div>
            <div onClick={() => { setIsModalLogoutOpen(true) }} className='row w-100'>
                <h4>Sair</h4>
            </div>
            {isModalLogoutOpen && (
                <div style={modalOverlayStyle}>
                    <div style={modalStyle}>
                        <div className="d-flex flex-row">
                            <h2>Tem certeza que deseja sair ?</h2>
                            <h2 className="ms-auto" style={{ cursor: "pointer" }} onClick={() => { setIsModalLogoutOpen(false); }}>x</h2>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <button onClick={logout} style={redButtonStyle}>
                                Sair
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {isModalChangePasswordOpen && (
                <div style={modalOverlayStyle}>
                    <div style={modalStyle}>
                        <div className="d-flex flex-row">
                            <h2>Nova Senha</h2>
                            <h2 className="ms-auto" style={{ cursor: "pointer" }} onClick={() => { setIsModalChangePasswordOpen(false); }}>x</h2>
                        </div>
                        <form>
                            <div style={{ marginBottom: "10px" }}>
                                <label>Senha atual</label>
                                <input
                                    type="password"
                                    value={currentPassword}
                                    style={inputStyle}
                                    onChange={(e) => { setCurrentPassoword(e.target.value) }}
                                />
                            </div>
                            <div style={{ marginBottom: "10px" }}>
                                <label>Nova senha</label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => { setNewPassword(e.target.value) }}
                                    style={inputStyle}
                                />
                            </div>
                        </form>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <button onClick={() => { }} style={greenButtonStyle}>
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
                            {ModalInfoState ? <h5></h5> : <h5>Erro, tente novamente</h5>
                            }
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <button onClick={() => { setisModalInfoOpen(false); }} style={greenButtonStyle}>
                                Ok
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>);
};
const greenButtonStyle = {
    backgroundColor: "#2ecc71",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
};

const redButtonStyle = {
    backgroundColor: "#e74c3c",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
};

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

export default SettingsPage;
