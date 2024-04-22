#!/usr/bin/env python
# coding: utf-8
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import math

import matplotlib
matplotlib.use('Agg')  # Use the 'Agg' backend which does not require a GUI



def calculate_capex_cost_per_kwh(data, requirements):
    # Beregner nødvendig antall batteripakker og tilleggskostnad per teknologi basert på lagringskrav
    batteripakke_data = data.pop('Batteripakke')
    antall_batteripakker = math.ceil(requirements['Energilagringskapasitet'] / batteripakke_data['Energikapasitet'])
    tilleggspris_batteripakke = antall_batteripakker * batteripakke_data['Produktpris']
    totalt_areal_batteripakker = antall_batteripakker * 13.86  # 13.86 m2 per batteripakke

    results = {}
    for tech, values in data.items():
        daily_energy_per_unit = values.get('Effekt', 0) * 24
        
        if daily_energy_per_unit:
            units_required_for_energy = math.ceil(requirements['Energiforbruk_per_day'] / daily_energy_per_unit)
            units_required_for_power = math.ceil(requirements['Effekt_Kw'] / values['Effekt']) if values['Effekt'] else float('inf')
            units_required = max(units_required_for_energy, units_required_for_power)
        else:
            units_required = 0
            
        
        # Sjekk om teknologien er Hydrogen for å utelate tilleggskostnaden for batteripakke i kostnadsberegningene
        if tech == 'Hydrogen':
            capex = values['Produktpris'] * units_required / 1000000 if daily_energy_per_unit else 0
            cost_per_kwh = ((values['Produktpris'] * units_required * 0.0001826) + (values['Driftskostnad'] / (15 * 365)) * units_required) / requirements['Energiforbruk_per_day'] if units_required else 0
        else:
            capex = (values['Produktpris'] * units_required + tilleggspris_batteripakke) / 1000000 if daily_energy_per_unit else 0
            cost_per_kwh = (((values['Produktpris'] * units_required + tilleggspris_batteripakke) * 0.0001826) + (values['Driftskostnad'] / (15 * 365)) * units_required) / requirements['Energiforbruk_per_day'] if units_required else 0
        
        needed_energy = requirements['Energiforbruk_per_day']
        actual_energy_supply = daily_energy_per_unit * units_required
        
        results[tech] = {
            'Units_Required': units_required,
            'Capex MNOK': capex,
            'Cost_per_kWh_needed': cost_per_kwh,
            'needed_energy': requirements['Energiforbruk_per_day'],
            'Actual_energy_supply': actual_energy_supply
        }

    return results, antall_batteripakker, totalt_areal_batteripakker

def run_calculation(effect: float,
                    energyUsagePerDay: float,
                    EnergyBatteryCapacity: float, 
                    SunEnergy: str,
                    waveHeight: float,
                    windSpeed: float):
    # Definerer krav
    requirements = {
        'Effekt_Kw': effect,
        'Energiforbruk_per_day': energyUsagePerDay,
        'Energilagringskapasitet': EnergyBatteryCapacity
    }

    # Definerer datastruktur med maksimal effektkapasitet og maksimal kapasitet for hver teknologi
    data = {
        'Solenergi': {'Effekt': 0.01826, 'Produktpris': 4000, 'Driftskostnad': 4000*0.08*15},
        'Bølgeenergi': {'Effekt': 300, 'Produktpris': 20000000, 'Driftskostnad': 500000},
        'Vindenergi': {'Effekt': 200, 'Produktpris': 4500000, 'Driftskostnad': 500000},
        'Hydrogen': {'Effekt': 90, 'Produktpris': 1000000, 'Driftskostnad':65700000 },
        'Batteripakke': {'Energikapasitet': 2360, 'Produktpris': 10000000, 'Vekt': 25000}
    }
    
        # User inputs for weather conditions
    weather_conditions = {
        'Solenergi': SunEnergy,
        'Bølgeenergi': waveHeight,
        'Vindenergi': windSpeed
    }
    
    # Adjust Solenergi Effekt based on solforhold
    solforhold = weather_conditions['Solenergi'].lower()
    if solforhold == 'ja':
        data['Solenergi']['Effekt'] = 0.01826
    else:
        data['Solenergi']['Effekt'] = 0.0

        
    # Adjust Vindenergi Effekt based on wind speed
    bølgehøyde = weather_conditions['Bølgeenergi']
    if bølgehøyde > 6:
        data['Bølgeenergi']['Effekt'] = 300
    elif 4 < bølgehøyde <= 5:
        data['Bølgeenergi']['Effekt'] = 300*0.7
    elif 0.25 < bølgehøyde <= 4:
        data['Bølgeenergi']['Effekt'] = 300*0.5
    elif bølgehøyde < 0.25:
        data['Bølgeenergi']['Effekt'] = 0
    
    
    # Adjust Vindenergi Effekt based on wind speed
    vind_hastighet = weather_conditions['Vindenergi']
    if vind_hastighet > 10:
        data['Vindenergi']['Effekt'] = 200*0.33
    elif 7 < vind_hastighet <= 10:
        data['Vindenergi']['Effekt'] = 200*0.2
    elif 4 < vind_hastighet <= 7:
        data['Vindenergi']['Effekt'] = 200*0.1
    elif 0 <= vind_hastighet <= 4:
        data['Vindenergi']['Effekt'] = 200*0

    # Beregner Capex, kostnad per kWh, og faktisk energiforsyning for alle teknologier
    capex_cost_results, antall_batteripakker, totalt_areal_batteripakker = calculate_capex_cost_per_kwh(data, requirements)

    # Visualisering av anbefalte løsninger
    df = pd.DataFrame(capex_cost_results).T
    
    plt.figure(figsize=(10, 8))
    sns.heatmap(df[['Units_Required', 'Capex MNOK', 'Cost_per_kWh_needed','needed_energy', 'Actual_energy_supply']],
                annot=True,
                cmap='viridis',
                fmt=".2f", 
                linewidths=.5, 
                linecolor='black')
    plt.title('Energy Supply Solutions', fontsize=24)
    plt.xlabel('Variables', fontsize=16)
    plt.ylabel('Technologies', fontsize=16)

    plt.tight_layout()

    # Save the data
    plt.savefig('backend/energySupplySolutions.png')

    print(f"Totalt antall batteripakker nødvendig: {antall_batteripakker}")
    print(f"Areal pr. batteripakke: 13.86 m2")
    print(f"Areal pr. solcelle enhet: 1 m2")
    print(f"Areal pr. Bølge enhet enhet: 144 m2")
    print(f"Areal pr. Vindmølle enhet: 25 m2")
    print(f"Areal pr. Hydrogen aggregat enhet: 25 m2")

    # Return answer in data fromat for future usage
    return df




