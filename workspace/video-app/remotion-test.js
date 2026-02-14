// Remotion 测试项目
// 在 React 中创建视频

import { useState, useEffect } from 'react';

// Remotion 基础用法
const BasicComposition = () => {
  // 定义视频合成
  const composition = {
    width: 1920,
    height: 1080,
    fps: 30,
    duration: 5 // 5秒
  };

  return {
    // 视频组件
    video: (
      <div style={{ 
        width: '100%', 
        height: '100%',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <h1 style={{ color: 'white', fontSize: 64 }}>
          你好，龙王！✨
        </h1>
      </div>
    )
  };
};

// 动画示例
const AnimatedText = () => {
  // 文字动画
  const text = {
    keyframes: {
      0: { opacity: 0, y: 50, scale: 0.8 },
      0.5: { opacity: 1, y: 0, scale: 1 },
      1: { opacity: 0, y: -50, scale: 1.1 }
    },
    duration: 2,
    easing: 'ease-out'
  };

  return {
    // 动画配置
    animation: text
  };
};

// 使用图表
const ChartExample = () => {
  // 数据可视化
  const data = [
    { label: 'A', value: 30 },
    { label: 'B', value: 50 },
    { label: 'C', value: 80 },
    { label: 'D', value: 45 }
  ];

  return {
    // 图表渲染
    render: (
      <div className="chart-container">
        {data.map(item => (
          <div 
            key={item.label}
            style={{
              height: `${item.value}%`,
              width: '50px',
              background: '#1d9bf0',
              margin: '0 10px'
            }}
          />
        ))}
      </div>
    )
  };
};

// 音频处理
const AudioTrack = () => {
  // 音频配置
  const audio = {
    src: '/audio/bgm.mp3',
    volume: 0.8,
    loop: true,
    startAt: 0,
    endAt: null
  };

  return {
    audio
  };
};

console.log('Remotion 视频创建测试完成！');
