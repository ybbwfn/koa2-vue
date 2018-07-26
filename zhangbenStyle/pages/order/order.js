// pages/order/order.jss
const app = getApp();
// 路径是wxCharts文件相对于本文件的相对路径
var wxCharts = require('../../utils/wxcharts.js');
var pieChart = null;
var lineChart = null;
Page({
	touchHandler(e) {
		console.log(pieChart.getCurrentDataIndex(e));
		lineChart.showToolTip(e, {
			// background: '#7cb5ec',
			format: function (item, category) {
				return category + ' ' + item.name + ':' + item.data
			}
		});
	},
	createSimulationData() {
		var categories = [];
		var data = [];
		for (var i = 0; i < 10; i++) {
			categories.push('2016-' + (i + 1));
			data.push(Math.random() * (20 - 10) + 10);
		}
		// data[4] = null;
		return {
			categories: categories,
			data: data
		}
	},
	updateData() {
		var simulationData = this.createSimulationData();
		var series = [{
			name: '成交量1',
			data: simulationData.data,
			format: function (val, name) {
				return val.toFixed(2) + '万';
			}
		}];
		lineChart.updateData({
			categories: simulationData.categories,
			series: series
		});
	},
	onLoad: function (e) {
		var date = new Date().getFullYear() + '-' + (new Date().getMonth()-0+1);
		this.setData({date:date})

		this.getData();
		this.getBoxSize()
		var windowWidth = 320;

		try {
			var res = wx.getSystemInfoSync();
			windowWidth = res.windowWidth;
			console.log(windowWidth);
		} catch (e) {
			console.error('getSystemInfoSync failed!');
		}

		pieChart = new wxCharts({
			animation: true,
			canvasId: 'pieCanvas',
			type: 'pie',
			series: [{
				name: '收入',
				data: 30,
			}, {
				name: '支出',
				data: 70,
			}],
			width: windowWidth,
			height: 300,
			// dataLabel: true,
		});

		var simulationData = this.createSimulationData();
		lineChart = new wxCharts({
			canvasId: 'lineCanvas',
			type: 'line',
			categories: simulationData.categories,
			animation: true,
			// background: '#f5f5f5',
			series: [{
				name: '成交量1',
				data: simulationData.data,
				format: function (val, name) {
					return val.toFixed(2) + '万';
				}
			}, {
				name: '成交量2',
				data: [2, 0, 0, 3, null, 4, 0, 0, 2, 0],
				format: function (val, name) {
					return val.toFixed(2) + '万';
				}
			}],
			xAxis: {
				disableGrid: true
			},
			yAxis: {
				title: '成交金额 (万元)',
				format: function (val) {
					return val.toFixed(2);
				},
				min: 0
			},
			width: windowWidth,
			height: 200,
			dataLabel: false,
			dataPointShape: true,
			extra: {
				lineStyle: 'curve'
			}
		});

	},
	data: {
		date:'2017-01',
		selected: '全部',
		winWidth: 0,
		winHeight: 0,
		hasMask: false,//遮罩
		currentTab: 0,  // tab切换  
		currentLabel: '',
		labelListArr: [],
		current: 1,
		rowCount: 10,
		list: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},],
		token: '',
		total: 0,
		iouApplyStatus: '',
		RepaymentList: [{}],
		RepaymentTotal: 0,
		ApplyStatusList: [],
		RepaymentStatuList: [],
		imageUrl: '../../img/icon_add.png'
	},
	onPullDownRefresh: function (e) {
		this.uplower();
	},
	onShareAppMessage: function () {
		return {
			title: '省鑫宝',
			path: '/page/order',
			imageUrl: '../../img/share.png'
		}
	},
	getBoxSize() {
		let that = this;
		wx.getSystemInfo({
			success: function (res) {
				that.setData({
					winWidth: res.windowWidth,
					winHeight: res.windowHeight
				});
				console.log(that.data.windowHeight)
			}
		});
	},
	swichNav: function (e) {  //点击tab切换 
		var that = this;
		if (this.data.currentTab === e.target.dataset.current) {
			return false;
		} else {
			that.setData({
				currentTab: e.target.dataset.current
			});
			that.setData({ current: 1 });
			that.setData({ rowCount: 10 });
		}
	}, 
	bindDateChange(e) {
		console.log('picker发送选择改变，携带值为', e.detail.value)
		this.setData({
			date: e.detail.value
		})
		this.getData();
	},
	// 获取流水--列表数据
	getData(){
		wx.request({
			url: 'http://127.0.0.1:3000/api/searchAccount', //仅为示例，并非真实的接口地址
			method: 'POST',
			data: {
				date:this.data.date,
				currentPage:'1',
				pageSize:'10',
				openid:wx.getStorageSync('openid'),
			},
			success:  (res) => {
				console.log(res.data.data.data)
				this.setData({ list: res.data.data.data });
			}
		})
		
	}

})