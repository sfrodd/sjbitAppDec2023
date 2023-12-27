$(function(){

$("#semester").on("change",function(e){
    $("#acadyear1").val("AcadYear")
})


$("#acadyear1").on("change",function(e){
 e.preventDefault()   
    let branch=1;
    let sem=$("#semester :selected").val()
    let acadyear=$("#acadyear1 :selected").val()
    console.log(acadyear)
    $.ajax({
        url:"http://localhost:8000/api/getUSNs",
        type:"POST",
        dataType:"json",
        data:{sem:sem,acadYear:acadyear,branch:branch},
        success:function(result){
            $("#fromUSN").empty()
            $("#toUSN").empty();
            for(let i=0;i<result.length;i++){
              $("#fromUSN").append("<option id='usn"+i+"' >"+result[i].usn+"</option>")
              $("#toUSN").append("<option id='usn"+i+"' >"+result[i].usn+"</option>")           
             }

        }
    })

    })
    
   $("#assignDivision").on("click",function(e){
    e.preventDefault()

    let div=$("#division :selected").val()
    let fromUSN=$("#fromUSN :selected").val()
    let toUSN=$("#toUSN :selected").val()
    let acadyear=$("#acadyear1 :selected").val()
    let sem=$("#semester :selected").val()
    $.ajax({
       url:"http://localhost:8000/api/assigndivisions",
       type:"POST",
       dataType:"json",
       data:{sem:sem,acadyear:acadyear,fromUSN:fromUSN,toUSN:toUSN,div:div},
       success:function(result){
        //$("#divis").empty()
        $("#divis").append("<li style='color:blue' class='list-group-item m-2'><span style='margin-left:50px;display:inline-block;width:200px'>"+fromUSN+"</span><span style='display:inline-block;width:200px'>  "+
        toUSN+"</span><span style='display:inline-block;width:150px'> "+div+"</span><span style='display:inline-block;width:80px'> <div style='display:flex;width:40px;height:40px;border-radius:25px;background-color:red;"+
        "color:yellow;align-items:center;justify-content:center;font-weight:bold'>"+
        result.affectedRows+"</div></span>")
       // alert("Division "+$("#division :selected").val()+" assigned")
       }
    }) 
   
   })  
 
    $("#transfer").on("click",function(e){
     e.preventDefault()
     let acadYear=$("#acadyear :selected").val()
     $.ajax({
        url:"http://localhost:8000/api/transferFromMaster",
        type:"POST",
        dataType:"json",
        data:{acadYear:acadYear},
        success:function(result){
            if(result.affectedRows==0)
            alert("Already Transferred..")
        else
            alert("Transferred..."+result.affectedRows)
        }
     }) 
    })

     /* $("#assignDivision").on("click",function(e){
         e.preventDefault()

         let fromUSN=$("#fromusn :selected").val()
         let toUSN=$("#tousn :selected").val()
         let division=$("#division :selected").val()

         $.ajax({
            url:"http://localhost:8000/api/setDivision",
            type:"POST",
            dataType:"json",
            data:{fromUSN:fromUSN,toUSN:toUSN,division:division},
            success:function(result){
                
                alert(result.affectedRows+" students assigned "+division+" division")

            }
         })

      })
*/
})
