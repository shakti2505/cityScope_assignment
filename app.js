import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import path from "path";
import url from "url";
import cookieParser from "cookie-parser";
import express from "express";
import http from "http";
import connectDB from "./DB/connectDB.js";
import addcreators from './routes/creators/addCreators.js'
import authenticationRoutes from "./routes/authentication/authenticationRoutes.js";
import bookingRoutes from './routes/createbooking.js'
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 4800;
const DATABASE_URL = process.env.DATABASE_URL;
connectDB(DATABASE_URL);

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const allowedOrigins = [
  "http://localhost:3000",
  "https://scholerhub.onrender.com/",
];


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);
app.use(express.static(path.join(__dirname, "build")));
app.use("/authentication", authenticationRoutes);
app.use("/creator", addcreators)
app.use("/booking", bookingRoutes)
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
