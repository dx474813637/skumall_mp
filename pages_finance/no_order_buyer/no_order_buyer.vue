<template>
	<view class="u-p-20">
		<view class="u-p-10 u-p-l-30 u-p-r-30 bg-white u-radius-8 u-m-b-30">
			<u--form
				labelPosition="top"
				:model="form" 
				ref="uForm" 
				labelWidth="100%"
				:labelStyle="{color: '#000'}"  
				:rules="rules"
				>
				<u-form-item
					label="公司名称"
					prop="company"  
					:borderBottom="false"
					required 
					>
					<up-input
						v-model="form.company" 
						placeholder="公司名称"
					></up-input> 
				</u-form-item> 
				<u-form-item
					label="营业执照"
					prop="reg_pic"  
					:borderBottom="false"
					required 
					>
					<u-upload
						:fileList="form.filesList"
						@afterRead="afterRead"
						@delete="deletePic"
						name="1"
						limit="1"
						:maxCount="10"
					></u-upload>
				</u-form-item> 
				<u-form-item
					label="统一社会信用代码"
					prop="platform_reg"  
					:borderBottom="false"
					required 
					>
					<up-input
						v-model="form.platform_reg" 
						placeholder="统一社会信用代码"
					></up-input> 
				</u-form-item> 
				<u-form-item
					label="备注"
					prop="remark"  
					:borderBottom="false"
					required 
					>
					<up-input
						v-model="form.remark" 
						placeholder="备注"
					></up-input> 
				</u-form-item> 
			</u--form>
			<view class="u-p-t-40 u-p-b-40">
				<u-button 
					type="primary" 
					@click="submit" 
					:loading="loading" 
					:disabled="loading"
				>提交</u-button>
			</view>
		</view> 
	</view>
	<u-safe-bottom></u-safe-bottom>
</template>

<script setup>
	import { onLoad, onReady, onReachBottom } from "@dcloudio/uni-app";
	import { ref, reactive, computed, toRefs, inject, watch } from 'vue' 
	import { baseStore } from '@/stores/base'
	import {userStore} from '@/stores/user'
	import {useFinanceStore} from '@/stores/finance'
	import {getImageBase64_readFile} from '@/utils/base.js'
	const user = userStore()
	const { tmp_id_list, user:u  } = toRefs(user)
	const base = baseStore();
	const { themeColor } = toRefs(base) 
	const finance = useFinanceStore()
	const { 
		account_info, 
		account_loading, 
		organizations_info, 
		organizations_loading,
		no_order_buyer,
		no_order_buyer_loading,
		idTypeList,
		tooclePic
	} = toRefs(finance) 
	const $api = inject('$api')
	
	watch(
		() => no_order_buyer.value,
		(n) => {
			if(n.hasOwnProperty('id')) { 
				console.log(n)
				form.value.company = n.company
				form.value.platform_reg = n.platform_reg
				form.value.remark = n.remark
				form.value.reg_pic = n.reg_pic
				form.value.filesList = n.filesList
				form.value.id = n.id 
			}
		},
		{
			deep: true
		}
	) 
	const loading = ref(false)
	const rules = {
		company: [
			{
				required: true,
				message: "请输入公司名称",
				trigger: "blur",
			},
		],
		platform_reg: [
			{
				required: true,
				message: "请输入您统一社会信用代码",
				trigger: "blur",
			},
		],
	}
	const uForm = ref()
	const form = ref({
		company: "", 
		platform_reg: "", 
		remark: "", 
		reg_pic: "",
		filesList: [],
		id: ''
	}) 
	
	onReady(() => {
		uForm.value.setRules(rules)
	})
	onLoad(async () => {
		uni.showLoading()
		await finance.getno_order_buyer()
	})
	
	function deletePic(event) {
		form.value.filesList.splice(event.index, 1)
		
		// this.model.pic1 = ''
		// this.model.pic1_base64 = ''
		// this.model.pic1_name = ''
	}
	async function afterRead(event) {
		console.log(event)
		form.value.filesList = [{
			url:  event.file.thumb,
			status: 'uploading',
			message: '上传中'
		}]
		const base64 = await getImageBase64_readFile(event.file.thumb)
		
		form.value.filesList = [{
			url: event.file.thumb,
			status: 'success'
		}]
		form.value.reg_pic = base64 
		
	}
	
	function submit() {
		uForm.value.validate().then(async () => {
			loading.value = true
			uni.showLoading()
			const res = await $api.no_order_buyer_change({
				platform_reg: form.value.platform_reg, 
				remark: form.value.remark, 
				id: form.value.id, 
				company: form.value.company,
				reg_pic: form.value.filesList[0]?.url.replace(tooclePic.value, ''), 
			});
			loading.value = false
			if(res.code == 1) {
				uni.showToast({
					title: res.msg
				})
				finance.getno_order_buyer()
				 
			}
		}).catch(errors => {
			uni.$u.toast('请检查表单')
		}) 
	}
	
	
	
	
</script>

<style>

</style>
