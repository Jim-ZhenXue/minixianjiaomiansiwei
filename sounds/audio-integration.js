/**
 * 音效集成 - 将音效与游戏功能关联起来
 */
document.addEventListener('DOMContentLoaded', () => {
    // 确保音效管理器已经初始化
    if (!window.soundManager) return;
    
    // 1. 集成三角形点击音效
    function addTriangleClickSounds() {
        const grids = document.querySelectorAll('#leftGrid, #rightGrid');
        let lastTriangle = null;

        function handleInteraction(e) {
            const target = e.target;
            // 检查是否点击了三角形
            if (target.matches('.triangle-top, .triangle-right, .triangle-bottom, .triangle-left')) {
                // 确保不是同一个三角形的重复触发
                if (target !== lastTriangle) {
                    soundManager.play('click');
                    lastTriangle = target;
                    // 200ms后重置，允许再次点击同一个三角形
                    setTimeout(() => {
                        if (lastTriangle === target) {
                            lastTriangle = null;
                        }
                    }, 200);
                }
            }
        }

        grids.forEach(grid => {
            grid.addEventListener('mousedown', handleInteraction);
            grid.addEventListener('touchstart', handleInteraction);
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
