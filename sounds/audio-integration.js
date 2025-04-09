/**
 * 音效集成 - 将音效与游戏功能关联起来
 */
document.addEventListener('DOMContentLoaded', () => {
    // 确保音效管理器已经初始化
    if (!window.soundManager) return;
    
    // 1. 集成三角形点击音效
    function addTriangleClickSounds() {
        const grids = document.querySelectorAll('#leftGrid, #rightGrid');
        let lastPlayTime = 0;
        const DEBOUNCE_TIME = 300; // 防抖时间，单位毫秒

        function handleTriangleInteraction(e) {
            e.preventDefault(); // 阻止默认行为
            const now = Date.now();
            if (now - lastPlayTime < DEBOUNCE_TIME) return;

            const triangle = e.target.closest('.triangle-top, .triangle-right, .triangle-bottom, .triangle-left');
            if (triangle) {
                soundManager.play('click');
                lastPlayTime = now;
            }
        }

        grids.forEach(grid => {
            // 处理触摸事件
            grid.addEventListener('touchstart', handleTriangleInteraction, { passive: false });
            // 处理鼠标事件
            grid.addEventListener('mousedown', handleTriangleInteraction);
        });
    }
    
    // 2. 集成擦除按钮音效
    function addEraserSounds() {
        const erasers = document.querySelectorAll('.block-base');
        erasers.forEach(eraser => {
            eraser.addEventListener('click', () => {
                soundManager.play('erase');
            });
        });
    }
    
    // 3. 集成任务切换音效
    function addQuestSwitchSounds() {
        const questItems = document.querySelectorAll('.quest-item');
        questItems.forEach(item => {
            item.addEventListener('click', () => {
                soundManager.play('switch');
            });
        });
    }
    
    // 执行音效集成
    setTimeout(() => {
        addTriangleClickSounds();
        addEraserSounds();
        addQuestSwitchSounds();
        
        console.log('音效系统已集成到游戏中');
    }, 500); // 短暂延迟确保其他DOM元素已完全初始化
});
