//endpoint
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
//create dropdown
function createDropdown(){
for (let i=0; i <testIDs.length; i++){
    let x = document.getElementById("selDataset");
    let option = document.createElement("option");
    option.text= testIDs[i];
    x.add(option)};
}
///filter for ID
function list(test){
    let dropdown = d3.select(`#selDataSet`);
    let dataset = parseInt(dropdown.property ("value"));
    console.log(dataset)
    return parseInt(test.id)===dataset
}

function chartInit() 
    let dataList =sampleData.filter(list);
    console.log(dataList);
    //barchart
    let trace1 = {
        x: dataList.map(row => row.sample_values),
        y: dataList.map(row => row.otu_ids),
        hovertext: dataList.map(row => row.otu_labels),
        type: "bar",
    };
    let traceData1=[trace1];
    let layout1={
        title: "OTU and Sample value"
    };
    console.log(traceData1);
    Plotly.newPlot("bar",traceData1,layout1);

//call API data assign sample data
let data = d3.json(url).then(function(data){
    console.log(data);
    sampleData = Object.values(data.samples);
    console.log(sampleData);

)};