import express, { Request, Response } from "express";
import https from "https";
import fs from "fs";
import { PrismaClient } from "@prisma/client";
const app = express();

const options = {
  key: fs.readFileSync("certificates/key.pem"),
  cert: fs.readFileSync("certificates/cert.pem"),
};

app.use(express.json());

const prisma = new PrismaClient();

app.post("/", async (req: Request, res: Response) => {
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
});

app.post("/createManyUsers", async (req: Request, res: Response) => {
  const { userList } = req.body;
  const users = await prisma.user.createMany({
    data: userList,
  });
  res.status(200).json(users);
});

app.get("/", async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    include: {
      Car: true,
    },
  });
  res.status(200).json({ users });
});

app.get("/:id", async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json({ user });
});

app.put("/:id", async (req: Request, res: Response) => {
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
});

app.delete("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const deleteUser = await prisma.user.delete({
    where: {
      id: id,
    },
  });
  res.status(200).json({ user: deleteUser });
});

https.createServer(options, app).listen(3000, () => {
  console.log("Listen at port 3000");
});
