<template>
	<view class=" w">
		<u-image 
			src="https://wx3.y.netsun.com/Public/rz/rztop1.png"
			width="100vw"
			height="auto"
			mode="widthFix"
		></u-image>
		<view class="u-p-20">
			<view class="list-title u-flex u-flex-items-center  u-p-b-30">
				<u-icon name="list" color="#306dbe" size="20"></u-icon>
				<view class="text-black u-font-34 u-m-l-20 u-font-bold">融资产品</view>
			</view>
			<view class="list">
				<view 
					class="item u-m-b-30 uni-shadow-base"
					v-for="item in list"
					:key="item.id"
					>
					<CardQueryProd
						:origin="item"
						@paccClick="paccClick"
						@detailClick="detailClick"
					></CardQueryProd>
				</view>
				
			</view>
		</view>
		
	</view>
</template>

<script setup>
	import { onLoad, onReady, onReachBottom } from "@dcloudio/uni-app";
	import { ref, reactive, computed, toRefs, inject, watch } from 'vue' 
	import { baseStore } from '@/stores/base'
	import {userStore} from '@/stores/user'
	const user = userStore()
	const { tmp_id_list, user:u  } = toRefs(user)
	const base = baseStore();
	const { themeColor } = toRefs(base) 
	const $api = inject('$api')   
	
	onLoad(async () => {
		uni.showLoading()
		await getData()
	})
	const list = ref([])
	async function getData() {
		const res = await $api.query_product_list()
		if(res.code == 1) {
			list.value = res.list.data
		}
	} 
	function paccClick({data}) {
		uni.navigateTo({
			url: `/pages_finance/pacc_query_edit/pacc_query_edit?id=${data.product_id}`
		})
	} 
	function detailClick({data}) {
		uni.navigateTo({
			url:`/pages_finance/query_product/query_product?id=${data.product_id}`
		})
	}
</script>

<style lang="scss" scoped>

</style>
