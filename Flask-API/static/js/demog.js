// function "demog" to filter data for selected country and update the html accordingly based on the selected country
const url = 'http://127.0.0.1:5000/all_data';

export function demog(selectedCountries) {
    // Fetch the JSON data and console log it
    d3.json(url).then((data) => {
      console.log(`Data:`, data);
   
      let countryDataList = data.projectdata;
   
      // Filter data for selected countries
      let selectedCountriesData = countryDataList.filter((countryData) =>
        selectedCountries.includes(countryData.country)
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
   