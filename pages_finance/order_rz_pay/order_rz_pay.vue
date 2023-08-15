<template>
	<view class="u-p-40 u-p-b-80"> 
		<view class="u-flex u-flex-items-start u-flex-between u-m-b-20 u-font-32">
			<view class="item text-light u-m-r-20 u-flex-shrink-0">卖家</view>
			<view class="item text-base ">{{list.sell_company}}</view>
		</view>
		<view class="u-flex u-flex-items-start u-flex-between u-m-b-20 u-font-32">
			<view class="item text-light u-m-r-20 u-flex-shrink-0">买家</view>
			<view class="item text-base ">{{list.buy_company}}</view>
		</view>
		<view class="u-flex u-flex-items-start u-flex-between u-m-b-20 u-font-32" v-if="list.product_name">
			<view class="item text-light u-m-r-20 u-flex-shrink-0">商品名称</view>
			<view class="item text-base ">{{list.product_name}}</view>
		</view>
		<view class="u-flex u-flex-items-start u-flex-between u-m-b-20 u-font-32" v-if="list.product_intro">
			<view class="item text-light u-m-r-20 u-flex-shrink-0">商品描述</view>
			<view class="item text-base ">{{list.product_intro}}</view>
		</view>
		<view class="u-flex u-flex-items-start u-flex-between u-m-b-20 u-font-32">
			<view class="item text-light u-m-r-20 u-flex-shrink-0">融资金额</view>
			<view class="item text-base ">{{list.price}} 元</view>
		</view> 
		<view class="u-flex u-flex-items-start u-flex-between u-m-b-20 u-font-32">
			<view class="item text-light u-m-r-20 u-flex-shrink-0">融资时间</view>
			<view class="item text-base ">{{list.post_time}}</view>
		</view> 
		<view class="u-flex u-flex-items-start u-flex-between u-m-b-20 u-font-32">
			<view class="item text-light u-m-r-20 u-flex-shrink-0">融资状态</view> 
			<view class="item" :class="{
				'text-success': list.status == '8',
				'text-error': list.status == '4'
			}">
				<view>{{order_rz_status}}</view>
			</view>
		</view>
	</view>
</template>


<script setup>
	import { onLoad, onReady, onReachBottom } from "@dcloudio/uni-app";
	import { ref, reactive, computed, toRefs, inject, watch } from 'vue' 
	import { baseStore } from '@/stores/base'
	import {userStore} from '@/stores/user'
	import {useFinanceStore} from '@/stores/finance'
	import usePacc from '@/composition/usePacc.js'
	const user = userStore()
	const { tmp_id_list, user:u  } = toRefs(user)
	const finance = useFinanceStore()
	import useFilter from '@/composition/useFilter.js'
	const { 
		account_info, 
		account_loading, 
		organizations_info, 
		organizations_loading,
		idTypeList,
	} = toRefs(finance)  
	const {
		getMoney,
		getyiqianbao,
		updateyiqianbao,
		// cancelyiqianbao,
		watchPDF,  
		list,
		lastMoney 
	} = usePacc()
	const btnStyle = ref({
					padding: '0 12px',
					 height: '32px'
				})
	const base = baseStore();
	const { themeColor } = toRefs(base) 
	const $api = inject('$api')   
	const type = ref('1') 
	const msg = ref('') 
	const show = ref(1) 
	const id = ref('')
	const filesList = ref([]) 
	const pageLoading = ref(false) 
	const uToast = ref()
	onLoad(async (options) => {
		if(options.hasOwnProperty('id')) {
			id.value = options.id
		}
		uni.showLoading()
		await getData()
	})
	const zt = computed(() => {
		return {
			order_rz_status: list.value.rz_status,
		}
	})
	const { 
		order_rz_status
	} = useFilter(zt)
	async function getData() {
		const res = await $api.no_order_rz_pay_detail({params: {id: id.value}})
		if(res.code == 1) {
			list.value = res.list 
		}
		return res
	} 
	// async function getPaccQuery() {
	// 	const res = await $api.pacc_query({params: {pacc_id: list.value.pacc_id}})
	// 	if(res.code == 1) {
	// 		uni.showToast({
	// 			title: res.msg
	// 		}) 
	// 		refreshBtn()
	// 	}
	// }
	// function gotoType2() {
	// 	base.handleGoto({
	// 		url: '/pages_finance/pacc_type_detail/pacc_type_detail',
	// 		type: 'redirectTo',
	// 		params: {
	// 			type: '2'
	// 		}
	// 	})
	// }
	async function updateStatus() {
		const res = await $api.pacc_query({
			params: {
				pacc_id: list.value.pacc_id
			}
		})
		if(res.code == 1) {
			uni.showToast({
				title: res.msg
			}) 
		}
		
	} 
	async function getyiqianbaoBtn(data) {
		uni.showLoading()
		await getyiqianbao(data)
		refreshBtn()
	}
	async function updateyiqianbaoBtn(data) {
		uni.showLoading()
		await updateyiqianbao(data)
		refreshBtn()
	}
	async function refreshBtn() {
		pageLoading.value = true
		await updateStatus()
		const res = await getData() 
		pageLoading.value = false 
		// if(res.list.id && type.value != 2) {
		// 	gotoType2()
		// } 
		
	}
	function paccClick() {
		uni.navigateTo({
			url: `/pages_finance/pacc_query_edit/pacc_query_edit?id=${pid.value}`
		})
	}
</script>
 
 <style lang="scss">
 	page {
 		background-color: #fff;
 	}
 </style>
 <style lang="scss" scoped> 
 	.pacc-file-status-tag {
 		position: relative;
 		&:before {
 			content: '·';
 			background-color: inherit;
 			color: inherit; 
 			position: absolute;
 			right: 2px;
 			font-weight: bold;
 			top: 2px;
 		}
 	}
 </style>