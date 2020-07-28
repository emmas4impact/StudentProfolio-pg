const orm = require("../../db");
const Sequelize =require("sequelize");
const { INTEGER } = require("sequelize");

const Student = orm.define("students",{
    _id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
        
    },
    firstname:{
        type: Sequelize.STRING,
        allowNull: false,
       
        
    },
    surname:{
        type: Sequelize.STRING,
        allowNull: false,
        
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false,
        
    },
    dateofbirth:{
        type: Sequelize.DATE,
        allowNull: false,
        
    },
},{
    timestamps: false
})

module.exports =Student;