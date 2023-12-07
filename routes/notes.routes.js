module.exports=app=>{
    const notes=require("../controllers/notes.controller")
    var isLoggedIn=require("../middlewares/isLoggedIn")
    var router=require("express").Router()
    router.post("/new/:id",isLoggedIn,notes.create)
    router.get("/all/:id",isLoggedIn,notes.findAll)
    router.put("/:id/:userId",isLoggedIn,notes.update)
    router.delete("/delete/:id/:userId",isLoggedIn,notes.delete)
    app.use("/api/notes",router)
}