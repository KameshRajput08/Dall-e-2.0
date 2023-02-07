import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
    const openai = new OpenAIApi(configuration);
    if (req.method === 'POST') {
        try {
            const { prompt } = req.body;

            const aiResponse = await openai.createImage({
                prompt,
                n: 1,
            });

            const image = aiResponse.data.data[0].url;
            res.status(200).json({ photo: image });
        } catch (error) {
            console.error(error);
            res.status(500).send(error?.response.data.error.message || 'Something went wrong');
        }
    } else {
        res.status(500).send('Mehod not allowed');
    }
}