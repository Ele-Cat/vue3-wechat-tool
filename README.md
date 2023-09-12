<h1 align="center">微信对话生成器 👋</h1>

> 使用 Vite + Vue3 + AntDesignVue + Pinia 搭建的在线微信对话生成器

<div align="center">
  <h4>微信对话生成器，是一款聊天记录制作工具，可以模拟微信聊天，可以管理不同用户角色进行对话，支持发送文字、图片、语音、红包、转账等。可以将聊天内容一键生成为图片、长图、动图和视频。</h4>
  <h4>更多好玩的功能欢迎提出Issues</h4>
</div>

<div align="center">
  <a href='https://gitee.com/ele-cat/vue3-wechat-tool/stargazers' target="_blank"><img src='https://gitee.com/ele-cat/vue3-wechat-tool/badge/star.svg?theme=dark' alt='star'></img></a>
  <a href='https://gitee.com/ele-cat/vue3-wechat-tool/members' target="_blank"><img src='https://gitee.com/ele-cat/vue3-wechat-tool/badge/fork.svg?theme=dark' alt='fork'></img></a>
</div>

<img alt="Version" src="https://img.shields.io/badge/version-0.0.1-blue.svg?cacheSeconds=2592000" />
<a href="https://gitee.com/ele-cat/vue3-wechat-tool/blob/master/LICENSE" target="_blank">
  <img alt="License: MIT License" src="https://img.shields.io/badge/License-MIT License-yellow.svg" />
</a>

### ✨<a href='https://ele-cat.gitee.io/vue3-wechat-tool/' target="_blank">使用教程</a>

### ✨<a href='https://ele-cat.gitee.io/vue3-wechat-tool/' target="_blank">在线预览</a>

## 功能

- [x] 界面结构
- [x] 外观设置
  - [x] 基础外观设置
  - [ ] 机型切换
  - [ ] 深色模式
- [x] 对话设置
  - [x] 用户管理
  - [ ] 消息发送
    - [x] 发送文本、表情
    - [x] 发送图片
    - [x] 发送转账
    - [x] 发送红包
    - [x] 发送语音条
    - [ ] 发送视频、音频聊天
    - [ ] 拍一拍
    - [x] 时间
    - [ ] 撤回消息
    - [ ] 消息被拒绝【被删除、拉黑】
    - [ ] 语音播放
    - [ ] 聊天输入框可输入文字
  - [ ] 修改对话内容
  - [ ] 一键生成对话
  - [x] 生成图片
  - [ ] 生成动图
  - [ ] 生成视频
  - [ ] 消息音效
  - [ ] 聊天内容导入导出
- [x] 使用说明

## 使用

- #### 安装

  ```
  npm install
  ```

- #### 运行

  ```
  yarn serve
  ```

- #### 打包

  打包前请注意将`.env.production`的`VITE_BASE_PATH`修改为`/`

  ```
  yarn build
  ```

## Author

👤 **ele-cat**

- 博客: https://ele-cat.gitee.io/
- Github: [@ele-cat](https://github.com/ele-cat)

## 支持

如果这个项目对你有帮助请给一个 ⭐️ 予以鼓励！

## 许可证

Copyright © 2023 [ele-cat](https://gitee.com/ele-cat).<br />
本程序为 📝[MIT License](https://gitee.com/ele-cat/vue3-wechat-tool/blob/master/LICENSE) 许可证.

## 参考文档、博客

- [js 实现图片转 base64 格式,并压缩上传](https://codeleading.com/article/74243318780/)
- [vue 中利用 gif.js 实现 GIF 动图下载](https://blog.csdn.net/weixin_43695894/article/details/125205715)
