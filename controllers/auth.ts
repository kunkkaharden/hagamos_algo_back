import { Request, Response } from "express";
import { genSaltSync, hashSync, compareSync } from "bcryptjs";
import { IUser, User } from "../models/user";
import { generateJwt } from "../util/jwt";
import { getUser } from "../util/get-user";
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password }: IUser = req.body;
    let user = await User.findOne({ email});
    if (user) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    user = new User(req.body);
    user.password = hashSync(password, genSaltSync(10));
    await user.save();
    return res.status(200).json({
      _id: user._id,
      name,
      email,
      token: generateJwt({ _id: user._id }),
    });
  } catch (error) {
    console.log(error.code);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password }: IUser = req.body;
    const user = await User.findOne({ email, active: true });
    if (!user) {
      return res.status(400).json({
        message: "The email and passwords are incorrect",
      });
    }

    if (!compareSync(password, user.password)) {
      return res.status(400).json({
        message: "The email and passwords are incorrect",
      });
    }

    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email,
      token: generateJwt({ _id: user._id }),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const renew = (req: Request, res: Response) => {
  const user = getUser(req);
  return res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateJwt({ _id: user._id }),
  });
};

export const findAll = async (req: Request, res: Response) => {
  try {
    return res
      .status(200)
      .json(await User.find({ active: true }, {password: 0}));
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
    const user = await User.findOne({ _id, active: true }, {password: 0});

    if (!user) {
      return res.status(404).json({
        message: `User with id ${_id} not found`,
      });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const _id = req.params.id;
    const user = await User.findOne({ _id, active: true });

    if (!user) {
      return res.status(404).json({
        message: `User with id ${_id} not found`,
      });
    }

    user.active = false;
    await user.save();
    return res.status(200).json(true);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const activeUser = async (req: Request, res: Response) => {
    try {
      const _id = req.params.id;
      const user = await User.findOne({ _id });
  
      if (!user) {
        return res.status(404).json({
          message: `User with id ${_id} not found`,
        });
      }
  
      user.active = true;
      await user.save();
      return res.status(200).json(true);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  };

  export const updateUser = async (req: Request, res: Response) => {
    try {
      const _id = req.params.id;
      const {name, email, permits}: IUser = req.body;
      const user = await User.findOne({ _id, active: true });
      if (!user) {
        return res.status(404).json({
          message: `User with id ${_id} not found`,
        });
      }
  
      user.name = name;
      user.email = email;
      user.permits = permits;
      await user.save();
      return res.status(200).json(true);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  };

  export const resetPassword = async (req: Request, res: Response) => {
    try {
      const _id = req.params.id;
      const { password }: IUser = req.body;
      const user = await User.findOne({ _id, active: true });
      if (!user) {
        return res.status(404).json({
          message: `User with id ${_id} not found`,
        });
      }
  
      user.password = hashSync(password, genSaltSync(10));
      await user.save();
      return res.status(200).json(true);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  };
