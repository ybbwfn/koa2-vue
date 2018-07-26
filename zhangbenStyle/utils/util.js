const formatTime = (date,typeStr) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
	if (typeStr=='month'){
		return [year, month].map(formatNumber).join('-')
	} else if (typeStr == 'time'){
		return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
	} else {
		return [year, month,day].map(formatNumber).join('-')
	}

}

// 增加千位符
const formatThousand = num => {
	if (isNaN(num)) {
		throw new TypeError("num is not a number");
	}

	var groups = (/([\-\+]?)(\d*)(\.\d+)?/g).exec("" + num),
		mask = groups[1],            //符号位 
		integers = (groups[2] || "").split(""), //整数部分 
		decimal = groups[3] || "",       //小数部分 
		remain = integers.length % 3;

	var temp = integers.reduce(function (previousValue, currentValue, index) {
		if (index + 1 === remain || (index + 1 - remain) % 3 === 0) {
			return previousValue + currentValue + ",";
		} else {
			return previousValue + currentValue;
		}
	}, "").replace(/\,$/g, "");
	return mask + temp + decimal; 

}
// 去掉千位符
const clearThousand	= num => {
	if(num){
		return (num+'').replace(',','')-0;
	}else{
		return 0;
	}
	
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
	formatThousand: formatThousand,
	clearThousand: clearThousand

}
