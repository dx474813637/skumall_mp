<template>
	<view class="u-p-40 u-p-b-80"> 
		<view class="u-flex u-flex-items-start u-flex-between u-m-b-20 u-font-32">
			<view class="item text-light u-m-r-20 u-flex-shrink-0">授信ID</view>
			<view class="item text-base ">{{list.id}}</view>
		</view>
		<view class="u-flex u-flex-items-start u-flex-between u-m-b-20 u-font-32" v-if="list.bank_zxrz">
			<view class="item text-light u-m-r-20 u-flex-shrink-0">银行产品</view>
			<view class="item text-primary " @click="base.handleGoto({url: '/pages_finance/query_product/query_product', params:{id: list.bank_zxrz.product_id}})">{{list.bank_zxrz.name}}</view>
		</view>
		<view class="u-flex u-flex-items-start u-flex-between u-m-b-20 u-font-32" v-if="list.amount">
			<view class="item text-light u-m-r-20 u-flex-shrink-0">申请金额</view>
			<view class="item text-base ">{{list.amount}}元</view>
		</view>
		<view class="u-flex u-flex-items-start u-flex-between u-m-b-20 u-font-32" v-if="list.credit_termMonth">
			<view class="item text-light u-m-r-20 u-flex-shrink-0">申请期限</view>
			<view class="item text-base">{{list.credit_termMonth}}月</view>
		</view>
		<view class="u-flex u-flex-items-start u-flex-between u-m-b-20 u-font-32" v-if="list.credit_amount">
			<view class="item text-light u-m-r-20 u-flex-shrink-0">审批额度</view>
			<view class="item text-base">{{list.credit_amount}}元</view>
		</view>
		<view class="u-flex u-flex-items-start u-flex-between u-m-b-20 u-font-32" v-if="list.credit_beginDate">
			<view class="item text-light u-m-r-20 u-flex-shrink-0">开始日期</view>
			<view class="item text-base">{{list.credit_beginDate}}</view>
		</view>
		<view class="u-flex u-flex-items-start u-flex-between u-m-b-20 u-font-32" v-if="list.credit_endDate">
			<view class="item text-light u-m-r-20 u-flex-shrink-0">截止日期</view>
			<view class="item text-base">{{list.credit_endDate}}</view>
		</view>
		<view class="u-flex u-flex-items-start u-flex-between u-m-b-20 u-font-32" v-if="list.credit_termMonth">
			<view class="item text-light u-m-r-20 u-flex-shrink-0">授信期限</view>
			<view class="item text-base">{{list.credit_termMonth}}月</view>
		</view>
		<view class="u-flex u-flex-items-start u-flex-between u-m-b-20 u-font-32" v-if="list.bank_zxrz && list.bank_zxrz.loan_term">
			<view class="item text-light u-m-r-20 u-flex-shrink-0">贷款期限</view>
			<view class="item text-base">{{list.bank_zxrz.loan_term}}<template v-if="list.credit_mode == 'month'">月</template></view>
		</view>
		<view class="u-flex u-flex-items-start u-flex-between u-m-b-20 u-font-32">
			<view class="item text-light u-m-r-20 u-flex-shrink-0">申请人</view>
			<view class="item text-base">{{list.platform_person}}</view>
		</view>
		<view class="u-flex u-flex-items-start u-flex-between u-m-b-20 u-font-32">
			<view class="item text-light u-m-r-20 u-flex-shrink-0">发起时间</view>
			<view class="item text-base">{{list.ctime}}</view>
		</view>
		<view class="u-flex u-flex-items-start u-flex-between u-m-b-20 u-font-32">
			<view class="item text-light u-m-r-20 u-flex-shrink-0 u-flex u-flex-items-center">
				<view>授信状态</view>
				<view class="u-m-l-10" @click="updateStatus" v-if="list.pacc_id">
					<u-icon name="reload" size="15" color="#007aff"></u-icon>
				</view>
			</view>
			<view class="item" :class="{
				'text-success': list.status == '8',
				'text-error': list.status == '4'
			}">
				<view>{{pacc_query_status}}</view>
			</view>
		</view>
		<view class="u-flex u-flex-items-start u-flex-between u-m-b-20 u-font-32" v-if="list.errorText">
			<view class="item text-light u-m-r-20 u-flex-shrink-0">授信失败原因</view>
			<view class="item text-base">{{list.errorText}}</view>
		</view>
		<view class="u-flex u-flex-items-start u-flex-between u-m-b-20 u-font-32" v-if="list.status == 8">
			<view class="item text-light u-m-r-20 u-flex-shrink-0 u-flex u-flex-items-center">
				<view>可用余额</view>
				<view class="u-m-l-10" @click="getMoney">
					<u-icon name="reload" size="15" color="#007aff"></u-icon>
				</view>
			</view>
			<view class="item text-error u-flex u-flex-items-center"> 
				<view class="u-m-r-20">
					<u-loading-icon mode="circle" color="#007aff" :show="lastMoney.loading"></u-loading-icon>
				</view>
				<view v-if="lastMoney.money == 'hide'">****</view>
				<view v-else>{{lastMoney.money}} 元</view>
				
			</view>
		</view>
		<view class="u-flex u-flex-items-start u-flex-between u-m-b-20 u-font-32">
			<view class="item text-light u-m-r-20 u-flex-shrink-0">备注</view>
			<view class="item text-base">{{list.remark}}</view>
		</view>
		<view class="u-m-b-30 u-font-32 u-p-t-30 u-p-b-30" v-if="list.status >= 5">
			<!-- <view class="item text-light u-m-b-10">待签约原始文件</view> -->
			<view class="item page-bg2 u-p-20 u-radius-10 u-m-b-20 " v-for="(item, index) in filesList" :key="item.id">
				<view class="u-p-8 u-font-30">
					<view class="item text-black">
						<text class=" u-p-r-20 pacc-file-status-tag " :class="{
							'text-success': item.signflows_state == 3,
							'text-light': item.signflows_state == 4, 
							'text-primary': item.signflows_state != 3 && item.signflows_state != 4, 
						}">{{index == 0 ? sign_file_status1: sign_file_status2}}</text>
						<text>{{item.name}}</text>
					</view>
				</view>
				<view class="u-p-8 u-font-30 u-flex u-flex-items-start ">
					
					<view class="item u-p-r-20" v-if="!item.signflows_id" >
						<u-button
							size="medium"
							type="primary"
							plain 
							@click="getyiqianbaoBtn(item.contract_id)" 
							:customStyle="btnStyle"
						>开始签约</u-button>
					</view>
					<template v-if="item.signflows_state == 1 || item.signflows_state == 2">
						<view class="item u-p-r-20" >
							<u-button
								size="medium"
								type="warning"
								plain  
								:customStyle="btnStyle"
								@click="updateyiqianbaoBtn(item.contract_id)" 
							>更新签约状态</u-button>
						</view>
						<!-- <view class="item u-p-r-20" >
							<u-button
								size="medium"
								type="error"
								plain 
								:customStyle="btnStyle"
								@click="cancelyiqianbao(item.contract_id)" 
							>撤销签约</u-button>
						</view> -->
					</template>
					
					<view class="item u-p-r-20"   >
						<u-button
							size="medium"
							type="primary"
							plain 
							:customStyle="btnStyle"
							@click="watchPDF(item)" 
						>查看文件</u-button>
					</view>
				</view>
			</view>
			 
		</view>
		<view class="u-flex u-flex-items-start u-flex-between u-m-b-30 u-font-32">
			<view class="item text-light u-m-r-20 u-flex-shrink-0">微信二维码图片</view>
			<view class="item text-base">
				<u-image width="300rpx" height="300rpx" :src="list.pic_bankofsun"></u-image>
			</view>
		</view>
		<view class="u-m-t-40">
			<u-button type="primary"  plain @click="base.handleGoto({url:'/pages_finance/pacc_query_edit/pacc_query_edit', params:{id: list.product_id}})">申请授信</u-button>
		</view> 
		<u-toast ref="uToast" />
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
			pacc_query_status: list.value.status,
			sign_file_status1: list.value.file_286?.signflows_state,
			sign_file_status2: list.value.file_287?.signflows_state,
		}
	})
	const { 
		pacc_query_status,
		sign_file_status1,
		sign_file_status2
	} = useFilter(zt)
	async function getData() {
		const res = await $api.pacc_query_detail({params: {id: id.value}})
		if(res.code == 1) {
			list.value = res.list
			// msg.value = res.msg
			// show.value = res.show
			if(list.value.status >= 5) {
				filesList.value = [list.value.file_286, list.value.file_287]
			}
			// if(list.value.status == '8') {
			// 	getMoney()
			// }
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