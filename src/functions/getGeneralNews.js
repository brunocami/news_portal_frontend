const GetGeneralNews = () => {
    const api_key = process.env.REACT_APP_MEDIASTACK_API_KEY; // Reemplaza con tu clave de API

    const fetchNews = async () => {
        const url = "http://api.mediastack.com/v1/news";
        const params = {
            access_key: api_key,
            limit: 100,
            sort: "published_desc"
        };

        try {
            const response = await fetch(url, {
              headers: { Authorization: `Bearer ${api_key}` },
              params: new URLSearchParams(params)
            });

            if (response.ok) {
                const data = await response.json();
                const news = data.data;

                // Guardar las noticias en el localStorage
                localStorage.setItem('news', JSON.stringify(news));

                console.log('Noticias guardadas en localStorage:', news);
            } else {
                console.log('Error al obtener las noticias:', response.status);
            }
        } catch (error) {
            console.log('Error en la solicitud:', error);
        }
    };

    return { fetchNews };
};

export default GetGeneralNews;