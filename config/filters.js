 
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
		}
	},
}