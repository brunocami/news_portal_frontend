import { Configuration, OpenAIApi } from 'openai';

// stable_difusion


function Completion() {
    
    const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
    const configuration = new Configuration({
        apiKey: OPENAI_API_KEY, // Reemplaza con tu propia clave de API de OpenAI
    });
    const openai = new OpenAIApi(configuration);

    
    const createSummary = async (url) => {
        console.log(OPENAI_API_KEY)
        try {

            const respuesta = await openai.createCompletion({
                model: 'text-davinci-003',
                prompt: `Haz un resumen mediantemente extenso, ni muy corto ni muy largo pero que no se escapen los detalles importantes, y en el idioma en que fue escrita la noticia en la siguiente URL: ${url}\n`,
                temperature: 0.7,
                max_tokens: 300,
                top_p: 1,
                frequency_penalty: 0.2,
                presence_penalty: 0.8,
                n: 1,
                stop: '<STOP>'
            });
            const resumen = respuesta.data.choices[0].text.trim();
            return resumen

        } catch (error) {
            console.error('Error al generar el completado:', error);
        }
    };


    return {createSummary}
}

export default Completion;
