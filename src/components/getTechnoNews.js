import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import 'aos/dist/aos.css'


const API = process.env.REACT_APP_API_URL

function GetTechnoNews() {

    const [news, setNews] = useState([])
    const navigate = useNavigate();


    const getTechnoNews = async () => {
        const res = await fetch(`${API}/news/technology`)
        const data = await res.json()
        setNews(data)
    }

    useEffect(() => {
        getTechnoNews()
    }, [])

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
                {news.map((newsItem) => (
                    <div
                        className="col-sm-6 col-md-4 col-lg-3 p-1"
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



export default GetTechnoNews