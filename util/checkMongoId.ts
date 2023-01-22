import { Types } from "mongoose";

export const checkMongoId = (value: string) => {
    
    if(!Types.ObjectId.isValid(value)) {
        throw new Error('Should be an array of type Mongo.ObjectId');
    }
    return true;
  }
