// barChart.js
const url = 'http://127.0.0.1:5000/all_data';

export function barChart(selectedCountries) {
    // Fetch the JSON data and console log it
    d3.json(url).then((data) => {
        let countryDataList = data.projectdata;
        let selectedCountriesData = countryDataList.filter((countryData) =>
            selectedCountries.includes(countryData.country)
        );

        let trace = selectedCountriesData.map((selectedCountryData, index) => ({
            x: ["GDP", "Land Area", "Population", "Renewable Energy", "Primary Energy", "CO2 Emissions"],
            y: [
                parseFloat(selectedCountryData["GDP (per capita)"]),
                parseFloat(selectedCountryData["Land Area(Km2)"]),
                parseFloat(selectedCountryData["population"]),
                parseFloat(selectedCountryData["Renewable energy consumption per capita (kWh/person)"]),
                parseFloat(selectedCountryData["Primary energy consumption per capita (kWh/person)"]),
                parseFloat(selectedCountryData["co2 Emissions (metric tons per capita)"])
            ],
            type: 'bar',
            marker: {
                color: index === 0 ? 'rgba(55, 128, 191, 0.7)' : 'rgba(255, 0, 0, 0.7)',
            },
            name: selectedCountryData.country,
            orientation: 'v',
        }));

        const layout = {
            title: 'Bar Chart visualization',
            xaxis: {
                title: 'Attributes',
            },
            yaxis: {
                title: 'Values',
                automargin: true,
            },
        };
        Plotly.newPlot('barChart', trace, layout);
    });
}
