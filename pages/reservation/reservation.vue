<template>
	<view class="w">
		<!-- <view class="tabs-w">
			<u-tabs
				:list="tabs_list"  
				lineWidth="50"
				:current="tabs_current" 
				:activeStyle="{
					color: themeColor
				}"
				@change="handleTabsChange"
			></u-tabs>	
		</view> -->
		
		<view class="header-tabs u-p-28 u-p-t-50 u-p-b-50 bg-white u-radius-8 u-flex u-flex-around u-flex-items-start u-m-b-20">
			<view 
				class="item-tabs u-flex-column u-flex-items-center"
				v-for="(item, index) in roomList"
				:key="index" 
				@click="showRoomListFunc(index)"
				>
					<u--image 
						showLoading
						:src="item.img"
						width="60px"
						height="60px"
						mode="scaleToFill"
						/>
					<view class="u-p-t-30 u-font-28">{{item.name}}</view>
				</view>
		</view>
		
		<RoomsLivePopup
			:show="showRoomList" 
			title="直播间列表"
			:current="currentRoomData"
			:onUpdateShow="handleChangeShow"
		></RoomsLivePopup>	
		
		
		<view class="list u-p-20">
			<!-- <template v-if="tabs_current == 0"> -->
				<u--form
					labelPosition="top"
					:model="form" 
					ref="uForm"  
					labelWidth="100%"
					:labelStyle="{color: '#666'}"
					>
					<u-form-item
						label="直播间"
						prop="form.roomid" 
						@click="showRoomList = true" 
						>
						<u--input
							v-model="form.roomid"
							readonly 
							placeholder="点击选择" 
							suffixIcon="arrow-right"
							suffixIconStyle="color: #909399"
						></u--input> 
					</u-form-item>
				</u--form>
			<!-- </template>
			<template v-if="tabs_current == 1">
				
				<template v-if="my_reservation_list.length == 0">
					<u-empty mode="data" :icon="base.empty" />
				</template>
				<template v-else>
					<u-loadmore :status="loadstatus" />
				</template>
			</template> -->
			<u-safe-bottom></u-safe-bottom>
		</view>	
		
	</view>
</template>

<script setup>
	import { onLoad, onReady, onShareTimeline, onShareAppMessage, onReachBottom } from "@dcloudio/uni-app";
	import { ref, reactive, computed, toRefs, inject, watch } from 'vue'
	import { share } from '@/composition/share.js'
	import { baseStore } from '@/stores/base'
	const base = baseStore();
	const { roomList, themeColor } = toRefs(base)
	const {
		setOnlineControl,
		onlineControl
	} = share()
	const $api = inject('$api')
	// const tabs_current = ref(0)
	// const tabs_list = ref([
	// 	{
	// 		name: '预约申请',
	// 		disalbed: false,
	// 	},
	// 	{
	// 		name: '我的预约',
	// 		disalbed: false,
	// 	},
	// ])
	
	
	const uForm = ref()
	const form = ref({
		roomid: '',  
		riqi: '',
		hour: '', 
	})
	const showRoomList = ref(false)
	const currentRoomData = ref([0, -1])
	 
	// const my_reservation_list = ref([])
	// const curP = ref(1)
	// const loadstatus = ref('loadmore')
	// const params = computed(() => {
	// 	return {
	// 		p: curP.value, 
	// 	}
	// })
	// watch(
	// 	() => tabs_current.value,
	// 	(n) => {
	// 		if(n == 1) {
	// 			initMyReservation()
	// 		}
	// 	},
	// 	{
	// 		immediate: true
	// 	}
	// )
	onLoad(async (options) => {
		if(roomList.value.length == 0) { 
			uni.showLoading()
			await base.getRoomList()
		} 
		if(options.hasOwnProperty('zb_index')) {
			showRoomList(+options.zb_index)
			
		}
	})
	function showRoomListFunc(index) {
		currentRoomData.value[0] = index
		showRoomList.value = true
	}
	// onReachBottom( () => {
	// 	if(tabs_current.value != 1) return
	// 	getMoreMyReservation()
	// }) 
	// async function getMoreMyReservation() {
	// 	if(loadstatus.value != 'loadmore') return
	// 	curP.value ++
	// 	await getMyReservation()
	// }
	// async function getMyReservation() {
	// 	const res = await $api.my_yuyue({params: params.value})
	// 	if (res.code == 1) { 
	// 		my_reservation_list.value = [...my_reservation_list.value, ...res.list]
	// 		if(my_reservation_list.value.length >= res.total) {
	// 			loadstatus.value = 'nomore'
	// 		}
	// 		else {
	// 			loadstatus.value = 'loadmore'
	// 		}
	// 	}
	// }
	// function initMyReservationParams() {
	// 	curP.value == 1;
	// 	my_reservation_list.value = []
	// }
	// async function initMyReservation() {
	// 	uni.showLoading()
	// 	initMyReservationParams();
	// 	await getMyReservation()
	// } 
	
	// function handleTabsChange({index}) {
	// 	tabs_current.value = index
	// }
	function handleChangeShow(data) {
		showRoomList.value = data
	}
	// async function submit() {
	// 	console.log(form.value)
	// 	const res = await $api.yuyue_add({
	// 		params: {
	// 			...form.value, 
	// 		}
	// 	})
	// 	if(res.code == 1) { 
	// 		uni.showToast({
	// 			title: res.msg
	// 		})  
	// 	}
	// }
</script>

<style scoped lang="scss">
.w {
	min-height: 100vh;
}
</style>