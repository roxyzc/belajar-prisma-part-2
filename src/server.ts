import express, { Request, Response } from "express";
import https from "https";
import fs from "fs";
import route from "./routes/user.route";
const app = express();

const options = {
  key: fs.readFileSync("certificates/key.pem"),
  cert: fs.readFileSync("certificates/cert.pem"),
};

app.use(express.json());
app.use(route);

https.createServer(options, app).listen(3000, () => {
  console.log("Listen at port 3000");
});
