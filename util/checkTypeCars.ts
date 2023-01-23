import { ValidCars } from "../enums/ValidCars";

export const checkTypeCars = (car: string) => {
    const cars: string[] = Object.values<string>(ValidCars);

        if(!cars.includes(car)){
            throw new Error(car + ' Is not a valid car type');
        }
    
    return true;
  }
