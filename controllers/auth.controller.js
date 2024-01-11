const db=require("../models")
const argon2=require("argon2")
const nodemailer=require("nodemailer")
const Users=db.Users
const Tokens=db.Tokens
const crypto=require("crypto")
const Sequelize=require("sequelize")
const Op=Sequelize.Op
const jwt=require("jsonwebtoken")

exports.create = async (req, res) => {
    try {
        const hashedPassword = await argon2.hash(req.body.password);
        let findUser=await Users.findOne({where:{email:req.body.email}})
        if(findUser!==null){
          res.send({
            message:"Email not available"
          })
          return
        }
        else{
          const user = {
            roleId: req.body.roleId,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword
        };
        const createdUser =Users.create(user);
        console.log("something is wrong")
        if(createdUser){
          res.send({message:"Account successfully create, login to continue"});
        }
        else{
          res.send({message:"unable to create account"})
        }
        
        }

        
    } catch (error) {
        res.status(500)
        
    }
};
exports.login=async(req,res)=>{
    try{
        const userEmail = req.body.email;
        const user = await Users.findOne({
          where: {
            email: userEmail
          },
        });
        if (user) {
          let comparePasswords=await argon2.verify(user.password,req.body.password)
          console.log(comparePasswords)
          
          if(comparePasswords){
            const secretKey="1234"
            const payload={
              userId:req.body.email,
              exp:Math.floor(Date.now()/1000)+3*60*60
            }
            let token=jwt.sign(payload,secretKey)
            let id=user.id
            res.send({token,id}).status(200);
          }
          else{
            res.send({message:"wrong email or password"}).status(500)
          }
          
        } else {
          
          res.status(404).send({
            message: 'User not found',
          });}
    }
    catch(error){
        console.error("Error logging in: ",error)
        res.status(500).send({
            message:error.message|| "Unable to sign in"
        })
    }
}
exports.forgotPassword=async(req,res)=>{
  console.log(req.body)
  const findUser=await Users.findOne({where:{email:req.body.email}})
  if(findUser){
    await Tokens.update({
      used:1
    },{where:{email:req.body.email}})
    var fpSalt=crypto.randomBytes(64).toString('base64')
    var expireDate=new Date(new Date().getTime()+(60*60*1000))
    await Tokens.create({
      email:req.body.email,
      expiration:expireDate,
      token:fpSalt,
      used:0
    })
    const transporter=nodemailer.createTransport({
      
      // host:"smtp.ethereal.email",
      // port:587,
      service:'outlook',
      auth:{
        user:"beullarugero6@outlook.com",
        pass:"increaseby2"
      }
    })
    let mailOptions={
      from:"beullarugero6@outlook.com",
      to:req.body.email,
      subject:"password reset",
      text:'To reset your password, please click the link below. \n\n http://localhost:3000'+'/reset?token='+encodeURIComponent(fpSalt)+'&email='+req.body.email
    }
    await transporter.sendMail(mailOptions,function(err,info){
      if(err){
        console.log(err)
      }
      else{
        console.log("Email sent"+info.response)
        res.send({message:fpSalt})
      }
    })
  }
  else{
    res.send({message:"Request denied"})
  }
  
}

exports.resetPassword=async(req,res)=>{
  console.log(req.body)
  await Tokens.destroy({where:{expiration:{[Op.lt]:Sequelize.fn('CURDATE')}}})
  let record=await Tokens.findOne({where:{
    email:req.body.email,
    expiration:{[Op.gt]:Sequelize.fn('CURDATE')},
    token:req.body.token,
    used:0
  }})
  if(record==null){
    res.send({message:"Token has expired. Please try password reset again"})
  }
  else{
    if(req.body.password1!==req.body.password2){
      return res.json({status:'error',message:"Passwords do not match, please try again"})
    }
    else{
      console.log("sucess")
      await Tokens.update({
        used:1
      },{where:{email:req.body.email}})
      let hashNewPassword=await argon2.hash(req.body.password1)
      await Users.update({
        password:hashNewPassword
      },{where:{email:req.query.email}})
      res.send({message:"Successfully reset password"})
    }
  }
}
