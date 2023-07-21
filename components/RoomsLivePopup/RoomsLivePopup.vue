<template>
	<view>
		<PopupNormal v-bind="$attrs" >
			<!-- <template #header>
				<view>header1</view>
			</template> -->
			<view class="list-w u-flex">
				<view class="list-item item-left">
					<u-list >
						<u-list-item
							v-for="(item, index) in roomList"
							:key="item.name"
						> 
							<view 
								class="u-p-20 u-p-t-30 u-p-b-30 nav-item u-font-28 u-flex-column u-flex-items-center"
								 @click="handleNavClick(index)"
								:class="{
									'active-nav': index == nav_current 
								}">
									<u--image
										showLoading
										:src="item.img"
										width="60px"
										height="60px"
									></u--image>
									<view class="u-p-t-20">{{item.name}}</view>
								</view> 
							
						</u-list-item>
					</u-list>
				</view>
				<view class="list-item item-right u-flex-1"> 
					<scroll-view class="main-list" scroll-y >
						<view class="u-p-20">
							<view 
								class="item-card"
								:class="{
									active: nav_current == props.current[0] && index == props.current[1]
								}"
								v-for="(item, index) in mainList"
								:key="item.id"
								@click="emits('onConfirm', {data: item, current: [nav_current, index]})"
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
	const { roomList, themeColor } = toRefs(base)
	const props = defineProps({ 
		current: {
			type: Array,
			default: () => {
				return [0, -1]
			},
		}
	}) 
	const emits = defineEmits(['onConfirm'])
	const nav_current = ref(0) 
	const mainList = computed(() => {
		if(roomList.value.length == 0) return []
		return roomList.value[nav_current.value].list
	})
	onMounted(async () => {
		if(roomList.value.length == 0) {
			uni.showLoading()
			await base.getRoomList()
		} 
	})
	watch(
		() => props.current,
		(n) => {
			nav_current.value = n[0]
		},
		{
			deep: true,
			immediate: true
		}
	)
	
	function handleNavClick(index) {
		nav_current.value = index
	}
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