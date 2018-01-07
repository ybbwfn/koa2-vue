<template>
	<div class="y-main">
		<i-form v-ref:form-validate :model="formValidate" :rules="ruleValidate" :label-width="80">
			<Form-item label="心情" prop="desc">
				<i-input :value.sync="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></i-input>
			</Form-item>
			<Form-item>
				<i-button type="primary" @click="handleSubmit('formValidate')">提交</i-button>
				<i-button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</i-button>
			</Form-item>
		</i-form>
	</div>
</template>
<script>
    export default {
        data () {
            return {
                formValidate: {
                    desc: ''
                },
                ruleValidate: {
                    desc: [
                        { required: true, message: '请输入个人介绍', trigger: 'blur' },
                        { type: 'string', min: 20, message: '介绍不能少于20字', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('提交成功!');
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
    }
</script>
