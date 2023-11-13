// Put our URL in a URL variable
const url = "http://127.0.0.1:5000/api/v1.0/all_data";

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
  console.log(data);
});