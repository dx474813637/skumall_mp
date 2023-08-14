<template>
	<view class="u-p-30 bg">
		<view class="u-p-t-30 u-p-b-40 steps">
			<u-steps   
				:current="step"  
				activeColor="#fa3534"
			>
				<u-steps-item 
					:title="item.name" 
					v-for="item in numList"
				>
				</u-steps-item>
			</u-steps>
		</view>
		<view  class="u-p-20 u-p-l-40 bg-white u-radius-5">
			<template v-if="step == 2">
				<view class="form-desc u-p-t-20 u-p-b-30">
					<view class="u-font-40 u-m-b-20 " style="color: #0b2249; font-weight: bold;">
						随机金额校验
					</view>
					<!-- <view class="text-light">应监管要求，请先进行个人认证</view> -->
				</view>
				<u--form 
					labelPosition="left" 
					:model="model" 
					:rules="rules" 
					ref="uForm"
					labelWidth="80px"
					:borderBottom="false"
					:labelStyle="{color: '#7c88a0', fontSize: '30rpx'}"
					>
					<u-form-item
						:borderBottom="false"
						label="校验金额" 
						prop="amount"  
						ref="amount"
						required
					>
						<up-input  
							v-model="model.amount"
							placeholder="校验金额"
							></up-input>
					</u-form-item>  
				</u--form>
			</template>
			<template v-else>
				<view class="u-p-40 u-flex u-flex-center">
					<u-icon
						size="50"
						color="#00aa7f"
						labelPos="bottom"
						space="20"
						labelSize="20"
						marginTop="30"
						label="你已完成用户认证"
						name="checkmark-circle-fill"
					></u-icon>
				</view>
				
			</template>
			<view class="u-p-30">
				
			</view>
			
		</view>
		<view class="u-p-t-30 u-p-b-30">
			<view class="u-flex u-flex-items-center u-flex-center">
				<view class="item u-flex-1">
					<template v-if="step == 2">
						<u-button type="primary" @click="submit" :loading="loading" :disabled="loading">{{config.submitBtnText}}</u-button>
					</template>
					<template v-if="step == 3">
						<u-button type="info" @click="back" >返回用户认证</u-button>
					</template>
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
		idTypeList,
		numList,
	} = toRefs(finance)  
	const loading = ref(false)
	const step = ref(2)
	const model = ref({
		amount: '', 
	})
	const rules = {
		amount: {
			validator: (rule, value, callback) => {
				return this.$u.test.amount(value);
			},
			message: '请输入规范的校验金额',
			trigger: ['blur', 'change']
		}, 
	}
	const show = ref(false)
	const idType = computed(() => {
		return idTypeList.value.filter(ele => ele.value == model.value.idType)[0]?.name
	})
	const config = computed(() => {
		// console.log(this.account)
		let func = 'verify_random_amount';
		let submitBtnText = '提交';
		let params = {...model.value}; 
		return {
			func,
			submitBtnText,
			params
		}
	})
	const uForm = ref()   
	onReady(() => {
		uForm.value.setRules(rules)
	})
	onLoad(options => {
		 
		if(options.hasOwnProperty('step')) {
			step.value = +options.step
		}
	}) 
	function submit() {
		uForm.value.validate().then(async () => {
			loading.value = true
			uni.showLoading()
			const res = await $api[config.value.func]({params: config.value.params});
			loading.value = false
			if(res.code == 1) {
				uni.showLoading()
				await finance.getAccountData()
				uni.showLoading()
				await finance.getCpyData()
				uni.showToast({
					title: res.msg,
				})
				step.value = 3
			}
		}).catch(errors => {
			uni.$u.toast('请检查表单')
		}) 
	}
	function reset() {
		uForm.value.resetFields()
	}
	function back() {
		uni.navigateBack()
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
