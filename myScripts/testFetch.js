function getInfo(){
    alert("I am here..")
    fetch("http://localhost:8000/api/getPendingLeaves",{
          method:"GET", }
     )
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error("Fetch error:", error);
    });

}

function sendInfo(){

    let fname= "Ajay"  //document.getElementById("fname").val
    let lname="Acharya" //document.getElementById("lname").val
    fetch("http://localhost:8000/api/sendData", {
        method: "POST", // Specify the HTTP method
        headers: {
            "Content-Type": "application/json", // Set the content type if sending JSON data
            // Other headers can be added here
        },
        body: JSON.stringify({
            fname: fname,
            lname: lname,
            // Add other data as needed
        }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error("Fetch error:", error);
        });

}