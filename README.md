<h1 align="center">在线微信对话生成器 👋</h1>

> 使用 Vite + Vue3 + AntDesignVue + Pinia 搭建的在线微信对话生成器

<div align="center">
  <h4>本程序是一款微信聊天记录制作工具，可以模拟微信聊天、管理不同用户角色进行对话，同时支持发送文字、图片、语音、红包、转账等类型信息。可以将聊天内容一键生成为图片、长图、动图和视频。【<a href='https://ele-cat.github.io/vue3-wechat-tool/' target="_blank">在线使用地址</a>】</h4>
  <h4>全量开源，更多好玩的功能欢迎提出Issues，敬请期待！</h4>
</div>

<div align="center">
  <a href='https://github.com/ele-cat/vue3-wechat-tool/stargazers' target="_blank"><img src='https://img.shields.io/github/stars/ele-cat/vue3-wechat-tool.svg' alt='star'></img></a>
  <a href='https://github.com/Ele-Cat/vue3-wechat-tool/graphs/contributors' target="_blank"><img src='https://img.shields.io/github/forks/ele-cat/vue3-wechat-tool.svg' alt='fork'></img></a>
</div>

### 👉<a href='https://www.bilibili.com/video/BV1Q84y1S7iA/?share_source=copy_web&vd_source=a365c12124cceb4ffcbdc878f6f2ef60' target="_blank">使用教程【视频】</a>

### 👉<a href='https://ele-cat.github.io/tools/Vue3WechatTool.html#使用教程' target="_blank">使用教程【文本】</a>

### 👉<a href='https://ele-cat.github.io/tools/Vue3WechatTool.html#开发教程' target="_blank">开发教程</a>

### ✨<a href='https://ele-cat.github.io/vue3-wechat-tool/' target="_blank">在线使用</a>

## 截图预览

<img src='https://tucdn.wpon.cn/2024/06/03/eb8bee78809f7.jpg' alt='' height='288px' />
<img src='https://tucdn.wpon.cn/2024/06/03/30aa4a1fd5194.jpg' alt='' height='288px' />

![外观设置效果预览](./snapshot/1695047989076.gif)
![发送对话](./snapshot/1695050793373.gif)
![右键菜单](./snapshot/1695052489383.gif)


## 功能清单

<details>
<summary>点击展开</summary>

- 界面结构
- 外观设置
  - 基础外观设置
  - 上传图片裁剪
  - 深色模式
  - 机型切换
- 对话设置
  - 用户管理
  - 消息发送
    - 发送文本、表情
    - 发送图片
    - 发送转账
    - 发送红包
    - 发送语音条
    - 语音条转文字
    - 时间
    - 发送视频、音频聊天
    - 发送名片
    - 拍一拍
    - 撤回消息
    - 消息被拒收
    - 手机聊天输入框同步展示文本
  - 对话内容操作【右键菜单】
    - 对话上移、下移
    - 对话移除
    - 对话领取红包、转账
    - 对话修改
    - 对话播放延时【生成动图、视频时，自定义距上条对话内容播放的延时时间】
  - 小工具
    - 重置外观
    - 清空对话
  - 生成操作
    - 存为模板
    - 生成图片
    - 生成长图
    - 生成动图、视频配置
    - 生成动图
    - 生成视频【实际为生成图片序列自行剪辑】
    - 聊天内容导入导出
  - **群聊**
- 模板管理
  - 对话内容保存为模板
  - 应用模板
  - 预览模板
  - 删除模板
- 使用说明
</details>

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

## [更新日志](./ChangeLog.md)

## 支持

如果这个项目对你有帮助请给一个 ⭐️ 予以鼓励！

## 捐赠

<img src='https://tucdn.wpon.cn/2024/06/03/4a0dd61877713.jpg' alt='' height='288px' />
<img src='https://tucdn.wpon.cn/2024/06/03/fb3bfa1fa3075.jpg' alt='' height='288px' />



您的赞赏与支持，是我最大的动力

## Star History
<a href="https://www.star-history.com/#Ele-Cat/vue3-wechat-tool&Date">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=Ele-Cat/vue3-wechat-tool&type=Date&theme=dark" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=Ele-Cat/vue3-wechat-tool&type=Date" />
   <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=Ele-Cat/vue3-wechat-tool&type=Date" />
 </picture>
</a>
