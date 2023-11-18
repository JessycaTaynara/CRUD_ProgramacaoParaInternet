import express from "express"
import cors from "cors"
import usuario from "./API/routes/userRoutes.js"
import gato from "./API/routes/gatoRoutes.js"
import login from "./API/routes/authRoutes.js"

const app = express()

app.use(cors("*"), express.json(), usuario, gato, login)

app.listen(3000, ()=>{
    console.log("Api rodando")
})