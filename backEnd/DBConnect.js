const mysql=require('mysql')


const myCon=mysql.createConnection({
    url:"localhost",
    port:3306,
    user:"root",
    password:"",
    database:"sgbit"
})

myCon.connect(function(err){
    if(err) console.log("Error connecting")
    else
    console.log("Connected to MYSQL!!!")
})

module.exports=myCon;
