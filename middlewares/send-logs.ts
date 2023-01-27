import { NextFunction, Request, Response } from "express";
import axios from 'axios';
export const sendLogs = (req: Request, res: Response, next: NextFunction) => {
    const API_BOT = process.env.API_BOT;
    const chat_id = process.env.CANAL;
    const url = `https://api.telegram.org/API_BOT/sendMessage`;
    const info = {
        ip: '',
        browser: '',
        os: '',
        path: req.path,
        req,
    };

    axios.post<TelegramMessage>(url, {
        chat_id,
        text: JSON.stringify(info),
    })

    next();
}

interface TelegramMessage {
    chat_id: number;
    text: String;
}