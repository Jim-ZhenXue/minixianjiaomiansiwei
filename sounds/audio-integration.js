/**
 * 音效集成 - 将音效与游戏功能关联起来
 */
document.addEventListener('DOMContentLoaded', () => {
    // 确保音效管理器已经初始化
    if (!window.soundManager) return;
    
    // 1. 集成三角形点击音效
    function addTriangleClickSounds() {
        const triangles = document.querySelectorAll('.triangle-top, .triangle-right, .triangle-bottom, .triangle-left');
        triangles.forEach(triangle => {
            const originalClick = triangle.onclick;
            triangle.addEventListener('click', (e) => {
                soundManager.play('click');
                // 原始的点击处理程序仍然会被执行
            });
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
