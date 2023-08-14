<template>
	<view class="w">
		<u-sticky bgColor="#f8f8f8">
			<view class="tabs-w">
				<u-tabs
					:list="tabs_list"  
					lineWidth="0"
					:current="tabs_current" 
					:activeStyle="{
						color: themeColor
					}"
					@change="handleTabsChange"
				></u-tabs>	
			</view> 
		</u-sticky>
		
		
		
		<view class="list u-p-10">  
			<view 
				class="list-item u-p-10" 
				v-for="item in dataList" 
				:key="item.id">
				<NoOrderWhiteSellerCard
					:origin="item"
				></NoOrderWhiteSellerCard>
			</view>
			<template v-if="dataList.length == 0">
				<u-empty mode="data" :icon="base.empty" />
			</template>
			<template v-else>
				<u-loadmore :status="loadstatus" />
			</template>  
				
				
			<u-safe-bottom></u-safe-bottom>
		</view>	 
	</view>
	<!-- <MenusBar></MenusBar> -->
</template>

<script setup>
	import { onLoad, onReady, onReachBottom } from "@dcloudio/uni-app";
	import { ref, reactive, computed, toRefs, inject, watch } from 'vue'
	import useDataList from '@/composition/useDataList.js' 
	import { baseStore } from '@/stores/base'
	import {userStore} from '@/stores/user'
	const user = userStore()
	const { tmp_id_list } = toRefs(user)
	const base = baseStore();
	const { home, roomList, themeColor } = toRefs(base) 
	const $api = inject('$api')   
	const tabs_current = ref(0)
	const tabs_list = ref([
		{
			name: '全部',
			disabled: false,
			value: ''
		},
		{
			name: '已激活',
			disabled: false,
			value: '1'
		},
	]) 
	
	const options = computed(() => {
		return {
			params: {  
				state: tabs_list.value[tabs_current.value].value
			},
			api: 'no_order_white_sell_list',
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
	
	onLoad(async (options) => { 
		if(options.hasOwnProperty('zt')) {
			tabs_current.value = +tabs_list.value.findIndex(ele => ele.value == options.zt) 
		}
		initDataList() 
	}) 
	function handleTabsChange(data) {
		tabs_current.value = +data.index
		initDataList()
	}  
</script>

<style scoped lang="scss">
.w {
	min-height: 100vh;
	padding-bottom: 60px;
} 
.card {
	
}
</style>