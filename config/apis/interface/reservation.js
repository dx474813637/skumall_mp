const http = uni.$u.http
import {all_api} from '@/config/apis/interface/base.js'

// my_info 我的信息
export const my_info = (data) => http.get('my_info', data)
// save_info 创建/编辑我的信息 字段 name 姓名 phone手机 room_name直播间名称
export const save_info = (data) => http.get('save_info', data)
// yuyue_roomid_list 预约直播间列表 下拉选择直播间用
export const yuyue_roomid_list = (data) => http.get('yuyue_roomid_list', data)
// yuyue_search 预约查询 参数roomid 直播间id riqi预约日期  
export const yuyue_search = (data) => http.get('yuyue_search', data)
// yuyue_add 预约申请 参数roomid riqi hour=两位数的小时
export const yuyue_add = (data) => http.get('yuyue_add', data)
//	my_yuyue 我的预约列表 参数p   
//	预约状态说明zt=0 待审核 1通过 2拒绝 
export const my_yuyue = (data) => http.get('my_yuyue', data) 
// roomid_confirm 参数id zt=1 confirm=0
export const roomid_confirm = (data) => http.get('roomid_confirm', data)

// tmp_id_list
export const tmp_id_list = (data) => http.get('tmp_id_list', data)
// tmp_id_back
export const tmp_id_back = (data) => http.get('tmp_id_back', data)
// get_tmp_id_time
export const get_tmp_id_time = (data) => http.get('get_tmp_id_time', data)

 