document.addEventListener('DOMContentLoaded', () => {
    const GRID_SIZE = 8;
    const LEFT_COLOR = '#4CAF50';  // 绿色
    const RIGHT_COLOR = '#9C27B0'; // 紫色
    let leftGridCells = [];
    let rightGridCells = [];
    let currentLevel = 1;

    // 任务切换功能
    function setupQuestSystem() {
        const questItems = document.querySelectorAll('.quest-item');
        const levelInfo = document.querySelector('.level-info');
        
        questItems.forEach(item => {
            item.addEventListener('click', () => {
                // 更新任务状态
                questItems.forEach(q => q.classList.remove('active'));
                item.classList.add('active');
                
                // 更新等级显示
                currentLevel = parseInt(item.dataset.level);
                document.querySelector('.level').textContent = `Level ${currentLevel}`;
                
                // 更新任务信息
                const taskTitle = item.querySelector('h3').textContent;
                const taskDesc = item.querySelector('p').textContent;
                levelInfo.querySelector('.current-task').textContent = taskTitle;
                levelInfo.querySelector('.task-description').textContent = taskDesc;
                
                // 添加动画效果
                item.style.transform = 'scale(1.05)';
                setTimeout(() => item.style.transform = '', 200);
            });
        });
    }

    function calculateProgress(cells, level) {
        const stats = calculateStats(cells);
        
        switch(level) {
            case 1: // 描边大师：检查是否形成了完整的图形轮廓
                // 检查是否形成了完整的封闭图形（至少有一个完整的轮廓）
                let hasCompleteBorder = false;
                cells.forEach((cell, index) => {
                    const row = Math.floor(index / GRID_SIZE);
                    const col = index % GRID_SIZE;
                    const triangles = [
                        cell.querySelector('.triangle-top'),
                        cell.querySelector('.triangle-right'),
                        cell.querySelector('.triangle-bottom'),
                        cell.querySelector('.triangle-left')
                    ];
                    if (triangles.every(t => t.classList.contains('filled'))) {
                        hasCompleteBorder = true;
                    }
                });
                return hasCompleteBorder ? 100 : 0;
                
            case 2: // 面积探索：根据填充的面积计算进度
                // 目标是填充至少4个单位面积
                return Math.min(100, (stats.area / 4) * 100);
                
            case 3: // 周长挑战：根据图形的周长计算进度
                // 目标是创建周长为8的图形
                return Math.min(100, (stats.perimeter / 8) * 100);
                
            case 4: // 角度魔法：检查是否创建了不同角度的图形
                // 检查是否至少创建了一个非矩形的图形（比如三角形）
                let hasTriangle = false;
                cells.forEach((cell, index) => {
                    const triangles = [
                        cell.querySelector('.triangle-top'),
                        cell.querySelector('.triangle-right'),
                        cell.querySelector('.triangle-bottom'),
                        cell.querySelector('.triangle-left')
                    ];
                    const filledCount = triangles.filter(t => t.classList.contains('filled')).length;
                    if (filledCount === 3) { // 形成了一个三角形
                        hasTriangle = true;
                    }
                });
                return hasTriangle ? 100 : 0;
                
            default:
                return 0;
        }
    }

    // 更新任务进度
    function updateQuestProgress(cells) {
        const activeQuest = document.querySelector('.quest-item.active');
        if (!activeQuest) return;
        
        const level = parseInt(activeQuest.dataset.level);
        const progress = calculateProgress(cells, level);
        
        const progressBar = activeQuest.querySelector('.progress-bar');
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }
    }

    function createGrid(gridId) {
        const grid = document.getElementById(gridId);
        const cells = [];
        
        for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            cell.dataset.index = i;
            
            // 创建四个三角形区域
            const topTriangle = document.createElement('div');
            topTriangle.className = 'triangle-top';
            const rightTriangle = document.createElement('div');
            rightTriangle.className = 'triangle-right';
            const bottomTriangle = document.createElement('div');
            bottomTriangle.className = 'triangle-bottom';
            const leftTriangle = document.createElement('div');
            leftTriangle.className = 'triangle-left';
            
            cell.appendChild(topTriangle);
            cell.appendChild(rightTriangle);
            cell.appendChild(bottomTriangle);
            cell.appendChild(leftTriangle);
            grid.appendChild(cell);
            cells.push(cell);
        }
        
        return cells;
    }

    function initializeGrids() {
        leftGridCells = createGrid('leftGrid');
        rightGridCells = createGrid('rightGrid');
    }

    function calculateStats(cells) {
        let area = 0;
        let perimeter = 0;
        const GRID_SIZE = 8;
        const DIAGONAL = Math.sqrt(2) / 2; // 对角线边长 = 1/√2 ≈ 0.707
        
        cells.forEach((cell, index) => {
            const row = Math.floor(index / GRID_SIZE);
            const col = index % GRID_SIZE;
            
            // 获取当前格子的四个三角形
            const topTriangle = cell.querySelector('.triangle-top');
            const rightTriangle = cell.querySelector('.triangle-right');
            const bottomTriangle = cell.querySelector('.triangle-bottom');
            const leftTriangle = cell.querySelector('.triangle-left');
            
            // 计算面积 - 每个三角形面积为0.25
            [topTriangle, rightTriangle, bottomTriangle, leftTriangle].forEach(triangle => {
                if (triangle.classList.contains('filled')) area += 0.25;
            });
            
            // 计算周长
            // 上三角形
            if (topTriangle.classList.contains('filled')) {
                // 水平边
                if (row === 0 || !cells[index - GRID_SIZE]?.querySelector('.triangle-bottom')?.classList.contains('filled')) {
                    perimeter += 1;
                }
                // 右对角线
                if (!rightTriangle.classList.contains('filled')) {
                    perimeter += DIAGONAL;
                }
                // 左对角线
                if (!leftTriangle.classList.contains('filled')) {
                    perimeter += DIAGONAL;
                }
            }
            
            // 右三角形
            if (rightTriangle.classList.contains('filled')) {
                // 垂直边
                if (col === GRID_SIZE - 1 || !cells[index + 1]?.querySelector('.triangle-left')?.classList.contains('filled')) {
                    perimeter += 1;
                }
                // 上对角线
                if (!topTriangle.classList.contains('filled')) {
                    perimeter += DIAGONAL;
                }
                // 下对角线
                if (!bottomTriangle.classList.contains('filled')) {
                    perimeter += DIAGONAL;
                }
            }
            
            // 下三角形
            if (bottomTriangle.classList.contains('filled')) {
                // 水平边
                if (row === GRID_SIZE - 1 || !cells[index + GRID_SIZE]?.querySelector('.triangle-top')?.classList.contains('filled')) {
                    perimeter += 1;
                }
                // 右对角线
                if (!rightTriangle.classList.contains('filled')) {
                    perimeter += DIAGONAL;
                }
                // 左对角线
                if (!leftTriangle.classList.contains('filled')) {
                    perimeter += DIAGONAL;
                }
            }
            
            // 左三角形
            if (leftTriangle.classList.contains('filled')) {
                // 垂直边
                if (col === 0 || !cells[index - 1]?.querySelector('.triangle-right')?.classList.contains('filled')) {
                    perimeter += 1;
                }
                // 上对角线
                if (!topTriangle.classList.contains('filled')) {
                    perimeter += DIAGONAL;
                }
                // 下对角线
                if (!bottomTriangle.classList.contains('filled')) {
                    perimeter += DIAGONAL;
                }
            }
        });
        
        return { 
            area, 
            perimeter: Math.round(perimeter * 100) / 100  // 四舍五入到两位小数
        };
    }

    function updateStats(gridCells, statsBox) {
        const stats = calculateStats(gridCells);
        statsBox.querySelector('.area-value').textContent = stats.area;
        statsBox.querySelector('.perimeter-value').textContent = stats.perimeter;
    }

    function handleTriangleClick(triangle, cells, statsBox, color) {
        if (triangle.classList.contains('filled')) {
            triangle.style.backgroundColor = '';
            triangle.classList.remove('filled');
        } else {
            triangle.style.backgroundColor = color;
            triangle.classList.add('filled');
        }
        updateStats(cells, statsBox);
        updateQuestProgress(cells);
    }

    function setupGrid(cells, statsBox, color) {
        // 设置清除按钮
        const clearButton = statsBox.parentElement.querySelector('.block-base');
        clearButton.addEventListener('click', () => {
            cells.forEach(cell => {
                ['triangle-top', 'triangle-right', 'triangle-bottom', 'triangle-left'].forEach(className => {
                    const triangle = cell.querySelector('.' + className);
                    triangle.style.backgroundColor = '';
                    triangle.classList.remove('filled');
                });
            });
            updateStats(cells, statsBox);
            updateQuestProgress(cells);
        });

        cells.forEach(cell => {
            ['triangle-top', 'triangle-right', 'triangle-bottom', 'triangle-left'].forEach(className => {
                const triangle = cell.querySelector('.' + className);
                
                // 点击事件
                triangle.addEventListener('click', () => {
                    handleTriangleClick(triangle, cells, statsBox, color);
                });
                
                // 鼠标拖动事件
                triangle.addEventListener('mouseover', (e) => {
                    if (e.buttons === 1) { // 左键按下时
                        handleTriangleClick(triangle, cells, statsBox, color);
                    }
                });
            });
        });
    }

    function initialize() {
        initializeGrids();
        setupQuestSystem();
        setupOperationHint();

        const leftStatsBox = document.querySelector('.grid-section-wrapper:first-child .stats-box');
        const rightStatsBox = document.querySelector('.grid-section-wrapper:last-child .stats-box');

        setupGrid(leftGridCells, leftStatsBox, LEFT_COLOR);
        setupGrid(rightGridCells, rightStatsBox, RIGHT_COLOR);
    }

    function setupOperationHint() {
        const operationHint = document.querySelector('.operation-hint');
        const hintContent = operationHint.querySelector('.hint-content');
        let isHintVisible = false;

        operationHint.addEventListener('click', (e) => {
            e.stopPropagation(); // 阻止事件冒泡
            isHintVisible = !isHintVisible;
            hintContent.classList.toggle('show');
        });

        // 点击其他地方时关闭提示
        document.addEventListener('click', (e) => {
            if (!operationHint.contains(e.target) && isHintVisible) {
                isHintVisible = false;
                hintContent.classList.remove('show');
            }
        });
    }

    initialize();
});

document.addEventListener('DOMContentLoaded', function() {
    // 获取所有任务按钮和任务信息
    const questItems = document.querySelectorAll('.quest-item');
    const taskInfos = document.querySelectorAll('.task-info');

    // 为每个任务按钮添加点击事件
    questItems.forEach(item => {
        item.addEventListener('click', function() {
            // 移除所有任务按钮的active类
            questItems.forEach(qi => qi.classList.remove('active'));
            // 为当前点击的按钮添加active类
            this.classList.add('active');

            // 获取当前任务的level
            const level = this.getAttribute('data-level');

            // 隐藏所有任务信息
            taskInfos.forEach(info => info.style.display = 'none');
            
            // 显示当前level对应的任务信息
            const currentTaskInfo = document.querySelector(`.task-info[data-level="${level}"]`);
            if (currentTaskInfo) {
                currentTaskInfo.style.display = 'block';
            }
        });
    });
});
