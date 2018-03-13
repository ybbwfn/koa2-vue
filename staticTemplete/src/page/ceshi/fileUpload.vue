<template>
    <div>
        <!-- upload  start -->
        <div class="FileTable">
            <!-- 一级 -->
            <div v-for="(group1,index1) in fileList" style="margin-bottom:30px;">
                <h2>{{group1.groupName}}</h2>
                <!-- 二级 -->
                <div v-for="(group2,index2) in group1.subGroup" style="padding:10px 20px">
                    <div class="y-title">{{group2.itemName}}</div>
                    <div class="demo-upload-list" v-for="(item,imgIndex) in group2.requestList">
                        <img :src="item.attachmentUrl+item.fileId" v-if="typeJudge(item.fileId)">
                        <img src="@/assets/img/timg.jpg" v-if="!typeJudge(item.fileId)">
                        <div class="demo-upload-list-cover">
                            <Icon type="ios-eye-outline" v-if="typeJudge(item.fileId)"  @click.native="handleView(item)"></Icon>
                            <a  :href="item.attachmentUrl+item.fileId" download v-else>
                                <Icon type="ios-eye-outline"></Icon>
                            </a>
                            <Icon type="ios-trash-outline" @click.native="handleRemove(item,index1,index2,imgIndex)"></Icon>
                        </div>
                    </div>
                    <Upload
                        :show-upload-list="false"
                        :default-file-list="group2.requestList"
                        :on-success="handleSuccess"
                        :max-size="2048"
                        type="drag"
                        :format="['jpg','jpeg','png','pdf','doc','docx','xls','xlsx','ppt','zip','jar','rar','7z']"
                        :on-format-error="handleFormatError"
                        :on-exceeded-size="handleMaxSize"
                        :before-upload="handleBeforeUpload"
                        action="/common/uploadFile"
                        style="display: inline-block;width:58px;">
                        <div style="width: 58px;height:58px;line-height: 58px;" @click="getIndex(index1,index2)">
                            <Icon type="plus" size="20"></Icon>
                        </div>
                    </Upload>
                </div>
            </div>
            <Modal title="View Image" v-model="visible" style="position:absolute;z-index:999999">
                <img :src="imgUrl" v-show="visible" style="width: 100%">
            </Modal>
        </div>
    </div>
<!-- upload end -->
</template>
    <script>
        import axios from 'axios';
        export default {
            watch:{
                fileList:{
                  handler(val){
                      if(val instanceof Array && val.length>0){
                        this.$emit('getUploadData',this.uoloadSave(val))
                        console.log(val)
                      }

　　　　　　　　　　},
　　　　　　　　　　deep:true
                },
                defaultData:{
                    handler(val){
                        this.getFileData(val)
                    },
                    deep:true
                },
                query:{
                    handler(val){
                        this.fileList=val
                    },
                    deep:true
                    
                }
            },
            props:['query','defaultData'],
            data() {
                return {
                    // upload----start------
                    imgUrl:'',
                    fileList:[],//文件大列表
                    index:'',
                    subIndex:'',
                    imgName: '',
                    visible: false,
                    requestList: [],
                    // upload-----end-----
                }
            },
            methods: {
                // ------upload-------
                uoloadSave(newFileData){
                    var arr=[];  
                    var requestList=[];          
                    for(var list of newFileData){
                        for(var item of list.subGroup){
                            arr.push(item)
                        }
                    }

                    for(var file of arr){
                        requestList.push(...file.requestList)
                    }
                    return requestList;
                },
                getIndex(index,subIndex){
                    this.index=index;
                    this.subIndex=subIndex;
                },
                typeJudge(str){
                    if(str){
                        var testStr=str.split(".")[1];
                        return /^(jpg|jpeg|png)$/.test(testStr)
                    }
                    return false;
                },
                handleView (item) {
                    this.imgName = item.attachmentName;
                    this.imgUrl=item.attachmentUrl+item.fileId;
                    this.visible = true;
                },
                handleRemove (file,index1,index2,imgIndex) {
                    this.fileList[index1].subGroup[index2].requestList.splice(imgIndex,1)
                    // const fileList = this.$refs.upload.fileList;
                    // this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
                },
                handleSuccess (res, file) {
                    let index=this.index;
                    let subIndex=this.subIndex;
                    if(res.success){
                        let data=res.data;
                        data.attachmentType=this.fileList[index].subGroup[subIndex].itemCode;
                        data.scfId=this.$route.query.id;
                        this.fileList[index].subGroup[subIndex].requestList.push(data)
                    }

                },
                handleFormatError (file) {
                    this.$Notice.warning({
                        title: '文件格式不正确',
                        desc: '文件 ' + file.name + ' 格式不正确，请上传后缀为 jpg、png、pdf、doc、docx、xls、xlsx、ppt、zip、jar、rar、7z的文件。'
                    });
                },
                handleMaxSize (file) {
                    this.$Notice.warning({
                        title: 'Exceeding file size limit',
                        desc: 'File  ' + file.name + ' is too large, no more than 2M.'
                    });
                },
                handleBeforeUpload () {
                    // const check = this.requestList.length < 5;
                    // if (!check) {
                    //     this.$Notice.warning({
                    //         title: 'Up to five pictures can be uploaded.'
                    //     });
                    // }
                    // return check;
                },

                getFileData(data){//获取默认数据
                    for(var i=0;i<this.fileList.length;i++){
                        for(var j=0;j<this.fileList[i].subGroup.length;j++){
                            this.fileList[i].subGroup.requestList=[];
                            for(var key in data){
                                if(this.fileList[i].subGroup[j].itemCode===key){
                                    this.fileList[i].subGroup[j].requestList.push(...data[key])
                                }
                            }
                        }
                    }
                    // for(var list of this.fileList){
                    //     for(var item of list.subGroup){
                    //         item.requestList=[];
                    //         for(var i in data){
                    //             if(item.itemCode===i){
                    //                 item.requestList.push(...data[i])
                    //             }
                    //         }
                    //     }
                    // }
                    console.log("----获取数据---")
                    console.log(this.fileList)
                }
            }
        }
    </script>
    <style scoped>
    .FileTable {
        margin-top: 12px;
    }
    .y-title{
        margin-bottom: 20px;
        height: 30px;
        line-height: 30px;
        border-bottom: 1px solid #ccc;
    }
    .demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
    </style>