# Vue 3 + Typescript + Vite 项目

## 编码规范

### ref 默认值

推荐使用 tsx：

```
const div = ref<HTMLDivElement>();
```

不推荐使用

```
const div = ref<HTMLDivElement | null>(null);
```

## 如何打包

pnpm run build
前端部署时注意:
在 build 的时候
要传一个 build base，（vite）
也可以是 build url,
也可以是 build path,(creat-app)
也可以是 homepage。（vite-cli）
404 的报错 先找这几步是不是写错了。(在不同的脚手架里面 名称是不同的。)

## 部署

腾讯云
base:

```
pnpm run build --base /
bin/coscli-linux cp -r dist cos://accounting-2023-4-1313510194
```
