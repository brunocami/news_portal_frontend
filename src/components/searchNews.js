import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

const API = process.env.REACT_APP_API_URL

function SearchNews() {

    const [searchNews, setSearchNews] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const keyword = new URLSearchParams(location.search).get('keyword');
        SearchNews(keyword);
    }, [location]);

    // OBTENER LAS NOTICIAS DEL LOCAL STORAGE O REALIZAR UNA SOLICITUD PARA OBTENERLAS
    const SearchNews = async (searchedWord) => {
        const storedNews = localStorage.getItem('searchNews');
        if (storedNews) {
            const parsedNews = JSON.parse(storedNews);
            const filteredNews = parsedNews.filter((item) => item.topic === searchedWord);
            if (filteredNews.length > 0) {
                setSearchNews(filteredNews);
            } else {
                try {
                    const res = await fetch(`${API}/news/${searchedWord}`);
                    if (res.ok) {
                        const data = await res.json();
                        const news = data.data;
                        const filteredNews = news.filter((item) => item.image !== null);
                        const newsWithId = filteredNews.map((item) => {
                            const id = generateId();
                            const topic = searchedWord;
                            return { ...item, id, topic };
                        });
                        localStorage.setItem('searchNews', JSON.stringify(newsWithId));
                        setSearchNews(newsWithId);
                    } else {
                        console.log('Error al obtener las noticias:', res.status);
                    }
                } catch (error) {
                    console.log('Error en la solicitud:', error);
                }
            }
        } else {
            try {
                const res = await fetch(`${API}/news/${searchedWord}`);
                if (res.ok) {
                    const data = await res.json();
                    const news = data.data;
                    const filteredNews = news.filter((item) => item.image !== null);
                    const newsWithId = filteredNews.map((item) => {
                        const id = generateId();
                        const topic = searchedWord;
                        return { ...item, id, topic };
                    });
                    localStorage.setItem('searchNews', JSON.stringify(newsWithId));
                    setSearchNews(newsWithId);
                } else {
                    console.log('Error al obtener las noticias:', res.status);
                }
            } catch (error) {
                console.log('Error en la solicitud:', error);
            }
        }
    };


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
                {searchNews.map((newsItem) => (
                    <div
                        className="card col-sm-6 col-md-4 col-lg-3 p-0 m-1"
                        data-aos="fade-zoom-in"
                        data-aos-offset="200"
                        key={newsItem._id}
                    >
                        <div className="card-body">
                            <h5
                                className="card-title"
                                onClick={() => handleCardClick(newsItem._id)}
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
                                onClick={() => handleCardClick(newsItem._id)}
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

export default SearchNews