$(function(){
var acadyear=$("#acadyear :selected").text()
$("#logout").on("click",function(e){
  e.preventDefault();

  window.location="../../index.html"
})

$("#initLeave").on("click",function(){
  $.ajax({
    url:"http://localhost:8000/api/initLeave/"+acadyear,
    type:"GET",
    dataType:"json",
    success:function(result){
       console.log("Success..."+result)
       alert("Done..")
    }
  })
})
})