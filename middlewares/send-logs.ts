import { NextFunction, Request, Response } from "express";
import axios from 'axios';
export const sendLogs = (req: Request, res: Response, next: NextFunction) => {
    const API_BOT = process.env.API_BOT;
    const chat_id = +process.env.CANAL;
    const url = `https://api.telegram.org/bot${API_BOT}/sendMessage`;
    const info = JSON.stringify(req.query);
    axios.post<TelegramMessage>(url, {
        chat_id,
        text: info,
    }).catch((e) => {
        console.log("telegram error: ", e);
    })
    
    next();
}

interface TelegramMessage {
    chat_id: number;
    text: String;
}