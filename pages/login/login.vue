<template>
	<view class="u-p-20">
		<view class="login-box u-radius-20 bg-white u-p-30 uni-shadow-sm">
			<view class="tabs-w u-p-l-80 u-p-r-80">
				<u-tabs
					:list="login_mode_list"  
					lineWidth="0"
					:scrollable="false"
					:current="login_mode_current" 
					:activeStyle="{
						color: themeColor,
						fontWeight: 'bold'
					}"
					@change="handleTabsChange"
				></u-tabs>	
			</view> 
			<view class="form-w u-p-l-30 u-p-r-30">
				<u--form
					labelPosition="left"
					:model="form" 
					ref="uForm"  
					labelWidth="60px"
					:labelStyle="{color: '#000'}"  
					:rules="rules"
					>
					<template v-if="login_mode == 'pwd'">
						<u-form-item
							label="账号"
							prop="login"   
							required 
							>
							<u--input
								v-model="form.login" 
								placeholder="账号" 
								border="bottom"
								clearable
								suffixIcon="account-fill"
								suffixIconStyle="color: #ccc;" 
							></u--input> 
						</u-form-item> 
						<u-form-item
							label="密码"
							prop="passwd"   
							required 
							>
							<u--input
								v-model="form.passwd" 
								placeholder="密码" 
								border="bottom"
								clearable
								suffixIcon="lock-fill"
								suffixIconStyle="color: #ccc;" 
							></u--input> 
						</u-form-item>
					</template>
					
					<template v-if="login_mode == 'code'">
						<u-form-item
							label="手机"
							prop="phone"   
							required 
							>
							<u--input
								v-model="form.phone" 
								placeholder="手机" 
								border="bottom"
								clearable
								suffixIcon="phone-fill"
								suffixIconStyle="color: #ccc;" 
							></u--input> 
						</u-form-item> 
						<u-form-item
							label="验证码"
							prop="code"   
							required 
							>
							<up-input 
								v-model="form.code" 
								placeholder="验证码" 
								clearable
								border="bottom"> 
								<template #suffix>
									<up-code
										ref="uCode"
										@change="codeChange"
										seconds="20"
										changeText="X秒重新获取哈哈哈"
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
					</template>
					<view class="u-p-t-40 u-p-b-40 u-m-t-40">
						<u-button type="primary" shape="circle" @click="submit">登录</u-button>
					</view>
				</u--form>
			</view>
		</view>
		
	</view>
</template>

<script setup>
	import { onLoad, onShareTimeline, onShareAppMessage } from "@dcloudio/uni-app";
	import { ref, reactive, computed, toRefs, inject, watch, onMounted, nextTick } from 'vue'
	import { share } from '@/composition/share.js' 
	const { setOnlineControl } = share()
	const $api = inject('$api')
	
	import {userStore} from '@/stores/user.js'
	const user = userStore()
	import {useCartStore} from '@/stores/cart.js'
	const cart = useCartStore()
	const { cart_list, cart_list_num, cart_list_checked_num, cart_list_checked_price } = toRefs(cart)
	import {useCateStore, baseStore} from '@/stores/base.js'
	const base = baseStore() 
	const { home, roomList, themeColor } = toRefs(base)
	const cate = useCateStore()
	const { cate_list, cate_loading } = toRefs(cate)
	
	const tips = ref('')
	const uCode = ref()
	const uForm = ref()
	const login_mode_current = ref(0)
	const login_mode_list = ref([
		{
			name: '密码登录',
			disabled: false,
			value: 'pwd'
		},
		{
			name: '验证码登录',
			disabled: false,
			value: 'code'
		} 
	])
	const form = reactive({
		login: "sktsyh",
		passwd: "123456aa",
		phone: "",
		code: "",
	})
	const rules = computed(() => {
		let obj = {}
		if (login_mode.value == 'pwd') {
			obj = {
				...obj,
				login: [
					{
						required: true,
						message: '账号不得为空',
						trigger: ['change', 'blur'],
					}
				],
				passwd: [
					{
						required: true,
						message: '密码不得为空',
						trigger: ['change', 'blur'],
					}
				],
			} 
		}
		else {
			obj = {
				...obj,
				phone: [
					{
						validator: (rule, value, callback) => { 
							return uni.$u.test.mobile(value);
						},
						message: '输入正确的手机号',
						trigger: ['change', 'blur'],
					}
				],
				code: [
					{
						required: true,
						message: '验证码不得为空',
						trigger: ['change', 'blur'],
					}
				],
			}
		}
		nextTick(() => {
			if(uForm.value && uForm.value.setRules) {
				uForm.value.setRules(obj)
			} 
		})
		
		return obj
	})
	
	const login_mode = computed(() => {
		return login_mode_list.value[login_mode_current.value].value
	})
	
	
	function handleTabsChange(data) {
		login_mode_current.value = +data.index 
	}
	function codeChange(text) {
        tips.value = text;
    }
	async function getCode() {
		if(!uni.$u.test.mobile(form.phone)) {
			uForm.value.validateField('phone')
			return
		} 
        if (uCode.value.canGetCode) {
			  // 模拟向后端请求验证码
			uni.showLoading({
				title: '正在获取验证码'
			}) 
			const res = await $api.msgcode({params: {login: form.phone}}) 
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
			const res = await $api.syblogin({params: {...form}})
			if(res.code == 1) {
				uni.$u.toast(res.msg);
				uni.showLoading()
				const new_user = await user.refreshToken()
				user.saveUserInfo(new_user)
				let prePage = uni.getStorageSync('prePage')
				if(prePage) {
					uni.showLoading()
					try{
						await user.getMallUserInfo()
					}catch(e){
						//TODO handle the exception
					} 
					uni.removeStorageSync('prePage')
					uni.redirectTo({
						url: prePage
					})
				}
				else {
					uni.reLaunch({
						url: '/pages_user/index/index'
					})
				}
			}
			
		}).catch(errors => {
			console.log(errors)
			uni.$u.toast('检查表单')
		})
	}
	
</script>

<style lang="scss" scoped>

</style>
