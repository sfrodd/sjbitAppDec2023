$(function(){

$("#backy").on("click",function(e){
  e.preventDefault();
  window.location="./deptadminDashBoard.html"
})

$("#addfac").on("click",function(e){
e.preventDefault()
 let gender=''
 let fname=$("#fname").val()
 let lname=$("#lname").val()
 let dob=$("#dob").val()
 let designation=$("#designation :selected").val()
 if( $("#Male").is(":checked"))
 gender='M'
  else if($("#Female").is(":checked"))
gender='F'
 let doj=$("#doj").val()
 let branch=$("#branch :selected").val()
 let emailId=$("#emailid").val()
 let cellNum=$("#cellnum").val()
 let userName=$("#login").val()

 //alert(fname+lname+dob+doj+branch+designation+emailId+cellNum+gender)

   $.ajax({
   url:"http://localhost:8000/api/addFaculty",
   type:"POST",
   dataType:"json",
   async:false,
   data:{username:userName,fname:fname,lname:lname,dob:dob,gender:gender,doj:doj,designation:designation,branch:branch,emailId:emailId,cellNum:cellNum},
   success:function(result){
       let fid=result[0].maxfid;
       alert(fid)
       $.ajax({
        url:"http://localhost:8000/api/insertUser",
        type:"POST",
        dataType:"json",
        data:{fid:fid,username:userName},
        success:function(result){

          alert("Inserted User"+result.affectedRows)
        }
       })

     // alert("Faculty Data Inserted...."+result.affectedRows)
   }
   })

})

})