function redirect_to_results_page() {
    // Retrieve the values from the sliders
    var sliderValueNecessaryEffect = document.getElementById("sliderNecessaryEffect").value;
    var sliderValueDailyEnergyRequirement = document.getElementById("sliderDailyEnergyRequirement").value;
    var sliderValueDesiredBatteryCapacity = document.getElementById("sliderDesiredBatteryCapacity").value;
    var sliderValueSunCondition = document.getElementById("sliderSunCondition").value;
    var sliderValueAverageWaveHeight = document.getElementById("sliderAverageWaveHeight").value;
    var sliderValueAverageWindSpeed = document.getElementById("sliderAverageWindSpeed").value;

    // Redirect to the new page with the slider data as a URL parameter
    window.location.href = "/results" + 
    "?sliderValueNecessaryEffect=" + sliderValueNecessaryEffect +
    "&sliderValueDailyEnergyRequirement=" + sliderValueDailyEnergyRequirement +
    "&sliderValueDesiredBatteryCapacity=" + sliderValueDesiredBatteryCapacity +
    "&sliderValueSunCondition=" + sliderValueSunCondition +
    "&sliderValueAverageWaveHeight=" + sliderValueAverageWaveHeight +
    "&sliderValueAverageWindSpeed=" + sliderValueAverageWindSpeed;
}

function redirect_to_home_page() {
    window.location.href = "/";
}