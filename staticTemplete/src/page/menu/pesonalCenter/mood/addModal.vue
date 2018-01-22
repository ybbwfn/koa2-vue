<template>
    <div class="y-main">
        <Table :data="tableData" :columns="tableColumns"></Table>
        <div style="margin: 10px;overflow: hidden">
            <div class="fl">
                <i-button type="primary">新增</i-button>
            </div>
            <div class="fr">
                <Page :total="total" :current="currentPage" :page-size="pageSize" @on-change="changePage" show-total></Page>
                <div class="ivu-page-options">
                    <div class="ivu-page-options-elevator">
                        跳至页
<Input v-model="pageTo" @on-change="pageToChange" placeholder="Enter something..." style="width: 300px"></Input>

                    </div>
                </div>
            </div>
        </div>
        <Form ref="formData" :model="formData" :rules="ruleData" :label-width="80">
            <FormItem label="心情" prop="content">
                <Input v-model="formData.content" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formData')">提交</Button>
                <Button type="ghost" @click="handleReset('formData')" style="margin-left: 8px">重置</Button>
            </FormItem>
        </Form>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                total:0,
                pageCount:0,
                currentPage:1,
                pageTo:1,
                pageSize:5,
                tableData: [],
                tableColumns: [
                    {
                        title: '内容',
                        key: 'content'
                    },
                    {
                        title: '创建日期',
                        key: 'insert_date'
                    },
                   {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, 'View'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, 'Delete')
                            ]);
                        }
                    }
                ],


                formData: {
                    content: ''
                },
                ruleData: {
                    content: [
                        { required: true, message: 'Please enter a personal introduction', trigger: 'blur' },
                        { type: 'string', min: 5, message: 'Introduce no less than 5 words', trigger: 'blur' }
                    ]
                }
            }
        },
        mounted(){
            this.query();
        },
        watch:{
            pageTo(){
                
            }
        },
        methods: {
            query(){
                let parms = {
                    currentPage:this.currentPage,
                    pageSize:this.pageSize
                }
                this._post("/searchMood",parms ,(res)=>{
                    let data=res.data;
                    this.tableData=data.data;
                    this.total=data.total;
                    this.pageCount = data.pageCount;
                })
            },
            changePage (currentPage) {
                this.currentPage=this.pageTo=currentPage;
                this.query();
            },
            //跳转目标页
            pageToChange() {
                let patrn = /^\d+$/;
                if (patrn.test(this.pageTo) && this.pageTo <= this.pageCount) {
                    this.currentPage = Number(this.pageTo);
                    this.query();
                } else {
                    this.pageTo = "";
                }
            },
            show (index) {
                this.$Modal.info({
                    title: 'User Info',
                    content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
                })
            },
            remove (index) {
                this.data6.splice(index, 1);
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                         this._post("/addMood",this.formData,(res)=>{
                            if(res.success){
                                this.$Message.success('Success!');
                            }
                        })
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
    }
</script>
