import { useNavigate } from "react-router-dom";

const Gallery = ({ items }) => {
    const navigate = useNavigate();

    return (
        <div className="row g-3 mb-5">
            {items.map((product) => (
                <div key={product.id} className="col-6 col-md-4 col-lg-2">
                    <div
                        className="card product-card"
                        onClick={() => navigate(`/producto/${product.id}`)}
                    >
                        <div className="img-wrapper">
                            <img src={product.img} className="card-img-top" alt={product.name} />
                            <span className="badge-condition">{product.condition}</span>
                        </div>

                        <div className="card-body">
                            <h5 className="product-name">{product.name}</h5>
                            <p className="product-price">${product.price.toLocaleString("es-CL")}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Gallery;