$(function(){
  let fid=$.session.get('uid');
  var fname=$.session.get('uname');
  fname=fname.toUpperCase();
  $("#uname").text(fid+" : "+fname+"  Upload your documents here")

//$("#degree").attr("href")="http://localhost:8000/api/download/"+filename  


$("#addpapers").on("click", function(e){
  e.preventDefault()
  window.location="../components/addJournal.html"
})


$("#addworc").on("click",function(e){
 e.preventDefault();
 window.location="../components/addConference.html"

})

$("#addpapers2021").on("click", function(e){
  e.preventDefault()
  window.location="../components/addJournal.html"
})


$("#addworc2021").on("click",function(e){
  e.preventDefault();
  window.location="../components/addConference.html"
 
 })

 
$("#addpapers2020").on("click", function(e){
  e.preventDefault()
  window.location="../components/addJournal.html"
})


$("#addworc2020").on("click",function(e){
  e.preventDefault();
  window.location="../components/addConference.html"
 
 })

//BackButton
 $("#backToFacUpload").on("click",function(e){
  e.preventDefault()
  window.location="../Components/Faculty.html"
  })
let dept=$.session.get('branch')
let uid=$.session.get('uid')
//alert(dept+"  "+uid)
$("#ugdc").attr("onclick","window.location.href='../backEnd/Uploads/"+dept+"/Faculty/"+uid+"/Certificates/UG_DC.jpg'")
$("#pgdc").attr("onclick","window.location.href='../backEnd/Uploads/"+dept+"/Faculty/"+uid+"/Certificates/PG_DC.jpg'")
$("#phdc").attr("onclick","window.location.href='../backEnd/Uploads/"+dept+"/Faculty/"+uid+"/Certificates/PHD_DC.jpg'")
$("#aptmt").attr("onclick","window.location.href='../backEnd/Uploads/"+dept+"/Faculty/"+uid+"/OfficeDocs/APTMT_LTR.pdf'")
$("#jngltr").attr("onclick","window.location.href='../backEnd/Uploads/"+dept+"/Faculty/"+uid+"/OfficeDocs/JNG_LTR.pdf'")
$("#promo").attr("onclick","window.location.href='../backEnd/Uploads/"+dept+"/Faculty/"+uid+"/OfficeDocs/PROMO_LTR.pdf'")
$("#saslp").attr("onclick","window.location.href='../backEnd/Uploads/"+dept+"/Faculty/"+uid+"/OfficeDocs/SAL_SLP.pdf'")

$("#aadhar").attr("onclick","window.location.href='../backEnd/Uploads/"+dept+"/Faculty/"+uid+"/Certificates/ADH_CD.jpg'")
$("#pan").attr("onclick","window.location.href='../backEnd/Uploads/"+dept+"/Faculty/"+uid+"/Certificates/PN_CD.jpg'")
$("#award").attr("onclick","window.location.href='../backEnd/Uploads/"+dept+"/Faculty/"+uid+"/Certificates/award.jpg'")
//Add an Entry into journals table



$("#addj").on("click",function(e){
  e.preventDefault();

  let fid=$.session.get('uid')
  let title=$("#ptitle").val();
  let authors=$("#authors").val()
  let journconf=$("#journame").val()
  let publisher=$("#publisher").val()
  let monthyear=$("#monthyear").val();
  let acadyear=$("#acadyear :selected").text();
 // alert(title+"  "+authors)  
  $.ajax({
    url:"http://localhost:8000/api/addJournal",
    type:"POST",
    dataType:"json",
    data:{"fid":fid,"ptitle":title,"authors":authors,"journalconf":journconf,
           "publisher":publisher,"monthyear":monthyear,"acadyear":acadyear},
    success:function(result){

         console.log(result)
         alert("Inserted Journal Info")
    }
  })

})

$("#upload1").on("click",function(e){
  e.preventDefault()
  let docType=$("#doctype :selected").val()
    var filename = $('#fileInput')[0].files[0].name;
    var fileInput = $('#fileInput')[0].files[0];
//    let ayear=$("#ayear :selected").val()
  //  let ccode=$("#ccode :selected").val()

  let pathName="uploads/CSE/Faculty/"+$.session.get('uid')  
  switch(docType){
       case "UG-Degree Certificate" :filename="UG_DC";pathName= pathName+"/Certificates/";break;
       case "PG-Degree Certificate":filename="PG_DC"; pathName=pathName+"/Certificates/";break;
       case "PhD-Degree Certificate":filename="PHD_DC"; pathName=pathName+"/Certificates/";break;
       case "Adhaar-Card":filename="ADH_CD";pathName= pathName+"/Certificates/";break;
       case "PAN-Card":filename="PN_CD";pathName= pathName+"/Certificates/";break;
       case "Award-Certificate":filename="award";pathName= pathName+"/Certificates/";break;
       case "Salary-Slip":filename="SAL_SLP"; pathName=pathName+"/OfficeDocs/";break;
       case "Appointment-Letters":filename="APTMT_LTR"; pathName=pathName+"/OfficeDocs/";break;
       case "Promotion-Letters":filename="PROMO_LTR"; pathName=pathName+"/OfficeDocs/";break;
       case "Joining-Letter":filename="JNG_LTR"; pathName=pathName+"/OfficeDocs/";break;
       case "Research-Publications":filename="RSRCH_PUB"; pathName=pathName+"/Publications/";break;
       case "Workshop-Certificates":filename="WRKSHP_CRT"; pathName=pathName+"/ParticipationCertificates/"
       case "Conference-Certificates":filename="CONF_CRT"; pathName=pathName+"/ParticiapationCertificates/"
      }
   alert(pathName) 
   var newFilename =filename
   var formData = new FormData();
    formData.append('newFilename',newFilename)
    formData.append('pathName',pathName)
    formData.append('file', fileInput);
    $.ajax({
      type: 'POST',
      url: 'http://localhost:8000/api/FileUpload', // Replace with your server endpoint
      data: formData,
      processData: false,
      contentType: false,
      success: function(response) {
        console.log('File uploaded successfully:'+response);
       // $('#fileuploadStatus').html(response);
        //event.preventDefault()
      },
    //  error: function(error) {
       // console.error('Error uploading file:', error);
      //}
    });
   // i++
   /* $("#vfiles").append("<li id='litem"+i+
    "' class='list-group-item m-2'>"+i+". <span style='margin-left:10px;display:inline-block;width:150px'>"+fileType+"</span><span style='display:inline-block;width:250px'>"+
    filename+
    "</span><button id='view"+i+"' class='btn btn-warning m-2'>View</button></li>")
    //alert("I am here "+fileType+ "  "+filename+" Appended..")
*/
})

/*$("#vfiles").on("click","button",function(e){
  e.preventDefault()
  alert("hi..")
  "window.location.href='../backEnd/uploads/Faculty/1020dcert.jpg'"

})*/

  

/*
$("#addj2021").on("click",function(e){
  e.preventDefault();
  alert("I am herein 2020-21")
  let fid=$.session.get('uid')
  let title=$("#ptitle").val();
  let authors=$("#authors").val()
  let journconf=$("#journame").val()
  let publisher=$("#publisher").val()
  let monthyear=$("#monthyear").val();
  let acadyear=$("#acadyear :selected").text();
 // alert(title+"  "+authors)  
  $.ajax({
    url:"http://localhost:8000/api/addJournal",
    type:"POST",
    dataType:"json",
    data:{"fid":fid,"ptitle":title,"authors":authors,"journalconf":journconf,
           "publisher":publisher,"monthyear":monthyear},
    success:function(result){

         console.log(result)
         alert("Inserted Journal Info")
    }
  })

})

*/

$("#backx").on("click",function(e){
  e.preventDefault();
 //alert("I am here")
 window.location="./FacultyDocUpload.html";

})



//Add an entry to appropriate year
$("#addcorw").on("click",function(e){
  e.preventDefault();
 // alert("I am here..")
  let fid=$.session.get('uid')
  let title=$("#ptitle").val();
  let hostorg=$("#orginst").val()
  let city=$("#city").val()
  let wcdate=$("#wcdate").val()
  let days=$("#days").val();
  let acadyear=$("#acadyear :selected").text();
  alert(title+"  "+hostorg+" "+acadyear)  
  $.ajax({
    url:"http://localhost:8000/api/addworkshopconf",
    type:"POST",
    dataType:"json",
    data:{"fid":fid,"ptitle":title,"hostorg":hostorg,"city":city,
           "wcdate":wcdate,"days":days,"acadyear":acadyear},
    success:function(result){

         console.log(result)
         alert("Conf/Workshop Added..")
    }
  })
    

/*
$("#dcertandappoint").append("<li style='width:610px;background-color:white;padding-left:15px;margin-top:4px;border-radius:0.5rem;'>"+
"<span style='display:inline-block;width:220px'>"+
"<!--a id='degree' href='../backEnd/uploads/Faculty/"+fid+"dcert.jpg' download='UGCertificate' target='_blank'>"+
"B.E. Degree Certificate</a></span><button  "+
 "id='ugdc' class='btn btn-success mx-8 my-2'>View</button--></li>") */

//Get all publications of a given faculty
$.ajax({
  url:"http://localhost:8000/api/getAllPublications/"+fid,
  type:"GET",
  dataType:"json",
  success:function(result){
    //alert(result.length)
  if(result.length==0){
      $("#pubListandworkconf").append("<li>No Publications found</li>")
      $("#pubListandworkconf1").append("<li>No Publications found</li>")
      $("#pubListandworkconf2").append("<li>No Publications found</li>")
      }
      else{
         let p2022=0; let p2021=0; let p2020=0
         for(let i=0;i<result.length;i++){
         switch(result[i].acadyear){
         case "2022-23": 
         p2022++;
         $("#pubListandworkconf").append("<li id="+i+" style='font-size:10px;width:610px;height:40px;background-color:white;padding-left:15px;margin-top:4px;border-radius:0.5rem;'>"+
         "<span style='display:inline-block;width:25px'>["+(p2022)+"].</span>"+
         "<span style='display:inline-block;width:180px'>"+result[i].journalorconf_title+"</span>"+
         "<span style='display:inline-block;width:150px'>"+result[i].authors+"</span>"+
         "<span style='display:inline-block;width:80px'>"+result[i].Publisher+"</span>"+
         "<span style='display:inline-block;width:80px'>"+result[i].monthYear+"</span>"+
         "<button id='minus0viewjp-"+i+"' class='btn btn-warning m-2 btn-sm'>View</button>"+
         "</li>"); break;
         case "2021-22":
          p2021++; 
         $("#pubListandworkconf1").append("<li id="+i+" style='font-size:10px;width:610px;height:40px;background-color:white;padding-left:15px;margin-top:4px;border-radius:0.5rem;'>"+
         "<span style='display:inline-block;width:25px'>["+(p2021)+"].</span>"+
         "<span style='display:inline-block;width:180px'>"+result[i].journalorconf_title+"</span>"+
         "<span style='display:inline-block;width:150px'>"+result[i].authors+"</span>"+
         "<span style='display:inline-block;width:80px'>"+result[i].Publisher+"</span>"+
         "<span style='display:inline-block;width:80px'>"+result[i].monthYear+"</span>"+
         "<button id='minus1viewjp-"+i+"' class='btn btn-warning m-2 btn-sm'>View</button>"+
         "</li>"); break;
         case "2020-21": 
         p2020++;
         $("#pubListandworkconf2").append("<li id="+i+" style='font-size:10px;width:610px;height:40px;background-color:white;padding-left:15px;margin-top:4px;border-radius:0.5rem;'>"+
         "<span style='display:inline-block;width:25px'>["+(p2020)+"].</span>"+
         "<span style='display:inline-block;width:180px'>"+result[i].journalorconf_title+"</span>"+
         "<span style='display:inline-block;width:150px'>"+result[i].authors+"</span>"+
         "<span style='display:inline-block;width:80px'>"+result[i].Publisher+"</span>"+
         "<span style='display:inline-block;width:80px'>"+result[i].monthYear+"</span>"+
         "<button id='minus2viewjp-"+i+"' class='btn btn-warning m-2 btn-sm'>View</button>"+
         "</li>"); break;
         }
         }
      }
  }
})

//Get all workshop confs of a give faculty
$.ajax({
  url:"http://localhost:8000/api/getAllWConfs/"+fid,
  type:"GET",
  dataType:"json",
  success:function(result){
    //alert(result.length)
  if(result.length==0)
      $("#facultyworkshopconf").append("<li>No Workshop/Conf found</li>")
      else{
         let wc2022=0;let wc2021=0; let wc2020=0;
         for(let i=0;i<result.length;i++)
         switch(result[i].acadyear){
         case "2022-23" :
          wc2022++;
         $("#facultyworkshopconf").append("<li id="+i+" style='font-size:10px;width:610px;height:40px;background-color:white;padding-left:15px;margin-top:4px;border-radius:0.5rem;'>"+
         "<span style='display:inline-block;width:25px'>["+(wc2022)+"].</span>"+
         "<span style='display:inline-block;width:220px'>"+result[i].workshopconftitle+"</span>"+
         "<span style='display:inline-block;width:160px'>"+result[i].hostorg+"</span>"+
         "<span style='display:inline-block;width:70px'>"+result[i].city+"</span>"+
         "<span style='display:inline-block;width:80px'>"+formatDate1(result[i].wcdate)+"</span>"+
         "<span style='display:inline-block;width:40px'>"+result[i].days+"</span>"+
         "</li>"); break;
         case "2021-22": 
         wc2021++;
         $("#facultyworkshopconf1").append("<li id="+i+" style='font-size:10px;width:610px;height:40px;background-color:white;padding-left:15px;margin-top:4px;border-radius:0.5rem;'>"+
         "<span style='display:inline-block;width:25px'>["+(wc2021)+"].</span>"+
         "<span style='display:inline-block;width:220px'>"+result[i].workshopconftitle+"</span>"+
         "<span style='display:inline-block;width:160px'>"+result[i].hostorg+"</span>"+
         "<span style='display:inline-block;width:70px'>"+result[i].city+"</span>"+
         "<span style='display:inline-block;width:80px'>"+formatDate1(result[i].wcdate)+"</span>"+
         "<span style='display:inline-block;width:40px'>"+result[i].days+"</span>"+
         "</li>"); break;
         case "2020-21": 
         wc2020++;
         $("#facultyworkshopconf2").append("<li id="+i+" style='font-size:10px;width:610px;height:40px;background-color:white;padding-left:15px;margin-top:4px;border-radius:0.5rem;'>"+
         "<span style='display:inline-block;width:25px'>["+(wc2020)+"].</span>"+
         "<span style='display:inline-block;width:220px'>"+result[i].workshopconftitle+"</span>"+
         "<span style='display:inline-block;width:160px'>"+result[i].hostorg+"</span>"+
         "<span style='display:inline-block;width:70px'>"+result[i].city+"</span>"+
         "<span style='display:inline-block;width:80px'>"+formatDate1(result[i].wcdate)+"</span>"+
         "<span style='display:inline-block;width:40px'>"+result[i].days+"</span>"+
         "</li>"); break;
         
         }
      }
  }

})


$("#dcertandappoint").on("click", "button", function(e){
      e.preventDefault();
      //let fid=$.session('uid')
      //alert(e.target.id)
      if(e.target.id=='ugdc')
      window.location.href="../backEnd/uploads/Faculty/"+fid+"dcert.jpg"; 
      else if(e.target.id=='pgdc')
      window.location.href="../backEnd/uploads/Faculty/"+fid+"pgdcert.jpg";
      else if(e.target.id=='phdc')
      window.location.href="../backEnd/uploads/Faculty/"+fid+"phdcert.jpg"; 
});

      //alert("I am here")
      let filename="FacSub3Sem.csv";
     // window.location="localhost:8000/api/download/"+filename
      // alert("Download starting:")
      /*    $.ajax({
          url:"http://localhost:8000/api/download/"+filename,
          type:"GET",
          dataType:"text",
          async:false,
          success:function(result){
               console.log("Download Success.."+result)
          }

       })*/
    

 }) //End of Ready function

    

/*$('#file').on('change', function () {
        var file = this.files[0];
        alert(file.name)
        if (file.size > 1024*1000) {
          alert('max upload size is 100k');
        }
        // Also see .name, .type
      });
*/
//      $("#facId").val("1020")
   /*   $('#upload').on('click', function () {
        $.ajax({
          // Your server script to process the upload
          url: "http://localhost:8000/api/uploadFile",
          type: 'POST',
          // Form data
          data: new FormData($('form')[0]),
          // Tell jQuery not to process data or worry about content-type
          // You *must* include these options!
          cache: false,
          contentType: false,
          processData: false,
    
          // Custom XMLHttpRequest
          xhr: function () {
            var myXhr = $.ajaxSettings.xhr();
            if (myXhr.upload) {
              // For handling the progress of the upload
              myXhr.upload.addEventListener('progress', function (e) {
                if (e.lengthComputable) {
                  $('progress').attr({
                    value: e.loaded,
                    max: e.total,
                  });
                }
              }, false);
            }
            return myXhr;
          }
        });
      }); 
*/
})

function formatDate1(myDate){
  var formattedDate = new Date(myDate);
  var d = formattedDate.getDate();
  var m =  formattedDate.getMonth();
  m += 1;  // JavaScript months are 0-11
  var y = formattedDate.getFullYear();
  return (d+ "/" + m + "/" + y);
  }