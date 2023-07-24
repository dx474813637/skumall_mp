<template>
	<view class="w u-flex-column">
		<view class="header bg-white u-p-20 u-flex u-flex-items-center"> 
			<view class="item u-flex-1">
				<u-search
					placeholder="请输入关键字" 
					v-model="terms" 
					:showAction="false"
					@search="handleSearch"
				></u-search>
			</view>
			
		</view>
		<view class="nav-w bg-white u-p-20 u-flex">
			<view class="item item-cate u-flex u-flex-items-center" @click="showCateList = true">
				<view class="u-info">筛选类别：</view>
				<view class="u-primary u-p-r-10">全部</view>
				<u-icon name="arrow-down-fill" color="#ccc" size="12"></u-icon>
			</view> 
		</view>
		<view class="list "> 
			 <view class="list-item card u-p-20 u-p-l-40 u-p-r-40 u-radius-6 bg-white uni-shadow-base u-m-b-20" v-for="item in dataList" :key="item.id">
			 	<view> 
					{{item.name}}
			 	</view>
			 		 
			 </view>	
			<template v-if="dataList.length == 0">
				<u-empty mode="data" :icon="base.empty" />
			</template>
			<template v-else>
				<u-loadmore :status="loadstatus" />
			</template>  
			 		
		</view>
		<u-safe-bottom></u-safe-bottom>
	</view>
	
	<CateProductPopup
		:show="showCateList" 
		title="商品分类" 
		:onUpdateShow="handleChangeShow"
		@onConfirm="handleChangeCate"
	></CateProductPopup>
	<MenusBar></MenusBar>
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
	const terms = ref('')
	const nav_index = ref(0)
	
	const showCateList = ref(false)
	const curP = ref(1)
	const cateId = ref('')
	const dataList = ref([])
	const loadstatus = ref('loadmore')
	const params = computed(() => {
		return {
			p: curP.value,
			cate: cateId.value,
			terms: terms.value
		}
	})
	onLoad(async (options) => {
		if(options.hasOwnProperty('terms')) {
			terms.value = options.terms
		}
		if(cate_list.value.length == 0) {
			cate.getCateData()
		}
		await initData()
	})
	
	
	onReachBottom( () => {
		if(tabs_current.value != 1) return
		getMoreData()
	}) 
	async function getMoreData() {
		if(loadstatus.value != 'loadmore') return
		curP.value ++
		await getData()
	}
	async function getData() {
		const res = await $api.web_product({params: params.value})
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
	function initDataParams() {
		curP.value == 1;
		dataList.value = []
	}
	async function initData() {
		uni.showLoading()
		initDataParams();
		await getData()
	} 
	
	async function handleSearch() {
		await initData()
	}
	function handleChangeShow(data) {
		showCateList.value = data
	}
	function handleChangeCate(obj) {
		cateId.value = obj.data.id 
		handleChangeShow(false)
		initData()
	}
	 
	
</script>

<style >
page {
	height: 100vh;
	padding-bottom: 50px;
	box-sizing: border-box;
}
</style>
<style lang="scss" scoped>
	.w {
		height: 100%;
		.list {
			height: 100%;
			>.item {
				height: 100%;
				&.item-nav-w {
					flex: 0 0 100px;
					background-color: #fff;
					.nav {
						.nav-item {
							font-size: 14px;
							padding: 15px 10px;
							border-bottom: 1rpx solid #f8f8f8;
							box-sizing: border-box;
							color: #666;
							&.active {
								background-color: #f8f8f8;
								color: #000;
							}
						}
					}
				}
				&.item-content-w {
					background-color: #f8f8f8;
					box-sizing: border-box;
					.item-card {
						flex: 0 0 48%;
						margin-bottom: 4%;
						margin-right: 4%;
						box-sizing: border-box;
						&:nth-of-type(2n) {
							margin-right: 0;
						}
					}
				}
			}
		}
	}
</style>
