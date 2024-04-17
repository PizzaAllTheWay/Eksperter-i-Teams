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
  


// Asynchronously fetch the list of memes
let memesArray = [];

async function get_all_memes() {
    try {
        // Fetch the list from the server
        let response = await fetch('/api/getMemesList');
        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the JSON response
        let memesArray = await response.json();
        return memesArray; // This is an array
    } 
    catch (error) {
        console.error('Failed to fetch memes list:', error);
    }
}

window.addEventListener('load', async () => {
    try {
        memesArray = await get_all_memes();
        console.log('Memes loaded:', memesArray);
    } 
    catch (error) {
        console.error('Failed to load memes:', error);
    }
});
  
// Function to handle the meme change
async function give_new_meme() {
    try {
        if (memesArray && memesArray.length > 0) {
            // Get the image element
            var image = document.getElementById('memePicture');

            // Generate a random index based on the length of the memesArray
            var randomIndex = Math.floor(Math.random() * memesArray.length);

            // Construct the new path for a random meme
            var newMemePath = '/static/images/memes/' + memesArray[randomIndex];

            // Set the new src for the image
            image.src = newMemePath;
        }
        else {
            console.error('No memes found in the memes array', memesArray);
        }
    } catch (error) {
        console.error('Error in give_new_meme:', error);
    }
}
  