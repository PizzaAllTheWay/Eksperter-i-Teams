# Libraries
import os
import socket
import backend.energyAlgorithm as energyAlgorithm
from flask import Flask, render_template, request, jsonify, send_file, Response



# Start Flask
server = Flask(__name__)



# Setup webpages and bind backend server with the user
# If they request one of these websites you will be able to get to them
@server.route('/')
def index():
    return render_template('index.html')

@server.route('/results')
def results():
    return render_template('results.html')

@server.route('/memes')
def memes():
    return render_template('memes.html')



# Bind backend Functions from server with the user
# This allows us to use python files
@server.route('/calculate', methods=['POST'])
def calculate():
    # Save data from JSON user POST to good variables
    data = request.json
    sliderValueNecessaryEffect = float(data['sliderValueNecessaryEffect'])
    sliderValueDailyEnergyRequirement = float(data['sliderValueDailyEnergyRequirement'])
    sliderValueDesiredBatteryCapacity = float(data['sliderValueDesiredBatteryCapacity'])
    sliderValueSunCondition = int(data['sliderValueSunCondition'])
    sliderValueAverageWaveHeight = float(data['sliderValueAverageWaveHeight'])
    sliderValueAverageWindSpeed = float(data['sliderValueAverageWindSpeed'])

    # Convert 0 and 1 to the correct format for the calculation
    sunEnergy = "nei"
    if (sliderValueSunCondition == 1):
        sunEnergy = "ja"

    # Run the calculation
    energyAlgorithmSolutionDataFrame = energyAlgorithm.run_calculation(sliderValueNecessaryEffect,
                                                                       sliderValueDailyEnergyRequirement,
                                                                       sliderValueDesiredBatteryCapacity,
                                                                       sunEnergy,
                                                                       sliderValueAverageWaveHeight,
                                                                       sliderValueAverageWindSpeed)

    # Debugging to see values calculated
    print(energyAlgorithmSolutionDataFrame)

    # Send the calculated data that has been saved as a plot in an image
    # Send this image back to the client
    return send_file('backend/energySupplySolutions.png', mimetype='image/png')

# Get best solution
@server.route('/api/energySolution', methods=['POST'])
def solution():
    # Make sure you are actually receiving JSON
    if not request.is_json:
        print("Missing JSON in request")
        return jsonify({"error": "Missing JSON in request"}), 400

    data = request.get_json()

    # Check if all keys exist
    keys = ['sliderValueNecessaryEffect', 'sliderValueDailyEnergyRequirement', 'sliderValueDesiredBatteryCapacity',
            'sliderValueSunCondition', 'sliderValueAverageWaveHeight', 'sliderValueAverageWindSpeed']
    if not all(key in data for key in keys):
        print("Missing one or more required data parameters.")
        return jsonify({"error": "Missing one or more required data parameters."}), 400


    # Save data from JSON user POST to good variables
    data = request.json
    sliderValueNecessaryEffect = float(data['sliderValueNecessaryEffect'])
    sliderValueDailyEnergyRequirement = float(data['sliderValueDailyEnergyRequirement'])
    sliderValueDesiredBatteryCapacity = float(data['sliderValueDesiredBatteryCapacity'])
    sliderValueSunCondition = int(data['sliderValueSunCondition'])
    sliderValueAverageWaveHeight = float(data['sliderValueAverageWaveHeight'])
    sliderValueAverageWindSpeed = float(data['sliderValueAverageWindSpeed'])

    # Convert 0 and 1 to the correct format for the calculation
    sunEnergy = "nei"
    if (sliderValueSunCondition == 1):
        sunEnergy = "ja"

    # Run the calculation
    energyAlgorithmSolutionDataFrame = energyAlgorithm.run_calculation(sliderValueNecessaryEffect,
                                                                       sliderValueDailyEnergyRequirement,
                                                                       sliderValueDesiredBatteryCapacity,
                                                                       sunEnergy,
                                                                       sliderValueAverageWaveHeight,
                                                                       sliderValueAverageWindSpeed)

    # Debugging to see values calculated
    print(energyAlgorithmSolutionDataFrame)
    
    # Calculate the best solution
    # Filter out rows where Cost_per_kWh_needed is 0
    filtered_df = energyAlgorithmSolutionDataFrame[energyAlgorithmSolutionDataFrame['Cost_per_kWh_needed'] > 0]

    if filtered_df.empty:
        best_energy = "Ingen Løsning..."
    else:
        # Find the index (name) of the row with the minimum 'Cost_per_kWh_needed'
        best_energy = filtered_df['Cost_per_kWh_needed'].idxmin()

    # return Best energy
    print(best_energy)
    return Response(best_energy, mimetype='text/plain')  # Return text as plain text

# Memes GET function
@server.route("/api/getMemesList")
def api_memes_list():
    memes_list = os.listdir("static/images/memes/")
    # Filter out non-image files if necessary
    memes_list = [meme for meme in memes_list if meme.lower().endswith(('.png', '.jpg', '.jpeg', '.gif'))]
    return jsonify(memes_list)



# Nice to have function
def get_ip_address():
    # Get the computer's network name
    hostname = socket.gethostname()
    
    # Get the IP address associated with the network name
    ip_address = socket.gethostbyname(hostname)
    
    return ip_address

# Run the server
if __name__ == '__main__':
    print(f" ###==================================================### \n",
          f"### WEBPAGE STARTED :D                               ### \n",
          f"### URL:  http://{get_ip_address()}:9999                   ### \n",
          f"###==================================================### \n",)
    print()
    print()
    print()

    server.run(debug=True, host='0.0.0.0', port=9999)
