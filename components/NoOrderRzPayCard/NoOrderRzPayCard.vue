<template>
	<view class="card bg-white u-radius-12 u-p-20" @click="cardClick">
		<!-- <view class="card-header u-flex u-flex-items-center u-flex-between u-m-b-20 u-font-30">
			<view class="item u-flex u-flex-items-end">
				<view class="name u-flex u-flex-items-center">
					<u-icon name="account-fill" size="16" color="#afd2ff"></u-icon>
					<text class="u-m-l-10 u-line-1">{{origin.company}}</text> 
				</view>
				<view class="u-m-l-20 u-flex u-flex-items-center">
					<u-icon name="phone-fill" size="16" color="#afd2ff"></u-icon>
					<text class="u-m-l-10">{{origin.mobile}}</text> 
				</view>
			</view>
			<view class="item text-nowrap u-m-l-20">
				<u-tag type="primary" size="mini" text="已激活" v-if="origin.state == '1'"></u-tag>
			</view>
		</view> -->
		<view class="card-row u-font-28 u-flex u-flex-items-start u-flex-between u-m-b-10" v-if="origin.product_name">
			<view class="item  u-m-l-10 u-info">
				商品名称
			</view>
			<view class="item u-m-l-20 u-line-2 u-flex-1 u-text-right" >
				{{origin.product_name}}
			</view>
		</view>
		<view class="card-row u-font-28 u-flex u-flex-items-start u-flex-between u-m-b-10">
			<view class="item  u-m-l-10 u-info">
				商品描述
			</view>
			<view class="item u-m-l-20 u-line-2 u-flex-1 u-text-right" >
				{{origin.product_intro}}
			</view>
		</view>
		<view class="card-row u-font-28 u-flex u-flex-items-start u-flex-between u-m-b-10">
			<view class="item  u-m-l-10 u-info">
				卖家
			</view>
			<view class="item u-m-l-20 u-line-2 u-flex-1 u-text-right" >
				{{origin.sell_company}}
			</view>
		</view>
		<view class="card-row u-font-28 u-flex u-flex-items-start u-flex-between u-m-b-10">
			<view class="item  u-m-l-10 u-info">
				买家
			</view>
			<view class="item u-m-l-20 u-line-2 u-flex-1 u-text-right" >
				{{origin.buy_company}}
			</view>
		</view>
		<view class="card-row u-font-28 u-flex u-flex-items-start u-flex-between u-m-b-10">
			<view class="item  u-m-l-10 u-info">
				融资金额
			</view>
			<view class="item u-m-l-20 u-line-2 u-flex-1 u-text-right" >
				{{origin.price}}
			</view>
		</view>
		<view class="card-row u-font-28 u-flex u-flex-items-start u-flex-between u-info">
			<view class="item  u-m-l-10 u-info">
				融资时间
			</view>
			<view class="item u-m-l-20 u-line-2 u-flex-1 u-text-right" >
				{{origin.post_time}}
			</view>
		</view>
	</view>
</template>

<script setup>
	import { onLoad, onReady, onReachBottom } from "@dcloudio/uni-app";
	import { ref, reactive, computed, toRefs, inject, watch, onMounted } from 'vue'  
	const $api = inject('$api') 
	import { baseStore } from '@/stores/base.js'
	const base = baseStore() 
	const { themeColor, regional_list, regional_list_loading } = toRefs(base) 
	
	const props = defineProps({
		origin: {
			type: Object,
			default: () => {
				return {}
			}
		} 
	})
	 
	const emits = defineEmits(['cardClick'])
	function cardClick() { 
		// emits('cardClick')
		base.handleGoto({
			url: '/pages_finance/order_rz_pay/order_rz_pay',
			params: {
				id: props.origin.id
			}
		})
	}
	
</script>

<style lang="scss" scoped>
	.name {
		font-weight: bold;
	}
</style>