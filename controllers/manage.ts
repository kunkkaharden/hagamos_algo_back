import { Price } from "../enums/Price";
import { Request, Response } from "express";
import { OfficialCar } from "../models/official-car";
import { ResidentCar } from "../models/resident-car";

export const reset = async (req: Request, res: Response) => {
  try {
    await resetOfficial();
    await resetResident();
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
  let text =  'Núm. placa, Tiempo estacionado (min.), Cantidad a pagar\n';
  const cars = await ResidentCar.find({});
  cars.forEach((e) => {
      text +=  e.car_plate + ", " + e.time + 
      ", " +  e.time * Price.resident +"\n";
  });

  res.set({"Content-Disposition":`attachment; filename="${req.query.name + '.csv'}"`});
  res.send(text);
};


const resetOfficial = async() => {
  const promises = [];
  const cars = await OfficialCar.find({});
  cars.forEach((e) => {
    e.stays = [];
    promises.push(e.save());
  });
  await Promise.all(promises);
}

const resetResident = async() => {
  const promises = [];
  const officialCars = await ResidentCar.find({});
    officialCars.forEach((e) => {
      e.time = 0;
      promises.push(e.save());
    }); 
    await Promise.all(promises);
}