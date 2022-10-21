import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await prisma.user.create({
    data: {
      username: username,
      password: password,
      Car: {
        create: {
          name: "BMW",
          color: "black",
        },
      },
    },
    include: {
      Car: true,
    },
  });
  res.status(200).json({ user });
};

export const createMany = async (req: Request, res: Response) => {
  const { userList } = req.body;
  const users = await prisma.user.createMany({
    data: userList,
  });
  res.status(200).json(users);
};

export const getUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    include: {
      Car: true,
    },
  });
  res.status(200).json({ users });
};

export const getUser = async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json({ user });
};

export const updateUser = async (req: Request, res: Response) => {
  const { username } = req.body;
  const updatedUser = await prisma.user.update({
    where: {
      id: req.params.id,
    },
    data: {
      username: username,
    },
  });
  res.status(200).json({ user: updatedUser });
};

export const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  const deleteUser = await prisma.user.delete({
    where: {
      id: id,
    },
  });
  res.status(200).json({ user: deleteUser });
};

export const deleteUsers = async (req: Request, res: Response) => {
  const deleteCar = await prisma.car.deleteMany({});
  const deleteUsers = await prisma.user.deleteMany({});
  res.status(200).json({ user: deleteUsers });
};
