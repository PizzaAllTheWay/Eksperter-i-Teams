// Retrieve the data from the URL parameters ----------
var urlParams = new URLSearchParams(window.location.search);

var sliderValueNecessaryEffect = parseInt(urlParams.get('sliderValueNecessaryEffect'));
var sliderValueDailyEnergyRequirement = parseInt(urlParams.get('sliderValueDailyEnergyRequirement'));
var sliderValueDesiredBatteryCapacity = parseInt(urlParams.get('sliderValueDesiredBatteryCapacity'));
var sliderValueSunCondition = parseInt(urlParams.get('sliderValueSunCondition'));
var sliderValueAverageWaveHeight = parseInt(urlParams.get('sliderValueAverageWaveHeight'));
var sliderValueAverageWindSpeed = parseInt(urlParams.get('sliderValueAverageWindSpeed'));



// Calculate the results ----------
// We calculate the results on the backend server
// So we first send data to the backend server using Flask
// The backend server runs a python code that then sends a response back
// This response is saved in our variables

// Create an object with all the slider values
var data = {
    sliderValueNecessaryEffect: sliderValueNecessaryEffect,
    sliderValueDailyEnergyRequirement: sliderValueDailyEnergyRequirement,
    sliderValueDesiredBatteryCapacity: sliderValueDesiredBatteryCapacity,
    sliderValueSunCondition: sliderValueSunCondition,
    sliderValueAverageWaveHeight: sliderValueAverageWaveHeight,
    sliderValueAverageWindSpeed: sliderValueAverageWindSpeed
};

// Send the data to the Flask route
// We get a picture of a plot with the calculated results back here that we can display
// Fetch the calculation results and then fetch the recommended solution

console.log(data);

fetch('/calculate', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
})
.then(response => response.blob())
.then(blob => {
    var imgURL = URL.createObjectURL(blob);
    document.querySelector('#imageEnergySupplySolution').src = imgURL;

    // Data again
    var data = {
        sliderValueNecessaryEffect: sliderValueNecessaryEffect,
        sliderValueDailyEnergyRequirement: sliderValueDailyEnergyRequirement,
        sliderValueDesiredBatteryCapacity: sliderValueDesiredBatteryCapacity,
        sliderValueSunCondition: sliderValueSunCondition,
        sliderValueAverageWaveHeight: sliderValueAverageWaveHeight,
        sliderValueAverageWindSpeed: sliderValueAverageWindSpeed
    };

    // Only after the first fetch is complete, start the second fetch
    return fetch('/api/energySolution', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
})
.then(response => response.text())  // Process the second fetch's response as text
.then(text => {
    // Logic for recommended solution of technology
    // We get a string of a proposed best solution and print it on the screen for the user
    document.getElementById("recommendedSolution").textContent = text;  // Update the text content of the element
})
.catch(error => {
    console.error('Error:', error);
});



// Display the results ----------
// Display text
document.getElementById("sliderResultNecessaryEffect").textContent = sliderValueNecessaryEffect + " kW";
document.getElementById("sliderResultDailyEnergyRequirement").textContent = sliderValueDailyEnergyRequirement + " kWh";
document.getElementById("sliderResultDesiredBatteryCapacity").textContent = sliderValueDesiredBatteryCapacity + " kWh";
document.getElementById("sliderResultSunCondition").textContent = sliderValueSunCondition + " ";
document.getElementById("sliderResultAverageWaveHeight").textContent = sliderValueAverageWaveHeight + " m";
document.getElementById("sliderResultAverageWindSpeed").textContent = sliderValueAverageWindSpeed + " m/s";

// Prepare data for the pie chart
var data = {
    labels: ["Nødvendig Effekt",
             "Daglig Energi Behov",
             "Batteri Kapasitet"],
    datasets: [{
        data: [
            sliderValueNecessaryEffect,
            sliderValueDailyEnergyRequirement,
            sliderValueDesiredBatteryCapacity
        ],
        backgroundColor: [
            "rgba(255, 99, 132, 0.6)",  // Soft red
            "rgba(90, 180, 50, 0.6)",   // Soft green
            "rgba(54, 162, 235, 0.6)"    // Soft blue
        ]
    }]
};

// Get the canvas element
var ctx = document.getElementById("pieChart").getContext("2d");

// Create the pie chart
var myPieChart = new Chart(ctx, {
    type: 'pie',
    data: data,
    options: {
        responsive: true,
        legend: {
            display: true,
            position: 'top'
        },
        title: {
            display: true,
            text: 'Energi Forhold'
        },
        animation: {
            animateRotate: true,
            duration: 1000
        }
    }
});
