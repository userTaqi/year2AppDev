getGraphs();
function updateGraphs(data) {
  d3.select('.chart1').selectAll('*').remove();
  d3.select('.chart2').selectAll('*').remove();
  d3.select('.chart3').selectAll('*').remove();
  d3.select('.chart4').selectAll('*').remove();
}
function getGraphs(){

  $.ajax({
    url: "/SourceCode/claims",
    type: "GET",
    dataType: "json"
  })
  .done(function(data) {
    console.log(data); // Log the data to the console
  
    var svg = d3.select(".chart1")
        .append("svg")
        .attr("width", 1000)
        .attr("height", 700);
  
    var xScale = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) { return +d.INCOME.replace(/\$|,/g, ''); })])
        .range([60, 800]);
  
    var yScale = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) { return +d.AGE; })])
        .range([450, 50]);
  
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);
  
    var line = d3.line()
        .x(function(d) { return xScale(+d.INCOME.replace(/\$|,/g, '')); })
        .y(function(d) { return yScale(+d.AGE); });
  
    svg.append("path")
        .datum(data)
        .attr("d", line)
        .attr("stroke", "red")
        .attr("stroke-width", 2)
        .attr("fill", "none");
  
    svg.append("g")
        .attr("transform", "translate(0, 450)")
        .call(xAxis);
  
    svg.append("g")
        .attr("transform", "translate(50, 0)")
        .call(yAxis);
  
    svg.append("text")
        .attr("transform", "translate(" + (500/2 +175) + " ," + (480 + 10) + ")")
        .style("text-anchor", "middle")
        .attr("class", "axis-label")
        .text("AGE");
  
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0)
        .attr("x",0 - (500 / 2 ))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .attr("class", "axis-label")
        .text("INCOME");
  
    svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function(d) { return xScale(+d.INCOME.replace(/\$|,/g, '')); })
        .attr("cy", function(d) { return yScale(+d.AGE); })
        .attr("r", 5)
        .style("stroke", "blue")
        .attr("fill", "none");
  
    console.log(svg.html()); // Log the SVG contents to the console
  })
  .fail(function(jqXHR, textStatus, errorThrown) {
    console.error(textStatus, errorThrown);
  });
  
  $.ajax({
    url: "/SourceCode/claims",
    type: "GET",
    dataType: "json",
    success: function(data) {
      // Count the number of occurrences of each education level
      const educationCounts = {};
      data.forEach(function(d) {
        const education = d.EDUCATION;
        if (educationCounts[education]) {
          educationCounts[education]++;
        } else {
          educationCounts[education] = 1;
        }
      });
  
      // Create an array of objects representing the education counts
      const educationData = Object.keys(educationCounts).map(function(education) {
        return { education: education, count: educationCounts[education] };
      });
  
      // Sort the education data by count in descending order
      educationData.sort(function(a, b) {
        return b.count - a.count;
      });
  
      // Create a bar chart using D3.js
      const svg = d3.select(".chart2");
      const margin = { top: 20, right: 20, bottom: 30, left: 160 };
      const width = 700 - margin.left - margin.right;
      const height = 450 - margin.top - margin.bottom;
      const x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
      const y = d3.scaleLinear().rangeRound([height, 0]);
      const g = svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
      x.domain(educationData.map(function(d) { return d.education; }));
      y.domain([0, d3.max(educationData, function(d) { return d.count; })]);
  
      svg.append("text")
      .attr("class", "x-axis-label")
      .attr("transform", "translate(" + (width / 2 + 150) + " ," + (height + margin.top + 40) + ")")
      .style("text-anchor", "middle")
      .text("EDUCATION");
  
      svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 90)
        .attr("x",0 - (500 / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .attr("class", "axis-label")
        .text("COUNT");
  
      g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));
  
      g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y).ticks(10))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Count");
        
  
      g.selectAll(".bar")
      .data(educationData)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.education); })
      .attr("y", function(d) { return y(d.count); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.count); })
      .attr("fill", "green"); // Add this line to make the bars green
  
      console.log(svg.html()); // Log the SVG contents to the console
    },
    error: function(error) {
      console.error(error);
    }
  });
  
  
  
  
  $.ajax({
    url: "/SourceCode/claims",
    type: "GET",
    dataType: "json",
    success: function(data) {
      // Set up the width and height of the SVG container
      var width = 600;
      var height = 500;
  
      // Create the SVG container
      var svg = d3.select(".chart3")
        .append("svg")
        .attr("width", width)
        .attr("height", height);
  
      // Calculate the number of male and female drivers
      var numMale = data.filter(function(d) { return d.GENDER === "M"; }).length;
      var numFemale = data.filter(function(d) { return d.GENDER === "z_F"; }).length;
      
      // Create the data array for the pie chart
      var pieData = [
        { label: "Male", value: numMale },
        { label: "Female", value: numFemale }
      ];
      
      // Define the color scale
      var colorScale = d3.scaleOrdinal()
        .domain(pieData.map(function(d) { return d.label; }))
        .range(["#66c2a5", "#fc8d62"]);
      
      // Define the pie layout
      var pie = d3.pie()
        .value(function(d) { return d.value; });
      
      // Create the arc generator
      var arc = d3.arc()
        .innerRadius(0)
        .outerRadius(Math.min(width, height) / 2 - 10);
      
      // Add the slices to the pie chart
      var slices = svg.selectAll("slice")
        .data(pie(pieData))
        .enter()
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
      
      // Add the arcs to the slices
      slices.append("path")
        .attr("d", arc)
        .attr("fill", function(d) { return colorScale(d.data.label); });
      
      // Add the labels to the slices
      slices.append("text")
        .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
        .attr("text-anchor", "middle")
        .text(function(d) { return d.data.label + " (" + d.data.value + ")"; });
    },
    error: function(error) {
      console.log(error);
    }
  });
  
  
  
  $.ajax({
    url: "/SourceCode/claims",
    type: "GET",
    dataType: "json",
    success: function(data) {
      // Process the data to get income and education levels
      var incomeLevels = data.map(function(d) { return +d.INCOME.replace("$", "").replace(",", ""); });
      var educationLevels = data.map(function(d) { return d.EDUCATION; });
  
      // Set up the heatmap dimensions and scales
      var margin = { top: 50, right: 50, bottom: 50, left: 220 };
      var width = 700 - margin.left - margin.right;
      var height = 500 - margin.top - margin.bottom;
  
      var xScale = d3.scaleLinear()
        .domain([d3.min(incomeLevels), d3.max(incomeLevels)])
        .range([0, width]);
  
      var yScale = d3.scaleBand()
        .domain(educationLevels)
        .range([height, 0])
        .paddingInner(0)
        .paddingOuter(0);
  
      var colorScale = d3.scaleOrdinal()
        .domain(data.map(function(d) { return d.count; }))
        .range(["#ff0000", "#00ff00", "#0000ff", "#ffff00"]);
  
      // Create the heatmap
      var svg = d3.select(".chart4")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
      svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function(d) { return xScale(+d.INCOME.replace("$", "").replace(",", "")); })
        .attr("y", function(d) { return yScale(d.EDUCATION); })
        .attr("width", width / incomeLevels.length)
        .attr("height", yScale.bandwidth())
        .style("fill", function(d) { return colorScale(d.count); });
  
      // Add x-axis
      var xAxis = d3.axisBottom(xScale);
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);
  
      // Add y-axis
      var yAxis = d3.axisLeft(yScale);
      svg.append("g")
      .call(yAxis);
  
      // Add x-axis label
      svg.append("text")
      .attr("class", "x-axis-label")
      .attr("text-anchor", "middle")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom)
      .text("INCOME");
  
      // Add y-axis label
      svg.append("text")
      .attr("class", "y-axis-label")
      .attr("text-anchor", "middle")
      .attr("x", -margin.left)
      .attr("y", height / 2 - 320)
      .attr("transform", "rotate(-90)")
      .text("EDUCATION");
  
    },
    error: function(error) {
      console.log(error);
    }
  });
}












