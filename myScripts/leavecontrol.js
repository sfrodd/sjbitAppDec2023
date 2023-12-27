$(function(){
var fname=$.session.get('uname')
var fid=$.session.get('uid')
$("#facName").text(fname)
$("#facName1").text(fname)
var now = new Date();
var day = ("0" + now.getDate()).slice(-2);
var month = ("0" + (now.getMonth() + 1)).slice(-2);
var today = now.getFullYear() + "-" + (month) + "-" + (day);
$('#mydates').val(today);
$("#stdate").val(today)
$("#endate").val(today)
//Get Faculty 
var datex; 
var timing;
var laborclass;
var altArr;
var i=0 
var altArr1=[]

$("#duration").on("change",function(){
let days=0
if($("#duration :selected").text().substring(0,4)=="Half")
days=0.5;
else if($("#duration :selected").text().substring(0,3)=="One")
days=1
else days=parseInt($("#duration :selected").text().substring(0,2))
var lb
//alert($("#ltype :selected").text().substring(0,2))
switch($("#ltype :selected").text().substring(0,2)){

case 'CL' : lb=$("#clb").text()
            lb=parseInt(lb.substring(8,10))
            if((lb-days)<0)
              alert("Not enough leave balance")
            else ; //alert("OK")
            break;
case 'DL' : lb=$("#dlb").text()
            lb=parseInt(lb.substring(8,10))
            if((lb-days)<0)
            alert("Not enough leave balance")
            else ; //alert("OK")
            break;

case 'RH' : lb=$("#rlb").text()
            lb=parseInt(lb.substring(8,10))
            if((lb-days)<0)
              alert("Not enough leave balance")
            else alert("OK")
            break;

case 'VL' : lb=$("#vlb").text()
            lb=parseInt(lb.substring(8,10))
            if((lb-days)<0)
            alert("Not enough leave balance")
            else alert("OK")
            break;
}

})

$("#backHome").on("click",function(e){
e.preventDefault();

window.location="../Components/Faculty.html"


})


$("#addList").on("click",function(e){
  e.preventDefault()
  
//Handle click circleplus icon
//Get largest leaveid...from facultyleaveapps
var largest_leaveID = function () {
  var largestleaveID;
$.ajax({
  url:"http://localhost:8000/api/getmaxLID",
  type:"GET",
  dataType:"json",
  async:false,
  success:function(result){
    //console.log("I am here: xxx"+ result[0].maxlid)
    largestleaveID=result[0].maxlid+1;
  }
})
return largestleaveID;
}();

//alert("I am here in PLUS "+largest_leaveID) 
//alert(largest_leaveID)
datex=$("#mydates").val()
timing=$("#classtiming :selected").text()
laborclass=$("#LabClass :selected").text()
altArr=$("#Alternate1 :selected").text()

div=$("#div :selected").text()
sem=$("#sem :selected").text()
subj=$("#sub :selected").text()
altArr1.push({"datex":datex, "timing":timing, "laborclass":laborclass, "altArr":altArr})
i=i+1
//alert("Disp alt"+altArr1)
$("#altArrangements").append("<li style='height:50px;color:red;width:1100px' class='list-group-item m-1'>"+
"<span id=adate'"+i+" style='display:inline-block;width:130px'>"+
formatDate1(datex)+"</span><span style='display:inline-block;width:80px'>"+
timing+"</span><span style='display:inline-block:width:100px'>"+
laborclass+"</span><span style='display:inline-block;width:70px;margin-left:10px'>  "+
div+"</span><span style='display:inline-block;width:70px'>  "+
sem+"</span><span style='display:inline-block;width:300px'>  "+
subj+"</span><span style='display:inline-block;width:300px'>  "+
 altArr + "</span><i id=ico"+i+" style='display:inline-block;width:50px;' class='bi bi-trash'></i></li>")

/*Add to alt arrangements
var allArrangements=[]
     for(var i=0;i<altArr1.length;i++) {
      let lid=0;
     // alert(i+altArr1.length)

      let adate=altArr1[i].datex
      let time=altArr1[i].timing
      let corl=altArr1[i].laborclass
      let facincharge=altArr1[i].altArr;
      allArrangements.push({"lid":lid,"adate":adate, "time":time,"corl":corl, "fin":facincharge})
     }
     console.log("I am here... afterloading all data")
     console.log(altArr1) */

     //Insert Alternate Arrangements....
   $.ajax({
       url:"http://localhost:8000/api/alternateArragements",
       type:"POST",
       dataType:"json",
       async:false,
       data:{'lid':largest_leaveID,'adate':datex,'timing':timing, 'corlab':laborclass, 'altfaculty':altArr},
        success:function(result){
                console.log("Alt arrangements saved.:"+result);
                $("#status").text("Alt Arrangements saved..")
              }
     }) //End of Ajax = Alt arrangements

})


$.ajax({
url:"http://localhost:8000/api/getallFaculty",
type:"GET",
dataType:"json",
success:function(result){
for(let i=0;i<result.length;i++)
$("#Alternate1").append("<option>"+result[i].fname+"</option")
for(let i=0;i<result.length;i++)
$("#Alternate2").append("<option>"+result[i].fname+"</option")
}
})
//Get Leave Info
//Get Faculty 
$.ajax({
    url:"http://localhost:8000/api/getLeaveInfo/"+fid,
    type:"GET",
    dataType:"json",
    success:function(result){
    var i=0;
    console.log(result[i])
    $("#leaves").append("<tr style='color:brown;font-size:13px;text-align:center'><td>CL Entitled"+result[i].cl+"</td>"+
    "<td>Availed "+result[i].cla +"</td>"+
    "<td id='clb'>Balance "+(result[i].cl-result[i].cla)+"</td>"+
    "<td>DL Entitled "+result[i].dl+"</td>"+
    "<td>Availed "+result[i].dla +"</td>"+
    "<td id='dlb'>Balance "+(result[i].dl-result[i].dla) +"</td>"+
    "<td>RH Entitled "+result[i].rh+"</td>"+
    "<td>Availed "+result[i].rha +"</td>"+
    "<td id='rlb'>Balance "+(result[i].rh-result[i].rha) +"</td>"+
    "<td>VL Entitled "+result[i].vl+"</td>"+
    "<td>Availed "+result[i].vla +"</td>"+
    "<td id='vlb'>Balance "+(result[i].vl-result[i].vla) +"</td>"+
    "</tr")
    
    }

})


//Process the Leave Application:
$("#apply").on("click",function(event){
      event.preventDefault();
     
     let fid=$.session.get('uid')
     let fname=$.session.get('uname')
     let lType= $("#ltype :selected").text().substring(0,2)
     let durationx=$("#duration :selected").text()
     let stdate= $("#stdate").val()
     let endate=$("#endate").val()
     var ndays=parseInt(daysdifference(formatDate(endate),formatDate(stdate))+1)
     var drn=durationx
     drn=durationx.substring(0,durationx.indexOf(' '))
   //  alert(drn)
     if(drn=="Half") ndays=0.5
     else if(drn=="One") ndays=1
     else ndays=parseInt(drn)
     let alt1=$("#Alternate1 :selected").text()
     let alt2="Dummy"
     let info =$("#info").val()
     if(lType=="Ch") alert("Choose Leave Type")
     else if(stdate=="" || endate=="") alert("Choose both Dates")
     else if(ndays>1 && (drn=="Half" || drn=="One")) alert("Both dates must be same or Choose Multiple days")
    // else if(alt1=="Faculty Incharge 1"||alt2=="Faculty Incharge 2") alert("Indicate Incharge Faculty")
   //  else if(alt1==alt2) alert("Both cant be same")
     else  if(info=="") alert("Indicate Reason")  
     else{
    
      $("#status").text("Applied - Approval Pending..")
 
     $("#lhistory").append("<li style='width:1100px' class='list-group-item mt-1'>"+
     "<span style='display:inline-block;width:180px'>"+
     fname+"</span><span style='display:inline-block;width:50px'>"+lType+"</span><span style='display:inline-block;width:150px'>"
     +durationx+
     "</span><span style='display:inline-block;width:150px'>"+formatDate1(stdate)+
     "</span><span style='display:inline-block;width:150px'>"+
     formatDate1(endate)+"</span><span style='display:inline-block;width:300px'>"+info+"</span></li>")
     durationx=ndays
     //alert(durationx) 
        //Insert Leave
     $.ajax({
       url:"http://localhost:8000/api/insertLeave",
       type:"POST",
       dataType:"json",
       data:{"fid":fid,"fname":fname,"lType":lType,"duration":durationx,
              "sdate":stdate,"edate":endate,"alt1":alt1,
              "alt2":alt2,"info":info },
        success:function(result){
        console.log(result);
        $("#status").text("Application Sent..")
        }

     //Process alternate arrangements for the leave applied  }
  })  // Insert Leave request
   // } //End of for loop
}  //Else.. if everthing is okay

})  //End of Appy event handler


$("#sem").on("change",function(){
let sem=$("#sem :selected").text()
$.ajax({
url:"http://localhost:8000/api/getAllSubjects/"+sem,
type:"GET",
dataType:"json",
success:function(result){
    $("#sub").empty();
    for(let i=0;i<result.length;i++){
       $("#sub").append("<option>"+result[i].sname +"</option")
    }
}


})


})



}) //End of Ready Document..

function daysdifference(firstDate, secondDate){  
  
  var startDay = new Date(firstDate);  
  var endDay = new Date(secondDate);  

// Determine the time difference between two dates     
  var millisBetween = startDay.getTime() - endDay.getTime();  

// Determine the number of days between two dates  
  var days = millisBetween / (1000 * 3600 * 24);  

// Show the final number of days between dates     
  return Math.round(Math.abs(days));  
}  

function formatDate(myDate){
var formattedDate = new Date(myDate);
var d = formattedDate.getDate();
var m =  formattedDate.getMonth();
m += 1;  // JavaScript months are 0-11
var y = formattedDate.getFullYear();
return (m + "/" + d + "/" + y);
}

function formatDate1(myDate){
  var formattedDate = new Date(myDate);
  var d = formattedDate.getDate();
  var m =  formattedDate.getMonth();
  m += 1;  // JavaScript months are 0-11
  var y = formattedDate.getFullYear();
  return (d+ "/" + m + "/" + y);
  }