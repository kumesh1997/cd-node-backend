import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors"
import helmet from "helmet"

const userRoutes = require('./routes/user.routes');
const projectRoutes = require('./routes/project.routes');

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cors())
app.use(helmet())

app.use('/users', userRoutes);
app.use('/projects', projectRoutes);



app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});