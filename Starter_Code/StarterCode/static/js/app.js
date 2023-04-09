const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Function to build metadata table
function buildMetadata(sample) {
  d3.json(url).then((data) => {
    let metadata = data.metadata;
    // Filter metadata for object with sample number
    let resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    let result = resultArray[0];
    let PANEL = d3.select("#sample-metadata");
    PANEL.html("");
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
  });
}

// Function to create dropdown menu
function createDropdown() {
  let dropdown = d3.select("#selDataset");
  d3.json(url).then((data) => {
    let names = data.names;
    names.forEach((name) => {
      dropdown.append("option").text(name).property("value", name);
    });
    let firstSample = names[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Function to update charts and metadata table
function buildCharts(sample) {
    d3.json(url).then((data) => {
      let samples = data.samples;
      // Filter samples for object with sample number
      let resultArray = samples.filter(sampleObj => sampleObj.id == sample);
      let result = resultArray[0];
  
      // Create bar chart
      let trace1 = {
        x: result.sample_values.slice(0, 10).reverse(),
        y: result.otu_ids.slice(0, 10).map(otuId => `OTU ${otuId}`).reverse(),
        text: result.otu_labels.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h",
      };
      let layout1 = {
        title: "Top 10 OTUs",
        margin: {
          l: 100,
          r: 100,
          t: 100,
          b: 50
        },
      };
      Plotly.newPlot("bar", [trace1], layout1);
  
      // Create bubble chart
      let trace2 = {
        x: result.otu_ids,
        y: result.sample_values,
        text: result.otu_labels,
        mode: "markers",
        marker: {
          size: result.sample_values,
          color: result.otu_ids,
          colorscale: "Earth",
        },
      };
      let layout2 = {
        title: "All OTUs",
        margin: {
          l: 50,
          r: 50,
          t: 50
        },
      };
      Plotly.newPlot("bubble", [trace2], layout2); // add this line to create the bubble chart
    })
  }
  // import API data
let data = d3.json(url).then(function(data){
   
    // separate out needed sample data
    sampleData = Object.values(data.samples);
    // separate out metadata
    metaData = Object.values(data.metadata);
    // create testID list
    testIDs = sampleData.map(sampleData => sampleData.id);
    // populate dropdown menu options
    createDropdown()
    
})