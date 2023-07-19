import App from './App'

import uviewPlus from 'uview-plus'
import pinia from '@/stores/index.js';
import apis from './config/apis/index'
import setHttp from '@/config/request.js' 
// import ws from '@/utils/webstocket.js'
 
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	app.provide('$http', uni.$u.http);
	// app.provide('$ws', ws); 
	app.provide('$api', apis);
	app.use(uviewPlus).use(pinia); 
	setHttp()
	return {
		app
	}
}