$(function(){
let usn=$.session.get('usn')
let stname=$.session.get('stname')
//Need to be addressed Addresssed the issue on 18-02-2023
$("#welcome").text(usn+"  " +stname+"'s Mentoring details")
$("#mentoringDetailsX").append("<li style='font-weight:bold;color:yellow;background-color:black;width:1250px;margin-left:20px;height:40px;padding-top:5px'>"+
"<span style='display:inline-block;width:250px;margin-left:50px'>Discussion Details</span>"+
"<span style='display:inline-block;width:150px;margin-left:50px'>Discussion Date</span>"+
"<span style='display:block-inline;width:200px;margin-left:0px'>Action Taken By Faculty</span>"+
"<span style='display:block-inline;width:200px;margin-left:120px'>Action Taken By Hod</span>"+
"<span style='display:block-inline;width:200px;margin-left:80px'>Issue Status</span>"+
"</li>")
    $.ajax({
        url:"http://localhost:8000/api/getDiscDetails/"+usn,
        type:"GET",
        dataType:"json",
        async:false,
        success:function(result){
         console.log(result)
        // alert(result[0].discDetails)
         if(result.length>0)
         for(let i=0;i<result.length;i++)
         $("#mentoringDetailsX").append("<li style='border-radius:0.25rem;width:1250px;height:85px;background-color:brown;color:yellow' class='list-group-item mt-2 mx-4'>"+(i+1)+". <span style='display:inline-block;width:350px'>"+
         result[i].discDetails+"</span><span style='display:inline-block;width:100px'> "+
         formatDate1(result[i].discDate)+"</span> <span style='display:inline-block;width:300px'> "+
         result[i].actiontaken+"</span>"+
         "<span style='display:inline-block;width:250px'> "+
         result[i].hodRemark+"</span>"+
         "<span style='display:inline-block;width:80px'> "+
         result[i].status+"</span>"+
         "</li>")
         else
         $("#mentoringDetailsX").append("<li style='color:red;border-radius:0.25rem;width:1200px;height:45px' class='list-group-item mt-2 mx-4'>No mentoring details recorded..!!!</li>")
        }
      })

})

function formatDate1(myDate){
    var formattedDate = new Date(myDate);
    var d = formattedDate.getDate();
    var m =  formattedDate.getMonth();
    m += 1;  // JavaScript months are 0-11
    var y = formattedDate.getFullYear();
    return (d+ "/" + m + "/" + y);
    }