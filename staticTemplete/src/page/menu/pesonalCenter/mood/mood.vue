<template>
    <Form ref="formData" :model="formData" :rules="ruleData" :label-width="80">
        <FormItem label="心情" prop="content">
            <Input v-model="formData.content" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formData')">提交</Button>
            <Button type="ghost" @click="handleReset('formData')" style="margin-left: 8px">重置</Button>
        </FormItem>
    </Form>
</template>
<script>
    export default {
        data () {
            return {
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
        methods: {
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
