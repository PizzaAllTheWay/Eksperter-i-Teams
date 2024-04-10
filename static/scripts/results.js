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

document.getElementById("sumResult").textContent = "Testing";

// Prepare data for the pie chart
var data = {
    labels: ["Slider 1",
             "Slider 2",
             "Slider 3",
             "sum"],
    datasets: [{
        data: [sliderValueNecessaryEffect,
               sliderValueDailyEnergyRequirement,
               sliderValueDesiredBatteryCapacity,
               sumResult],
        backgroundColor: ["#FF6384",
                          "#36A2EB",
                          "#FFCE56",
                          "#c3f1ab"]
    }]
};

// Get the canvas element
var ctx = document.getElementById("pieChart").getContext("2d");

// Create the pie chart
var myPieChart = new Chart(ctx, {
    type: 'pie',
    data: data,
    options: {
        // Add any additional options here
    }
});
