#!/usr/bin/env python3
"""
🎤 语音交互服务器
监听麦克风，语音识别后发送给 OpenClaw 处理
"""

import speech_recognition as sr
import pyttsx3
import threading
import json
import subprocess
from datetime import datetime

# 配置
TARGET_PHONE = "+8613416666518"
LOG_FILE = "/Users/xigua/.openclaw/logs/voice.log"

def log(message):
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    with open(LOG_FILE, 'a') as f:
        f.write(f"[{timestamp}] {message}\n")

def send_to_openclaw(text):
    """发送文本到 OpenClaw"""
    try:
        result = subprocess.run([
            'openclaw', 'message', 'send',
            '--target', TARGET_PHONE,
            '--message', f"🎤 语音指令: {text}"
        ], capture_output=True, text=True)
        if result.returncode == 0:
            log(f"已发送: {text}")
            return True
    except Exception as e:
        log(f"发送失败: {e}")
    return False

def speak(text):
    """语音合成"""
    try:
        engine = pyttsx3.init()
        engine.say(text)
        engine.runAndWait()
    except Exception as e:
        log(f"语音合成失败: {e}")

def listen():
    """监听麦克风"""
    recognizer = sr.Recognizer()
    microphone = sr.Microphone()
    
    with microphone as source:
        log("正在调整环境噪音...")
        recognizer.adjust_for_ambient_noise(source, duration=1)
    
    log("开始监听... (按 Ctrl+C 停止)")
    
    try:
        while True:
            print("\n🎤 请说话...")
            with microphone as source:
                audio = recognizer.listen(source, timeout=5, phrase_time_limit=10)
            
            print("🔄 识别中...")
            try:
                text = recognizer.recognize_google(audio, language='zh-CN')
                print(f"✅ 识别结果: {text}")
                log(f"识别: {text}")
                
                # 发送到 OpenClaw
                send_to_openclaw(text)
                
            except sr.UnknownValueError:
                print("❌ 无法识别，请重试")
            except sr.RequestError as e:
                print(f"❌ 请求错误: {e}")
                log(f"请求错误: {e}")
                
    except KeyboardInterrupt:
        print("\n👋 监听已停止")
        log("用户中断")

if __name__ == "__main__":
    log("========== 语音交互系统启动 ==========")
    
    try:
        listen()
    except KeyboardInterrupt:
        print("\n👋 已退出")
