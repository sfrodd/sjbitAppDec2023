$(function(){
let fid=$.session.get('uid')
let fname=$.session.get('uname')

$("#backHome1").on("click",function(e){
e.preventDefault()

window.location="../Components/Faculty.html"

})

$("#menteesList").on("click","button",function(e){
    e.preventDefault()
let i=$(this).attr("id")
idx=i.substring(i.length-1)
let stname=$("#stname"+idx).text()
$.session.set('stname',stname)
let usn=$("#usn"+idx).text()
$.session.set('usn',usn)
let dDate=$("#discdate"+idx).val()
let disc=$("#discdetails"+idx).val();
let action=$("#actiontaken"+idx).val();
let resolvedBy=$("#delegate"+idx+" :selected").text()
let fid=$.session.get('uid')
alert(fid)
if(i.substring(0,4)=='sbtn'){
//alert(usn+"  "+dDate+"  "+disc)
if(disc=="") alert("Discussion details cant be empty..")
else if(action=="") alert("Action cant be empty!!")
else
$.ajax({
  url:"http://localhost:8000/api/insertDiscussion",
  type:"POST",
  dataType:"json",
  async:false,
  data:{"usn":usn,"dDate":dDate,"discussion":disc,"actiont":action,"rby":resolvedBy,"fid":fid},
  success:function(result){
    console.log(result);
    $("#discdetails"+idx).val("")
    $("#actiontaken"+idx).val("")
    $("#discdetails"+idx).trigger('focus')
   alert("Discussion Saved.:");
  }
})
}
else
    {
        let usn=$("#usn"+idx).text()
    
    //    $.session.set('usn',usn);
        //Causing proble.:this issue is resolved on 18/02/2023
        window.location.href = "../components/ViewMentoringDetails.html"; 
        
    }
})



$("#facwelcome").html("<h4 style='color:red;margin-left:40px;margin-top:5px'>Welcome Prof. "+fname+", your Mentees List</h4>")
$.ajax({
url:"http://localhost:8000/api/getMentees/"+fid,
type:"GET",
dataType:"json",
success:function(result){

    for(let i=0;i<result.length;i++){

        $("#menteesList").append("<li id=list"+i+" style='list-style:none;width:1250px;background-color:light-yellow;height:50px;color:blue;margin-left:10px' class='list-group-item mt-1 mx-1'>"+
        "<span id=sl"+i+" style='display:inline-block;marign-right:10px;width:20px;color:red'>"+(i+1)+". </span>"+
        "<span id=usn"+i+" style='display:inline-block;margin-right:10px;width:100px'>"+
        result[i].usn + "</span>"+
        "<span style='display:inline-block;width:240px' id=stname"+i+">" + 
        result[i].fname+
        "</span><span id=drn"+i+" style='display:inline-block;width:30px'>" +
        result[i].sem+"</span>"+
        //"<span id=st1"+i+" style='display:inline-block;width:120px'>"+
        //result[i].cellNum+"</span>"+
        "<span id=en"+i+" style='display:inline-block;width:140px;margin-right:5px'>"+
        "<input id=discdate"+i+" type='date'  placeholder='dd-mm-yyyy' value='2018-07-22' required pattern='\d{2}-\d{2}-\d{4}'"+
        "min='1997-01-01' max='2030-12-31'></input></span>"+
        "<span id=en"+i+" style='display:inline-block;width:210px;'>"+
        "<input style='width:200px' id=discdetails"+i+" type='textarea'></input>"+
        "</span>"+
        "<select  style='width:80px;height:30px' id='delegate"+i+"'><option selected>Self</option>"+
        "<option>Hod</option>"+
        "<option>ProjectCoordinator</option>"+
        "<option>AcademicCoordinator</option></select>"+
        "<span id=en"+i+" style='display:inline-block;width:210px;margin-left:5px'><input style='width:210px' id=actiontaken"+i+" type='textarea'></input>"+
        "</span>"+
        "<span id=en"+i+" style='display:inline-block;width:80px;margin-left:5px'>"+
        "<button id='sbtn"+i+"' class='btn btn-primary mx-4'>Save</button>"+ 
        "</span><span id=vd"+i+" style='display:inline-block;width:80px;margin-left:5px>"+
        "<a href='../components/ViewMentoringDetails.html'><button style='margin-left:5px' id='vbtn"+i+
        "' class='btn btn-warning mx-4'>View</button></a></span>"+
        "</li>")

var now = new Date();
var day = ("0" + now.getDate()).slice(-2);
var month = ("0" + (now.getMonth() + 1)).slice(-2);
var today = now.getFullYear() + "-" + (month) + "-" + (day);
$('#discdate'+i).val(today);
    }


}

})

})

function setCurrentDate(){
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear() + "-" + (month) + "-" + (day);
    $('#discDate').val(today);
}