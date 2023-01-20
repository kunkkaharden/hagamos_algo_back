import { Request, Response } from "express";
import { Car, ICar } from "models/car";
import { IResidentCar } from "models/resident-car";
import { Stay } from "models/stay";
import { TempStay } from "models/temp-stay";
import { Document, Types } from "mongoose";
import { ValidCars } from "util/ValidCars";

export const start = async (req: Request, res: Response) => {
  const car_plate = req.params.car_plate;
  try {
    let tempStay = await TempStay.findOne({ car_plate });
    if (tempStay) {
      return res.status(400).json({
        message: "The car is ready registered",
      });
    }
    tempStay = new TempStay(req.body);
    await tempStay.save();
    return res.status(200).json({
      _id: tempStay._id,
      car_plate,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const end = async (req: Request, res: Response) => {
  const car_plate = req.params.car_plate;
  try {
    let tempStay = await TempStay.findOne({ car_plate });
    if (!tempStay) {
      return res.status(404).json({
        message: "The car is not registered",
      });
    }
    const car = await Car.findOne({ car_plate });
    let result;
    if (!car) {
        result = not_resident(tempStay.start_date);
    }else {

        result = await run(car, tempStay.start_date);
    }

    await tempStay.delete();
    return res.status(200).json({
        result,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const run = async(
  car: Document & ICar,
    start_date: Date
) => {

    switch (car.car_plate) {
        case ValidCars.official:
            official(car.car_plate, start_date);
            break;
        case ValidCars.resident:
            resident(car, start_date);
            break;
    }

};
const official = (car_plate: string, start_date: Date) => {
     const stay = new Stay({
        start_date,
        end_date: new Date(),
     });
     return stay;
};
const not_resident = (star_date: Date) => {
   const price = 0.05;
   return price * getTime(star_date);
};

const resident = async(car: Document & Partial<IResidentCar>, star_date: Date) => {
     car.time = car.time + getTime(star_date);
     await car.save();
     return car;
};

const getTime = (start_date: Date) => {
    const start = start_date.getTime() / 1000;
    const end = new Date().getTime() / 1000;
    const time = (end - start) / 60;
    return time;
}
