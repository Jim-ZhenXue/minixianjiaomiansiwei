/**
 * 直接内联音频元素 - 解决某些情况下无法加载声音的问题
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('添加内联音频元素...');
    
    // 创建内联音频元素
    const createInlineAudio = (id, src) => {
        const audio = document.createElement('audio');
        audio.id = id;
        audio.src = src;
        audio.preload = 'auto';
        audio.style.display = 'none';
        return audio;
    };
    
    // 添加音频元素到页面
    const audioContainer = document.createElement('div');
    audioContainer.id = 'audio-container';
    audioContainer.style.display = 'none';
    
    // 添加所有音效
    const clickAudio = createInlineAudio('click-sound', 'sounds/click.mp3');
    const eraseAudio = createInlineAudio('erase-sound', 'sounds/erase.mp3');
    const switchAudio = createInlineAudio('switch-sound', 'sounds/switch.mp3');
    const completeAudio = createInlineAudio('complete-sound', 'sounds/complete.mp3');
    
    audioContainer.appendChild(clickAudio);
    audioContainer.appendChild(eraseAudio);
    audioContainer.appendChild(switchAudio);
    audioContainer.appendChild(completeAudio);
    
    document.body.appendChild(audioContainer);
    
    // 创建播放函数
    window.playSound = (name) => {
        try {
            const audio = document.getElementById(`${name}-sound`);
            if (!audio) {
                console.error(`找不到音频元素: ${name}-sound`);
                return;
            }
            
            // 重置音频并播放
            audio.currentTime = 0;
            audio.volume = 1.0;
            
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    console.log(`内联音频 ${name} 播放成功`);
                }).catch(err => {
                    console.error(`内联音频 ${name} 播放失败:`, err);
                });
            }
        } catch (e) {
            console.error(`播放音频 ${name} 时出错:`, e);
        }
    };
    
    // 添加测试按钮
    const testButton = document.createElement('button');
    testButton.textContent = '测试内联音频';
    testButton.style.position = 'fixed';
    testButton.style.bottom = '70px';
    testButton.style.left = '20px';
    testButton.style.zIndex = '9999';
    testButton.style.padding = '10px 20px';
    testButton.style.backgroundColor = '#9C27B0';
    testButton.style.color = 'white';
    testButton.style.border = 'none';
    testButton.style.borderRadius = '5px';
    testButton.style.cursor = 'pointer';
    
    testButton.addEventListener('click', () => {
        console.log('测试内联音频');
        window.playSound('click');
    });
    
    document.body.appendChild(testButton);
    
    // 拦截现有的声音管理器
    if (window.soundManager) {
        const originalPlay = soundManager.play;
        soundManager.play = function(name) {
            // 尝试使用原始方法
            originalPlay.call(this, name);
            
            // 同时尝试使用内联音频
            window.playSound(name);
        };
    }
    
    // 挂接到dom事件
    const triangles = document.querySelectorAll('.triangle-top, .triangle-right, .triangle-bottom, .triangle-left');
    triangles.forEach(triangle => {
        const originalClickHandler = triangle.onclick;
        triangle.addEventListener('click', () => {
            window.playSound('click');
            if (originalClickHandler) originalClickHandler();
        });
    });
    
    const erasers = document.querySelectorAll('.block-base');
    erasers.forEach(eraser => {
        const originalClickHandler = eraser.onclick;
        eraser.addEventListener('click', () => {
            window.playSound('erase');
            if (originalClickHandler) originalClickHandler();
        });
    });
    
    const questItems = document.querySelectorAll('.quest-item');
    questItems.forEach(item => {
        const originalClickHandler = item.onclick;
        item.addEventListener('click', () => {
            window.playSound('switch');
            if (originalClickHandler) originalClickHandler();
        });
    });
});
