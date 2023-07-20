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
			<view class="banner u-p-40 u-radius-8 u-m-b-30 text-white" :style="{backgroundImage: `url(${home.ad6})`}" @click="goto(home.ad6_url)">
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
					</u-form-item>
				</u--form>
			</view> 
			
			<view class="u-info u-font-24 u-m-b-30" v-if="editInfoShow">请完善用户信息</view>
			<view class="u-p-10 u-p-l-30 u-p-r-30 bg-white u-radius-8 u-m-b-30" @click="showMyInfoPopup = true">
				<u--form
					labelPosition="left" 
					labelWidth="80px"
					:labelStyle="{color: '#000'}"   
					>
					<u-form-item
						label="姓名" 
						borderBottom 
						>
						<u--input
							v-model="user_info.name" 
							readonly 
							placeholder="请编辑"  
							border="none"
							inputAlign="right"
						></u--input> 
					</u-form-item>
					<u-form-item
						label="手机" 
						borderBottom 
						>
						<u--input
							v-model="user_info.phone" 
							readonly 
							placeholder="请编辑"  
							border="none"
							inputAlign="right"
						></u--input> 
					</u-form-item>
					<u-form-item
						label="直播间名称" 
						borderBottom 
						>
						<u--input
							v-model="user_info.room_name" 
							readonly 
							placeholder="请编辑"  
							border="none"
							inputAlign="right"
						></u--input> 
					</u-form-item>
					<view class="u-flex u-flex-center u-flex-items-center u-primary u-font-28 u-p-30">
						<u-icon name="edit-pen" size="20" color="themeColor"></u-icon>
						<view class="u-m-l-16">编辑我的信息</view>
					</view>
				</u--form>
			</view>
			<u-safe-bottom></u-safe-bottom>
		</view>	
		
		<TabBar :customStyle="{boxShadow: '0px -3px 10px rgba(0,0,0,0.1)' }">
			<view class="u-flex u-flex-between u-flex-items-center u-p-l-20 u-p-r-20 u-font-28" style="height: 100%;">
				<view class="item u-flex-column u-flex-items-center u-m-r-40" @click="base.handleGoto('/pages/index/index')">
					<u-icon name="home" :color="themeColor" size="22"></u-icon>
					<view class="u-info">首页</view>
				</view>
				<view class="item u-flex-column u-flex-items-center u-m-r-40" @click="base.handleGoto('/pages_user/reservation_list/reservation_list')">
					<u-icon name="list-dot" :color="themeColor" size="22"></u-icon>
					<view class="u-info">我的预约</view>
				</view>
				<view class="item u-flex u-flex-items-center u-m-r-20 u-p-20" @click="showMyInfoPopup = true">
					<u-icon name="plus"  size="14"></u-icon>
					<view class="u-info u-font-30 u-m-l-10">完善信息</view>
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
			:minDate="home.ariqi"
			:maxDate="home.briqi"
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
		<MyInfoPopup
			:show="showMyInfoPopup"   
			title="我的信息编辑" 
			:onUpdateShow="handleChangeShow3"  
		></MyInfoPopup>	
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
	const { user_info, tmp_id_list } = toRefs(user) 
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
	const showMyInfoPopup = ref(false)
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
	const editInfoShow = computed(() => {
		return !user_info.value.name || !user_info.value.phone  || !user_info.value.room_name 
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
		if(noDingyue.value == '0') {
			await user.sendDingyue()
			user.gettmp_id_list()
		}
		
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
	function handleChangeShow3(data) {
		showMyInfoPopup.value = data
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
		if(editInfoShow.value) {
			showMyInfoPopup.value = true
			return
		}
		if(noDingyue.value == '0') {
			dingyueEvent()
		}
		
	}
	async function submitApi() {
		uni.showLoading()
		const res = await $api.yuyue_add({params: {...form.value}});
		if(res.code == 1) { 
			uni.showToast({
				title: res.msg,
				icon: 'none'
			}) 
			setTimeout(() => {
				base.handleGoto('/pages_user/reservation_list/reservation_list')
			}, 1500)
		}
	}
	function checkForm() {
		uForm.value.validate().then(async res => {
			submitApi() 
		}).catch(errors => {
			uni.$u.toast('请检查表单')
		})
	}
	async function dingyueEvent() {
		wx.requestSubscribeMessage({
			tmplIds: tmp_id_list.value,
			success: async (res)=>{ 
				if(res.tjSTqE0hZ0TxMCIerDlXLqhhHNxJ7MxMcB0741EtcFg == 'reject') {
					checkForm()
					return
				}
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
					checkForm()
				}
			},
			fail: (err) => {
				console.log(err)
			}
		})
	}
	function goto(url) {
		if(!url) return;
		uni.reLaunch({
			url
		})
	}
</script>

<style scoped lang="scss">
.w {
	min-height: 100vh;
	padding-bottom: 60px;
}
.banner {
	background-size: cover;
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