<template>
    <div>
        <Modal
            v-model="modalBool" 
            :closable="false" 
            :mask-closable="false"
            title="请输入你要记住的事情！"
            @on-cancel='$emit("addcancel")'
            @on-ok="addModal">
            <Form ref="formData" :model="formData" :rules="ruleData" :label-width="80">
                <FormItem label="心情" prop="content">
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
                    content: ''
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
                        this._post("/addMemo", this.formData, (res) => {
                            if (res.success) {
                                this.$emit("addSubmit");
                                this.$Message.success('Success!');
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