$(function(){
  var totBacklogs=0

 //Check the text box name

  $("#collapse").on("click",function(){

    $("#backloginfo").empty()
  })  
//Get backlog info from database
$("#backloginfo").on("click","i",function(){
  let i=$(this).attr("id");
  idx=i.substring(i.length-1);
  $("#tr"+idx).remove();
})

$("#backloginfo").on("click","button",function(){
  let i=$(this).attr("id");
  idx=i.substring(i.length-1);
  alert(idx)
  $("#status"+idx).css("color","green")
  $("#status"+idx).text("Paid..");
})

$("#expand").on("click",function(event){
  event.preventDefault();
  let usn=$("#usn").val(); 
  $.ajax({
     url:"http://localhost:8000/api/getBackloginfo/"+usn,
     type:"GET",
     dataType:"json",
     success:function(result){
         backlogs=result;
         console.log(backlogs)
         $("#backloginfo").empty()
         n=backlogs.length;
         for(let i=0;i<n;i++)
               $("#backloginfo").append("<tr id=tr"+i+" style='margin-top:2px;background-color:yellow;color:red'><td>"+
               backlogs[i].scode +"</td><td>"+
               backlogs[i].sname+"</td><td> "+
               backlogs[i].scode.substring(4,backlogs[i].scode.length-1)+"</td><td>"+
               backlogs[i].fees+"</td><td id=status"+i+">"+ backlogs[i].status+
               "</td><td><i id=trx"+i+" style='color:red' class='bi bi-trash'></i>"+
               "<button id=btn"+i+" style='margin-left:20px' class='btn btn-dark'>PAY FEES</td>"+
               "</tr>")
       
           }

     })
  
  })


$("#search").on("click",function(event){
    event.preventDefault()
    var usn=$("#usn").val();

    //Get student information...
    $.ajax({
      url:"http://localhost:8000/api/getStudentInfo/"+usn,
      type:"GET",
      dataType:"json",
      async:false,
      success:function(result){
      let usn=result[0].usn
      var admyear=usn.substring(3,5)
      admyear="20"+admyear 
      //Inner ajax to get aggregate info
        $.ajax({
          url:"http://localhost:8000/api/gettotalBacklogs/"+usn,
          type:"GET",
          dataType:"json",
          async: false,
          success:function(result){

          totBacklogs=result[0].totbacklogs;
          alert(totBacklogs)
          }
        })//End of inner Ajax 
       // alert(totBacklogs)
        $("#studentinfo").empty()
        $("#studentinfo").append("<tr style='background-color:cadetblue;color:yellow'><td>"+
        result[0].usn+"</td><td>"+
        result[0].fname+" "+
        result[0].lname+"</td><td>"+result[0].sem+
        "</td><td>"+result[0].Division+"</td>"+
        "<td>"+totBacklogs+"</td>"+
        "<td>"+result[0].admType+"</td>"+
        "<td>"+admyear+"</td>"+
        "<td><i class='bi bi-currency-rupee'></i>"+result[0].totFees +"</td>"+
        //"<td><i class='bi bi-currency-rupee'></i>"+result[0].installment1 +"</td>"+
       // "<td><i class='bi bi-currency-rupee'></i>"+result[0].installment2 +"</td>"+
        //"<td><i class='bi bi-currency-rupee'></i>"+result[0].installment3 +"</td>"+
        //"<td><i class='bi bi-currency-rupee'></i>"+(result[0].installment1+result[0].installment2+result[0].installment3)+"</td>"+
        //"<td><i class='bi bi-currency-rupee'></i>"+(result[0].totFees-(result[0].installment1+result[0].installment2+result[0].installment3)) +"</td>"+
        "</tr>")
      }//End of sucess
  
    }) //End of Ajax
   
    //Get Fee details given the usn
    $.ajax({
      url:"http://localhost:8000/api/getStudentFeeDetails/"+usn,
      type:"GET",
      dataType:"json",
      success:function(result){
    
        let usn=result[0].usn
        var admyear=usn.substring(3,5)
        admyear="20"+admyear
       //alert("I am here.:"+usn)
        $("#stdfeedetails").empty()
        $("#stdfeedetails").append("<tr style='background-color:yellow;color:red'>"+
        
        "<td id='admYear'>2020-2021</td>"+
        "<td id='acadYear'>2022-2023</td>"+
        "<td id='totFees'>"+
        result[0].totFees+"</td><td>"+
        "<input id=inst1 type='text' value="+result[0].inst1+ ">"+
        "</td><td>"+
        "<input id=inst2 type='text' value="+result[0].inst2+ ">"+
        "</td><td>"+
        "<input id=inst3 type='text' value="+result[0].inst3+">"+
        "</td><td>"+
        "<input id=inst4 type='text' value="+result[0].inst4 +">"+  
        "</td><td id=fpaid>"+(result[0].inst1+result[0].inst2+result[0].inst3+result[0].inst4)+"</td>"+
        "<td id=fdues>"+((result[0].totFees)-(result[0].inst1+result[0].inst2+result[0].inst3+result[0].inst4))+"</td>"+
        //"<td><i class='bi bi-currency-rupee'></i>"+result[0].totFees +"</td>"+
        //"<td><i class='bi bi-currency-rupee'></i>"+result[0].installment1 +"</td>"+
       // "<td><i class='bi bi-currency-rupee'></i>"+result[0].installment2 +"</td>"+
        //"<td><i class='bi bi-currency-rupee'></i>"+result[0].installment3 +"</td>"+
        //"<td><i class='bi bi-currency-rupee'></i>"+(result[0].installment1+result[0].installment2+result[0].installment3)+"</td>"+
        //"<td><i class='bi bi-currency-rupee'></i>"+(result[0].totFees-(result[0].installment1+result[0].installment2+result[0].installment3)) +"</td>"+
        "</tr>")
      }//End of sucess
    }) //End of Ajax

    }) //End of onlcick

   $("#stdfeedetails ").on("focusout","input", function(event){
    event.preventDefault();

    
      let ibox=($(this).attr("id"))
      if(ibox=="inst1")
     { 
      $("#fpaid").text($("#"+ibox).val())
      $("#fdues").text(parseFloat($("#totFees").text())-parseFloat($("#inst1").val()))
     }
      else
      if(ibox=="inst2")
      { 
        let fpaid=parseFloat($("#"+ibox).val())
        let oldfpaid=parseFloat($("#fpaid").text())
        
        $("#fpaid").text(fpaid+oldfpaid)
        $("#fdues").text((parseFloat($("#totFees").text())-(fpaid+oldfpaid)))
       }
       else
      if(ibox=="inst3")
      { 
        let fpaid=parseFloat($("#"+ibox).val())
        let oldfpaid=parseFloat($("#fpaid").text())
        
        $("#fpaid").text(fpaid+oldfpaid)
        $("#fdues").text((parseFloat($("#totFees").text())-(fpaid+oldfpaid)))
       }
       else
      if(ibox=="inst4")
      { 
        let fpaid=parseFloat($("#"+ibox).val())
        let oldfpaid=parseFloat($("#fpaid").text())
        
        $("#fpaid").text(fpaid+oldfpaid)
        $("#fdues").text((parseFloat($("#totFees").text())-(fpaid+oldfpaid)))
       }


   }
   
   )



})    //End of On Ready

