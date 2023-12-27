$(function(){

$.ajax({
 url:"http://localhost:8000/api/getallFaculty",
 type:"GET",
 dataType:"json",
 success:function(result){
    $("#fac").empty();
    for(let i=0;i<result.length;i++)
    $("#fac").append("<option id="+i+">"+result[i].fid+"  "+result[i].fname+"</option>")
 }
})

$.ajax({
    url:"http://localhost:8000/api/getallSubjects",
    type:"GET",
    dataType:"json",
    success:function(result){
       $("#sub").empty();
       for(let i=0;i<result.length;i++)
       $("#sub").append("<option id="+i+">"+result[i].scode+"  "+result[i].sname+"</option>")
    }
   })
 1    //Subject Allotment.. to be done at the beginning of the semester..
   $("#assign").on("click",function(){
      let facid=$("#fac :selected").text() 
      let fid=$("#fac :selected").text().substring(0,facid.indexOf(' '))
      let subcode=$("#sub :selected").text()
      let scode=$("#sub :selected").text().substring(0,substring.indexOf(' '))
      let div1=$("#div1 :selected").text().trim();
      alert("Assignment Done... for "+fid+" sub"+scode)
      $.ajax({
        url:"http://localhost:8000/api/insertData",
        type:"POST",
        dataType:"json",
        data:{"fid":fid,"scode":scode,"div1":div1},
        success:function(result){
            alert("Inserted Succesfully...") 
            console.log(result);
        }

      })     
   })
})