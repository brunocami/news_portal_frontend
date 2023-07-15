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

            if (nombre === "dolar contado con liqui" || nombre === "dolar soja" || nombre === "dolar" || nombre === "bitcoin" || nombre === "dolar turista") {
                return false;
            } else if (nombre === "dolar turista") {
                item.casa.nombre = "turista";
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
        <div className="container-fluid">
            <div className="d-none d-md-flex row p-0 row border-bottom">
                {dolar.map((dolarItem) => (
                    <div key={dolarItem.casa.nombre} className="col mt-3 p-0 row">
                        <p className="col fs-6 text-center">
                            {dolarItem.casa.nombre === "Argentina" ? "Riesgo Pais" : dolarItem.casa.nombre}
                        </p>
                        <p className="col text-black fs-6 ">
                            {dolarItem.casa.nombre === "Argentina" ? dolarItem.casa.compra : `$ ${dolarItem.casa.venta}`}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GetDolar