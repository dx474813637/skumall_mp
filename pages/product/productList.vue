<template>
	<view class="w ">
		<u-sticky>
			<view class="header bg-white u-p-10 u-p-l-20 u-p-r-20 u-flex u-flex-items-center">
				<view class="item u-flex-1">
					<u-search
						placeholder="请输入关键字" 
						v-model="terms" 
						:showAction="false"
						@search="handleSearch"
					></u-search>
				</view>
				
			</view>
			<view class="nav-w bg-white u-p-20 u-flex" v-if="!terms">
				<view class="item item-cate u-flex u-flex-items-center u-font-28" @click="showCateList = true">
					<view class="u-info">筛选类别：</view>
					<view class="u-primary u-p-r-10">{{cate_label}}</view>
					<u-icon name="arrow-down-fill" color="#ccc" size="12"></u-icon>
				</view> 
			</view>
		</u-sticky>
		
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
	const cate_label = ref('全部')
	const dataList = ref([])
	const loadstatus = ref('loadmore')
	const params = computed(() => {
		if(terms.value) {
			return {
				p: curP.value, 
				terms: terms.value
			}
		}
		else {
			return {
				p: curP.value,
				cate: cateId.value 
			}
		}
		
	})
	const func = computed(() => {
		return terms.value ? 'web_search' : 'web_product'
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
		getMoreData()
	}) 
	async function getMoreData() {
		if(loadstatus.value != 'loadmore') return
		curP.value ++
		await getData()
	}
	async function getData() {
		if(loadstatus.value == 'loading') return
		loadstatus.value = 'loading'
		const res = await $api[func.value]({params: params.value})
		if (res.code == 1) { 
			dataList.value = [...dataList.value, ...res.list]
			if(dataList.value.length >= +res.total) {
				loadstatus.value = 'nomore'
			}
			else {
				loadstatus.value = 'loadmore'
			}
		}
	}
	function initDataParams() {
		curP.value = 1;
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
		cate_label.value = obj.cate_label
		handleChangeShow(false)
		initData()
	}
	 
	
</script>

<style > 
</style>
<style lang="scss" scoped>
	.w {
		height: 100%;
		padding-bottom: 50px;
		.list {
			box-sizing: border-box;
			>.list-item {
				flex: 0 0 50%;
				box-sizing: border-box;
			}
		}
	}
</style>
