/*
    $(document).on("keypress", "input", function(e){
      if(e.which == 13){
          inputVal = $(this).val();
         
  //       alert("You've entered: " + inputVal);
          $(this).next().trigger('focus')
      }
  //});
    }
     // alert(input)
    let averageMarks=0;
    let j=$(this).attr("id")
    var jth="";
    focusDirection=$("#direction :selected").text().trim();
   //focusDirection="vertical"
   let i=$(this).attr("id")
   var idx=""  //Why bcz i for usn and attendance and j marks
   if(i.substring(0,1)=='m' || i.substring(0,1)=='a'){
   if(i.length==4)
    idx=i.substring(i.length-2);
   else 
    idx=i.substring(i.length-1);
  

   if(j.length==4)  
     jth=j.substring(j.length-2)
   else
    jth=j.substring(j.length-1)    //Check ia marks or assignememts
   }
   else{
    if(i.length==5)
    idx=i.substring(i.length-2);
   else 
    idx=i.substring(i.length-1);
   
   if(j.length==5)
     jth=j.substring(j.length-2)
   else
    jth=j.substring(j.length-1)
   }
   averageMarks=parseFloat($("#avg"+jth).val())
   console.log("#m1"+jth)  // jth checking the row 0--7  
   //alert(i+"  and "+j)
   let sub=$("#subjects :selected").text();
   let scode=$("#subjects :selected").text().substring(0,sub.indexOf(' '));
   let usn=$("#usn"+idx).text() 
   let attendance=$("#inp"+idx).val();
   let markscol=""  //Need to identify which column is presently being traversed
   var marks=0;

   jth=parseInt(jth);

  
   switch(event.target.id){
     
     case "inp"+jth:attcol="inp" ; 
                    patt=$("#inp"+(jth)).val();
                    if(patt>=0 && patt<=100){    
                    if(jth==6) 
                    $("#m10").trigger('focus')
                    else if(jth==13)
                    $("#m17").trigger('focus')
                    else
                    if(jth==20)
                    $("#m114").trigger('focus')
                    else if(jth==27)
                    $("#m121").trigger('focus')
                    else if(jth==34)
                    $("#m128").trigger('focus')
                    else if(jth==41)
                    $("#m135").trigger('focus')
                    else if(jth==48)
                    $("#m142").trigger('focus')
                    else if(jth==55)
                    $("#m149").trigger('focus')
                    else if(jth==62)
                    $("#m156").trigger('focus')
                    else if(jth==65)
                    $("#m163").trigger('focus')
                    else {
                    $("#inp"+(jth+1)).trigger('focus'); 
                    }
                    $.ajax({
                      url:"http://localhost:8000/api/upDateAttendance",
                      type:"POST",
                      dataType:"json",
                      data:{"usn":usn,"scode":scode,"patt":attendance,"dummy":"Hello"},
                      sync:true,
                      success:function(result){
                       console.log(result)
                      // $("#inp"+(jth+1)).focus()
                       $("#tick"+idx).css("opacity",0.99);
                       $("#tick"+idx).fadeOut(2500);   
                      }
                    })
                    //End of Ajax Update Attendance
                  }
                    else{
                      
                      alert("Invalid Input")
                      $("#inp"+jth).val("") 
                      $("#inp"+jth).trigger('focus')
                    
                    }
                    break;
     case "m1"+jth : markscol="m1" ; 
                     marks=$("#m1"+(jth)).val();
                     if(jth==6) // jth==13 || jth==113 || jth==24 || jth==30 || jth==36 || jth==42 || jth==48 || jth==54 || jth==60 || jth==66 || jth==72)
                     $("#m20").trigger('focus')
                     else if(jth==13) 
                     $("#m27").trigger('focus')
                     else if(jth==20) 
                     $("#m214").trigger('focus')
                     else if(jth==27)
                    $("#m221").trigger('focus')
                    else if(jth==34)
                    $("#m228").trigger('focus')
                    else if(jth==41)
                    $("#m235").trigger('focus')
                    else if(jth==48)
                    $("#m242").trigger('focus')
                    else if(jth==55)
                    $("#m249").trigger('focus')
                    else if(jth==62)
                    $("#m256").trigger('focus')
                    else if(jth==65)
                    $("#m263").trigger('focus')
                    else
                     $("#m1"+(jth+1)).trigger('focus');

                     $.ajax({
                      url:"http://localhost:8000/api/upDateMarks",
                      type:"POST",
                      dataType:"json",
                      data:{"usn":usn,"scode":scode,"markscol":markscol,"marks":marks},
                      sync:true,
                      success:function(result){
                       console.log(result)
                  
                       $("#tick"+idx).css("opacity",0.99);
                       $("#tick"+idx).fadeOut(2500); 
                      }
                      
                    }) //End of Ajax Update Marks
                  
                     
  
                     break;

     case "m2"+jth : markscol="m2";
                     marks=$("#m2"+jth).val();
                     if(jth==6) // || jth==13 || jth==19 || jth==24 || jth==30 || jth==36 || jth==42 || jth==48 || jth==54 || jth==60 || jth==66 || jth==72)
                     $("#m30").trigger('focus')
                     else if(jth==13)  
                     $("#m37").trigger('focus') 
                     else if(jth==21)  
                     $("#m314").trigger('focus')
                     else if(jth==27)
                    $("#m321").trigger('focus')
                    else if(jth==34)
                    $("#m328").trigger('focus')
                    else if(jth==41)
                    $("#m335").trigger('focus')
                    else if(jth==48)
                    $("#m342").trigger('focus')
                    else if(jth==55)
                    $("#m349").trigger('focus')
                    else if(jth==62)
                    $("#m356").trigger('focus')
                    else if(jth==65)
                    $("#m363").trigger('focus')
                    else
                     $("#m2"+(jth+1)).trigger('focus'); 
                     //$("#m2"+(jth+1)).trigger('focus');
                     $.ajax({
                      url:"http://localhost:8000/api/upDateMarks",
                      type:"POST",
                      dataType:"json",
                      data:{"usn":usn,"scode":scode,"markscol":markscol,"marks":marks},
                      sync:true,
                      success:function(result){
                       console.log(result)
                  
                       $("#tick"+idx).css("opacity",0.99);
                       $("#tick"+idx).fadeOut(2500); 
                      }
                      
                    }) //End of Ajax Update Marks
                  
                  
                  
                     break;

     case "m3"+jth : markscol="m3";
                     marks=$("#m3"+jth).val();
                     if(jth==6)// || jth==13 || jth==19 || jth==24 || jth==30 || jth==36 || jth==42 || jth==48 || jth==54 || jth==60 || jth==66 || jth==72)
                     $("#a10").trigger('focus')
                     else 
                     if(jth==13)  
                     $("#a17").trigger('focus') 
                     if(jth==20)  
                     $("#a114").trigger('focus')
                     else if(jth==27)
                    $("#a121").trigger('focus')
                    else if(jth==34)
                    $("#a128").trigger('focus')
                    else if(jth==41)
                    $("#a135").trigger('focus')
                    else if(jth==48)
                    $("#a142").trigger('focus')
                    else if(jth==55)
                    $("#a149").trigger('focus')
                    else if(jth==62)
                    $("#a156").trigger('focus')
                    else if(jth==65)
                    $("#a163").trigger('focus')
                    else
                     $("#m3"+(jth+1)).trigger('focus'); 
                     //$("#m3"+(jth+1)).trigger('focus');
                     $.ajax({
                      url:"http://localhost:8000/api/upDateMarks",
                      type:"POST",
                      dataType:"json",
                      data:{"usn":usn,"scode":scode,"markscol":markscol,"marks":marks},
                      sync:true,
                      success:function(result){
                       console.log(result)
                  
                       $("#tick"+idx).css("opacity",0.99);
                       $("#tick"+idx).fadeOut(2500); 
                      }
                      
                    }) //End of Ajax Update Marks
                  
                     break;

     case "a1"+jth : markscol="ass1";
                     marks=$("#a1"+jth).val();
                     if(jth==6)// || jth==13 || jth==19 || jth==24 || jth==30 || jth==36 || jth==42 || jth==48 || jth==54 || jth==60 || jth==66 || jth==72)
                     $("#see0").trigger('focus')
                     else if(jth==13)// || jth==13 || jth==19 || jth==24 || jth==30 || jth==36 || jth==42 || jth==48 || jth==54 || jth==60 || jth==66 || jth==72)
                     $("#see7").trigger('focus')
                     else 
                     if(jth==20)  
                     $("#see14").trigger('focus')
                     else 
                     if(jth==27)
                     $("#see21").trigger('focus')
                    else if(jth==34)
                    $("#see28").trigger('focus')
                    else if(jth==41)
                    $("#see35").trigger('focus')
                    else if(jth==48)
                    $("#see42").trigger('focus')
                    else if(jth==55)
                    $("#see49").trigger('focus')
                    else if(jth==62)
                    $("#see56").trigger('focus')
                    else if(jth==65)
                    $("#see63").trigger('focus')
                    else
                     $("#a1"+(jth+1)).trigger('focus');
                    // $("#tick"+idx).fadeOut(2500);  
                     //$("#a1"+(jth+1)).trigger('focus');
                     $.ajax({
                      url:"http://localhost:8000/api/upDateMarks",
                      type:"POST",
                      dataType:"json",
                      data:{"usn":usn,"scode":scode,"markscol":markscol,"marks":marks},
                      sync:true,
                      success:function(result){
                       console.log(result)
                      // alert(idx)
                       $("#tick"+idx).css("opacity",0.99);
                       $("#tick"+idx).fadeOut(2500); 
                      }
                      
                    }) //End of Ajax Update Marks
                         
                     break;
//
     case "see"+jth :markscol="see"; 
                     marks=parseInt($("#see"+jth).val());
                     marks=parseInt(inputVal)
                     if(jth==6)// || jth==13 || jth==19 || jth==24 || jth==30 || jth==36 || jth==42 || jth==48 || jth==54 || jth==60 || jth==66 || jth==72)
                     $("#gtot0").trigger('focus')
                     else if(jth==13)// || jth==13 || jth==19 || jth==24 || jth==30 || jth==36 || jth==42 || jth==48 || jth==54 || jth==60 || jth==66 || jth==72)
                     $("#gtot7").trigger('focus')
                     else 
                     if(jth==20)  
                     $("#gtot14").trigger('focus')
                     else 
                     if(jth==27)
                     $("#gtot21").trigger('focus')
                    else if(jth==34)
                    $("#gtot28").trigger('focus')
                    else if(jth==41)
                    $("#gtot35").trigger('focus')
                    else if(jth==48)
                    $("#gtot42").trigger('focus')
                    else if(jth==55)
                    $("#gtot49").trigger('focus')
                    else if(jth==62)
                    $("#got56").trigger('focus')
                    else if(jth==65)
                    $("#gtot63").trigger('focus')
                    else
                     $("#see"+(jth+1)).trigger('focus');
                     
                   //  alert(markscol+"  "+marks +" "+usn+"  "+scode)
                     $.ajax({
                      url:"http://localhost:8000/api/upDateMarks",
                      type:"POST",
                      dataType:"json",
                      data:{"usn":usn,"scode":scode,"markscol":markscol,"marks":marks},
                      sync:true,
                      success:function(result){
                       console.log(result)
                       $("#tick"+idx).css("opacity",0.99);
                       $("#tick"+idx).fadeOut(2500); 
                      }
                      
                    }) //End of Ajax Update Marks
            
                     break;
   } //End of switch

   if(marks=="AB" || marks=="ab") marks=-1;

   if(markscol=="m3" )
   {  //need to update.. Average also
      let m1=$("#m1"+jth).val().trim();
      let m2=$("#m2"+jth).val().trim();
      let m3=$("#m3"+jth).val().trim();
    
     if((m1!="AB")  && (m2!="AB") && (m3!="AB")){  
     avg=computeAverage(parseFloat(m1),parseFloat(m2),parseFloat(m3))
      }
     else if((m1=="AB"))
           avg=computeAverage(0,parseFloat(m2),parseFloat(m3))
           else if((m2=="AB"))
           avg=computeAverage(parseFloat(m1),0,parseFloat(m3))
           else if((m3=="AB")){
           avg=computeAverage(parseFloat(m1),parseFloat(m2),0)
           }
   // alert(avg)
             //Fifty is reduced to 30  Update Average
    $.ajax({
    url:"http://localhost:8000/api/upDateMarks",
    type:"POST",
    dataType:"json",
    data:{"usn":usn,"scode":scode,"markscol":"average","marks":avg},
    sync:true,
    success:function(result){
     console.log(result)
      $("#tick"+idx).css("opacity",0.99);
      $("#tick"+idx).fadeOut(2500); 
    }
 })
} //End of if colname is m3

   //Update CIE marks
  
  if(markscol=="ass1"){
    var cie=averageMarks*0.6+parseFloat(marks)
        cie=cie.toFixed();
   //alert("I am here with cie "+cie+"  "+usn+"  "+scode )
    $.ajax({
      url:"http://localhost:8000/api/upDateMarks",
      type:"POST",
      dataType:"json",
      data:{"usn":usn,"scode":scode,"markscol":"cie","marks":cie},
      sync:true,
      success:function(result){
       console.log(result)
        $("#tick"+idx).css("opacity",0.99);
        $("#tick"+idx).fadeOut(2500); 
      }
   }) //end of if ass1

  }
  //Update grand total
  if(markscol=="see"){
    //What is this i? This is sorted out with use of jth
    let gtotl=parseFloat($("#see"+jth).val())+parseFloat(marks)*0.6
    $.ajax({
      url:"http://localhost:8000/api/upDateMarks",
      type:"POST",
      dataType:"json",
      data:{"usn":usn,"scode":scode,"markscol":"gtotal","marks":gtotl},
      sync:true,
      success:function(result){
       console.log(result)
        $("#tick"+idx).css("opacity",0.99);
        $("#tick"+idx).fadeOut(2500); 
      }
   }) //End of Ajax 
  } //End of if see
    // End of if key==13
      
}) //End of if Change in marks in input boxes */