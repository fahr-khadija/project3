// Put json file  in a const URL 
//const url = "http://localhost:8000/projectdata_modified.json"; 
// put the db under static so  flask can take it 
   const url = '/static/projectdata_modified.json';
// Create a horizontal bar chart with a dropdown menu to display data for the selected country.
// Modify the barChart function for better visualization of two selected countries
// Modify the barChart function to display entries on the y-axis and values on the x-axis with 2 colors for the countries selected 

function barChart(selectedCountries) {
 // Fetch the JSON data and console log it
  d3.json(url).then((data) => {
     console.log(`Data:`, data);
    let countryDataList = data.projectdata;
    let selectedCountriesData = countryDataList.filter((countryData) =>
      selectedCountries.includes(countryData.Country)
    );

    let trace = selectedCountriesData.map((selectedCountryData, index) => ({
      x: Object.values(selectedCountryData).slice(1, 11).reverse(), // Use values for x-axis
      y: Object.keys(selectedCountryData).slice(1, 11).reverse(), // Use entries  for y-axis
      type: 'bar',
      marker: {
        // add Blue for the first country, red for the second
        color: index === 0 ? 'rgba(55, 128, 191, 0.7)' : 'rgba(255, 0, 0, 0.7)', 
      },
      name: selectedCountryData.Country,
      orientation: 'h',
    }));

    const layout = {
      title: 'Bar Chart visualisation',
      xaxis: {
        title: 'X-Axis entries values',
      },
      yaxis: {
        title: 'Y-Axis entries names',
        automargin: true,
      },
    };
    Plotly.newPlot('barChart', trace, layout);
  });
};

// Function that builds the bubble chart
// Modify the bubbleChart function for better visualization of two selected countries
  function bubbleChart(selectedCountries) {
    // Fetch the JSON data 
    d3.json(url).then((data) => {
      let countryDataList = data.projectdata;
      let selectedCountriesData = countryDataList.filter((countryData) =>
        selectedCountries.includes(countryData.Country)
      );
  
      let trace = selectedCountriesData.map((selectedCountryData, index) => ({
        x: Object.keys(selectedCountryData).slice(1),
        y: Object.values(selectedCountryData).slice(1),
        text: Object.keys(selectedCountryData).slice(1),
        mode: 'markers',
        marker: {
          size: 100,
          // add Blue for the first country, red for the second
          color: index === 0 ? 'rgba(55, 128, 191, 0.7)' : 'rgba(255, 0, 0, 0.7)', // Blue for the first country, red for the second
        },
        name: selectedCountryData.Country,
      }));
       // Plot the bubble chart with the selected country
       Plotly.newPlot('bubbleChart', trace, bubbleLayout);

    });
  }

// function "demog"
function demog(selectedCountries) {
  // Fetch the JSON data and console log it
  d3.json(url).then((data) => {
    console.log(`Data:`, data);

    let countryDataList = data.projectdata;

    // Filter data for selected countries
    let selectedCountriesData = countryDataList.filter((countryData) =>
      selectedCountries.includes(countryData.Country)
    );

    // Update the HTML elements with the information
    selectedCountriesData.forEach((selectedCountryData, index) => {
      let infoPanel = d3.select(`#sample-metadata${index + 1}`);
      infoPanel.html('');

      // Iterate through the selectedCountryData object
      Object.entries(selectedCountryData).forEach(([key, value]) => {
        infoPanel.append('h5').text(`${key}: ${value}`);
      });
    });

    // Log the entries array
    console.log(selectedCountriesData);
  });

}

// Function to plot all charts when we have a new selection
function plot(selection) {
  console.log(selection);
  demog(selection);
  barChart(selection);
  bubbleChart(selection);
  // Add other charts as needed
}

// Initiation function
function init() {
  // Dropdown Menu
  let dropdownMenu = d3.select("#selDataset");

  // Fetch the JSON data and console log it
  d3.json(url).then(function (data) {
    let countryList = data.projectdata.map((countryData) => countryData.Country);

    countryList.forEach((country) => {
      dropdownMenu.append("option").text(country).property("value", country);
    });

    let initialCountry = countryList[0];
    plot(initialCountry);
  });

  dropdownMenu.on("change", function () {
    let selectedCountry = d3.select("#selDataset").node().value;
    plot(selectedCountry);
  });
}

init();
