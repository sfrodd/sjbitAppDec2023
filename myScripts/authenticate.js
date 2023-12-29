$(function(){

$.session.set('logged',false);


var login;
var pwd;
var branch;
//$("#user").text($.session.get('uname'))

$("#log").on("click",function(event){
    event.preventDefault();
    
    login=$("#login").val();
    pwd=$("#password").val(); 
    var usrName;
    var passWord;
    var fname;
    var lname
    var uid;
    var category
    //alert(login)
    if(login=="" || pwd=="")
    $("#msg").text("Login & Passord Required").fadeToggle(1000,function(){
      $("#msg").text("jFork TS");
      $("#login").trigger("focus");
      
    })
    
//    alert($.session.get('user'))
    $.ajax({
        url:"http://localhost:8000/api/getUser/"+$("#login").val().trim(),
        type:"GET",
        dataType:"json",
        success:function(result){
          console.log(result)
          //console.log('I am in success '+result[0].password)
          uid=result[0].uid;         
          passWord=result[0].pwd;     
          usrName=result[0].uname;
          category=result[0].category
          branch=result[0].branch
          
          if(login=="Admin" && passWord==pwd){
              $("#msg").text("Login Succesful..")
              $.session.set('logged',true)
              $.session.set('uname',usrName)
              $.session.set('facName',login)
              $.session.set('uid',uid);
              window.location="../Components/Admin/adminDashBoard.html";
          }
          else
          if(login=="hodcse" || login=="hodec" && passWord==pwd){
            $("#msg").text("Login Succesful..")
            $.session.set('logged',true)
            $.session.set('uname',usrName)
            $.session.set('facName',login)
            $.session.set('branch',branch)
            $.session.set('uid',uid);
            window.location="../Components/HodDashBoard.html";
        }
        else
          if(login=="officeadmin" && passWord==pwd){
            $("#msg").text("Login Succesful..")
            $.session.set('logged',true)
            $.session.set('uname',usrName)
            $.session.set('facName',login)
            $.session.set('uid',uid);
            window.location="../Components/Office.html";
        }
        else
          if(login=="cseadmin" || login=="ecadmin" || login=="eeadmin" && passWord==pwd){
            $("#msg").text("Login Succesful..")
            $.session.set('logged',true)
            $.session.set('uname',usrName)
            $.session.set('uid',uid);
            $.session.set('facName',login)
            $.session.set('branch',branch) 
            window.location="../Components/DeptAdmin/deptadminDashBoard.html";
        }
        else
          if(login==usrName && passWord==pwd){
          $("#msg").text("Login Succesful..")
          $.session.set('logged',true)
          //.session.set('user',cidoradmin)
          $.session.set('uname',usrName)
          $.session.set('uid',uid);
          $.session.set('facName',login)
          $.session.set('branch',branch)
                //$("#user").text(result[0].cidoradmin)
          //alert(uid)      
          //if(uid>=1001 && uid<1050)
       // if(category=="faculty")
          window.location="../Components/Faculty.html";
        //else
          //if(category=="hod")
          //window.location="../Components/HodDashBoard.html";

          //else if(uid==5001)
        //  window.location="../Components/Student.html";
          }
        
          else{
              $("#msg").attr({"style":"color:red"})
              $("#msg").text("Login Failed...").slideDown(1000,function(){
                $("#msg").slideUp(1000)
                $("#password").text("")
                $("#login").text("").focus()
              })
          }      
        }
    })
})
//$("#user").text(login)
})