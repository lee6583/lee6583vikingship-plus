# Netlify CLI 安装和部署指南

## 📦 安装 Netlify CLI

### 方法一：使用 npx（推荐，无需安装）

**无需安装，直接使用 npx 运行**：

```bash
# 登录（首次使用）
npx netlify-cli login

# 初始化项目
npx netlify-cli init

# 部署
npx netlify-cli deploy --prod --build
```

**优点**：
- ✅ 无需安装，不占用空间
- ✅ 自动使用最新版本
- ✅ 避免依赖冲突

---

### 方法二：全局安装（如果网络正常）

```bash
npm install -g netlify-cli
```

**如果遇到网络问题，使用镜像**：
```bash
npm install -g netlify-cli --registry=https://registry.npmmirror.com
```

**验证安装**：
```bash
netlify --version
```

---

### 方法三：使用 Homebrew（macOS）

```bash
brew install netlify-cli
```

---

### 方法四：使用项目脚本（已配置）

我已经在 `package.json` 中添加了脚本，可以直接使用：

```bash
# 使用 netlify 命令
npm run netlify -- --version
npm run netlify -- login

# 一键部署
npm run deploy:netlify
```

---

## 🚀 部署步骤（使用 npx，推荐）

### 1. 登录 Netlify

```bash
cd vikingship
npx netlify-cli login
```

会打开浏览器，点击授权即可。

### 2. 初始化项目

```bash
npx netlify-cli init
```

按提示选择：
- **Create & configure a new site** (创建新站点)
- 输入站点名称（或使用默认）
- 选择团队（如果有）

### 3. 部署

```bash
# 方式一：构建后部署
npm run build-storybook
npx netlify-cli deploy --prod --dir=storybook-static

# 方式二：使用项目脚本（一键部署）
npm run deploy:netlify
```

---

## 🌐 通过 Netlify 网站部署（最简单）

如果 CLI 安装有问题，可以直接通过网站部署：

### 1. 准备 Git 仓库
```bash
git add .
git commit -m "feat: add netlify deployment"
git push origin main
```

### 2. 登录 Netlify
- 访问：https://app.netlify.com
- 使用 GitHub/GitLab/Bitbucket 账号登录

### 3. 导入项目
1. 点击 **"Add new site"** → **"Import an existing project"**
2. 选择你的 Git 提供商
3. 选择 `vikingship` 仓库

### 4. 配置（自动读取 netlify.toml）
- Build command: `npm run build-storybook`
- Publish directory: `storybook-static`

### 5. 部署
点击 **"Deploy site"**，等待完成即可。

---

## 📋 已配置的文件

✅ `netlify.toml` - Netlify 配置文件
✅ `package.json` - 已添加部署脚本

### package.json 新增脚本：
```json
{
  "scripts": {
    "netlify": "netlify",
    "deploy:netlify": "npm run build-storybook && npx netlify deploy --prod --dir=storybook-static"
  }
}
```

---

## 🎯 快速部署命令

### 使用 npx（推荐）
```bash
# 登录
npx netlify-cli login

# 初始化（只需一次）
npx netlify-cli init

# 部署
npm run deploy:netlify
```

### 使用项目脚本
```bash
npm run deploy:netlify
```

---

## ⚠️ 常见问题

### 1. 网络连接超时
**解决**：使用网站部署方式，或重试

### 2. sharp 依赖安装失败
**解决**：这是可选依赖，不影响基本功能，可以忽略

### 3. 权限问题
**解决**：
```bash
sudo chown -R $(whoami) ~/.npm
```

---

## ✅ 推荐方案

**最简单的方式**：
1. 使用 **npx** 运行（无需安装）
2. 或直接通过 **Netlify 网站**部署（最简单）

两种方式都能成功部署！🎉

