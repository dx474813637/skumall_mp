<template>
	<view class="card u-radius-8 uni-shadow-base bg-white" @click.stop="gotoDetail">
		<view class="img-w">
			<view class="img">
				<u--image
					showLoading 
					width="100%"
					mode="aspectFill"
					:src="previewImg"
				 />
			</view>
			
		</view>
		<view class="content-w u-p-20 u-font-26">
			<view class="u-flex u-flex-between u-flex-items-center u-m-b-10"> 
				<view class="u-font-32" style="font-weight: bold; color: #fa3534;">￥{{origin.price}}</view>
				<view class="u-info u-font-24">{{$u.timeFrom(new Date(origin.uptime).getTime(), false)}}</view>
			</view>
			<view class="u-line-1 u-m-b-10">
				{{origin.name}}
			</view>
			<view class="u-flex u-flex-items-center u-info u-m-b-10" v-if="origin.company"> 
				<view class="u-line-1">{{origin.company.company}}</view>
			</view>
		</view>
		
	</view>
</template>

<script setup> 
	import { ref, reactive, computed, toRefs, inject, watch, onMounted } from 'vue'  
	import {useCateStore, baseStore} from '@/stores/base.js'
	const base = baseStore()
	const props = defineProps({
		origin: {
			type: Object,
			default: () => ({})
		}
	})
	
	const previewImg = ref('');
	watch(
		() => props.origin,
		(n) => {
			previewImg.value = n.pic.split('|')[0]
		},
		{
			immediate: true,
			deep: true
		}
	)
	function gotoDetail() {
		base.handleGoto({
			url: '/pages/product/productDetail',
			params: {
				id: props.origin.id
			}
		})
	}
</script>

<style lang="scss" scoped>
	.card {
		overflow: hidden;
	}
	.img-w {
		width: 100%;
		padding-top: 100%;
		position: relative;
		overflow: hidden;
		.img {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
		}
	}
</style>