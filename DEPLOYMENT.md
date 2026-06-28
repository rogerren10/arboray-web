# V3.2 部署指南（腾讯云轻量服务器）

## 概述

- **分支**: `v3.2`
- **域名**: `www.tongguangai.cn`
- **部署目录**: `/opt/arboray-web/`
- **服务端口**: 3000
- **容器名**: `arboray-web-v3`

## 本地操作步骤

### 1. 安装 Git（如未安装）

从 https://git-scm.com/download/win 下载并安装 Git。

### 2. 初始化 Git 仓库并提交代码

打开 Git Bash，进入项目目录：

```bash
cd "e:/Projects/ArborayWeb/ArborayWeb_V 3.0/ArborayWeb_V3.1/v3.2"

# 初始化 Git 仓库
git init

# 添加所有文件
git add .

# 提交代码
git commit -m "feat: v3.2 中文站初始版本"

# 创建 v3.2 分支
git branch -M v3.2
```

### 3. 关联 GitHub 仓库并推送

```bash
# 关联远程仓库
git remote add origin https://github.com/rogerren10/arboray-web.git

# 推送 v3.2 分支
git push -u origin v3.2
```

> 如果提示输入用户名和密码，使用 GitHub 账号和 Personal Access Token（不是密码）。
> 创建 Token: https://github.com/settings/tokens → Generate new token → 勾选 repo 权限

## 配置 GitHub Actions 自动部署

### 1. 添加 Secrets

在 GitHub 仓库页面 → Settings → Secrets and variables → Actions → New repository secret

添加以下 3 个密钥：

| Secret 名称 | 值 |
|-------------|-----|
| `TENCENT_HOST` | `49.233.160.126` |
| `TENCENT_USER` | `ubuntu` |
| `TENCENT_SSH_KEY` | SSH 私钥完整内容 |

### 2. SSH 私钥获取

在本地 Git Bash 中执行：

```bash
cat ~/.ssh/id_rsa
```

将输出的完整内容（包括 `-----BEGIN RSA PRIVATE KEY-----` 和 `-----END RSA PRIVATE KEY-----`）复制到 `TENCENT_SSH_KEY`。

> 如果没有密钥，需要先生成并将公钥添加到服务器的 `~/.ssh/authorized_keys`

## 服务器首次部署

### 1. SSH 登录服务器

```bash
ssh ubuntu@49.233.160.126
```

### 2. 进入部署目录

```bash
cd /opt/arboray-web
```

### 3. 切换到 v3.2 分支

```bash
git fetch origin
git checkout v3.2
git pull origin v3.2
```

### 4. 启动服务

```bash
docker compose up --build -d
```

### 5. 验证服务

```bash
curl http://localhost:3000
```

## 配置 Nginx 反向代理

服务器上的主 Nginx 需要添加 `www.tongguangai.cn` 的配置，将请求转发到 `127.0.0.1:3000`。

在服务器上编辑 Nginx 配置（示例路径，根据实际情况调整）：

```bash
sudo vim /etc/nginx/conf.d/www.tongguangai.cn.conf
```

添加以下配置：

```nginx
server {
    listen 80;
    server_name www.tongguangai.cn tongguangai.cn;

    # Gzip 压缩
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 86400;
    }
}
```

检查配置并重载 Nginx：

```bash
sudo nginx -t
sudo nginx -s reload
```

## 配置 HTTPS（可选）

使用 certbot 申请免费证书：

```bash
sudo certbot --nginx -d www.tongguangai.cn -d tongguangai.cn
```

## 邮件服务配置（可选）

如需启用青年科学家表单的真实邮件发送，在服务器上创建 `.env.local`：

```bash
cd /opt/arboray-web
vim .env.local
```

添加以下内容：

```
SMTP_HOST=smtp.qq.com
SMTP_PORT=465
SMTP_USER=your-email@qq.com
SMTP_PASS=your-authorization-code
CONTACT_EMAIL=contact@tongguangai.cn
```

重启服务：

```bash
docker compose restart web
```

## 日常更新

代码推送到 `v3.2` 分支后，GitHub Actions 会自动部署到服务器。

手动更新命令：

```bash
cd /opt/arboray-web
git pull origin v3.2
docker compose up --build -d
```

## 常用命令

```bash
# 查看容器状态
docker compose ps

# 查看日志
docker compose logs -f web

# 重启服务
docker compose restart web

# 停止服务
docker compose down

# 重新构建并启动
docker compose up --build -d
```
