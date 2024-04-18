const express = require("express");
const app = express();
const dbConnect = require("./database")
require("dotenv").config();
const Port = process.env.PORT|| 4000;
const userRoute = require("./route/Route");
const bookmarkRoute = require("./route/bookmarkRoute")
const cors = require("cors")
dbConnect();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.get("/",(req,res)=>{
    res.status(200).json({
        success : true,
        message: "Server chal gaya bhai"
    })
});

app.use("/api", userRoute)
app.use("/api",bookmarkRoute)


app.listen(Port,()=>{
    console.log(`app is listening on port no . ${Port}`)
})