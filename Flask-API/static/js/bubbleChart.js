const url = 'http://127.0.0.1:5000/all_data';
// Function that builds the bubble chart
// Modify the bubbleChart function for better visualization of two selected countries with differents colors 
export function bubbleChart(selectedCountries) {
    // Fetch the JSON data 
    d3.json(url).then((data) => {
      let countryDataList = data.projectdata;
      let selectedCountriesData = countryDataList.filter((countryData) =>
        selectedCountries.includes(countryData.country)
      );
      const bubbleLayout = {
        xaxis: { title: 'Attribute' },
       };  
      let trace = selectedCountriesData.map((selectedCountryData, index) => ({
        x: Object.keys(selectedCountryData).slice(1),
        y: Object.values(selectedCountryData).slice(1),
        text: Object.keys(selectedCountryData).slice(1),
        mode: 'markers',
        marker: {
          size: 50,
          // add Blue for the first country, red for the second
          color: index === 0 ? 'rgba(55, 128, 191, 0.7)' : 'rgba(255, 0, 0, 0.7)', // Blue for the first country, red for the second
        },
        name: selectedCountryData.country,
      }));
       // Plot the bubble chart with the selected country
       Plotly.newPlot('bubbleChart', trace, bubbleLayout);
 
    });
  }
 