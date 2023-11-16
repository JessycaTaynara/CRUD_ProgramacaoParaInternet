import express from "express"
import cors from "cors"
import usuario from "./API/routes/userRoutes.js"

const app = express()

app.use(cors("*"), express.json(), usuario)

app.listen(3000, ()=>{
    console.log("Api rodando")
})