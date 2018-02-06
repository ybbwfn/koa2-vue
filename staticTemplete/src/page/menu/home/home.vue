<template>
  <div style="border:1px solid #ccc">
	  <h1>home</h1>
	  <Row>
		  <i-col span="6">
			<div id="d3-1"><p>1111</p><p>2222</p></div>
			<div id="d3-2"><p>1111</p><p>2222</p></div>
			<div id="d3-3"><p>1111</p><p>2222</p></div>
			<div id="d3-4"></div>
		  </i-col>
		  <i-col span="6">
				<div id="d3-5">
				</div>
		  </i-col>
	  </Row>
    
	<div class="correlation"></div>
    <div class="node_text"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    // ceshi1
    this.$d3
      .select("#d3-1")
      .selectAll("p")
      .style("color", "red")
      .text("www.ourd3js.com");

    // ceshi2 ---- datum
    var str = "ceshi2-datum";
    var ceshi2 = this.$d3
      .select("#d3-2")
      .selectAll("p")
      .datum(str)
      .text(function(d, i) {
        return d;
      });

    // ceshi3 ---- data
    var arr = ["ceshi3-data1", "ceshi3-data2", "ceshi3-data3"];
    var ceshi3 = this.$d3
      .select("#d3-3")
      .selectAll("p")
      .data(arr)
      .text(function(d, index) {
        return d;
      });
    // ceshi4 ---- dom增删改查
    var arr = ["ceshi-1", "ceshi-2", "ceshi-4"];
    var ceshi4 = this.$d3.select("#d3-4");
    ceshi4.append("p").text("ceshi4--增加p标签");
    ceshi4.insert("span", "p").text("cehshi4---p前加span");
    setTimeout(() => {
      ceshi4.insert("b", "p").text(" ````````cehshi4---p前加b");
      ceshi4.select("p").remove();
    });

    var nodes = [
      { name: "桂林0" },
      { name: "广州1" },
      { name: "厦门2" },
      { name: "杭州3" },
      { name: "上海4" },
      { name: "青岛5" },
      { name: "天津6" }
    ];

    var edges = [
      { source: 0, target: 1 },
      { source: 0, target: 2 },
      { source: 0, target: 3 },
      { source: 1, target: 4 },
      { source: 1, target: 5 },
      { source: 1, target: 6 }
    ];

    var width = 400;
    var height = 400;

    let d3 = this.$d3;
    var svg = d3
      .select("#d3-5")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    var force = d3.layout
      .force()
      .nodes(nodes) //指定节点数组
      .links(edges) //指定连线数组
      .size([width, height]) //指定范围
      .linkDistance(50) //指定连线长度
      .charge(-400); //相互之间的作用力

    force.start(); //开始作用

    console.log(nodes);
    console.log(edges);

    //添加连线
    var svg_edges = svg
      .selectAll("line")
      .data(edges)
      .enter()
      .append("line")
      .style("stroke", "#ccc")
      .style("stroke-width", 1);

    var color = d3.scale.category20();
    //添加节点
    var svg_nodes = svg
      .selectAll("circle")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("r", 20)
      .style("fill", function(d, i) {
        return color(i);
      })
      .call(force.drag); //使得节点能够拖动

    //添加描述节点的文字
    var svg_texts = svg
      .selectAll("text")
      .data(nodes)
      .enter()
      .append("text")
      .style("fill", "black")
      .attr("dx", 20)
      .attr("dy", 8)
      .text(function(d) {
        return d.name;
      });

    force.on("tick", function() {
		//对于每一个时间间隔
		//更新连线坐标
		svg_edges
			.attr("x1", function(d) {
			return d.source.x;
			})
			.attr("y1", function(d) {
			return d.source.y;
			})
			.attr("x2", function(d) {
			return d.target.x;
			})
			.attr("y2", function(d) {
			return d.target.y;
			});

		//更新节点坐标
		svg_nodes
			.attr("cx", function(d) {
			return d.x;
			})
			.attr("cy", function(d) {
			return d.y;
			});

		//更新文字坐标
		svg_texts
			.attr("x", function(d) {
			return d.x;
			})
			.attr("y", function(d) {
			return d.y;
			});
    });
  }
};
</script>

