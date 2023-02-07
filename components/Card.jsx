import React from 'react';
import { motion } from "framer-motion";

import { downloadImage } from '../utils/index';

const Card = ({ _id, name, prompt, photo }) => (
    <motion.div
        layout
        whileHover={{ scale: 1.01 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-xl group relative shadow-card hover:shadow-cardhover card">
        <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-auto object-cover rounded-xl"
            src={photo}
            alt={prompt}
        />
        <div className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md">
            <p className="text-white text-sm overflow-y-auto prompt">{prompt}</p>

            <div className="mt-5 flex justify-between items-center gap-2">
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold">{name[0]}</div>
                    <p className="text-white text-sm">{name}</p>
                </div>
                <button type="button" onClick={() => downloadImage(_id, photo)} className="outline-none bg-transparent border-none">
                    <img src={'/assets/download.png'} alt="download" className="w-6 h-6 object-contain invert" />
                </button>
            </div>
        </div>
    </motion.div>
);

export default Card;
