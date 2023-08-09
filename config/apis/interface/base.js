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
// orderConfirm 订单详情 参数order_id
export const orderConfirm = (data) => http.get('orderConfirm', data)

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
 