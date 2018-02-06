<template>
    <div class="y-main">
        <add-modal @addSubmit="closeAdd" @addcancel="modalShow=false" :modalShow="modalShow "></add-modal>
        <Table @on-selection-change="selecData" :data="tableData" :columns="tableColumns"></Table>
        <div style="margin: 10px;overflow: hidden">
            <div class="fl">
                <i-button type="primary"  @click="modalShow=true">新增</i-button>
                <i-button type="primary" @click="delRow">删除</i-button>

            </div>
            <div class="fr">
                <Page 
                :total="total" 
                :current="currentPage" 
                :page-size="pageSize" 
                :page-size-opts="[5,10, 20, 30, 40]"
                @on-change="changePage" 
                @on-page-size-change="pageSizeChange"
                show-total
                show-sizer></Page>
                <div class="ivu-page-options">
                    <div class="ivu-page-options-elevator">
                        跳至 <Input v-model="pageTo" @on-blur="pageToChange" style="width: 68px"></Input>页
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
    import addModal from "./addModal";
    export default {
        data() {
            return {
                checkList: [], //选中的数据
                modalShow: false,
                total: 0,
                pageCount: 0, //页数
                currentPage: 1,
                pageTo: 1,
                pageSize: 10,
                tableData: [],
                tableColumns: [{
                    type: 'selection',
                    width: 60,
                    align: 'center'
                }, {
                    title: '内容',
                    key: 'content'
                }, {
                    title: '创建日期',
                    key: 'insert_date'
                }, {
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
                }],
            }
        },
        components: {
            addModal
        },
        mounted() {
            this.query();
        },
        methods: {
            query() {
                let parms = {
                    currentPage: this.currentPage,
                    pageSize: this.pageSize
                }
                this._post("/searchMood", parms, (res) => {
                    let data = res.data;
                    this.tableData = data.data;
                    this.total = data.total;
                    this.pageCount = data.pageCount;
                })
            },
            closeAdd() {
                this.modalShow = false;
                this.query();
            },
            // 选择的数据
            selecData(data) {
                this.checkList = data;
            },
            // 每页条数
            pageSizeChange(val) {
                this.pageSize = val;
                this.query()
            },
            // 翻页
            changePage(currentPage) {
                this.currentPage = this.pageTo = currentPage;
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
            show(index) {
                this.$Modal.info({
                    title: 'User Info',
                    content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
                })
            },
            // 删除单条
            remove(index) {
                this.$Modal.confirm({
                    title: '你确定删除这条记录吗？',
                    content: '删除不可恢复，请确认是否删除！',
                    onOk: () => {
                        // var params=JSON.stringify([this.tableData[index].id]);
                        this._get("/delMood", {
                            id: this.tableData[index].id
                        }, (res) => {
                            if (res.success) {
                                this.query();
                                this.$Message.success("删除成功！")
                            }
                        })

                    },
                });
            },
            // 删除多条
            delRow() {
                if (this.checkList.length > 0) {
                    this.$Modal.confirm({
                        title: '你确定删除所选记录吗？',
                        content: '删除不可恢复，请确认是否删除！',
                        onOk: () => {
                            var arr = this.checkList.map((v) => {
                                return v.id
                            })
                            var params = JSON.stringify(arr);
                            this._get("/delMood", {
                                id: params
                            }, (res) => {
                                if (res.success) {
                                    this.checkList = [];
                                    this.query();
                                    this.$Message.success("删除成功！")
                                }
                            })

                        },
                    });
                } else {
                    this.$Message.info("请选择要删除的记录！")
                }
            }
        }
    }
</script>