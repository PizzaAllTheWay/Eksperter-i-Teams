function update_sliders() {
    // Get the elements of the slider
    var sliderNecessaryEffect = document.getElementById("sliderNecessaryEffect");
    var sliderDailyEnergyRequirement = document.getElementById("sliderDailyEnergyRequirement");
    var sliderDesiredBatteryCapacity = document.getElementById("sliderDesiredBatteryCapacity");
    var sliderSunCondition = document.getElementById("sliderSunCondition");
    var sliderAverageWaveHeight = document.getElementById("sliderAverageWaveHeight");
    var sliderAverageWindSpeed = document.getElementById("sliderAverageWindSpeed");

    // Get the value text that supposed to change dynamically
    var outputTextNecessaryEffect = document.getElementById("outputTextNecessaryEffect");
    var outputTextDailyEnergyRequirement = document.getElementById("outputTextDailyEnergyRequirement");
    var outputTextDesiredBatteryCapacity = document.getElementById("outputTextDesiredBatteryCapacity");
    var outputTextSunCondition = document.getElementById("outputTextSunCondition");
    var outputTextAverageWaveHeight = document.getElementById("outputTextAverageWaveHeight");
    var outputTextAverageWindSpeed = document.getElementById("outputTextAverageWindSpeed");

    // Display the default slider value
    outputTextNecessaryEffect.innerHTML = sliderNecessaryEffect.value;
    outputTextDailyEnergyRequirement.innerHTML = sliderDailyEnergyRequirement.value;
    outputTextDesiredBatteryCapacity.innerHTML = sliderDesiredBatteryCapacity.value;
    outputTextSunCondition.innerHTML = sliderSunCondition.value;
    outputTextAverageWaveHeight.innerHTML = sliderAverageWaveHeight.value;
    outputTextAverageWindSpeed.innerHTML = sliderAverageWindSpeed.value;

    // Update the current slider value (each time you drag the slider handle)
    sliderNecessaryEffect.oninput = function() {
        outputTextNecessaryEffect.innerHTML = this.value;
    };
    sliderDailyEnergyRequirement.oninput = function() {
        outputTextDailyEnergyRequirement.innerHTML = this.value;
    };
    sliderDesiredBatteryCapacity.oninput = function() {
        outputTextDesiredBatteryCapacity.innerHTML = this.value;
    };
    sliderSunCondition.oninput = function() {
        outputTextSunCondition.innerHTML = this.value;
    };
    sliderAverageWaveHeight.oninput = function() {
        outputTextAverageWaveHeight.innerHTML = this.value;
    };
    sliderAverageWindSpeed.oninput = function() {
        outputTextAverageWindSpeed.innerHTML = this.value;
    };
}

// Every time user goes back to the home page, we load the previously configured slider parameters, this way user doesn't have to do a lot to reconfigure stuff
window.addEventListener("load", function() {
    // Retrieve values from local storage and update sliders
    document.getElementById("sliderNecessaryEffect").value = localStorage.getItem("sliderValueNecessaryEffect") || 150;
    document.getElementById("sliderDailyEnergyRequirement").value = localStorage.getItem("sliderValueDailyEnergyRequirement") || 1500;
    document.getElementById("sliderDesiredBatteryCapacity").value = localStorage.getItem("sliderValueDesiredBatteryCapacity") || 5000;
    document.getElementById("sliderSunCondition").value = localStorage.getItem("sliderValueSunCondition") || 0;
    document.getElementById("sliderAverageWaveHeight").value = localStorage.getItem("sliderValueAverageWaveHeight") || 5;
    document.getElementById("sliderAverageWindSpeed").value = localStorage.getItem("sliderValueAverageWindSpeed") || 10;

    // update position and text associated with these sliders
    update_sliders();
});

// Every time we move the slider around, the slider context like text for slider value right now gets updated
document.addEventListener("DOMContentLoaded", update_sliders());


