const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
dotenv.config()
const db = require("./db")
const studentRouter = require("./routes/students")
const projectRouter = require("./routes/projects")
const listEndpoints = require("express-list-endpoints")
// const sequelize = require("./db");

// sequelize.authenticate().then(
//     ()=>console.log("Its working")).catch((e)=>console.log(e))
const server = express()
server.use(cors())
server.use(express.json())

server.get("/", (req, res)=> {
    res.send("The server is running!")
})

server.use("/students", studentRouter)
server.use("/projects", projectRouter)

console.log(listEndpoints(server))
server.listen(process.env.PORT || 3456, () => console.log("Running on ", process.env.PORT || 3456))