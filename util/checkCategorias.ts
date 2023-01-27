import { Categorias } from "../enums/Categorias";

export const checkCategorias = (car: string) => {
    const cars: string[] = Object.values<string>(Categorias);

        if(!cars.includes(car)){
            throw new Error(car + ' Is not a valid car type');
        }
    
    return true;
  }
