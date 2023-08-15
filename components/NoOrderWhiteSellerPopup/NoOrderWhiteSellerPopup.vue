<template>
	<view>
		<PopupNormal v-bind="$attrs"  @open="open"> 
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
								<NoOrderWhiteSellerCard
									:origin="item"
									:gotoDetail="false"
									@cardClick="onConfirm"
								></NoOrderWhiteSellerCard>
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
	import {
		ref,
		toRefs,
		inject,
		computed,
		onMounted,
		reactive, 
		watch
	} from 'vue' 
	import {useCateStore, baseStore} from '@/stores/base.js'
	import useDataList from '@/composition/useDataList.js'
	const base = baseStore()
	const cate = useCateStore()
	const { cate_list, cate_loading } = toRefs(cate)
	const { themeColor } = toRefs(base) 
	const white_seller_list = ref([])
	const white_seller_list_loading = ref(false)
	const emits = defineEmits(['onConfirm']) 
	 
	const options = computed(() => {
		return {
			params: {
				state: 1, 
			},
			api: 'no_order_white_sell_list',
			noReach: true,
			getDataCallBack: (res) => {
				console.log(res)
				if (res.code == 1) {
					dataList.value = [...dataList.value, ...res.list.list]
					if(curP.value >= res.list.pw_page_total) {
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
	function onConfirm (item) {
		emits('onConfirm', item)
	}
	async function open() {  
		if(white_seller_list.value.length == 0 && !white_seller_list_loading.value) {
			await initDataList()
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
				flex: 0 0 30%;
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