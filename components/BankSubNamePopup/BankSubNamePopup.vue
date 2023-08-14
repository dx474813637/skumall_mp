<template>
	<view>
		<PopupNormal v-bind="$attrs" >
			<!-- <template #header>
				<view class="u-flex u-flex-between u-flex-items-center">
					<view class="item u-font-28 u-primary" @click="handleRefresh">刷新</view>
					<view class="u-text-center">
						{{$attrs.title}}
					</view> 
					<view class="item u-font-28 u-error-dark" @click="$attrs.onUpdateShow(false)">取消</view>
					
				</view>
			</template> -->
			<view class="search bg-white u-p-20">
				<u-search
					placeholder="建议多个关键字用空格分隔搜索，如：平安 杭州" 
					v-model="keyword" 
					:showAction="false"
					@search="handleSearch"
					@custom="handleSearch"
				></u-search>
			</view>
			<view class="list-w">
				<view class="load-bg u-flex u-flex-center u-flex-items-center" v-if="$attrs.loadstatus">
					<u-loading-icon text="加载中"></u-loading-icon>
				</view> 
				<view class="list-item item-right u-flex-1"> 
					<scroll-view 
						class="main-list" 
						scroll-y 
						@scrolltolower="scrolltolower"
						enableBackToTop
						>
						<view
							v-for="(item, index) in dataList"
							:key="item.bank_no">
							<view class="u-p-10">
								<view class="u-p-20 u-flex u-flex-items-center bg-white u-radius-5 u-border"
									@click="selectLabel(item)"
								>
									<view class="u-font-32 u-info-dark">{{item.bank_name}}</view> 
								</view>
							</view>
						</view>
						<template v-if="dataList.length == 0">
							<u-empty mode="data" :icon="base.empty" />
						</template>
						<template v-else>
							<u-loadmore :status="loadstatus" />
						</template>  
					</scroll-view>
				</view>
			</view> 
		</PopupNormal>
	</view>
</template>

<script setup>
	import { onLoad, onReady } from "@dcloudio/uni-app";
	import { onMounted, ref, reactive, computed, toRefs, inject, watch, useAttrs } from 'vue' 
	import { baseStore } from '@/stores/base'
	import { userStore } from '@/stores/user'
	import { useFinanceStore } from '@/stores/finance'  
	import useDataList from '@/composition/useDataList.js'
	const attrs = useAttrs()
	const $api = inject('$api')    
	const finance = useFinanceStore()
	const base = baseStore()
	const {  
		bank_list, 
		bank_loading,  
	} = toRefs(finance)   
	const emits = defineEmits(['onConfirm'])
	 
	const keyword = ref('')
	const options = computed(() => {
		return {
			params: {
				term: keyword.value, 
			},
			api: 'get_bank_name',
			noReach: true
		}
	})
	const { 
		dataList,
		curP,
		loadstatus,
		params,
		initDataListParams
	} = useDataList(options)
	
	async function handleRefresh() {
		await handleSearch()
	}
	
	async function handleSearch() {
		initDataListParams()
		await getDataList()
	}
	function selectLabel(menu) {
		emits('onConfirm', {...menu}) 
	}
	function scrolltolower() { 
		getMoreDataList()
	}
	async function getMoreDataList() {
		if(loadstatus.value != 'loadmore') return
		curP.value ++
		await getDataList()
	} 
	async function getDataList() { 
		console.log(params.value, dataList.value)
		const res = await $api[options.value.api]({params: params.value})
		if (res.code == 1) { 
			dataList.value = [...dataList.value, ...res.list]
			if(res.list.length == 0) {
				loadstatus.value = 'nomore'
			}
			else {
				loadstatus.value = 'loadmore'
			}
		}
	}
	 
</script>

<style lang="scss" scoped>
	.list-w {
		height: 60vh;
		background-color: #e8e8e8;
		.list-item {
			height: 100%;
			&.item-left {
				flex: 0 0 35%;
				background-color: #f8f8f8;
			}
		}
	}
	.nav-item {
		color: #666; 
		filter: grayscale(100%);
		&.active-nav {
			background-color: #e8e8e8;
			color: $u-primary; 
			filter: none;
		}
	}
	.main-list {
		height: 100%;
	}
	.item-card { 
		background-color: #f8f8f8;
		box-sizing: border-box;  
		margin-bottom: 10px; 
		padding: 10px;
		color: #666;
		border-radius: 5px;
		&.active {
			background-color: $u-primary-light;
			color: $u-primary;
		}
	}
</style>