<template>
	<view>
		<u-popup :show="$attrs.show" @close="close" @open="open">
			<view class="wrapper">
				<view class="wrapper-header  u-p-20 "> 
					<slot name="header">
						<view class="u-flex u-flex-between u-flex-items-center">
							<view class="item"></view>
							<view class="u-text-center">
								{{attrs.title}}
							</view> 
							<view class="item u-font-28 u-info" @click="close">取消</view>
							
						</view>
					</slot> 
				</view>
				<view class="wrapper-main">
					<slot></slot> 
				</view>
				<view class="wrapper-footer">
					<slot name="footer"></slot>  
				</view>
			</view>
		</u-popup>
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
	onMounted(() => {
		console.log(attrs)
	}) 
	const emits = defineEmits(['open'])
	const attrs = useAttrs()
	// const visible = computed({
	//     get() {
	//         return attrs.show
	//     },
	//     set(value) { 
	// 		attrs.updateShow(value) 
	//     }
	// })
	function close () {
		attrs.onUpdateShow(false)
	}
		 
	function open () {
		emits('open')
	}
		 	 
</script>

<style lang="scss" scoped>
	.wrapper-main { 
		background-color: #f8f8f8;
	}
</style>