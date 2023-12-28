$(function(){

$("#dname").on("change",function(e){
e.preventDefault();
let scheme=$("#scheme :selected").val();
let sem=$("#sem :selected").val();
let dname=$("#dname :selected").val()
let acadyear=$("#acadyear :selected").val()
$.ajax({
    url:"http://localhost:8000/api/getSubjects",
    type:"POST",
    dataType:"json",
    data:{sem:sem,scheme:scheme,dname:dname,acadyear:acadyear},
    success:function(result){
      $("#subjects").empty()   
      if(result.length==0)
      $("#subjects").append("<option>None</option>")
    else{
      for(let i=0;i<result.length;i++)
        $("#subjects").append("<option>"+result[i].scode+"  "+result[i].sname+"</option>")
     alert("Assignment Done..!!!") 
    }

    }
})


})




})