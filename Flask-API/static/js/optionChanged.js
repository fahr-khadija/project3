// Function to update info based on selected country
export function optionChanged(countryType, selectedCountry) {
    d3.json(url).then((data) => {
      let countryDataList = data.projectdata;
      let selectedCountryData = countryDataList.find((countryData) => countryData.country === selectedCountry);
   
      // Update the HTML elements with the information
      let infoPanel = d3.select(`#sample-metadata${countryType}`);
      infoPanel.html('');
   
      Object.entries(selectedCountryData).forEach(([key, value]) => {
        infoPanel.append('h5').text(`${key}: ${value}`);
      });
    });
   };
   