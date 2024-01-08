$(function(){

$("#fname").text($.session.get('uname'))

$("#vfiles").on("click","button",function(e){
e.preventDefault()


});
$('#form').submit(function (e) {
  e.preventDefault();
});

let i=0;
$("#upload").on("click",function(event){
    //event.preventDefault() 
    let fileType=$("#cfile :selected").val()
    var filename = $('#fileInput')[0].files[0].name;
    var fileInput = $('#fileInput')[0].files[0];
    let ayear=$("#ayear :selected").val()
    let ccode=$("#ccode :selected").val()
    var newFilename =fileType+"-"+ayear+"-"+ccode
  
   let pathName="uploads/CSE/Faculty/"+$.session.get('uid')  
  switch(fileType){
       case "IA QPaper - I" :pathName= pathName+"/IAPapers/";break;
       case "IA QPaper - II":pathName=pathName+"/IAPapers/";break;
       case "IA Scheme - I":pathName=pathName+"/IASchemes/";break;
       case "IA Scheme - II":pathName=pathName+"/IASchemes/";break;
       case "Assignment - I":pathName=pathName+"/Assignments/";break;
       case "Assignment - II":pathName=pathName+"/Assignments/";break;
       case "Faculty Feedback":pathName=pathName+"/FacultyFB/";break;
       case "Time Table":pathName=pathName+"/CalEventsAndTT/";break;
       case "Calender of Events":pathName=pathName+"/CalEventsAndTT/";break;
       case "CourseEnd Survey":pathName=pathName+"/CourseEndSurvey/";break;
       case "Lession Plan":pathName=pathName+"/LessonPlan/"
    
      }
   // alert(pathName) 
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
        console.log('File uploaded successfully:', response);
        $('#fileuploadStatus').html(response);
        //event.preventDefault()
      },
    //  error: function(error) {
       // console.error('Error uploading file:', error);
      //}
    });
    i++
    $("#vfiles").append("<li id='litem"+i+
    "' class='list-group-item m-2'>"+i+". <span style='margin-left:10px;display:inline-block;width:150px'>"+fileType+"</span><span style='display:inline-block;width:250px'>"+
    filename+
    "</span><button id='view"+i+"' class='btn btn-warning m-2'>View</button></li>")
    //alert("I am here "+fileType+ "  "+filename+" Appended..")
  event.preventDefault()
})

$("#vfiles").on("click","button",function(e){
  e.preventDefault()
  alert("hi..")
  "window.location.href='../backEnd/uploads/Faculty/1020dcert.jpg'"

})

$('#uploadForm').on('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    handleFileUpload();
  });
  
$('#upload').on('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
   // handleFileUpload();
  });


$("#back").on("click",function(e){
    e.preventDefault()

    window.location="./Faculty.html"
})


})