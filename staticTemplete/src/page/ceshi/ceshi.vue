

<template>
<div>
    <Button type="primary" @click="uploadModal = true">uploadModal</Button>
    <Button type="primary" @click="twoBool = true">twoBool</Button>
    <one :uploadModal='uploadModal' @modalOneChange="modalOneChange"></one>
    <two :twoBool='twoBool' @twoBoolChange="twoBoolChange"></two>
    <file-upload :data='fileData' @getUploadData="getUploadData"></file-upload>
</div>
</template>
<script>
import one from 'page/ceshi/one'
import two from 'page/ceshi/two'
import fileUpload from 'page/ceshi/upload'
export default {
    data(){
        return {
            uploadModal: false,
            twoBool:false,
            fileData:[],
        }
    },
    components:{one,two,fileUpload},
    methods:{
            ok () {
                this.$Message.info('Clicked ok');
            },
            cancel () {
                this.$Message.info('Clicked cancel');
            },
            modalOneChange(val){
                this.uploadModal=val
            },
            twoBoolChange(val){
                this.twoBool    =val
            },
            getUploadData(val){
                console.log("getUploadData")
                console.log(val)
                console.log(this.fileData)

            }
        
    }
}
</script>



