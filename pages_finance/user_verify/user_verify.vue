<template>
	<view class="u-p-30 bg">
		<view class="u-p-t-30 u-p-b-40 steps">
			<u-steps   
				:current="1"  
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
			<view class="form-desc u-p-t-20 u-p-b-30">
				<view class="u-font-40 u-m-b-20 " style="color: #0b2249; font-weight: bold;">
					短信校验
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
					label="姓名" 
					prop="name"  
					ref="name"
					required
				>
					<up-input 
						v-model="model.name"
						placeholder="姓名"
						></up-input>
				</u-form-item>  
				<u-form-item
					:borderBottom="false"
					label="手机号码" 
					prop="mobile"  
					ref="mobile" 
					required
				>
					<up-input 
						v-model="model.mobile"
						placeholder="手机号码"
						></up-input>
				</u-form-item>
				<u-form-item
					:borderBottom="false"
					label="手机验证码" 
					prop="code"  
					ref="code" 
					required
				>
					<up-input
						v-model="model.code" 
						placeholder="验证码" 
						clearable> 
						<template #suffix>
							<up-code
								ref="uCode"
								@change="codeChange"
								seconds="20"
								changeText="X秒重新获取"
							></up-code>
							<up-button
								@tap="getCode"
								:text="tips"
								type="warning"
								size="small"
							></up-button>
						</template> 
					</up-input>
					
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
	const loading = false
	const model = ref({
		name: '',
		mobile: '',
		code: ''
	})
	const rules = {
		name: {
			type: 'string',
			required: true,
			message: '姓名不能为空',
			trigger: ['blur', 'change']
		},
		mobile: {
			validator: (rule, value, callback) => { 
				return uni.$u.test.mobile(value);
			},
			message: '输入正确的手机号',
			trigger: ['blur', 'change']
		},
		code: {
			type: 'string',
			required: true,
			message: '验证码不能为空',
			trigger: ['blur', 'change']
		},
	}
	const show = ref(false)
	const idType = computed(() => {
		return idTypeList.value.filter(ele => ele.value == model.value.idType)[0]?.name
	})
	const config = computed(() => {
		// console.log(this.account)
		let func = 'verify_account';
		let submitBtnText = '提交';
		let params = {...model.value}; 
		return {
			func,
			submitBtnText,
			params
		}
	})
	const uForm = ref()
	const uCode = ref()
	const tips = ref('')
	onReady(() => {
		uForm.value.setRules(rules)
	})
	onLoad(options => {
		
		model.value.name = account_info.value.name
		if(options.hasOwnProperty('mobile')) {
			model.value.mobile = options.mobile
		}
	})
	function codeChange(text) {
        tips.value = text;
    }
	async function getCode() {
		if(!uni.$u.test.mobile(model.value.mobile)) {
			uForm.value.validateField('mobile')
			return
		} 
        if (uCode.value.canGetCode) {
			  // 模拟向后端请求验证码
			uni.showLoading({
				title: '正在获取验证码'
			}) 
			const res = await $api.get_mobile_code({params: model.value}) 
			if(res.code == 1) {
				uCode.value.start();
			}
			uni.$u.toast(res.msg);
			
			
        } else {
			uni.$u.toast('倒计时结束后再发送');
        }
    } 
	function submit() {
		uForm.value.validate().then(async () => {
				loading.value = true
				uni.showLoading()
				const res = await $api[config.value.func]({params: config.value.params});
				loading.value = false
				if(res.code == 1) {
					uni.showLoading()
					await finance.getAccountData()
					uni.redirectTo({
						url: `/pages/account/company_apply`,
						success() {
							uni.showToast({
								title: res.msg,
								icon: 'success'
							})
						}
					}) 
				}
			}).catch(errors => {
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
