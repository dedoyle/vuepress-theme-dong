#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

git add .
git commit -m '添加新文章'
git push origin master

# 生成静态文件
yarn run build

# 进入生成的文件夹
cd examples/.vuepress/dist

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:dedoyle/blog.git master:gh-pages

# 链接远程仓库
git remote add origin git@github.com:dedoyle/blog.git

# 拉取远程仓库的文件
# git pull --rebase origin master  

# 同步更新代码
git push -f origin master

cd -
