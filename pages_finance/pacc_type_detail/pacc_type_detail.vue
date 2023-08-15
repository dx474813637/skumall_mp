<template>
	<view class="u-p-20 w">
		<view class="load-w u-flex u-flex-center u-flex-items-center" v-if="pageLoading">
			<u-loading-icon mode="circle" color="#007aff" size="40" ></u-loading-icon> 
			<view>刷新数据中...</view>
		</view>
		
		<view class="u-flex u-flex-items-center u-flex-between u-m-b-20 u-p-l-30 u-p-r-30">
			<view class="item text-white u-font-38" v-if="list.bank_zxrz">{{list.bank_zxrz.name}}</view>
			<view class="item u-flex u-flex-items-center" v-if="show != 1">
				<view class="u-m-r-20">
					<u-icon name="reload" size="15" color="#fff" @click="refreshBtn"></u-icon>
				</view>
				<u-tag mode="light" :text="pacc_query_status" type="primary" ></u-tag>
			</view>
		</view>
		<view class="card-w u-radius-8 u-p-20">
			<view class="u-flex u-flex-items-center u-flex-between text-light u-font-26 u-m-b-20 u-p-l-30 u-p-r-30">
				<view class="item">
					{{list.platform_person || ''}}
				</view>
				<view class="item"  v-if="show != 1">
					{{list.ctime}}
				</view>
			</view>
			<view class="bg-white u-p-20 u-radius-8 u-p-l-30 u-p-r-30" > 
				<template v-if="show == 1">
					<view class="u-content">
						<u-parse :html="msg"></u-parse>
					</view> 
				</template> 
				<template v-else>
					<template v-if="type == '1'">
						<view class="card-rows u-flex u-flex-center u-p-20 u-radius-8 u-m-b-10">
							<view class="title text-light u-font-30 u-text-right u-p-r-20 u-border-right">授信状态</view>
							<view class="value u-font-34 text-error u-flex-1 u-p-l-30 u-flex u-flex-items-center">
								<view class="u-m-r-30">{{ pacc_query_status }}</view> 
								<u-icon name="reload" size="15" color="#ff0000" @click="refreshBtn"></u-icon>
							</view> 
						</view> 
						<view class="card-rows u-flex u-flex-center u-p-20 u-radius-8 u-m-b-10">
							<view class="title text-light u-font-30 u-text-right u-p-r-20 u-border-right">申请金额(元)</view>
							<view class="value u-font-34 text-black u-flex-1 u-p-l-30">
								<u-count-to
									:end-val="list.amount || 0" 
									separator=","
									color="#326dbd"
									duration="100"
									decimals="2"
									fontSize="20"
									bold
								></u-count-to>
							</view> 
						</view> 
						<view class="card-rows u-flex u-flex-center u-p-20 u-radius-8 u-m-b-10">
							<view class="title text-light u-font-30 u-text-right u-p-r-20 u-border-right">贷款期限</view>
							<view class="value u-font-34 text-black u-flex-1 u-p-l-30">{{list.bank_zxrz.loan_term || '-'}}<template v-if="list.credit_mode == 'month'">月</template></view> 
						</view>  
						<view class="card-rows u-flex u-flex-center u-p-20 u-radius-8 u-m-b-10">
							<view class="title text-light u-font-30 u-text-right u-p-r-20 u-border-right">备注</view>
							<view class="value u-font-34 text-black u-flex-1 u-p-l-30">{{list.remark}}</view> 
						</view> 
						<view class="mp-code u-flex u-flex-column u-flex-items-center u-p-20" v-if="list.pic_bankofsun">
							<view class="u-p-10 u-p-l-80 u-p-r-80 u-radius-8 text-black u-font-28" style="border: 1rpx solid #eee;">
								银行小程序二维码
							</view>
							<view class="u-p-20">
								<u-image width="300rpx" height="300rpx" :src="list.pic_bankofsun"></u-image>
							</view>
							<view class="text-light u-font-26">长按识别二维码进行银行端操作</view>
						</view>
						<view class="u-p-20">
							<u-button type="primary" @click="gotoType2">授信通过 前往签约中心</u-button>
						</view>
					</template>
					
								
					<template v-if="type == '2'">
					
						<template v-if="list.status == '5'">
							<view class="card-info u-flex u-flex-items-start u-p-30 u-p-l-40 u-p-r-40 u-radius-8 u-m-b-10">
								
								<view class="item u-flex-1 u-flex u-flex-column u-flex-items-center">
									<view class="title text-base u-font-28">申请金额(元)</view>
									<view class="value u-font-34 text-black">
										<u-count-to
											:end-val="list.amount || 0" 
											separator=","
											color="#222"
											duration="100"
											decimals="2"
											fontSize="20"
											bold
										></u-count-to>
									</view>
								</view> 
								<view class="item u-flex-1 u-flex u-flex-column u-flex-items-center">
									<view class="title text-base u-font-28">贷款期限</view>
									<view class="value u-font-34 text-black">{{list.bank_zxrz.loan_term || '-'}}{{list.bank_zxrz.credit_mode | date2Str}}</view>
								</view> 
							</view> 
							<view class="card-info u-flex u-flex-items-start u-p-30 u-p-l-40 u-p-r-40 u-radius-8 u-m-b-10">
								<view class="item u-flex-1 u-flex u-flex-column u-flex-items-center">
									<view class="title text-base u-font-28">审批额度(元)</view>
									<view class="value u-font-34 text-black u-p-t-10">
										<u-count-to
											:end-val="list.credit_amount || 0" 
											separator=","
											color="#ff0000"
											duration="100"
											decimals="2"
											fontSize="20"
											bold
										></u-count-to>
									</view>
								</view> 
								<view class="item u-flex-1 u-flex u-flex-column u-flex-items-center">
									<view class="title text-base u-font-28 u-flex u-flex-items-center">
										<view class="u-m-r-20">授信状态</view>
										<u-icon name="reload" size="15" color="#ff0000" @click="refreshBtn"></u-icon>
									</view>
									<view class="value u-font-32 text-error u-p-t-10">
										{{ pacc_query_status }}
									</view>
								</view>
							</view> 
						</template>
						
						<template v-if="list.status == '8'">
							<view class="card-info u-flex u-flex-items-start u-p-30 u-p-l-40 u-p-r-40 u-radius-8 u-m-b-10">
								
								<view class="item u-flex-1 u-flex u-flex-column u-flex-items-center">
									<view class="title text-base u-font-28">申请金额(元)</view>
									<view class="value u-font-34 text-black">
										<u-count-to
											:end-val="list.amount || 0" 
											separator=","
											color="#222"
											duration="100"
											decimals="2"
											fontSize="20"
											bold
										></u-count-to>
									</view>
								</view> 
								<view class="item u-flex-1 u-flex u-flex-column u-flex-items-center">
									<view class="title text-base u-font-28">申请期限</view>
									<view class="value u-font-34 text-black">{{list.credit_termMonth}}月</view>
								</view> 
							</view> 
							<view class="card-info u-flex u-flex-items-start u-p-30 u-p-l-40 u-p-r-40 u-radius-8 u-m-b-10">
								
								<view class="item u-flex-1 u-flex u-flex-column u-flex-items-center">
									<view class="title text-base u-font-28">开始日期</view>
									<view class="value u-font-34 text-black">{{list.credit_beginDate}}</view>
								</view> 
								<view class="item u-flex-1 u-flex u-flex-column u-flex-items-center">
									<view class="title text-base u-font-28">截止日期</view>
									<view class="value u-font-34 text-black">{{list.credit_endDate}}</view>
								</view> 
							</view> 
							<view class="card-info u-flex u-flex-items-start u-p-30 u-p-l-40 u-p-r-40 u-radius-8 u-m-b-10">
								
								<view class="item u-flex-1 u-flex u-flex-column u-flex-items-center">
									<view class="title text-base u-font-28">授信期限</view>
									<view class="value u-font-34 text-black">{{list.credit_termMonth}}月</view>
								</view> 
								<view class="item u-flex-1 u-flex u-flex-column u-flex-items-center">
									<view class="title text-base u-font-28">贷款期限</view>
									<view class="value u-font-34 text-black">{{list.bank_zxrz.loan_term || '-'}}{{list.bank_zxrz.credit_mode | date2Str}}</view>
								</view> 
							</view> 
							<view class="card-info u-flex u-flex-items-start u-p-30 u-p-l-40 u-p-r-40 u-radius-8 u-m-b-10">
								<view class="item u-flex-1 u-flex u-flex-column u-flex-items-center">
									<view class="title text-base u-font-28">审批额度(元)</view>
									<view class="value u-font-34 text-black u-p-t-10">
										<u-count-to
											:end-val="list.credit_amount || 0" 
											separator=","
											color="#ff0000"
											duration="100"
											decimals="2"
											fontSize="20"
											bold
										></u-count-to>
									</view>
								</view> 
								<view class="item u-flex-1 u-flex u-flex-column u-flex-items-center">
									<view class="title text-base u-font-28 u-flex u-flex-items-center">
										<view class="u-m-r-20">可用余额(元)</view>
										<u-icon name="reload" size="15" color="#ff0000" @click="refreshBtn"></u-icon>
									</view>
									<view class="value u-font-34 text-black u-p-t-10 u-flex u-flex-items-center">
										<view class="u-m-r-20">
											<u-loading-icon mode="circle" color="#007aff" :show="lastMoney.loading"></u-loading-icon>
										</view>
										<view v-if="lastMoney.money == 'hide'">****</view>
										<view v-else>
											<u-count-to
												:end-val="lastMoney.money || 0" 
												separator=","
												color="#ff0000"
												duration="100"
												decimals="2"
												fontSize="40"
											></u-count-to>
										</view>
										
									</view>
								</view>
							</view> 
							
						</template>
					
						<view class="files-box u-p-t-20 u-p-b-20 u-m-t-40">
							<view class="box-title u-text-center text-base u-font-28">服务协议签约</view>
							<view class="files-list  u-font-32 u-p-t-30 u-p-b-30"> 
									<view class="item u-p-20 u-radius-10 u-flex u-flex-items-start" v-for="(item, index) in filesList" :key="item.id">
										<view class="item u-p-r-10 u-p-t-10">
											<u-image src="https://wx3.y.netsun.com/Public/tu1.png" width="35px" height="35px"></u-image>
										</view>
										<view class="item u-flex-1">
											<view class="u-p-8 u-font-30">
												<view class="item text-black u-m-b-5">
													<text class="">{{item.name1}}</text>
													<text class=" u-p-l-20 pacc-file-status-tag " :class="{
														'text-success': item.signflows_state == 3,
														'text-light': item.signflows_state == 4, 
														'text-primary': item.signflows_state != 3 && item.signflows_state != 4, 
													}">{{index == 0 ? sign_file_status1: sign_file_status2}}</text>
												</view>
												<view class="item text-light">
													<text class="">{{item.name2}}</text> 
												</view>
											</view>
											<view class="u-p-8 u-font-30 u-flex u-flex-items-start ">
												
												<view class="item u-p-r-20" v-if="!item.signflows_id" >
													<u-button
														size="mini"
														type="primary" 
														@click="getyiqianbaoBtn(item.contract_id)" 
														:customStyle="btnStyle"
														shape="circle"
													>开始签约</u-button>
												</view>
												<template v-if="item.signflows_state == 1 || item.signflows_state == 2">
													<view class="item u-p-r-20" >
														<u-button
															size="small"
															type="warning" 
															:customStyle="btnStyle"
															@click="updateyiqianbaoBtn(item.contract_id)" 
															shape="circle"
														>更新签约状态</u-button>
													</view> 
												</template>
												
												<view class="item u-p-r-20"   >
													<u-button
														size="small"
														type="primary" 
														plain
														:customStyle="btnStyle"
														@click="watchPDF(item)" 
														shape="circle"
													>查看文件</u-button>
												</view>
											</view>
										</view>
										 
									 
									</view>
							</view>
						</view>
					
					</template>
								 
				</template>
				
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
	const base = baseStore();
	const { themeColor } = toRefs(base) 
	const $api = inject('$api')   
	const type = ref('1') 
	const msg = ref('') 
	const show = ref(1) 
	const filesList = ref([]) 
	const pageLoading = ref(false) 
	const uToast = ref()
	onLoad(async (options) => {
		if(options.hasOwnProperty('type')) {
			type.value = options.type
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
		const res = await $api.pacc_type_detail({params: {type: type.value}})
		if(res.code == 1) {
			list.value = res.list
			msg.value = res.msg
			show.value = res.show
			if(list.value.status >= 5) {
				filesList.value = [list.value.file_286, list.value.file_287]
			}
			if(list.value.status == '8') {
				getMoney()
			}
		}
		return res
	} 
	
	function gotoType2() {
		base.handleGoto({
			url: '/pages_finance/pacc_type_detail/pacc_type_detail',
			type: 'redirectTo',
			params: {
				type: '2'
			}
		})
	}
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
		if(res.list.id && type.value != 2) {
			gotoType2()
		} 
		
	}
	function paccClick() {
		uni.navigateTo({
			url: `/pages_finance/pacc_query_edit/pacc_query_edit?id=${pid.value}`
		})
	}
</script>
 
<style lang="scss" scoped>
	.w {
		background: linear-gradient(to bottom, #326dbd 10%, #f6f7fb 25%);
		background-image: linear-gradient(to bottom, #326dbd 10%, #f6f7fb 25%);
		min-height: 100vh; 
	}
	.u-content {
		min-height: 400px;
	}
	.files-box {
		.box-title {
			position: relative;
			&:before,
			&:after {
				content: '';
				position: absolute;
				top: 0;
				bottom: 0;
				margin-top: auto;
				margin-bottom: auto; 
				width: 50px;
				height: 1px;
				background-color: #eee;
			}
			&:before {
				left: 30px;
			}
			&:after {
				right: 30px;
			}
		}
	}
	.card-w {
		background: linear-gradient(to bottom, #edf8fe 10%, #fff 25%);
		background-image: linear-gradient(to bottom, #edf8fe 100px, #fff 250px); 
	}
	.card-rows {
		background-color: #f7f8fc;
		&:nth-of-type(2n+1) {
			background-color: #fff;
		}
		.title {
			flex: 0 0 40%;
		}
	}
	.card-info {
		background-color: #f7f8fc;
		// color: #f96937;
		
		&:nth-of-type(2n+1) {
			background-color: #fff;
		}
		.item {
			padding: 0 8px;
			border-right: 1rpx solid #eee;
			// height: 60px;
			flex: 0 0 50%;
			&:nth-of-type(2n) {
				border-right: 0;
			}
			.title {
				font-weight: 400;
				white-space: nowrap; 
			}
			.value { 
				height: 24px;
				white-space: nowrap;
			}
		}
	}
	.load-w {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		margin: auto;
		background-color: rgba(255,255,255,.9);
		z-index: 200;
	}
</style>
