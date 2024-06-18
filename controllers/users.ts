import { Request, Response } from "express";
import { Users } from "../models/users.js";
import { v4 as uuidv4 } from "uuid";
import { setUser, getUser } from "../services/auth.js";
import { URL } from "../models/url.js";
import { get } from "mongoose";

async function handleCreateSignUp(req: Request, res: Response) {
  const { fullName, email, password } = req.body;
  await Users.create({
    name: fullName,
    email: email,
    password: password,
  });
  return res.status(200).render("login");
}

async function handleCheckLogin(req: Request, res: Response) {
  const { email, password } = req.body;
  const getUser = await Users.findOne({
    email: email,
    password: password,
  });

  if (!getUser)
    return res.status(404).render("login", { error: "Invalid credentials" });

  const sessionId = uuidv4();
  setUser(sessionId, getUser);
  res.cookie("uuid", sessionId);

  const getAllUrls = await URL.find({ createdBy: getUser._id });
  const userName = getUser.name;

  return res
    .status(200)
    .render("home", { personName: userName, allUrls: getAllUrls });
}

async function handleGetLogin(req: Request, res: Response) {
  return res.status(200).render("login");
}

async function handleGetSignUp(req: Request, res: Response) {
  return res.status(200).render("signup");
}

export {
  handleCreateSignUp,
  handleGetLogin,
  handleGetSignUp,
  handleCheckLogin,
};
