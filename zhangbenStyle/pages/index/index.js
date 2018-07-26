// pages/index/index.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
	data: {
		accountType:0,
		index: 0,
		money:'0',
		array: ['衣', '食', '住', '行','其他'],
		date: '2016-09-01',
		desc:'',
	},

	radioChange(e) {
		this.setData({
			accountType: e.detail.value
		})
	},
	bindKeyInput(e) {
		// let bool = (this.data.money + '').split('.')[1];
		// if (bool && bool.length > 2) {
		// 	wx.showToast({
		// 		title: '小数不得超过2位',
		// 		icon: 'none',
		// 		duration: 1000
		// 	})
		// 	return;
		// }

		// if (this.data.money == '' || isNaN(this.data.money)) {
		// 	wx.showToast({
		// 		title: '请输入正确的金额',
		// 		icon: 'none',
		// 		duration: 1000
		// 	})
		// 	return;
		// }
		this.setData({
			money: e.detail.value
		})
		console.log(this.data.money)
	},
	bindPickerChange(e) {
		console.log('picker发送选择改变，携带值为', e.detail.value)
		this.setData({
			index: e.detail.value
		})
	},
	bindDateChange(e){
		console.log('picker发送选择改变，携带值为', e.detail.value)
		this.setData({
			date: e.detail.value
		})
	},
	bindTextAreaBlur(e){
		console.log(e.detail.value)
	},
	bindDesc(e){
		this.setData({ desc: e.detail.value})
	},
	onConfirm(){
		let obj = {};
		obj.accountType = this.data.accountType;
		obj.money=this.data.money;
		obj.type = this.data.array[this.data.index];
		obj.createdate=this.data.date;
		obj.des=this.data.desc;
		obj.openid = wx.getStorageSync('openid')

		wx.request({
			url: 'http://127.0.0.1:3000/api/addAccount', //仅为示例，并非真实的接口地址
			method:'POST',
			data: obj,
			success: function (res) {
				console.log(res.data)
			}
		})
	},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		var date = util.formatTime(new Date()) 
		this.setData({ date: date })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})