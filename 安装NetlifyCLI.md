# 安装 Netlify CLI 指南

## 方法一：使用 npm（推荐）

### 全局安装
```bash
npm install -g netlify-cli
```

### 本地安装（项目内）
```bash
cd vikingship
npm install --save-dev netlify-cli
```

然后使用：
```bash
npx netlify --version
npx netlify login
```

---

## 方法二：使用 Homebrew（macOS）

```bash
brew install netlify-cli
```

---

## 方法三：使用 yarn

```bash
yarn global add netlify-cli
```

---

## 方法四：使用 pnpm

```bash
pnpm add -g netlify-cli
```

---

## 验证安装

安装完成后，验证是否安装成功：

```bash
netlify --version
```

应该显示类似：
```
netlify-cli/17.x.x
```

---

## 如果安装失败

### 问题 1：网络连接超时
**解决**：使用国内镜像或重试
```bash
# 使用淘宝镜像
npm install -g netlify-cli --registry=https://registry.npmmirror.com

# 或使用 cnpm
npm install -g cnpm --registry=https://registry.npmmirror.com
cnpm install -g netlify-cli
```

### 问题 2：权限问题（macOS/Linux）
**解决**：使用 sudo 或修复 npm 权限
```bash
# 方式一：使用 sudo（不推荐）
sudo npm install -g netlify-cli

# 方式二：修复 npm 权限（推荐）
sudo chown -R $(whoami) ~/.npm
npm install -g netlify-cli
```

### 问题 3：sharp 依赖安装失败
**解决**：这是可选依赖，可以忽略或单独安装
```bash
# 先安装 sharp
npm install -g sharp --registry=https://registry.npmmirror.com

# 再安装 netlify-cli
npm install -g netlify-cli
```

---

## 使用本地安装（推荐）

如果全局安装有问题，可以在项目内安装：

```bash
cd vikingship
npm install --save-dev netlify-cli
```

然后在 `package.json` 中添加脚本：

```json
{
  "scripts": {
    "netlify": "netlify",
    "deploy": "netlify deploy --prod --build"
  }
}
```

使用：
```bash
npm run netlify -- --version
npm run deploy
```

---

## 快速开始

安装完成后：

```bash
# 1. 登录
netlify login

# 2. 初始化项目
cd vikingship
netlify init

# 3. 部署
netlify deploy --prod --build
```

---

## 卸载

如果需要卸载：

```bash
npm uninstall -g netlify-cli
```

