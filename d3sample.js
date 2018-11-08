var width = 960,
    height = 500

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var simulation = d3.forceSimulation()
  .force('charge', d3.forceManyBody().strength(-20)) 
  .force('center', d3.forceCenter(width / 2, height / 2));

function getNodeColor(node) {
  return node.level === 1 ? 'red' : 'gray';
}

var nodes = [];

d3.json("gitlog.json", function(error, data) {
   if (error) {
        return console.warn(error);
   }

   var nodeElements = svg.append("g")
     .attr("class", "nodes")
     .selectAll("circle")
     .data(data)
     .enter().append("circle")
       .attr("r", 10)
       .attr("fill", "white")
       .attr("stroke", "black")
       .append("text")
       .text(function (node) { return node.message })
       .attr("font-size", 15);

   simulation.nodes(data).on('tick', () => {
      nodeElements
         .attr('cx', function (node) { return node.x })
         .attr('cy', function (node) { return node.y });
   });  
});