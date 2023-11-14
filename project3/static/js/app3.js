// Assuming you have an 'optionChanged' function in your HTML file to handle dropdown changes
function optionChanged(selectedCountry, chartId) {
    // Call functions to update charts based on the selected country
    barChart(selectedCountry, chartId);
  }
  
  // Function for bar chart plotting
  function barChart(selectedCountry, chartId) {
    // Fetch the JSON data
    d3.json("../../projectdata_modified.json").then((data) => {
      // Find the selected country's data
      const selectedCountryData = data.projectdata.find((country) => country.Country === selectedCountry);
  
      // Extract relevant data for the bar chart
      const barChartData = [
        {
          x: [
            selectedCountryData["Average Temp"],
            selectedCountryData["Renewable energy share in the total final energy consumption (%)"],
            selectedCountryData["Electricity from fossil fuels (TWh)"],
            // Add more fields as needed
          ],
          y: ["Average Temp", "Renewable Energy (%)", "Electricity from Fossil Fuels (TWh)"],
          type: "bar",
          orientation: "h",
        },
      ];
  
      // Set layout for the bar chart
      const layout = {
        title: `Data for ${selectedCountry}`,
      };
  
      // Use Plotly to plot the bar chart
      Plotly.newPlot(chartId, barChartData, layout);
    });
  }
  
  // Initialize the page
  function init() {
    // Fetch the JSON data
    d3.json("../../projectdata_modified.json").then((data) => {
      // Get the list of countries
      const countries = data.projectdata.map((country) => country.Country);
  
      // Populate the dropdown with country options
      const dropdownMenu1 = d3.select("#selDataset1");
      const dropdownMenu2 = d3.select("#selDataset2");
      countries.forEach((country) => {
        dropdownMenu1.append("option").text(country).property("value", country);
        dropdownMenu2.append("option").text(country).property("value", country);
      });
  
      // Initial country selection (you can change this to the desired default country)
      const initialCountry = countries[0];
      optionChanged(initialCountry, "bar1"); // Initial chart ID is "bar1"
      optionChanged(initialCountry, "bar2"); // Initial chart ID is "bar2"
    });
  }
  
  // Call the init function to initialize the page
  init();
  