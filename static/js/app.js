
d3.csv("/Users/scottcaruso/Desktop/jsVisDash/dataset/belly_button_metadata.csv", function(data) {
 let rows = data; 
});

function buildMetadata(samples) {
  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample

  var panel = document.getElementById("sample-metadata");

    // Use d3 to select the panel with id of `#sample-metadata`
   
    // Use `.html("") to clear any existing metadata
    panel.innerHTML ='';

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata

    // for (var key in samples){
    //   h6Tag = document.createElement("h6");
    //   h6Text = document.createTextNode(`${key}: ${samples[key]}`);
    //   h6Tag.append(h6Text);
    //   panel.appendChild(h6Tag);

    // }

    var table = d3.select("#sample-metadata")
      .data(data)
      .enter()
      .append("#sample-metadata")
      .text(function(d) {return d; 
      });

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
}


function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  d3.json(`samples/${sample}`).then(d => {
    console.log(d);
  });
    // @TODO: Build a Bubble Chart using the sample data

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
