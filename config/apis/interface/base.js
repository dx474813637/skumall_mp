const http = uni.$u.http

// all_api api=接口名称 其他参数保持一致
export const all_api = (data, methods = 'GET', config = {}) => {
	if (methods == 'GET') {
		return http.get('all_api', data)
	}
	else if (methods == 'POST') {
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
// addresss_list
export const addresss_list = (data) => http.get('addresss_list', data)
// addressDetail
export const addressDetail = (data) => http.get('addressDetail', data)
// address_detail
export const address_detail = (data) => http.get('address_detail', data)
// regional_list
export const regional_list = (data) => http.get('regional_list', data)
// address_change
export const address_change = (data) => http.get('address_change', data)
// orderConfirm
export const orderConfirm = (data) => http.get('orderConfirm', data)

