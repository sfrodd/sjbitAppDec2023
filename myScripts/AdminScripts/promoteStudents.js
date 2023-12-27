$(function(){

  (function(){
    var 
     content = $("#content"),
     cache_width = content.width(),
     a4  =[ 595.28,  841.89];  // for a4 size paper width and height
    
     $("#printDoc").on('click',function(){
     $('body').scrollTop(0);
     createPDF();
    });
    //create pdf
    function createPDF(){
     getCanvas().then(function(canvas){
      var 
      img = canvas.toDataURL("image/png"),
      doc = new jsPDF({
              unit:'px', 
              format:'a4'
            });     
            doc.addImage(img, 'JPEG', 20, 20);
            doc.save('techumber-html-to-pdf.pdf');
            content.width(cache_width);
     });
    }
    
    // create canvas object
    function getCanvas(){
     content.width((a4[0]*1.33333) -80).css('max-width','none');
     return html2canvas(content,{
         imageTimeout:2000,
         removeContainer:true
        }); 
    }
    
    }());

$("#tosem").on("change",function(e){
  e.preventDefault()

  let toSem=parseInt($("#tosem :selected").val())
  let fromSem=parseInt($("#fromsem").val())
  if(toSem<=fromSem){
  alert("ToSem can't be Lessthan Equal to fromSem")
  $("#tosem").val(fromSem+1)
  $("#tosem").trigger('focus')
  }


})

//View Already Promoted students
  $("#viewPromoStudents").on("click",function(e){
    e.preventDefault()

    let branch=$("#branch :selected").val()
    let fromSem=$("#fromsem :selected").val()
    let toSem=$("#tosem :selected").val()
    let fromYear=$("#fromacadyear :selected").val()
    let toYear=$("#toacadyear :selected").val()
//    alert(toSem+ "  "+fromSem+" branch "+toYear)

    //Before promoting we need to check if this is already done...
    $.ajax({
      url:"http://localhost:8000/api/getpromotedStudents",
      type:"POST",
      dataType:"json",
      data:{branch:branch,fromSem:fromSem,toSem:toSem,fromYear:fromYear,toYear:toYear},
      async:false,
      success:function(result){
         $("#counter1").text(result.length)
         $("#promotedList").empty();
         $("#promotedList").append("<li class='list-group-item m-2'>"+
            "<span style='display:inline-block;width:260px'>"+
            ("Sl.No.")+".  "+"First Name"+
            " </span><span style='margin-right:80px'> "+"USN"+"</span> <span style='margin-right:22px'>"+
            "Sem"+"</span><span style='margin-right:10px'>Promoted</span>"+
            "<!--input id='selAll' style='margin-right:20px' type='checkbox'-->"+
            "</li>")
  //      
         for(let i=0;i<result.length;i++)
           $("#promotedList").append("<li class='list-group-item m-2'>"+
           "<span style='display:inline-block;width:250px'>"+
           (i+1)+".  "+result[i].fname+"   "+result[i].lname+
           " </span><span style='margin-right:40px'> "+result[i].usn+"</span> <span style='margin-right:40px'>"+
           result[i].sem+"</span><input style='margin-left:20px' type='checkbox' checked>"+
           "</li>")
  //        alert("All Selected Students Promoted..")
         } //Inner Success
     }) //Inner Ajax
  })

//View Initial student List before promo
$("#studentsList").on("click","input",function(e){
  let id=$(this).attr("id")
  let counter=parseInt($("#counter").text())
  
  for(let i=0;i<counter;i++){
    if( !$("#chkbox"+i).is(':checked') )
    $("#chkbox"+i).prop('checked',true)
    else
    $("#chkbox"+i).prop('checked',false)
  }
  //alert("All Selected.."+id)
})

$("#viewStudents").on("click",function(e){
    e.preventDefault()
    let branch=$("#branch :selected").val()
    let fromSem=$("#fromsem :selected").val()
    let toSem=$("#tosem :selected").val()
    let fromYear=$("#fromacadyear :selected").val()
    let toYear=$("#toacadyear :selected").val()
    alert(toSem+ "  "+fromSem)

    $.ajax({
        url:"http://localhost:8000/api/getAllStudents",
        type:"POST",
        dataType:"json",
        data:{branch:branch,fromSem:fromSem,toSem:toSem,fromYear:fromYear,toYear:toYear},
        success:function(result){
            $("#counter").text(result.length)
            $("#studentsList").empty();
            $("#studentsList").append("<li class='list-group-item m-2'>"+
            "<span style='display:inline-block;width:220px'>"+
            ("Sl.No.")+".  "+"First Name"+
            " </span><span style='margin-right:80px'> "+"USN"+"</span> <span style='margin-right:20px'>"+
            "Sem"+"</span><span style='margin-right:10px'>Select-All</span>"+
            "<input id='selAll' style='margin-right:20px' type='checkbox'>"+
            "</li>")
  //      
            for(let i=0;i<result.length;i++)
              $("#studentsList").append("<li class='list-group-item m-2'>"+
              "<span style='display:inline-block;width:220px'>"+
              (i+1)+".  "+result[i].fname+"   "+result[i].lname+
              " </span><span id='usn"+i+"' style='margin-right:40px'> "+result[i].usn+"</span> <span style='margin-right:40px'>"+
              result[i].sem+"</span><input id='chkbox"+i+"' type='checkbox'>"+
              "</li>")
    //          alert("All Selected Students Promoted..")
        }
    })//End of Ajax
})//End of View Students

$("#promoteStudents").on("click",function(e){
    e.preventDefault()
    let uncheckedUsns=[]
    for(let i=0;i<136;i++)
    if($("chkbox"+i).is(":checked")==false)
              uncheckedUsns.push($("#usn"+i).text())

    console.log(uncheckedUsns)         
              


    let branch=$("#branch :selected").val()
    let fromSem=$("#fromsem :selected").val()
    let toSem=$("#tosem :selected").val()
    let fromYear=$("#fromacadyear :selected").val()
    let toYear=$("#toacadyear :selected").val()
    alert(toSem+ "  "+fromSem+" branch "+toYear)

    //Before promoting we need to check if this is already done...
  $.ajax({
    url:"http://localhost:8000/api/checkifAlreadyPromoted",
    type:"POST",
    dataType:"json",
    async:false,
    data:{branch:branch,fromSem:fromSem,toSem:toSem,fromYear:fromYear,toYear:toYear},
    success:function(result){
        
            if(result.length>=1)
                alert("Already Promoted...")
            else{
                  $.ajax({
                     url:"http://localhost:8000/api/promoteStudents",
                     type:"POST",
                     dataType:"json",
                     data:{branch:branch,fromSem:fromSem,toSem:toSem,fromYear:fromYear,toYear:toYear},
                     async:false,
                     success:function(result){
                        $("#counter1").text(result.length)
                        $("#promotedList").empty();
                        for(let i=0;i<result.length;i++)
                          $("#promotedList").append("<li class='list-group-item m-2'>"+
                          "<span style='display:inline-block;width:250px'>"+
                          (i+1)+".  "+result[i].fname+"   "+result[i].lname+
                          " </span><span style='margin-right:40px'> "+result[i].usn+"</span> <span style='margin-right:40px'>"+
                          result[i].sem+"</span><input type='checkbox' checked>"+
                          "</li>")
                         alert("All Selected Students Promoted..")
                        } //Inner Success
                    }) //Inner Ajax
                } //Else
        }//Outer Success
    })//Outer Ajax

  }) //Click Event

})//eND OF dOLLAR FUNCTION