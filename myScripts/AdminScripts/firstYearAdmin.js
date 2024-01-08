$(function(){
acadDate=new Date()
var instID
let acadyear=acadDate.getFullYear()
acadyear=acadyear.toString()
let lastTwoDigits=parseInt(acadyear.substring(2,4))+1
acadyear=acadyear+"-"+lastTwoDigits
let serialNum="001"
$("#acadyear").text("Academic Year : "+acadyear)

$("#branch").on("change",function(e){
    e.preventDefault()
    let br=$("#branch :selected").val().substring(0,2)
    $("#acadyear").text("Academic Year : "+acadyear)
    instID="2BU"+lastTwoDigits+br+serialNum
$("#inst_id").text(instID)

})
$("#submitPersonalInfo").on("click",function(e){

   e.preventDefault();
//let instID=acadyear+"CSE"+serialNum
let fname=$("#fname").val();
let lname=$("#lname").val();
//let gender=$("#gender").val()

if ($("#male").is(":checked"))
g='M'
else if($("#female").is(':checked')==true)
   g='F'
else g='O'

let email=$("#email").val()
let phone=$("#phone").val()
//alert(fname+" "+lname+" "+email+" "+phone+" "+g)

$.ajax({
    url:"http://localhost:8000/api/insertFirstYearStudentData",
    type:"POST",
    dataType:"json",
    data:{instID:instID,fname:fname,lname:lname,gender:g,email:email,phone:phone},
    success:function(response){
      $("#confirmation").html("Saved....")
      $("#confirmation").fadeOut(1000);
//      if(result.affectedRows>0)
      alert("Inserted.."+response.message)
  //    else
    //  alert(result.affectedRows)
    },
    error:function(xhr, status, error) {
      const jsonResponse = JSON.parse(xhr.responseText);
      console.error(jsonResponse.error);
      alert("Duplicate Data")
    }
})

})


$("#submitPUCInfo").on("click",function(e){
  e.preventDefault();
  //let instID=acadyear+"CSE"+serialNum
  let title="PUC-II"
  let regNum=$("#pucregNum").val();
  let pucScore=$("#pucScore").val();
  let collegeName=$("#collegeName").val()
  let state=$("#collegeState :selected").val()
  let passingyear=$("#passingYear").val()
  let imageUrl=$("#imageUrl").val()
  alert(instID+" "+regNum+"  "+title+" "+passingyear+" "+state+" "+pucScore+" "+collegeName+" "+state)
  
  $.ajax({
     url:"http://localhost:8000/api/insertFirstYearStudentPUCData",
     type:"POST",
     dataType:"json",
     data:{instID:instID,title:title,regNum:regNum,pucScore:pucScore,
      passingyear:passingyear,collegeName:collegeName,
      state:state,imageUrl:imageUrl},
     success:function(response){
       $("#status1").html("Saved....")
       $("#status1").fadeOut(1000);
  //      if(result.affectedRows>0)
       alert("Inserted.."+response.message)
   //    else
     //  alert(result.affectedRows)
     },
     error:function(xhr, status, error) {
       const jsonResponse = JSON.parse(xhr.responseText);
       console.error(jsonResponse.error);
       alert("Duplicate Data")
     }
  })
  
  })

$("#submitAcademicInfo").on("click",function(e){
e.preventDefault();
//let instID=acadyear+"CSE"+serialNum
let title="SSLC"
let regNum=$("#regNum").val();
let sslcScore=$("#sslcScore").val();
let schoolName=$("#schoolName").val()
let state=$("#state :selected").val()
let passingyear=$("#passingyear").val()
let imageUrl=$("#imageUrl").val()
alert(instID+" "+title+" "+passingyear+" "+state+" "+sslcScore)

$.ajax({
   url:"http://localhost:8000/api/insertFirstYearStudentSSLCData",
   type:"POST",
   dataType:"json",
   data:{instID:instID,title:title,regNum:regNum,sslcScore:sslcScore,
    passingyear:passingyear,schoolName:schoolName,
    state:state,imageUrl:imageUrl},
   success:function(response){
     $("#status1").html("Saved....")
     $("#status1").fadeOut(1000);
//      if(result.affectedRows>0)
     alert("Inserted.."+response.message)
 //    else
   //  alert(result.affectedRows)
   },
   error:function(xhr, status, error) {
     const jsonResponse = JSON.parse(xhr.responseText);
     console.error(jsonResponse.error);
     alert("Duplicate Data")
   }
})

})

})