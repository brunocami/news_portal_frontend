import { useEffect, useState } from "react";
import { BiChevronsDown, BiChevronsUp } from 'react-icons/bi'

function GetDolar() {
    const [dolar, setDolar] = useState(null);

    const getDolar = async () => {
        const res = await fetch(`https://www.dolarsi.com/api/api.php?type=valoresprincipales`);
        const data = await res.json();

        // Filtrar los elementos con casa.nombre igual a "bitcoin" o "soja"
        const filteredData = data.filter((item) => {
            const nombre = item.casa.nombre.toLowerCase();

            if (nombre === "dolar contado con liqui" || nombre === "dolar soja" || nombre === "dolar") {
                return false;
            } else if (nombre === "dolar turista") {
                item.casa.nombre = "turista";
            } else if (nombre === "bitcoin") {
                item.casa.venta = item.casa.compra;
            }

            return true;
        });

        setDolar(filteredData);
    };

    useEffect(() => {
        getDolar();
    }, []);

    if (dolar === null) {
        return <div>Cargando...</div>; // Muestra un mensaje de carga mientras se obtiene la información
    }

    return (
        <div className="d-none d-md-flex justify-content-center align-bottom row">
            {dolar.map((dolarItem) => (
                dolarItem.casa.nombre == "Argentina" ?
                    <div key={dolarItem.casa.nombre} className="card text-center col-md-4 col-lg-2" >
                        <div className="card-body">
                            <h5 className="card-title">Riesgo Pais</h5>
                            <p className="card-text text-light bg-dark">{dolarItem.casa.compra}</p>
                            <p className="card-text text-light bg-dark">{dolarItem.casa.venta}</p>
                        </div>
                    </div>
                    : dolarItem.casa.variacion >= 0 ?
                        <div key={dolarItem.casa.nombre} className="card text-center col-md-4 col-lg-2" >
                            <div className="card-body">
                                <h5 className="card-title">{dolarItem.casa.nombre}</h5>
                                <p className="card-text text-light bg-dark">$ {dolarItem.casa.venta}</p>
                                <p className="card-text text-light bg-success"> <BiChevronsUp /> {dolarItem.casa.variacion}</p>
                            </div>
                        </div>
                        :
                        <div key={dolarItem.casa.nombre} className="card text-center col-md-4 col-lg-2" >
                            <div className="card-body">
                                <h5 className="card-title">{dolarItem.casa.nombre}</h5>
                                <p className="card-text text-light bg-dark">$ {dolarItem.casa.venta}</p>
                                <p className="card-text text-light bg-danger"><BiChevronsDown /> {dolarItem.casa.variacion}</p>
                            </div>
                        </div>
            ))}
        </div>
    );
}

export default GetDolar