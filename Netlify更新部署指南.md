# Netlify 更新部署指南

## 🔄 自动部署 vs 手动部署

### ✅ 自动部署（推荐）

**前提**：通过 Git 仓库连接 Netlify

**优势**：
- ✅ 每次 `git push` 自动触发部署
- ✅ 无需手动操作
- ✅ 有部署历史记录
- ✅ PR 自动生成预览链接

**工作流程**：
```bash
# 1. 修改代码
vim src/components/Button/button.tsx

# 2. 提交更改
git add .
git commit -m "feat: update button component"

# 3. 推送到 GitHub
git push origin main

# 4. Netlify 自动检测并部署
# 等待 1-2 分钟，网站自动更新 ✅
```

**查看部署状态**：
- 访问 Netlify 控制台：https://app.netlify.com
- 点击你的站点 → "Deploys" 标签
- 可以看到部署进度和状态

---

### 🔧 手动部署

**使用场景**：
- 没有连接 Git 仓库
- 需要立即部署，不想等待自动部署
- 测试部署

**方法一：使用 CLI**
```bash
# 构建
npm run build-storybook

# 部署
npx netlify-cli deploy --prod --dir=storybook-static

# 或使用项目脚本
npm run deploy:netlify
```

**方法二：通过网站**
1. 访问 Netlify 控制台
2. 选择你的站点
3. 点击 "Deploys" → "Trigger deploy" → "Deploy site"

---

## 📝 更新操作步骤

### 场景一：日常开发更新（自动部署）

```bash
# 1. 修改代码
# ... 编辑文件 ...

# 2. 查看更改
git status

# 3. 添加更改
git add .

# 4. 提交
git commit -m "feat: add new feature"

# 5. 推送（自动触发部署）
git push origin main

# 6. 等待部署完成（1-2 分钟）
# 访问网站查看更新
```

### 场景二：紧急修复（手动部署）

```bash
# 1. 修改代码
# ... 修复 bug ...

# 2. 快速构建并部署
npm run deploy:netlify

# 3. 立即生效
```

### 场景三：测试部署（预览）

```bash
# 部署到预览环境（不更新生产）
npx netlify-cli deploy --dir=storybook-static

# 会获得一个预览链接，不影响生产环境
```

---

## 🌐 网站在线状态

### ✅ 网站会一直在线

**重要说明**：
- ✅ Netlify 是**托管服务**，网站运行在 Netlify 的服务器上
- ✅ **不依赖**你的本地电脑
- ✅ **不依赖**你的项目是否打开
- ✅ 关闭电脑、关闭 IDE、删除本地项目 → **网站依然在线**

**类比**：
- 就像你把文件上传到网盘，即使本地删除了，网盘上的文件还在
- Netlify 就是你的"网站网盘"

---

## 🔍 检查部署方式

### 检查是否连接了 Git

1. 访问 Netlify 控制台
2. 选择你的站点
3. 点击 "Site settings" → "Build & deploy" → "Continuous Deployment"
4. 如果显示 "Connected to Git"，说明已连接，支持自动部署 ✅

### 如果没有连接 Git

**推荐操作**：连接 Git 仓库以启用自动部署

1. 在 Netlify 控制台
2. 点击 "Site settings" → "Build & deploy" → "Continuous Deployment"
3. 点击 "Link repository"
4. 选择你的 Git 提供商和仓库
5. 配置构建设置：
   - Build command: `npm run build-storybook`
   - Publish directory: `storybook-static`

---

## 📊 部署状态监控

### 查看部署历史

1. 访问 Netlify 控制台
2. 选择你的站点
3. 点击 "Deploys" 标签
4. 可以看到：
   - ✅ 部署状态（成功/失败）
   - ⏱️ 部署时间
   - 📝 提交信息
   - 🔗 部署预览链接

### 部署通知

可以在 Netlify 设置中配置：
- 📧 邮件通知
- 💬 Slack 通知
- 🔔 其他通知方式

---

## ⚡ 快速更新命令

### 一键更新部署脚本

已在 `package.json` 中配置：

```json
{
  "scripts": {
    "deploy:netlify": "npm run build-storybook && npx netlify-cli deploy --prod --dir=storybook-static"
  }
}
```

**使用**：
```bash
npm run deploy:netlify
```

---

## 🎯 最佳实践

### 推荐工作流程

1. **开发** → 本地修改代码
2. **测试** → 本地运行 `npm run storybook` 测试
3. **提交** → `git add .` → `git commit -m "message"`
4. **推送** → `git push origin main`
5. **自动部署** → Netlify 自动检测并部署
6. **验证** → 访问网站确认更新

### 部署前检查清单

- [ ] 代码已测试通过
- [ ] 本地构建成功：`npm run build-storybook`
- [ ] 提交信息清晰
- [ ] 已推送到 Git 仓库（如果使用自动部署）

---

## ❓ 常见问题

### Q: 更新后网站没变化？
**A**: 
- 检查部署是否成功（Netlify 控制台）
- 清除浏览器缓存
- 等待 1-2 分钟（CDN 缓存更新）

### Q: 如何回滚到之前的版本？
**A**: 
- 在 Netlify 控制台 → "Deploys"
- 找到之前的部署
- 点击 "Publish deploy" 恢复

### Q: 可以同时部署多个环境吗？
**A**: 
- 可以，创建不同的站点
- 或使用分支部署（main → 生产，develop → 测试）

---

## 📚 总结

| 操作 | 自动部署 | 手动部署 |
|------|---------|---------|
| **连接 Git** | ✅ 是 | ❌ 否 |
| **更新方式** | `git push` | `npm run deploy:netlify` |
| **部署速度** | 1-2 分钟 | 立即 |
| **推荐场景** | 日常开发 | 紧急修复/测试 |

**网站状态**：✅ 一直在线，不依赖本地项目

