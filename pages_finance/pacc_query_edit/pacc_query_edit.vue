<template>
	<view class="u-p-30 bg">
		
		<view  class="u-p-20 u-p-l-40 bg-white u-radius-5">
			<view class="form-desc u-p-t-20 u-p-b-30" v-if="list.bank_zxrz_product">
				<view class="u-flex u-flex-items-start u-flex-between u-m-b-20 u-font-32">
					<view class="item text-light u-m-r-20 u-flex-shrink-0">{{list.bank_zxrz_product.bank_name}}</view>
					<view class="item text-base ">{{list.bank_zxrz_product.name}}</view>
				</view>
				<view class="u-flex u-flex-items-start u-flex-between u-m-b-20 u-font-32" v-if="list.bank_zxrz_product.zxrz_remark">
					<view class="item text-light u-m-r-20 u-flex-shrink-0">银行备注</view>
					<view class="item text-base ">{{list.bank_zxrz_product.zxrz_remark}}</view>
				</view>
				<view class="u-flex u-flex-items-start u-flex-between u-m-b-20 u-font-32">
					<view class="item text-light u-m-r-20 u-flex-shrink-0">授信期限</view>
					<view class="item text-base ">{{list.bank_zxrz_product.credit_term || '-'}}<template v-if="list.credit_mode == 'month'">月</template></view>
				</view>
				<view class="u-flex u-flex-items-start u-flex-between u-m-b-20 u-font-32">
					<view class="item text-light u-m-r-20 u-flex-shrink-0">单户最高额度</view>
					<view class="item text-base ">{{list.bank_zxrz_product.max_amount}}元</view>
				</view>
				<view class="u-flex u-flex-items-start u-flex-between u-m-b-20 u-font-32">
					<view class="item text-light u-m-r-20 u-flex-shrink-0">贷款期限</view>
					<view class="item text-base ">{{list.bank_zxrz_product.loan_term || '-'}}<template v-if="list.credit_mode == 'month'">月</template></view>
				</view>
				<view class="u-flex u-flex-items-start u-flex-between u-m-b-20 u-font-32">
					<view class="item text-light u-m-r-20 u-flex-shrink-0">银行利率(年华)</view>
					<view class="item text-base ">{{list.bank_zxrz_product.annualized}}</view>
				</view>
			</view>
			<view class="u-flex u-flex-items-center u-flex-end">
				<view class="u-flex u-flex-items-center" @click="initData"> 
					<u-icon name="reload" color="#007aff"></u-icon>
					<view class="text-base u-m-l-20">刷新</view>
				</view>
			</view>
			<u--form 
				labelPosition="top" 
				:model="model" 
				:rules="rules" 
				ref="uForm"
				labelWidth="100%"
				:borderBottom="false"
				:labelStyle="{color: '#7c88a0', fontSize: '30rpx', lineHeight: '18px'}"
				>
				<u-form-item
					:borderBottom="false"
					label="公司名称" 
					prop="platform_company"  
					ref="platform_company"
					required
				>
					<up-input  
						v-model="model.platform_company"
						placeholder="公司名称"
						disabled
						:customStyle="{background: '#f8f8f8'}"
						></up-input>
				</u-form-item> 
				<u-form-item
					:borderBottom="false"
					label="社会统一信用代码" 
					prop="platform_reg"  
					ref="platform_reg"
					required 
				>
					<up-input  
						v-model="model.platform_reg"
						placeholder="社会统一信用代码"
						disabled
						:customStyle="{background: '#f8f8f8'}"
						></up-input>
				</u-form-item> 
				<u-form-item
					:borderBottom="false"
					label="法人姓名" 
					prop="platform_person"  
					ref="platform_person"
					required
				>
					<up-input  
						v-model="model.platform_person"
						placeholder="法人姓名"
						disabled
						:customStyle="{background: '#f8f8f8'}"
						></up-input>
				</u-form-item> 
				<u-form-item
					:borderBottom="false"
					label="法人身份证号" 
					prop="platform_is_card"  
					ref="platform_is_card"
					required 
				>
					<up-input  
						v-model="model.platform_is_card"
						placeholder="法人身份证号"
						disabled
						:customStyle="{background: '#f8f8f8'}"
						></up-input>
				</u-form-item>  
				
				<u-line color="#ccc" margin="20px 0"></u-line>
				<u-form-item
					:borderBottom="false"
					label="法人手机" 
					prop="platform_mobile"  
					ref="platform_mobile" 
					required
				>
					<up-input  
						v-model="model.platform_mobile"
						placeholder="法人手机"
						></up-input>
				</u-form-item>
				<u-form-item
					:borderBottom="false"
					label="申请金额（元）" 
					prop="amount"  
					ref="amount"
					required 
					> 
					<up-input  
						type="number"
						v-model="model.amount"
						placeholder="申请金额（元）"
						></up-input> 
				</u-form-item>  
				<u-form-item
					:borderBottom="false"
					label="与核心企业合作月数" 
					prop="termMonth"  
					ref="termMonth"
					required 
				>
					<up-input  
						type="number"
						v-model="model.termMonth"
						placeholder="与核心企业合作月数"
						></up-input>
				</u-form-item> 
				<u-form-item
					:borderBottom="false"
					label="上年度销售收入（元）" 
					prop="transAmt"  
					ref="transAmt"
					required 
				>
					<up-input  
						v-model="model.transAmt"
						placeholder="上年度销售收入（元）"
						></up-input>
				</u-form-item> 
				<u-form-item
					:borderBottom="false"
					label="经营场所所在省份" 
					prop="businessProvince"  
					ref="businessProvince"
				> 
					<view class="select-w" @click="areaShow = true">
						<up-input 
							v-model="model.businessProvince" 
							placeholder="请选择" 
							readonly  
						></up-input> 
						<view class="load-w u-flex u-flex-center u-flex-items-center" v-if="areaLoading">
							<u-loading-icon mode="circle" size="18"></u-loading-icon>
						</view>	
					</view>
					
				</u-form-item> 
				<u-form-item
					:borderBottom="false"
					label="联系地址(公司具体联系地址)" 
					prop="address"  
					ref="address"
				>
					<up-input  
						v-model="model.address"
						placeholder="联系地址(公司具体联系地址)"
						></up-input>
				</u-form-item> 
				<u-form-item
					:borderBottom="false"
					label="备注" 
					prop="remark"  
					ref="remark"
				>
					<up-input  
						v-model="model.remark"
						placeholder="备注"
						></up-input>
				</u-form-item> 
			</u--form>
			<view class="u-p-30">
				
			</view>
			
		</view>
		<view class="u-p-t-30 u-p-b-30">
			<view class="u-flex u-flex-items-center u-flex-center">
				<view class="item u-flex-1">
					<u-button type="primary" @click="submit" :loading="loading" :disabled="loading">{{config.submitBtnText}}</u-button>
				</view>
				<!-- <view class="item u-m-l-20 u-flex-1">
					<u-button type="error" @click="reset" >重置</u-button>
				</view> -->
			</view>
			<view class="u-flex u-flex-items-center u-flex-center u-m-t-40">
				<u-icon name="checkmark-circle" size="15" color="#aaa"></u-icon>
				<view class="text-light u-font-28 u-m-l-20">信息安全保障中</view>
			</view>
		</view> 
		<!-- <u-select 
			v-model="areaShow"  
			:list="areaData"  
			@confirm="areaConfirm"
		></u-select> -->
		<u-picker :show="areaShow" :columns="areaData" @confirm="areaConfirm" ></u-picker>
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
		bank_list, 
		bank_loading,
	} = toRefs(finance)  
	
	const $api = inject('$api')   
	const id = ref('')
	const list = ref({});
	const loading = ref(false) 
	const areaShow = ref(false)
	const areaLoading = ref(false) 
	const config = computed(() => {
		// console.log(this.account)
		let func = 'pacc';
		let submitBtnText = '提交';
		let params = {...model.value, product_id: id.value}; 
		return {
			func,
			submitBtnText,
			params
		}
	})
	const uForm = ref()
	const areaData = ref([])
	const model = ref({
		platform_company: '', 
		platform_reg: '',
		platform_person: '',
		platform_is_card: '',
		platform_mobile: '',
		imtoken: '',
		amount: '',
		termMonth: '',
		transAmt: '',
		businessProvince: '',
		address: '', 
		remark: '', 
	})
	const rules = {
		platform_company: {
			required: true,
			message: '公司名称不能为空',
			trigger: ['blur', 'change']
		}, 
		platform_reg: {
			required: true,
			message: '社会统一信用代码不能为空',
			trigger: ['blur', 'change']
		},
		platform_person: {
			required: true,
			message: '法人姓名不能为空',
			trigger: ['blur', 'change']
		},  
		platform_mobile: {
			validator: (rule, value, callback) => {
				return uni.$u.test.mobile(value);
			},
			message: '输入正确的手机号',
			trigger: ['blur', 'change']
		},
		platform_is_card: {
			validator: (rule, value, callback) => {
				return uni.$u.test.idCard(value);
			},
			message: '输入正确的身份证号',
			trigger: ['blur', 'change']
		},
		amount: {
			validator: (rule, value, callback) => {
				return uni.$u.test.amount(value);
			},
			message: '输入正确的金额',
			trigger: ['blur', 'change']
		}, 
		termMonth: {
			required: true,
			message: '与核心企业合作月数不能为空',
			trigger: ['blur', 'change']
		}, 
		transAmt: {
			validator: (rule, value, callback) => {
				return uni.$u.test.amount(value);
			},
			message: '输入正确的金额',
			trigger: ['blur', 'change']
		}, 
	}

	onLoad(async(options) => {
		if(options.hasOwnProperty('id')) {
			id.value= options.id
		} 
		getAreaData()
		uni.showLoading()
		await getData() 
		
	})
	onReady(() => {
		uForm.value.setRules(rules)
	}) 
	async function getAreaData() {
		areaLoading.value = true
		const res = await $api.pacc_businessProvince()
		areaLoading.value = false
		if(res.code == 1) {
			areaData.value.push(res.list) 
		}
		
	} 
	function areaConfirm(e) {
		console.log(e); 
		model.value.businessProvince = e.value[0]
		areaShow.value = false
	}
	async function getData() {
		const res = await $api.pacc_detail({params: {product_id: id.value}})
		if(res.code == 1) {
			list.value = res.list
			model.value.platform_company = res.list.platform_company
			model.value.platform_reg = res.list.platform_reg
			model.value.platform_person = res.list.platform_person
			model.value.platform_is_card = res.list.platform_is_card 
			model.value.imtoken = res.list.imtoken 
		}
		
	}
	function initData() {
		uni.showLoading()
		getData()
	}
	function submit() {
		uForm.value.validate().then(async () => { 
			loading.value = true
			uni.showLoading()
			const res = await $api[config.value.func]({params: config.value.params}); 
			loading.value = false
			if(res.code == 1) { 
				uni.reLaunch({
					url: `/pages_finance/pacc_query_list/pacc_query_list`,
					success() {
						uni.showToast({
							title: res.msg,
							icon: 'success'
						})
					}
				}) 
			}
			
		}).catch(errors => {
			console.log(errors)
			uni.$u.toast('请检查表单')
		}) 
	}
</script>


<style lang="scss" scoped>
	.bg {
		min-height: 100vh;
		background-image: linear-gradient(to bottom, #e6f2fe, #f6f6f6);
	}
	.select-w {
		position: relative;
	}
	.load-w {
		position: absolute;
		z-index: 10;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(255,255,255,.2);
		
	}
</style>