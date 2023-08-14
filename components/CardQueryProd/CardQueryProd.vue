<template>
	<view class="card u-radius-8 bg-white u-p-10 u-p-l-40 u-p-r-40" @click="gotoDetail">
		<view class="u-p-10 u-p-t-20 u-p-b-30 u-border-bottom u-flex u-flex-items-center u-flex-between">
			<view class="item u-flex u-flex-items-center">
				<view class="u-font-34 text-bold text-black">{{origin.name}}</view>
				<view class="u-m-l-10">
					<u-tag 
						:show="origin.status == 1"
						text="激活" 
						mode="dark"
						type="warning" 
						size="mini"
						bg-color="#fe5e2a"
					></u-tag>
				</view>
			</view>
			<view class="item">
				<u-icon name="arrow-right-double" color="#aaa" size="17"></u-icon>
			</view> 
		</view>
		<view class="u-flex u-flex-between u-flex-items-center u-p-l-10 u-p-t-20 u-p-b-30">
			<view class="item">
				<view class="text-error u-font-50 u-m-b-10">
					<template v-if="origin.max_amount">
						<u-count-to 
							:end-val="origin.max_amount" 
							separator=","
							color="#ff0000"
							duration="100"
							decimals="2"
						></u-count-to>
					</template>
					<template v-else>--</template>
				</view>
				<view class="text-light u-font-26">单用户最高额度(元)</view>
			</view>
			<view class="item" @click.stop="btnClick" v-if="origin.max_amount">
				<u-button type="primary" :customStyle="{background: '#306dbe', borderRadius: '6px'}">预授信申请</u-button>
			</view>
		</view>
		<view class="card-info u-flex u-flex-items-start u-p-20 u-radius-8 u-m-b-10">
			<view class="item u-flex-1">
				<view class="title u-font-24 u-m-b-20">银行利率(年化)</view>
				<view class="value u-font-28">{{origin.annualized}}</view>
			</view> 
			<view class="item u-flex-1">
				<view class="title u-font-24 u-m-b-20">所属银行</view>
				<view class="value u-font-28">{{origin.bank_name}}</view>
			</view> 
			<view class="item u-flex-1">
				<view class="title u-font-24 u-m-b-20">授信期限</view>
				<view class="value u-font-28">{{origin.credit_term || '-'}}<template v-if="origin.credit_mode == 'month'">月</template></view>
			</view> 
			<view class="item u-flex-1">
				<view class="title u-font-24 u-m-b-20">贷款期限</view>
				<view class="value u-font-28">{{origin.loan_term || '-'}} <template v-if="origin.credit_mode == 'month'">月</template> </view>
			</view>
		</view>
		<view class="text-light u-p-10  u-font-26" v-if="origin.remark">银行备注：{{origin.remark}}</view> 
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
	const props = defineProps({
		origin: {
			type: Object,
			default: () => {
				return {}
			}
		}
	})
	const emits = defineEmits(['paccClick', 'detailClick'])
	function btnClick() {
		emits('paccClick', {data: props.origin})
	}
	function gotoDetail() {
		emits('detailClick', {data: props.origin})
	} 
</script> 
<style lang="scss" scoped>
	.item {
		    word-break: break-all;
	}
	.card-info {
		background-color: #fff5f3;
		color: #9b392d;
		
		.item {
			padding: 0 8px;
			border-right: 1rpx solid #f4e5e0;
			&:last-child {
				border-right: 0;
			}
			.title {
				font-weight: 400;
				white-space: nowrap;
				color: #c68d84;
			}
			.value { 
				height: 24px;
				white-space: nowrap;
			}
		}
	}
</style>