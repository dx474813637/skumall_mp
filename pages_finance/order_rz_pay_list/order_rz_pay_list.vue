<template>
	<view class="w">
		<u-sticky bgColor="#f8f8f8">
			<!-- <view class="tabs-w">
				<u-tabs
					:list="tabs_list"  
					lineWidth="0"
					:current="tabs_current" 
					:activeStyle="{
						color: themeColor
					}"
					@change="handleTabsChange"
				></u-tabs>	
			</view> -->
			<view class="select-w bg-white u-p-20" @click="show = true">
				<u-input 
					v-model="statusStr" 
					readonly
					placeholder="请选择" 
					@click="show = true"
					suffixIcon="arrow-down"
					suffixIconStyle="color: #999; font-size: 16px"
					></u-input> 
			</view>
		</u-sticky>
		
		
		
		<view class="list u-p-10">  
			<view 
				class="list-item u-p-10" 
				v-for="item in dataList" 
				:key="item.id">
				<NoOrderRzPayCard
					:origin="item"
					@detailClick="detailClick"
				></NoOrderRzPayCard>
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
	
	<u-action-sheet 
		:actions="tabs_list" 
		:show="show" 
		@close="show = false"
		@select="actionSheetCallback"
	></u-action-sheet>
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
		{ name: '全部状态', value: '', disabled: false },
		{ name: '融资申请中', value: '1', disabled: false },
		{ name: '流程暂停', value: '2', disabled: false },
		{ name: '财务已拒绝', value: '3', disabled: false }, 
		{ name: '放款机构已同意', value: '4', disabled: false },
		{ name: '放款机构已拒绝', value: '5', disabled: false },
		{ name: '提款成功', value: '6', disabled: false }, 
		{ name: '提款失败', value: '7', disabled: false }, 
	]) 
	const show = ref(false)
	const status = ref('')
	const statusStr = computed(() => {
		return tabs_list.value.filter(ele => ele.value == status.value)[0]?.name
	})
	const options = computed(() => {
		return {
			params: {  
				rz_status: status.value
			},
			api: 'no_order_rz_pay_list',
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
	function actionSheetCallback(e) { 
		// console.log(e)
		status.value = e.value;
		show.value = false
		initDataList() 
	}
	function detailClick({data}) {
		uni.navigateTo({
			url:`/pages_finance/pacc_query/pacc_query?id=${data.id}`
		})
	}
	// function handleTabsChange(data) {
	// 	tabs_current.value = +data.index
	// 	initDataList()
	// }  
</script>

<style scoped lang="scss">
.w {
	min-height: 100vh;
	padding-bottom: 60px;
} 
.card {
	
}
</style>