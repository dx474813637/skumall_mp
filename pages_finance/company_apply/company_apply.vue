<template>
	<view class="u-p-30 bg">
		<view class="u-p-t-30 u-p-b-40 steps">
			<u-steps   
				:current="2"  
				activeColor="#fa3534"
			>
				<u-steps-item 
					:title="item.name" 
					v-for="(item, index) in numList"
					:key="index"
				>
				</u-steps-item>
			</u-steps>
		</view>
		<view  class="u-p-20 u-p-l-40 bg-white u-radius-5">
			<view class="form-desc u-p-t-20 u-p-b-30">
				<view class="u-font-40 u-m-b-20 " style="color: #0b2249; font-weight: bold;">
					企业认证
				</view>
				<view class="text-light">发起随机金额打款认证</view>
			</view> 
			<u--form 
				labelPosition="top" 
				:model="model" 
				:rules="rules" 
				ref="uForm"
				labelWidth="100%"
				:borderBottom="false"
				:labelStyle="{color: '#7c88a0', fontSize: '30rpx'}"
				>
				<u-form-item
					:borderBottom="false"
					label="企业名称" 
					prop="name"  
					ref="name"
					required
				>
					<up-input 
						v-model="model.name"
						placeholder="企业名称"
						clearable
						></up-input>
				</u-form-item> 
				<u-form-item
					:borderBottom="false"
					label="社会统一信用代码" 
					prop="idNumber"  
					ref="idNumber"
					required 
				>
					<up-input 
						v-model="model.idNumber"
						placeholder="社会统一信用代码"
						clearable
						></up-input>
				</u-form-item> 
				<u-form-item
					:borderBottom="false"
					label="法人姓名" 
					prop="orgLegalName"  
					ref="orgLegalName"
					required
				>
					<up-input 
						v-model="model.orgLegalName"
						placeholder="法人姓名"
						clearable
						></up-input>
				</u-form-item> 
				<u-form-item
					:borderBottom="false"
					label="法人身份证号" 
					prop="orgLegalIdNumber"  
					ref="orgLegalIdNumber"
					required 
				>
					<up-input 
						v-model="model.orgLegalIdNumber"
						placeholder="法人身份证号"
						clearable
						></up-input>
				</u-form-item> 
				<u-form-item
					:borderBottom="false"
					label="对公账号开户行总行名称" 
					prop="bank"  
					ref="bank"
					required 
					> 
					<view @click="bankShow = true">
						<up-input 
							v-model="model.bank" 
							readonly
							placeholder="请选择" 
							suffixIcon="arrow-down"
							suffixIconStyle="color: #ccc;"  
						></up-input> 
					</view> 
				</u-form-item> 
				<u-form-item
					:borderBottom="false"
					label="对公账号开户行所在地" 
					prop="regional"  
					ref="regional"
					required 
					> 
					<view style="width: 100%;">
						<uni-data-picker
							placeholder="所在地" 
							popup-title="请选择所在地区" 
							:localdata="regional_list" 
							v-model="model.regional"  
							@change="handleValArea"
						></uni-data-picker>
					</view>
					<!-- <view @click="areaShow = true">
						<up-input 
							v-model="model.regional_text" 
							readonly
							placeholder="请选择" 
							suffixIcon="arrow-down"
							suffixIconStyle="color: #ccc;"  
						></up-input> 
					</view> --> 
					
					
				</u-form-item> 
				<u-form-item
					:borderBottom="false"
					label="对公账号开户行支行名称全称" 
					prop="subbranch"  
					ref="subbranch"
					required 
					> 
					<view @click="bankDetailShow = true">
						<up-input
							v-model="model.subbranch" 
							readonly
							placeholder="请选择" 
							suffixIcon="arrow-down"
							suffixIconStyle="color: #ccc;"  
						></up-input> 
					</view>  
				</u-form-item> 
				<u-form-item
					:borderBottom="false"
					label="银行卡号" 
					prop="cardNo"  
					ref="cardNo"
					required 
				>
					<up-input 
						v-model="model.cardNo"
						placeholder="银行卡号"
						clearable
						></up-input>
				</u-form-item> 
				<u-form-item
					:borderBottom="false"
					label="通知短信手机号" 
					prop="mobile"  
					ref="mobile" 
					required
				>
					<up-input 
						v-model="model.mobile"
						placeholder="通知短信手机号"
						clearable
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
		<BankNamePopup
			:show="bankShow"
			title="收款方银行总行名称"
			:onUpdateShow="handleChangeShow"
			@onConfirm="bankConfirm"
		></BankNamePopup>
		<BankSubNamePopup
			:show="bankDetailShow"
			title="对公账号开户行支行名称全称"
			:onUpdateShow="handleChangeShow2"
			@onConfirm="bankDetailConfirm"
		></BankSubNamePopup>
		<!-- <menusPopup 
			:show="bankShow" 
			theme="white" 
			showMode="list"
			@close="bankShow = false"
			@confirm="bankConfirm"
		></menusPopup> --> 
		<!-- <menusPopupBank 
			:show="bankDetailShow" 
			theme="white" 
			showMode="list"
			@close="bankDetailShow = false"
			@confirm="bankDetailConfirm"
		></menusPopupBank> -->
	</view>
	
</template>

<script setup>
	import { onLoad, onReady, onReachBottom } from "@dcloudio/uni-app";
	import { ref, reactive, computed, toRefs, inject, watch } from 'vue' 
	import { baseStore } from '@/stores/base'
	import {userStore} from '@/stores/user'
	import {useFinanceStore} from '@/stores/finance'
	const user = userStore()
	const { tmp_id_list, user:u  } = toRefs(user)
	const base = baseStore();
	const { themeColor } = toRefs(base) 
	const $api = inject('$api')   
	
	const finance = useFinanceStore()
	const { 
		account_info, 
		account_loading, 
		organizations_info, 
		organizations_loading,
		bank_list, 
		bank_loading,
		regional_list, 
		regional_loading,
		idTypeList,
		numList,
	} = toRefs(finance)  
	const bankShow = ref(false)
	const areaShow = ref(false)
	const bankDetailShow = ref(false) 
	const loading = ref(false)
	const model = ref({
		name: '',
		idType: 'CRED_ORG_USCC',
		idNumber: '',
		orgLegalName: '',
		orgLegalIdNumber: '',
		bank: '',
		regional: '',
		regional_text: '',
		subbranch: '',
		cardNo: '',
		mobile: ''
	})
	const rules = {
		name: {
			required: true,
			message: '企业名称不能为空',
			trigger: ['blur', 'change']
		}, 
		idNumber: {
			required: true,
			message: '社会统一信用代码不能为空',
			trigger: ['blur', 'change']
		},
		orgLegalName: {
			required: true,
			message: '法人姓名不能为空',
			trigger: ['blur', 'change']
		}, 
		orgLegalIdNumber: {
			validator: (rule, value, callback) => {
				return uni.$u.test.idCard(value);
			},
			message: '输入正确的法人身份证号',
			trigger: ['blur', 'change']
		},
		bank: {
			required: true,
			message: '对公账号开户行总行名称不能为空',
			trigger: ['blur', 'change']
		}, 
		regional: {
			required: true,
			message: '对公账号开户行所在地不能为空',
			trigger: ['blur', 'change']
		}, 
		subbranch: {
			required: true,
			message: '对公账号开户行支行名称全称不能为空',
			trigger: ['blur', 'change']
		}, 
		cardNo: {
			required: true,
			message: '银行卡号不能为空',
			trigger: ['blur', 'change']
		}, 
		mobile: {
			validator: (rule, value, callback) => {
				return uni.$u.test.mobile(value);
			},
			message: '输入正确的通知短信手机号',
			trigger: ['blur', 'change']
		}, 
	}
	const show = ref(false)
	const idType = computed(() => {
		return idTypeList.value.filter(ele => ele.value == model.value.idType)[0]?.name
	})
	const config = computed(() => {
		// console.log(this.account)
		let func = 'transfer_random_amount';
		let submitBtnText = '提交';
		let params = {...model.value}; 
		return {
			func,
			submitBtnText,
			params
		}
	})
	const uForm = ref()
	onLoad(() => {
		finance.getBankListData()
		finance.getRegionalData()
	})
	onReady(() => {
		uForm.value.setRules(rules)
	})
	function handleChangeShow(data) {
		bankShow.value = data
	}
	function handleChangeShow2(data) {
		bankDetailShow.value = data
	}
	function bankConfirm(data) { 
		model.value.bank = data.name  
		handleChangeShow(false)
	}
	function areaConfirm(e) {
		// console.log(e);
		model.value.regional = e[1].value
		model.value.regional_text = e[0].label == e[1].label? e[1].label : `${e[0].label}/${e[1].label}`
	}
	function bankDetailConfirm(data) {
		model.value.subbranch = data.bank_name  
		handleChangeShow2(false)
	}
	function submit() {
		uForm.value.validate().then(async () => {
			if(loading.value) return
			loading.value = true
			uni.showLoading()
			const res = await $api[config.value.func]({params: config.value.params});
			loading.value = false
			if(res.code == 1) {
				uni.showLoading()
				await finance.getAccountData()
				uni.showLoading()
				await finance.getCpyData()
				uni.redirectTo({
					url: `/pages/account/cpy_verify`,
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
	function reset() {
		uForm.value.resetFields()
	}
	
</script>
<style lang="scss">
	.steps {
		::v-deep {
			.u-steps-item__wrapper {
				background-color: #e6f2fe!important;
			}
		}
	}
</style>
<style lang="scss" scoped>
	.bg {
		min-height: 100vh;
		background-image: linear-gradient(to bottom, #e6f2fe 150px, #f6f6f6);
	}
</style>