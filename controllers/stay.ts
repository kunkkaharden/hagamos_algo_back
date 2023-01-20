import { Request, Response } from "express";
import { Car, ICar } from "../models/car";
import { IResidentCar } from "../models/resident-car";
import { Stay } from "../models/stay";
import { TempStay } from "../models/temp-stay";
import { Document, Types } from "mongoose";
import { getTime } from "../util/getTime";
import { ValidCars } from "../util/ValidCars";

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
    let result;
    switch (car.car_plate) {
        case ValidCars.official:
            result = await official(car, start_date);
            break;
        case ValidCars.resident:
            result = await resident(car, start_date);
            break;
    }
    return result;
};
const official = async (car: Document & Partial<ICar>, start_date: Date) => {
     const stay = new Stay({
        start_date,
        end_date: new Date(),
        car: car._id,
     });
     await stay.save();
     return stay;
};
const not_resident = (star_date: Date) => {
   const price = 0.05;
   return price * getTime(star_date, new Date());
};

const resident = async(car: Document & Partial<IResidentCar>, star_date: Date) => {
     car.time = car.time + getTime(star_date, new Date());
     await car.save();
     return car;
};


