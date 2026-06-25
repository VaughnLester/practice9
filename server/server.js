import express from "express";
import projectRouter from "./routes/projectAPI.js";
import path from "path";

const app = express();
app.use(express.json());

//api routes first
app.use(projectRouter);

app.use(express.static("../client/practice8/dist"))


//catch all fallback route, if express doesn't recognize it react will then handle it 
app.get(/.*/, (req, res) => {
    res.sendFile(
        path.resolve("../client/practice8/dist/index.html")
    );
});

app.listen(2000, ()=>{
    console.log("app running on port 2000")
})