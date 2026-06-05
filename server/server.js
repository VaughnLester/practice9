import express from "express";

const app = express();

app.get("/", (req, res)=>{
    res.send("HELLO WORLD");
})

app.listen(2000, ()=>{
    console.log("app running on port 2000")
})