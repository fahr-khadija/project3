// Create a horizontal bar chart with a dropdown menu to display data for the selected country.
// Modify the barChart function for better visualization of two selected countries
// Modify the barChart function to display entries on the y-axis and values on the x-axis with 2 colors for the countries selected 

export function barChart(selectedCountries) {
    // Fetch the JSON data and console log it
     d3.json(url).then((data) => {
        console.log(`Data:`, data);
       let countryDataList = data.projectdata;
       let selectedCountriesData = countryDataList.filter((countryData) =>
         selectedCountries.includes(countryData.country)
       );
    
       let trace = selectedCountriesData.map((selectedCountryData, index) => ({
         x: Object.values(selectedCountryData).slice(1, 11).reverse(), // Use values for x-axis
         y: Object.keys(selectedCountryData).slice(1, 11).reverse(), // Use entries  for y-axis
         type: 'bar',
         marker: {
           // add Blue for the first country, red for the second
           color: index === 0 ? 'rgba(55, 128, 191, 0.7)' : 'rgba(255, 0, 0, 0.7)', 
         },
         name: selectedCountryData.country,
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
   