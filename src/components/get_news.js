import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'aos/dist/aos.css';
import ShuffleArray from '../functions/shuffleArray';
import GetDolar from '../functions/dolarApi';

const API = process.env.REACT_APP_API_URL;

function GetNews() {
  const [generalNews, setGeneralNews] = useState([]);
  const navigate = useNavigate();

  // FUNCION PARA ORDENAR LAS NOTICIAS DE MANERA ALEATORIA CADA VEZ QUE SE RECARGA LA PAGINA
  const { shuffleArray } = ShuffleArray();

  useEffect(() => {
    const fetchNews = async () => {
      const storedNews = localStorage.getItem('news');

      if (storedNews) {
        setGeneralNews(JSON.parse(storedNews));
      } else {
        try {
          const res = await fetch(`${API}/`);

          if (res.ok) {
            const data = await res.json();
            const news = data.data;

            // Guardar las noticias en el localStorage
            localStorage.setItem('news', JSON.stringify(news));
            setGeneralNews(news);
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
    <section className="py-4 py-lg-5 container m-auto w-100">
      <GetDolar />
      <div className="row d-flex justify-content-center p-1">
        {generalNews.map((generalNewsItem) => (
          <div
            className="col-sm-6 col-md-4 col-lg-3 p-1 bg-transparent"
            data-aos="fade-zoom-in"
            data-aos-offset="200"
            key={generalNewsItem._id}
          >
            <div className="card-body">
              <h5
                className="card-title"
                onClick={() => handleCardClick(generalNewsItem._id)}
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
                onClick={() => handleCardClick(generalNewsItem._id)}
                style={titleStyle}
                onMouseEnter={handleTitleHover}
                onMouseLeave={handleTitleLeave}
              />
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}

export default GetNews;
