/**
 * 音频调试工具 - 不显示任何界面元素
 * 纯功能版本，在控制台中输出调试信息
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('音频调试工具已初始化');
    
    // 测试各种音频播放方法
    function testAudioPlayback() {
        try {
            // 方法1: 直接创建Audio对象
            console.log('测试方法1: 直接创建Audio对象');
            const testAudio = new Audio('sounds/click.mp3');
            testAudio.volume = 1.0;
            testAudio.play().catch(err => console.error('方法1音频播放失败:', err));
            
            // 方法2: Web Audio API
            console.log('测试方法2: Web Audio API');
            try {
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                
                fetch('sounds/click.mp3')
                    .then(response => response.arrayBuffer())
                    .then(arrayBuffer => {
                        audioContext.decodeAudioData(arrayBuffer, (buffer) => {
                            const source = audioContext.createBufferSource();
                            source.buffer = buffer;
                            source.connect(audioContext.destination);
                            source.start(0);
                            console.log('方法2音频播放成功');
                        }, (err) => {
                            console.error('方法2解码音频失败:', err);
                        });
                    })
                    .catch(err => console.error('方法2获取音频失败:', err));
            } catch (e) {
                console.error('方法2初始化失败:', e);
            }
            
            // 方法3: 如果存在声音管理器，使用它
            console.log('测试方法3: SoundManager');
            if (window.soundManager) {
                window.soundManager.play('click');
                console.log('方法3尝试播放click.mp3');
            } else {
                console.log('方法3失败: 找不到SoundManager');
            }
        } catch (e) {
            console.error('测试音频播放时出错:', e);
        }
    }
    
    // 延迟执行测试
    setTimeout(() => {
        console.log('开始测试音频播放...');
        testAudioPlayback();
    }, 2000);
    
    // 监听点击事件以启用音频
    function enableAudio() {
        // A one-time event listener to ensure user interaction activates audio
        document.removeEventListener('click', enableAudio);
        console.log('用户交互已发生，尝试启用音频...');
        testAudioPlayback();
    }
    
    // Add click event listener to enable audio
    document.addEventListener('click', enableAudio);
    
    // 诊断信息
    console.log('音频文件位置检查:');
    console.log('- click.mp3路径: sounds/click.mp3');
    console.log('- 浏览器音频支持: ' + (window.Audio ? '支持' : '不支持') + ' Audio API');
    console.log('- 浏览器Web Audio支持: ' + (window.AudioContext || window.webkitAudioContext ? '支持' : '不支持') + ' Web Audio API');
});
