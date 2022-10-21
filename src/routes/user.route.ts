import { Router, Request, Response } from "express";
import {
  getUser,
  getUsers,
  updateUser,
  createUser,
  createMany,
  deleteUser,
  deleteUsers,
} from "../controllers/user.controller";
const route = Router();

route.route("/").post(createUser).get(getUsers).delete(deleteUsers);
route.route("/:id").put(updateUser).get(getUser).delete(deleteUser);
route.post("/createManyUsers", createMany);

export default route;
