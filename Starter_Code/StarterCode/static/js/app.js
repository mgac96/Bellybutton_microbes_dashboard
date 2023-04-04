// Endpoint for the data
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Create dropdown
function createDropdown() {
    const testIDs = sampleData.map(row => row.id);
    let dropdown = d3.select("#selDataset");
    testIDs.forEach(id => {
        dropdown.append("option").text(id);
    });
}

// Filter for ID
const list = test => parseInt(test.id) === parseInt(d3.select("#selDataset").property("value"));

// Initialize chart
function chartInit() {
    let dataList = sampleData.filter(list);
    console.log(dataList);
    let trace1 = {
        x: dataList.map(row => row.sample_values),
        y: dataList.map(row => row.otu_ids),
        hovertext: dataList.map(row => row.otu_labels),
        type: "bar",
    };
    let traceData1 = [trace1];
    let layout1 = {
        title: "OTU and Sample Value"
    };
    
   Plotly.newPlot("bar", traceData1, layout1);
}
//create bubble chart
//demographic info
//dispay key value pair
//update plots with new sample data
// Call API data and assign sample data
let sampleData;

d3.json(url).then(function(data) {
    sampleData = Object.values(data.samples);
    createDropdown();
    chartInit();
}).catch(function(error) {
    console.log(error);
});



//create bubble chart
//demographic info
//dispay key value pair
//update plots with new sample data


