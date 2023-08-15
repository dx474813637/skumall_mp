<template>
	<view class="u-p-40 w"> 
		<view class="u-flex u-flex-items-center u-flex-between u-m-b-30">
			<view class="item text-white u-font-38">{{list.name}}</view>
			<view class="item">
				<u-tag
					:show="list.status == 1"
					text="激活" 
					plain
					type="primary"  
					bgColor="#fff"
					shape="circle"
				></u-tag>
			</view>
		</view>
		<view class="card-w u-radius-8 u-p-20">
			<view class="u-flex u-flex-items-center u-flex-center text-light u-font-26 u-m-b-20">
				<view class="item u-p-r-10">
					银行利率(年化):{{list.annualized}}
				</view>
				<view class="item u-p-l-10">
					所属银行:{{list.bank_name}}
				</view>
			</view>
			<view class="bg-white u-p-20 u-radius-8">
				<view class="u-p-10 u-flex-column u-flex-items-center u-m-b-40">
					<view class="text-base u-font-28 u-m-b-20">单用户最高额度(元)</view>
					<u-count-to
						:end-val="list.max_amount || 0" 
						separator=","
						color="#326dbd"
						duration="100"
						decimals="2"
						font-size="30"
					></u-count-to>
				</view>
				<view class="card-info u-flex u-flex-items-start u-flex-wrap u-p-30 u-p-l-40 u-p-r-40 u-radius-8 u-m-b-10">
					
					<view class="item u-flex-1 u-flex-column u-flex-items-center">
						<view class="title text-base u-font-28">所属银行</view>
						<view class="value u-font-40">{{list.bank_name}}</view>
					</view> 
					<view class="item u-flex-1 u-flex-column u-flex-items-center">
						<view class="title text-base u-font-28">授信期限</view>
						<view class="value u-font-40">{{list.credit_term || '-'}}<template v-if="list.credit_mode == 'month'">月</template></view>
					</view> 
					<view class="item u-flex-1 u-flex-column u-flex-items-center">
						<view class="title text-base u-font-28">银行利率(年化)</view>
						<view class="value u-font-40">{{list.annualized}}</view>
					</view> 
					<view class="item u-flex-1 u-flex-column u-flex-items-center">
						<view class="title text-base u-font-28">贷款期限</view>
						<view class="value u-font-40">{{list.loan_term || '-'}}<template v-if="list.credit_mode == 'month'">月</template></view>
					</view>
				</view>
				<view class="text-light u-p-10  u-font-26 u-text-center" v-if="list.remark">银行备注：{{list.remark}}</view>
				<view class="u-p-40 u-m-t-20 u-p-l-60 u-p-r-60">
					<view class="u-m-b-20" v-if="list.yiqianbao_state == '2'">
						<u-button type="primary"   @click="paccClick">预授信申请</u-button>
					</view>
					<view class="">
						<u-button type="primary"  plain @click="base.handleGoto('/pages_finance/pacc_query_list/pacc_query_list')">查看历史授信</u-button>
					</view>
				</view>
				 <view>
					 <u-image
					 	src="https://wx3.y.netsun.com/Public/rz/rzbottom.png"
					 	width="100%"
						height="auto"
					 	mode="widthFix"
					 ></u-image>
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
	const pid = ref('') 
	const list = ref([])
	onLoad(async (options) => {
		if(options.hasOwnProperty('id')) {
			pid.value = options.id
		}
		uni.showLoading()
		await getData()
	})
	
	async function getData() {
		const res = await $api.query_product_detail({params: {product_id: pid.value}})
		if(res.code == 1) {
			list.value = res.list
		}
	} 
	
	function paccClick() {
		uni.navigateTo({
			url: `/pages_finance/pacc_query_edit/pacc_query_edit?id=${pid.value}`
		})
	}
</script>
 
<style lang="scss" scoped>
	.w {
		background: linear-gradient(to bottom, #326dbd 10%, #f6f7fb 25%);
		background-image: linear-gradient(to bottom, #326dbd 10%, #f6f7fb 25%);
		min-height: 100vh; 
	}
	.card-w {
		background: linear-gradient(to bottom, #edf8fe 10%, #fff 25%);
		background-image: linear-gradient(to bottom, #edf8fe 100px, #fff 250px); 
	}
	.card-info {
		background-color: #f7f8fc;
		color: #f96937;
		
		.item {
			padding: 0 8px;
			border-right: 1rpx solid #eee;
			height: 60px;
			flex: 0 0 50%;
			box-sizing: border-box;
			&:nth-of-type(2n) {
				border-right: 0;
			}
			.title {
				font-weight: 400;
				white-space: nowrap; 
			}
			.value { 
				height: 24px;
				white-space: nowrap;
			}
		}
	}
</style>
