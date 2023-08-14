<template>
	<view class="w">
		<view class="u-flex u-flex-center u-p-30">
			<view class="card work">
				<view class="img-section">
					<view class="u-flex u-flex-between u-p-20 u-p-l-30 u-p-r-30">
						<view class="item">认证信息</view>
						<view class="item">
							<u-icon name="more-dot-fill" color="#467f92" size="17"></u-icon>
						</view>
					</view>
				</view>
				<view class="card-desc bg-white">
					<template v-if="index != '2'">
						<template v-if="account_loading">
							<view class="u-flex u-flex-column u-flex-items-center u-flex-center " style="height: 200px;" >
								<u-loading-icon 
									mode="flower" 
									size="40"  
									color="#56c2e6"   
									></u-loading-icon>
									<view class="u-m-t-30 u-font-28 text-desc">获取最新数据中...</view>
							</view>
						</template>
						<!-- 未创建 个人账户信息 -->
						<template v-else-if="!account_info || !account_info.hasOwnProperty('state') || account_info.state == 0">
							<view class="u-flex u-flex-column u-flex-items-center u-p-40">
								<up-image :src="base.empty" width="50vw" mode="widthFix"></up-image>
								<view class="text-desc u-m-t-30">您还未创建办理人信息</view>
							</view>
						</template>
						<!-- 个人账户信息 --> 
						<template v-else>
							<view class="card-header u-p-b-10">
								<view class="card-title u-flex u-flex-items-center">
									<view class="item">
										<u-icon name="account-fill" size="17" color="#8898e8"></u-icon>
									</view>
									<view class="item u-font-34 u-m-l-15">{{account_info.name}}</view>
								</view>
								<view class="card-menu u-flex u-flex-items-center">
									<view class="item u-flex u-flex-items-center u-font-28 text-desc">
										{{account_info.ctime}}
									</view> 
								</view>
							</view>
							<view class="card-rows u-p-15 u-p-l-30 u-p-r-30 u-radius-5 u-m-t-12" >
								<view class="u-flex u-flex-items-center u-m-b-5">
									<view class="item">
										<u-icon name="list" size="17" color="#8898e8"></u-icon>
									</view>
									<view class="item u-m-l-15 u-font-28 text-desc">{{ idTypeList2str }}</view>
								</view>
								<view class="u-font-40">{{account_info.idNumber}}</view>
							</view>
							<view class="card-rows u-p-15 u-p-l-30 u-p-r-30 u-radius-5 u-m-t-12" >
								<view class="u-flex u-flex-items-center u-m-b-5">
									<view class="item">
										<u-icon name="phone-fill" size="17" color="#8898e8"></u-icon>
									</view>
									<view class="item u-m-l-15 u-font-28 text-desc">手机</view>
								</view>
								<view class="u-font-40">{{account_info.mobile}}</view>
							</view>
							<view class="card-rows u-p-15 u-p-l-30 u-p-r-30 u-radius-5 u-m-t-12" v-if="account_info.email">
								<view class="u-flex u-flex-items-center u-m-b-5">
									<view class="item">
										<u-icon name="email" size="17" color="#8898e8"></u-icon>
									</view>
									<view class="item u-m-l-15 u-font-28 text-desc">电子邮箱</view>
								</view>
								<view class="u-font-40">{{account_info.email}}</view>
							</view>
							<view class="card-rows u-p-15 u-p-l-30 u-p-r-30 u-radius-5 u-m-t-12" >
								<view class="u-flex u-flex-items-center u-m-b-5">
									<view class="item">
										<u-icon name="info-circle" size="17" color="#8898e8"></u-icon>
									</view>
									<view class="item u-m-l-15 u-font-28 text-desc">个人认证状态</view>
								</view>
								<view class="u-font-36 u-flex u-flex-items-center u-flex-between">
									<view class="item " :class="{
										'text-success': account_info.state == 2,
										'text-error': account_info.state != 2
									}">{{ finance_account_status }}</view>
									<view class="item"> 
										<u-button 
											v-if="account_info.state == 1"
											:customStyle="{
												...customStyle,
												background: '#1c204b', 
											}"
											shape="circle" 
											hoverClass="none"
											ripple
											rippleBgColor="rgba(255,255,255,.2)"
											:hairLine="false"
											@click="base.handleGoto('/pages_finance/user_verify/user_verify')"
										 >
											去认证
										 </u-button> 
									</view>
								</view>
							</view>
						</template>
						
						<view class="card-btns u-flex u-flex-wrap u-flex-items-start u-m-t-25">
							<view class="item u-m-r-20 u-m-b-20" v-if=" account_info.state != 2">
								<u-button 
									:customStyle="{
										...customStyle
									}"
									shape="circle"
									hoverClass="none"
									ripple
									rippleBgColor="rgba(255,255,255,.2)"
									:hairLine="false"
									@click="base.handleGoto('/pages_finance/user_apply/user_apply')"
								 >
									<view class="u-flex u-flex-items-center">
										<u-icon name="edit-pen" size="17" color="#fff" ></u-icon>
										<view class="u-m-l-10 u-font-28">{{account_info.state == "1" ?"更新": "新建"}}个人账户</view>
									</view>
								 </u-button>
							</view>
							<!-- <view class="item u-m-r-20 u-m-b-20" v-if="account.state == 2 ">
								<u-button 
									:customStyle="{
										...customStyle
									}"
									shape="circle"
									hoverClass="none"
									ripple
									rippleBgColor="rgba(255,255,255,.2)"
									:hairLine="false"
									@click="removeAcc"
								 >
									<view class="u-flex u-flex-items-center">
										<u-icon name="zhuxiao" custom-prefix="custom-icon" size="28"></u-icon>
										<view class="u-m-l-10 u-font-28">注销个人账户</view>
									</view>
								 </u-button>
							</view> -->
							<view class="item u-m-r-20 u-m-b-20" >
								<u-button 
									:customStyle="{
										...customStyle
									}"
									shape="circle"
									hoverClass="none"
									ripple
									rippleBgColor="rgba(255,255,255,.2)"
									:hairLine="false"
									@click="updateDataUser"
								 >
									<view class="u-flex u-flex-items-center">
										<u-icon name="reload" size="15" color="#fff"></u-icon>
										<view class="u-m-l-10 u-font-28">刷新</view>
									</view>
								 </u-button>
							</view>
						</view>
					</template>
					
					<template v-if="index != '1' && account_info.hasOwnProperty('state') && account_info.state == 2"> 
						 
						<view class="line" v-if="index != '2'"></view>
						
						<template v-if="organizations_loading">
							<view class="u-flex u-flex-column u-flex-items-center u-flex-center " style="height: 200px;" >
								<u-loading-icon 
									mode="flower" 
									size="40"  
									color="#56c2e6"   
									></u-loading-icon>
									<view class="u-m-t-30 u-font-28 text-desc">获取最新数据中...</view>
							</view>
						</template>
						<!-- 未创建 企业账户信息 -->
						<template v-else-if="!organizations_info || !organizations_info.hasOwnProperty('auth_record_state') || organizations_info.auth_record_state == 0">
							<view class="u-flex u-flex-column u-flex-items-center u-p-40">
								<u-image :src="base.empty" width="50vw" mode="widthFix"></u-image>
								<view class="text-desc u-m-t-30">您还未创建企业信息</view>
							</view>
						</template>
						<!-- 企业账户信息 -->
						<template v-else>
							<view class="u-m-t-25 u-p-b-10" style="width: 100%;">
								<view class="card-menu u-flex u-flex-items-center u-flex-between u-m-b-12"> 
									<view class="item u-flex u-flex-items-center u-font-28 text-desc">
										{{organizations_info.ctime}}
									</view> 
								</view>
								<view class="card-title u-flex u-flex-items-start">
									<view class="item u-p-t-5">
										<u-icon name="account-fill"  size="16" color="#8898e8"></u-icon>
									</view>
									<view class="item u-font-34 u-m-l-15">{{organizations_info.name}}</view>
								</view>
							</view>
							
							<view class="card-rows u-p-15 u-p-l-30 u-p-r-30 u-radius-5 u-m-t-12" >
								<view class="u-flex u-flex-items-center u-m-b-5">
									<view class="item">
										<u-icon name="list" size="19" color="#8898e8"></u-icon>
									</view>
									<view class="item u-m-l-15 u-font-28 text-desc">统一社会信用代码</view>
								</view>
								<view class="u-font-40">{{organizations_info.idNumber}}</view>
							</view>
							<view class="card-rows u-p-15 u-p-l-30 u-p-r-30 u-radius-5 u-m-t-12" >
								<view class="u-flex u-flex-items-center u-m-b-5">
									<view class="item">
										<u-icon name="info-circle" size="17" color="#8898e8"></u-icon>
									</view>
									<view class="item u-m-l-15 u-font-28 text-desc">企业认证状态</view>
								</view>
								<view class="u-font-36 u-flex u-flex-items-center u-flex-between">
									<view class="item" :class="{
										'text-success': organizations_info.auth_record_state == 2,
										'text-error': organizations_info.auth_record_state != 2,
									}">{{ finance_organizations_status}}</view>
									<view class="item"> 
										<u-button 
											v-if="organizations_info.auth_record_state != 2"
											:customStyle="{
												...customStyle,
												background: '#1c204b',
											}"
											shape="circle" 
											hoverClass="none"
											ripple
											rippleBgColor="rgba(255,255,255,.2)"
											:hairLine="false"
											@click="base.handleGoto('/pages_finance/cpy_verify/cpy_verify')"
										 >
											去认证
										 </u-button> 
									</view>
								</view>
							</view>
							
						
						</template>
						<view class="card-btns u-flex u-flex-wrap u-flex-items-start u-m-t-25">
							<view class="item u-m-r-20 u-m-b-20" v-if="organizations_info.auth_record_state != 2">
								<u-button 
									:customStyle="{
										...customStyle,
									}"
									shape="circle"
									hoverClass="none"
									ripple
									rippleBgColor="rgba(255,255,255,.2)"
									:hairLine="false"
									@click="base.handleGoto('/pages_finance/company_apply/company_apply')"
								 >
									<view class="u-flex u-flex-items-center">
										<u-icon name="edit-pen" size="17" color="#fff" ></u-icon>
										<view class="u-m-l-10 u-font-28">{{organizations_info.state == "1" ?"更新": "新建"}}企业账户</view>
									</view>
								 </u-button>
							</view> 
							<view class="item u-m-r-20 u-m-b-20" v-if="account_info.organizations_id">
								<u-button 
									:customStyle="{
										...customStyle
									}"
									shape="circle"
									hoverClass="none"
									ripple
									rippleBgColor="rgba(255,255,255,.2)"
									:hairLine="false"
									@click="updateDataCpy"
								 >
									<view class="u-flex u-flex-items-center">
										<u-icon name="reload" size="15" color="#fff"></u-icon>
										<view class="u-m-l-10 u-font-28">刷新</view>
									</view>
								 </u-button>
							</view>
						</view>
					</template>
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
	import {useFinanceStore} from '@/stores/finance'
	import useFilter from '@/composition/useFilter.js'
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
		idTypeList,
	} = toRefs(finance) 
	const zt2str = computed(() => {
		return {
			idType: account_info.value.idType,
			finance_account_status: account_info.value.state,
			finance_organizations_status: organizations_info.value.auth_record_state,
		}
	})
	const {
		idTypeList2str,
		finance_account_status,
		finance_organizations_status
	} = useFilter(zt2str)
	const $api = inject('$api')
	const index = ref('')
	const customStyle = ref({
		border: '0',
		padding: '0 15px',
		color: '#fff',
		background: '#589cfb',
		height: '35px'
	})
	onLoad((options) => {
		if(options.hasOwnProperty('index')) {
			this.index = options.index
		}
		refresh()
	})
	
	async function refresh() {
		await updateDataUser()
		if(this.index != '1') {
			await updateDataCpy()
		}
		
	}
	
	async function updateDataUser() {
		await finance.getAccountData()
	}
	async function updateDataCpy() {
		await finance.getCpyData()
	}
	
	
</script>

<style lang="scss">
	page {
		
		min-height: 100vh;
	}
</style>
<style lang="scss" scoped>
	.w {
		background-color: #f7f7f7;
		background: linear-gradient(to bottom, #326dbd 10%, #f7f7f7 25%);
		background-image: linear-gradient(to bottom, #326dbd 10%, #f7f7f7 25%);
	}
	.card {
		--primary-clr: #1c204b;
		--dot-clr: #BBC0FF;
		--play: #56c2e6;
		width: 100%;
		min-height: 150px;
		border-radius: 10px;
		// box-shadow: 15px 15px 30px #bebebe,
		//              -15px -15px 30px #ffffff;
		font-family: "Arial";
		color: #666;
		// display: grid;
		// cursor: pointer;
		// grid-template-rows: 50px 1fr;
	}
	.text-desc {
		color: #999;
	}
	.card-rows {
		// width: 100%;
		background-color: #ecf4ff;
	}
	.card-desc {
		width: 100%;
		box-sizing: border-box;
		border-radius: 10px;
		padding: 15px;
		position: relative;
		top: -10px; 
		background: #fff;
		box-shadow: 0 -10px 10px rgba(0,0,0,0.2);
	}

	.card-time {
		font-size: 1.7em;
		font-weight: 500;
	}

	.img-section {
		height: 50px;
		transition: 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		background: #f8f6f7;
		width: 99%;
		margin: 0 auto;
		color: #326dbd;
	}

	.card-header {
		display: flex;
		align-items: center;
		width: 100%;
	}

	.card-title {
		flex: 1;
		// font-size: 0.9em;
		// font-weight: 500;
	}

	.card-menu {
		// display: flex;
		// gap: 4px;
		// margin-inline: auto;
	}

	.card svg {
		float: right;
		max-width: 100%;
		max-height: 100%;
	}

	.card .dot {
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: var(--dot-clr);
	}

	.card .recent {
		line-height: 0;
		font-size: 0.8em;
	}
	.line {
		width: 100%;
		height: 0;
		border-bottom: 1rpx dashed rgba(255,255,255,.3);
		margin: 20rpx 0;
	}
</style>
