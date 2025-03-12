/**
 * 音频调试与修复工具
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('开始音频调试...');
    
    // 测试直接播放一个音效
    function testDirectAudio() {
        console.log('尝试直接播放音效...');
        try {
            // 使用绝对路径尝试
            const testAudio = new Audio('/Users/xz/Desktop/生涯/游戏/minixianjiaomiansiwei/sounds/click.mp3');
            testAudio.volume = 1.0; // 最大音量
            
            // 添加一个加载监听器
            testAudio.addEventListener('canplaythrough', () => {
                console.log('音频已加载完成，准备播放');
                
                // 在用户首次交互时播放音频（解决浏览器策略限制问题）
                const playPromise = testAudio.play();
                
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        console.log('音频播放成功！');
                    }).catch(err => {
                        console.error('音频播放失败:', err);
                    });
                }
            });
            
            testAudio.addEventListener('error', (e) => {
                console.error('音频加载错误:', e);
            });
        } catch (err) {
            console.error('测试音频时出错:', err);
        }
    }

    // 修复音效管理器中可能的问题
    function fixSoundManager() {
        if (!window.soundManager) {
            console.error('找不到音效管理器!');
            return;
        }
        
        console.log('修复音效管理器...');
        
        // 强制重新加载所有音效 - 使用可能更准确的路径
        soundManager.load('click', '/sounds/click.mp3'); 
        soundManager.load('erase', '/sounds/erase.mp3');
        soundManager.load('switch', '/sounds/switch.mp3');
        soundManager.load('complete', '/sounds/complete.mp3');
        
        // 添加一个测试按钮来播放声音 - 改为更明显的按钮
        const testButton = document.createElement('button');
        testButton.textContent = '测试音效';
        testButton.style.position = 'fixed';
        testButton.style.bottom = '20px';
        testButton.style.left = '20px';
        testButton.style.zIndex = '9999';
        testButton.style.padding = '10px 20px';
        testButton.style.fontSize = '16px';
        testButton.style.fontWeight = 'bold';
        testButton.style.backgroundColor = '#ff0000';
        testButton.style.color = 'white';
        testButton.style.border = 'none';
        testButton.style.borderRadius = '5px';
        testButton.style.cursor = 'pointer';
        
        testButton.addEventListener('click', () => {
            console.log('点击测试按钮');
            playTestSound();
        });
        
        document.body.appendChild(testButton);
    }
    
    // 新的直接播放方法
    function playTestSound() {
        // 尝试多种方式播放声音
        // 1. 使用音效管理器
        if (window.soundManager) {
            soundManager.play('click');
        }
        
        // 2. 直接创建和播放
        try {
            const audio = new Audio('sounds/click.mp3');
            audio.volume = 1.0;
            audio.play()
                .then(() => console.log('直接创建Audio对象播放成功'))
                .catch(e => console.error('直接播放失败:', e));
        } catch (e) {
            console.error('创建Audio对象失败:', e);
        }
        
        // 3. 创建一个临时的audio元素
        try {
            const tempAudio = document.createElement('audio');
            tempAudio.src = 'sounds/click.mp3';
            tempAudio.volume = 1.0;
            document.body.appendChild(tempAudio);
            
            tempAudio.oncanplaythrough = () => {
                tempAudio.play()
                    .then(() => console.log('临时audio元素播放成功'))
                    .catch(e => console.error('临时元素播放失败:', e));
            };
            
            tempAudio.onerror = (e) => {
                console.error('临时audio元素加载错误:', e);
            };
        } catch (e) {
            console.error('创建临时audio元素失败:', e);
        }
    }
    
    // 重写音效播放方法，添加更多日志
    if (window.soundManager) {
        const originalPlay = soundManager.play;
        soundManager.play = function(name) {
            console.log(`尝试播放音效: ${name}`);
            if (this.muted) {
                console.log('音效已静音，跳过播放');
                return;
            }
            
            if (!this.sounds[name]) {
                console.error(`找不到音效: ${name}`);
                return;
            }
            
            // 复制一个新的音频实例以允许重叠播放
            const sound = this.sounds[name].cloneNode();
            sound.volume = 1.0; // 增大音量确保可听见
            
            // 在控制台显示更多信息
            console.log(`播放音效: ${name}, 音量: ${sound.volume}, 路径: ${sound.src}`);
            
            const playPromise = sound.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    console.log(`音效 ${name} 播放成功!`);
                }).catch(err => {
                    console.error(`音效 ${name} 播放失败:`, err);
                    
                    // 尝试在用户交互后再次播放
                    document.addEventListener('click', function playOnInteraction() {
                        sound.play().catch(e => console.error('二次尝试失败:', e));
                        document.removeEventListener('click', playOnInteraction);
                    }, { once: true });
                });
            }
        };
    }
    
    // 检查音频上下文API是否可用
    function checkWebAudioAPI() {
        try {
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            console.log('Web Audio API 可用:', audioCtx.state);
            
            if (audioCtx.state === 'suspended') {
                console.log('Audio Context 被暂停，尝试恢复...');
                document.addEventListener('click', function resumeAudio() {
                    audioCtx.resume().then(() => {
                        console.log('Audio Context 已恢复!');
                    });
                    document.removeEventListener('click', resumeAudio);
                }, { once: true });
            }
            
            return audioCtx;
        } catch (e) {
            console.error('Web Audio API 不可用:', e);
            return null;
        }
    }
    
    // 使用Web Audio API直接播放
    function playWithWebAudio(audioCtx) {
        if (!audioCtx) return;
        
        fetch('sounds/click.mp3')
            .then(response => response.arrayBuffer())
            .then(arrayBuffer => audioCtx.decodeAudioData(arrayBuffer))
            .then(audioBuffer => {
                const source = audioCtx.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(audioCtx.destination);
                source.start(0);
                console.log('使用Web Audio API播放成功');
            })
            .catch(e => console.error('使用Web Audio API播放失败:', e));
    }
    
    // 延迟执行，确保其他脚本已加载
    setTimeout(() => {
        // 检查音频API
        const audioCtx = checkWebAudioAPI();
        
        // 修复音效管理器
        fixSoundManager();
        
        // 添加一个额外的按钮尝试Web Audio API
        if (audioCtx) {
            const webAudioButton = document.createElement('button');
            webAudioButton.textContent = '使用Web Audio API测试';
            webAudioButton.style.position = 'fixed';
            webAudioButton.style.bottom = '20px';
            webAudioButton.style.left = '150px';
            webAudioButton.style.zIndex = '9999';
            webAudioButton.style.padding = '10px 20px';
            webAudioButton.style.backgroundColor = '#2196F3';
            webAudioButton.style.color = 'white';
            webAudioButton.style.border = 'none';
            webAudioButton.style.borderRadius = '5px';
            webAudioButton.style.cursor = 'pointer';
            
            webAudioButton.addEventListener('click', () => {
                console.log('点击Web Audio API测试按钮');
                playWithWebAudio(audioCtx);
            });
            
            document.body.appendChild(webAudioButton);
        }
    }, 1000);
});
