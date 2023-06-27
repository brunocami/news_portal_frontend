import React, { useEffect, useState } from 'react';
import Completion from './completion';
import { SpinStretch } from "react-cssfx-loading";

const API = process.env.REACT_APP_API;

function GetOneNews() {
    const [news, setNews] = useState([]);
    const [summary, setSummary] = useState('');
    const [isLoading, setIsLoading] = useState(true); // Estado de carga

    const { createSummary } = Completion(); // Instancia del componente Completion

    const getOneNews = async () => {
        // Obtener el ID de la URL
        const newsId = window.location.pathname.split('/').pop();

        const res = await fetch(`${API}/news/${newsId}`);
        const data = await res.json();
        setNews(data);

        // Crear el resumen utilizando la función createSummary de Completion
        setIsLoading(true); // Establecer el estado de carga a true

        const resumen = await createSummary(data.url);
        setSummary(resumen);
        setIsLoading(false); // Establecer el estado de carga a false una vez se haya generado el resumen
    };

    useEffect(() => {
        getOneNews();
    });

    return (
        <div className="container w-100 m-auto mt-2">
            <h3 className="card-header">{news.title}</h3>
            <div className="card-body">
                <h5 className="card-title">{news.description}</h5>
                <h6 className="card-subtitle text-muted">{news.author} - {news.published_at}+</h6>
            </div>
            <div className="row p-1">
                <div className="col-lg-6 p-2 d-flex align-items-center">
                    <img
                        src={news.image}
                        className="card-img-bottom w-100 img-fluid rounded"
                        alt="..."
                    />
                </div>
                <div className="col-lg-6 p-1">
                    <div className="card-body">
                        {isLoading ? (
                            <div className='d-flex justify-content-center'>
                                <p className="card-text fs-4" style={{ marginRight: '15px' }}>Creando resumen de la noticia</p>
                                <SpinStretch />
                            </div>
                        ) : (
                            <p className={`card-text ${news.image ? 'mt-4 mt-lg-0' : ''} fs-4`}>{summary}</p> // Resumen generado
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GetOneNews;
