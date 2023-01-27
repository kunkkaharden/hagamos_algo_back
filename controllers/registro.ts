import { Request, Response } from "express";
import { IRegistro, Registro } from "models/registro";

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
  const skip = +req.query.skip;
  const limit = +req.query.limit;
  const categoria = req.query.categoria;
  try {
    return res
      .status(200)
      .json(await Registro.find({categoria}).sort({fecha: -1}) .skip(skip).limit(limit));
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const deleteRegistro = async (req: Request, res: Response) => {
 
  try {
    const enlace = req.query.enlace;
    const registro = await Registro.findOne({ enlace });
    await registro.delete();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};