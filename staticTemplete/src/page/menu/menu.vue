<template>
    <div>
        <!-- 左 -->
        <div class="y-left">
            <div class="menu-title">
                <img src="~assets/img/1.jpg" alt="">
            </div>
            <Menu @on-select="menuSelect" :active-name="activeName" width="auto" theme="dark" accordion>
                <template v-for="item in menuList">
                    <MenuItem v-if="!item.children" :name="item.path">
                        <Icon type="document-text"></Icon>
                        {{item.meta.title}}
                    </MenuItem>
                    <Submenu v-else :name="item.path">
                        <template slot="title">
                            <Icon type="ios-paper"></Icon>
                            {{item.meta.title}}
                        </template>
                        <template v-for="childrenList in item.children">
                            <MenuItem :name="childrenList.path">{{childrenList.meta.title}}</MenuItem>
                        </template>
                    </Submenu>
                </template>
            </Menu>
        </div>
        <!-- 右 -->
        <div class="y-right">
            <!-- header页头 -->
   
                <Row class="y-header">
                    <i-col :xs="16">
                        <i-button type="text" icon="navicon" size="large" class="font30"></i-button>
                        <div class="y-crumb">
                            <Breadcrumb>
                                <Breadcrumb-item href="/">首页</Breadcrumb-item>
                                <Breadcrumb-item v-for="item in crumbList" :href="item.path" :key="item.path">
                                    {{item.meta.title}}
                                </Breadcrumb-item>
                            </Breadcrumb>
                        </div>
                    </i-col>
                    <i-col :xs="8">
                        <div class="y-infomation">
                            <Dropdown trigger="click" style="margin-left: 20px">
                                <a href="javascript:void(0)">
                                    登录/登出
                                    <Icon type="arrow-down-b"></Icon>
                                </a>
                                <Dropdown-menu slot="list">
                                    <Dropdown-item>个人中心</Dropdown-item>
                                    <Dropdown-item>退出登录</Dropdown-item>
                                </Dropdown-menu>
                            </Dropdown>
                        </div>
                    </i-col>
                </Row>
            <!-- tab标签 -->
            <div class="y-tab">
                <router-link to="/home">
                    <Tag type="dot" closable color="blue">首页</Tag>
                </router-link>
                <template v-for="(item,index) in tagList">
                    <Tag type="dot" closable @on-close="tagClose(index)">
                        <router-link :to="item.path" >{{item.meta.title}}</router-link>
                    </Tag>
                </template>

            </div>
            <!-- main主体 -->
            <div class="y-main-wrap">
                <router-view/>
            </div>
        </div>
    </div>
</template>
<script>
import { appRouter } from '@/router/router';
export default {
  data() {
    return {
        crumbList:[],//面包屑
        menuAll:[],
        iconSize:"18",
        menuList:appRouter
    };
  },
  methods: {
    getMenuAll(){
        this.menuAll=[];
        for(var item of this.menuList){
            if(item.children){
                this.menuAll.push(...item.children)
            }else{
                this.menuAll.push(item)
            }
        }
    },
    tagClose(index){
        this.$store.commit("delMenu",index)
    },
    menuSelect(selectList) {
        var checkRouter=this.menuAll.filter((v,i) => (selectList==v.path))[0]
        this.$store.commit("pushMenu",checkRouter)
        this.$router.push(checkRouter.path)
    }
  },
  computed:{
    tagList:function(){
        return this.$store.state.menu.menuList
    },
    activeName:function(){
        return this.$route.path;
    }
  },
  watch:{
      activeName(newPath){
        for(var i=0;i<this.menuList.length;i++){
            if(!this.menuList[i].children){
                if(this.menuList[i].path==newPath){
                    this.crumbList=[this.menuList[i]];
                    break;
                }
            }else{
                var childrenList=this.menuList[i].children;
                for(var j=0;j<childrenList.length;j++){
                    if(childrenList[j].path==newPath){
                        this.crumbList=[this.menuList[i],childrenList[j]]
                        break;
                    }
                }
            }
        }
      }
  },
  mounted(){
      this.getMenuAll();
  }
};
</script>

<style lang="scss" scoped>
$menuColor:#494E59;
$menuWidth:180px;
$bgColor:#F1F0EE;
    .y-left{
        width: $menuWidth;
        position: absolute;
        top: 0;
        left: 0;
        bottom:0;
        background: $menuColor;
        .menu-title{
            height: 60px;
            background: $menuColor;
            padding:8px;
            img{
                height: 44px;
                width: auto;
                
            }
        }
    }
    .y-right{
        margin-left: $menuWidth;
    }
    .y-header{
        height: 60px;
        background: #fff;
        position: relative;
        box-shadow: 0 2px 1px 1px hsla(0,0%,39%,.1);
        .y-crumb{
            display: inline-block;
        }
        .y-infomation{
            height: 60px;
            line-height: 60px;
            text-align: right;
            margin-right: 20px;            
        }
    }
    .y-main-wrap,.y-tab{
        background-color: $bgColor;
    }
    .y-tab{
        height: 36px;
        padding:2px 10px;
        overflow: hidden;
    }
    .y-main-wrap{
        position: absolute;
        top: 100px;
        left: $menuWidth;
        right: 0;
        bottom: 0;
        padding:10px;
        overflow: auto;
    }

</style>

