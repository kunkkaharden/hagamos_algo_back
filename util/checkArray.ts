import { ValidRoles } from "../enums/ValidRoles";

export const checkArray = (value: [string]) => {
    const allPermittions: string[] = Object.values<string>(ValidRoles);
    
    if(!Array.isArray(value)) {
        throw new Error('incorrect format.  <string[]>');
    }
    value.forEach((e) => {
        if(!(e && allPermittions.includes(e))){
            throw new Error(e + ' Is not a valid permission');
        }
    })
    
    return true;
  }
