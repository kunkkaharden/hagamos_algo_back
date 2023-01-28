import { Request, Response } from "express";
import { IRegistro, Registro } from "../models/registro";

export const addRegistro = async (req: Request, res: Response) => {
  try {
    const {enlace, temporal, categoria}: IRegistro  = req.body;
    let registro = await Registro.findOne({ enlace });
    
    if (registro) {
      registro.temporal = temporal;
      registro.categoria = categoria;
      registro.fecha = new Date();
    } else {

      registro = new Registro({ 
        ...req.body,
        fecha: new Date(),
       });
    }
    await registro.save();
    return res.status(200).json({
      _id: registro._id,
      enlace,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};






export const findAll = async (req: Request, res: Response) => {
  const filter: {categoria?: string} = {};
  const skip = +req.query.skip | 0;
  const limit = +req.query.limit | 10;
  req.query.categoria && (filter.categoria = (req.query.categoria as string));
  try {
    return res
      .status(200)
      .json(await Registro.find(filter).sort({fecha: -1}).skip(skip).limit(limit));
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const deleteRegistro = async (req: Request, res: Response) => {
 
  try {
    const enlace = req.body.enlace;
    const registro = await Registro.findOne({ enlace });
    registro && await registro.delete();
    return res
      .status(200)
      .json(true);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};