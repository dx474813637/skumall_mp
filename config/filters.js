 
// import { timeFormat } from '@/utils'
// import {timeFrom} from '@/utils/index'

export default {
	install: (app) => {
		app.config.globalProperties.$filters = { 
			yuyue_zt2str(value) {
				let text = value
				if(value == '0') text = '待审核'
				else if(value == '1') text = '通过' 
				else if(value == '2') text = '拒绝' 
				return text
			}, 
			order_zt2str(value) {
				let text = value
				if(value == '0') text = '待付款'
				else if(value == '1') text = '付款成功' 
				else if(value == '2') text = '待收货' 
				else if(value == '3') text = '订单完成' 
				else if(value == '4') text = '评分完成' 
				else if(value == '5') text = '支付中' 
				else if(value == '6') text = '支付失败' 
				else if(value == '7') text = '待审核' 
				else if(value == '8') text = '审核拒绝' 
				return text
			}, 
		}
	},
}