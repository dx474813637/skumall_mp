import {
	defineStore
} from 'pinia';
import apis from '@/config/apis/index';
const extConfig = uni.getExtConfigSync ? uni.getExtConfigSync():{}
console.log(extConfig) 
export const baseStore = defineStore('base', {
	state: () => {
		return {
			sys: uni.getSystemInfoSync(),
			configBaseURL: 'https://wx3.y.netsun.com/Xuanpin/',
			configHeader: {
				'content-type': 'application/x-www-form-urlencoded',
				'appid': 10004,
				'appsecret': '809cMktOZRdhVUf2zDMI28NdXmrWOqV1F97ev571sbigR6EA6KNlQvM',
				'xcxlogin': extConfig.attr.login,
				'xcxappid': extConfig.attr.wxappid,
			},
			share_other: '',
			themeColor: '#007aff',
			empty: 'https://wx.rawmex.cn/Public/memu/data1.png',
			online: {
				count: 0, 
			}, 
			msg: {},
			home: {},
			roomList: [],
			home_loading: false
		};
	},
	getters: {
		// doubleCount: (state) => state.counter * 2,
	},
	// 也可以这样定义
	// state: () => ({ count: 0 })
	actions: {
		async getRoomList() {
			if(this.home_loading) return
			try {
				this.home_loading = true
				const res = await apis.yuyue_roomid_list() 
				if(res.code == 1) { 
					this.home_loading = false
					//获取搜索类型数据
					this.home = res.home
					this.roomList = res.list
					return res
				}
			} catch (error) { 
				this.home_loading = false
				return error
			}
		},
		getMsg(data) {
			console.log('getMsg', data)
			this.msg = data
		},
		addMsg(data) {
			console.log('add', data)
			this.msg.push(data)
		},
		delMsg(data) {
			this.msg.shift(data)
		},
		saveShareInfo(data) {
			this.share_other = data;
		}, 
		handleGoto(data) {
			uni.$u.route(data)
		},
	},
});
 

export const menusStore = defineStore('menus', {
	state: () => {
		return {  
			menus: [], 
			menus_wd: [],
			menus_wd_broker: {},
			new_memu: [],
			news: 0,
			currPage: {
				route: '/pages/index/home',
				options: {}
			},
			cpy_type_origin: [[]],
			cpy_type: [[]]
		};
	},
	getters: {
		menusActive: (state) => state.menus.findIndex(ele => ele.route == state.currPage.route) ,
	}, 
	actions: {
		saveCurPage(data) {
			console.log('saveCurPage', data)
			this.currPage = data;
		},
		async getMenusData() {
			uni.$u.sleep(1000)
			this.menus = [
				{
					name: "首页",
					type: 1,
					url: "/pages/home/home",
					white_icon_1: "https://wx.rawmex.cn/Public/xzlmenu/menu1a.png",
					white_icon_2: "https://wx.rawmex.cn/Public/xzlmenu/menu1b.png",
				},
				{
					name: "分类",
					type: 1,
					url: "/pages/cateList/cateList",
					white_icon_1: "https://wx.rawmex.cn/Public/xzlmenu/menu1a.png",
					white_icon_2: "https://wx.rawmex.cn/Public/xzlmenu/menu1b.png",
				}, 
				{
					name: "采购车",
					type: 1,
					url: "/pages/home/home",
					white_icon_1: "https://wx.rawmex.cn/Public/xzlmenu/menu1a.png",
					white_icon_2: "https://wx.rawmex.cn/Public/xzlmenu/menu1b.png",
				},
				{
					name: "我的",
					type: 1,
					url: "/pages/home/home",
					white_icon_1: "https://wx.rawmex.cn/Public/xzlmenu/menu1a.png",
					white_icon_2: "https://wx.rawmex.cn/Public/xzlmenu/menu1b.png",
				},
			].map((ele, index) => {
				let paramsStr = ele.url.split('?')[1] || ''
				let paramsObj = {}
				paramsStr && paramsStr.split('&').forEach(item => {
					paramsObj[item.split('=')[0]] = item.split('=')[1]
				})
				 
				return {
					...ele,
					route: ele.url.split('?')[0],
					options: paramsObj
				}
			})  
			try { 
				const res = await apis.memu()  
				if(res.code == 1) { 
					//获取搜索类型数据
					this.cpy_type_origin = [res.type]
					this.cpy_type =[ [{name: '全部', value: ''}, ...res.type.map(ele => {
						return {
							name: ele,
							value: ele
						}
					})] ]
					
					//获取底部导航菜单
					this.menus = res.list.map((ele, index) => {
						let paramsStr = ele.url.split('?')[1] || ''
						let paramsObj = {}
						paramsStr && paramsStr.split('&').forEach(item => {
							paramsObj[item.split('=')[0]] = item.split('=')[1]
						})
						 
						return {
							...ele,
							route: ele.url.split('?')[0],
							options: paramsObj
						}
					})  
					
					//获取个人中心基础菜单
					this.menus_wd = res.new_memu_wd
					//获取个人中心broker菜单
					this.menus_wd_broker = res.broker_memu
					
					this.new_memu = res.new_memu 
					this.news = res.news
				}
			} catch (error) { 
				return error
			}
		}
	},
});


export const useCateStore = defineStore('cate', {
	state: () => {
		return {  
			cate_list: [],  
			cate_loading: false
		};
	},
	getters: { 
	}, 
	actions: { 
		async getCateData() { 
			this.cate_loading = true
			try {
				const res = await apis.cate_list() 
				this.cate_loading = false
				if(res.code == 1) { 
					//获取搜索类型数据
					this.cate_list = res.list  
				}
			} catch (error) { 
				console.log(error)
				this.cate_loading = false
				return error
			}
			
		}
	},
});
