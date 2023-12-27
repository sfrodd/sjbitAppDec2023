$(function(){

let usn=$("$usn").val();

$.ajax({
   url:"http://localhost:8000/api/updateStudent"+usn,
   type:"GET",
   dataType:"json",
   success:function(result){
     
      $("#stname").val(result[0].fname)
      $("#gender").val(result[0].gender)
      $("#sem").val(result[0].sem)
      $("#div").val(result[0].Division)
      $("#totbacks").val(result[0].totBacklogs)
      $("#cellnum").val(result[0].cellNum)
      $("#email").val(result[0].emailid)
      $("#admyear").val(result[0].admyear)
      $("#admtype").val(result[0].admType)
      $("#totfees").val(result[0].totFees)
   }
})

$("#update").on("click",function(){

    let usn=$("#usn").val()
    let stname=$("#stname").val()
    let gender=$("#gen").val()
    let sem=$("#sem").val()
    let div=$("#div").val()
    let totbacks=$("#tbacks").val()
    let totfees=$("#tfees").val()
    let cellnum=$("#cnum").val()
    let emailid=$("#eid").val()
    let admyear=$("#ayear").val()
    let admtype=$("#atype").val()
    $.ajax({
     url:"http://localhost:8000/api/updateStudent",
     type:"POST",
     dataType:"json",
     data :{"usn":usn,"stname":stname,"gen":gender,"sem":sem},
     success:function(result){

        console.log(result)
     }
    }) 
})

})