<template>
	<view> 
		<view class="shop-card u-radius-16 bg-white u-p-b-50 u-p-10">
			<view class="shop-card-header u-flex u-flex-items-center u-flex-between u-p-15">
				<view class="u-flex u-flex-items-center">
					<view class="u-m-r-10">
						<u-icon name="home" color="#999" size="20"></u-icon>
					</view>
					<view class="u-font-30">{{ dataList.company }}</view>
				</view>
				<view class="u-m-l-20">
					{{ dataList.status }}
				</view>
			</view>
			<view class="shop-card-main">
				<view 
					class="product-item u-flex u-flex-items-start u-p-15"
					v-for="product in dataList.pid"
					:key="product.id"
					> 
					<view class="item" >
						<up-image 
						show-loading
						:src="product.img" 
						width="70px" 
						height="70px" 
						radius="8"
						></up-image>
					</view>
					<view class="item u-flex-1 u-m-l-15 info u-font-28" >
						<view class="title u-line-1 u-m-b-10" >
							{{product.name}}
						</view>
						<view class="sku u-line-3 u-info u-font-24 " >
							<text class="u-m-r-15" v-for="(specs, index) in product.specs_arr" :key="index">
								<text>{{specs.label}}：{{specs.value}}；</text>
							</text>
						</view> 
					</view>
					<view class="item u-m-l-30 info u-font-28 u-text-right" >
						<view class="u-flex u-flex-items-end" >
							<text class="u-font-24">￥</text>
							<text class="u-font-28">{{product.price}}</text> 
						</view>
						<view class="u-info">x {{product.num}}</view> 
					</view>
				</view>
				
				<view class="u-flex u-flex-between u-flex-items-center u-p-10">
					<view class="item"></view>
					<view class="item u-flex u-flex-items-center u-font-28">
						<view class="u-m-r-10">合计</view>
						<view class="u-flex u-flex-items-center">
							<view >￥</view>
							<u-count-to 
							:endVal="dataList.total_fee" 
							:startVal="dataList.total_fee" 
							separator="," 
							:decimals="2"
							fontSize="16"
							bold
							color="#000"
							></u-count-to>
						</view>
					</view>
				</view>
				 
			</view>
		</view>
	</view>
</template>

<script setup>
	import { onLoad, onReady, onReachBottom } from "@dcloudio/uni-app";
	import { ref, reactive, computed, toRefs, inject, watch } from 'vue'
	// import { share } from '@/composition/share.js'
	import { baseStore } from '@/stores/base'
	import {userStore} from '@/stores/user'
	const user = userStore()
	const { tmp_id_list } = toRefs(user)
	const base = baseStore();
	const { home, roomList, themeColor } = toRefs(base)
	const props = defineProps({
		origin: {
			type: Object,
			default: () => {
				return {}
			}
		} 
	})
	
	const dataList = computed(() => {
		return {
			...props.origin,
			pid: props.origin.pid.map(ele => { 
				let specs = JSON.parse(ele.specs)
				ele.specs_arr = Object.keys(specs).map(ele => {
					return {
						label: ele,
						value: specs[ele]
					}
				}) 
				return {
					...ele
				}
			})
		}
	})
	
	
</script>

<style lang="scss" scoped>
	.shop-card-main {
		.product-item {
			.item {
				&.checkbox {
					height: 70px;
				}
				&.info {
					min-height: 70px;
				}
			}
		}
	}
</style>