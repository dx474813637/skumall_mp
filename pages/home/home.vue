<template>
	<view class="header u-p-20">
		<view class="search-w u-flex u-flex-items-center">
			<u-search
				placeholder="请输入商品关键词" 
				v-model="keyword"
				bgColor="#fff"
				borderColor="#007aff"
				:showAction="false"
				@search="handleSearch"
				></u-search>
				<view class="u-m-l-10">
					<u-button 
						type="primary" 
						shape="circle"
						size="small"
						color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))"
						customStyle="height: 34px"
						@click="handleSearch"
						>搜索</u-button>
				</view>
		</view>
		<view class="swiper u-m-t-30 u-m-b-30">
			<u-swiper
				:list="swiperList" 
				keyName="img"
				radius="10"
				@click="swiperclick"
			></u-swiper>
		</view>
		<view class="nav u-flex u-flex-wrap u-flex-items-start">
			<view class="nav-item u-flex-column u-flex-items-center u-m-b-20"
				v-for="(item, index) in navList"
				:key="index"
				@click="click"
			>
				<up-image 
					:show-loading="true" 
					:src="item.img" 
					width="50px" 
					height="50px" 
				></up-image>
				<view class="u-line-1 u-m-t-10 u-font-24">
					{{item.name}}
				</view>
			</view>
		</view>
	</view>
	<view class="u-flex u-flex-items-center u-flex-between u-p-20">
		<view class="text-bold u-font-38  text-black">
			优选店铺
		</view> 
	</view>
	<view class="shop-w u-p-20">
		<view class=" bg-white u-radius-8">
			<view class="shop-tabs u-border-bottom">
				<u-tabs 
					lineWidth="0"
					:list="shopTabs" 
					:current="shopCurrent"
					@click="shopTabsClick"
				></u-tabs>
			</view>
			<view class="shop-main u-p-30" @click="base.handleGoto({
					url: '/pages/shop/shop',
					params: {
						login: 'netsun_lzy'
					}
				})">
				<view class="shop-header u-flex u-m-b-20">
					<view class="item u-m-r-10">
						<up-avatar 
							src="https://cdn.uviewui.com/uview/swiper/swiper1.png"  
						></up-avatar> 
					</view>
					<view class="item u-flex-1">
						<view class="u-m-b-5">网盛图书</view>
						<view class="u-font-28 text-thin">地址：杭州市滨江区立业路788号</view>
					</view>
				</view>
				<scroll-view 
					scroll-x="true"
					class="shop-center u-m-b-20 u-radius-8" 
					>
					<view class="p"
						v-for="item in dataList.slice(0, 6)"
						:key="item.id"
					>
						<ProductColCard
							:origin="item"
						></ProductColCard>
					</view>
				</scroll-view>
				<view class="shop-footer">
					<view class="u-p-20 u-info u-font-24 u-info-bg u-radius-8" >
						<view class="u-line-2">
							本店主营精品图书、少儿图书、工具书、历史、社科类图书。经营的产品，品种齐全、价格合理。欢迎各界客户来电咨询，洽谈合作。
						</view> 
					</view>
				</view>
			</view>
		</view>
	</view>
	<view class="u-flex u-flex-items-center u-flex-between u-p-20">
		<view class="text-bold u-font-38  text-black">
			推荐商品
		</view>
		<view class="item u-flex u-flex-items-center u-font-28 u-info">
			<view class="u-m-r-10">全部商品</view>
			<u-icon name="arrow-right" color="#999" size="14"></u-icon>
		</view>
	</view>
	<view class="list u-flex u-flex-wrap u-flex-items-start u-p-10">
		 <view 
			class="list-item u-p-14" 
			v-for="item in dataList" 
			:key="item.id"
			>
		 	<ProductColCard
				:origin="item"
			></ProductColCard>
		 		 
		 </view>	
		
		 		
	</view>
	<template v-if="dataList.length == 0">
		<view class="u-flex u-flex-center u-p-40">
			<u-empty mode="data" :icon="base.empty" />
		</view>
		
	</template>
	<template v-else>
		<u-loadmore :status="loadstatus" />
	</template>  
	
	
	<view class="u-p-b-50 u-p-t-50"></view>
	<u-safe-bottom></u-safe-bottom>
	<MenusBar ></MenusBar>
</template>

<script setup>
	import { onLoad, onReady, onShareTimeline, onShareAppMessage, onReachBottom } from "@dcloudio/uni-app";
	import { ref, reactive, computed, toRefs, inject, watch, onMounted } from 'vue'
	import { share } from '@/composition/share.js'
	import useDataList from '@/composition/useDataList.js'
	import {useCateStore, baseStore} from '@/stores/base.js'
	const base = baseStore()
	const { setOnlineControl } = share()
	const $api = inject('$api')
	const keyword = ref('')
	const shopCurrent = ref(0)
	const swiperList = ref([
		{
			img: 'https://cdn.uviewui.com/uview/swiper/swiper1.png',
			url: '/pages/cateList/cateList'
		},
		{
			img: 'https://cdn.uviewui.com/uview/swiper/swiper2.png',
			url: '/pages/cateList/cateList'
		},
		{
			img: 'https://cdn.uviewui.com/uview/swiper/swiper3.png',
			url: '/pages/cateList/cateList'
		},
	])
	const shopTabs = ref([
		{
			name: '店铺1'
		},
		{
			name: '店铺2'
		},
		{
			name: '店铺3'
		},
		{
			name: '店铺4'
		},
	])
	const navList = ref([
		{
			name: '当季新品',
			url: '/pages/cateList/cateList',
			img: 'https://cdn.uviewui.com/uview/swiper/swiper3.png'
		},
		{
			name: '当季新品',
			url: '/pages/cateList/cateList',
			img: 'https://cdn.uviewui.com/uview/swiper/swiper3.png'
		},
		{
			name: '当季新品',
			url: '/pages/cateList/cateList',
			img: 'https://cdn.uviewui.com/uview/swiper/swiper3.png'
		},
		{
			name: '当季新品',
			url: '/pages/cateList/cateList',
			img: 'https://cdn.uviewui.com/uview/swiper/swiper3.png'
		},
		{
			name: '当季新品',
			url: '/pages/cateList/cateList',
			img: 'https://cdn.uviewui.com/uview/swiper/swiper3.png'
		},
		{
			name: '当季新品',
			url: '/pages/cateList/cateList',
			img: 'https://cdn.uviewui.com/uview/swiper/swiper3.png'
		},
		{
			name: '当季新品',
			url: '/pages/cateList/cateList',
			img: 'https://cdn.uviewui.com/uview/swiper/swiper3.png'
		},
		{
			name: '当季新品',
			url: '/pages/cateList/cateList',
			img: 'https://cdn.uviewui.com/uview/swiper/swiper3.png'
		},
		{
			name: '当季新品',
			url: '/pages/cateList/cateList',
			img: 'https://cdn.uviewui.com/uview/swiper/swiper3.png'
		},
		{
			name: '当季新品',
			url: '/pages/cateList/cateList',
			img: 'https://cdn.uviewui.com/uview/swiper/swiper3.png'
		},
	])
	  
	const options = computed(() => {
		return {
			params: {},
			api: 'web_product',
			getDataCallBack: (res) => {  
				if (res.code == 1) {
					dataList.value = [...dataList.value, ...res.list]
					if(dataList.value.length >= res.total) {
						loadstatus.value = 'nomore'
					}
					else {
						loadstatus.value = 'loadmore'
					}
				}
			}
		}
	})
	
	const { 
		dataList,
		curP,
		loadstatus,
		params,
		getDataList,
		initDataList, 
	} = useDataList(options)
	onLoad(async () => {
		initDataList()
	})
	 
	
	function swiperclick(e) {
		if(swiperList.value[e].url) {
			uni.navigateTo({
				url: swiperList.value[e].url
			})
		}
	}
	function shopTabsClick(e) {
		shopCurrent.value = +e.index
	}
</script>

<style lang="scss" scoped>
.header {
	background-color: #fff;
	background-image: linear-gradient(to bottom, #cee2ff, #fff);
}
.nav {
	.nav-item {
		flex: 0 0 20%
	}
}
.u-info-bg {
	background-color: #f2f2f2;
}
.list {
			box-sizing: border-box;
			>.list-item {
				flex: 0 0 50%;
				box-sizing: border-box;
			}
		}
.shop-center { 
	width: 100%;
	white-space: nowrap;
	background-color: #f2f2f2;
	padding: 10px;
	box-sizing: border-box;
	.p {
		display: inline-block;
		margin-right: 10px;
		width: 35vw;
		&:last-child {
			margin-right: 0;
		}
	}
}
</style>
