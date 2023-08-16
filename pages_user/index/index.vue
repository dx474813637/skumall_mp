<template>
	<view class="wrapper u-p-l-20 u-p-r-20 ">
		<navBar bgColor="transparent" title="个人中心" ></navBar>
		<!-- <u-status-bar></u-status-bar> -->
		<!-- <u-notify ref="notify"></u-notify> -->
		<view class="step3 user u-flex u-flex-items-start u-p-20 u-p-t-50 u-m-b-26">
			<template v-if="user.user.login == '0' || !user.user.login">
				<view class="user-img u-flex u-flex-items-center u-flex-center" @click="base.handleGoto('/pages/login/login')">
					<i class="custom-icon-myfill custom-icon"></i>
				</view>
				<view class="user-info u-flex-1" @click="base.handleGoto('/pages/login/login')"> 
					<view class="item u-flex u-flex-items-center"> 
						<view class="name u-line-1 u-font-38 step7">点击登录/注册</view> 
					</view>  
				</view> 
			</template>
			<template v-else> 
				<view class="u-m-r-20" v-if="user.mall_user_info.mem_pic">
					<up-image 
						show-loading
						:src="user.mall_user_info.mem_pic" 
						width="50px" 
						height="50px"  
						shape="circle"
						></up-image>
				</view>
				<view class="user-img u-flex u-flex-items-center u-flex-center"  v-else @click="base.handleGoto('/pages_user/info/user_info')">
					<i class="custom-icon-myfill custom-icon"></i>
				</view>
				<view class="user-info u-flex-1" @click="base.handleGoto('/pages_user/info/user_info')"> 
					<view class="item u-flex u-flex-items-center"> 
						<view class="name u-line-1 u-font-38 step7">{{user.mall_user_info.name}}</view> 
					</view>
					<view class="item">
						<view class="sub2 u-font-28 step9 text-light u-flex u-flex-items-center">
							<text >{{user.mall_user_info.phone}}</text> 
							<i class="custom-icon-edit custom-icon u-font-28 text-light u-m-l-10"></i>
						</view>
					</view> 
					
				</view> 
			</template>
			
		</view>
		  
		<view class="user-item-box u-p-b-30 bg-white u-m-b-26"  > 
			<view class="box-row other-menus u-flex u-flex-wrap u-flex-items-center u-p-t-20 ">
				<view 
					class="item u-flex-column u-flex-items-center u-m-t-15" 
					@click="base.handleGoto({url: '/pages_user/address/addressList'})"
					>
					<u-icon name="list" size="22" color="#333"></u-icon> 
					<text class="u-font-26 u-m-t-10 u-line-1 menus-name">地址管理</text>
				</view>
				<view 
					class="item u-flex-column u-flex-items-center u-m-t-15" 
					@click="base.handleGoto({url: '/pages_user/address/addressList'})"
					>
					<u-icon name="list" size="22" color="#333"></u-icon> 
					<text class="u-font-26 u-m-t-10 u-line-1 menus-name">选品车</text>
				</view> 
				<view 
					class="item u-flex-column u-flex-items-center u-m-t-15" 
					@click="base.handleGoto({url: '/pages_user/address/addressList'})"
					>
					<u-icon name="list" size="22" color="#333"></u-icon> 
					<text class="u-font-26 u-m-t-10 u-line-1 menus-name">个人名片</text>
				</view> 
				<view 
					class="item u-flex-column u-flex-items-center u-m-t-15" 
					@click="base.handleGoto({url: '/pages_user/address/addressList'})"
					>
					<u-icon name="list" size="22" color="#333"></u-icon> 
					<text class="u-font-26 u-m-t-10 u-line-1 menus-name">企业名片</text>
				</view> 
			</view>
		</view>
		<view class="user-item-box u-p-b-30 bg-white u-m-b-26"  >
			<view class="box-header u-border-bottom u-flex u-flex-between u-p-20 u-p-l-30 u-p-r-30">
				<view class=" u-flex u-flex-items-end u-flex-items-center">
					<view class="u-font-34 u-flex u-flex-items-center"> 
						<text>商城订单</text>
					</view> 
				</view>  
			</view>
			<view class="box-row other-menus u-flex u-flex-wrap u-flex-items-center u-p-t-20 ">
				<view 
					class="item u-flex-column u-flex-items-center u-m-t-15" 
					@click="base.handleGoto({url: '/pages_user/order/orderList', params: {zt: ''}})"
					>
					<u-icon name="list" size="22" color="#333"></u-icon> 
					<text class="u-font-26 u-m-t-10 u-line-1 menus-name">全部订单</text>
				</view>
				<view 
					class="item u-flex-column u-flex-items-center u-m-t-15" 
					@click="base.handleGoto({url: '/pages_user/order/orderList', params: {zt: '1'}})"
					>
					<u-icon name="list" size="22" color="#333"></u-icon> 
					<text class="u-font-26 u-m-t-10 u-line-1 menus-name">待付款</text>
				</view>
				<view 
					class="item u-flex-column u-flex-items-center u-m-t-15" 
					@click="base.handleGoto({url: '/pages_user/order/orderList', params: {zt: '2'}})"
					>
					<u-icon name="list" size="22" color="#333"></u-icon> 
					<text class="u-font-26 u-m-t-10 u-line-1 menus-name">待收货</text>
				</view>
				<view 
					class="item u-flex-column u-flex-items-center u-m-t-15" 
					@click="base.handleGoto({url: '/pages_user/order/orderList', params: {zt: '3'}})"
					>
					<u-icon name="list" size="22" color="#333"></u-icon> 
					<text class="u-font-26 u-m-t-10 u-line-1 menus-name">已完成</text>
				</view>
			</view>
		</view>
		<view class="user-item-box u-p-b-30 bg-white u-m-b-26"  >
			<view class="box-header u-border-bottom u-flex u-flex-between u-p-20 u-p-l-30 u-p-r-30">
				<view class=" u-flex u-flex-items-end u-flex-items-center">
					<view class="u-font-34 u-flex u-flex-items-center"> 
						<text>网盛共享直播间</text>
					</view> 
				</view>  
			</view>
			<view class="box-row other-menus u-flex u-flex-wrap u-flex-items-center u-p-t-20 ">
				<view 
					class="item u-flex-column u-flex-items-center u-m-t-15" 
					@click="base.handleGoto({url: '/pages/index/index'})"
					>
					<u-icon name="list" size="22" color="#333"></u-icon> 
					<text class="u-font-26 u-m-t-10 u-line-1 menus-name">首页</text>
				</view>
				<view 
					class="item u-flex-column u-flex-items-center u-m-t-15" 
					@click="base.handleGoto({url: '/pages/reservation/reservation'})"
					>
					<u-icon name="list" size="22" color="#333"></u-icon> 
					<text class="u-font-26 u-m-t-10 u-line-1 menus-name">我要预约</text>
				</view>
				<view 
					class="item u-flex-column u-flex-items-center u-m-t-15" 
					@click="base.handleGoto({url: '/pages_user/reservation_list/reservation_list'})"
					>
					<u-icon name="list" size="22" color="#333"></u-icon> 
					<text class="u-font-26 u-m-t-10 u-line-1 menus-name">我的预约</text>
				</view>
				<view 
					class="item u-flex-column u-flex-items-center u-m-t-15" 
					@click="base.handleGoto({url: '/pages/reservation_list/reservation_list'})"
					>
					<u-icon name="list" size="22" color="#333"></u-icon> 
					<text class="u-font-26 u-m-t-10 u-line-1 menus-name">预约列表</text>
				</view>
				<view 
					class="item u-flex-column u-flex-items-center u-m-t-15" 
					@click="base.handleGoto({url: '/pages/web_danye/web_danye', params: {id: '6'}})"
					>
					<u-icon name="list" size="22" color="#333"></u-icon> 
					<text class="u-font-26 u-m-t-10 u-line-1 menus-name">标准直播间</text>
				</view>
				<view 
					class="item u-flex-column u-flex-items-center u-m-t-15" 
					@click="base.handleGoto({url: '/pages/web_danye/web_danye', params: {id: '7'}})"
					>
					<u-icon name="list" size="22" color="#333"></u-icon> 
					<text class="u-font-26 u-m-t-10 u-line-1 menus-name">特色直播间</text>
				</view>
				<view 
					class="item u-flex-column u-flex-items-center u-m-t-15" 
					@click="base.handleGoto({url: '/pages/web_danye/web_danye', params: {id: '8'}})"
					>
					<u-icon name="list" size="22" color="#333"></u-icon> 
					<text class="u-font-26 u-m-t-10 u-line-1 menus-name">仓库直播间</text>
				</view>
			</view>
		</view>
		<view class="user-item-box u-p-b-30 bg-white u-m-b-26"  >
			<view class="box-header u-border-bottom u-flex u-flex-between u-p-20 u-p-l-30 u-p-r-30">
				<view class=" u-flex u-flex-items-end u-flex-items-center">
					<view class="u-font-34 u-flex u-flex-items-center"> 
						<text>融资中心</text>
					</view> 
				</view>  
			</view>
			<view class="box-row other-menus u-flex u-flex-wrap u-flex-items-center u-p-t-20 ">
				<view 
					class="item u-flex-column u-flex-items-center u-m-t-15" 
					@click="base.handleGoto({url: '/pages_finance/account/account'})"
					>
					<u-icon name="list" size="22" color="#333"></u-icon> 
					<text class="u-font-26 u-m-t-10 u-line-1 menus-name">认证信息</text>
				</view>
				<view 
					class="item u-flex-column u-flex-items-center u-m-t-15" 
					@click="base.handleGoto({url: '/pages_finance/no_order_buyer/no_order_buyer'})"
					>
					<u-icon name="list" size="22" color="#333"></u-icon> 
					<text class="u-font-26 u-m-t-10 u-line-1 menus-name">借款人信息</text>
				</view>
				<view 
					class="item u-flex-column u-flex-items-center u-m-t-15" 
					@click="base.handleGoto({url: '/pages_finance/no_order_white_sell_list/no_order_white_sell_list'})"
					>
					<u-icon name="list" size="22" color="#333"></u-icon> 
					<text class="u-font-26 u-m-t-10 u-line-1 menus-name">卖家白名单</text>
				</view>
				<view 
					class="item u-flex-column u-flex-items-center u-m-t-15" 
					@click="base.handleGoto({url: '/pages_finance/query_product_list/query_product_list'})"
					>
					<u-icon name="list" size="22" color="#333"></u-icon> 
					<text class="u-font-26 u-m-t-10 u-line-1 menus-name">融资产品</text>
				</view>
				<view 
					class="item u-flex-column u-flex-items-center u-m-t-15" 
					@click="base.handleGoto({url: '/pages_finance/pacc_query_list/pacc_query_list'})"
					>
					<u-icon name="list" size="22" color="#333"></u-icon> 
					<text class="u-font-26 u-m-t-10 u-line-1 menus-name">授信记录</text>
				</view>
				<view 
					class="item u-flex-column u-flex-items-center u-m-t-15" 
					@click="base.handleGoto({url: '/pages_finance/order_rz_pay_list/order_rz_pay_list'})"
					>
					<u-icon name="list" size="22" color="#333"></u-icon> 
					<text class="u-font-26 u-m-t-10 u-line-1 menus-name">融资记录</text>
				</view>
			</view>
		</view>
		<view class="user-item-box u-p-b-30 bg-white u-m-b-26"  > 
			<view class="box-row other-menus u-flex u-flex-wrap u-flex-items-center u-p-t-20 "> 
				<view 
					class="item u-flex-column u-flex-items-center u-m-t-15" 
					@click="base.handleGoto({url: '/pages/web_danye/web_danye_2', params: {id: '9'}})"
					>
					<u-icon name="list" size="22" color="#333"></u-icon> 
					<text class="u-font-26 u-m-t-10 u-line-1 menus-name">数字人直播</text>
				</view>
				<view 
					class="item u-flex-column u-flex-items-center u-m-t-15" 
					@click="base.handleGoto({url: '/pages/web_danye/web_danye_2', params: {id: '4'}})"
					>
					<u-icon name="list" size="22" color="#333"></u-icon> 
					<text class="u-font-26 u-m-t-10 u-line-1 menus-name">选品基地</text>
				</view>
				<view 
					class="item u-flex-column u-flex-items-center u-m-t-15" 
					@click="base.handleGoto({url: '/pages/web_danye/web_danye_2', params: {id: '3'}})"
					>
					<u-icon name="list" size="22" color="#333"></u-icon> 
					<text class="u-font-26 u-m-t-10 u-line-1 menus-name">培训中心</text>
				</view>
				<view 
					class="item u-flex-column u-flex-items-center u-m-t-15" 
					@click="base.handleGoto({url: '/pages/web_danye/web_danye_2', params: {id: '2'}})"
					>
					<u-icon name="list" size="22" color="#333"></u-icon> 
					<text class="u-font-26 u-m-t-10 u-line-1 menus-name">直播基地</text>
				</view>
				<view 
					class="item u-flex-column u-flex-items-center u-m-t-15" 
					@click="base.handleGoto({url: '/pages/web_danye/web_danye_2', params: {id: '1'}})"
					>
					<u-icon name="list" size="22" color="#333"></u-icon> 
					<text class="u-font-26 u-m-t-10 u-line-1 menus-name">供应链金融</text>
				</view>
			</view>
		</view>
		<!-- 客户管理 远程控制 --> 
		<view class="user-item-box u-p-24 bg-white u-m-b-26 step5" v-if="menus.menus_wd_broker.hasOwnProperty('list') && menus.menus_wd_broker.list.length > 0">
			<view class="u-flex u-flex-items-center u-p-t-6 u-p-b-30  u-border-bottom" style="border-color: #dadbde!important;">
				<image style="width: 35px;height: 35px;" :src="menus.menus_wd_broker.icon" mode="scaleToFill"></image>
				<view class="item u-p-l-20">
					<view class="u-font-36">{{menus.menus_wd_broker.name}}</view>
					<view class="text-light u-font-26">{{menus.menus_wd_broker.title}}</view>
				</view>
			</view>
			<view class="step25 u-m-t-20">
				<u-scroll-list> 
					<view 
						v-for="(item, index) in menus.menus_wd_broker.list"
						:key="index"
						@click="handleMenusClick(item)" 
						class="item-broker u-p-10 u-p-l-20 u-p-r-20"
						>
						<image style="width: 40px;height: 40px;" :src="item.icon" mode="scaleToFill"></image> 
						<view class="u-p-t-15 u-font-26 " style="white-space: nowrap;color: #4d525d;">{{item.name}}</view>
					</view> 
				</u-scroll-list>
			</view> 
		</view>  
		<!-- 我的菜单列表 远程控制 -->
		<template v-if="menus.menus_wd && menus.menus_wd.length > 0">
			<view class="user-item-box u-p-t-30 u-p-b-20 bg-white u-m-b-26" v-for="(ele, i) in menus.menus_wd" :key="i">
				<view class="box-header u-border-bottom u-flex u-flex-between u-p-b-14 u-p-l-30 u-p-r-30">
					<view class=" u-flex u-flex-items-end u-flex-items-center">
						<view class="u-font-34 u-flex u-flex-items-center">
							<image v-if="ele.icon" class="u-m-r-5" style="width: 15px;height:15px;" :src="ele.icon" mode=""></image>
							<text>{{ele.name}}</text>
						</view>
						<view class="text-light u-font-26 u-p-l-10" v-if="ele.title">{{ele.title}}</view>
					</view>
					<view class=" u-flex u-flex-items-center u-flex-items-center" v-if="ele.right_icon && ele.right_url">
						<image style="width: 20px;height:20px;" :src="ele.right_icon" mode="" @click="base.handleGoto(ele.right_url)"></image>
					</view>
				</view>
				<view class="box-row other-menus u-flex u-flex-wrap u-flex-items-center u-p-t-20 ">
					<view 
						class="item u-text-center u-m-t-15" 
						v-for="(item, index) in ele.list" 
						:key="index"
						@click="handleMenusClick(item)"
						>
						<image class="icon-img" :src="item.icon" mode=""></image>
						<text class="u-font-26 u-p-b-10 u-line-1 menus-name">{{item.name}}</text>
					</view>
				</view>
			</view>
		</template>
		
		<!-- 其他公告列表 远程控制 -->
		<template v-if="menus.new_memu && menus.new_memu.length > 0 && menus.news">
			<view class="user-item-box u-p-t-30 u-p-b-20 bg-white u-m-b-26" v-for="(ele, i) in menus.new_memu" :key="i">
				<view class="box-header u-border-bottom u-flex u-flex-items-end u-p-b-14 u-p-l-30 u-p-r-30">
					<view class="u-font-34">{{ele.name}}</view>
				</view>
				<view class="box-row other-menus u-flex u-flex-wrap u-flex-items-center u-p-t-20 ">
					<view 
						class="item u-text-center u-m-t-15" 
						v-for="(item, index) in ele.list" 
						:key="index"
						@click="handleMenusClick(item)"
						>
						<image class="icon-img" :src="item.icon" mode=""></image>
						<text class="u-font-26 u-p-b-10 u-line-1 menus-name">{{item.name}}</text>
					</view>
				</view>
			</view>
		</template>
		 
		<u-safe-bottom></u-safe-bottom>
		<MenusBar ></MenusBar>
	</view>
</template>


<script setup>
	import {
		onLoad,
		onShow, 
		onReachBottom,
	} from "@dcloudio/uni-app";
	import {
		ref,
		reactive,
		computed
	} from 'vue' 
	import { inject } from 'vue' 
	// import menusBar from '@/components/menusBar/menusBa	r.vue'
	import {
		baseStore,
		menusStore
	} from '@/stores/base';
	import {
		userStore 
	} from '@/stores/user';
	// import {baseNotify} from '@/composition/notify.js'
	// const notify = ref()
	// baseNotify(notify) 
	const base = baseStore()
	const menus = menusStore()
	const user = userStore()
	
	onLoad(async () => {
		await user.getMallUserInfo()
	})
	
	function handleMenusClick(item) {
		console.log(item)
		if(item.type == 1 ){
			uni.reLaunch({
				url: item.url
			})
		}
		else if(item.type == 2 ){
			uni.redirectTo({
				url: item.url
			})
		}
		else if(item.type == 3 ){
			uni.navigateTo({
				url: item.url
			})
		}
		
		
		
	}
</script>

<style lang="scss">
	page {
		min-height: 100vh;
		background-color: $page-bg2;
	}
</style>
<style lang="scss" scoped>
	.box-row .custom-icon {
		color: #333;
	}
	.t-label {
		font-size: 22px!important;
	}
	.item-broker {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.icon-w {
		width: 40px;
		height: 40px;
		border-radius: 20px;
		background-color: #e4eef9;
		.custom-icon {
			color: #0d266b;
		}
	}
	.other-menus {
		.item {
			flex: 0 0 25%;
			.icon-img {
				width: 22px;
				height: 22px;
			}
		}
	}
	.wrapper {
		padding-bottom: 50px;
		// padding-top: 44px;
		min-height: 100vh;
		box-sizing: border-box;
		background-image: linear-gradient(15deg, #f8f8f8 40%, #d6eafe 75%, #e4f5fe 95%);
	}
	.menus-name {
		color: #666;
	}
	.ts-bg {
		background-image: linear-gradient(to bottom, #fef9f3, #fef7e3);
	}
	.user-item-box {
		border-radius: 18rpx;
		// box-shadow: 0 5rpx 10rpx rgba(90,90,90,.1);
		.set-sub {
			background-color: #eaf7ff;
			height: 28px;
			border-radius: 6rpx;
			overflow: hidden;
			.sub-title {
				height: 100%;
				border-radius: 0 4rpx 4rpx 0;
			}
			.sub-main {
				height: 100%;
				color: #5a86eb;
			}
		}
		.set-main {
			.mm-img {
				width: 36px;
				height: 36px;
				display: block;
			}
		}
	}
	.user {
		.user-img {
			width: 50px;
			height: 50px;
			border-radius: 50%;
			overflow: hidden;
			margin-right: 10px;
			background-color: #00b8ff;
			.custom-icon {
				font-size: 22px;
				color: #fff;
			}
		}
		.user-info {
			.name {
				
			}
			.sub {
				background-color: #7da5e2;
				background-image: linear-gradient(to right, #a1c3f7, #86b0f8);
				border-radius: 6rpx;
				white-space: nowrap;
			}
			.sub2 {
				
			}
		}
	}
	.user-data {
	}
</style>
