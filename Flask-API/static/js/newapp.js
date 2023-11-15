// Import functions from other files
import { barChart } from './barChart.js';
import { bubbleChart } from './bubbleChart.js';
import { scatterPlot } from './scatterPlot.js';
import { demog } from './demog.js';
import { optionChanged } from './optionChanged.js';
import { init } from './init.js';

//  //  //  //  // Dropdown Menu //  //  //  //  //
// put a variable for Dropdown Menu for Country1
let dropdownMenu1 = d3.select('#selCountry1');
// put a variable for Dropdown Menu for Country2 
let dropdownMenu2 = d3.select('#selCountry2');

// Fetch the JSON data and console log it
d3.json(url).then(function (data) {
  let countryList = data.projectdata.map((countryData) => countryData.country);
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

// Function to plot all charts when we have new selections for country 
function plot(selectedCountries) {
  console.log(selectedCountries);
  demog(selectedCountries);
  barChart(selectedCountries);
  bubbleChart(selectedCountries);
  scatterPlot(selectedCountries);
  //createMap(selectedCountries);
};

init();
