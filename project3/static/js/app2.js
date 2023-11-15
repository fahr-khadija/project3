// Put your URL in a URL variable
const url = "http://127.0.0.1:5000/api/v1.0/all_data"; 

// Create a horizontal bar chart with a dropdown menu to display data for the selected country.

// Function for bar chart plotting
function barChart(selection) {
  // Fetch the JSON data and console log it
  d3.json(url).then((data) => {
    console.log(`Data:`, data);

    let countryDataList = data.projectdata;

    // Filter data where Country matches the selection
    let selectedCountryData = countryDataList.find(
      (countryData) => countryData.Country === selection
    );

    // Trace data for the bar chart
    let trace = [
      {
        x: Object.values(selectedCountryData).slice(1, 11).reverse(), 
        y: Object.keys(selectedCountryData).slice(1, 11).reverse(),
        type: "bar",
        marker: {
          color: "rgb(255, 127, 14)",
        },
        orientation: "h",
      },
    ];

    // Use Plotly to plot the bar chart
    Plotly.newPlot("bar", trace);
  });
}

// Function that builds the bubble chart
function bubbleChart(selection) {
  // Fetch the JSON data
  d3.json(url).then((data) => {
    console.log(`Data:`, data);

    let countryDataList = data.projectdata;

    // Filter data where Country matches the selection
    let selectedCountryData = countryDataList.find(
      (countryData) => countryData.Country === selection
    );

    // Trace data for the bubble chart
    let trace = [
      {
        x: Object.keys(selectedCountryData).slice(1),
        y: Object.values(selectedCountryData).slice(1),
        text: Object.keys(selectedCountryData).slice(1),
        mode: "markers",
        marker: {
          size: 50,
          color: Object.values(selectedCountryData).slice(1),
        },
      },
    ];

    // Apply the x-axis legend to the layout
    let layout = {
      xaxis: { title: "Attribute" },
    };

    // Use Plotly to plot the bubble chart
    Plotly.newPlot("bubble", trace, layout);
  });
}

// Demographic function "demog"
function demog(selection) {
  // Fetch the JSON data and console log it
  d3.json(url).then((data) => {
    console.log(`Data:`, data);

    let countryDataList = data.projectdata;

    // Filter data where Country matches the selection
    let selectedCountryData = countryDataList.find(
      (countryData) => countryData.Country === selection
    );

    d3.select("#country").html("");

    let selectMetaData = Object.entries(selectedCountryData);

    // Iterate through the selectMetaData array
    selectMetaData.forEach(([key, value]) => {
      d3.select("#country")
        .append("h5")
        .text(`${key}: ${value}`);
    });

    // Log the entries array
    console.log(country);
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
