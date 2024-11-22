import express, { Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import errorMiddleware from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFoundRoute";
const app = express();

app.use(express.json());
app.use(cors({origin:['https://gardening-tips-platform-client.vercel.app', 'http://localhost:3000']}));

app.use("/api/v1", router);

const test = async (req: Request, res: Response) => {
  res.send({ message: "gardening platform server is running" });
};

app.get("/", test);

app.use(notFound);
app.use(errorMiddleware);

export default app;
