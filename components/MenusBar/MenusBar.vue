<template>
	<view class="tabbar" style="box-shadow: `0 0 10rpx rgba(90,90,90,.4)`" > 
		<u-tabbar
			:value="menusActive"
			inactiveColor="#666"
			:activeColor="base.themeColor" 
			:border="false"
		>
			
			<u-tabbar-item 
				:text="item.name"  
				v-for="item in menusByMode" 
				:key="item.name"
				@click="tabsClick"
			> 
				<template #active-icon>
					<image
						class="u-page__item__slot-icon" 
						:src="item.white_icon_2  || item.img"
					></image>
				</template>
				
				<template #inactive-icon>
					<image
						class="u-page__item__slot-icon" 
						:src="item.white_icon_1  || item.img"
					></image> 
				</template>
				
				
			</u-tabbar-item>
				
		</u-tabbar>
	</view>
</template>
<script setup>
	import { 
		ref,
		toRefs,
		inject,
		computed,
		onMounted
	} from 'vue'
	import {
		menusStore,
		baseStore
	} from '@/stores/base';
	import { storeToRefs } from 'pinia' 
	const base = baseStore()
	const menusstore = menusStore()
	const { menus, menus_51xp, menusActive  } = storeToRefs(menusstore);
	// const menusRef  = computed(() => menus.menus);
	// const menusActiveRef = computed(() => menus.menusActive); 
	const $api = inject('$api')  
	
	const props = defineProps({
		mode: {
			type: String,
			default: ''
		}
	})
	const menusByMode = computed(() => { 
		if(props.mode == '2') return menus_51xp.value
		return menus.value
	})
	onMounted(() => {
		menusstore.getMenusData() 
		let routeObj = getCurrentPages()[getCurrentPages().length - 1]
		// console.log(routeObj)
		menusstore.saveCurPage({
			route: uni.$u.page(),
			options: routeObj.options
		})
		// console.log(menusActive)
	})
	function tabsClick(index) {
		const item = menusByMode.value[index]
		// console.log(item)
		if(item.type == 2 ){
			uni.redirectTo({
				url: item.url
			})
		}
		else if(item.type == 3 ){
			uni.navigateTo({
				url: item.url
			})
		}
		else if (item.type == 4) {
			uni.navigateToMiniProgram({
				appId: item.url,
				success(res) {
					// 打开成功
				},
				complete(res1) {
					console.log(res1);
				}
			});
		}
		else {
			uni.reLaunch({
				url: item.url
			})
		}
	}
	
</script>

<style lang="scss">
	.tabbar {
		:deep(.u-tabbar-item__icon)  {
			width: auto!important;
		}
	}
	
</style>
<style scoped lang="scss">
	.tabbar {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100vw;
		z-index: 50;
		border-top: 1rpx solid #eee;
	}
	.u-page__item__slot-icon {
	    width: 17px;
	    height: 17px;
	}
</style>
