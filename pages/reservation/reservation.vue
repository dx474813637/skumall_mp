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
		
		
		<view class="list u-p-40">
			<view class="header-tabs u-p-28 u-p-t-40 u-p-b-40 bg-white u-radius-8 u-flex u-flex-around u-flex-items-start u-m-b-30">
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
			<view class="banner u-p-40 u-radius-8 u-m-b-30 text-white" :style="{backgroundImage: `url(${home.ad1})`}">
				<view class="u-flex banner-text u-m-b-20">
					<u-icon name="home" color="#fff"></u-icon>
					<view class="u-m-l-10 u-line-1 u-font-36">{{home.name}}</view>
				</view>
				<view class="u-flex banner-text">
					<u-icon name="info-circle" color="#fff"></u-icon>
					<view class="u-m-l-10 u-font-24 u-line-2" style="font-weight: 400;">{{home.info}}</view>
				</view>
			</view>
			<view class="u-p-10 u-p-l-30 u-p-r-30 bg-white u-radius-8 u-m-b-30">
				<u--form
					labelPosition="left"
					:model="form" 
					ref="uForm"  
					labelWidth="80px"
					:labelStyle="{color: '#000'}"  
					:rules="rules"
					>
					<u-form-item
						label="直播间"
						prop="roomid" 
						@click="showRoomList = true"  
						borderBottom
						required 
						>
						<u--input
							v-model="roomid2str"
							readonly 
							placeholder="点击选择" 
							suffixIcon="arrow-down-fill"
							suffixIconStyle="color: #666; font-size: 14px; margin-left:10px"
							border="none"
							inputAlign="right"
						></u--input> 
					</u-form-item>
					<u-form-item
						label="预约日期"
						prop="riqi" 
						@click="showCalendarShow = true"  
						borderBottom
						required 
						>
						<u--input
							v-model="form.riqi"
							readonly 
							placeholder="点击选择" 
							suffixIcon="arrow-down-fill"
							suffixIconStyle="color: #666; font-size: 14px; margin-left:10px"
							border="none"
							inputAlign="right"
						></u--input> 
					</u-form-item>
					<u-form-item
						label="入场时间"
						prop="hour" 
						required 
						@click="onChangeTimePopupShow"   
						>
						<template v-if="timeInputDisabled">
							<view class="u-info u-text-right">请先确定预约直播间及日期</view>
						</template>
						<u-loading-icon v-else-if="time_loading"></u-loading-icon> 
						<view v-else class="u-flex u-flex-end ">
							<view class="time-w u-flex u-flex-wrap">
								<div 
									class="time-item u-info-light-bg u-p-5 u-p-l-16 u-p-r-16 u-radius-4 u-m-l-18 u-m-t-6 u-m-b-6"
									v-for="item in timeData"
									:key="item.value"
									>
									{{item.name}}
								</div>
							</view>
							<u-icon name="arrow-down-fill" color="#666" size="14"></u-icon>
						</view>
						<!-- <u--input
							v-else
							v-model="form.hour"
							readonly 
							placeholder="点击选择" 
							suffixIcon="arrow-down-fill"
							suffixIconStyle="color: #666; font-size: 14px; margin-left:10px"
							border="none"
							inputAlign="right"
						></u--input> -->
					</u-form-item>
				</u--form>
			</view>
			<!-- <template v-if="tabs_current == 0"> -->
				
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
		
		<TabBar :customStyle="{boxShadow: '0px -3px 10px rgba(0,0,0,0.1)' }">
			<view class="u-flex u-flex-between u-flex-items-center u-p-l-20 u-p-r-20 u-font-28" style="height: 100%;">
				<view class="item u-flex-column u-flex-items-center u-m-r-40" @click="base.handleGoto('/pages_user/index/index')">
					<u-icon name="account-fill" :color="themeColor" size="22"></u-icon>
					<view class="u-info">个人中心</view>
				</view>
				<view class="item u-flex-column u-flex-items-center u-m-r-40" @click="base.handleGoto('/pages_user/reservation_list/reservation_list')">
					<u-icon name="list-dot" :color="themeColor" size="22"></u-icon>
					<view class="u-info">我的预约</view>
				</view>
				<view class="item u-flex-column u-flex-items-center u-m-r-40" @click="base.handleGoto('/pages_user/info/info')">
					<u-icon name="order" :color="themeColor" size="22"></u-icon>
					<view class="u-info">我的信息</view>
				</view>
				<view class="item u-flex-1">
					<u-button type="primary" shape="circle" @click="submit"  >
						<view class="u-flex">
							<u-icon name="order" color="#fff" size="16"></u-icon>
							<text class="u-m-l-8 u-p-b-5 u-font-32">立即预约</text>
						</view>
					</u-button>
				</view>
			</view>
		</TabBar>
		
		<RoomsLivePopup
			:show="showRoomList" 
			title="直播间列表"
			:current="currentRoomData"
			:onUpdateShow="handleChangeShow"
			@onConfirm="handleChangeRoom"
		></RoomsLivePopup>	
		<u-calendar 
			:show="showCalendarShow"
			closeOnClickOverlay
			@confirm="calendarConfirm"
			@close="showCalendarShow = false"
		></u-calendar>
		<RoomsTimePopup
			:show="showTimePopup" 
			:list="timeList" 
			:loadstatus="time_loading"
			title="入场时间段(可多选)"
			:current="timeData"
			:onUpdateShow="handleChangeShow2"
			@onConfirm="handleChangeTime"
			@onRefresh="handleRefreshTime"
		></RoomsTimePopup>	
	</view>
</template>

<script setup>
	import { onLoad, onReady, onShareTimeline, onShareAppMessage, onReachBottom } from "@dcloudio/uni-app";
	import { ref, reactive, computed, toRefs, inject, watch } from 'vue'
	import { share } from '@/composition/share.js'
	import { baseStore } from '@/stores/base'
	import {userStore} from '@/stores/user'
	const user = userStore()
	const base = baseStore();
	const { home, roomList, themeColor } = toRefs(base)
	const {
		setOnlineControl,
		onlineControl
	} = share()
	const $api = inject('$api') 
	const rules = {
		'roomid': {
			type: 'any',
			required: true,
			message: '不能为空',
			trigger: ['blur', 'change']
		},
		'riqi': {
			type: 'string',
			required: true,
			message: '不能为空',
			trigger: ['blur', 'change']
		},
		'hour': {
			type: 'string',
			required: true,
			message: '不能为空',
			trigger: ['blur', 'change']
		},
	}
	const uForm = ref()
	const form = ref({
		roomid: '',  
		riqi: '',
		hour: '', 
	})
	const showRoomList = ref(false)
	const currentRoomData = ref([0, -1])
	
	const showCalendarShow = ref(false)
	
	const showTimePopup = ref(false)
	const time_loading = ref(false)
	const timeList = ref([])
	const timeData = ref([])
	const noDingyue = ref('0')
	const roomid2str = computed(() => {
		if(currentRoomData.value[1] == -1) return ''
		return `${roomList.value[currentRoomData.value[0]].name} - ${roomList.value[currentRoomData.value[0]].list[currentRoomData.value[1]].name}`
	})
	const timeInputDisabled = computed(() => {
		return !form.value.roomid || !form.value.riqi 
	})  
	watch(
		() => [
			form.value.roomid,
			form.value.riqi,
		],
		async (n) => {
			console.log(n);
			if(!n[0] || !n[1]) return
			form.value.hour = ''
			timeData.value = []
			await handleRefreshTime()
		},
		{
			deep: true
		}
	)
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
			showRoomListFunc(+options.zb_index)
			
		}
		if(options.hasOwnProperty('noDingyue')) {
			noDingyue.value = options.noDingyue
			
		}
		if(noDingyue.value == '0') user.sendDingyue()
		
	})
	function showRoomListFunc(index) {
		if(currentRoomData.value[1] == -1) {
			currentRoomData.value[0] = index
		}
		showRoomList.value = true
	}
	function handleChangeShow(data) {
		showRoomList.value = data
	}
	function handleChangeShow2(data) {
		showTimePopup.value = data
	}
	function handleChangeRoom(obj) {
		currentRoomData.value = obj.current
		form.value.roomid = obj.data.id
		handleChangeShow(false)
	}
	function calendarConfirm(e) { 
		form.value.riqi = e[0]
		showCalendarShow.value = false
	}
	function onChangeTimePopupShow() {
		if(timeInputDisabled.value) return 
		showTimePopup.value = true
	}
	async function getTimeData() {
		const res = await $api.yuyue_search({params: {roomid: form.value.roomid, riqi: form.value.riqi}})
		if(res.code == 1) {
			timeList.value = res.list
		}
	}
	function handleChangeTime(obj) {
		console.log(obj)
		timeData.value = uni.$u.deepClone(obj.current) 
		form.value.hour = timeData.value.map(ele => ele.value).join(',')
		handleChangeShow2(false)
	}
	async function handleRefreshTime() { 
		time_loading.value = true
		await getTimeData()
		time_loading.value = false
	}
	async function submit() {
		uForm.value.validate().then(async res => {
			if(noDingyue.value == '0') {
				dingyueEvent()
			}
			else {
				submitApi()
			}
			
		}).catch(errors => {
			uni.$u.toast('请检查表单')
		})
	}
	async function submitApi() {
		uni.showLoading()
		const res = await $api.yuyue_add({params: {...form.value}});
		if(res.code == 1) { 
			uni.showToast({
				title: res.msg,
				icon: 'none'
			}) 
		}
	}
	async function dingyueEvent() {
		uni.showLoading()
		const res = await $api.tmp_id_list();
		if(res.code == 1) {
			// this.tmp_id_list = res.list ;
			subApi(res.list)
			
		}
	}
	function subApi(list) { 
		wx.requestSubscribeMessage({
			tmplIds: list,
			success: async (res)=>{ 
				console.log(res)
				if(res.tjSTqE0hZ0TxMCIerDlXLqhhHNxJ7MxMcB0741EtcFg == 'reject') {
					submitApi()
					return
				}
				console.log('??')
				uni.showLoading()
				const res2 = await $api.tmp_id_back({
					params: {
						str: JSON.stringify(res)
					}
				})
				if(res2.code == 1) {
					uni.showToast({
						title: res2.msg,
						icon: 'none'
					}) 
					submitApi()
				}
			},
			complete: () => {}
		})
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
.banner {
	background-size: 100%;
	background-position: center center;
	background-repeat: no-repeat;
	position: relative;
	overflow: hidden;
	&:after {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,.4);
		z-index: 10;
	}
	.banner-text {
		position: relative;
		z-index: 20;
	}
}
</style>