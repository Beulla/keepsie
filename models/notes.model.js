const { DataTypes } = require('sequelize');
module.exports=(sequelize,Sequelize)=>{
    const Notes=sequelize.define("Notes",{
        userId:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references:{
                model:"Users",
                key:'id'
            }
        },
        noteTitle:{
            type:DataTypes.STRING
        },
        noteDescription:{
            type:DataTypes.STRING
        }
    })
    return Notes
}