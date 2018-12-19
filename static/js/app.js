function buildMetadata(sample) {
  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample

  var panel = document.getElementById("sample-metadata");

    // Use d3 to select the panel with id of `#sample-metadata`
   
    // Use `.html("") to clear any existing metadata
    panel.innerHTML ='';

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata
    d3.json(`metadata/${sample}`).then(d => {
      console.log(d);
    
    for (var key in d){
      h6Tag = document.createElement("h6");
      h6Text = document.createTextNode(`${key}: ${d[key]}`);
      h6Tag.append(h6Text);
      panel.appendChild(h6Tag);

    }
//     var table = d3.select('#sample-metadata')

//     Object.keys(d).forEach(function (key) {
//       table.append('h3').text(d[key]);
//   // do something with key or value
// });
 
    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
})};


function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  d3.json(`samples/${sample}`).then(d => {
    console.log(d);

  


    
    // @TODO: Build a Bubble Chart using the sample data

    var trace1 = {
      x:d['otu_ids'].slice(0, 10),
      y:d['sampel_values'],
      mode:'markers',
      text:d['otu_labels'],
      marker: {
        size: d['sample_values'],
        color: d['otu_ids'],
        colorscale: "Earth",

      }
    };

    var bubbleData = [trace1];
// Start of the bubble chart 
    var layout = {
      title:"Bubble Chart",
      showlegend: true,
      xaxis: {title:'x axis'},
      yaxis: {title: 'y axis'},
      height: 600,
      width:1200
    };

    Plotly.newPlot("bubble", bubbleData, layout);

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
// beginning of pie chart

    var pieData = [{
      values: d['sample_values'].slice(0, 10),
      labels: d['otu_ids'].slice(0,10),
      hovertext: d['otu_labels'].slice(0,10),
      hoverinfo: 'hovertext',
      type: 'pie'
    }];
    var pieLayout = {
      margin:{t: 0, l: 0 }
    };

    var pieChart = document.getElementById('pie');
    Plotly.plot(pieChart, pieData, pieLayout);
})};



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
