<template>
	<view class="w">
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
		</view> 
		 -->
		
		<view class="list u-p-20">  
			<view class="list-item card u-p-20 u-p-l-40 u-p-r-40 u-radius-6 bg-white uni-shadow-base u-m-b-20" v-for="item in reservation_list" :key="item.id">
				<view class="card-header">
					<view class="u-flex u-flex-between u-flex-items-center u-p-5 u-border-bottom u-m-b-10">
						<view class="item u-info">{{item.id}}</view>
						<view class="item" :class="{'u-success': item.zt == '1', 'u-error': item.zt == '2'}">
							<!-- <template v-if="item.zt == '0'">待审核</template> -->
							<template v-if="item.zt == '1'">
								<text :class="{'u-success': item.confirm == '1', 'u-error': item.confirm == '0'}">{{item.confirm == '1'? '已到场' : '未到场'}}</text>
								<text> - 通过</text>
							</template>
							<!-- <template v-if="item.zt == '2'">拒绝</template> -->
						</view>
					</view>
					<view class="u-flex u-flex-between u-flex-items-center u-p-5 u-m-b-10">
						<view class="item u-info">预约直播间</view>
						<view class="item">{{item.roomid}}</view>
					</view>
					<view class="u-flex u-flex-between u-flex-items-center u-p-5 u-m-b-10">
						<view class="item u-info">预约日期</view>
						<view class="item">{{item.riqi}}</view>
					</view>
					<view class="u-flex u-flex-between u-flex-items-center u-p-5 u-m-b-10">
						<view class="item u-info">预约时间段</view>
						<view class="item">{{item.hour}}</view>
					</view>
					<view class="u-flex u-flex-between u-flex-items-center u-p-5 u-m-b-10">
						<view class="item u-info">申请时间</view>
						<view class="item u-info">{{item.ctime}}</view>
					</view>
					<!-- <view class="u-flex u-flex-between u-flex-items-center u-p-5 u-m-b-10" v-if="item.zt == '1' && item.confirm == '0'">
						<view class="item u-info"></view>
						<view class="item u-info">
							<u-button type="primary" @click="confirm(item)">到场确认</u-button>
						</view>
					</view> -->
				</view>
			</view>
			<template v-if="reservation_list.length == 0">
				<u-empty mode="data" :icon="base.empty" />
			</template>
			<template v-else>
				<u-loadmore :status="loadstatus" />
			</template>  
				
				
			<u-safe-bottom></u-safe-bottom>
		</view>	 
	</view>
	<TabBarYuyue 
		@onInfoShow="handleChangeShow3"
		@onSubmit="dingyueEvent"
	></TabBarYuyue>
	<MyInfoPopup
		:show="showMyInfoPopup"   
		title="我的信息编辑" 
		:onUpdateShow="handleChangeShow3"  
	></MyInfoPopup>	
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
	const reservation_list = ref([])
	const curP = ref(1)
	const loadstatus = ref('loadmore')
	const params = computed(() => {
		return {
			p: curP.value, 
			cate: tabs_list.value[tabs_current.value].value
		}
	}) 
	const showMyInfoPopup = ref(false)
	const tabs_current = ref(0)
	const tabs_list = ref([
		{
			name: '全部',
			disabled: false,
			value: '0'
		},
		{
			name: '待审核',
			disabled: false,
			value: '1'
		},
		{
			name: '通过',
			disabled: false,
			value: '2'
		},
		{
			name: '拒绝',
			disabled: false,
			value: '3'
		}
	])
	onLoad(async (options) => {
		if(options.hasOwnProperty('zt')) {
			tabs_current.value = +tabs_list.value.findIndex(ele => ele.value == options.zt) 
		}
		initMyReservation() 
	}) 
	onReachBottom( () => {
		if(tabs_current.value != 1) return
		getMoreMyReservation()
	}) 
	async function getMoreMyReservation() {
		if(loadstatus.value != 'loadmore') return
		curP.value ++
		await getMyReservation()
	}
	async function getMyReservation() {
		const res = await $api.yuyue({params: params.value})
		if (res.code == 1) { 
			reservation_list.value = [...reservation_list.value, ...res.list]
			if(reservation_list.value.length >= res.total) {
				loadstatus.value = 'nomore'
			}
			else {
				loadstatus.value = 'loadmore'
			}
		}
	}
	function initMyReservationParams() {
		curP.value == 1;
		reservation_list.value = []
	}
	async function initMyReservation() {
		uni.showLoading()
		initMyReservationParams();
		await getMyReservation()
	} 
	function handleTabsChange(data) {
		tabs_current.value = +data.index
		initMyReservation()
	}
	function confirm(item) {
		uni.showModal({
			title: '提示',
			content: '确认到场',
			success: async (res) => {
				if (res.confirm) {
					uni.showLoading()
					const res2 = await $api.roomid_confirm({params: {id: item.id}})
					if(res2.code == 1) {
						let i = reservation_list.value.map(ele => ele.id).indexOf(item.id)
						reservation_list.value[i].confirm = 1
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})  
					}
				} else if (res.cancel) {
					console.log('用户点击取消');
				}
			}
		});
	}
	async function dingyueEvent() { 
		wx.requestSubscribeMessage({
			tmplIds: tmp_id_list.value,
			success: async (res)=>{ 
				if(res.tjSTqE0hZ0TxMCIerDlXLqhhHNxJ7MxMcB0741EtcFg == 'reject') {
					base.handleGoto({url: '/pages/reservation/reservation', params: {noDingyue: '1'}})
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
					base.handleGoto({url: '/pages/reservation/reservation', params: {noDingyue: '1'}})
				}
			},
			fail: (err) => {
				console.log(err)
			}
		}) 
		
	}
	function handleChangeShow3(data) {
		showMyInfoPopup.value = data
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