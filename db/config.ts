import { init } from "../controllers/auth";
import {connect} from "mongoose";

export const dbConection = async () => {
    const url = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
  try {
    await connect(url);
    await init();
    console.log("DB ok");
  } catch (error) {
    console.log(error);
    throw new Error("Database error");
  }
};
