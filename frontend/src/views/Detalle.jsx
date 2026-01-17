import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { MyContext } from "../context/MyContext";

const Detalle = () => {
    const { id } = useParams();
    const { data, token } = useContext(MyContext);
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [mensaje, setMensaje] = useState("");

    const producto = data.find((p) => p.id === id);

    if (!producto) return <h2 className="text-center mt-5 text-light">Producto no encontrado 😢</h2>;

    const getDescription = (condition) => {
        switch (condition) {
            case "Nuevo":
                return `¡Totalmente nuevo y sellado! Lo vendo porque me regalaron dos en mi cumpleaños y no necesito este.
        
        Entrego en estación de metro a convenir o hago envíos por pagar. Tengo la boleta para la garantía.`;
            case "Usado":
                return `Vendo mi equipo por renovación. Tiene aproximadamente 6 meses de uso y funciona impecable. 
        
        Siempre se usó con cuidado. Precio conversable si vienes a buscarlo a mi domicilio.`;
            case "Caja Abierta":
                return `Producto de vitrina (exhibición). La caja fue abierta para mostrarlo en tienda, pero el producto nunca ha sido usado realmente.
        
        Está como nuevo, sin detalles, y con todos sus accesorios originales.`;
            default:
                return `Vendo este producto en excelentes condiciones. Cualquier duda consultar.`;
        }
    };

    const handleOpenModal = () => {
        if (!token) {
            navigate("/login");
        } else {
            setShowModal(true);
        }
    };

    const handleEnviarCorreo = (e) => {
        e.preventDefault();
        alert(`Mensaje enviado con éxito a: vendedor@kieferstore.cl\n\nTu mensaje: "${mensaje}"`);
        setShowModal(false);
        setMensaje("");
    };

    return (
        <div className="container mt-5 position-relative">
            <div className="card mb-3 border-0 bg-transparent">
                <div className="row g-0">

                    <div className="col-md-6 mb-4 mb-md-0">
                        <div
                            className="d-flex align-items-center justify-content-center rounded p-4 h-100 shadow-sm"
                            style={{ backgroundColor: '#2a2a2a', minHeight: '400px' }}
                        >
                            <img
                                src={producto.img}
                                className="img-fluid rounded"
                                alt={producto.name}
                                style={{ maxHeight: '350px', objectFit: 'contain' }}
                            />
                        </div>
                    </div>

                    <div className="col-md-6 ps-md-5">
                        <div className="card-body p-0 text-light">

                            <h1 className="fw-bold mb-2">{producto.name}</h1>

                            <span className="badge bg-transparent border border-secondary text-light fw-normal mb-4">
                                {producto.condition}
                            </span>

                            <div className="p-3 rounded mb-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                                <p className="text-light opacity-75" style={{ whiteSpace: 'pre-line', lineHeight: '1.6' }}>
                                    {getDescription(producto.condition)}
                                </p>
                                <p className="mt-3 mb-0 fw-bold text-light">
                                    📞 +56 9 1234 5678 <br />
                                    📧 vendedor@kieferstore.cl
                                </p>
                            </div>

                            <div className="mb-4">
                                <p className="text-secondary mb-1">Precio:</p>
                                <h2 className="fw-bold text-primary">${producto.price.toLocaleString("es-CL")}</h2>
                            </div>

                            <div className="d-flex gap-3">
                                <button
                                    onClick={handleOpenModal}
                                    className="btn btn-primary px-4 py-2 flex-grow-1 fw-bold"
                                >
                                    Contactar al Vendedor
                                </button>
                                <button
                                    className="btn btn-outline-secondary px-4 py-2"
                                    onClick={() => navigate(-1)}
                                >
                                    Volver
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {showModal && (
                <div
                    className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                    style={{ backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 9999 }}
                >
                    <div className="card p-4 shadow-lg" style={{ backgroundColor: '#1e1e1e', width: '90%', maxWidth: '500px', border: '1px solid #333' }}>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="text-light mb-0">Contactar Vendedor</h4>
                            <button onClick={() => setShowModal(false)} className="btn btn-sm btn-outline-secondary border-0 text-light fs-4">&times;</button>
                        </div>

                        <form onSubmit={handleEnviarCorreo}>
                            <div className="mb-3">
                                <label className="form-label text-light opacity-75 small">Asunto</label>
                                <input
                                    type="text"
                                    className="form-control bg-dark text-light border-secondary"
                                    value={`Consulta por: ${producto.name}`}
                                    readOnly
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label text-light opacity-75 small">Tu Mensaje</label>
                                <textarea
                                    className="form-control bg-dark text-light border-secondary"
                                    rows="4"
                                    placeholder="Hola, me interesa este producto. ¿Aún está disponible?"
                                    value={mensaje}
                                    onChange={(e) => setMensaje(e.target.value)}
                                    required
                                ></textarea>
                            </div>

                            <div className="d-flex gap-2 justify-content-end">
                                <button type="button" onClick={() => setShowModal(false)} className="btn btn-outline-light btn-sm">Cancelar</button>
                                <button type="submit" className="btn btn-primary btn-sm">Enviar Email</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Detalle;