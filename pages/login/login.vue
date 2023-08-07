<template>
	<view class="u-p-20">
		<view class="login-box u-radius-12 bg-white u-p-30 uni-shadow-sm">
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
					labelWidth="3em"
					:labelStyle="{color: '#000'}"  
					:rules="rules"
					>
					<u-form-item
						label="账号"
						prop="login"   
						required 
						>
						<u--input
							v-model="form.login" 
							placeholder="账号" 
							border="bottom"
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
							suffixIcon="lock-fill"
							suffixIconStyle="color: #ccc;" 
						></u--input> 
					</u-form-item>
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
	
	import {useCartStore} from '@/stores/cart.js'
	const cart = useCartStore()
	const { cart_list, cart_list_num, cart_list_checked_num, cart_list_checked_price } = toRefs(cart)
	import {useCateStore, baseStore} from '@/stores/base.js'
	const base = baseStore() 
	const { home, roomList, themeColor } = toRefs(base)
	const cate = useCateStore()
	const { cate_list, cate_loading } = toRefs(cate)
	
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
		login: "",
		passwd: "",
		phone: "",
		code: "",
	})
	const rules = computed(() => {
		let obj = {}
		if (login_mode.value == 'pwd') {
			return {
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
		return {
			...obj,
			phone: [
				{
					required: true,
					message: '手机不得为空',
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
	})
	
	const login_mode = computed(() => {
		return login_mode_list.value[login_mode_current.value].value
	})
	
	
	function handleTabsChange(data) {
		login_mode_current.value = +data.index 
	}
	
</script>

<style lang="scss" scoped>

</style>
