import {
	computed
} from 'vue'

export default function useFilter(zt) { 
	const order_zt2str = computed(() => {
		let value = zt?.value.order_zt
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
	}) 
	const yuyue_zt2str = computed(() => {
		let value = zt?.value.yuyue_zt
		let text = value
		if(value == '0') text = '待审核'
		else if(value == '1') text = '通过' 
		else if(value == '2') text = '拒绝' 
		return text
	}) 
	
	const idTypeList2str = computed(() => {
		let value = zt?.value.idType
		let text = value
		if(value == 'CRED_PSN_CH_IDCARD') text = '中国大陆身份证'
		else if(value == 'CRED_PSN_CH_TWCARD') text = '台湾来往大陆通行证' 
		else if(value == 'CRED_PSN_CH_MACAO') text = '澳门来往大陆通行证' 
		else if(value == 'CRED_PSN_CH_HONGKONG') text = '香港来往大陆通行证' 
		else if(value == 'CRED_PSN_PASSPORT') text = '护照' 
		return text
	}) 
	
	const finance_account_status = computed(() => {
		let value = zt?.value.finance_account_status
		let text = value
		if(value == '0') text = '未创建'
		else if(value == '1') text = '未认证'
		else if(value == '2') text = '已认证'
		else if(value == '3') text = '已注销' 
		return text
	}) 
	const finance_organizations_status = computed(() => {
		let value = zt?.value.finance_organizations_status
		let text = value
		if(value == '0') text = '待认证'
		else if(value == '1') text = '认证发送中'
		else if(value == '2') text = '认证成功'
		else if(value == '3') text = '认证失败' 
		else if(value == '4') text = '认证中' 
		return text
	}) 
	const pacc_query_status = computed(() => {
		let value = zt?.value.pacc_query_status
		let text = value 
		if(status == '1') text = '授信申请中'
		else if(status == '2') text = '授信已递交'
		else if(status == '4') text = '授信失败'
		else if(status == '5') text = '授信通过，签约中'
		else if(status == '6') text = '授信通过，贷款企业已签约'
		else if(status == '7') text = '授信通过，签约通过'
		else if(status == '8') text = '授信通过，贷款账户已激活'
		return text
	}) 
	
	const order_pay_status = computed(() => {
		let value = zt?.value.order_pay_status
		let text = value 
		if(status == '1') text = '等待支付' 
		else if(status == '5') text = '支付成功'
		else if(status == '6') text = '支付失败' 
		return text
	}) 
	
	
	return {
		order_zt2str,
		yuyue_zt2str,
		idTypeList2str,
		finance_account_status,
		finance_organizations_status,
		pacc_query_status,
		order_pay_status
	}
}