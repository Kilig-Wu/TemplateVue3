##
├─ public ## 静态资源文件夹
├─ types ## 类型声明文件夹
├─ src ## 主项目文件夹
│  ├─ App.vue ## 组件入口
│  ├─ assets  ## 静态资源文件夹
│  ├─ components ## 组件文件夹会这里的组件会自动导入
│  ├─ composables ## 组合式api文件夹，默认会自动导入
│  ├─ layouts ## 布局文件夹
│  ├─ main.ts ## 项目整体入口
│  ├─ views ## 页面文件夹
│  ├─ router ## 路由配置文件
│  │  ├─ generate-route.ts ## 生成动态路由
│  │  ├─ router-guard.ts ## 路由拦截
│  │  └─ static-routes.ts ## 静态路由
│  ├─ stores ## pinia配置文件夹
│  └─ utils ## 工具函数
├─ .env.dev ## 开发环境配置文件
├─ .env.pro ## 生产环境配置文件
├─ .eslintignore ## eslint忽略文件
├─ .eslintrc ## eslint配置文件
├─ index.html
├─ tsconfig.json ## ts配置文件
├─ tsconfig.node.json ## vite.config.ts的ts配置
├─ package.json ## 依赖描述文件
├─ pnpm-lock.yaml ## pnpm包管理版本锁定文件
├─ unocss.config.ts ## unocss配置文件
└─ vite.config.ts ## vite配置文件
