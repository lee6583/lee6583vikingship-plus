# Netlify 部署指南

## ✅ 构建测试

Storybook 构建已成功完成，输出目录：`storybook-static`

## 🚀 部署步骤

### 方法一：通过 Netlify 网站（最简单）

#### 1. 准备 Git 仓库
```bash
# 确保代码已提交到 Git
git add .
git commit -m "feat: add netlify deployment config"
git push origin main
```

#### 2. 登录 Netlify
- 访问：https://app.netlify.com
- 使用 GitHub/GitLab/Bitbucket 账号登录

#### 3. 导入项目
1. 点击 **"Add new site"** → **"Import an existing project"**
2. 选择你的 Git 提供商（GitHub/GitLab/Bitbucket）
3. 授权 Netlify 访问你的仓库
4. 选择 `vikingship` 仓库

#### 4. 配置构建设置
Netlify 会自动读取 `netlify.toml` 配置，或手动设置：

- **Build command**: `npm run build-storybook`
- **Publish directory**: `storybook-static`
- **Node version**: `18` (在环境变量中设置)

#### 5. 部署
- 点击 **"Deploy site"**
- 等待构建完成（约 1-2 分钟）
- 获得部署地址：`https://your-site-name.netlify.app`

---

### 方法二：通过 Netlify CLI（命令行）

#### 1. 安装 Netlify CLI
```bash
npm install -g netlify-cli
```

#### 2. 登录
```bash
netlify login
```
会打开浏览器进行登录授权

#### 3. 初始化项目
```bash
cd vikingship
netlify init
```

按提示选择：
- **Create & configure a new site** (创建新站点)
- 输入站点名称（或使用默认）
- 选择团队（如果有）

#### 4. 部署
```bash
# 方式一：构建后部署
npm run build-storybook
netlify deploy --prod

# 方式二：自动构建并部署
netlify deploy --prod --build
```

---

### 方法三：手动拖拽部署（快速测试）

#### 1. 本地构建
```bash
cd vikingship
npm run build-storybook
```

#### 2. 拖拽部署
1. 访问：https://app.netlify.com/drop
2. 将 `storybook-static` 文件夹拖拽到页面
3. 等待上传和部署完成

---

## 📋 配置文件说明

### netlify.toml
```toml
[build]
  command = "npm run build-storybook"
  publish = "storybook-static"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

**配置说明**：
- `command`: 构建命令
- `publish`: 发布目录（Storybook 构建输出）
- `redirects`: SPA 路由重定向（确保所有路由都指向 index.html）
- `NODE_VERSION`: Node.js 版本

---

## 🔄 自动部署

配置完成后，每次推送到主分支（main/master）都会自动触发部署：

```bash
git push origin main
# Netlify 会自动检测并部署
```

---

## 🌐 自定义域名

### 添加自定义域名
1. 在 Netlify 站点设置中点击 **"Domain settings"**
2. 点击 **"Add custom domain"**
3. 输入你的域名（如：`storybook.yourdomain.com`）
4. 按照提示配置 DNS：
   - 添加 CNAME 记录指向 Netlify 提供的地址
   - 或添加 A 记录指向 Netlify 的 IP

### 自动 HTTPS
Netlify 会自动为你的域名配置 SSL 证书（Let's Encrypt）

---

## 📊 部署状态检查

### 查看部署日志
1. 在 Netlify 控制台点击你的站点
2. 点击 **"Deploys"** 标签
3. 查看构建日志和部署状态

### 本地测试构建
```bash
# 构建 Storybook
npm run build-storybook

# 本地预览构建结果
npx serve storybook-static
# 或
cd storybook-static && python -m http.server 8000
```

---

## ⚠️ 常见问题

### 1. 构建失败
**问题**：Node 版本不匹配
**解决**：在 `netlify.toml` 中已设置 `NODE_VERSION = "18"`

**问题**：依赖安装失败
**解决**：检查 `package.json` 和 `package-lock.json` 是否已提交

### 2. 页面 404
**问题**：路由无法访问
**解决**：已配置 `redirects`，所有路由都会重定向到 `index.html`

### 3. 样式丢失
**问题**：CSS 文件路径错误
**解决**：检查 Storybook 构建输出中的资源路径

### 4. 更新部署
```bash
# 推送代码自动部署
git push origin main

# 或手动触发
netlify deploy --prod
```

---

## 🎯 部署检查清单

- [x] ✅ `netlify.toml` 配置文件已创建
- [x] ✅ Storybook 构建测试成功
- [ ] ⬜ 代码已推送到 Git 仓库
- [ ] ⬜ Netlify 账号已登录
- [ ] ⬜ 站点已创建并配置
- [ ] ⬜ 首次部署成功
- [ ] ⬜ 自定义域名（可选）

---

## 📝 部署命令速查

```bash
# 构建 Storybook
npm run build-storybook

# Netlify CLI 登录
netlify login

# 初始化项目
netlify init

# 部署到生产环境
netlify deploy --prod

# 查看部署状态
netlify status

# 打开站点
netlify open
```

---

## 🎉 部署成功！

部署成功后，你会获得：
- ✅ 生产地址：`https://your-site-name.netlify.app`
- ✅ 自动 HTTPS 证书
- ✅ 全球 CDN 加速
- ✅ 自动部署（Git push 触发）
- ✅ 部署预览（每个 PR 都有预览链接）

祝部署顺利！🚀

