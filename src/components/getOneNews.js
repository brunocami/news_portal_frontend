import React, { useEffect, useState } from 'react';
import Completion from '../functions/completion';
import { SpinStretch } from "react-cssfx-loading";
import { Link } from 'react-router-dom';


function GetOneNews() {

    const [oneNews, setOneNews] = useState([]);
    const [summary, setSummary] = useState('');
    const [isLoading, setIsLoading] = useState(true); // Estado de carga

    const { createSummary } = Completion(); // Instancia del componente Completion

    const getOneNews = async () => {
        // Obtener el ID de la URL
        const newsId = window.location.pathname.split('/').pop();

        // Buscar la noticia en el sessionStorage
        const storedGeneralNews = sessionStorage.getItem('generalNews');
        const storedArgNews = sessionStorage.getItem('argNews');
        const storedTechNews = sessionStorage.getItem('techNews');

        let selectedNews = null;

        if (storedGeneralNews) {
            const generalNewsList = JSON.parse(storedGeneralNews);
            selectedNews = generalNewsList.find((item) => item.id === newsId);
        }

        if (!selectedNews && storedArgNews) {
            const argNewsList = JSON.parse(storedArgNews);
            selectedNews = argNewsList.find((item) => item.id === newsId);
        }

        if (!selectedNews && storedTechNews) {
            const techNewsList = JSON.parse(storedTechNews);
            selectedNews = techNewsList.find((item) => item.id === newsId);
        }

        if (selectedNews) {
            // La noticia ha sido encontrada, puedes hacer lo que necesites con ella
            setOneNews(selectedNews)
            // Crear el resumen utilizando la función createSummary de Completion
            setIsLoading(true); // Establecer el estado de carga a true

            // BLOQUEE LA FUNCION CREATESUMMARY PORQUE ME GENERO UN RATE LIMIT MUY ALTO 
            setTimeout(() => {
                // const resumen = await createSummary(selectedNews.url);
                // setSummary(resumen);
                setIsLoading(false); // Establecer el estado de carga a false una vez se haya generado el resumen
              }, 3000);
        } else {
            // La noticia no ha sido encontrada en ninguno de los objetos del sessionStorage
            console.log('No se encontró la noticia con el ID:', newsId);
        }
    };


    useEffect(() => {
        getOneNews();
    }, []);

    return (
        <div className="container w-100 m-auto mt-2">
            <h3 className="card-header">{oneNews.title}</h3>
            <div className="card-body">
                <h5 className="card-title">{oneNews.description}</h5>
                <h6 className="card-subtitle text-muted">{oneNews.author} - {oneNews.published_at}+</h6>
            </div>
            <div className="row p-1">
                <div className="col-lg-6 p-2 d-flex align-items-center">
                    <img
                        src={oneNews.image}
                        className="card-img-bottom w-100 img-fluid rounded"
                        alt="..."
                    />
                </div>
                <div className="col-lg-6 p-1">
                    <div className="card-body">
                        {isLoading ? (
                            <div className='d-flex justify-content-center'>
                                <p className="card-text fs-4" style={{ marginRight: '15px' }}>Cargando noticia</p>
                                <SpinStretch />
                            </div>
                        ) : (
                            // <p className={`card-text ${oneNews.image ? 'mt-4 mt-lg-0' : ''} fs-4`}>{summary}</p> // Resumen generado
                            <Link class="btn btn-lg btn-info w-100" to={oneNews.url}>Ver Nota Completa</Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GetOneNews;
