<template>
    <div>
        <file-upload :query='group1' :default-data="defaultFile1" @getUploadData="getUploadData1"></file-upload>
        <file-upload :query='group2' :default-data="defaultFile2" @getUploadData="getUploadData2"></file-upload>
        <div slot="footer" style="text-align:center">
            <Button type="primary" @click="save">保存</Button>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    import fileUpload from '@/components/fileUpload/fileUpload'
    export default {
        props: ['pageStateBool'],
        components:{fileUpload},
        data() {
            return {
                uploadFlag:true,
                personData:{},
                company:{},
                applyCreditLine:'',
                // upload----start------
                group1:[],
                defaultFile1:[],
                group2:[],
                defaultFile2:[],
                // upload-----end-----
            }
        },
        methods: {
            save(){
                // 附件
                if(this.personData.length==0){
                    this.$Message.info("请上传附件！")
                    return;
                }
                if(this.company.length==0){
                    this.$Message.info("请上传附件！")
                    return;
                }
                let params={
                    applyCreditLine: this.applyCreditLine,
                    applyId: this.$route.query.id,
                    attachmentRequestList:[...this.personData,...this.company]
                }
                axios.post('custFile/saveScfAttachmentList', params).then(res => {
                    if (res.success) {
                        this.$Message.info("保存成功！");
                    } else {
                        this.$Message.error("请求失败！")
                    }
                });
            },
            // ------upload-------
            getUploadData1(val){//担保企业附件
                this.personData=val
            },
            getUploadData2(val){//担保企业附件
                this.company=val
            },

            getTypeList(){//附件种类
                //0480 -- 实际控制人及配偶
                //0481 -- 公司信息
                var param1={
                    "applyCreditLine": this.applyCreditLine,
                    "groupCode": "0480"
                }
                axios.post('custFile/getSecondFileType',param1).then(res => {
                    if (res.success) {
                        //groupName groupCode
                        this.group1=res.data;
                        if(this.group1 instanceof Array){
                            this.group1.forEach((item)=>{
                                axios.post('custFile/getThirdFileType',{groupCode:item.groupCode,applyCreditLine:this.applyCreditLine}).then(res => {
                                    if (res.success) {
                                        var data=res.data.map((v)=>{
                                            v.requestList=[]
                                            return v;
                                        })
                                        this.$set(item,'subGroup',data)
                                    }
                                });
                            })
                        }
                        this.getFileData();
                    }
                })
                //0480 -- 实际控制人及配偶
                //0481 -- 公司信息
                var param2={
                    "applyCreditLine": this.applyCreditLine,
                    "groupCode": "0481"
                }
                axios.post('custFile/getSecondFileType',param2).then(res => {
                    if (res.success) {
                        //groupName groupCode
                        this.group2=res.data;
                        if(this.group2 instanceof Array){
                            this.group2.forEach((item)=>{
                                axios.post('custFile/getThirdFileType',{groupCode:item.groupCode,applyCreditLine:this.applyCreditLine}).then(res => {
                                    if (res.success) {
                                        var data=res.data.map((v)=>{
                                            v.requestList=[]
                                            return v;
                                        })
                                        this.$set(item,'subGroup',data)
                                    }
                                });
                            })
                        }
                        this.getFileData();
                    }
                })


            },
            getFileData(){

                if(this.uploadFlag){
                    setTimeout(()=>{
                        let params={
                            "applyCreditLine": this.applyCreditLine,
                            "applyId": this.$route.query.id
                        }
                        axios.post('custFile/queryAttListByApplyId', params).then(res => {
                            if (res.success) {
                                this.defaultFile1=res.data
                                setTimeout(()=>{
                                    this.defaultFile2=res.data
                                },3000)
                            } else {
                                this.$Message.error("请求失败！")
                            }
                        });
                    },3000)

                    this.uploadFlag=false;
                }
                
            }
        },
        mounted () {
            var grade=window.localStorage.getItem('applyCreditLine')/10000;
            if(grade<50){
                this.applyCreditLine=1
            }else if(grade<300){
                this.applyCreditLine=2
            }else{
                this.applyCreditLine=3
            }
            ///common/uploadFile
            this.getTypeList();
            this.getFileData();
        },


    }
</script>
