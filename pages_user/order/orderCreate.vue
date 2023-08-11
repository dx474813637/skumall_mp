<template>
	<view class="u-p-20">
		<view class="u-p-10 u-m-b-10 u-info-dark u-font-32">收货地址</view>
		<AddressSelectCard
			:origin="addressData"
			@cardClick="handleChangeShow(true)"
		></AddressSelectCard>
	</view>
	<view class="cart-w ">
		<view class="u-p-10 u-m-b-10 u-info-dark u-font-32 u-p-l-30">订单选品</view>
		<view
			class="items u-p-l-20 u-p-r-20 u-m-b-20 "
			v-for="(item, index) in cart_list_checked"
			:key="item.shop.id"
			>
			
			<view class="shop-card u-radius-16 bg-white u-p-b-50">
				<view class="shop-card-header u-flex u-flex-items-center u-p-15"> 
					<view class="u-m-r-10">
						<u-icon name="home" color="#999" size="20"></u-icon>
					</view>
					<view>{{ item.shop.company }}</view>
				</view>
				<view class="shop-card-main">
					<view 
						class="product-item u-flex u-flex-items-start u-p-15"
						v-for="product in item.products"
						:key="product.id"
						> 
						<view class="item" >
							<up-image 
							show-loading
							:src="product.img" 
							width="80px" 
							height="80px" 
							radius="8"
							></up-image>
						</view>
						<view class="item u-flex-column u-flex-between u-flex-1 u-m-l-15 info" >
							<view class="title u-line-1">
								{{product.name}}
							</view>
							<view class="sku u-line-2 u-info u-font-24 u-flex-1 u-m-b-20" >
								<text class="u-m-r-15" v-for="(specs, index) in product.specs_arr" :key="index">
									<text>{{specs.label}}：{{specs.value}}；</text>
								</text>
							</view>
							<view class="info u-flex u-flex-between u-flex-items-center">
								<view class="item">
									<view class="u-flex u-flex-items-end" style="color: #f00;">
										<text class="u-font-24">￥</text>
										<text class="u-font-32">{{product.price}}</text> 
									</view>
								</view>
								<view class="item u-m-r-15">
									x {{product.num}}
								</view>
							</view>
						</view>
					</view>
					
				</view>
			</view>
		</view>
	</view>
	<TabBar :customStyle="customStyle">
		<view class="u-flex u-flex-between u-flex-items-center u-p-l-20 u-p-r-20 u-font-28 cart-bar-w" > 
			<view></view>
			<view class="item u-flex u-flex-items-center" >
				<view class="u-flex-column u-flex-items-end u-font-28 u-p-r-14">
					<view class="u-flex u-flex-items-center">
						<view class="u-p-t-4">总计：</view>
						<view class="u-flex u-flex-items-center">
							<text class="u-p-t-8 u-error-dark">￥</text>
							<u-count-to  
								:endVal="cart_list_checked_price" 
								separator=","
								:duration="400"  
								:decimals="2"
								fontSize="18"
								color="#f00"
								bold 
							></u-count-to>
						</view>
					</view>
					<view class="u-info">
						共计 {{cart_list_checked_num}} 件选品
					</view>
				</view>
				<view style="width: 100px">
					<u-button type="error" shape="circle" @click="createOrderBtn" :disabled="btn" >
						<text class="u-font-32">创建订单</text> 
					</u-button>
				</view>
				
				
			</view>
		</view>
	</TabBar>
	<AddressListPopup
		:show="addressPopupShow" 
		title="地址列表"  
		:list="addressList"
		:onUpdateShow="handleChangeShow"  
		@confirmAddress="confirmAddress"
		@refresh="refreshAddress"
	></AddressListPopup>
</template>

<script setup>
	import { onLoad, onUnload, onPageScroll } from "@dcloudio/uni-app";
	import { ref, reactive, computed, toRefs, inject, watch, onMounted, nextTick } from 'vue'
	// import { share } from '@/composition/share.js'
	import useProductSku from '@/composition/useProductSku'
	const {
	    sku_ids
	} = useProductSku()
	// const { setOnlineControl } = share()
	const $api = inject('$api')
	
	import {useCartStore} from '@/stores/cart.js'
	const cart = useCartStore()
	const { cart_list, cart_list_num, cart_list_checked, cart_list_checked_num, cart_list_checked_price } = toRefs(cart)
	import {useCateStore, baseStore} from '@/stores/base.js'
	const base = baseStore() 
	const { home, roomList, themeColor } = toRefs(base)
	const cate = useCateStore()
	const { cate_list, cate_loading } = toRefs(cate)
	
	const addressData = ref({})
	const addressPopupShow = ref(false)
	const morenAddress = ref({})
	const addressList = ref([])
	const btn = ref(false)
	const customStyle = ref({}) 
	onLoad(async () => {
		uni.showLoading()
		await getInitData()
		addressData.value = morenAddress.value
		uni.$on('create_order_address_update', function() {
			refreshAddress()
		})
	})
	onUnload(() => {
		uni.$off('create_order_address_update')
	})
	async function getInitData() {
		const res = await $api.orderConfirm()
		if(res.code == 1) {
			morenAddress.value = res.moren
			addressList.value = res.list
		}
	}
	function handleChangeShow(data) {
		addressPopupShow.value = data
	} 
	function confirmAddress(data) {
		addressData.value = data
		handleChangeShow(false)
	}
	async function refreshAddress() {
		uni.showLoading()
		await getInitData()
	} 
	
	async function createOrderBtn() {
		btn.value = true
		uni.showLoading();
		await cart.getPidSku(sku_ids.value)
		await createOrder()
		btn.value = false
	}
	
	async function createOrder() {
		let arr = cart_list_checked.value.map(ele => ele.products.map(item => ({id: item.id, num: item.num}))).reduce((a, b) => a.concat(b))
		console.log(arr)
		const res = await $api.create_order({
			params: {
				address_id: addressData.value.id,
				pid_array: JSON.stringify(arr)
			}
		})
		if(res.code == 1) {
			uni.showToast({
				title: res.msg
			})
			cart.removeProductsById(arr.map(ele => ele.id))
			cart.saveCartData2LocalStorage()
			
			base.handleGoto({
				url: '/pages_user/order/orderList'
			})
		}
	}
</script>

<style lang="scss" scoped>

	.cart-bar-w {
		height: 100%; 
		background-color: #fff;
	}
</style>
