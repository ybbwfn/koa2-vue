<template>
  <div style="background:#ccc">
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
  data(){
    return {

    }
  },
  mounted(){
    // ceshi1
    this.$d3
		.select("#d3-1")
		.selectAll("p")
		.style("color",'red')
		.text("www.ourd3js.com");


	// ceshi2 ---- datum
	var str='ceshi2-datum';
	var ceshi2=this.$d3.select("#d3-2").selectAll("p")
		.datum(str)
		.text(function(d,i){
			return d
		})

		
    // ceshi3 ---- data
    var arr=['ceshi3-data1','ceshi3-data2','ceshi3-data3'];
    var ceshi3=this.$d3.select("#d3-3").selectAll("p")
		.data(arr)
			.text(function(d,index){
				return d;
			})
	// ceshi4 ---- dom增删改查
	var arr=['ceshi-1','ceshi-2','ceshi-4'];
	var ceshi4=this.$d3.select("#d3-4");
		ceshi4.append("p").text('ceshi4--增加p标签');
		ceshi4.insert("span","p").text('cehshi4---p前加span');
		setTimeout(()=>{
			ceshi4.insert("b","p").text(' ````````cehshi4---p前加b');
			ceshi4.select("p").remove()
		})
	// ceshi5----画图
	 //选择文档中的body元素
	var width = 300;	//画布的宽度
	var height = 300;	//画布的高度

	var svg = this.$d3.select("#d3-5")				//选择文档中的body元素
				.append("svg")				//添加一个svg元素
				.attr("width", width)		//设定宽度
				.attr("height", height);	//设定高度
	
	var dataset = [ 250 , 210 , 170 , 130 , 90 ];
	
	var rectHeight = 25;	//每个矩形所占的像素高度(包括空白)

	svg.selectAll("rect")
		  .data(dataset)
		  .enter()
		  .append("rect")
		  .attr("x",20)
		  .attr("y",function(d,i){
				return i * rectHeight;
		  })
		  .attr("width",function(d){
		   		return d;
		  })
		  .attr("height",rectHeight-2)
		  .attr("fill","steelblue");
	



 var width = 960;  
    var height = 600;  
  
    var svg = this.$d3.select(".correlation")  
                .attr("width",width)  
                .attr("height",height);  
  
    var poolStates = [{"name":"A","size":160,"CPU":0.5},  
                      {"name":"B","size":300,"CPU":0.18},  
                      {"name":"C","size":100,"CPU":0.32},  
                      {"name":"D","size":80,"CPU":0.8}];  
      
    var relations = [{"source":"A","target":"B","correlation":0.8},  
                     {"source":"A","target":"C","correlation":0.5},  
                     {"source":"A","target":"D","correlation":-0.1}];  
  
    //使用force layout  
    var force =this.$d3.layout.force().charge(-1500).linkDistance(200).size([width,height]);  
  
    //force.links默认的source和target是其在nodes中的index,此次自定义为他们的name.  
    var edges = [];  
    relations.forEach(function(e){  
      var sourceNode = poolStates.filter(function(n){  
        return n.name === e.source;  
      })[0];  
      var targetNode = poolStates.filter(function(n){  
        return n.name === e.target;  
      })[0];  
  
      edges.push({  
        source: sourceNode,  
        target: targetNode,  
        correlation: e.correlation  
      });  
    });  
  
  
    //加载数据  
    force.nodes(poolStates)  
         .links(edges)  
         .start();  
  
    var colors=this.$d3.scale.category20c();  
  
    //根据关联强度绘制线的粗细  
    var strokeScale = this.$d3.scale.linear()  
                     .domain([0,d3.max(edges,function(d){  
                            return Math.abs(d.correlation);})])  
                     .range([1.5,4])  
                     .nice();  
  
    //根据集群大小绘制半径的大小  
    var radiusScale = this.$d3.scale.linear()  
                      .domain([0,d3.max(poolStates,function(d){return d.size;})])  
                      .range([1,30]);  
  
      
    //绘制连线  
    var link = svg.selectAll("line")  
                  .data(edges)  
                  .enter().append("line")  
                  .attr("class","link")  
                  .style("stroke",function(d){  
                     if(d.correlation > 0){  
                        return "#FFE800";  
                     }  
                     return "#530FAD";  
                  })  
                  .style("stroke-width",1.5)  
                  .style("stroke-opacity",0);  
  
    var link_text = svg.selectAll(".link_text")  
                       .data(edges)  
                       .enter()  
                       .append("text")  
                       .attr("class","link_text")  
                       .text(function(d){  
                          return d.correlation;  
                       });  
  
    //绘制节点  
    var node = svg.selectAll("circle")  
                  .data(poolStates)  
                  .enter()  
                  .append("circle")  
                  .attr("class","node")  
                  .attr("r",function(d){return radiusScale(d.size);})  
                  .style("fill",function(d){  
                     if(d.CPU>0.5){  
                        return "#FF4900";  
                     }  
                     return "#00AF64";})  
                  .on("mouseover",function(d,i){d.show = true;})  
                  .on("mouseout",function(d,i){d.show = false;})  
                  .call(force.drag);  
  
    //绘制文字  
    var text_dx = -20;  
    var text_dy = 20;  
  
    var node_text = svg.selectAll(".node_text")  
                      .data(poolStates)  
                      .enter()  
                      .append("text")  
                      .attr("class","node_text")  
                      .attr("dy",".3em")  
                      .attr("dx","-.4em")  
                      .on("mouseover",function(d,i){d.show = true;})  
                      .on("mouseout",function(d,i){d.show = false;})  
                      .text(function(d){return d.name});  
  
      node.append("title")    
        .text(function(d) { return "pool: " + d.name+" size: "+d.size+" CPU usage: "+d.CPU;});    
  
      force.on("tick",function(){  
  
        node.attr("cx", function(d) { return d.x; })  
            .attr("cy", function(d) { return d.y; });  
  
        node_text.attr("x",function(d){ return d.x });  
        node_text.attr("y",function(d){ return d.y });  
  
        link.attr("x1", function(d) { return d.source.x;})  
            .attr("y1", function(d) { return d.source.y; })  
            .attr("x2", function(d) { return d.target.x; })  
            .attr("y2", function(d) { return d.target.y; });  
  
        link_text.attr("x",function(d){ return (d.source.x + d.target.x) / 2 ; });  
        link_text.attr("y",function(d){ return (d.source.y + d.target.y) / 2 ; });  
  
        link_text.style("fill-opacity",function(d){  
          return d.source.show || d.target.show ? 1.0 : 0.0 ;  
        });  
  
        link.style("stroke-width",function(d){  
          return d.source.show || d.target.show ? strokeScale(d.correlation) : 1;  
        });  
  
        link.style("stroke-opacity",function(d){  
          return d.source.show || d.target.show ? 1 : 0;  
        });  
  
      });  








  }
}
</script>

