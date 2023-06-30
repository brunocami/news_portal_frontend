import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import 'aos/dist/aos.css'


const API = process.env.REACT_APP_API_URL

function GetArgNews() {

    const [argNews, setArgNews] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // OBTENER LAS NOTICIAS DEL LOCAL STORAGE O REALIZAR UNA SOLICITUD PARA OBTENERLAS
        const fetchNews = async () => {
            const storedNews = localStorage.getItem('argNews'); // Utiliza getItem en lugar de acceder directamente a localStorage.news
            if (storedNews) {
                setArgNews(JSON.parse(storedNews)); // Parsea la cadena de texto a objeto utilizando JSON.parse
            } else {
                try {
                    const res = await fetch(`${API}/news/ar`);

                    if (res.ok) {
                        const data = await res.json();
                        const news = data.data;

                        // FILTRAR LAS NOTICIAS SIN IMAGEN
                        const filteredNews = news.filter((item) => item.image !== null);

                        // AGREGAR ID A CADA NOTICIA
                        const newsWithId = filteredNews.map((item) => {
                            const id = generateId();
                            return { ...item, id };
                        });

                        // GUARDAR LAS NOTICIAS EN EL LOCAL STORAGE
                        localStorage.setItem('argNews', JSON.stringify(newsWithId));
                        setArgNews(newsWithId);
                    } else {
                        console.log('Error al obtener las noticias:', res.status);
                    }
                } catch (error) {
                    console.log('Error en la solicitud:', error);
                }
            }
        };

        fetchNews();
    }, []);

    // GENERAR UN ID ALEATORIO
    const generateId = () => {
        const characters = 'abcdef0123456789';
        let id = '';
        for (let i = 0; i < 24; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            id += characters.charAt(randomIndex);
        }
        return id;
    };

    const handleCardClick = (id) => {
        navigate(`/news/${id}`);
    };

    const descriptionTruncated = {
        overflow: 'hidden',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 5,
        display: '-webkit-box',
    };

    const titleStyle = {
        cursor: 'pointer',
        transition: 'color 0.3s',
    };

    const handleTitleHover = (event) => {
        event.target.style.color = '#ced4da';
    };

    const handleTitleLeave = (event) => {
        event.target.style.color = 'initial';
    };


    return (
        <section className="py-4 py-lg-5 container">
            <div className="row d-flex justify-content-center">
                {argNews.map((newsItem, index) => (
                    <div
                        className={`card col-lg-${index === 0 ? '6' : index === 3 || index === 4 ? '6' : '3'} col-md-4 col-sm-6 p-1 bg-transparent`}
                        data-aos="fade-zoom-in"
                        data-aos-offset="200"
                        key={newsItem.id}
                    >
                        <div className="card-body">
                            <h5
                                className="card-title"
                                onClick={() => handleCardClick(newsItem.id)}
                                style={titleStyle}
                                onMouseEnter={handleTitleHover}
                                onMouseLeave={handleTitleLeave}
                            >
                                {newsItem.title}
                            </h5>
                            <p className="card-text" style={descriptionTruncated}>
                                {newsItem.description}
                            </p>
                            <p className="card-text">
                                <small className="text-muted">{newsItem.published_at}</small>
                            </p>
                        </div>
                        {newsItem.image ? (
                            <img
                                src={newsItem.image}
                                className="card-img-bottom"
                                alt="..."
                                onClick={() => handleCardClick(newsItem.id)}
                                style={titleStyle}
                                onMouseEnter={handleTitleHover}
                                onMouseLeave={handleTitleLeave}
                            />
                        ) : null}
                    </div>
                ))}
            </div>
        </section>
    )
}



export default GetArgNews