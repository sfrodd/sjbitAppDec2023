$(function(){

$("#division").on("change",function(){
    let acadyear=$("#acadyear :selected").val()
    let sem=$("#semester :selected").val()
    let div=$("#division :selected").val()
    let branch=$.session.get('branch')
    alert(acadyear+"  "+sem+"  "+div)
$.ajax({
      url:"http://localhost:8000/api/getUSNforMapping",
      type:"POST",
      dataType:"json",
      data:{acadyear:acadyear,sem:sem,div:div,branch:branch},
      success:function(result){
        for(let i=0;i<result.length;i++) {
        $("#fromUSN").append("<option>"+result[i].usn+"</option>")
        $("#toUSN").append("<option>"+result[i].usn+"</option>")
        }
      }
})
})

$("#backtodashb").on("click",function(e){
    e.preventDefault()
   
    window.location="./deptadminDashBoard.html"



})
let branch=$.session.get('branch')

$.ajax({
    url:"http://localhost:8000/api/getallBranchFaculty/"+branch,
    type:"GET",
    dataType:"json",
    success:function(result){
        for(let i=0;i<result.length;i++) 
        $("#allFaculty").append("<option>"+result[i].fid+"  "+result[i].fname+"</option>")
    }
})

$("#assignMentees").on("click",function(e){
    e.preventDefault() 

   let fromUSN=$("#fromUSN :selected").val()
   let toUSN=$("#toUSN :selected").val()
   let faculty=$("#allFaculty :selected").val()
   let fid=parseInt(faculty.substring(0,faculty.indexOf(' ')))
   alert(fromUSN+ "  "+fid)
   $.ajax({
     url:"http://localhost:8000/api/assignMentees",
     type:"POST",
     dataType:"json",
     data:{fromUSN:fromUSN,toUSN:toUSN,fid:fid},
     success:function(result){
 
        alert("Mentee assigned..")

     }


   })
})

})