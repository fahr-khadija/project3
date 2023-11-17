const url = "http://127.0.0.1:5000/all_data";

// // Perform a GET request to the query URL
// d3.json(url).then(function (projectdata) {
//     // Once we get a response, send the data.features object to the createFeatures function.
//     init(projectdata);
//   });
  

// // Display the default plot
//  function init(projectdata) {
//   console.log("Hello David", projectdata)
//   // let labels = projectdata.map(item => item.projectdata['country']); 
//   // let pieValues = projectdata.map(item => item.projectdata['Electricity from renewables (TWh)']);


//   let plotData = [{
//     values: pieValues,
//     labels: labels,
//     type: "pie"
//   }];
//   let layout = {
//     height: 600,
//     width: 800
//   };

//   Plotly.newPlot("piechart", plotData, layout);
// }

// // Call the init function to display the pie chart
// init();

function piechart(selectedCountries){
  
  d3.json(url).then(function (data) {
    let countryList = data.projectdata.map((countryData) => countryData.country);
    let selectedCountriesData = countryList.filter((countryData) =>
    selectedCountries.includes(countryData.country)
    );

    let plotData = [{
      values: countryList,
      labels: selectedCountriesData,
      type:"pie"
    }];
    let layout = {
      hieght: 600,
      width: 800,
    };
    Plotly.newPlot("piechart", plotData, layout);
  });
};