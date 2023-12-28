const express=require('express')
const cors=require('cors')
const bp=require('body-parser')
const myCon=require('./DBConnect')
const multer=require('multer')
const nodemailer=require('nodemailer')
const fs=require('fs')
const path=require('path')
const App=new express();
const subjectAllot=require('./routes/subjectAllot')
//Download code


App.use(cors({
    "origin" : "*"
}))

//App.use('/subject', subjectAllot)

App.use(express.urlencoded({
    extended: true,
  }));
  
App.use(express.json())
App.use(bp.json())

App.post("/registersubchoice",(req,resp)=>{
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

App.get("/getFacOptions/:scode",(req,resp)=>{
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


App.post("/registersubchoice",(req,resp)=>{
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
resp.send(result)
})

})

App.post("/getFacComments",(req,resp)=>{
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



App.get("/api/download/:filename", (req, resp)=>{
    var fname=req.params.filename
    fname="\\"+fname
    console.log("I am here.."+fname)
    const file = `${__dirname}\\uploads\\Faculty`+fname;
    console.log(file)
    fs.readFile(file,(err,content)=>{
        if(err) console.log(err)
     resp.writeHead(200,{"content-type":"image/png"})
     resp.end(content);
    })

    resp.download(file); 
    console.log("Download succesful..")
  });



//Upload Code
var storage =   multer.diskStorage({  
    destination: function (req, file, callback) {  
      callback(null, './uploads/Faculty');  
    },  
    filename: function (req, file, callback) {  
      callback(null, file.originalname);  
    }  
  });  

  var upload = multer({ storage : storage}).single('myfile');  

  App.post('/api/uploadFile',function(req,res){ 
    //console.log(req.body.fid)
   // console.log(subFolder);
    upload(req,res,function(err) {  
        if(err) {  
            return res.send("Error uploading file.");  
        }  
        res.send("<h3>File is uploaded successfully!</h3>");  
    });  
});  



App.listen(8000,function(err){
if(err) console.log(err)
else 
console.log("SErver started at...8000")

})

App.post("/api/sendEmail",(req,resp)=>{

    let recvemail=req.body.recvemail;
    let subj=req.body.subj;
    let msg=req.body.mesg;
    console.log(recvemail)
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'sfroddjforkts@gmail.com',
          pass: 'burwuiyumfovbgro'
        }
      });
      
      var mailOptions = {
        from: 'sfroddjforkts@gmail.com',
        to: recvemail,
        subject:subj,
        text: msg
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

})

//Get all facultyy publications
App.get("/api/getAllPublications/:fid",(req,resp)=>{
    const credits=[]
    var fid=req.params.fid;
    //var pwd=req.body.password;
    credits.push(fid)
    console.log("I am here.. Hi")
    //credits.push(pwd)
    myCon.query("select * from facultydocs where fid='"+fid+"'",function(err,result){
        if(err) console.log(err)
        else{
            console.log(result)
        resp.send(result);
        }
    }
    );
    })

    

//Get all facultyy publications
App.get("/api/getAllWConfs/:fid",(req,resp)=>{
    const credits=[]
    var fid=req.params.fid;
    //var pwd=req.body.password;
    credits.push(fid)
    console.log("I am here.. Hi")
    //credits.push(pwd)
    myCon.query("select * from facultyworkshopconf where fid='"+fid+"'",function(err,result){
        if(err) console.log(err)
        else{
            console.log(result)
        resp.send(result);
        }
    }
    );
    })

   
//Insert Faculty Journal Conf. publications
App.post("/api/addJournal",(req,resp)=>{
let fid=req.body.fid
let ptitle=req.body.ptitle
let jcname=req.body.journalconf
let authors=req.body.authors
let publisher=req.body.publisher
let monthyear=req.body.monthyear
let acadyear=req.body.acadyear
let data=[]; data.push(fid);data.push(ptitle);data.push(authors);data.push(jcname)
data.push(publisher);data.push(monthyear);data.push(acadyear)

let sql="insert into facultydocs(fid,title,authors,journalorconf_title,publisher,monthYear,acadyear) values(?)"

myCon.query(sql,[data],(err,result)=>{

    if(err) console.log(err)
    else 
    {
        console.log(result)
        resp.send(result)
    }
})

})

//Add conference
App.post("/api/addworkshopconf",(req,resp)=>{
    let fid=req.body.fid
    let ptitle=req.body.ptitle
    let hostorg=req.body.hostorg
    let city=req.body.city
    let wcdate=req.body.wcdate
    let days=req.body.days
    let acadyear=req.body.acadyear;
    console.log(acadyear)
    let data=[]; data.push(fid);data.push(ptitle);data.push(hostorg);data.push(city)
    data.push(wcdate);data.push(days);data.push(acadyear);
    
    let sql="insert into facultyworkshopconf(fid,workshopconftitle,hostorg,city,wcdate,days,acadyear) values(?)"
    
    myCon.query(sql,[data],(err,result)=>{
    
        if(err) console.log(err)
        else 
        {
            console.log(result)
            resp.send(result)
        }
    })
    
})
    
App.get("/api/getUser/:user",(req,resp)=>{
const credits=[]
var uname=req.params.user;
//var pwd=req.body.password;
credits.push(uname)
//credits.push(pwd)
myCon.query("select * from loginpwds where uname='"+uname+"'",function(err,result){
    if(err) console.log(err)
    else
    resp.send(result);
}
);
})
App.post("/api/addFaculty",(req,resp)=>{
    let fname=req.body.fname
    let lname=req.body.lname
    let dob=req.body.dob
    let designation=req.body.designation
    let gender=req.body.gender
    let doj=req.body.doj
    let branch=req.body.branch
    let emailId=req.body.emailId
    let cellNum=req.body.cellNum
    let data=[]
    let dno=0
    switch(branch)
     {
        case "CSE":dno=1;break;
        case "ECE" :dno=2;break;
        case "EEE":dno=3;break;
        case "CIVIL":dno=4;break;
        case "MECH":dno=5;break;
        case "AIDS":dno=6;break;
        case "CSBS":dno=7;break;
     }
     data.push(dno);data.push(fname);data.push(lname);data.push(dob);data.push(designation)
     data.push(gender);data.push(doj);data.push(branch);data.push(emailId)
     data.push(cellNum); 

    myCon.query("insert into faculty(dno,fname,lname,dob,designation,gender,doj,branch,emailId,cellNum)"+
    " values(?,?,?,?,?,?,?,?,?,?)",data,(err,result)=>{
        if(err) console.log(err)
        else
        resp.send(result)
    })

})

App.post("/api/getAllStudents",(req,resp)=>{
    let fname=req.body.fname
    let lname=req.body.lname
    let dob=req.body.dob
    let designation=req.body.designation
    let gender=req.body.gender
    let doj=req.body.doj
    let fromSem=parseInt(req.body.fromSem);
    let toSem=parseInt(req.body.toSem)
    let branch=req.body.branch
    let emailId=req.body.emailId
    let cellNum=req.body.cellNum
    let data=[]
    let dno=0
    switch(branch)
     {
        case "CSE":dno=1;break;
        case "ECE" :dno=2;break;
        case "EEE":dno=3;break;
        case "CIVIL":dno=4;break;
        case "MECH":dno=5;break;
        case "AIDS":dno=6;break;
        case "CSBS":dno=7;break;
     }
     let tableName=""
     console.log("I am here "+fromSem)
     switch(fromSem){
         case 1: tableName="istyearstudents"; break; 
         case 2: tableName="istyearstudents"; break; 
         case 3: tableName="iiyearstudents"; break; 
         case 4: tableName="iiyearstudents"; break; 
         case 5: tableName="iiiyearstudents"; break; 
         case 6: tableName="iiiyearstudents"; break;
         case 7: tableName="ivyearstudents"; break; 
         case 8: tableName="ivyearstudents"; break;
     }
     console.log("I am here "+fromSem+"  TableName"+tableName+" dno="+dno)
     //data.push(dno);data.push(fname);data.push(lname);data.push(dob);data.push(designation)
     //data.push(gender);data.push(doj);data.push(branch);data.push(emailId)
     //data.push(cellNum); 
     data.push(dno);data.push(fromSem)
    myCon.query("select * from "+tableName+" where dno=? and sem=?",data,(err,result)=>{
        if(err) console.log(err)
        else
        resp.send(result)
    })

})

App.post("/api/checkifAlreadyPromoted",(req,resp)=>{
    let fromSem=parseInt(req.body.fromSem);
    let toSem=parseInt(req.body.toSem)
    let branch=req.body.branch
    let emailId=req.body.emailId
    let cellNum=req.body.cellNum
    let data=[]
    let dno=0
    acadyear=req.body.fromYear;
    switch(branch)
     {
        case "CSE":dno=1;break;
        case "ECE" :dno=2;break;
        case "EEE":dno=3;break;
        case "CIVIL":dno=4;break;
        case "MECH":dno=5;break;
        case "AIDS":dno=6;break;
        case "CSBS":dno=7;break;
     }
     let tableName=""
     console.log("I am here in Check"+toSem +" dno="+dno+acadyear)
     switch(fromSem){
         case 1: tableName="istyearstudents"; break; 
         case 2: tableName="istyearstudents"; break; 
         case 3: tableName="iiyearstudents"; break; 
         case 4: tableName="iiyearstudents"; break; 
         case 5: tableName="iiiyearstudents"; break; 
         case 6: tableName="iiiyearstudents"; break;
         case 7: tableName="ivyearstudents"; break; 
         case 8: tableName="ivyearstudents"; break;
     }
     
     //data.push(dno);data.push(fname);data.push(lname);data.push(dob);data.push(designation)
     //data.push(gender);data.push(doj);data.push(branch);data.push(emailId)
     //data.push(cellNum); 
     //data.push(dno)
     let sql1="select * from "+tableName+ " where sem="+toSem+ " and dno="+dno+ " and acadyear="+acadyear
     console.log(sql1)
     myCon.query("select * from "+tableName+ " where sem="+toSem+ " and dno="+dno+ " and acadyear='"+acadyear+"'",(err,result)=>{

          if(err) console.log("Erorr"+err)
          else{
        resp.send(result)
        console.log(result.length)
          }
     })

})

App.post("/api/getpromotedStudents",(req,resp)=>{
    let fname=req.body.fname
    let lname=req.body.lname
    let dob=req.body.dob
    let acadyear=req.body.toYear
    let designation=req.body.designation
    let gender=req.body.gender
    let doj=req.body.doj
    let fromSem=parseInt(req.body.fromSem);
    let toSem=parseInt(req.body.toSem)
    let branch=req.body.branch
    let emailId=req.body.emailId
    let cellNum=req.body.cellNum
    let data=[]
    let dno=0
    switch(branch)
     {
        case "CSE":dno=1;break;
        case "ECE" :dno=2;break;
        case "EEE":dno=3;break;
        case "CIVIL":dno=4;break;
        case "MECH":dno=5;break;
        case "AIDS":dno=6;break;
        case "CSBS":dno=7;break;
     }
     let tableName=""
     console.log("I am here in Promote Sem"+toSem +" dno="+dno)
     switch(toSem){
         case 1: tableName="istyearstudents"; break; 
         case 2: tableName="istyearstudents"; break; 
         case 3: tableName="iiyearstudents"; break; 
         case 4: tableName="iiyearstudents"; break; 
         case 5: tableName="iiiyearstudents"; break; 
         case 6: tableName="iiiyearstudents"; break;
         case 7: tableName="ivyearstudents"; break; 
         case 8: tableName="ivyearstudents"; break;
     }
    
    myCon.query("select * from "+tableName+" where sem="+toSem+" and dno="+dno+" and acadyear='"+acadyear+"'",(err,result)=>{

        if(err) console.log(err)
        else
        resp.send(result)
    })
})

App.post("/api/promoteStudents",(req,resp)=>{
    let fname=req.body.fname
    let lname=req.body.lname
    let dob=req.body.dob
    let acadyear=req.body.toYear
    let designation=req.body.designation
    let gender=req.body.gender
    let doj=req.body.doj
    let fromSem=parseInt(req.body.fromSem);
    let toSem=parseInt(req.body.toSem)
    let branch=req.body.branch
    let emailId=req.body.emailId
    let cellNum=req.body.cellNum
    let data=[]
    let dno=0
    switch(branch)
     {
        case "CSE":dno=1;break;
        case "ECE" :dno=2;break;
        case "EEE":dno=3;break;
        case "CIVIL":dno=4;break;
        case "MECH":dno=5;break;
        case "AIDS":dno=6;break;
        case "CSBS":dno=7;break;
     }
     let tableName=""
     console.log("I am here in Promote Sem"+toSem +" dno="+dno)
     switch(toSem){
         case 1: tableName="istyearstudents"; break; 
         case 2: tableName="istyearstudents"; break; 
         case 3: tableName="iiyearstudents"; break; 
         case 4: tableName="iiyearstudents"; break; 
         case 5: tableName="iiiyearstudents"; break; 
         case 6: tableName="iiiyearstudents"; break;
         case 7: tableName="ivyearstudents"; break; 
         case 8: tableName="ivyearstudents"; break;
     }
     
     data.push(dno);data.push(fname);data.push(lname);data.push(dob);data.push(designation)
     data.push(gender);data.push(doj);data.push(branch);data.push(emailId)
     data.push(cellNum); 
     //data.push(dno)
    myCon.query("insert into  "+tableName+"(usn,fname,lname,dno,acadyear) select usn,fname,lname,dno,acadyear from "+tableName+" where sem="+fromSem+" and dno="+dno+" and acadyear='"+acadyear+"'",(err,result)=>{
        if(err) console.log(err)
        else
        myCon.commit();
    })
    let sql="update  "+tableName+" set sem="+toSem+" where sem=0 and dno="+dno+" and acadyear='"+acadyear+"'"
    //console.log("I am here "+toSem+"  TableName "+tableName+ "dno = "+dno+" acadyear= "+acadyear)
    
    myCon.query(sql,(err,result)=>{
        if(err) console.log(err)
        else{
        myCon.commit();

        }
    myCon.query("select * from "+tableName+" where sem="+toSem+" and dno="+dno+" and acadyear='"+acadyear+"'",(err,result)=>{

        if(err) console.log(err)
        else
        resp.send(result)
    })
})

})
App.get("/api/getAttendance/:scode",(req,resp)=>{

    var scode=req.params.scode;
    //console.log("I am here " +scode);
    myCon.query("select * from attendance where scode='"+scode+"'",function(err,result){
        if(err) console.log(err)
        else
        resp.send(result);
    }
    );
})

//Display IA Score and Attendce for faculty..
App.post("/api/getIAMarks",(req,resp)=>{
    var scode=req.body.scode;
    var div=req.body.div;
    var acadyear=req.body.acadyear
    let branch=req.body.branch
    let sem=req.body.sem;
    //sem=3
    var dno=1
    switch(branch){

        case "CSE" : dno=1;break;
        case "ECE" : dno=2;break;
        case "EEE" : dno=3;break;
        case "CIVIL" : dno=4;break;
        case "MECH" : dno=5;break;
        case "AIDS" : dno=6;break;
        case "CSBS" : dno=7;break;
    }
    
    if(sem==1 || sem==2) tableName="istyeariascore";
    if(sem==3 || sem==4) tableName="iindyeariascore";
    if(sem==5 || sem==6) tableName="iiirdyeariascore";
    if(sem==7 || sem==8) tableName="ivthyeariascore";
    

   // console.log("I am here " +acadyear);
    myCon.query("select * from " +tableName+" where scode='"+scode+"' and division='"+div+"' and acadyear='"+acadyear+"' and dno="+dno,function(err,result){
        if(err) console.log(err)
        else
        resp.send(result);
    }
    );
})


App.get("/api/initLeave/:ayear",(req,resp)=>{
   acadyear=req.params.ayear;
   console.log(acadyear)
   //for(let i=1004;i<=1032;i++){
   sql="update facultyleave set cl=12,cla=0, el=0,ela=0, dl=5,dla=0, ml=0, mla=0,rh=2,rha=0 where acadyear='"+acadyear+"'"
   myCon.query(sql,function(err,result){
    if(err) console.log(err)
    else{
    console.log(result)
    resp.send(result)
    }
   })
//}
})
App.post("/api/sendData",(req,resp)=>{
let fname=req.body.fname;
let lname=req.body.lname;
console.log(fname+  "    "+lname)
})

App.post("/api/assigndivisions",(req,resp)=>{

let fromUSN=req.body.fromUSN 
let toUSN=req.body.toUSN 
let acadyear=req.body.acadyear
let division=req.body.div
let sem=parseInt(req.body.sem)
if(sem==1) tableName="istyearstudents"
else if(sem==3) tableName="iiyearstudents"
else if(sem==5) tableName="iiiyearstudents"
else tableName="ivyearstudents"
let data=[]
data.push(division);data.push(fromUSN); data.push(toUSN);data.push(sem);data.push(acadyear)
myCon.query("update "+tableName+" set division=? where usn between ? and ? and sem=? and acadyear=?",data,(err,result)=>{

    if(err) console.log(err)
    else
    resp.send(result)

})

})


App.post("/api/getUSNs",(req,resp)=>{

    let sem=parseInt(req.body.sem)
    let acadyear=req.body.acadYear
    let branch=parseInt(req.body.branch)
    tableName=""
    switch(sem){

        case 1:tableName="istyearstudents" ;break;

        case 3:tableName="iiyearstudents";break;

        case 5:tableName="iiiyearstudents";break;

        case 7 : tableName="ivyearstudents"
    }
    let data=[]
    data.push(sem);data.push(branch) ;data.push(acadyear)
  
    myCon.query("select * from "+tableName+ " where sem=? and dno=? and acadyear=?",data,(err,result)=>{
        if(err)
        console.log(err)
        else
        resp.send(result)
    })

})
//Transfer from Master to Ist Semester
App.post("/api/transferFromMaster",(req,resp)=>{

  let acadYear=req.body.acadYear
  //Always admit into Ist Sem Student Master table
  myCon.query("insert into istyearstudents(usn,fname,lname,dno,acadyear,sem,gender,cellno,emailID) select usn,fname,lname,dno,admyear,sem,gender,cellNum,emailid from student where admyear='"+acadYear+"' and transferStatus='Pending'",(err,result)=>{

    if(err) console.log(err)
    else
resp.send(result)
  })



})

App.get("/api/getPendingLeaves",(req,resp)=>{

    sql="select * from facultyleaveapps where status='Pending'"
    myCon.query(sql,function(err,result){
if(err) console.log(err)
else{
   console.log(result)
   resp.send(result)
} 

    })

})

//Process Leave approved by Head of the department

App.post("/api/approveLeave",(req,resp)=>{
let fid=parseInt(req.body.fid);
let lid=parseInt(req.body.lid)
let ltype=req.body.ltype
let duration=parseFloat(req.body.ndays)
console.log("Duration  "+duration)
var sql=""

switch(ltype)
{
  case "CL" : sql="update facultyleave set cla=cla+"+duration+" where fid=?"
              break;
  case "EL" : sql="update facultyleave set ela=ela+"+duration+" where fid=?"  ; break;

  case "RH" : sql="update facultyleave set rha=rha+"+duration+" where fid=?"  ;break;

  case "ML" : sql="update facultyleave set mla=mla+"+duration+" where fid=?"  ;break;
  
  case "DL" : sql="update facultyleave set dla=dla+"+duration+" where fid=?"  ;break;

}
console.log(sql)
myCon.query(sql,[fid],function(err,result){

    if(err) console.log(err)
    else {
    resp.send(result)
    console.log(result)
    }
})

sql="update facultyleaveapps set status='Approved' where lid="+lid

myCon.query(sql,(err,result)=>{
if(err) console.log(err)
else
console.log("Leave Approved")

})

})

//Check if already assigned
// Commented out and pushed to a router
App.post("/api/checkifAlreadyExists",(req,resp)=>{
    let fid=parseInt(req.body.fid);
    let scode=req.body.scode
    let acadyear=req.body.acadyear
    let div=req.body.division

    let data=[]

    data.push(fid);data.push(scode);data.push(acadyear);data.push(div)
    let sql="select *  from facultysubjects where fid=? and scode=? and Division=?"
    myCon.query(sql,[fid,scode,div],function(err,result){
    
        if(err) console.log(err);
        else {
        console.log("Aready exists "+result)    
        resp.send(result)
        }
    })

})

//Faculty subject allotmet
App.post("/api/insertAllotSubject",(req,resp)=>{
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

App.post("/api/getFacComments",(req,resp)=>{
    let fid=parseInt(req.body.fid);
    let scode=req.body.scode

    let data=[]
    
    data.push(fid);data.push(scode);
    let sql="select * from facsuboptions where fid=? and scode=?";
    console.log(data)
    myCon.query(sql,[fid,scode],function(err,result){
    
        if(err) console.log(err);
        else
        resp.send(result)
    })
    


})



App.post("/api/registersubchoice",(req,resp)=>{
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

App.get("/api/getmaxLID",(req,resp)=>{

    myCon.query("select max(lid) as maxlid from facultyleaveapps",function(err,result){
        if(err) console.log(err)
        else{
            console.log(result)
            resp.send(result);
        }

    })
})
//Insert mentoring Detals here..




App.get("/api/getDiscDetails/:usn",(req,resp)=>{

   let usn="'"+req.params.usn+"'";
   console.log(usn)
   let sql="select * from mentoringdetails where usn="+usn

   myCon.query(sql,(err,result)=>{

    if(err) console.log(err)
    else{
    resp.send(result)
   //   console.log(result)
    }
   })
})


App.post("/api/insertDiscussion",(req,resp)=>{

let usn=req.body.usn;
let dDate=req.body.dDate
let disc=req.body.discussion
let actiontaken=req.body.actiont
let resby=req.body.rby
let fid=req.body.fid
let data=[]
var sql

if(resby!="Self"){
    data.push(usn);data.push(dDate);data.push(disc);data.push(actiontaken);data.push(resby);data.push(fid)    
sql="insert into mentoringdetails(usn,discDate,discDetails,actiontaken,tobeResolvedBy,fid) values (?)"
}
else{
    data.push(usn);data.push(dDate);data.push(disc);data.push(actiontaken);data.push(resby);data.push("resolved");data.push(fid)    
sql="insert into mentoringdetails(usn,discDate,discDetails,actiontaken,tobeResolvedBy,status,fid) values (?)"
}
myCon.query(sql,[data],(err,result)=>{

if(err) console.log(err)
else
{
    console.log(result);
    resp.send(result)
}

})
})

App.post("/api/alternateArragements",(req,resp)=>{
    var datax=[] 
    var lid=130;
    lid=parseInt(req.body.lid);
    console.log("I am here..."+lid)
    let date1=req.body.adate
    let timing=req.body.timing
    let corl=req.body.corlab
    let altArr=req.body.altfaculty
    datax.push(lid);
    datax.push(date1)
    datax.push(timing)
    datax.push(corl)
    datax.push(altArr)
    
    sql="insert into leavearrangements(lid,arrdate,atime,classorlab,fname) values(?)"
    myCon.query(sql,[datax],function(err,result){
               if (err) console.log(err)
                    else
                        {
                        console.log(result)
                        resp.send(result)
                        }
                })
        })//End of REST API

//Record the leave application and pending for approval
App.post("/api/insertLeave",(req,resp)=>{
    console.log("I am in insert leave.:")
    let fid=parseInt(req.body.fid);
    let ltype=req.body.lType;
    let duration=req.body.duration;
    let fname=req.body.fname;
//DateTime dt = DateTime.ParseExact(dateString, "mm/dd/yyyy", CultureInfo.InvariantCulture);

    let sdate=req.body.sdate;
    let edate=req.body.edate;
    let alt1=req.body.alt1
    let alt2=req.body.alt2
    let info=req.body.info
    let datax=[]
    datax.push(fid); 
    datax.push(fname)
    datax.push(ltype);datax.push(duration)
    datax.push(sdate);datax.push(edate)
    datax.push(alt1);datax.push(alt2)
    datax.push(info)
    let sql="insert into facultyleaveapps(fid,fname,ltype,duration,stdate,endate,alt1,alt2,info) values (?)"

    myCon.query(sql,[datax],function(err,result){
    if(err) console.log(err)
    else
    {
        resp.send(result)
        console.log("I am here.. Leave info inserted..")
    }

    })

})


App.get("/api/getLeaveInfo/:fid",(req,resp)=>{
    let fid=parseInt(req.params.fid);
    sql="select * from facultyleave where fid=?"
    myCon.query(sql,[fid],function(err,result){
     if(err) console.log(err)
     else{
     console.log(result)
     resp.send(result);
     }
    })
 })

App.post("/api/getSubjects",(req,resp)=>{
   //Enroll Students for courses of a semester
   let scheme=parseInt(req.body.scheme)
   let sem=parseInt(req.body.sem) ; let dname=req.body.dname
   let acadyear=req.body.acadyear
   let dno=0
   switch(dname)
    {
        case "CSE":dno=1;break;
        case "ECE" :dno=2;break;
        case "EEE":dno=3;break;
        case "CIVIL":dno=4;break;
        case "MECH":dno=5;break;
        case "AIDS":dno=6;break;
        case "CSBS":dno=7;break;
    }

    let data=[]
    data.push(sem);data.push(scheme);data.push(dno)
    console.log(data)
    myCon.query("select * from subject where sem=? and scheme=? and dno=?",data,(err,result)=>{
          if(err) console.log(err)
          else{
          console.log(result)
          let tableName=""
          let stdTableName=""
          switch(sem){
            case 1: tableName="istyeariascore";stdTableName="iyearstudents";break
            case 2: tableName="istyeariascore";stdTableName="iyearstudents";break;
            case 3: tableName="iindyeariascore";stdTableName="iiyearstudents";break
            case 4: tableName="iindyeariascore";stdTableName="iiyearstudents";break; 
            case 5: tableName="iiirdyeariascore";stdTableName="iiiyearstudents";break
            case 6: tableName="iiirdyeariascore";stdTableName="iiiyearstudents";break;
            case 7: tableName="ivthyeariascore";stdTableName="ivyearstudents";break
            case 8: tableName="ivthtyeariascore";stdTableName="ivyearstudents";break;
          } 
          //Get all student USNs     
          myCon.query("select * from "+stdTableName,(err,result1)=>{
            if(err) console.log(err)
            else{
            console.log("Inside Total USNs "+result1.length)
           
         // console.log("Total USNs "+students.length)
          //For each subjectcode...
          //insert usn and subject code in table tableName;
          //For each subjectcode
          for(let i=0;i<result.length;i++)
             //For each student USN
             for(let j=0;j<result1.length;j++)
                //Insert USN and SubjectCode
                   {    let data=[]
                        let scode=result[i].scode
                        let usn=result1[j].usn
                        let div=result1[j].division
                        data.push(usn);data.push(scode);data.push(acadyear);data.push(dno)
                        data.push(div)
                        myCon.query("insert into "+tableName+"(usn,scode,acadyear,dno,division) values(?,?,?,?,?)",data,(err,result)=>{
                            if(err) console.log(err)
                           // else
                            //console.log(result.affectedRows)
                        })

                   }//InnerFor loop
                } //Else
                 
          resp.send(result)
            
        })  //Inner Query end
      }//Else
    }) //End of Outer query
})

//Show issues related to Hod
 App.get("/api/getAllIssues",(req,resp)=>{
  console.log("All issues sent")
  myCon.query("select mi.mid as mid,s.usn usn, f.fname as facfname,s.fname as sfname,discDetails,discDate from mentoringdetails mi,faculty f,student s where status='Pending' and tobeResolvedBy='Hod'"+
   " and f.fid=mi.fid and s.usn=mi.usn",function(err,result){
        if(err) console.log(err)
        else
        resp.send(result);
    }
    );
})

//Hod Remarks on faculty sent issue
App.post("/api/updateHremark",(req,resp)=>{

    let mid=req.body.mid;
    let hodc=req.body.hodc;
    let datax=[]
    
    datax.push(hodc);

    sql="update mentoringdetails set hodRemark=?, status='resolved' where mid="+mid;

    myCon.query(sql,[datax],function(err,result){
      if(err) console.log(err);
      else{
      resp.send(result);
      console.log(result);
      }

    })

})

App.get("/api/getallFaculty",(req,resp)=>{

    myCon.query("select * from faculty",function(err,result){
        if(err) console.log(err)
        else
        resp.send(result);
    }
    );
})

App.get("/api/getallSubjects",(req,resp)=>{

    myCon.query("select * from subject",function(err,result){
        if(err) console.log(err)
        else
        resp.send(result);
    }
    );
})

App.get("/api/getallSubjects/:sem",(req,resp)=>{
    let sem=parseInt(req.params.sem)
    myCon.query("select * from subject where sem="+sem,function(err,result){
        if(err) console.log(err)
        else
        resp.send(result);
    }
    );
})

App.get("/api/getMentees/:fid",(req,resp)=>{
    fid=req.params.fid;
    myCon.query("select f.fname as facName,s.fname as fname, cellNum, s.emailid as emailid, fm.usn,fm.sem from faculty f, student s, facultymentoring fm where fm.fid=f.fid and fm.usn=s.usn  and fm.fid='"+fid+"'",function(err,result){
        if(err) console.log(err)
        else {
            console.log(result)
        resp.send(result);
        }
    }
    );



})

App.get("/api/getFacOptions/:scode",(req,resp)=>{
    scode=req.params.scode;
    myCon.query("select f.fid,f.fname,fo.exp,fo.ntaught from facsuboptions fo, faculty f where fo.fid=f.fid and scode='"+scode+"'",function(err,result){
        if(err) console.log(err)
        else {
            console.log(result)
        resp.send(result);
        }
    }
    );
})


App.get("/api/getallSubjects/:sem",(req,resp)=>{
    sem=parseInt(req.params.sem);
    myCon.query("select * from subject where sem="+sem,function(err,result){
        if(err) console.log(err)
        else {
            console.log(result)
        resp.send(result);
        }
    }
    );
})



//Assign subject to a faculty
App.post("/api/insertData",(req,resp)=>{
let datax=[];
let scode=req.body.scode;
let fid=parseInt(req.body.fid);
let div1=req.body.div1;
datax.push(fid)
datax.push(scode)
datax.push("2022-23")
datax.push(div1)
let sql="insert into facultysubjects(fid,scode,acadyear,Division) values(?)";
myCon.query(sql,[datax],function(err,result){
  if(err) console.log(err)
  else
  resp.send(result);

})

})
//Update Attendance Set by faculty
App.post("/api/upDateAttendance",(req,resp)=>{
    var scode="";
    var div=req.body.div;
    var acadyear=req.body.acadyear
    let branch=req.body.branch
    let sem=req.body.sem;
    //sem=3
    var dno=1
    switch(branch){

        case "CSE" : dno=1;break;
        case "ECE" : dno=2;break;
        case "EEE" : dno=3;break;
        case "CIVIL" : dno=4;break;
        case "MECH" : dno=5;break;
        case "AIDS" : dno=6;break;
        case "CSBS" : dno=7;break;
    }
    
    if(sem==1 || sem==2) tableName="istyeariascore";
    if(sem==3 || sem==4) tableName="iindyeariascore";
    if(sem==5 || sem==6) tableName="iiirdyeariascore";
    if(sem==7 || sem==8) tableName="ivthyeariascore";
     let datax=[]
     let usn=req.body.usn;
     scode=req.body.scode;
     let myAttendance=req.body.patt;
     console.log(usn+" My Attendance is "+myAttendance+" in"+scode)
     datax.push(usn);
     datax.push(scode)
     sql="update "+tableName+" set percAttendance=? where usn=? and scode=? and acadyear=?"
     console.log(sql)
     myCon.query(sql,[myAttendance,usn,scode,acadyear],function(err,result){
        if(err) console.log(err)
        else {
            resp.send(result)
        console.log(result)
        console.log("Update succesful")
        }
     })
})

App.post("/api/upDateMarks",(req,resp)=>{
    var scode=req.body.scode;
    var div=req.body.div;
    var acadyear=req.body.acadyear
    let branch=req.body.branch
    let sem=req.body.sem;
    //sem=3
    var dno=1
    switch(branch){

        case "CSE" : dno=1;break;
        case "ECE" : dno=2;break;
        case "EEE" : dno=3;break;
        case "CIVIL" : dno=4;break;
        case "MECH" : dno=5;break;
        case "AIDS" : dno=6;break;
        case "CSBS" : dno=7;break;
    }
    
    if(sem==1 || sem==2) tableName="istyeariascore";
    if(sem==3 || sem==4) tableName="iindyeariascore";
    if(sem==5 || sem==6) tableName="iiirdyeariascore";
    if(sem==7 || sem==8) tableName="ivthyeariascore";
    let usn=req.body.usn;
    scode=req.body.scode
    let markscol=req.body.markscol
    let marks=parseFloat(req.body.marks)
    console.log(marks+ "  "+markscol+" "+usn+"  "+scode)
    var sql=""
    switch(markscol){
    case "m1" :    
    sql="update "+tableName+" set m1="+marks+" where usn=? and scode=?";break;
    case "m2" :    
    sql="update "+tableName+" set m2="+marks+" where usn=? and scode=?";break;
    case "m3" :    
    sql="update "+tableName+" set m3="+marks+" where usn=? and scode=?";break;
    case "ass1" :    
    sql="update "+tableName+" set ass1="+marks+" where usn=? and scode=?";break;
    case "cie" :    
    sql="update "+tableName+" set cie="+marks+" where usn=? and scode=?";break;
    case "see" :    
    sql="update "+tableName+" set see="+marks+" where usn=? and scode=?"; break;
    //To be addressed
    //sql1="update iascore set gtotal="+marks+" where usn=? and scode=?";break;
    case "average" :    
    sql="update "+tableName+" set avg1="+marks+" where usn=? and scode=?";break;    
    }
    console.log(sql)
    myCon.query(sql,[usn,scode],function(err,result){

        if(err) console.log(err)
        else {
        resp.send(result);
        console.log(result)
        }
    })

})

App.get("/api/gettotalBacklogs/:usn",(req,resp)=>{
      let usn=req.params.usn;

      let sql="select usn, count(*) as totbacklogs from backlogs where usn='"+usn+"' group by usn"
     
    myCon.query(sql,function(err,result){
if(err) console.log(err)
else
{
    console.log(result)
 resp.send(result)

}

    })


})


//Return backlog info.:
App.get("/api/getBackloginfo/:usn",(req,resp)=>{
     let usn=req.params.usn;
     console.log("I am in getBacklog..."+usn)
     let sql="select * from backlogs b, subject s where usn='"+usn+"' and b.scode=s.scode"

     myCon.query(sql,(err,result)=>{
       if(err) console.log(err)
       else{
        console.log(result)
       resp.send(result);
       }


     })


})

App.get("/api/getStudentFeeDetails/:usn",(req,resp)=>{

    var usn=req.params.usn;
   // console.log("I am here " +fid);
    myCon.query("select * from stdfees where usn='"+usn+"'",function(err,result){
        if(err) console.log(err)
        else
        resp.send(result);
    }
    );



})



//Fetch STudent info given the USN
App.get("/api/getStudentInfo/:usn",(req,resp)=>{
    var usn=req.params.usn;
   // console.log("I am here " +fid);
    myCon.query("select s.usn,s.fname,s.lname, s.sem, s.Division,s.admType,sf.totFees,"+
     "sf.inst1,sf.inst2,sf.inst3,sf.inst4  from student s, stdfees sf  where s.usn=sf.usn and s.usn='"+usn+"'",function(err,result){
        if(err) console.log(err)
        else
        resp.send(result);
    }
    );
})


App.get("/api/getFacultyIncharge/:scode",(req,resp)=>{
    var scode=req.params.scode;
    

    myCon.query("select distinct fname from faculty f, facultysubjects fs where scode='"+scode+"' and f.fid=fs.fid",function(err,result){
        if(err) console.log(err)
        else
        resp.send(result);
    }
    );
})



App.get("/api/getStudentMarks/:usn",(req,resp)=>{
    var usn=req.params.usn;
    console.log("I am here " +usn);
    myCon.query("select * from iascore i, subject s where usn='"+usn+"' and i.scode=s.scode",function(err,result){
        if(err) console.log(err)
        else
        resp.send(result);
    }
    );
})

App.get("/api/getFacultySubjects/:fid",(req,resp)=>{
    var fid=parseInt(req.params.fid);
   // console.log("I am here " +fid);
    myCon.query("select * from facultysubjects fs, subject s where fs.scode=s.scode and fid="+fid,function(err,result){
        if(err) console.log(err)
        else
        resp.send(result);
    }
    );
})
