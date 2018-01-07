//返回年月日 时分秒
export var formatDate = function (date) {
	let today = new Date(date)
	let year = today.getFullYear()
	let month = ('0' + (today.getMonth() + 1)).slice(-2)
	let day = ('0' + today.getDate()).slice(-2)
	let hour = today.getHours()
	let minute = today.getMinutes()
	let second = today.getSeconds()
	return `${year}-${month}-${day} ${hour}:${minute}:${second}`
};

//返回年月日
export const formatDay = function (date) {
	if(date){
		// let today = new Date(date)
		// console.log(today)
		// let year = today.getFullYear()
		// let month = ('0' + (today.getMonth() + 1)).slice(-2)
		// let day = ('0' + today.getDate()).slice(-2)
		// console.log(`${year}-${month}-${day}`)
		return date.slice(0,10)
	}else{
		return '';
	}
};

// 加点点点······
export var fontSlice = function (str,subNum) {
	if(str.length>2){
		let newStr=str.slice(0,subNum)+'······'
		return `${newStr}`
	}else{
		return  `${str}`
	}
};

//处理以‘;’分割的字符串
export var semicolonFormat = function (str,index) {
	return str.split(";")[index];	
};

// 保留两位小数
export var tofixed = function (str) {
    var number = str.replace(/[^\d.]/g, '')
    return isNaN(number) ? 0 : parseFloat(number.toFixed(2))
	// return `${newStr}`
};



