# ArborayWeb 部署文档

## 版本信息

**当前版本**: V1.11  
**版本说明**: 添加 ICP 备案信息  
**更新日期**: 2026-06-11  
**备案信息**:
- 苏 ICP 备 2026036571 号
- 苏公网安备 32059002008098 号

---

## 部署环境

### 1. 国际环境（Vercel）

**目标市场**: 国外用户

**技术栈**:
- **代码托管**: GitHub
- **部署平台**: Vercel
- **域名**: arboray.ai
- **域名注册商**: Spaceship

**访问地址**:
- Vercel 预览：https://arboray-web-kvuo-git-main-rogerren10-75333e-projects.vercel.app
- 正式域名：https://arboray.ai

**部署流程**:
1. 代码推送到 GitHub 仓库 `rogerren10/arboray-web`
2. Vercel 自动触发构建和部署
3. 部署成功后自动更新域名解析

**特点**:
- ✅ 自动 CI/CD
- ✅ 全球 CDN 加速
- ✅ 无需手动运维

---

### 2. 国内环境（腾讯云 Docker）

**目标市场**: 国内用户

**技术栈**:
- **代码托管**: GitHub
- **部署方式**: GitHub Actions 自动部署
- **部署平台**: 腾讯云服务器（Docker）
- **域名**: arboray.tech
- **域名注册商**: 阿里云
- **备案状态**: ✅ 已完成

**访问地址**:
- https://arboray.tech

**部署流程**:
1. 代码推送到 GitHub `main` 分支
2. GitHub Actions 自动构建并上传到服务器
3. 服务器重新构建 Docker 镜像并重启容器
4. 自动完成部署

**特点**:
- ✅ 自动 CI/CD
- ✅ Docker 容器化部署
- ✅ 备案已完成，可正式访问

---

## GitHub Actions 自动部署配置

### 配置 GitHub Secrets

在 GitHub 仓库设置中添加以下 Secrets：

1. **TENCENT_SSH_KEY** - SSH 私钥（用于 GitHub Actions 登录服务器）
2. **TENCENT_SERVER_IP** - 服务器 IP：`49.233.160.126`
3. **TENCENT_USERNAME** - SSH 用户名：`ubuntu`

### 部署流程

1. **本地推送代码**:
   ```bash
   git add .
   git commit -m "feat: your changes"
   git push origin main
   ```

2. **GitHub Actions 自动执行**:
   - 检出代码
   - 安装 Node.js 和 pnpm
   - 安装依赖并构建
   - 打包部署文件
   - SSH 上传到服务器
   - 服务器重新构建 Docker 并重启

3. **部署完成**:
   - 访问 https://arboray.tech 查看最新代码

---

## 版本历史

- **V1.11** (2026-06-11): 添加 ICP 备案信息到页脚
- **V1.1** (2026-06-04): 初始版本

---

## 相关链接

- **GitHub 仓库**: https://github.com/rogerren10/arboray-web
- **Vercel Dashboard**: https://vercel.com/rogerren10-75333e/arboray-web-kvuo
- **ICP 备案查询**: https://beian.miit.gov.cn/

---

**文档更新时间**: 2026-06-11  
**当前版本**: V1.11（备案完成版）
