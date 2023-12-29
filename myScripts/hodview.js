$(function(){

$("#back").on("click",function(e){

  window.location="./HodDashBoard.html"

})



$("#fac").on("click","button",function(e){
    e.preventDefault()   
  
    let id=$(this).attr("id")
    idx=id.substring(id.length-1);
    let fid=$("#fid"+idx).text()
   let subject=$("#subjects :selected").text()

   //Need to be fixed.:
   let div=$("#divi"+idx).find(":selected").val()
   let scode=subject.substring(0,subject.indexOf(' '))
   //alert(subject+" is alloted to"+fid +" for "+div+" division")
   
   $.ajax({
     url:"http://localhost:8000/api/checkifAlreadyExists/",
     type:"POST",
     dataType:"json",
     async:false,
     data:{"scode":scode,"fid":fid,"acadyear":"2022-23","division":div},
     success:function(result){
       console.log(result);
     //  alert(result.length)
       if(result.length>=1)
      alert("Already subjeact alloted..")
      else
  
   $.ajax({
    url:"http://localhost:8000/api/insertAllotSubject",
    type:"POST",
    dataType:"json",
    async:false,
    data:{"scode":scode,"fid":fid,"acadyear":"2022-23","division":div},
    success:function(result){

      console.log(result);
      alert("Subject Allotted Succesfully..")
    }
    
   }) //Inner Ajax
} //Success
 
}) //Ajax outer

}) //End of click event
 
$("#fac").on("click","i",function(e){
   e.preventDefault()   
   let id=$(this).attr("id")
   idx=id.substring(id.length-1);
   if(e.target.id=="mico"+idx)
   $("#details"+idx).empty();
   else{
   let fid=$("#fid"+idx).text()
   let subject=$("#subjects :selected").text()
   let scode=subject.substring(0,subject.indexOf(' '))

   alert(subject+" " +fid+" "+scode)
   $.ajax({
      url:"http://localhost:8000/api/getFacComments",
      type:"POST",
      dataType:"json",
      async:false,
      data:{"fid":fid,"scode":scode},
      success:function(result){
        console.log("I am here"+result)
        for(let i=0;i<result.length;i++)  
        $("#details"+idx).append("<li>"+result[i].answer+"</li>")    
      }
   }) 
  }
  
})

$("#sem").on("change",function(){
  let sem=$("#sem :selected").text();


  $.ajax({  
    url:"http://localhost:8000/api/getAllSubjects/"+sem,
    type:"GET",
    dataType:"json",
    success:function(result){
      $("#subjects").empty();
      $("#subjects").append("<option selected>Select Subject</option>")
      for(let i=0;i<result.length;i++)
          $("#subjects").append("<option id=sub"+i+">"+result[i].scode+"  "+ result[i].sname + "</option>")  
    }
  })
})



$("#subjects").on("change",function(e){
    e.preventDefault();
    let subject= $("#subjects :selected").text().trim();

    let scode=subject.substring(0,subject.indexOf(' '))
    //On Subject selection list faculty who have opted this subject
    $.ajax({
        url:"http://localhost:8000/api/getFacOptions/"+scode,
        type:"GET",
        dataType:"json",
        success:function(result){
            $("#fac").empty();
            for(let i=0;i<result.length;i++) 
            $("#fac").append("<li style='width:1250px;background-color:yellow;color:brown' id=fac"
            +i+" class='list-group-item m-2'><span id='fid"+i+"' style='display:inline-block;width:70px;'>"+
            result[i].fid+"</span>"+
            "<span style='display:inline-block;width:200px;'>"+result[i].fname+ 
            "</span><span style='display:inline-block;width:60px;'>Exp: "+result[i].exp+
            "</span>years and  No. of Times Taught :     "+
            result[i].ntaught+ 
            "<span style='display:inline-block;width: 50px;'><i id='pico" +i+
            "' style='margin-left:40px;color:red' class='bi bi-plus-circle'></i></span>"+
            "<span style='display:inline-block;width: 100px;'><i id='mico" +
            i+"' style='margin-left:40px;color:green' class='bi bi-dash-circle'></i></span>"+
            "<span style='display:inline-block;width:150px'><select style='width:100px;margin-left:50px' id='divi"+i+"' class='form-select mx-3'>"+
            "<option selected>Div</option>"+
            "<option >A</option>"+
            "<option >B</option>"+
            "<option >C</option>"+
            "</select></span>"+
            "<button id="+i+" style='width:100px;margin-left:5px' class='btn btn-primary m-2 mx-5'>Allot</button>"+
      
            "</li>"+
            "<ul id='details"+i+"'></ul>") 
        }
    })


   

})

})