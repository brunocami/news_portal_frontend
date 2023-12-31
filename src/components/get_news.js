import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'aos/dist/aos.css';
import GetDolar from '../functions/dolarApi';

const API = process.env.REACT_APP_API_URL;

function GetNews() {
  const [generalNews, setGeneralNews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // OBTENER LAS NOTICIAS DEL LOCAL STORAGE O REALIZAR UNA SOLICITUD PARA OBTENERLAS
    const fetchNews = async () => {
      const storedNews = sessionStorage.getItem('generalNews'); // Utiliza getItem en lugar de acceder directamente a sessionStorage.news
      if (storedNews) {
        setGeneralNews(JSON.parse(storedNews)); // Parsea la cadena de texto a objeto utilizando JSON.parse
      } else {
        try {
          const res = await fetch(`${API}/`);

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
            sessionStorage.setItem('generalNews', JSON.stringify(newsWithId));
            setGeneralNews(newsWithId);
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
    <section>
      <GetDolar />
      <div className="py-2 py-lg-3 container" >
        <div className="row d-flex justify-content-center p-1">
          {generalNews.map((generalNewsItem, index) => (
            <div
              className={`card col-lg-${index === 0 ? '6' : index === 3 || index === 4 ? '6' : '3'} col-md-4 col-sm-6 p-1 bg-transparent`}
              data-aos="fade-zoom-in"
              data-aos-offset="200"
              key={generalNewsItem.id}
            >
              <div className="card-body">
                <h5
                  className="card-title"
                  onClick={() => handleCardClick(generalNewsItem.id)}
                  style={titleStyle}
                  onMouseEnter={handleTitleHover}
                  onMouseLeave={handleTitleLeave}
                >
                  {generalNewsItem.title}
                </h5>
                <p className="card-text" style={descriptionTruncated}>
                  {generalNewsItem.description}
                </p>
                <p className="card-text">
                  <small className="text-muted">{generalNewsItem.published_at}</small>
                </p>
              </div>
              {generalNewsItem.image ? (
                <img
                  src={generalNewsItem.image}
                  className="card-img-bottom"
                  alt="..."
                  onClick={() => handleCardClick(generalNewsItem.id)}
                  style={titleStyle}
                  onMouseEnter={handleTitleHover}
                  onMouseLeave={handleTitleLeave}
                />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default GetNews;
