const { DataTypes } = require('sequelize');
module.exports=(sequelize,Sequelize)=>{
    const User=sequelize.define("Users",{
        roleId:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references:{
                model:"Roles",
                key:'id'
            }
        },
        firstName:{
            type:DataTypes.STRING
        },
        lastName:{
            type:DataTypes.STRING
        },
        email:{
            type:DataTypes.STRING
        },
        password:{
            type:DataTypes.STRING
        }
    })
    return User
}