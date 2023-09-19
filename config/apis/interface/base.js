const http = uni.$u.http

// all_api api=接口名称 其他参数保持一致
export const all_api = (data, methods = 'GET', config = {}) => {
	if (methods == 'GET') {
		return http.get('all_api', data)
	} else if (methods == 'POST') {
		return http.post('all_api', data, config)
	}
}


// xcx_login
export const xcx_login = (data) => http.get('xcx_login', data)
// syblogin
export const syblogin = (data) => http.get('syblogin', data)
// sign_out
export const sign_out = (data) => http.get('sign_out', data)
// msgcode
export const msgcode = (data) => http.get('msgcode', data)
// login_role
export const login_role = (data) => http.get('login_role', data)
// addresss_list 地址列表 参数p
export const addresss_list = (data) => http.get('addresss_list', data)
// addressDetail 
export const addressDetail = (data) => http.get('addressDetail', data)
// address_detail 地址详情  参数address_id
export const address_detail = (data) => http.get('address_detail', data)
// regional_list
export const regional_list = (data) => http.get('regional_list', data)

// `address_change` 地址修改 
// 		参数
// 		name      收件人姓名       必填
// 		mobile    收件人手机号码   必填
// 		regional  收件地区(数字) 这里用到地区列表接口   必填
// 		address   收件详细地址     必填
// 		remark    备注             选填
// 		address_id  地址列表中的地址ID值  选填  修改时原有数据时需要带上，否则是新添加数据
// 		auto  0 1
// address_change
export const address_change = (data) => http.get('address_change', data)
// my_card
export const my_card = (data) => http.get('my_card', data)
// edit_card
export const edit_card = (data) => http.get('edit_card', data)

  
// `create_order` 生成订单 参数pid_array  address_id
// json格式，每一条记录包含： cid表示旺铺ID，pid商品ID，num表示购买的商品数量
export const create_order = (data = {}) => all_api(uni.$u.deepMerge(data, {params: {api: 'create_order'}}))
// `order_list` 订单列表  参数type 1待付款 2待收货 3已完成 role=1 买家的订单列表 不传或传其他值 卖家的订单列表 p页数
export const order_list = (data = {}) => all_api(uni.$u.deepMerge(data, {params: {api: 'order_list'}}))
// `order_detail` 订单详情 参数order_id
export const order_detail = (data = {}) => all_api(uni.$u.deepMerge(data, {params: {api: 'order_detail'}}))
// orderConfirm 创建订单 地址参数 
export const orderConfirm = (data) => http.get('orderConfirm', data)

// xcx_pay  
export const xcx_pay = (data, config={}) => http.post('xcx_pay', data, config)

// 订单状态  0 待付款 1付款成功 2待收货 3订单完成 
// 4评分完成 5支付中 6支付失败
// 状态0或6的时候能发起支付 
// 1的时候在卖家端出现发货 
// 2的时候在买家端出现确认收货 
// 3的时候买家端出现评分
//0 待付款pay 1付款成功 2待收货 3订单完成 4评分完成 5支付中 6支付失败 7待审核 8审核拒绝edit
 
// change_order_status  改变订单状态（收货/发货） 参数order_id 
export const change_order_status =  (data = {}) => all_api(uni.$u.deepMerge(data, {params: {api: 'change_order_status'}}))

// order_score 订单评分 参数order_id score 1-5
export const order_score = (data = {}) => all_api(uni.$u.deepMerge(data, {params: {api: 'order_score'}}))


// web_danye 单页
export const web_danye = (data = {}) => all_api(uni.$u.deepMerge(data, {params: {api: 'web_danye'}}))
// cate_list  
export const cate_list = (data = {}) => all_api(uni.$u.deepMerge(data, {params: {api: 'cate_list'}}))
// web_product  
export const web_product = (data = {}) => all_api(uni.$u.deepMerge(data, {params: {api: 'web_product'}}))
// web_search  
export const web_search = (data = {}) => all_api(uni.$u.deepMerge(data, {params: {api: 'web_search'}}))
// web_product_detail  
export const web_product_detail = (data = {}) => all_api(uni.$u.deepMerge(data, {params: {api: 'web_product_detail'}}))
// web_pid_sku1  
export const web_pid_sku1 = (data = {}) => all_api(uni.$u.deepMerge(data, {params: {api: 'web_pid_sku1'}}))
  
 // web_help 帮助中心
export const web_help = (data = {}) => all_api(uni.$u.deepMerge(data, {params: {api: 'web_help'}}))
 // web_help_detail 帮助页详情 参数id
export const web_help_detail = (data = {}) => all_api(uni.$u.deepMerge(data, {params: {api: 'web_help_detail'}}))

// web_news 公告/资讯列表 p cate num默认20 这个cate是中文的
export const web_news = (data = {}) => all_api(uni.$u.deepMerge(data, {params: {api: 'web_news'}}))
// web_news_detail 公告/资讯详情 id
export const web_news_detail = (data = {}) => all_api(uni.$u.deepMerge(data, {params: {api: 'web_news_detail'}}))
// web_tuijian 优选店铺 login 空默认返回列表第一个数据的信息。
export const web_tuijian = (data = {}) => all_api(uni.$u.deepMerge(data, {params: {api: 'web_tuijian'}}))
// web_tuijian2 推荐店铺 num获取几个数据
export const web_tuijian2 = (data = {}) => all_api(uni.$u.deepMerge(data, {params: {api: 'web_tuijian2'}}))
// web_login_shop 店铺数据 p cate num login必填
export const web_login_shop = (data = {}) => all_api(uni.$u.deepMerge(data, {params: {api: 'web_login_shop'}}))
// web_home 首页推荐里的一些数据
export const web_home = (data = {}) => all_api(uni.$u.deepMerge(data, {params: {api: 'web_home'}}))


// home1  
export const home1 = (data) => http.get('home1', data)
// home2  
export const home2 = (data) => http.get('home2', data)

// add_sign 报名接口
// `name`, `company`, `duties`职位, `phone`, `info`, `recommend1`推荐人, msgcode 验证码参数 
// `recommend2`协办推荐, `remark`, `platform`平台 对选项逗号隔开的字符串 
export const add_sign = (data, config={}) => http.post('add_sign', data, config)
// sign_detail 报名详情
export const sign_detail = (data) => http.get('sign_detail', data)
// add_detail 报名页 下来菜单数据
export const add_detail = (data) => http.get('add_detail', data) 
//获取菜单
export const memu = (data) => http.get('memu', data)