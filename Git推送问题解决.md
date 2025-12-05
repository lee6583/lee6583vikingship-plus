# Git Push 失败问题解决

## 🔍 当前问题

**错误信息**：
```
致命错误：无法访问 'https://github.com/lee6583/lee6583vikingship-plus.git/'：
Failed to connect to github.com port 443 after 75034 ms: Couldn't connect to server
```

**原因**：网络连接问题，无法连接到 GitHub

---

## ✅ 解决方案

### 方案一：检查网络连接

```bash
# 测试 GitHub 连接
ping github.com

# 测试 HTTPS 连接
curl -I https://github.com
```

### 方案二：使用 SSH 代替 HTTPS（推荐）

#### 1. 检查是否已有 SSH 密钥

```bash
ls -al ~/.ssh
```

#### 2. 如果没有，生成 SSH 密钥

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

按 Enter 使用默认路径，可以设置密码或直接回车。

#### 3. 添加 SSH 密钥到 GitHub

```bash
# 复制公钥
cat ~/.ssh/id_ed25519.pub
# 或
pbcopy < ~/.ssh/id_ed25519.pub  # macOS
```

然后：
1. 访问 GitHub → Settings → SSH and GPG keys
2. 点击 "New SSH key"
3. 粘贴公钥并保存

#### 4. 修改远程仓库地址为 SSH

```bash
cd vikingship
git remote set-url origin git@github.com:lee6583/lee6583vikingship-plus.git
```

#### 5. 测试连接

```bash
ssh -T git@github.com
```

应该看到：
```
Hi lee6583! You've successfully authenticated...
```

#### 6. 重新推送

```bash
git push origin main
```

---

### 方案三：配置代理（如果使用代理）

```bash
# 设置 HTTP 代理
git config --global http.proxy http://proxy.example.com:8080
git config --global https.proxy https://proxy.example.com:8080

# 取消代理
git config --global --unset http.proxy
git config --global --unset https.proxy
```

---

### 方案四：使用 GitHub CLI（gh）

```bash
# 安装 GitHub CLI
brew install gh  # macOS

# 登录
gh auth login

# 推送
git push origin main
```

---

### 方案五：增加超时时间

```bash
# 设置更长的超时时间
git config --global http.postBuffer 524288000
git config --global http.lowSpeedLimit 0
git config --global http.lowSpeedTime 999999
```

---

## 🔄 当前状态

根据 `git status` 显示：

1. **有未提交的更改**：
   - `package.json` 已修改但未暂存
   - 两个新的 markdown 文件未跟踪

2. **本地有 1 个提交未推送**：
   - 提交 `f0f8a09 部署 nefigx` 还未推送到远程

---

## 📝 完整操作流程

### 1. 先提交本地更改

```bash
cd vikingship

# 添加所有更改
git add .

# 提交
git commit -m "feat: add netlify deployment config and docs"

# 或分别提交
git add package.json
git commit -m "feat: add netlify deployment scripts"

git add *.md
git commit -m "docs: add netlify deployment guide"
```

### 2. 解决网络问题后推送

```bash
# 使用 SSH（推荐）
git remote set-url origin git@github.com:lee6583/lee6583vikingship-plus.git
git push origin main

# 或使用 HTTPS（如果网络正常）
git push origin main
```

---

## 🎯 推荐操作

**最快解决方案**：

1. **切换到 SSH**（如果已配置 SSH 密钥）：
   ```bash
   git remote set-url origin git@github.com:lee6583/lee6583vikingship-plus.git
   git push origin main
   ```

2. **或等待网络恢复后重试**：
   ```bash
   git push origin main
   ```

3. **或使用 GitHub Desktop**（图形界面工具）

---

## ⚠️ 注意事项

- 确保网络连接正常
- 如果使用 VPN，确保 VPN 正常工作
- SSH 方式通常比 HTTPS 更稳定
- 可以先测试网络连接再推送

---

## 🔍 检查命令

```bash
# 检查远程仓库配置
git remote -v

# 检查网络连接
ping github.com

# 检查 Git 配置
git config --list | grep proxy
```

