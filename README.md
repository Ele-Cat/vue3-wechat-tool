<h1 align="center">在线微信对话生成器 👋</h1>

> 使用 Vite + Vue3 + AntDesignVue + Pinia 搭建的在线微信对话生成器

<div align="center">
  <h4>本程序是一款微信聊天记录制作工具，可以模拟微信聊天、管理不同用户角色进行对话，同时支持发送文字、图片、语音、红包、转账等类型信息。可以将聊天内容一键生成为图片、长图、动图和视频。【<a href='https://ele-cat.gitee.io/vue3-wechat-tool/' target="_blank">在线预览地址</a>】</h4>
  <h4>全量开源，更多好玩的功能欢迎提出Issues，敬请期待！</h4>
</div>

<div align="center">
  <a href='https://gitee.com/ele-cat/vue3-wechat-tool/stargazers' target="_blank"><img src='https://gitee.com/ele-cat/vue3-wechat-tool/badge/star.svg?theme=dark' alt='star'></img></a>
  <a href='https://gitee.com/ele-cat/vue3-wechat-tool/members' target="_blank"><img src='https://gitee.com/ele-cat/vue3-wechat-tool/badge/fork.svg?theme=dark' alt='fork'></img></a>
</div>

<!-- <img alt="欢迎⭐️" src="https://img.shields.io/badge/欢迎-⭐️-blue.svg?cacheSeconds=2592000" /> -->
### 👉<a href='https://ele-cat.gitee.io/tools/Vue3WechatTool.html#使用教程' target="_blank">使用教程</a>
### 👉<a href='https://ele-cat.gitee.io/tools/Vue3WechatTool.html#开发教程' target="_blank">开发教程</a>
### ✨<a href='https://ele-cat.gitee.io/vue3-wechat-tool/' target="_blank">在线预览</a>

## 使用

- #### 安装

  ```
  npm install
  ```

- #### 运行

  ```
  npm run serve
  ```

- #### 打包

  打包前请注意将`.env.production`的`VITE_BASE_PATH`修改为`/`

  ```
  npm run build
  ```

## 功能
> √为已实现的，规划中的功能有序安排中

- [x] 界面结构
- [x] 外观设置
  - [x] 基础外观设置
  - [x] 上传图片裁剪
  - [x] 深色模式
  - [ ] 机型切换
- [x] 对话设置
  - [x] 用户管理
  - [x] 消息发送
    - [x] 发送文本、表情
    - [x] 发送图片
    - [x] 发送转账
    - [x] 发送红包
    - [x] 发送语音条
    - [x] 语音条转文字
    - [x] 时间
    - [ ] 发送视频、音频聊天
    - [ ] 拍一拍
    - [ ] 撤回消息
    - [ ] **消息被拒绝【被删除、拉黑】**
    - [x] 手机聊天输入框同步展示文本
  - [x] 对话内容操作【右键菜单】
    - [x] 对话上移、下移
    - [x] 对话移除
    - [x] 对话领取红包、转账
    - [ ] **对话修改**
    - [ ] 对话播放延时【生成动图、视频时，自定义距上条对话内容播放的延时时间】
  - [x] 小工具
    - [x] 重置外观
    - [x] 清空对话
    - [ ] 一键生成对话【即下方模板管理】
  - [x] 生成操作
    - [x] 存为模板
    - [x] 生成图片
    - [x] 生成长图
    - [ ] ~~生成动图~~【感觉意义不大，大家觉得呢】
    - [ ] 生成视频
  - [ ] 消息音效【生成视频中，发送消息的声音】
  - [ ] 背景音乐【生成视频中，自动播放选定音乐】
  - [ ] 聊天内容导入导出【即下方模板管理】
  - [ ] **群聊**
- [x] 模板管理
  - [x] 对话内容保存为模板
  - [x] 应用模板
  - [x] 预览模板
  - [x] 删除模板
  - [ ] 在线编辑模板
  - [ ] 导入、导出模板
- [x] 使用说明

## 作者

👤 **ele-cat**

- 博客: <a href='https://ele-cat.gitee.io/' target="_blank">https://ele-cat.gitee.io/</a>
- Github: <a href='https://github.com/ele-cat' target="_blank">@ele-cat</a>

## 支持

如果这个项目对你有帮助请给一个 ⭐️ 予以鼓励！

## 许可证

Copyright © 2023 <a href='https://gitee.com/ele-cat' target="_blank">ele-cat</a>.<br />

本程序为 📝<a href='https://gitee.com/ele-cat/vue3-wechat-tool/blob/master/LICENSE' target="_blank">MIT License</a> 许可证.

## 参考文档、博客

- <a href='https://codeleading.com/article/74243318780/' target="_blank">js 实现图片转 base64 格式,并压缩上传</a>
- <a href='https://blog.csdn.net/weixin_43695894/article/details/125205715' target="_blank">vue 中利用 gif.js 实现 GIF 动图下载</a>
