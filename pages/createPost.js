import axios from 'axios';
import Head from 'next/head'
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import FormField from '../components/FormField';
import Header from '../components/Header';
import Loader from '../components/Loader';
import { getRandomPrompt } from "../utils/index";

const CreatePost = () => {
    const router = useRouter();
    const [form, setForm] = useState({
        name: '',
        prompt: '',
        photo: '',
    });

    const [generatingImg, setGeneratingImg] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.prompt && form.photo) {
            setLoading(true);
            try {
                await axios.post('/api/post', { ...form })
                alert('Success');
                router.push('/');
            } catch (err) {
                console.log(err)
                alert(err);
            } finally {
                setLoading(false);
            }
        } else {
            alert('Please generate an image with proper details');
        }
    }

    const generateImage = async () => {
        if (form.prompt) {
            try {
                setGeneratingImg(true);
                const response = await axios.post('/api/dalle', {
                    prompt: form.prompt,
                })
                setForm({ ...form, photo: response.data.photo });
            } catch (err) {
                alert(err);
            } finally {
                setGeneratingImg(false);
            }
        } else {
            alert('Please provide proper prompt');
        }
    }

    const handleSurpriseMe = () => {
        const randomPrompt = getRandomPrompt(form.prompt);
        setForm({ ...form, prompt: randomPrompt });
    };
    return (
        <>
            <Head>
                <title>OpenAI- Create</title>
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap" rel="stylesheet"></link>
            </Head>
            <Header />
            <section className="max-w-7xl mx-auto my-6">
                <div>
                    <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
                    <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">Generate an imaginative image through DALL-E AI and share it with the community</p>
                </div>

                <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-5">
                        <FormField
                            labelName="Your Name"
                            type="text"
                            name="name"
                            placeholder="Ex., john doe"
                            value={form.name}
                            handleChange={handleChange}
                        />

                        <FormField
                            labelName="Prompt"
                            type="text"
                            name="prompt"
                            placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
                            value={form.prompt}
                            handleChange={handleChange}
                            isSurpriseMe
                            handleSurpriseMe={handleSurpriseMe}
                        />

                        <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
                            {form.photo ? (
                                <img
                                    src={form.photo}
                                    alt={form.prompt}
                                    className="w-full h-full object-contain"
                                />
                            ) : (
                                <img
                                    src={"/assets/preview.png"}
                                    alt="preview"
                                    className="w-9/12 h-9/12 object-contain opacity-40"
                                />
                            )}

                            {generatingImg && (
                                <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                                    <Loader />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-5 flex gap-5">
                        <button
                            type="button"
                            onClick={generateImage}
                            className=" text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                        >
                            {generatingImg ? 'Generating...' : 'Generate'}
                        </button>
                    </div>

                    <div className="mt-10">
                        <p className="mt-2 text-[#666e75] text-[14px]">** Once you have created the image you want, you can share it with others in the community **</p>
                        <button
                            type="submit"
                            className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                        >
                            {loading ? 'Sharing...' : 'Share with the Community'}
                        </button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default CreatePost