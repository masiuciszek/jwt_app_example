import { Request, Response, NextFunction } from "express";

export const getResources = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    res
      .status(200)
      .json({ msg: "Public resource , you have access to this route" });
  } catch (err) {
    console.log(err, "server error!!!");
    res.status(500).send("SERVER ERROR");
  }
};

export const getResourcesSecrest = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.status(200).json({
      msg:
        "Secret resource , you have to be authenticated to access  this route",
    });
  } catch (err) {
    console.log(err, "server error!!!");
    res.status(500).send("SERVER ERROR");
  }
};
