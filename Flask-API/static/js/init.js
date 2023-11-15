// Initiation function
export function init() {
    // Dropdown Menu
    let dropdownMenu = d3.select('#selDataset');
   
    // Fetch the JSON data and console log it
    d3.json(url).then(function (data) {
      let countryList = data.projectdata.map((countryData) => countryData.country);
   
      countryList.forEach((country) => {
        dropdownMenu.append('option').text(country).property('value', country);
      });
   // Select the first two countries algeria and angola 
      let initialCountries = countryList.slice(0, 2); 
      // Plot the initial selection as an array
      plot(initialCountries); 
    });
   
    dropdownMenu.on('change', function () {
      let selectedCountries = d3.select('#selDataset').selectAll('option:checked').nodes().map(option => option.value);
      plot(selectedCountries);
    });
   };
   