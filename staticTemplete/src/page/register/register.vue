<template>
    <div>
        <loginbg></loginbg>
        <div class="tyg-div-denglv">
            <div class="tyg-div-form">
                <h2 class="mar-b5">注册</h2>
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
                    <FormItem prop="repeatpass">
                        <Input type="password" v-model="login.repeatpass" placeholder="repeatpass">
                            <Icon type="ios-locked-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem>
                        <Button long type="primary" @click="handleSubmit('login')">注册</Button>
                        <Button long type="error" class="mar-t20"> 
                            <router-link to="/login">已有账号，去登录</router-link>
                        </Button>
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
                pass: '',
                repeatpass:''
            },
            ruleLogin: {
                name: [
                    { required: true, message: '请输入账号', trigger: 'blur' }
                ],
                pass: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { type: 'string', min: 6, message: '不得小于6', trigger: 'blur' }
                ],
                repeatpass: [
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
            this._post("/addUser",this.login,(res)=>{
                console.log(res)
                if(res.success){
                    this.$Message.success('Success!');
                    this.$router.push("/login")
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


        .bg{
            position: absolute;
            top:0;
            left: 0;
            bottom:0;
            margin: 0;
            width: 100%;
            // cursor: none;
            background: black;
            background: linear-gradient(to bottom, #000000 0%, #5788fe 100%);
            overflow: hidden;
        }
        
        .filter {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            background: #fe5757;
            animation: colorChange 30s ease-in-out infinite;
            animation-fill-mode: both;
            mix-blend-mode: overlay;
        }
        
        @keyframes colorChange {
            0%,
            100% {
                opacity: 0;
            }
            50% {
                opacity: .9;
            }
        }
        
        .landscape {
            position: absolute;
            bottom: 0px;
            left: 0;
            width: 100%;
            height: 100%;
            /*background-image:url(https://openclipart.org/image/2400px/svg_to_png/250847/Trees-Landscape-Silhouette.png);
        */
            // background-image: url('img/xkbg.png');
            background-size: 1000px 250px;
            background-repeat: repeat-x;
            background-position: center bottom;
        }
</style>

