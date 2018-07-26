const app = getApp();
Page({
  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function () {
    return {
      title: '账本Style',
      path: '/page/order',
      imageUrl: '../../img/share.png'
    }
  },
  data: {
		person:{},
		date: '2016-09-01',
  },
	bindDateChange(e) {
		console.log('picker发送选择改变，携带值为', e.detail.value)
		this.setData({
			date: e.detail.value
		})
	},
	// 断网检测
	netWatch: function () {
		wx.getNetworkType({
			success: function (res) {
				// 返回网络类型, 有效值：
				// wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
				var networkType = res.networkType
				if (networkType == "none") {
					wx.showToast({
						title: '当前无网络',
						icon: 'none',
						duration: 2000
					})
				}
			}
		})
	},
	onShow:function(){
		// this.netWatch();
		// this.getPersonMessage()
	},
	onPullDownRefresh: function () {
		this.getPersonMessage()
	},
	//获取个人信息
	getPersonMessage(){
		var _this = this;
		wx.request({
			url: app.long + 'biz/api/wxCustRepayment/getCreditLineByCustId',
			method: 'POST',
			data: {},
			header: {
				'content-type': 'application/json;charset=UTF-8',
				'Accept': 'application/json',
				'wxscftoken': wx.getStorageSync('token'),
			},
			success: function (res) {
				let form = res.data.data;
				Object.keys(form).forEach(v => {
					form[v] = app.isNull(form[v])
				})
				_this.setData({
					person: form
				})
				wx.stopPullDownRefresh()
				
			}
		})
	},
	// 注销
	clearLogin(){
		var _this = this;
		console.log(app)
		wx.request({
			url: app.long + 'biz/api/wxCustInfo/unBindOpenId',
			method: 'POST',
			data: {openId : app.globalData.openid},
			header: {
				'content-type': 'application/json;charset=UTF-8',
				'Accept': 'application/json',
				'wxscftoken': wx.getStorageSync('token'),
			},
			success: function (res) {
				if (res.data.success) {
					wx.showToast({
						title: '注销成功',
						icon: 'success',
						duration: 2000
					})
					setTimeout(()=>{
						wx.reLaunch({
							url: '../login/login'
						});
					},1500)
				}
			}
		})
	}
})