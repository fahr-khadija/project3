const url = 'http://127.0.0.1:5000/all_data';

// Perform a GET request to the query URL/
d3.json(url).then(function (projectdata) {
    // Once we get a response, send the data.features object to the createFeatures function.
    createFeatures(projectdata.features);
  });
  
  