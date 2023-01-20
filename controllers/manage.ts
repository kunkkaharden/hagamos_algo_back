import { Blob } from "buffer";
import { Request, Response } from "express";
import { ResidentCar } from "../models/resident-car";
import { Stay } from "../models/stay";

export const reset = async (req: Request, res: Response) => {
  try {
    await Stay.deleteMany({});
    const promises = [];
    const cars = await ResidentCar.find({});
    cars.forEach((e) => {
      e.time = 0;
      promises.push(e.save());
    }); 
    await Promise.all(promises);
    return res.status(200).json({
      result: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const payments = async (req: Request, res: Response) => {
  const name = req.query.name ? 
     req.query.name + '.txt':
     'payments' + new Date().getTime() + '.txt';
  const price = 0.05;
  let text =  'Núm. placa 	Tiempo estacionado (min.) 	Cantidad a pagar \n';
  const cars = await ResidentCar.find({});
  cars.forEach((e) => {
      text +=  e.car_plate + "           " + e.time + "                         " +  e.time * price + "\n";
  });

  res.set({"Content-Disposition":`attachment; filename="${name}"`});
  res.send(text);
};

