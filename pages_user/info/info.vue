<template>
	<view class="u-p-20">
		<view class="u-p-10 u-p-l-30 u-p-r-30 bg-white u-radius-8 u-m-b-30">
			<u--form
				labelPosition="left"
				:model="form" 
				ref="uForm"  
				labelWidth="80px"
				:labelStyle="{color: '#000'}"  
				:rules="rules"
				>
				<u-form-item
					label="直播间"
					prop="roomid" 
					@click="showRoomList = true"  
					borderBottom
					required 
					>
					<u--input
						v-model="roomid2str"
						readonly 
						placeholder="点击选择" 
						suffixIcon="arrow-down-fill"
						suffixIconStyle="color: #666; font-size: 14px; margin-left:10px"
						border="none"
						inputAlign="right"
					></u--input> 
				</u-form-item>
				<u-form-item
					label="预约日期"
					prop="riqi" 
					@click="showCalendarShow = true"  
					borderBottom
					required 
					>
					<u--input
						v-model="form.riqi"
						readonly 
						placeholder="点击选择" 
						suffixIcon="arrow-down-fill"
						suffixIconStyle="color: #666; font-size: 14px; margin-left:10px"
						border="none"
						inputAlign="right"
					></u--input> 
				</u-form-item>
				<u-form-item
					label="入场时间"
					prop="hour" 
					required 
					@click="onChangeTimePopupShow"   
					>
					<template v-if="timeInputDisabled">
						<view class="u-info u-text-right">请先确定预约直播间及日期</view>
					</template>
					<u-loading-icon v-else-if="time_loading"></u-loading-icon> 
					<view v-else class="u-flex u-flex-end ">
						<view class="time-w u-flex u-flex-wrap">
							<div 
								class="time-item u-info-light-bg u-p-5 u-p-l-16 u-p-r-16 u-radius-4 u-m-l-18 u-m-t-6 u-m-b-6"
								v-for="item in timeData"
								:key="item.value"
								>
								{{item.name}}
							</div>
						</view>
						<u-icon name="arrow-down-fill" color="#666" size="14"></u-icon>
					</view> 
				</u-form-item>
			</u--form>
		</view> 
	</view>
			<u-safe-bottom></u-safe-bottom>
</template>

<script setup>
	import { onLoad, onReady } from "@dcloudio/uni-app";
	import { ref, reactive, computed, toRefs, inject, watch } from 'vue'
	import { share } from '@/composition/share.js'
	import { baseStore } from '@/stores/base'
	import {userStore} from '@/stores/user'
	const user = userStore()
	const base = baseStore();
	
	
	const rules = {
		'roomid': {
			type: 'any',
			required: true,
			message: '不能为空',
			trigger: ['blur', 'change']
		},
		'riqi': {
			type: 'string',
			required: true,
			message: '不能为空',
			trigger: ['blur', 'change']
		},
		'hour': {
			type: 'string',
			required: true,
			message: '不能为空',
			trigger: ['blur', 'change']
		},
	}
	const uForm = ref()
	const form = ref({
		roomid: '',  
		riqi: '',
		hour: '', 
	})
</script>

<style>

</style>
