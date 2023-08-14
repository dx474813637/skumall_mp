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
					label="融资产品ID"
					prop="product_id"  
					:borderBottom="false"
					required 
					>
					<view @click="bankProductShow = true">
						<up-input 
							v-model="form.product_name" 
							readonly
							placeholder="请选择" 
							suffixIcon="arrow-down"
							suffixIconStyle="color: #ccc;"  
						></up-input> 
					</view>   
				</u-form-item> 
				<u-form-item
					label="收款方公司名称"
					prop="company"  
					:borderBottom="false"
					required 
					>
					<up-input
						v-model="form.company" 
						placeholder="收款方公司名称"
					></up-input> 
				</u-form-item> 
				<u-form-item
					label="收款方公司统一社会信用代码"
					prop="company_reg"  
					:borderBottom="false"
					required 
					>
					<up-input
						v-model="form.company_reg" 
						placeholder="收款方公司统一社会信用代码"
					></up-input> 
				</u-form-item>  
				<u-form-item
					label="收款方银行账户名称"
					prop="name"  
					:borderBottom="false"
					required 
					>
					<up-input
						v-model="form.name" 
						placeholder="收款方银行账户名称"
					></up-input> 
				</u-form-item>  
				<u-form-item
					label="收款方银行总行名称"
					prop="bank_name"  
					:borderBottom="false"
					required 
					>
					<view @click="bankShow = true">
						<up-input 
							v-model="form.bank_name" 
							readonly
							placeholder="请选择" 
							suffixIcon="arrow-down"
							suffixIconStyle="color: #ccc;"  
						></up-input> 
					</view>  
				</u-form-item> 
				<u-form-item
					label="收款方银行卡号"
					prop="cardNo"  
					:borderBottom="false"
					required 
					>
					<up-input
						v-model="form.cardNo" 
						placeholder="收款方银行卡号"
					></up-input> 
				</u-form-item> 
				<u-form-item
					label="收款方银行账户开户行名称"
					prop="subbranch"  
					:borderBottom="false"
					required 
					>
					<view @click="bankDetailShow = true">
						<up-input
							v-model="form.subbranch" 
							readonly
							placeholder="请选择" 
							suffixIcon="arrow-down"
							suffixIconStyle="color: #ccc;"  
						></up-input> 
					</view>  
				</u-form-item> 
				<u-form-item
					label="收款方开户行银行编码"
					prop="cnapsCode"  
					:borderBottom="false"
					required 
					>
					<up-input
						readonly 
						v-model="form.cnapsCode" 
						placeholder="请先选择“收款方银行账户开户行名称”"
					></up-input> 
				</u-form-item> 
				<u-form-item
					label="用户审核状态"
					prop="state"  
					:borderBottom="false"
					required 
					>
					<u-switch 
						v-model="form.state" 
						activeValue="1"
						inactiveValue="0"
					></u-switch>
				</u-form-item> 
				<u-form-item
					label="借款人ID"
					prop="id"  
					:borderBottom="false"
					required
					v-if="form.id"
					>
					<up-input
						readonly 
						v-model="form.id"  
					></up-input>  
				</u-form-item> 
				<u-form-item
					label="来往交易图片"
					prop="fileList"  
					:borderBottom="false"
					required 
					>
					<u-upload
						:fileList="form.fileList"
						@afterRead="afterRead"
						@delete="deletePic"
						name="1" 
						:maxCount="1"
					></u-upload>
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
	<BankProductPopup
		:show="bankProductShow"
		title="融资产品"
		:list="product_list"
		:onUpdateShow="handleChangeShow3"
		@onConfirm="bankProductConfirm"
		@onRefresh="getBankProduct"
	></BankProductPopup>
	<BankNamePopup
		:show="bankShow"
		title="收款方银行总行名称"
		:onUpdateShow="handleChangeShow"
		@onConfirm="bankConfirm"
	></BankNamePopup>
	<BankSubNamePopup
		:show="bankDetailShow"
		title="对公账号开户行支行名称全称"
		:onUpdateShow="handleChangeShow2"
		@onConfirm="bankDetailConfirm"
	></BankSubNamePopup>
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
	const rules = {
		product_id: [
			{
				required: true,
				message: "请输入融资产品ID",
				trigger: ["blur", "change"],
			},
		], 
		company: [
			{
				required: true,
				message: "请输入公司名称",
				trigger: ["blur", "change"],
			},
		], 
		company_reg: [
			{
				required: true,
				message: "请输入收款方公司统一社会信用代码",
				trigger: ["blur", "change"],
			},
		], 
		name: [
			{
				required: true,
				message: "请输入收款方银行账户名称",
				trigger: ["blur", "change"],
			},
		], 
		bank_name: [
			{
				required: true,
				message: "请输入收款方银行总行名称",
				trigger: ["blur", "change"],
			},
		], 
		cardNo: [
			{
				required: true,
				message: "请输入收款方银行卡号",
				trigger: ["blur", "change"],
			},
		], 
		subbranch: [
			{
				required: true,
				message: "请输入收款方银行账户开户行名称",
				trigger: ["blur", "change"],
			},
		], 
		cnapsCode: [
			{
				required: true,
				message: "请输入收款方开户行银行编码",
				trigger: ["blur", "change"],
			},
		],  
	}
	const uForm = ref()
	const product_list = ref([])
	const bankShow = ref(false)
	const bankProductShow = ref(false)
	const bankDetailShow = ref(false) 
	const form = ref({
		product_id: "", 
		product_name: "", 
		company: "", 
		company_reg: "", 
		name: "",
		bank_name: "",
		cardNo: "",
		subbranch: "",
		cnapsCode: "",
		state: "1",
		id: "",
		remark: "",
		fileList: [], 
		pic1: "",
		pic2: "",
		pic3: "",
		pic4: "",
		pic5: "",
	}) 
	const loading = ref(false)
	onReady(() => {
		uForm.value.setRules(rules)
	})
	onLoad(async (options) => {
		if(options.hasOwnProperty('id') ) {
			form.value.id = options.id
		}
		getBankProduct()
		uni.showLoading()
		await getDetail()
	})
	
	
	function deletePic(event) {
		form.value.fileList.splice(event.index, 1) 
	}
	async function afterRead(event) {
		console.log(event)
		form.value.fileList = [{
			url:  event.file.thumb,
			status: 'uploading',
			message: '上传中'
		}]
		const base64 = await getImageBase64_readFile(event.file.thumb)
		
		form.value.fileList = [{
			url: event.file.thumb,
			status: 'success'
		}]
		form.value.pic1 = base64 
		
	} 
	function bankProductConfirm(data) {
		form.value.product_id = data.product_id 
		form.value.product_name = data.name  
		handleChangeShow3(false)
	}
	function handleChangeShow(data) {
		bankShow.value = data
	}
	function handleChangeShow2(data) {
		bankDetailShow.value = data
	}
	function handleChangeShow3(data) {
		bankProductShow.value = data
	}
	function bankConfirm(data) { 
		form.value.bank_name = data.name  
		handleChangeShow(false)
	}
	function bankDetailConfirm(data) {
		form.value.subbranch = data.bank_name  
		handleChangeShow2(false)
	} 
	async function getBankProduct() {
		const res = await $api.query_product_list()
		if (res.code == 1) {
			product_list.value = res.list.data 
		}
	}
	async function getDetail() {
		const res = await $api.no_order_white_sell_detail({params: {id: form.value.id}})
		if(res.code == 1) {
			form.value.product_id = res.list.product_id
			form.value.product_name = res.list.product_name
			form.value.company = res.list.company 
			form.value.company_reg = res.list.company_reg 
			form.value.name = res.list.name
			form.value.bank_name = res.list.bank_name
			form.value.cardNo = res.list.cardNo
			form.value.subbranch = res.list.subbranch
			form.value.cnapsCode = res.list.cnapsCode
			form.value.state = res.list.state
			form.value.id = res.list.id
			form.value.remark = res.list.remark   
			res.list.pic1 && form.fileList.push({url: res.list.pic1}) 
			res.list.pic2 && form.fileList.push({url: res.list.pic2}) 
			res.list.pic3 && form.fileList.push({url: res.list.pic3}) 
			res.list.pic4 && form.fileList.push({url: res.list.pic4}) 
			res.list.pic5 && form.fileList.push({url: res.list.pic5}) 
		}
	}
	
	
	function submit() {
		uForm.value.validate().then(async () => {
			loading.value = true
			uni.showLoading()
			const res = await $api.no_order_white_sell_change({
				...form.value,   
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
