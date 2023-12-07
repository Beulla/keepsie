const express=require("express");
const cors=require("cors");
const app=express()
const db=require("./models")

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    
  };
  
  app.use(cors(corsOptions));

app.use(express.json())
app.use(express.urlencoded({extended:true}))

db.sequelize.sync()
.then(()=>{
    console.log("synced db")
})
.catch((err)=>{
    console.log("failed to sync db: "+err.message)
})
app.get("/",(req,res)=>{
    res.json({message:"welcome"})
})

require("./routes/roles.routes")(app)
require("./routes/notes.routes")(app)
require("./routes/auth.routes")(app)
const port=process.env.port||8080;
app.listen(port,()=>{
    console.log("server up and running")
})