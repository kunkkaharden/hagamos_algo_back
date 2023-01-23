import { ValidCars } from "../enums/ValidCars";
import { Request, Response } from "express";
import { Car, ICar } from "../models/car";
import { OfficialCar } from "../models/official-car";
import { ResidentCar } from "../models/resident-car";
export const createCar = async (req: Request, res: Response) => {
    try {
    const { car_plate }: ICar = req.body; 
    const {type} = req.body;
        let  car = await Car.findOne({ car_plate });
        if (car) {
            if (car.active === true) {
                return res.status(400).json({
                    message: "Car already exists",
                });
            } else {
                if (car.__type !== type) {
                    await car.delete();
                    car = createNewCar(type, car_plate);
                }else {
                    car.active = true;
                }
            }
        }else {
            car = createNewCar(type, car_plate);
        }

        await car.save();
        return res.status(200).json({
            _id: car._id,
            car_plate,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}
const createNewCar = (type: string, car_plate: string) => {
    switch (type) {
        case ValidCars.official :
            return  new OfficialCar({car_plate});
        case ValidCars.resident :
            return  new ResidentCar({car_plate});     
    }
}


export const deleteCar = async (req: Request, res: Response) => {
    try {
      const _id = req.params.id;
      const car = await Car.findOne({ _id, active: true });
  
      if (!car) {
        return res.status(404).json({
          message: `Car with id ${_id} not found`,
        });
      }
  
      car.active = false;
      await car.save();
      return res.status(200).json(true);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  };

  
export const findAll = async (req: Request, res: Response) => {
    try {
      return res
        .status(200)
        .json(await Car.find({ active: true }));
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  };
  export const findOne = async (req: Request, res: Response) => {
    try {
      const _id = req.params.id;
      const car = await Car.findOne({ _id, active: true });
  
      if (!car) {
        return res.status(404).json({
          message: `Car with id ${_id} not found`,
        });
      }
      return res.status(200).json(car);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  };
  