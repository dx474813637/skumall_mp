<template>
	<view class="w u-flex-column">
		<view class="header bg-white u-p-20">
			<u-search 
				placeholder="请输入关键字" 
				v-model="keyword" 
				:showAction="false"
				@search="handleSearch"
			></u-search>
		</view>
		<view class="list u-flex-1 u-flex "> 
			<scroll-view 
				scroll-y
				class="item item-nav-w"
			>
				<view class="nav">
					<view 
						class="nav-item" 
						@click="base.handleGoto('/pages/product/productList')"
						>
							<view class="u-line-2">全部</view> 
						</view>
					<view 
						class="nav-item"
						v-for="(item, index) in cate_list"
						:key="item.id"
						:class="{
							active: nav_index == index
						}"
						@click="navClick(index)"
						>
							<view class="u-line-2">
								{{ item.name }}
							</view> 
						</view>
				</view>
			</scroll-view> 
			<scroll-view
				scroll-y 
				class="item item-content-w u-flex-1 u-p-20"
				>
				<view class="u-flex u-flex-between u-flex-items-end u-m-b-30">
					<view class="item">
						<view
							class="u-flex u-flex-items-center "
							@click="base.handleGoto({url: '/pages/product/productList', params: {cate: cate_active_id}})"
						>
							<u-icon name="list-dot" size="20"></u-icon>
							<text class="u-m-l-10">{{cate_active_name}}</text>
						</view> 
					</view>
					<view class="item">
						<view
							class="u-flex u-flex-items-center u-font-28 u-info"
							@click="base.handleGoto({url: '/pages/product/productList', params: {cate: cate_active_id}})"
						>
							<text>查看全部</text>
							<u-icon name="arrow-right"></u-icon>
						</view>
					</view>
				</view>
				<view class="u-flex u-flex-wrap u-flex-items-center ">
					<view 
						class="item-card u-p-20 u-radius-5 bg-white u-border u-line-1 u-font-28"
						v-for="item in cate_main"
						:key="item.id"
						@click="base.handleGoto({url: '/pages/product/productList', params: {cate: item.id}})"
						>
						{{item.name}}
					</view>
				</view>
			</scroll-view>
		</view>
		<u-safe-bottom></u-safe-bottom>
	</view>
	
	
	<MenusBar></MenusBar>
</template>

<script setup>
	import { onLoad, onReady, onShareTimeline, onShareAppMessage, onReachBottom } from "@dcloudio/uni-app";
	import { ref, reactive, computed, toRefs, inject, watch, onMounted } from 'vue'
	import { share } from '@/composition/share.js'
	const { setOnlineControl } = share()
	const $api = inject('$api')
	
	import {useCateStore, baseStore} from '@/stores/base.js'
	const base = baseStore()
	const cate = useCateStore()
	const { cate_list, cate_loading } = toRefs(cate)
	const keyword = ref('')
	const nav_index = ref(0)
	const cate_active_id = computed(() => {
		if(cate_list.value.length == 0) return ''
		return cate_list.value[nav_index.value].id
	})
	const cate_active_name = computed(() => {
		if(cate_list.value.length == 0) return ''
		return cate_list.value[nav_index.value].name
	})
	const cate_main = computed(() => {
		if(cate_list.value.length == 0) return []
		return cate_list.value[nav_index.value].children
	})
	onLoad(async () => {
		cate.getCateData()
	})
	
	
	async function handleSearch() {
		base.handleGoto({
			url: '/pages/product/productList',
			params: {
				kw: keyword.value
			}
		})
	}
	
	function navClick(index) {
		nav_index.value = +index
	}
	
	
</script>

<style >
page {
	height: 100vh;
	padding-bottom: 50px;
	box-sizing: border-box;
}
</style>
<style lang="scss" scoped>
	.w {
		height: 100%;
		.list {
			height: 100%;
			>.item {
				height: 100%;
				&.item-nav-w {
					flex: 0 0 100px;
					background-color: #fff;
					.nav {
						.nav-item {
							font-size: 14px;
							padding: 15px 10px;
							border-bottom: 1rpx solid #f8f8f8;
							box-sizing: border-box;
							color: #666;
							&.active {
								background-color: #f8f8f8;
								color: #000;
							}
						}
					}
				}
				&.item-content-w {
					background-color: #f8f8f8;
					box-sizing: border-box;
					.item-card {
						flex: 0 0 48%;
						margin-bottom: 4%;
						margin-right: 4%;
						box-sizing: border-box;
						&:nth-of-type(2n) {
							margin-right: 0;
						}
					}
				}
			}
		}
	}
</style>
