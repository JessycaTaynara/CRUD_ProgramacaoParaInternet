import express from "express"
import cors from "cors"

const app = express()

app.use(cors("*"), express.json())

app.listen(3000, ()=>{
    console.log("Api rodando")
})