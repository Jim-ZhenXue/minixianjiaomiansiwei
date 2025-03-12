/**
 * 音效管理器 - 为项目管理所有音效
 */
class SoundManager {
    constructor() {
        this.sounds = {};
        this.muted = false;
        this.initialized = false;
    }

    /**
     * 初始化音效管理器
     */
    init() {
        if (this.initialized) return;

        // 预加载所有音效
        this.load('click', 'sounds/click.mp3');
        this.load('erase', 'sounds/erase.mp3');
        this.load('switch', 'sounds/switch.mp3');
        this.load('complete', 'sounds/complete.mp3');

        // 添加静音控制按钮
        this.createMuteButton();
        
        this.initialized = true;
    }

    /**
     * 加载音效
     * @param {string} name - 音效名称
     * @param {string} path - 音效文件路径
     */
    load(name, path) {
        const audio = new Audio(path);
        audio.preload = 'auto';
        this.sounds[name] = audio;
    }

    /**
     * 播放指定音效
     * @param {string} name - 音效名称
     */
    play(name) {
        if (this.muted || !this.sounds[name]) return;
        
        // 复制一个新的音频实例以允许重叠播放
        const sound = this.sounds[name].cloneNode();
        sound.volume = 0.5; // 设置音量
        sound.play()
            .catch(err => console.log('音效播放失败:', err));
    }

    /**
     * 切换静音状态
     */
    toggleMute() {
        this.muted = !this.muted;
        this.updateMuteButton();
    }

    /**
     * 创建静音控制按钮
     */
    createMuteButton() {
        const muteButton = document.createElement('div');
        muteButton.className = 'sound-button';
        muteButton.innerHTML = '<i class="fas fa-volume-up"></i>';
        muteButton.style.position = 'absolute';
        muteButton.style.top = '10px';
        muteButton.style.right = '10px';
        muteButton.style.zIndex = '1000';
        muteButton.style.cursor = 'pointer';
        muteButton.style.color = 'white';
        muteButton.style.fontSize = '20px';
        muteButton.style.padding = '8px';
        muteButton.style.borderRadius = '50%';
        muteButton.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
        muteButton.style.width = '40px';
        muteButton.style.height = '40px';
        muteButton.style.display = 'flex';
        muteButton.style.alignItems = 'center';
        muteButton.style.justifyContent = 'center';
        
        muteButton.addEventListener('click', () => {
            this.toggleMute();
        });
        
        document.querySelector('.game-container').appendChild(muteButton);
        this.muteButton = muteButton;
    }

    /**
     * 更新静音按钮图标
     */
    updateMuteButton() {
        if (this.muteButton) {
            this.muteButton.innerHTML = this.muted 
                ? '<i class="fas fa-volume-mute"></i>' 
                : '<i class="fas fa-volume-up"></i>';
        }
    }
}

// 创建全局音效管理器实例
const soundManager = new SoundManager();

// 当文档加载完成时初始化音效
document.addEventListener('DOMContentLoaded', () => {
    soundManager.init();
});
