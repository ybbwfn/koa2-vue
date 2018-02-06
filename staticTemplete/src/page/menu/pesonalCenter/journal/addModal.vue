<template>
    <div>
        <Modal
            v-model="modalBool" 
            :closable="false" 
            :mask-closable="false"
            title="新增日志！"
            @on-cancel='$emit("addcancel")'
            @on-ok="addModal">
            <Form ref="formData" :model="formData" :rules="ruleData" :label-width="80">
                <FormItem label="标题" prop="title">
                    <Input v-model="formData.title" type="text" placeholder="请输入标题"></Input>
                </FormItem>
                <FormItem label="内容" prop="content">
                    <Input v-model="formData.content" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>
<script>
    export default {
        props: ['modalShow'],
        data() {
            return {
                modalBool: false,
                formData: {
                    content: '',
                    title: ""
                },
                ruleData: {
                    content: [{
                        required: true,
                        message: 'Please enter a personal introduction',
                        trigger: 'blur'
                    }, {
                        type: 'string',
                        min: 5,
                        message: 'Introduce no less than 5 words',
                        trigger: 'blur'
                    }],
                    title: [{
                        required: true,
                        message: '不能为空',
                        trigger: 'blur'
                    }]
                }
            }
        },
        watch: {
            modalShow(val) {
                console.log(val)
                this.modalBool = val; //新增result的watch，监听变更并同步到myResult上
            }
        },
        methods: {
            addModal() {
                this.$refs['formData'].validate((valid) => {
                    if (valid) {
                        this._post("/addJournal", this.formData, (res) => {
                            if (res.success) {
                                this.$emit("addSubmit");
                                this.$Message.success('Success!');
                                this.formData.title = ''
                                this.formData.content = ''
                            }
                        })
                    } else {

                        this.$Message.error('Fail!');
                        this.$emit("addcancel");
                    }
                })
            },
        }
    }
</script>