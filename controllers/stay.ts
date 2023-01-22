import { Request, Response } from "express";
import { Car, ICar } from "../models/car";
import { IResidentCar } from "../models/resident-car";
import { IStay, Stay } from "../models/stay";
import { getTime } from "../util/getTime";
import { ValidCars } from "../enums/ValidCars";
import { Price } from "../enums/Price";
import { IOfficialCar } from "models/official-car";

export const start = async (req: Request, res: Response) => {
  const car_plate = req.params.car_plate;
  try {
    let stay = await Stay.findOne({ car_plate, end_date: null });
    
    if (stay) {
      return res.status(400).json({
        message: "The car is ready registered",
      });
    }
    stay = new Stay({ car_plate });
    await stay.save();
    return res.status(200).json({
      _id: stay._id,
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
    let stay = await Stay.findOne({ car_plate, end_date: null });
    if (!stay) {
      return res.status(404).json({
        message: "The car is not registered",
      });
    }
    stay.end_date = new Date();
    await stay.save();

    const car = await Car.findOne({ car_plate, active: true });
    let result;
    if (!car) {
        result = not_resident(stay);
    }else {
        result = await switchCar(car, stay);
    }

    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const switchCar = async(car: ICar, stay: IStay ) => {
    let result;
    switch (car.__type) {
        case ValidCars.official:
            result = await official(car as IOfficialCar, stay);
            break;
        case ValidCars.resident:
            result = await resident(car as IResidentCar, stay);
            break;
    }
    return result;
};
const official = async (car: IOfficialCar, stay: IStay) => {
    const time = getTime(stay);
    car.stays.push(stay._id);
    await car.save();
    return {
      time
     }
};
const not_resident = (stay: IStay) => {
  const time = getTime(stay);
   return {
    price: Price.not_resident * time,
    time
   };
};

const resident = async(car: IResidentCar, stay: IStay) => {
     const time = getTime(stay);
     car.time = car.time + time;
     await car.save();
     return {
      time
     };
};


