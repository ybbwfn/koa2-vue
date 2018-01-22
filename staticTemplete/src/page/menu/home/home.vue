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








  }
}
</script>

