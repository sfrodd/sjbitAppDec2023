$(function(){


    $("#checkResult").on("click",function() {
        // Make an AJAX request to the server
        let sslcScore=$("#sslcScore").val()
        let pucScore=$("#pucScore").val()
        let firstYScore=$("#firstYScore").val()
        let secondYScore=$("#secondYScore").val()
        let thirdYScore=$("#thirdYScore").val()
        let codingScore=$("#codingScore").val()
        let dsaScore=$("#dsaScore").val()
        let dbScore=$("#dbScore").val()
        let osScore=$("#osScore").val()
        let cnScore=$("#cnScore").val()
        let seScore=$("#seScore").val()
        let oopScore=$("#oopScore").val()
        let aptiScore=$("#aptiScore").val()
        let hackathonStatus=0
        let codathonStatus=0 
        let startupStatus=0
        let oratorStatus=0 
        let projectStatus=0
        if ($("#hackathon").is(":checked")) {
           hackathonStatus=1
        }
        if ($("#codathon").is(":checked")) {
            codathonStatus=1
         }
         if ($("#startup").is(":checked")) {
            startupStatus=1
         }
         if ($("#orator").is(":checked")) {
            oratorStatus=1
         }
         if ($("#projects").is(":checked")) {
            projectStatus=1
         }
        // alert(thirdYScore)
        let mLearningMethod="svm" 
        $.ajax({
            url: "http://localhost:8000/api/checkResult",
            type: "POST",
            data:{mLearningMethod:mLearningMethod,firstYScore:firstYScore, secondYScore:secondYScore,thirdYScore:thirdYScore,
            codingScore:codingScore,aptiScore:aptiScore, sslcScore:sslcScore,pucScore:pucScore,dsaScore:dsaScore,dbScore:dbScore,osScore:osScore,
            oopScore:oopScore,seScore:seScore,cnScore:cnScore,
            hackathonStatus:hackathonStatus,codathonStatus:codathonStatus,
            oratorStatus:oratorStatus,startupStatus:startupStatus,projectStatus:projectStatus},
            success: function(response) {
                //console.log("Python script executed successfully. "+
                let res=JSON.stringify(response.result)
                let outcome=parseInt(res.substring(res.length-6,res.length-5))
                console.log(outcome)
                if(outcome==0)
                {   $("#predictionResult").text("You may not be placed..")
                    var options = {
                        strings: ["You may not to be placed.", "You need to prepare really well on your coding skills", "Further, do participate in Codathon, Hackathon or Do some mini-projects."],
                        typeSpeed: 150, // typing speed in milliseconds
                        backSpeed: 150, // backspacing speed in milliseconds
                        backDelay: 2000, // delay before starting to backspace
                        loop: true, // loop the animation
                    };
                
                    // Initialize Typed.js on the #typed-output element
                    var typed = new Typed("#predictionResult", options);
                }
               // $("#predictionResult").text("You may not be placed..")
                else
                //$("#predictionResult").text("You may likely to be placed..")
                {
                $("#predictionResult").text("You may likely to be placed..")    
                var options = {
                    strings: ["You may likely to be placed", "Keep it up, Hearty Congratulations.", "However, further better your chances improve on your coding skills and fundamentals."],
                    typeSpeed: 50, // typing speed in milliseconds
                    backSpeed: 25, // backspacing speed in milliseconds
                    backDelay: 1000, // delay before starting to backspace
                    loop: true, // loop the animation
                };
            
                // Initialize Typed.js on the #typed-output element
                var typed = new Typed("#predictionResult", options);
            }

            },
            error: function(error) {
                console.error("Error executing Python script: " + error.responseJSON.error);
            }
        });
    });

})