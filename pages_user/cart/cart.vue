<template>
	<view class="cart-w u-m-t-20 u-radius-20">
		<template v-if="cart_list.length == 0">
			<view class="u-flex u-flex-center u-p-40">
				<u-empty mode="data" :icon="base.empty" text="选品车为空" />
			</view>
		</template>
		
		<u-checkbox-group v-model="cart_checked" @change="checkboxChange">
			<view 
				class="items u-p-l-20 u-p-r-20 u-m-b-20 "
				v-for="(item, index) in cart_list"
				:key="item.shop.id"
				>
				
				<view class="shop-card u-radius-16 bg-white u-p-b-50">
					<view class="shop-card-header u-flex u-flex-items-center u-p-15">
						<view class="u-p-10"> 
							<!-- <u-checkbox-group :value="['all']">
								<u-checkbox shape="circle" name="all"></u-checkbox> 
							</u-checkbox-group> -->
							
						</view>
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
							<view class="item checkbox u-flex u-flex-items-center u-flex-center u-p-10"> 
								<u-checkbox shape="circle" :name="product.id"></u-checkbox>  
							</view>
							<view class="item" @click="base.handleGoto({url: '/pages/product/productDetail', params: {id: product.pid}})">
								<up-image 
								show-loading
								:src="product.img" 
								width="80px" 
								height="80px" 
								radius="8"
								></up-image>
							</view>
							<view class="item u-flex-column u-flex-between u-flex-1 u-m-l-15 info" >
								<view class="title u-line-1">{{product.name}}</view>
								<view class="sku u-line-2 u-info u-font-24 u-flex-1 u-m-b-20">
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
										<u-number-box
											ref="countRef" 
											v-model="product.num"  
											:max="product.stock"
											:min="1"
											asyncChange 
											:buttonSize="25"
											@change="numChange" 
											></u-number-box>
									</view>
								</view>
							</view>
						</view>
						
					</view>
				</view>
			</view>
		</u-checkbox-group> 
		<view class="u-p-30 u-flex u-flex-items-center u-flex-center" v-if="cart_list.length > 0">
			<u-loadmore status="nomore" />
		</view>
		
		
	</view>
	<u-safe-bottom></u-safe-bottom>
	<TabBar :customStyle="customStyle">
		<view class="u-flex u-flex-between u-flex-items-center u-p-l-20 u-p-r-20 u-font-28 cart-bar-w" > 
			<view class="item ">
				<u-checkbox-group>
					<u-checkbox 
						v-model="allCheck" 
						shape="circle" 
						label="全选"
						></u-checkbox>
				</u-checkbox-group>
				
			</view> 
			<view class="item u-flex u-flex-items-center" >
				<view class="u-flex-column u-flex-items-end u-font-28 u-p-r-14">
					<view class="u-flex u-flex-items-center">
						<view class="u-p-t-4">总计：</view>
						<view class="u-flex u-flex-items-center">
							<text class="u-p-t-8 u-error-dark">￥</text>
							<u-count-to 
								:endVal="cart_list_checked_price" 
								separator=","
								:duration="800" 
								:useEasing="true"
								:decimals="2"
								fontSize="18"
								color="#f00"
								bold
							></u-count-to>
						</view>
					</view>
					<view class="u-info">
						已选 {{cart_list_checked_num}} 件选品
					</view>
				</view>
				<view style="width: 100px">
					<u-button type="primary" shape="circle" @click="gotoOrderBtn"  >
						<text class="u-font-32">结算</text> 
					</u-button>
				</view>
				
			</view>
		</view>
	</TabBar> 
	<MenusBar></MenusBar>
</template>

<script setup>
	import { onLoad, onPageScroll } from "@dcloudio/uni-app";
	import { ref, reactive, computed, toRefs, inject, watch, onMounted } from 'vue'
	// import { share } from '@/composition/share.js'
	import useProductSku from '@/composition/useProductSku'
	const {
	    sku2treeData
	} = useProductSku()
	// const { setOnlineControl } = share()
	const $api = inject('$api')
	
	import {useCartStore} from '@/stores/cart.js'
	const cart = useCartStore()
	const { cart_list, cart_list_num, cart_list_checked_num, cart_list_checked_price } = toRefs(cart)
	import {useCateStore, baseStore} from '@/stores/base.js'
	const base = baseStore() 
	const { home, roomList, themeColor } = toRefs(base)
	const cate = useCateStore()
	const { cate_list, cate_loading } = toRefs(cate)
	
	const sum = ref(1220)
	const allCheck = ref(false)
	const cart_checked = computed({
		get() {
			let arr = [];
			cart_list.value.forEach(ele => {
				ele.products.forEach(item => {
					if(item.checked) arr.push(item.id)
				})
			})
			return arr
		},
		set(n) {
			// console.log(n)
			cart_list.value.forEach(ele => {
				ele.products.forEach(item => {
					item.checked = n.includes(item.id) ? true : false
				})
			})
		}
	})
	const customStyle = ref({
		paddingBottom: '50px',
		background: 'transparent' 
	}) 
	onLoad(async () => {
		console.log(cate_list.value)
	})
	onPageScroll((e) => {
		if(e.scrollTop > 30) {
			uni.setNavigationBarColor({
				backgroundColor: '#ffffff',
				frontColor: '#000000',
				animation: {
					duration: 400,
					timingFunc: 'easeIn'
				}
			})
		}
		else {
			uni.setNavigationBarColor({
				backgroundColor: '#f8f8f8',
				frontColor: '#000000',
				animation: {
					duration: 400,
					timingFunc: 'easeIn'
				}
			})
		}
	})
	function gotoOrderBtn() {
		
	}
	
	function checkboxChange(e) {
		console.log(e, cart_list.value)
	}
	
	function numChange(e) { 
		// product_num.value = e.value
		// nextTick(() => {
		// 	countRef.value.init()
		// })
		
		// console.log(product_num.value)
	}
</script>
<style lang="scss">
	.cart-w {
		::v-deep {
			.u-number-box__plus,
			.u-number-box__minus {
				width: 25px!important;
				.u-icon__icon {
					font-size: 12px!important;
				}
			}
		} 
	}
	
</style>
<style lang="scss" scoped>
	.cart-w { 
		padding-bottom: 110px;
		box-sizing: border-box;
		background: linear-gradient(to bottom, #fff, 150px, transparent);
	}
	.cart-bar-w {
		height: 100%; 
		background-color: #fff;
	}
	.shop-card-main {
		.product-item {
			.item {
				&.checkbox {
					height: 80px;
				}
				&.info {
					min-height: 80px;
				}
			}
		}
	}
</style>
