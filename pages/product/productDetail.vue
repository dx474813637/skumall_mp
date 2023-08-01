<template>
	<view class="w">
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
			
			
			<view class="u-radius-8 u-m-b-20 u-p-30 shop-card">  
				<view class="u-flex u-flex-center u-flex-items-center u-font-36 u-m-b-20">
					<view class="item u-m-r-20" v-if="company_list.img">
						<u--image 
							showLoading
							:src="company_list.img"
							width="34px"
							height="34px"
							shape="circle"
							:customStyle="{
								border: '2px solid #99d0ff'
							}"
						/>
					</view>
					<view class="item u-flex-1">
						{{ company_list.company }}
					</view>
					<view class="item">
						<u-button shape="circle" plain type="primary" size="small">进入店铺</u-button>
					</view>
				</view>
				<view class="u-flex u-flex-center u-font-30 u-m-b-10">
					<view class="item u-flex-1 u-flex u-flex-items-start">
						<text class="u-info u-m-r-8 text-nowrap">联系人：</text>
						<text>{{ company_list.contacts }}</text> 
					</view>
				</view>
				<view class="u-flex u-flex-center u-font-30 u-m-b-10" v-if="company_list.address">
					<view class="item u-flex-1 u-flex u-flex-items-start">
						<text class="u-info u-m-r-8 text-nowrap">地址：</text>
						<text class="u-line-1">{{ company_list.address }}</text> 
					</view>
				</view>
				<view class="u-flex u-flex-center u-font-30 u-m-b-10">
					<view class="item u-flex-1 u-flex u-flex-items-start">
						<text class="u-info u-m-r-8 text-nowrap">介绍：</text>
						<text class="u-line-2">{{ company_list.info }}</text> 
					</view>
				</view>
			</view> 
			
			
			
		</view>
		<view class="pro-desc">
			<view class="item"
				v-for="(item, index) in product_desc_arr"
				:key="index"
				>
				<u--image
					showLoading
					:src="item"
					width="100%"
					height="auto"
					mode="widthFix" 
				/>
			</view>
			
		</view>
		<u-safe-bottom></u-safe-bottom>
	</view>
	<TabBar :customStyle="{boxShadow: '0px -3px 10px rgba(0,0,0,0.1)' }">
		<view class="u-flex u-flex-between u-flex-items-center u-p-l-20 u-p-r-20 u-font-28" style="height: 100%;">
			
			<view class="item u-flex-column u-flex-items-center u-m-r-20" v-if="!hideHomeBtn" @click="base.handleGoto({type: 'reLaunch', url: '/pages/index/index'})">
				<u-icon name="home" :color="themeColor" size="22"></u-icon>
				<view class="u-info">首页</view>
			</view>
			<view class="item u-flex-column u-flex-items-center u-m-r-20" @click="base.handleGoto({type: 'reLaunch', url: '/pages_user/reservation_list/reservation_list'})">
				<u-icon name="list-dot" :color="themeColor" size="22"></u-icon>
				<view class="u-info">店铺</view>
			</view>
			<view class="item u-flex-column u-flex-items-center u-m-r-20" @click="base.handleGoto({type: 'reLaunch', url: '/pages/reservation_list/reservation_list'})">
				<u-icon name="list-dot" :color="themeColor" size="22"></u-icon>
				<view class="u-info">购物车</view>
			</view> 
			<view class="item u-flex-1 u-m-r-20">
				<u-button type="primary" shape="circle" @click="addCartBtn"  >
					<view class="u-flex"> 
						<text class="u-m-l-8 u-p-b-5 u-font-32">加入采购车</text>
					</view>
				</u-button>
			</view>
		</view>
	</TabBar> 
</template>

<script setup>
	import { onLoad, onReady, onShareTimeline, onShareAppMessage, onReachBottom } from "@dcloudio/uni-app";
	import { ref, reactive, computed, toRefs, inject, watch, onMounted } from 'vue'
	import { share } from '@/composition/share.js'
	const { setOnlineControl } = share()
	const $api = inject('$api')
	
	import {useCateStore, baseStore} from '@/stores/base.js'
	const base = baseStore() 
	const { home, roomList, themeColor } = toRefs(base)
	const cate = useCateStore()
	const { cate_list, cate_loading } = toRefs(cate)
	const product_id = ref('')
	const product_list = ref({})
	const company_list = ref({})
	const spec_prices = ref([])
	const swiper_index = ref(0)
	
	const cate_active_name = computed(() => {
		if(!product_list.value.id || cate_list.value.length == 0) return '' 
		return cate_list.value.map(ele => ele.children).flat().filter(ele => ele.id == product_list.value.cate)[0].name
	})
	
	const swiperlist = computed(() => { 
		return product_list.value.pic.split('|')
	})
	
	const product_desc_arr = computed(() => {
		if(!product_list.value.description  ) return [] 
		return product_list.value.description.split('|')
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
			company_list.value = res.company
			spec_prices.value = res.spec_prices
		}
	}
	function swiperChange({current, currentItemId, source}) { 
		swiper_index.value = current
	}
	
	function addCartBtn() {
		
	}
	
	
</script>

<style lang="scss" scoped>
	.w {
		padding-bottom: 60px;
	}
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
	.shop-card {
		background: linear-gradient(to bottom, #e7e9ff, #f3f9ff);
	}
</style>
