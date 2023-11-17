const url = 'http://127.0.0.1:5000/all_data';

// // Perform a GET request to the query URL/
// d3.json(url).then(function (projectdata) {
//     // Once we get a response, send the data.features object to the createFeatures function.
//     createFeatures(projectdata.features);
//   });
  
let labels = Object.keys(data.url);

// Extract values from the 
let pievalua = Object.values(data.url);

// Display the default plot
function init() {
  let plotData = [{
    values: pievaluavalua,
    labels: labels,
    type: "pie"
  }];

  let layout = {
    height: 600,
    width: 800
  };

  Plotly.newPlot("pie", plotData, layout);
}

// Call the init function to display the pie chart
init();