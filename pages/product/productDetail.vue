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
			<view class="u-radius-8 u-primary-light-bg u-m-b-20">
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
							{{$u.timeFrom(new Date(product_list.ctime).getTime(), false)}}
						</view>
					</view>
				</view>
			</view>
			<view class="u-radius-8 bg-white u-m-b-20 u-p-20 u-font-28">   
				<view class="u-flex u-flex-items-center u-p-10 u-p-b-14 u-p-t-14">
					<view class="item u-info-dark u-m-r-20">
						发货
					</view> 
					<view class="item u-p-l-40">
						预计 {{product_list.delivery_delay_day}} 天发货
					</view>
				</view> 
				<view class="u-flex u-flex-items-center u-p-10 u-p-b-14 u-p-t-14">
					<view class="item u-info-dark u-m-r-20">
						分类
					</view>  
					<view class="item u-p-l-40">
						{{cate_active_name}}
					</view>
				</view>  
				<u-line length="100%" margin="10px 0"></u-line>
				<view class="u-flex u-flex-items-center u-p-10 u-p-b-14 u-p-t-14">
					<view class="item u-info-dark u-m-r-30">
						选择
					</view>
					<u-line direction="col" length="15px"></u-line> 
					<view class="item u-p-l-30 u-flex-1">
						{{cate_active_name}}
					</view>
					<u-icon name="arrow-right" color="#ccc"></u-icon>
				</view>  
				<view class="u-flex u-flex-items-center u-p-10 u-p-b-14 u-p-t-14">
					<view class="item u-info-dark u-m-r-30">
						参数
					</view>
					<u-line direction="col" length="15px"></u-line>
					<view class="item u-p-l-30 u-flex-1">
						{{cate_active_name}}
					</view>
					<u-icon name="arrow-right" color="#ccc"></u-icon>
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
	const cate = useCateStore()
	const { cate_list, cate_loading } = toRefs(cate)
	const product_id = ref('')
	const product_list = ref({})
	const swiper_index = ref(0)
	
	const cate_active_name = computed(() => {
		if(!product_list.value.id || cate_list.value.length == 0) return '' 
		return cate_list.value.map(ele => ele.children).flat().filter(ele => ele.id == product_list.value.cate)[0].name
	})
	
	const swiperlist = computed(() => { 
		return product_list.value.pic.split('|')
	})
	
	onLoad(async (options) => {
		if(options.hasOwnProperty('id')) {
			product_id.value = options.id
		}
		if(cate_list.value.length == 0) {
			cate.getCateData()
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
