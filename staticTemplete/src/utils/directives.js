// input为空添加placeholder
export var yEmpty = function (newValue, oldValue) {
    this.el.onblur=()=>{
        if(newValue==''){
            this.el.placeholder="此项不能为空"
        }
    }
}
// input为空添加placeholder
export var yNumber = function (newValue, oldValue) {
    this.el.onblur=()=>{
        if(newValue=='' || newValue<1){
            this.el.value=1;
        }
    }
}
//点击返回
export var yBack = {
    bind: function () {
        this.el.onclick=function(){
            window.history.back();
            window.scrollTo(0, 0);
        } 
    }
}