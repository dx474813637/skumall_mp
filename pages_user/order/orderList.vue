<template>
	<view class="w">
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
		
		
		<view class="list u-p-10">  
			<view class="list-item u-p-10" v-for="item in my_order_list" :key="item.id">
				<OrderCard
					:origin="item"
				></OrderCard>
			</view>
			<template v-if="my_order_list.length == 0">
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
	// import { share } from '@/composition/share.js'
	import { baseStore } from '@/stores/base'
	import {userStore} from '@/stores/user'
	const user = userStore()
	const { tmp_id_list } = toRefs(user)
	const base = baseStore();
	const { home, roomList, themeColor } = toRefs(base)
	// const {
	// 	setOnlineControl,
	// 	onlineControl
	// } = share()
	const $api = inject('$api')  
	const my_order_list = ref([])
	const role = ref('1')
	const curP = ref(1)
	const loadstatus = ref('loadmore')
	const params = computed(() => {
		return {
			p: curP.value, 
			role: role.value,
			type: tabs_list.value[tabs_current.value].value
		}
	})  
	const tabs_current = ref(0)
	const tabs_list = ref([
		{
			name: '全部',
			disabled: false,
			value: '0'
		},
		{
			name: '待付款',
			disabled: false,
			value: '1'
		},
		{
			name: '待收货',
			disabled: false,
			value: '2'
		},
		{
			name: '已完成',
			disabled: false,
			value: '3'
		}
	])
	onLoad(async (options) => {
		if(options.hasOwnProperty('role')) {
			role.value = options.role
		}
		if(options.hasOwnProperty('zt')) {
			tabs_current.value = +tabs_list.value.findIndex(ele => ele.value == options.zt) 
		}
		initMyOrder() 
	}) 
	onReachBottom( () => {
		if(tabs_current.value != 1) return
		getMoreMyOrder()
	}) 
	async function getMoreMyOrder() {
		if(loadstatus.value != 'loadmore') return
		curP.value ++
		await getMyOrder()
	}
	async function getMyOrder() {
		const res = await $api.order_list({params: params.value})
		if (res.code == 1) { 
			my_order_list.value = [...my_order_list.value, ...res.list]
			if(my_order_list.value.length >= res.total) {
				loadstatus.value = 'nomore'
			}
			else {
				loadstatus.value = 'loadmore'
			}
		}
	}
	function initMyOrderParams() {
		curP.value == 1;
		my_order_list.value = []
	}
	async function initMyOrder() {
		uni.showLoading()
		initMyOrderParams();
		await getMyOrder()
	} 
	function handleTabsChange(data) {
		tabs_current.value = +data.index
		initMyOrder()
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