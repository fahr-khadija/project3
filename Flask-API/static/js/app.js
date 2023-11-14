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
      const bubbleLayout = {
        xaxis: { title: 'Attribute' },
       };  
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

// function "demog" to filter data for selected country and update the html accordingly based on the selected country
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

      // Iterate through the selectedCountryData object and console for each country
      Object.entries(selectedCountryData).forEach(([key, value]) => {
        infoPanel.append('h5').text(`${key}: ${value}`);
      });
    });

    // Log the entries array to the  console
    console.log(selectedCountriesData);
  });

}
// Function for scatter plot
function scatterPlot(selectedCountries) {
  d3.json(url).then((data) => {
    let countryDataList = data.projectdata;
    let selectedCountriesData = countryDataList.filter((countryData) =>
      selectedCountries.includes(countryData.Country)
    );

    let traces = selectedCountriesData.map((selectedCountryData, index) => ({
      x: Object.values(selectedCountryData).slice(1, 11),
      y: Object.values(selectedCountryData).slice(11, 21),
      mode: 'markers',
      type: 'scatter',
      name: selectedCountryData.Country,
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
    // Plot the scatterPlot  with the selected country
    Plotly.newPlot('scatterPlot', traces, layout);
  });
}

 //  //  //  //  // Dropdown Menu //  //  //  //  //
// put a variable for Dropdown Menu for Country1
let dropdownMenu1 = d3.select('#selCountry1');

// put a variable for Dropdown Menu for Country2 
let dropdownMenu2 = d3.select('#selCountry2');

// Fetch the JSON data and console log it
d3.json(url).then(function (data) {
  let countryList = data.projectdata.map((countryData) => countryData.Country);

// Populate Country1 dropdown
countryList.forEach((country) => {
  dropdownMenu1.append('option').text(country).property('value', country);
});

// Populate Country2 dropdown
countryList.forEach((country) => {
  dropdownMenu2.append('option').text(country).property('value', country);
});

// Select initial countries based on dropdown selections
let initialCountry1 = dropdownMenu1.property('value');
let initialCountry2 = dropdownMenu2.property('value');
 // Pass the initial selections as an array
 plot([initialCountry1, initialCountry2]);
});

// Listen for changes on the dropdowns menu for Country1
dropdownMenu1.on('change', function () {
  let selectedCountry1 = dropdownMenu1.property('value');
  let selectedCountry2 = dropdownMenu2.property('value');
  plot([selectedCountry1, selectedCountry2]);

  // Update Country1 Info
  optionChanged('1', selectedCountry1);
});
// Listen for changes on the dropdowns menu for Country2
dropdownMenu2.on('change', function () {
  let selectedCountry1 = dropdownMenu1.property('value');
  let selectedCountry2 = dropdownMenu2.property('value');
  plot([selectedCountry1, selectedCountry2]);

  // Update Country2 Info
  optionChanged('2', selectedCountry2);
});
 //  //  //  //  // 






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
