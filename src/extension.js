"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = __importStar(require("vscode"));
let statusBarItem;
let progressInterval;
let currentProgress = 0;
let currentSection = 0;
let sections = [];
let totalCells = 0;
let showCountdown = true;
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "progressTime" is now active!');
    // 创建状态栏项
    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.show();
    // 读取配置
    const config = vscode.workspace.getConfiguration('progressTime');
    sections = config.get('sections', [4, 7, 8]);
    showCountdown = config.get('showCountdown', true);
    totalCells = sections.reduce((a, b) => a + b, 0);
    // 注册命令
    const startCommand = vscode.commands.registerCommand('progressTime.start', () => {
        startProgress();
    });
    const stopCommand = vscode.commands.registerCommand('progressTime.stop', () => {
        stopProgress();
    });
    context.subscriptions.push(startCommand, stopCommand, statusBarItem);
    // 监听配置变化
    context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(e => {
        if (e.affectsConfiguration('progressTime')) {
            const newConfig = vscode.workspace.getConfiguration('progressTime');
            sections = newConfig.get('sections', [4, 7, 8]);
            showCountdown = newConfig.get('showCountdown', true);
            totalCells = sections.reduce((a, b) => a + b, 0);
            stopProgress();
            startProgress();
        }
    }));
}
function startProgress() {
    currentProgress = 0;
    currentSection = 0;
    updateProgressBar();
    progressInterval = setInterval(() => {
        currentProgress++;
        if (currentProgress >= totalCells) {
            currentProgress = 0;
            currentSection = 0;
        }
        else {
            let sum = 0;
            for (let i = 0; i < sections.length; i++) {
                sum += sections[i];
                if (currentProgress < sum) {
                    currentSection = i;
                    break;
                }
            }
        }
        updateProgressBar();
    }, 1000);
}
function stopProgress() {
    if (progressInterval) {
        clearInterval(progressInterval);
    }
    statusBarItem.text = '$(clock) 呼吸练习';
}
function updateProgressBar() {
    const colors = ['$(circle-filled) $(circle-outline) $(circle-outline)',
        '$(circle-outline) $(circle-filled) $(circle-outline)',
        '$(circle-outline) $(circle-outline) $(circle-filled)'];
    let countdownText = '';
    if (showCountdown) {
        let remainingSeconds = 0;
        let sum = 0;
        for (let i = 0; i < sections.length; i++) {
            sum += sections[i];
            if (currentProgress < sum) {
                remainingSeconds = sections[i] - (currentProgress - (sum - sections[i]));
                break;
            }
        }
        countdownText = ` ${remainingSeconds}`;
    }
    statusBarItem.text = `${colors[currentSection]}${countdownText}`;
}
// This method is called when your extension is deactivated
function deactivate() {
    stopProgress();
    statusBarItem.dispose();
}
//# sourceMappingURL=extension.js.map