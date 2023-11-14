// Dummy data for testing
const dummyData = {
    "projectdata": [
      {
        "Country": "Country1",
        "Average Temp": 25,
        "Renewable energy share in the total final energy consumption (%)": 15,
        "Electricity from fossil fuels (TWh)": 50,
        // Add more fields as needed
      },
      {
        "Country": "Country2",
        "Average Temp": 30,
        "Renewable energy share in the total final energy consumption (%)": 20,
        "Electricity from fossil fuels (TWh)": 40,
        // Add more fields as needed
      },
      // Add more dummy data as needed
    ],
  };
  
  // Get the list of countries from the dummy data
  const countries = dummyData.projectdata.map((country) => country.Country);
  
  // Populate the dropdown with country options
  const dropdownMenu1 = d3.select("#selDataset1");
  const dropdownMenu2 = d3.select("#selDataset2");
  countries.forEach((country) => {
    dropdownMenu1.append("option").text(country).property("value", country);
    dropdownMenu2.append("option").text(country).property("value", country);
  });
  
  // Function for bar chart plotting
  function barChart(selectedCountry, chartNumber) {
    // Find the selected country's data
    const selectedCountryData = dummyData.projectdata.find((country) => country.Country === selectedCountry);
  
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
    Plotly.newPlot(`bar${chartNumber}`, barChartData, layout);
  }
  
  // Initialize the page with the first country in the dummy data
  const initialCountry = countries[0];
  barChart(initialCountry, 1);
  barChart(initialCountry, 2);
  