// bubbleChart.js

export function bubbleChart(selectedCountries) {
    // Fetch the JSON data 
    d3.json(url).then((data) => {
        let countryDataList = data.projectdata;
        let selectedCountriesData = countryDataList.filter((countryData) =>
            selectedCountries.includes(countryData.country)
        );

        let trace = selectedCountriesData.map((selectedCountryData, index) => ({
            x: ["GDP (per capita)", "Land Area(Km2)", "population", "Renewable energy consumption per capita (kWh/person)", "Primary energy consumption per capita (kWh/person)", "co2 Emissions (metric tons per capita)"],
            y: [
                parseFloat(selectedCountryData["GDP (per capita)"]),
                parseFloat(selectedCountryData["Land Area(Km2)"]),
                parseFloat(selectedCountryData["population"]),
                parseFloat(selectedCountryData["Renewable energy consumption per capita (kWh/person)"]),
                parseFloat(selectedCountryData["Primary energy consumption per capita (kWh/person)"]),
                parseFloat(selectedCountryData["co2 Emissions (metric tons per capita)"])
            ],
            text: ["GDP", "Land Area", "Population", "Renewable Energy", "Primary Energy", "CO2 Emissions"],
            mode: 'markers',
            marker: {
                size: 50,
                color: index === 0 ? 'rgba(55, 128, 191, 0.7)' : 'rgba(255, 0, 0, 0.7)',
            },
            name: selectedCountryData.country,
        }));

        const bubbleLayout = {
            title: 'Bubble Chart visualization',
            xaxis: {
                title: 'Attributes',
            },
            yaxis: {
                title: 'Values',
            },
        };

        // Plot the bubble chart with the selected countries
        Plotly.newPlot('bubbleChart', trace, bubbleLayout);
    });
}
