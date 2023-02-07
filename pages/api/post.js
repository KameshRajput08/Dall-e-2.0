import { v2 as cloudinary } from "cloudinary";
import Post from "../../modals/post";
import connectMongo from "../../utils/conn";
import https from "https";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
    connectMongo().catch(err => console.log(err))
    if (req.method === 'GET') {
        try {
            const posts = await Post.find({});
            res.status(200).json({ success: true, data: posts });
        } catch (err) {
            res.status(500).json({ success: false, message: 'Fetching posts failed, please try again' });
        }
    } else if (req.method === 'POST') {
        try {
            const { name, prompt, photo } = req.body;
            fetchAndEncodeImage(photo).then(async(result) => {
                const newPost = await Post.create({
                    name,
                    prompt,
                    photo: result.image
                });
                res.status(200).json({ success: true, data: newPost });
            }).catch(err => res.status(500).json(err.message))
        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: 'Unable to create a post, please try again' });
        }
    }
}

function fetchAndEncodeImage(url) {
    return new Promise((resolve, reject) => {
        https.get(url, response => {
            let data = [];
            response.on('data', chunk => data.push(chunk));
            response.on('end', async () => {
                const buffer = Buffer.concat(data);
                const base64 = buffer.toString('base64');
                const photoUrl = await cloudinary.uploader.upload(`data:image/jpeg;base64,${base64}`);
                resolve({ image: photoUrl.url });
            });
        }).on('error', reject);
    });
}
