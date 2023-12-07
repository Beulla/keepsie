const { DataTypes } = require('sequelize');
module.exports=(sequelize,Sequelize)=>{
    const Note=sequelize.define("Notes",{
        email:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references:{
                model:"Users",
                key:'email'
            }
        },
        token:{
            type:DataTypes.STRING
        },
        expiration:{
            type:DataTypes.DATE
        },
        used:{
            type:DataTypes.INTEGER
        }
    })
    return Note
}