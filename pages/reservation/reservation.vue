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
		
		
		<view class="list u-p-20" v-if="roomList.length > 0">
			<view class="banner u-p-40 u-radius-8 u-m-b-30 text-white" :style="{backgroundImage: `url(${home.ad6})`}" @click="goto(home.ad6_url)">
				<view class="u-flex banner-text u-m-b-20">
					<u-icon name="home" color="#fff"></u-icon>
					<view class="u-m-l-10 u-line-1 u-font-36">{{home.name}}</view>
				</view>
				<view class="u-flex banner-text">
					<u-icon name="map" color="#fff"></u-icon>
					<view class="u-m-l-10 u-font-24 u-line-2" style="font-weight: 400;">{{home.address}}</view>
				</view>
			</view> 
			<!-- <view class="header-tabs u-flex u-flex-around u-flex-items-end">
				<view 
					class="item-tabs u-flex u-flex-items-center u-flex-center "
					v-for="(item, index) in roomList"
					:key="index"
					:class="{
						active: zb_index == index
					}"
					@click="handleZbIndexClick(index)"
					> 
						<view class="u-font-28">{{item.name}}</view>
					</view>
			</view> -->
			<view class="tabs-w u-p-l-10 u-p-r-10">
				<u-tabs 
					:list="zb_tabs" 
					:current="zb_index"
					@change="zbIndexChange"
					:activeStyle="{
						color: '#000',
						background: '#fff',
						lineHeight: '45px',
						padding: '0 20px',
					}"
					:inactiveStyle="{
						color: '#fff',
						background: '#4d97f8',
						lineHeight: '40px',
						padding: '0 15px',
						fontSize: '14px'
					}"
					:itemStyle="{ 
						padding: '0',
					}"
					lineHeight="0"
				></u-tabs> 
			</view>
			<view class=" bg-white u-radius-12 u-m-b-30 u-p-b-20">
				
				<!-- <view class="u-p-20">
					<view class="zb_title"></view>
					<view class="zb_list u-flex u-flex-wrap u-flex-items-start">
						<view 
							class="zb_list_item u-m-b-20 u-radius-6 u-border u-flex u-flex-items-center u-flex-center"
							v-for="item in mainRoomList"
							:key="item.id"
							:class={
								active: form.roomid
							}
							@click="mainMenusClick(item, index)"
						>
							<view class="u-line-1">
								{{item.name}}
							</view>
						</view>
					</view>
				</view> -->
				<view class="u-p-b-20 u-p-l-40 u-p-r-40 bg-white u-radius-8 ">
					<u--form
						labelPosition="left"
						:model="form" 
						ref="uForm"  
						labelWidth="80px"
						:labelStyle="{color: '#000'}"  
						:rules="rules"
						>
						<u-form-item
							prop="roomid"
							labelWidth="0" 
							>
							<view 
								class="u-info u-p-10 u-p-l-20 u-p-r-20 u-radius-5 u-flex u-flex-between" 
								style="background-color: #f8f8f8;"
								@click="base.handleGoto({url: '/pages/web_danye/web_danye', params: {id: roomList[zb_index].info_id}})"
							>
								<view class="u-line-1">
									{{roomList[zb_index].info}}
								</view>
								<u-icon name="arrow-right" size="12" color="#999"></u-icon>
							</view> 
						</u-form-item>
						<u-form-item labelWidth="0" >
							<view class="zb_list u-flex u-flex-wrap u-flex-items-start">
								<view 
									class="zb_list_item u-m-t-10 u-m-b-10 u-radius-6  u-flex u-flex-items-center u-flex-center"
									v-for="item in mainRoomList"
									:key="item.id"
									:class="{
										active: form.roomid == item.id
									}"
									@click="mainMenusClick(item, index)"
								>
									<view class="u-line-1">
										{{item.name}}
									</view>
								</view>
							</view>
						</u-form-item>
						<!-- <u-form-item
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
						</u-form-item> -->
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
						label="直播号" 
						borderBottom 
						>
						<u--input
							v-model="user_info.room_name" 
							readonly 
							placeholder="直播平台 + 账号"  
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
		
		<TabBarYuyue
			submitBtnText="立即预约"
			@onInfoShow="handleChangeShow3"
			@onSubmit="submit"
		></TabBarYuyue>
		
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
			validator: (rule, value, callback) => {
				return value ? true: false;
			},
			message: '请选择一个直播间',
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
	const zb_tabs = ref([])
	const zb_index = ref(0)
	const showCalendarShow = ref(false)
	
	const showTimePopup = ref(false)
	const showMyInfoPopup = ref(false)
	const time_loading = ref(false)
	const timeList = ref([])
	const timeData = ref([])
	const noDingyue = ref('0') 
	
	const mainRoomList = computed(() => {
		if(roomList.value.length == 0) return []
		return roomList.value[zb_index.value].list
	})  
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
	watch(
		() => roomList.value,
		async (n) => {
			zb_tabs.value = n.map(ele => {
				return {
					...ele,
					disabled: false
				}
			})
		},
		{
			deep: true,
			immediate: true
		}
	) 
	onLoad(async (options) => {
		if(roomList.value.length == 0) { 
			uni.showLoading()
			await base.getRoomList()
		} 
		if(options.hasOwnProperty('zb_index')) {
			zb_index.value = +options.zb_index
			// showRoomListFunc(+options.zb_index)
			
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
			return
		}
		
		checkForm()
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
		console.log(form.value)
		uForm.value.validate().then(async res => {
			submitApi() 
		}).catch(errors => {
			console.log(errors)
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
	function handleZbIndexClick(index) {
		zb_index.value = index
	}
	function zbIndexChange({index}) {
		zb_index.value = index
	}
	function mainMenusClick(item, index) { 
		currentRoomData.value = [zb_index.value, index]
		form.value.roomid = item.id
	}
</script>
<style lang="scss">
	.u-tabs {
		::v-deep {
			.u-tabs__wrapper__nav {
				align-items: flex-end;
			}
			.u-tabs__wrapper__nav__item__text {
				// background-color: $u-primary; 
				border-radius: 15px 15px 0 0!important;
				display: block!important;
				box-shadow: 0 -5px 10px rgba(0,0,0,.1);
			}
		}
	}
</style>
<style scoped lang="scss">
.tabs-w {
	position: relative;
}
.zb_list {
	.zb_list_item {
		flex: 0 0 23%;
		height: 38px;
		font-size: 13px;
		margin-right: 2%;
		background-color: #f8f8f8;
		box-sizing: border-box;
		border: 1rpx solid #e8e8e8;
		color: #666;
		&.active {
			color: $u-primary;
			border-color: $u-primary-disabled;
			background-color: $u-primary-light;
		}
	}
}
.header-tabs {
	.item-tabs {
		background-color: $u-primary;
		color: #fff;
		flex: 1;
		height: 40px;
		position: relative;
		&:first-child {
			border-radius: 15px 0 0 0;
			&.active::before {
				display: none;
			}
		}
		&:last-child {
			border-radius: 0 15px 0 0;
			&.active::after {
				display: none;
			}
		}
		&.active {
			background-color: #fff;
			color: #000;
			font-size: 16px;
			height: 50px;
			border-radius: 15px 15px 0 0;
			box-shadow: 0 -5px 10px rgba(0,0,0,.2);
			&::before,
			&::after {
				content: '';
				position: absolute;
				bottom: 0;
				height: 0px;
				width: 0px; 
				z-index: 20;
				
			}
			&::before {
				right: 100%;
				border-bottom: 0;
				border-left: 0;
				border-right: 5px solid #fff;
				border-top: 45px solid transparent;
			}
			&::after {
				left: 100%;
				border-bottom: 0;
				border-right: 0;
				border-left: 5px solid #fff;
				border-top: 45px solid transparent;
			}
			
		}
		
	}
}
	
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