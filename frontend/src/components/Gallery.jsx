import { useContext } from "react";
import { MyContext } from "../context/MyContext";

const Gallery = () => {
    const { data } = useContext(MyContext);

    return (
        <div className="row">
            {data.map((product) => (
                <div key={product.id} className="col-12 col-md-3 mb-4">
                    <div className="card h-100">
                        <img src={product.img} className="card-img-top" alt={product.name} />
                        <div className="card-body">
                            <h5 className="card-title">{product.name}</h5>
                            <p className="card-text">{product.desc}</p>
                            <p className="fw-bold">${product.price}</p>
                            <button className="btn btn-primary">Ver Más</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Gallery;