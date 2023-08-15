<template>
	<view class="u-p-30 bg">
		
		<view  class="u-p-20 u-p-l-40 bg-white u-radius-5">
			
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
					label="卖家" 
					prop="sell_id"  
					ref="sell_id" 
					required
				>
					<view @click="sellerShow = true">
						<up-input  
							v-model="model.sell_name"
							readonly 
							placeholder="卖家"
							suffixIcon="arrow-down"
							suffixIconStyle="color: #999; font-size: 16px"
							></up-input>
					</view>
					
				</u-form-item>
				 
				<u-form-item
					:borderBottom="false"
					label="产品描述" 
					prop="product_intro"  
					ref="product_intro" 
					required
				>
					<up-input  
						v-model="model.product_intro"
						placeholder="产品描述"
						></up-input>
				</u-form-item>
				<u-form-item
					:borderBottom="false"
					label="产品详细描述" 
					prop="remark"  
					ref="remark"
					required 
					> 
					<up-input   
						v-model="model.remark"
						placeholder="产品详细描述"
						></up-input> 
				</u-form-item>  
				<u-form-item
					:borderBottom="false"
					label="融资金额" 
					prop="pay_price"  
					ref="pay_price"
					required 
				>
					<up-input   
						v-model="model.pay_price"
						placeholder="融资金额"
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
	</view>
	<NoOrderWhiteSellerPopup
		:show="sellerShow"
		title="无订单卖家白名单"
		:onUpdateShow="handleChangeShow"
		@onConfirm="sellerConfirm"
	></NoOrderWhiteSellerPopup>
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
	const sellerShow = ref(false) 
	const config = computed(() => {
		// console.log(this.account)
		let func = 'no_order_rz_pay';
		let submitBtnText = '提交';
		let params = {...model.value }; 
		return {
			func,
			submitBtnText,
			params
		}
	})
	const uForm = ref()
	const areaData = ref([])
	const model = ref({
		sell_id: '', 
		sell_name: '', 
		product_intro: '',
		remark: '',  
		pay_price: '',
		id: '', 
	})
	const rules = {
		sell_id: [
			{
				required: true,
				message: '公司名不能为空',
				trigger: ['change', 'blur'],
			},
		],
		product_intro: [
			{
				required: true,
				message: '商品名不能为空',
				trigger: ['change', 'blur'],
			},
		],
		remark: [
			{
				required: true,
				message: '规格不能为空',
				trigger: ['change', 'blur'],
			},
		], 
		pay_price: [
			{
				required: true,
				message: '价格不能为空',
				trigger: ['change', 'blur'],
			},
		]
	}

	onLoad(async(options) => {
		// if(options.hasOwnProperty('id')) {
		// 	id.value= options.id
		// } 
		// getAreaData()
		// uni.showLoading()
		// await getData() 
		
	})
	function sellerConfirm(data) { 
		model.value.sell_id = data.id 
		model.value.sell_name = data.company  
		handleChangeShow(false)
	}
	function handleChangeShow(data) {
		sellerShow.value = data
	}
	onReady(() => {
		uForm.value.setRules(rules)
	})    
	
	function submit() {
		uForm.value.validate().then(async () => { 
			loading.value = true
			uni.showLoading()
			const res = await $api[config.value.func]({...config.value.params }); 
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