<template>
  <div>home</div>
</template>
<script>
export default {
  mounted(){
    var obj={
      title:'Fred',
      content:'Flintstone',
      userid:"1",
      insert_date:"1",
      del_flag:"0",
    };

    // axios.post('/api/addJournal',obj)
    // .then(function(res){
    //   console.log(res);
    // })
    // .catch(function(err){
    //   console.log(err);
    // });


    
    // var id=9;
    // axios.get('/api/delJournal?id='+id)
    // .then(function(res){
    //   console.log(res);
    // })
    // .catch(function(err){
    //   console.log(err);
    // });
  }
}
</script>

