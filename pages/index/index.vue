<template>
	<view class="w">
		<view class="header-banner">
			<u--image :showLoading="true" :src="home.ad1" width="100%" height="170px" mode="aspectFill"></u--image>
		</view>
		<view class="wrapper-main u-p-l-20 u-p-r-20">
			<view class="header-intro u-p-28 bg-white u-radius-8">
				<view class="intro-name u-m-b-16">
					{{home.name}}
				</view>
				<view class="intro-info u-m-b-10 u-font-22 u-flex">
					<view class=" intro-info-item u-p-l-10 u-p-r-10">{{home.info}}</view> 
				</view>
			</view>
		</view>
		
	</view>
</template>

<script setup>
	import { onLoad, onReady, onShareTimeline, onShareAppMessage, onReachBottom } from "@dcloudio/uni-app";
	import { ref, reactive, computed, toRefs, inject, watch, onMounted } from 'vue'
	import { share } from '@/composition/share.js'
	const { setOnlineControl } = share()
	import {baseStore} from '@/stores/base'
	const base = baseStore()
	const {home, roomList} = toRefs(base)
	
	onLoad(async () => {
		uni.showLoading()
		await base.getRoomList()
		setOnlineControl({ title: home.value.name, share_title: home.value.name })
	})
	
</script>

<style lang="scss" scoped> 
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
