// Fetch countries data from the server or use an API
async function fetchCountriesData() {
    try {
      const response = await fetch('/api/countries'); // Replace with your actual API endpoint
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching countries data:', error);
      return [];
    }
  }
  
  // Sample function to simulate fetching data from the server
  function getSampleData() {
    return [
      { name: 'Algeria', /* other properties */ },
      { name: 'Angola', /* other properties */ },
      // Add more countries as needed
    ];
  }
  
  // Function to populate the dropdown with country names
  async function populateDropdown() {
    const countriesData = await fetchCountriesData(); // Replace with your actual data retrieval logic
    // const countriesData = getSampleData(); // Use this line if you're not fetching data from the server
  
    const dropdown1 = document.getElementById('selDataset1');
    const dropdown2 = document.getElementById('selDataset2');
  
    countriesData.forEach(country => {
      const option1 = document.createElement('option');
      option1.value = country.name;
      option1.text = country.name;
      dropdown1.appendChild(option1);
  
      const option2 = document.createElement('option');
      option2.value = country.name;
      option2.text = country.name;
      dropdown2.appendChild(option2);
    });
  }
  
  // Function to handle changes in the selected country
  async function optionChanged(selectedCountry) {
    const countriesData = await fetchCountriesData(); // Replace with your actual data retrieval logic
    // const countriesData = getSampleData(); // Use this line if you're not fetching data from the server
  
    // Fetch and display information for the selected country
    const countryInfo = countriesData.find(country => country.name === selectedCountry) || {};
  
    // Update the UI with the country information
    updateCountryInfo(countryInfo);
  
    // Implement any other actions you want to perform when the country selection changes
  }
  
  // Function to update the UI with country information
  function updateCountryInfo(countryInfo) {
    // Replace this with your logic to update the UI elements based on the country information
    // You can use document.getElementById or other DOM manipulation methods
    const sampleMetadata1 = document.getElementById('sample-metadata1');
    sampleMetadata1.innerHTML = `<p>Country: ${countryInfo.name}</p><p>Population: ${countryInfo.population}</p>`;
    
    const sampleMetadata2 = document.getElementById('sample-metadata2');
    sampleMetadata2.innerHTML = `<p>Country: ${countryInfo.name}</p><p>GDP: ${countryInfo.gdp}</p>`;
  
    // Add more elements as needed
  }
  
  // Initialize the dropdown on page load
  document.addEventListener('DOMContentLoaded', () => {
    populateDropdown();
  });
  