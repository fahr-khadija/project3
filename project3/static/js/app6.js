// Initialize the map
const mymap = L.map('mapid').setView([0, 0], 2);

// Add a tile layer to the map (you can choose a different tile layer)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(mymap);

// Dummy data for testing
const dummyData = {
    "projectdata": [
        {
            "Country": "Algeria",
            "Latitude": 28.033886,
            "Longitude": 1.659626,
            // Add more fields as needed
        },
        {
            "Country": "Angola",
            "Latitude": -11.202692,
            "Longitude": 17.873887,
            // Add more fields as needed
        },
        {
            "Country": "Antigua and Barbuda",
            "Latitude": 17.060816,
            "Longitude": -61.796428,
            // Add more fields as needed
        },
        // Add more dummy data as needed
    ],
};

// Function to update the map based on the selected country
function updateMap(selectedCountry) {
    // Find the selected country's data
    const selectedCountryData = dummyData.projectdata.find((country) => country.Country === selectedCountry);

    // Clear existing markers
    mymap.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
            mymap.removeLayer(layer);
        }
    });

    // Add a marker for the selected country
    L.marker([selectedCountryData.Latitude, selectedCountryData.Longitude])
        .addTo(mymap)
        .bindPopup(`<b>${selectedCountry}</b>`);

    // Add click event to the marker to show other entries for the selected country
    const marker = L.marker([selectedCountryData.Latitude, selectedCountryData.Longitude]);
    marker.on('click', function () {
        // Implement logic to show other entries for the selected country when clicked
        alert(`Clicked on ${selectedCountry}`);
    });
}

// Assuming you have an 'optionChanged' function in your HTML file to handle dropdown changes
function optionChanged(selectedCountry) {
    // Call functions to update charts and map based on the selected country
    barChart(selectedCountry);
    updateMap(selectedCountry);
}

// Function for bar chart plotting
function barChart(selectedCountry) {
    // Implement your bar chart logic here based on the selected country
}

// Initialize the page with the first country in the dummy data
const initialCountry = dummyData.projectdata[0].Country;
optionChanged(initialCountry);
