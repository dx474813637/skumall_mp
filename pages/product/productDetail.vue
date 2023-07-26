<template>
	<view>
		<template v-if="product_list.pic">
			<view class="swiper-w">
				<view class="swiper-box">
					<view class="swiper-bg" :style="{
						backgroundImage: `url(${swiperlist[swiper_index]})`
					}"></view>
					<u-swiper
						:list="swiperlist" 
						:current="swiper_index"
						indicator
						indicatorMode="dot"
						indicatorInactiveColor="#f8f8f8"
						indicatorActiveColor="#007aff"
						height="100%"
						imgMode="aspectFit"
						interval="4000"
						duration="600"
						@change="swiperChange"
						circular
						bgColor="rgba(0,0,0,.2)"
					></u-swiper>
				</view>
				
			</view>
			
		</template>
		<view class="u-p-20">
			<view class="u-radius-8 u-primary-light-bg">
				<view class="u-p-20 u-flex u-flex-between u-flex-items-center">
					<view class="item u-error-dark">
						<text class="u-font-28">￥</text>
						<text class="u-font-40">{{product_list.price}}</text>
					</view>
				</view>
				<view class="bg-white u-p-30 u-radius-8">
					<view class="u-flex u-flex-between u-flex-items-start u-font-32 u-m-b-20">
						<view class="item">
							{{product_list.name}}
						</view> 
					</view>
					<view class="u-flex u-flex-between u-flex-items-start u-font-28">
						<view class="item u-info-dark">
							{{product_list.recommend_remark}}
						</view>
						<view class="item u-info u-p-l-30" style="white-space: nowrap;">
							{{$u.timeFrom(new Date(product_list.uptime).getTime(), false)}}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { onLoad, onReady, onShareTimeline, onShareAppMessage, onReachBottom } from "@dcloudio/uni-app";
	import { ref, reactive, computed, toRefs, inject, watch, onMounted } from 'vue'
	import { share } from '@/composition/share.js'
	const { setOnlineControl } = share()
	const $api = inject('$api')
	
	import {useCateStore, baseStore} from '@/stores/base.js'
	const base = baseStore()
	const product_id = ref('')
	const product_list = ref({})
	const swiper_index = ref(0)
	
	const swiperlist = computed(() => { 
		return product_list.value.pic.split('|')
	})
	
	onLoad(async (options) => {
		if(options.hasOwnProperty('id')) {
			product_id.value = options.id
		}
		uni.showLoading()
		await getData()
	}) 
	
	async function getData() {
		const res = await $api.web_product_detail({params: {id: product_id.value}})
		if(res.code == 1) {
			product_list.value = res.list
		}
	}
	function swiperChange({current, currentItemId, source}) { 
		swiper_index.value = current
	}
	
	
</script>

<style lang="scss" scoped>
	.swiper-w {
		position: relative;
		width: 100%;
		padding-top: 100%;
		overflow: hidden;
		.swiper-box {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 10;
			.swiper-bg {
				background-size: 100% 100%;
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%; 
				filter: blur(5px);
				transform: scale(1.05);
			}
		}
	}

</style>
