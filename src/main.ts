import { createApp } from 'vue'
import { setupStore } from '@/store';
import { setupRouter } from '@/router'

import App from '@/App.vue'

const app = createApp(App)

// 配置 store
setupStore(app);
// 配置路由
setupRouter(app);

app.mount('#app')
