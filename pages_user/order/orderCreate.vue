<template>
	
	<view class="cart-w u-m-t-20 u-radius-20">
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
						 @click="base.handleGoto({url: '/pages/product/productDetail', params: {id: product.pid}})"
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
</template>

<script setup>
	import { onLoad, onPageScroll } from "@dcloudio/uni-app";
	import { ref, reactive, computed, toRefs, inject, watch, onMounted, nextTick } from 'vue'
	// import { share } from '@/composition/share.js'
	import useProductSku from '@/composition/useProductSku'
	const {
	    sku2treeData
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
	 
	
</script>

<style lang="scss">

</style>
