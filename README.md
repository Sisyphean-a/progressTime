# 呼吸练习助手 (Progress Time)

一个帮助您进行呼吸练习的 VS Code 扩展。在状态栏显示动态进度条，特别适合进行 4-7-8 呼吸法等呼吸练习。

## 功能特点

- 在 VS Code 状态栏显示动态进度条
- 支持自定义多个呼吸阶段的时长
- 使用不同颜色指示器显示当前呼吸阶段
- 可选择显示当前阶段的倒计时秒数
- 练习完成后自动循环开始

## 使用方法

1. 按下 `Ctrl+Shift+P` 打开命令面板
2. 输入并选择 "开始呼吸练习" 来启动
3. 根据状态栏的提示进行呼吸练习
4. 需要停止时，打开命令面板并选择 "停止呼吸练习"

## 状态栏显示说明

- 🔵⚪⚪：第一阶段（例如：吸气）
- ⚪🔵⚪：第二阶段（例如：屏气）
- ⚪⚪🔵：第三阶段（例如：呼气）
- 数字显示：当前阶段剩余秒数

## 扩展设置

此扩展提供以下设置：

* `progressTime.sections`: 设置各个呼吸阶段的时长（秒）
  * 类型：数字数组
  * 默认值：`[4, 7, 8]`
  * 示例：`[4, 7, 8]` 表示三个阶段分别持续 4 秒、7 秒和 8 秒
* `progressTime.showCountdown`: 是否显示倒计时数字
  * 类型：布尔值
  * 默认值：`true`
  * `true`: 显示倒计时数字
  * `false`: 只显示进度指示器

## 配置示例

在 VS Code 设置中添加：

```json
{
    "progressTime.sections": [4, 7, 8],
    "progressTime.showCountdown": true
}
```

这个配置适用于标准的 4-7-8 呼吸法：
1. 吸气 4 秒
2. 屏气 7 秒
3. 呼气 8 秒

## 使用建议

- 建议在安静的环境下进行练习
- 保持正确的坐姿
- 如果感到不适，请立即停止练习
- 可以根据个人情况调整各阶段时长

## 版本记录

### 0.0.1 (2024-04-17)
- 初始版本
- 支持自定义呼吸阶段时长
- 支持显示/隐藏倒计时
- 状态栏动态指示器