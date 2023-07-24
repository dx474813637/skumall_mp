<template>
	<view>
		<PopupNormal v-bind="$attrs" @open="open">
			<template #header>
				<view class="u-flex u-flex-between u-flex-items-center">
					<view class="item u-font-28 u-primary" @click="refresh">刷新</view>
					<view class="u-text-center">
						{{$attrs.title}}
					</view> 
					<view class="item u-font-28 u-info" @click="$attrs.onUpdateShow(false)">取消</view>
					
				</view>
			</template>
			<view class="list-w u-flex"> 
				<view class="load-bg u-flex u-flex-center u-flex-items-center" v-if="$attrs.loadstatus">
					<u-loading-icon text="加载中"></u-loading-icon>
				</view> 
				<view class="list-item item-right u-flex-1"> 
					<scroll-view class="main-list" scroll-y >
						<view class="u-p-20">
							<view 
								class="item-card"
								:class="{
									active: arr_value.includes(item.value),
									disabled: item.zt != 1
								}"
								v-for="(item, index) in list"
								:key="item.value"
								@click="selectLabel(item)"
							>
								<view class="u-line-1">{{item.name}}</view> 
							</view>
						</view>
					</scroll-view>
				</view>
			</view> 
			<template #footer>
				<view class="u-p-20">
					<u-button type="primary" shape="circle" @click="confirmBtn">确定({{arr.length}})</u-button>
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
		watch
	} from 'vue' 
	import { baseStore } from '@/stores/base'
	const base = baseStore();
	const { themeColor } = toRefs(base)
	const props = defineProps({ 
		current: {
			type: Array,
			default: () => {
				return []
			},
		},
		list: {
			type: Array,
			default: () => {
				return []
			},
		}
	}) 
	const emits = defineEmits(['onConfirm', 'onRefresh']) 
	const arr = ref([])
	const arr_value = computed(() => {
		return arr.value.map(ele => ele.value)
	})
	// watch(
	// 	() => props.current,
	// 	(n) => {
	// 		arr.value = uni.$u.deepClone(n)
	// 	},
	// 	{
	// 		deep: true,
	// 		immediate: true
	// 	}
	// )
	onMounted(async () => { 
	}) 
	function refresh() {
		emits('onRefresh')
	}
	function selectLabel(item) {
		if(item.zt != 1) return
		let i = arr_value.value.indexOf(item.value)
		if(i == -1) {
			arr.value.push(item)
			arr.value = arr.value.sort((a, b) => a.value - b.value)
		}
		else {
			arr.value.splice(i, 1)
		} 
	}
	function open() { 
		console.log(props.current)
		arr.value = uni.$u.deepClone(props.current)
	}
	function confirmBtn() {
		emits('onConfirm', {current: arr.value})
	}
</script>

<style lang="scss" scoped>
	.list-w {
		height: 60vh;
		background-color: #f2f2f2;
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
		&.disabled {
			opacity: .4;
			background-color: $u-error-light;
			color: $u-error;
			border-color: $u-error;
		}
	}
</style>