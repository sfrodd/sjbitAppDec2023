$(function(){
var fnamex;
var i;

$("#facInputs").on("click", "i", function(){
   let x=$(this).attr("id");
   i=x.substring(x.length-1)
   //alert(i) //Need to be solved... Sublist under a list
   let fac="fac"+i
   $("#facInputs").find("#"+fac).append("<li style='background-color:white;height:60px;color:blue' class='list-group-item mt-2 mx-1' >18CS53 - DBMS"+
   x+"</li>")
})
for(let z=0;z<3;z++)
$("#facInputs").append("<ul id fac="+z+"><li style='background-color:gray;height:60px;color:white' class='list-group-item mt-2 mx-1' >Siddharth <i id=sub"+ z +" style='margin-left:30px' class='bi bi-plus-circle'></i></li></ul>")

$("#pendingleaves").on("click","i",function(event){
  event.preventDefault();
  i=$(this).attr("id")
  idx=i.substring(i.length-1)
  $("#pendingleaves").find("#list"+idx).remove();

})

//Approve or
//Reject  working well.. 29/01/2023
$("#pendingleaves").on("click","button",function(event){
  event.preventDefault();
  i=$(this).attr("id")
  
  idx=i.substring(i.indexOf('-')+1,i.length-1)
  
  if(event.target.innerHTML=='Approve') {
            i=$(this).attr("id")
            var ndays=0
            idx=i.substring(i.indexOf('-')+1,i.length)
            let fid=$("#fd"+idx).text()
            let lid=$("#pendingleaves").find("#lid"+idx).text()
    //alert(lid+"  "+fid)
            let lType=$("#lt"+idx).text();
            var duration =$("#drn"+idx).text()
            ndays=parseFloat(duration) 
          //  duration=duration.substring(0,duration.indexOf(' '))
            let stDate=$("#st1"+idx).text();
            let enDate=$("#en"+idx).text().trim();
            let status=$("#st"+idx).text().trim();
           
           // alert(ndays) 
    //Updateal CL,EL,DL Count and set status to Approved/Rejected
    $.ajax({
      url:"http://localhost:8000/api/approveLeave",
      type:"POST",
      dataType:"json",
      data:{"fid":fid,"ltype":lType,"ndays":ndays,"aprovalstatus":status,
      "stdate":stDate,"enDate":enDate,"lid":lid},
      success: function(result){
        //Leave count is altered..and leave status is set 
        alert("Leave Count Updated...")
      }

    }) //Ajax
    //let duration ='Multiple Days'
    //alert("Accepted")  
    $("#st"+idx).css("color","green")
    $("#st"+idx).text("Approved..")   
  } //If Approved..
  else 
       if (event.target.innerHTML=='Reject') {
          //alert("Rejected "+$("#fn"+idx).text())
                  //WE need to make ajax call to update leave status to reject...
                    $("#st"+idx).css("color","red")
                    $("#st"+idx).text("Rejected..")       
          }
})  //End of Pending Leaves

$("#mis").on("click",  function(e){
  e.preventDefault();

//$("#pendingleaves").empty();
$.ajax({
  url:"http://localhost:8000/api/getAllIssues",
  type:"GET",
  dataType:"json",
  success:function(result){

    if(result.length==0){
      $("#mentoringissues").append("<li id=list style='background-color:yellow;height:60px;color:blue' class='list-group-item mt-2 mx-1'>No Pending Issues!!!</li>")
   
      }
      else
      {
       /* $("#mentoringissues").append("<li id='listX' style='background-color:gray;height:60px;color:white;width:1200px' class='list-group-item mt-2 mx-1'>"+
        "Pending Issues for Resolving<button id='close' class='btn btn-danger mx-5'>RollBack</button></li>")  */
      for(let i=0;i<result.length;i++)
      $("#mentoringissues").append("<li id=list"+i+" style='width:1230px;background-color:light-yellow;height:90px;color:blue;text-align:center' class='list-group-item mt-2 mx-1'>"+
      "<span id=mid"+i+" style='display:inline-block;marign-right:10px;width:40px;color:red;vertical-align:top;margin-top:1px'>"+result[i].mid+"</span>"+
      "<span id=ddet"+i+" style='display:inline-block;marign-right:10px;width:220px;color:red;text-align:left'>"+result[i].discDetails+" </span>"+
      //"<span id=ddat"+i+" style='display:inline-block;margin-right:10px;width:100px'>"+
     // formatDate1(result[i].discDate)+"</span><span style='display:inline-block;width:120px' id=usn"+i+">" + result[i].usn+
      //"</span>"+
      "<span style='display:inline-block;width:120px;vertical-align:top;margin-top:1px' id=usn"+i+">" + result[i].usn+
      "</span>"+
      "<span id=stname"+i+" style='vertical-align:top;margin-top:3px;display:inline-block;margin-right:5px;width:230px;text-align:left'>"+
      result[i].sfname+"</span>"+
      "<span id=ddat"+i+" style='vertical-align:top;margin-top:3px;display:inline-block;margin-right:0px;width:240px'>"+
      result[i].facfname+"</span>"+
      
      "<span id='hod"+i+"' style='vertical-align:top;margin-top:3px;display:inline-block;margin-right:0px;width:230px'>"+
      "<input id=hodc"+i+" type='text' style='display:inline-block;margin-right:10px'></input></span>"+
      "<span id=ddat"+i+" style='vertical-align:top;margin-top:3px;display:inline-block;margin-left:10px;width:100px'>"+
      "<button id='hresolve"+i+"' class='btn btn-primary mx-3'>Resolve</button></span></li>")
      
      
  }
  }
}) //End of ajax

})

$("#send").on("click",function(){

  let recv="sfroddgit@git.edu";
  let subj="Hello World"
  let message="Going Great.. Let us meet up next week"

  //let recvemail=req.body.recvemail;
  //let subj=req.body.subj;
 // let msg=req.body.mesg;
  $.ajax({
     url:"http://localhost:8000/api/sendEmail",
     type:"POST",
     dataType:"json",
     data:{"recvemail":recv,"subj":subj,"mesg":message},
     success:function(result){

           console.log(result);
           alert("Email sent..")
     }

  })



})

//Rollback the pending list & Resolve

$("#mentoringissues").on("click","button",function(e){
  e.preventDefault()
  //alert("Hello i am here")
  let i=$(this).attr("id")
  
  var idx=""
  //if(idx.length==5)
  idx=i.substring(i.length-1)
  //else
  //idx=i.substring(i.length-2);
  if(e.target.id=='close')
            $("#pendingleaves").empty();
  
    else if(e.target.id='hresolve')
    {
          let mid=$("#mentoringissues").find("#mid"+idx).text()
          let hodc=$("#hodc"+idx).val()
          //alert(mid)
          $.ajax({
            url:"http://localhost:8000/api/updateHremark",
            type:"POST",
            dataType:"json",
            data:{"mid":mid,"hodc":hodc},
            success:function(result){

              console.log(result)
              alert("Resolved..")
            }
          })
    }      
})


$("#pendleave").on("click",function(e){
  e.preventDefault()
    $.ajax({
         url:"http://localhost:8000/api/getPendingLeaves",
         type:"GET",
         dataType:"json",
      success:function(result){
          if(result.length==0){
                  $("#pendingleaves").append("<li id=list style='background-color:yellow;height:60px;color:blue' class='list-group-item mt-2 mx-1'>No Pending Leaves!!!</li>")
 
           }
          else
          { $("#pendingleaves").append("<li id=list"+i+" style='background-color:gray;height:60px;color:white' class='list-group-item mt-2 mx-1'>Leaves Pending for Approval<button id='close' class='btn btn-danger mx-5'>RollBack</button></li>")  
            for(let i=0;i<result.length;i++)
                $("#pendingleaves").append("<li id=list"+i+" style='background-color:light-yellow;height:60px;color:blue' class='list-group-item mt-2 mx-1'>"+
                "<span id=sl"+i+" style='display:inline-block;marign-right:10px;width:40px;color:red'>"+(i+1)+". </span>"+
                "<span id=lid"+i+" style='display:inline-block;marign-right:10px;width:50px;color:red'>"+result[i].lid+" </span>"+
                "<span id=fd"+i+" style='display:inline-block;margin-right:10px;width:60px'>"+
                result[i].fid + "</span><span style='display:inline-block;width:100px' id=fn"+i+">" + result[i].fname+
                "</span><span id=lt"+i+" style='display:inline-block;width:40px'>" +
                result[i].ltype+"</span>"+
                "<span id='drn"+i+"' style='display:inline-block;width:180px'>" +
                result[i].duration+"</span>"+
                "<span id=st1"+i+" style='display:inline-block;width:100px'>"+
                formatDate1(result[i].stdate,'mm/dd/yyyy')+"</span>"+
                "<span id=en"+i+" style='display:inline-block;width:100px'>"+
                formatDate1(result[i].endate)+"</span>"+
                "<span id=st"+i+">"+
                      result[i].status+
                "</span>"+
                            "<span style='width:100px'>"+
                "<button  id=apr-"+i+" class='btn btn-success mx-4'>Approve</button>"+
                "</span>"+
                "<span style='width:300px'><button  id=rej"+i+" class='btn btn-danger mx-3'>Reject</button></span>"+
                "<span style='width:300px'><i  id=ico+"+i+" style='color:red' class='bi bi-trash'></i></span></li>")
          } //End of Else
  } //End of Success function

    }) //End of Ajax
}) //End of PendLeave on click

$("#rollUp").on("click",function(event){
  event.preventDefault()
   $("#tbody1").empty();
   $("#mentoringissues").empty();
   $("#pendingleaves").empty();
})

//Show Student Info when usn is selected:
$("#logout").on("click",function(e){
  e.preventDefault();
  window.location="../index.html";
})

$("#suballot").on("click",function(e){
  e.preventDefault();

window.location="../Components/HodSubAllot.html";

})
//Show student marks given the usn
$("#show").on("click",function(event){
    event.preventDefault()
let usn=$("#usn").val();
if(usn=="")
alert("Enter valid USN")
else
$.ajax({
  url:"http://localhost:8000/api/getStudentInfo/"+usn,
  type:"GET",
  dataType:"json",
  success:function(result){

    let usn=result[0].usn
    var admyear=usn.substring(3,5)
    admyear="20"+admyear
    $("#tbody").empty()
    $("#tbody").append("<tr style='background-color:cadetblue;color:yellow'><td>"+
    result[0].usn+"</td><td>"+
    result[0].fname+" "+
    result[0].lname+"</td><td>"+result[0].sem+
    "</td><td>"+result[0].Division+"</td>"+
    "<td>"+result[0].admType+"</td>"+
    "<td>"+admyear+"</td>"+
    "<td><i class='bi bi-currency-rupee'></i>"+result[0].totFees +"</td>"+
    "<td><i class='bi bi-currency-rupee'></i>"+result[0].inst1 +"</td>"+
    "<td><i class='bi bi-currency-rupee'></i>"+result[0].inst2 +"</td>"+
    "<td><i class='bi bi-currency-rupee'></i>"+result[0].inst3 +"</td>"+
    "<td><i class='bi bi-currency-rupee'></i>"+(result[0].inst1+result[0].inst2+result[0].inst3)+"</td>"+
    "<td><i class='bi bi-currency-rupee'></i>"+(result[0].totFees-(result[0].inst1+result[0].inst2+result[0].inst3)) +"</td>"+
    "</tr>")
  }
}) //End of Ajax

//Display Student Marks - of a given usn
$.ajax({
    url:"http://localhost:8000/api/getStudentMarks/"+usn,
    type:"GET",
    dataType:"json",
    success:function(result){
      $("#tbody1").empty()
      for( i=0;i<result.length;i++){
        var scode=result[i].scode;
      $("#tbody1").append("<tr style='background-color:bisque'><td style='color:brown'>"+result[i].sname+"</td><td style='color:voilet'>"+
      result[i].scode+"</td><td>"+(result[i].m1>=0?result[i].m1:"AB")+
      "</td><td>"+(result[i].m2>=0?result[i].m2:"AB")+"</td>"+
      "</td><td>"+(result[i].m3>=0?result[i].m3:"AB")+"</td>"+
      "</td><td>"+(result[i].avg1>=0?result[i].avg1.toFixed():"AB")+"</td>"+
      "</td><td>"+(result[i].ass1>=0?result[i].ass1:"AB")+"</td>"+
      "</td><td>"+result[i].cie+"</td>"+
      "</td><td>"+(result[i].see>=0?result[i].see:"AB")+"</td>"+
      "</td><td>"+(parseInt(result[i].cie)+parseInt(result[i].see)*0.6)+"</td>"+
      "<td>"+result[i].percAttendance+
      "</td><td>"+result[i].fname+"</td></tr>")
     } //For loop  
    }
}) //End of Ajax 
  
}) //End of Show
})//End of Ready Function

function printData()
{
   var stdInfo=document.getElementById("std");
   var detail=document.getElementById("details");
   newWin= window.open("");
   newWin.document.write(stdInfo.outerHTML,detail.outerHTML);
  // newWin.document.write(detail.outerHTML);
   newWin.print();
   newWin.close();
}

$("#printData").on("click",function(event){
  event.preventDefault()
  printData();
})
 //End of Ready Function

function formatDate1(myDate){
  var formattedDate = new Date(myDate);
  var d = formattedDate.getDate();
  var m =  formattedDate.getMonth();
  m += 1;  // JavaScript months are 0-11
  var y = formattedDate.getFullYear();
  return (d+ "/" + m + "/" + y);
  }

//var days = daysdifference('03/19/2021', '03/31/2021');  
// Add two dates to two variables    
//console.log(days);  
    
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
