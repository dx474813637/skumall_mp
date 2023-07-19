<template>
	<view class="w">
		<view class="header-banner">
			<u--image 
				showLoading 
				:src="home.ad1" 
				width="100%" 
				height="auto" 
				mode="widthFix"
				></u--image>
		</view>
		<view class="wrapper-main u-p-l-20 u-p-r-20">
			<view class="header-intro u-p-28 bg-white u-radius-8 u-m-b-20">
				<view class="intro-name u-m-b-16">
					{{home.name}}
				</view>
				<view class="intro-info u-m-b-20 u-font-22 u-flex">
					<view class=" intro-info-item u-p-6 u-p-l-10 u-p-r-10">{{home.info}}</view> 
				</view>
				<view class="header-banner">
					<u--image 
						showLoading 
						:src="home.ad2" 
						width="100%" 
						height="auto" 
						mode="widthFix"
						></u--image>
				</view>
				<view class="intro-address u-p-t-20 u-font-30 u-flex u-flex-between">
					<view class="intro-address-item u-line-2">{{home.address}}</view> 
					<view class="intro-address-item">
						<u-icon name="phone" size="22" @click="handleMakePhone"></u-icon>
					</view> 
				</view>
			</view>
			<view class="header-tabs u-p-28 u-p-t-50 u-p-b-50 bg-white u-radius-8 u-flex u-flex-around u-flex-items-start u-m-b-20">
				<view 
					class="item-tabs u-flex-column u-flex-items-center"
					v-for="(item, index) in roomList"
					:key="index"
					@click="base.handleGoto({url: '/pages/reservation/reservation', params: {zb_index: index}})"
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
			<view class="header-banner u-m-b-20" v-if="home.ad3">
				<u--image 
					showLoading 
					:src="home.ad3" 
					width="100%" 
					height="auto" 
					mode="widthFix"
					></u--image>
			</view>
			<view class="header-banner u-m-b-20" v-if="home.ad4">
				<u--image 
					showLoading 
					:src="home.ad4" 
					width="100%" 
					height="auto" 
					mode="widthFix"
					></u--image>
			</view>
			<view class="header-banner u-m-b-20" v-if="home.ad5">
				<u--image 
					showLoading 
					:src="home.ad5" 
					width="100%" 
					height="auto" 
					mode="widthFix"
					></u--image>
			</view>
		</view>
		<u-safe-bottom></u-safe-bottom>
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
				<view class="item u-flex-1">
					<u-button type="primary" shape="circle" @click="dingyueEvent"  >
						<view class="u-flex">
							<u-icon name="clock" color="#fff" size="16"></u-icon>
							<text class="u-m-l-8 u-p-b-5 u-font-32">马上预约</text>
						</view>
					</u-button>
				</view>
			</view>
		</TabBar>
	</view>
</template>

<script setup>
	import { onLoad, onReady, onShareTimeline, onShareAppMessage, onReachBottom } from "@dcloudio/uni-app";
	import { ref, reactive, computed, toRefs, inject, watch, onMounted } from 'vue'
	import { share } from '@/composition/share.js'
	const { setOnlineControl } = share()
	import {userStore} from '@/stores/user'
	const user = userStore()
	import {baseStore} from '@/stores/base'
	const base = baseStore()
	const {home, roomList, themeColor} = toRefs(base)
	const $api = inject('$api')
	
	onLoad(async () => {
		uni.showLoading()
		await base.getRoomList()
		setOnlineControl({ title: home.value.name, share_title: home.value.name })
		user.sendDingyue()
	})
	function handleMakePhone() {
		if(!home.value.phone) return
		uni.makePhoneCall({
			phoneNumber: home.value.phone
		})
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
			complete: () => {}
		})
	}
</script>

<style lang="scss" scoped> 
.w {
	padding-bottom: 60px;
}
.header-banner {
	min-height: 30px;
}
.wrapper-main {
	position: relative;
	top: -20px;
	.header-intro {
		.intro-name {
			font-weight: bold;
		}
		.intro-info {
			color: #333;
			.intro-info-item {
				background-color: $u-primary-light;
			}
			
		}
	}
}
</style>
