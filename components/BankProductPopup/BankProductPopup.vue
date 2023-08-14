<template>
	<view>
		<PopupNormal v-bind="$attrs" >
			<template #header>
				<view class="u-flex u-flex-between u-flex-items-center">
					<view class="item u-font-28 u-primary" @click="emits('onRefresh')">刷新</view>
					<view class="u-text-center">
						{{$attrs.title}}
					</view> 
					<view class="item u-font-28 u-error-dark" @click="$attrs.onUpdateShow(false)">取消</view>
					
				</view>
			</template>
			<view class="list-w u-flex">
				<view class="list-item item-right u-flex-1"> 
					<scroll-view class="main-list" scroll-y >
						<view class="u-p-20">
							<view 
								class="item-card" 
								v-for="(item, index) in list"
								:key="item.id"
								@click="emits('onConfirm', item)"
							>
								<view class="u-line-1">{{item.name}}</view> 
							</view>
						</view>
					</scroll-view>
				</view>
			</view> 
		</PopupNormal>
	</view>
</template>

<script setup>
	import { onLoad, onReady, onReachBottom } from "@dcloudio/uni-app";
	import { ref, reactive, computed, toRefs, inject, watch } from 'vue' 
	import { baseStore } from '@/stores/base'
	import { userStore } from '@/stores/user'
	import { useFinanceStore } from '@/stores/finance'  
	const $api = inject('$api')    
	const finance = useFinanceStore()
	const {  
		idTypeList,
		numList,
	} = toRefs(finance)   
	const emits = defineEmits(['onConfirm', 'onRefresh'])
	const props = defineProps({
		list: {
			type: Array,
			default: () => []
		}
	}) 
	 
</script>

<style lang="scss" scoped>
	.list-w {
		height: 60vh;
		background-color: #e8e8e8;
		.list-item {
			height: 100%;
			&.item-left {
				flex: 0 0 35%;
				background-color: #f8f8f8;
			}
		}
	}
	.nav-item {
		color: #666; 
		filter: grayscale(100%);
		&.active-nav {
			background-color: #e8e8e8;
			color: $u-primary; 
			filter: none;
		}
	}
	.main-list {
		height: 100%;
	}
	.item-card { 
		background-color: #f8f8f8;
		box-sizing: border-box;  
		margin-bottom: 10px; 
		padding: 10px;
		color: #666;
		border-radius: 5px;
		&.active {
			background-color: $u-primary-light;
			color: $u-primary;
		}
	}
</style>