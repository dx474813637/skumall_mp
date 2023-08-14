<template>
	<view>
		<PopupNormal v-bind="$attrs" >
			<template #header>
				<view class="u-flex u-flex-between u-flex-items-center">
					<view class="item u-font-28 u-primary" @click="handleRefresh">刷新</view>
					<view class="u-text-center">
						{{$attrs.title}}
					</view> 
					<view class="item u-font-28 u-error-dark" @click="$attrs.onUpdateShow(false)">取消</view>
					
				</view>
			</template>
			<view class="search bg-white u-p-20">
				<u-search
					placeholder="请输入关键字" 
					v-model="keyword" 
					:showAction="false"
					clearabled
				></u-search>
			</view>
			<view class="list-w u-flex">
				<view class="list-item item-right u-flex-1"> 
					<scroll-view class="main-list" scroll-y >
						<view class="u-p-20">
							<view 
								class="item-card bg-white" 
								v-for="(item, index) in list"
								:key="item.id"
								@click="emits('onConfirm', item)"
							>
								<view class="u-line-1" v-if="item.hasOwnProperty('pp')">
									<text>{{item.name.slice(0, item.pp[0])}}</text>
									<text class="u-error">{{item.name.slice(item.pp[0], item.pp[0]+item.pp[1])}}</text>
									<text>{{item.name.slice(item.pp[0]+item.pp[1])}}</text> 
								</view> 
								<view class="u-line-1" v-else>{{item.name}}</view> 	
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
	import { ref, reactive, computed, toRefs, inject, watch, onMounted } from 'vue' 
	import { baseStore } from '@/stores/base'
	import { userStore } from '@/stores/user'
	import { useFinanceStore } from '@/stores/finance'  
	const $api = inject('$api')    
	const finance = useFinanceStore()
	const { 
		account_info, 
		account_loading, 
		organizations_info, 
		organizations_loading,
		bank_list, 
		bank_loading,
		regional_list, 
		regional_loading,
		idTypeList,
		numList,
	} = toRefs(finance)   
	const emits = defineEmits(['onConfirm'])
	const keyword = ref('')
	onMounted(async () => {
		if(bank_list.value.length == 0) {
			uni.showLoading()
			await finance.getBankListData()
		} 
	})
	const list = computed(() => {
		let str = keyword.value.trim().toUpperCase()
		if(!str) return bank_list.value
		let arr = []
		let k = str.toUpperCase() 
		let name = ''
		bank_list.value.forEach(ele => { 
			name = ele.name.toUpperCase()
			let i = name.indexOf(k)
			if(i > -1) {
				ele.pp = [i, k.length]
				arr.push(ele)
			}
		}) 
		return arr
	})
	
	async function handleRefresh() {
		await finance.getBankListData()
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
		// background-color: #f8f8f8;
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