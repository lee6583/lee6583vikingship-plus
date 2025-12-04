# 为什么这个项目使用 React Scripts？

## 📋 项目中的 React Scripts 用途

在这个组件库项目中，`react-scripts` 主要用于以下三个方面：

### 1. 🧪 **测试框架（主要用途）**

```json
"test": "react-scripts test",
"test:nowatch": "cross-env CI=true react-scripts test"
```

**作用**：
- 提供 **Jest** 测试框架
- 提供 **React Testing Library** 集成
- 自动发现和运行 `*.test.tsx` 文件
- 支持测试监听模式（watch mode）

**实际使用**：
```typescript
// src/components/Button/button.test.tsx
import { render, fireEvent } from '@testing-library/react'
import Button from './button'

describe('test Button component', () => {
  it('should render the correct default button', () => {
    const wrapper = render(<Button>Nice</Button>)
    // ... 测试代码
  })
})
```

### 2. 📝 **ESLint 配置**

```json
"eslintConfig": {
  "extends": "react-app"
}
```

**作用**：
- 使用 Create React App 的 ESLint 配置
- 提供 React 和 TypeScript 的代码检查规则
- 在 `npm run lint` 时使用（虽然实际使用的是独立的 ESLint 命令）

### 3. 🚀 **可选的开发服务器（次要用途）**

```json
"start": "react-scripts start"
```

**作用**：
- 提供基于 Webpack 的开发服务器
- 支持热更新（HMR）
- 可以像普通 React 应用一样运行

**⚠️ 注意**：这个项目**主要使用 Storybook** 进行开发，`npm start` 命令实际上很少使用。

## 🤔 为什么组件库项目需要 React Scripts？

### ✅ 优点

1. **零配置测试环境**
   - 不需要手动配置 Jest
   - 不需要配置 Babel/TypeScript 转换
   - 开箱即用的测试环境

2. **统一的代码规范**
   - 使用标准的 React 项目 ESLint 配置
   - 与 Create React App 项目保持一致

3. **开发便利性**
   - 如果需要测试组件在实际应用中的表现，可以使用 `npm start`
   - 可以快速创建一个测试页面

### ❌ 缺点

1. **增加依赖体积**
   - `react-scripts` 包含很多不需要的工具（如 Webpack 配置）
   - 对于组件库项目来说，有些功能是冗余的

2. **不够灵活**
   - 如果只需要测试功能，可能更轻量的方案更好
   - 但移除它需要重新配置 Jest 和 ESLint

## 🔄 是否可以移除 React Scripts？

### 理论上可以，但需要：

1. **手动配置 Jest**
   ```json
   {
     "jest": {
       "preset": "ts-jest",
       "testEnvironment": "jsdom",
       "setupFilesAfterEnv": ["<rootDir>/src/setupTests.ts"]
     }
   }
   ```

2. **手动配置 ESLint**
   - 安装 `eslint-config-react-app` 或使用其他配置

3. **手动配置 Babel/TypeScript**
   - 确保测试文件能正确转换

### 实际建议

**保留 React Scripts**，因为：
- ✅ 测试功能是必需的
- ✅ 配置简单，开箱即用
- ✅ 项目已经稳定运行
- ✅ 虽然体积稍大，但作为开发依赖可以接受

## 📊 项目中的工具分工

| 工具 | 用途 | 是否必需 |
|------|------|---------|
| **Storybook** | 组件开发和展示 | ✅ 主要开发工具 |
| **Rollup** | 构建组件库（生产环境） | ✅ 必需 |
| **React Scripts** | 测试 + ESLint + 可选开发服务器 | ⚠️ 主要用于测试 |
| **Sass** | 编译 SCSS 样式 | ✅ 必需 |

## 🎯 总结

**React Scripts 在这个项目中的作用**：

1. **主要作用**：提供测试框架（Jest + React Testing Library）
2. **次要作用**：提供 ESLint 配置和可选的开发服务器
3. **不是必需的**：组件库的构建使用 Rollup，开发使用 Storybook

**为什么使用它**：
- 方便：零配置的测试环境
- 标准：使用 Create React App 的标准配置
- 稳定：项目已经验证过的方案

**是否可以移除**：
- 可以，但需要重新配置 Jest 和 ESLint
- 建议保留，因为测试是必需的，而且配置简单

## 💡 学习建议

1. **理解测试的重要性**：组件库必须有完善的测试
2. **了解工具分工**：
   - Storybook = 开发组件
   - Rollup = 构建组件库
   - React Scripts = 测试组件
3. **实际使用**：
   ```bash
   # 开发组件（主要）
   npm run storybook
   
   # 运行测试
   npm test
   
   # 构建组件库（发布时）
   npm run build
   ```
