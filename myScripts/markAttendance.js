$(function(){

let fid=$.session.get('uid');
var fname=$.session.get('uname');
fname=fname.toUpperCase();
$("#uname").text(fname)
var allSubjects=[]
firstTime=true;
var scode=""
var i=""
var idx=""
var currentBox
var nextBox
var usn
$("#branch").text($.session.get('branch'))
//Append the subject list box with faculty's subjects
/*
$.ajax({
   url:"http://localhost:8000/api/getFacultySubjects/"+fid,
   type:"GET",
   dataType:"json",
   success:function(result){
   $("#subjects").empty();
   $("#subjects").append("<option>Select Subject</option>")
   for(let i=0;i<result.length;i++)
   $("#subjects").append("<option >"+result[i].scode+" "+result[i].sname+" " +result[i].Division+"</option>")
   }
  })//End of Ajax
*/
  $("#acadyear").on("change",function(e){
    e.preventDefault()
    let fid=$.session.get('uid');
    let acadyear=$("#acadyear :selected").val() 
    //Append the subject list box with faculty's subjects
$.ajax({
  url:"http://localhost:8000/api/getFacultySubjects/",
  type:"POST",
  dataType:"json",
  data:{fid:fid,acadyear:acadyear},
  success:function(result){
  if(result.length==0) { $("#allStudents").empty();
  $("#subjects").empty();
  }
  else  
  $("#subjects").empty();
  $("#subjects").append("<option>Select Subject</option>")
  for(let i=0;i<result.length;i++)
  $("#subjects").append("<option >"+result[i].scode+" "+result[i].sname+" " +result[i].Division+"</option>")
  }
 })//End of Ajax


  })

  //On selection of a subject show the students
  $("#subjects").on("change",  function(){
    let ayear=$("#acadyear :selected").text()
    let sub=$("#subjects :selected").text().trim();
    let scode=$("#subjects :selected").text().substring(0,sub.indexOf(' '));
    let divs=$("#subjects :selected").text().substring(sub.length-1);
    let sem=0
    //To extract semester from subject code following code is written on 29/12/2023
    if(scode.length==6)
    sem=scode.substring(4,5)
    else if(scode.length==7 && scode.charAt(4)=='L')
    sem=scode.substring(5,6)
    else
    sem=scode.substring(4,5)
    //Get IA marks of all students and display page wise
    //alert(scode+" "+sem)
    $.ajax({
        url:"http://localhost:8000/api/getIAMarks",
        type:"POST",
        dataType:"json",
        data:{"scode":scode,"div":divs,"acadyear":ayear,sem:sem},
        success:function(result){
          //Heading.
         $("#allStudents").empty();
//Display Student USN, Attendance and Marks   
          for(let i=0;i<result.length;i++)
                 $("#allStudents").append("<li style='border-radius:0.25rem;width:1200px;height:45px'"+
                " class='list-group-item mt-2 mx-4'>"+
                 "<span id=usn"+i+">"+result[i].usn+
                  "</span>"+
                  "<input id=inp-"+i+" style='margin-left:30px;width:90px' type='text' placeholder='att' value="+(result[i].percAttendance>0?result[i].percAttendance:"")+
                  ">"+
                  "<input id=m1-"+i+" style='margin-left:25px;width:65px' type='text' placeholder='m1' value="+(result[i].m1>0 ? result[i].m1:"" )+">"+
                  "<input id=m2-"+i+" style='margin-left:25px;width:65px' type='text' placeholder='m2' value="+(result[i].m2>0 ? result[i].m2:"" )+">"+
                  "<input id=m3-"+i+" style='margin-left:25px;width:65px' type='text' placeholder='m3' value="+(result[i].m3>0 ? result[i].m3:""  )+">"+
                  "<input id=avg-"+i+" style='margin-left:25px;width:65px' type='text' placeholder='Avg' value="+computeAverage(result[i].m1,result[i].m2,result[i].m3).toFixed()+">"+
                  ""+
                  "<input id=ass-"+i+" style='margin-left:25px;width:65px' type='text' placeholder='AS-1' value="+(result[i].ass1>=0?result[i].ass1:result[i].ass1==-1?"":"AB" )+">"+
               // "<input id=cie"+i+" style='margin-left:25px;width:65px' type='text' placeholder='CIE' value="+(result[i].cie>=0?result[i].cie:"AB")+"></input>"+
                  "<input id=cie"+i+" style='margin-left:25px;width:65px' type='text' placeholder='CIE' value="+(parseFloat(result[i].ass1)+parseFloat(computeAverage(result[i].m1,result[i].m2,result[i].m3).toFixed()))+
                  "></input>"+
                  "<input id=see-"+i+" style='margin-left:25px;width:65px' type='text' placeholder='SEE' value="+(result[i].see>=0?result[i].see:result[i].see==-1?"AB":"" )+
                  ">"+
                  "<input id=gtot"+i+" style='margin-left:25px;width:75px' type='text' placeholder='Gtotal' value="+(parseFloat(result[i].ass1)+parseFloat(computeAverage(result[i].m1,result[i].m2,result[i].m3).toFixed())+parseInt(result[i].see)*0.6).toFixed(2)+
                  ">"+
                  "<input id=class"+i+" style='margin-left:25px;width:75px' type='text' placeholder='Class' value="+getClass((parseFloat(result[i].ass1)+parseFloat(computeAverage(result[i].m1,result[i].m2,result[i].m3).toFixed())+parseInt(result[i].see)*0.6))+
                  ">"+
                  "<i id='tick"+i+"' style='margin-left:30px;color:green;opacity:0.1;font-weight:bold' class='bi bi-check'></i>"+
                  "</li>")

     $("#allStudents").paginathing({
         perPage: 7,
         limitPagination: 11,
         containerClass:'panel-footer m-4',   
         pageNumbers: true,
         // containerClass: 'pagination-container',
      // Extend default <ul> class
         // ulClass: 'pagination',
        //Extend <li> class
          liClass: 'page-item',
          })
        }
    })  //End of Ajax  //Upto here it is perfectly Okay:

}) //End of Change event
var inputVal    
var nxt=0  //Changing from focusout to key up
//If the faculty start entering marks and attendance..
currentBox=""
nextBox=""
$("#allStudents").on("keypress","input",function(event){
    event.preventDefault();
    i=$(this).attr("id")
    let fLetter=i.substring(0,1)
    switch(fLetter){
    case 'i':  //Attendance Update 
    let inp=i.substring(0,3)
    idx=parseInt(i.substring(i.indexOf('-')+1,i.length));
    currentBox=inp+"-"+idx;
    //alert(currentBox)
    nextBox=inp+"-"+(idx+1)
    if(event.key==="Enter" || event.key==="Tab"){
     
      if($("#"+currentBox).val()>100 ||$("#"+currentBox).val()<-1 ){
      alert("Invalid Input")
      $("#"+currentBox).val("")
      $("#"+currentBox).trigger('focus')
      }
      else {
        let attendance=$("#"+currentBox).val()
        i=$(this).attr("id")
        idx=parseInt(i.substring(i.indexOf('-')+1,i.length))
        usn=$("#usn"+idx).text()
        acadyear=$("#acadyear").val()
        let sub=$("#subjects :selected").text().trim();
        let scode=$("#subjects :selected").text().substring(0,sub.indexOf(' '));
       // alert(scode)
        $.ajax({
          url:"http://localhost:8000/api/upDateAttendance",
          type:"POST",
          dataType:"json",
          data:{"usn":usn,"scode":scode,"patt":attendance,acadyear:acadyear},
          sync:true,
          success:function(result){
           console.log(result)
          // $("#inp"+(jth+1)).focus()
           $("#tick"+idx).css("opacity",0.99);
            $("#tick"+idx).fadeOut(2500);   
          }
        })  //End of Ajax
      $("#"+nextBox).trigger('focus') 
      }//End of else data entered is correct
    } //End of Enter or Tab
    else
    $("#"+currentBox).val( $("#"+currentBox).val()+event.key) //Keep accumulating data until Enter key is pressed
    break;

    case 'm': //Marks Update M1,M2,M3
      let inp1=i.substring(0,2)
      idx=parseInt(i.substring(i.indexOf('-')+1,i.length))
      currentBox=inp1+"-"+idx; 
      idx=idx+1;   
      nextBox=inp1+"-"+idx
     // alert(inp1+"  "+currentBox+"  "+nextBox)
      if(event.key==="Enter" || event.key==="Tab"){
        if($("#"+currentBox).val()>30 ||$("#"+currentBox).val()<-1 ){
          alert("Invalid Input")
          $("#"+currentBox).val("")
          $("#"+currentBox).trigger('focus')
          }
          else { //Data currectly entered
            i=$(this).attr("id")
            idx=parseInt(i.substring(i.indexOf('-')+1,i.length))
            let markscol="m"+i.substring(1,2)
            let marks=$(this).val()
            let sub=$("#subjects :selected").text().trim();
            let scode=$("#subjects :selected").text().substring(0,sub.indexOf(' '));           
            usn=$("#usn"+idx).text()
           // alert(usn+" "+marks+"  "+scode+"  "+markscol+"  "+idx)
            $.ajax({
            url:"http://localhost:8000/api/upDateMarks",
            type:"POST",
            dataType:"json",
            data:{"usn":usn,"scode":scode,"markscol":markscol,"marks":marks},
            sync:true,
            success:function(result){
            // Small Bug... Exists here
            console.log("#tick"+idx)
             $("#tick"+idx).css("opacity",0.99);
             $("#tick"+idx).fadeOut(1000);
             $("#tick"+idx).css("opacity",0.1); 
             }
            }); //End of Ajax
           // alert(nextBox)
          $("#"+nextBox).trigger('focus') 
        }
      }
      else
      $("#"+currentBox).val( $("#"+currentBox).val()+event.key) //Accumulated Data
      break;
      case 's':  //SEE Update
      let inp2=i.substring(0,3)
      idx=parseInt(i.substring(i.indexOf('-')+1,i.length))
      currentBox=inp2+"-"+idx;
      nextBox=inp2+"-"+(idx+1)
      if(event.key==="Enter" || event.key==="Tab"){
        $("#"+nextBox).trigger('focus') 
      //Need to Update SEE Marks Here...
      if($("#"+currentBox).val()>100 ||$("#"+currentBox).val()<-1 ){
        alert("Invalid Input")
        $("#"+currentBox).val("")
        $("#"+currentBox).trigger('focus')
        }
        else {

          i=$(this).attr("id")
          
          idx=parseInt(i.substring(i.indexOf('-')+1,i.length))
         // alert(idx)
          let seecol="see"
          let seemarks=$(this).val()
          usn=$("#usn"+idx).text()
          let sub=$("#subjects :selected").text().trim();
          let scode=$("#subjects :selected").text().substring(0,sub.indexOf(' '));  
          //alert(usn+" "+assmarks+"  "+scode+"  "+asscol)
          $.ajax({
          url:"http://localhost:8000/api/upDateMarks",
          type:"POST",
          dataType:"json",
          data:{"usn":usn,"scode":scode,"markscol":seecol,"marks":seemarks},
          sync:true,
          success:function(result){
           console.log(result)
  
           $("#tick"+idx).css("opacity",0.99);
           $("#tick"+idx).fadeOut(2500); 
           $("#tick"+idx).css("opacity",0.1);
           }
          }); //End of Ajax
      $("#"+nextBox).trigger('focus') 
        }          
    }
    else
    $("#"+currentBox).val( $("#"+currentBox).val()+event.key)
      break;

      case 'a': //Assignment Update
      let inp3=i.substring(0,3)
      idx=parseInt(i.substring(i.indexOf('-')+1,i.length))
      currentBox=inp3+"-"+idx;
      nextBox=inp3+"-"+(idx+1)
      if(event.key==="Enter" || event.key==="Tab"){
        if($("#"+currentBox).val()>10 ||$("#"+currentBox).val()<-1 ){
          alert("Invalid Input")
          $("#"+currentBox).val("")
          $("#"+currentBox).trigger('focus')
          }
          else {

            i=$(this).attr("id")
            
            idx=parseInt(i.substring(i.indexOf('-')+1,i.length))
           // alert(idx)
            let asscol="ass1"
            let assmarks=$(this).val()
            usn=$("#usn"+idx).text()
            let sub=$("#subjects :selected").text().trim();
            let scode=$("#subjects :selected").text().substring(0,sub.indexOf(' '));
            //alert(usn+" "+assmarks+"  "+scode+"  "+asscol)
            $.ajax({
            url:"http://localhost:8000/api/upDateMarks",
            type:"POST",
            dataType:"json",
            data:{"usn":usn,"scode":scode,"markscol":asscol,"marks":assmarks},
            sync:true,
            success:function(result){
             console.log(result)
    
             $("#tick"+idx).css("opacity",0.99);
             $("#tick"+idx).fadeOut(2500); 
             $("#tick"+idx).css("opacity",0.1);
             }
            }); //End of Ajax
        $("#"+nextBox).trigger('focus') 
          }          
      }
      else
      $("#"+currentBox).val( $("#"+currentBox).val()+event.key)
      
      
      break;
  
    }

})

})
 //End of ready function

function computeAverage(m1,m2,m3){

  //if(m1!==-1 && m2!=-1 &&m3!=-1)
  return (m1+m2+m3)/3
  //if(m1==-1)
  //return(m2+m3)/3
  //else if(m2==-1) return (m1+m3)/3
  //else return (m1+m2)/3
}

function gTotal(avg,see){
  if(avg!=-1 && see!=-1)
   return(avg+see*0.6) //CIE(40%)+SEE(60%)  
}

function getClass(marks){

 if(marks>=70)
 return "FCD"
 else if(marks>=60 && marks<70)
 return "FC"
 else if(marks>=50 && marks<60)
 return "SC"
 else if(marks>=40 && marks<50)
 return "PASS"
 else return "FAIL"
}