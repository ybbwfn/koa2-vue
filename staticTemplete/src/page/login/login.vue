<template>
    <div>
        <loginbg></loginbg>
        <div class="tyg-div-denglv">
            <div class="tyg-div-form">
                <h2 class="mar-b5">登录</h2>
                <Form ref="login" :model="login" :rules="ruleLogin">
                    <FormItem prop="name">
                        <Input type="text" v-model="login.name" placeholder="Username">
                            <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem prop="pass">
                        <Input type="password" v-model="login.pass" placeholder="pass">
                            <Icon type="ios-locked-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem>
                        <Button long type="primary" @click="handleSubmit('login')">登录</Button>
                        <router-link to="/register">
                            <Button long type="error" class="mar-t20 iv-btn-fff"> 
                                没有账号，去注册
                            </Button>
                        </router-link>
                    </FormItem>
                </Form>
            </div>
        </div>
    </div>
</template>
<script>
import loginbg from 'components/loginbg/loginbg'
export default {
    data(){
        return {
            login: {
                name: '',
                pass: ''
            },
            ruleLogin: {
                name: [
                    { required: true, message: '请输入账号', trigger: 'blur' }
                ],
                pass: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { type: 'string', min: 6, message: '不得小于6', trigger: 'blur' }
                ]
            }
        }
    },
    components:{loginbg},
    methods:{
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.signIn();
                    
                } else {
                    this.$Message.error('Fail!');
                }
            })
        },
        signIn(){
            this._post("/signin",this.login,(res)=>{
                if(res.success){
                    this.$store.commit("changeSession",res.data)
                    this.$Message.success('Success!');
                    this.$router.push("/home")
                }
            })
        }
        
    }
}
</script>

<style lang="scss" scoped>
	.tyg-div-denglv{
		z-index:1000;float:right;position:absolute;right:3%;top:10%;
	}
	.tyg-div-form{
        padding:40px 20px;
        border-radius: 10px;
		background-color: rgba(131, 158, 247, 0.3);
		width:300px;
		height:auto;
		margin:120px auto 0 auto;
		color:#2ec0f6;
	}      
</style>

