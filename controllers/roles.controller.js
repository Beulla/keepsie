
const db=require("../models")
const Roles=db.Roles

exports.create = async (req, res) => {
  console.log(req.body);

  try {
    if (!req.body.roleName) {
      res.status(400).send({
        message: "Role name should be provided",
      });
      return;
    }

    const role = {
      roleName: req.body.roleName,
    };

    const createdRole = await Roles.create(role);

    res.status(201).send({
      message: "Role created successfully",
      data: createdRole,
    });
  } catch (error) {
    console.error(error);

    res.status(500).send({
      message: error.message || "Unable to create a new role",
    });
  }
};

exports.findAll=(req,res)=>{
    Roles.findAll()
    .then(data=>{res.send(data)}).
    catch(err=>
        {res.status(500).
            send({message:err.message||"Unable to retrieve roles"})})
}
exports.findOne=(req,res)=>{
    console.log(req.params.id)
    Roles.findByPk(req.params.id)
    .then(data=>{
        if(data){
            res.send(data)
        }else{
            res.status(404).send({
                message:`Can not find role with the provided id`
            })
        }
    })
    .catch(err=>{
        res.status(500).send({
            message:"Error retrieving tutorial with the provided id"
        })
    })
}
exports.update=(req,res)=>{
    const id=req.params.id
    Roles.update(req.body,{where:{id:id}}).then(num=>{
        if(num==1){
            res.send({message:"role was successfully updated"})
        }
        else{
            res.send({
                message:`Failed to update role. Try again`
            })
        }
    })
    .catch(err=>{
        res.status(500).send({
            message:"Error updating role"
        })
    })
}
exports.delete=(req,res)=>{
    const id=req.params.id
    Roles.destroy({
        where:{id:id}
    }).then(num=>{
        if(num==1){
            res.send({
                message:"Successfully deleted role"
            })
        }
        else{
            res.send({
                message:"Failed to delete role"
            })
        }
    })
    .catch(err=>{
        res.status(500).send({
            message:"Error deleting role"
        })
    })
}