$(function(){
var i=0;
var k=1;
var ansCount=0;
var answers=[]
let firstTime=true
var ftime
$("#facName").val($.session.get("uid")+" "+$.session.get('facName'))

$("#submit").on("click",function(e){
   e.preventDefault()
  var fid=$("#facName").val()
  let sem=$("#sem :selected").text()
  let subject=$("#subjects :selected").text()
  let exp=$("#exp :selected").text()
  let ntaught=$("#ntaught :selected").text()
  var allAnswers=[]
  for(let i=0;i<answers.length;i++)
  allAnswers.push(answers[i])
  //alert(allAnswers)
  fid=fid.substring(0,fid.indexOf(' '))
  let scode=subject.substring(0,subject.indexOf(' '))
 // alert(fid+ "  "+scode+"  "+exp+ "  "+ntaught+" "+sem)
 $("#applied").append("<li class='list-group-item m-1'><span style='display:inline-block;width:100px'>"+fid+"</span><span style='display:inline-block;width:400px'>"+subject+"</span><span style='display:inline-block;width:100px'>   "+exp+"</span><span style='display:inline-block;width:100px'>   "+ntaught+"</spam></li>") 
  $.ajax({
     url:"http://localhost:8000/api/registersubchoice",
     type:"POST",
     dataType:"json",
     data:{"fid":fid,"scode":scode,"exp":exp,"ntaught":ntaught,"allAnswers":answers},
     success:function(result){
      console.log(result)
     } 
  })
   alert("Subject Registered..")
})

$("#subjects").on("change",function(){

  $("#answer").trigger('focus')
})

$("#next").on("click",function(){
  ansCount++
    if(firstTime) { 
      i=i+1 
    let q="Q"+i
    k=k+1
    $("#question").text(q+". "+allQuestions[k].Q1)
    firstTime=false
    }
    else{
      k=k+1
      let q="Q"+i
    $("#question").text(q+". "+allQuestions[k].Q1)  
    }
    if(i<=11){
    i=i+1
   
    let q="Q"+i
    let hints=allHints[q] 
   //alert(q)
    $("#hints").empty();
    for(let z=0;z<allHints[q].length;z++)
    $("#hints").append("<li class='list-group-item mx-2 w-100' style='color:blue;width:450px;'>"+ // span style='display:inline-block;width:20px'>"+
    "<input id='inp1"+z+"' style='margin-right:10px' type='checkbox'>"+
    "<span id='inp"+z+"' style='display:inline-block;width:440px'>" +
    allHints[q][z].h+"</span></input></li>")
   ftime=true //Needed to display first line without line break 
   answers.push($("#answer").val()+". ")
   $("#answer").val("");
   $("#answer").trigger('focus')
  }else
    alert("You are done..")
    
})

$("#backHome").on("click",function(e){
  e.preventDefault()
  
  window.location="../Components/Faculty.html"
})

$("#prev").on("click",function(){
  ansCount--
  ftime=true //Needed to display first line without line break 
  if(i<=0) $("#prev").style("active","false")
  if(!firstTime)
   { k=k-2;i=i-1; firstTime=true;}
   else { k=k-2; if(k<0) k=0; }
 i=i-1;
  let q="Q"+i
  let hints=allHints[q] 
 ftime=true
  $("#question").text(q+". "+allQuestions[k].Q1)
  if(i>=0){
    $("#hints").empty();
    for(let z=0;z<allHints.Q1.length;z++)
    $("#hints").append("<li id=h"+z+" class='list-group-item mx-2 w-100' style='color:blue;width:450px;'>"+ // span style='display:inline-block;width:20px'>"+
    "<input id='inp1"+z+"' style='margin-right:10px' class='allhints' type='checkbox'></input>"+
    "<span id='inp'"+z+"' style='display:inline-block;width:440px'>" +
    allHints[q][z].h+"</span></input></li>")
  
}


  //$("#answer").text("")
})

$("#hints").on("click","input", function(e){
  e.preventDefault()

  let i=$(this).attr("id")

  let idx=i.substring(i.length-1)
  
 $("#inp1"+idx).prop('checked',true) //,'checked')  

   if(ftime){
   $("#answer").val($("#answer").val().trim()+$("#inp"+idx).text())
  ftime=false 
  }
  else
  $("#answer").val($("#answer").val().trim()+"\n"+$("#inp"+idx).text())
   //$("#answer").val($("#answer").val()+"\n")
})
firstTime=true;
$("#sem").on("change",function(){
  $("#question").text("Q1. "+allQuestions[i++].Q1)
  $("#hints").empty();
  if(firstTime){
    i=1
  }
  let q="Q"+i
 // console.log(q+ " "+i)
  for(let z=0;z<allHints[q].length;z++)
  $("#hints").append("<li class='list-group-item mx-2 w-100' style='color:blue;width:450px;'>"+ // span style='display:inline-block;width:20px'>"+
 // "<input style='margin-right:10px' type='checkbox'>"+
  "<input id='inp1"+z+
  "' checked='false' style='margin-right:10px' type='checkbox'><span id='inp" +z+ 
  "'style='display:inline-block;width:440px'>"+allHints.Q1[z].h+"</span></input>"+
  "</li>")

  sem=parseInt($("#sem :selected").text())


$.ajax({  
  url:"http://localhost:8000/api/getAllSubjects/"+sem,
  type:"GET",
  dataType:"json",
  success:function(result){
    $("#subjects").empty();
    for(let i=0;i<result.length;i++)
        $("#subjects").append("<option>"+result[i].scode+"  "+ result[i].sname + "</option>")  
  }
})
})
})