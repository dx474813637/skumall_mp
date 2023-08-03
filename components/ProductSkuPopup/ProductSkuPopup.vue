<template>
	<view>
		<PopupNormal v-bind="$attrs" @open="open"> 
			<view class="list-w bg-white">   
				<view class="u-flex u-flex-items-start u-p-20">
					<view class="item">
						<u--image
							showLoading
							width="60px"
							height="60px"
							radius="8px"
							:src="product_img_preview"
							@click="onImgClick"
						></u--image>
					</view>
					<view class="u-m-l-20">
						<view>{{list.name}}</view>
					</view>
					
				</view>
				<scroll-view class="main-list" scroll-y >
					<view class="u-p-30">
						<view class="item u-m-b-20"
							v-for="(item) in sku_arr"
							:key="item.name"
						>
							<view class="label u-m-b-30 ">
								{{item.name}} ({{item.children.length}})
							</view>
							<view class="sku-items u-flex u-flex-wrap u-flex-items-start">
								<view class="sku-items-tag u-font-28"
									:class="{
										active: sku_form[item.name] == ele.name,
										disabled: false,
									}"
									v-for="ele in item.children"
									:key="ele.name"
									@click="onSelectSku(item.name, ele.name)"
								>
									{{ele.name}}
								</view>
							</view>
						</view>
						<view class="item u-m-b-20 u-flex u-flex-items-center u-flex-between u-p-t-30" >
							<view class="label ">
								<text>数量</text>
								<text 
									class="u-font-28 u-error-dark u-m-l-20" 
									v-if="product_num_disabled"
									style="font-weight: normal;"
								>请选择规格</text>
							</view>
							<view class=" ">
								<u-number-box 
									ref="countRef" 
									v-model="product_num" 
									:disabled="product_num_disabled"
									:max="product_num_max"
									:min="1"
									asyncChange
									inputWidth="80" 
									@change="numChange"
									@blur="inputBlur"
									@overlimit="numOverlimit"
									></u-number-box>
							</view>
						</view>
					</view>
					
				</scroll-view> 
			</view>  
			<template #footer>
				<view class="u-p-20">
					<u-button type="primary" shape="circle" @click="submit">加入购物车</u-button>
				</view>
			</template>
		</PopupNormal>
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
		useAttrs,
		nextTick
	} from 'vue' 
	import {isObjectEqual} from '@/utils/base.js'
	const attrs = useAttrs()
	const $api = inject('$api')
	import { baseStore } from '@/stores/base'
	const base = baseStore();
	const { themeColor } = toRefs(base)
	import { userStore } from '@/stores/user'
	const user = userStore();
	const { user_info } = toRefs(user)
	 
	const props = defineProps({  
		list: {
			type: Object,
			default: () => {
				return {}
			},
		},
		sku: {
			type: String,
			default: '',
		},
		spec_prices: {
			type: Array,
			default: () => {
				return []
			},
		},
	})   
	const countRef = ref()
	const sku_form = ref({})
	const sku_arr = ref([]) 
	const product_num_max = ref(1)
	const product_num = ref(1)
	const active_sku_preview_img = ref('')
	const product_num_disabled = computed(() => {
		return Object.values(sku_form.value).some(ele => !ele)
	})
	const product_img_preview = computed(() => {
		let img = '';
		if(props.list.id) {
			img = props.list.pic.split('|')[0]
		}
		if(active_sku_preview_img.value){
			img = active_sku_preview_img.value;
		}
		return img 
	})
	
	watch(
		() => props.sku,
		(n) => {
			sku_arr.value = skustr2arr(n)  
			console.log(sku_arr.value)
			sku_arr.value.forEach(ele => {
				sku_form.value[ele.name] = ''
			})
			console.log(sku_form.value)
		}
	)
	watch(
		() => product_num_max.value,
		(val, old) => {
			console.log(val);
			if(val < product_num.value) {
				product_num.value = product_num_max.value
				// countRef.value.blur()
				
			}
		}
	)
	watch(
		() => product_num.value,
		(val, old) => {
			console.log(val); 
			if(val > product_num_max.value) {
				product_num.value = product_num_max.value
				// countRef.value.onBlur()
			}
		}
	)
	onMounted(async () => { 
	})  
	
	function skustr2arr (skustr) {
		if(!skustr) return []
		return skustr.split('^').map((ele, i) => {
			let children = ele.split('|')[1].split(',').map((item, index) => {
				return {
					id: index,
					name: item,
					value: item
				}
			})
			return {
				id: i,
				name: ele.split('|')[0],
				children
			}
		})
	}
	function onSelectSku(key, value) { 
		if(sku_form.value[key] == value) {
			value = ''
			active_sku_preview_img.value = ''
		}  
		sku_form.value[key] = value 
		// checkSkuDisabled()
		if(Object.values(sku_form.value).filter(ele => !ele).length == 0) {
			setMaxCount()
		} 
	}
	function setMaxCount() {
		// console.log(product_sku.form)
		let i = props.spec_prices.map(ele => ele.specs).findIndex(ele => {
			// console.log(ele, product_sku.form)
			return isObjectEqual(ele, sku_form.value)
		})
		// console.log(i)
		if(i != -1) {
			let count = props.spec_prices[i].stock;
			if(count == 0) {
				product_num.value = 0
			}
			product_num_max.value = +count
			active_sku_preview_img.value = props.spec_prices[i].img
		}
	} 
	
	function numChange(e) { 
		product_num.value = e.value
		nextTick(() => {
			countRef.value.init()
		})
		
		// console.log(product_num.value)
	}
	
	function numOverlimit(e) {
		console.log(e)
	}
	
	function inputBlur(e) {
		
	}
	function onImgClick() {
		uni.previewImage({
			urls: [product_img_preview.value],
			current: 0,
			longPressActions: {
				itemList: ['发送给朋友', '保存图片', '收藏'],
				success: function(data) {
					console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
				},
				fail: function(err) {
					console.log(err.errMsg);
				}
			}
		});
	}
	 
</script>

<style lang="scss" scoped>
	.list-w { 
		// background-color: #f2f2f2;
		position: relative;
		.load-bg {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 20;
			background-color: rgba(255,255,255,.6);
		}
		.list-item {
			position: relative;
			z-index: 10;
			height: 100%;
			&.item-left {
				flex: 0 0 35%;
				background-color: #f8f8f8;
			}
		}
	} 
	.main-list {
		height: 50vh;
		box-sizing: border-box;
		.item {
			.label {
				font-weight: bold;
				color: #000;
			}
			.sku-items {
				.sku-items-tag {
					height: 34px;
					line-height: 34px;
					padding: 0 15px;
					margin-bottom: 10px;
					margin-right: 10px;
					border-radius: 6px;
					background-color: #f2f2f2; 
					color: #333; 
					box-sizing: border-box;
					border: 1rpx solid #f2f2f2;
					&.active {
						background-color: $u-primary-light;
						color: $u-primary; 
						border-color: $u-primary; 
					}
					&.disabled {
						background-color: #f8f8f8;
						color: #aaa; 
						border-color: #f8f8f8;
					}
				}
			}
		}
	} 
</style>