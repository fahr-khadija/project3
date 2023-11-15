const url = 'http://127.0.0.1:5000/all_data';

// Function for scatter plot
export function scatterPlot(selectedCountries) {
    d3.json(url).then((data) => {
      let countryDataList = data.projectdata;
      let selectedCountriesData = countryDataList.filter((countryData) =>
        selectedCountries.includes(countryData.country)
      );
   
      let traces = selectedCountriesData.map((selectedCountryData, index) => ({
        x: Object.values(selectedCountryData).slice(1, 11),
        y: Object.values(selectedCountryData).slice(11, 21),
        mode: 'markers',
        type: 'scatter',
        name: selectedCountryData.country,
        text: Object.values(selectedCountryData).slice(1, 11).map((value, i) => `${Object.keys(selectedCountryData)[i + 1]}: ${value}`),
        marker: {
          size: 10,
          color: index === 0 ? 'rgba(55, 128, 191, 0.7)' : 'rgba(255, 0, 0, 0.7)', // Blue for the first country, red for the second
        },
      }));
   
      const layout = {
        title: 'Scatter Plot visualisation',
        xaxis: {
          title: 'X-Axis entries values',
        },
        yaxis: {
          title: 'Y-Axis entries names',
        },
      };
      // Plot the scatterPlot  with the selected countries
      Plotly.newPlot('scatterPlot', traces, layout);
    });
   }
  