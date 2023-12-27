const express = require('express')
const router = express.Router()
//const bp=require('body-parser')
//const cors=require('cors')
const myCon=require('../DBConnect')
// middleware that is specific to this router

/*router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})*/

router
    .route("/checkifAlreadyExists")
    .post((req,resp)=>{
    let fid=parseInt(req.body.fid);
    let scode=req.body.scode
    let acadyear=req.body.acadyear
    let div=req.body.division

    let data=[]

    data.push(fid);data.push(scode);data.push(acadyear);data.push(div)
    let sql="select *  from facultysubjects where scode=? and acadyear=? and Division=?"
    myCon.query(sql,[scode,acadyear,div],function(err,result){
    
        if(err) console.log(err);
        else {
        console.log("Aready exists "+result)    
        resp.send(result)
        }
    })

})

//Given a semester get all Subjects of that semester
router
   .route("/api/getallSubjects/:sem")
   .get((req,resp)=>{
    let sem=parseInt(req.params.sem)
    myCon.query("select * from subject where sem="+sem,function(err,result){
        if(err) console.log(err)
        else
        resp.send(result);
    }
    );
})


//Faculty subject allotmet
router
    .route("/insertAllotSubject")
    .post((req,resp)=>{
    let fid=parseInt(req.body.fid);
    let scode=req.body.scode
    let acadyear=req.body.acadyear
    let div=req.body.division

    let data=[]
    
    data.push(fid);data.push(scode);data.push(acadyear);data.push(div)
    let sql="insert into facultysubjects(fid,scode,acadyear,Division) values(?)";
    console.log(data)
    myCon.query(sql,[data],function(err,result){
    
        if(err) console.log(err);
        else
        resp.send(result)
    })
})

//getFacComments
router
    .route("/getFacComments")
    .post((req,resp)=>{
    let fid=parseInt(req.body.fid);
    let scode=req.body.scode
    console.log("FID is"+fid)
    let data=[]
    
    data.push(fid);data.push(scode);
    let sql="select * from facsuboptions where fid=? and scode=?";
    console.log(data)
    myCon.query(sql,[fid,scode],function(err,result){
    
        if(err) console.log("I am here "+err);
        else
        resp.send(result)
    })
    
})

//Register faculty answers
router
    .route("/registersubchoice")
    .post((req,resp)=>{
    let fid=parseInt(req.body.fid);
    let scode=req.body.scode
    let exp=parseInt(req.body.exp)
    let ntaught=parseInt(req.body.ntaught)
    let allAnswers=req.body.allAnswers;
    var i=0;
    var answers=""
    for(i=0;i<allAnswers.length;i++)
    answers=answers+allAnswers[i]
    let data=[]

data.push(fid);data.push(scode);data.push(exp);data.push(ntaught);data.push(answers)
let sql="insert into facsuboptions(fid,scode,exp,ntaught,answer) values(?)";
console.log(data)
myCon.query(sql,[data],function(err,result){

    if(err) console.log(err);
    else
    console.log(result)
})

})

router
    .route("/getFacOptions/:scode")
    .get((req,resp)=>{
     let scode=req.params.scode;
        myCon.query("select f.fid,f.fname,fo.exp,fo.ntaught from facsuboptions fo, faculty f where fo.fid=f.fid and scode='"+scode+"'",function(err,result){
        if(err) console.log(err)
        else {
            console.log(result)
        resp.send(result);
        }
     }
    );
})

module.exports=router