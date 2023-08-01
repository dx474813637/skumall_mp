<template>
	<view>
		<PopupNormal v-bind="$attrs" @open="open"> 
			<view class="list-w bg-white">   
				<scroll-view class="main-list  u-p-30" scroll-y >
					<view class="item u-m-b-20"
						v-for="(item) in sku_arr"
						:key="item.name"
					>
						<view class="label u-m-b-20 ">
							{{item.name}} ({{item.children.length}})
						</view>
						<view class="sku-items u-flex u-flex-wrap u-flex-items-start">
							<view class="sku-items-tag u-radius-5 u-info-light-bg u-info-dark u-font-28 u-p-8 u-p-l-20 u-p-r-20 u-m-r-20 u-m-b-20"
								v-for="ele in item.children"
								:key="ele.name"
							>
								{{ele.name}}
							</view>
						</view>
					</view>
				</scroll-view> 
			</view>  
			<template #footer>
				<view class="u-p-20">
					<u-button type="primary" shape="circle" @click="submit">加入购物车</u-button>
				</view>
			</template>
		</PopupNormal>
	</view>
</template>

<script setup>
	import {
		ref,
		toRefs,
		inject,
		computed,
		onMounted,
		reactive, 
		watch,
		useAttrs
	} from 'vue' 
	const attrs = useAttrs()
	const $api = inject('$api')
	import { baseStore } from '@/stores/base'
	const base = baseStore();
	const { themeColor } = toRefs(base)
	import { userStore } from '@/stores/user'
	const user = userStore();
	const { user_info } = toRefs(user)
	 
	const props = defineProps({  
		list: {
			type: Object,
			default: () => {
				return {}
			},
		},
		sku: {
			type: String,
			default: '',
		},
		spec_prices: {
			type: Array,
			default: () => {
				return []
			},
		},
	})   
	
	const sku_arr = ref([])
	watch(
		() => props.sku,
		(n) => {
			console.log(n)
			sku_arr.value = skustr2arr(n) 
		}
	)
	onMounted(async () => { 
	})  
	
	function skustr2arr (skustr) {
		if(!skustr) return []
		return skustr.split('^').map((ele, i) => {
			let children = ele.split('|')[1].split(',').map((item, index) => {
				return {
					id: index,
					name: item,
					value: item
				}
			})
			return {
				id: i,
				name: ele.split('|')[0],
				children
			}
		})
	}
	 
</script>

<style lang="scss" scoped>
	.list-w {
		height: 60vh;
		// background-color: #f2f2f2;
		position: relative;
		.load-bg {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 20;
			background-color: rgba(255,255,255,.6);
		}
		.list-item {
			position: relative;
			z-index: 10;
			height: 100%;
			&.item-left {
				flex: 0 0 35%;
				background-color: #f8f8f8;
			}
		}
	}
	.nav-item {
		color: #666; 
		&.active-nav {
			background-color: #f2f2f2;
			color: $u-primary; 
		}
	}
	.main-list {
		height: 100%;
		box-sizing: border-box;
		.item {
			.label {
				font-weight: bold;
				color: #000;
			}
		}
	}
	.item-card { 
		background-color: #e8e8e8;
		box-sizing: border-box;  
		margin-bottom: 10px; 
		padding: 10px;
		color: #666;
		border-radius: 5px;
		border: 1rpx solid #e8e8e8;
		&.active {
			background-color: $u-primary-light;
			color: $u-primary;
			border-color: $u-primary;
		}
	}
</style>