import express, { urlencoded } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import db from './utils/db.js'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import  routes  from './routes/main.js'

dotenv.config()
const port = process.env.PORT

// const routes = ""

const app = express()
app.use(cors({
    origin:'http://localhost:3000',
    methods:["GET","POST","DELETE","PUT"],
    credentials: true,
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(morgan("dev"));
app.use("/api",routes);
db()

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(port,()=>{
    console.log(`app listening to port ${port}`)
})