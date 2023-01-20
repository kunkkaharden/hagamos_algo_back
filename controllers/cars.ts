import { Request, Response } from "express";
import { Car } from "../models/car";
import { IOfficialCar, OfficialCar } from "../models/official-car";
import { IResidentCar, ResidentCar } from "../models/resident-car";
export const register_official = async (req: Request, res: Response) => {

    const { car_plate }: IOfficialCar = req.body; 
    try {
        let car = await Car.findOne({ car_plate });
        if (car) {
            return res.status(400).json({
                message: "Car already exists",
            });
        }
        car = new OfficialCar(req.body);
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

export const register_resident = async (req: Request, res: Response) => {

    const { car_plate }: IResidentCar = req.body; 
    try {
        let car = await Car.findOne({ car_plate });
        if (car) {
            return res.status(400).json({
                message: "Car already exists",
            });
        }
        console.log("car", car, car_plate );
        car = new ResidentCar(req.body);
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

export const get_all_official = async (req: Request, res: Response) => {

try{
    return res.status(200).json({
        result: await OfficialCar.find({}),
    });
} catch (error) {
    console.log(error);
    return res.status(500).json({
        message: "Internal Server Error"
    });
}
}