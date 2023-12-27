$(function(){

$("#backy").on("click",function(e){
  e.preventDefault();
  window.location="../Admin.html"
})

$("#addfac").on("click",function(e){
e.preventDefault()
 let gender=''
 let fname=$("#fname").val()
 let lname=$("#lname").val()
 let dob=$("#dob").val()
 let designation=$("#designation").val()
 if( $("#Male").is(":checked"))
 gender='M'
  else if($("#Female").is(":checked"))
gender='F'
 let doj=$("#doj").val()
 let branch=$("#branch :selected").val()
 let emailId=$("#emailid").val()
 let cellNum=$("#cellnum").val()

 //alert(fname+lname+dob+doj+branch+designation+emailId+cellNum+gender)

   $.ajax({
   url:"http://localhost:8000/api/addFaculty",
   type:"POST",
   dataType:"json",
   data:{fname:fname,lname:lname,dob:dob,gender:gender,doj:doj,designation:designation,branch:branch,emailId:emailId,cellNum:cellNum},
   success:function(result){
      alert("Faculty Data Inserted....")
   }
   })

})

})