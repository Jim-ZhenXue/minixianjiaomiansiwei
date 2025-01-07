document.addEventListener('DOMContentLoaded', () => {
    const GRID_SIZE = 8;
    let activeColor = null;
    let leftGridCells = [];
    let rightGridCells = [];

    function createGrid(gridId) {
        const grid = document.getElementById(gridId);
        const cells = [];
        
        for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            cell.dataset.index = i;
            grid.appendChild(cell);
            cells.push(cell);
        }
        
        return cells;
    }

    function initializeGrids() {
        leftGridCells = createGrid('leftGrid');
        rightGridCells = createGrid('rightGrid');
    }

    function calculateTriangleStats(cells) {
        const filledCells = cells.filter(cell => cell.style.backgroundColor);
        if (filledCells.length === 0) return { area: 0, perimeter: 0 };

        // 计算面积（每个格子算0.5个单位，因为是三角形）
        const area = filledCells.length * 0.5;

        // 计算周长
        let perimeter = 0;
        const filledIndices = filledCells.map(cell => parseInt(cell.dataset.index));

        filledIndices.forEach(index => {
            const row = Math.floor(index / GRID_SIZE);
            const col = index % GRID_SIZE;

            // 检查每个方向
            const directions = [
                [-1, 0], // 上
                [1, 0],  // 下
                [0, -1], // 左
                [0, 1]   // 右
            ];

            directions.forEach(([dr, dc]) => {
                const newRow = row + dr;
                const newCol = col + dc;
                const newIndex = newRow * GRID_SIZE + newCol;

                // 如果相邻格子不在填充列表中，或者超出边界，就计入周长
                if (newRow < 0 || newRow >= GRID_SIZE || 
                    newCol < 0 || newCol >= GRID_SIZE || 
                    !filledIndices.includes(newIndex)) {
                    perimeter += 1;
                }
            });
        });

        return { area, perimeter };
    }

    function updateStats(gridCells, statsBox) {
        const stats = calculateTriangleStats(gridCells);
        statsBox.querySelector('.area-value').textContent = stats.area;
        statsBox.querySelector('.perimeter-value').textContent = stats.perimeter;
    }

    function handleCellClick(cell, cells, statsBox, color) {
        if (!activeColor) return; // 如果没有选中颜色，直接返回
        
        if (cell.style.backgroundColor === color) {
            cell.style.backgroundColor = '';
        } else {
            cell.style.backgroundColor = color;
        }
        updateStats(cells, statsBox);
    }

    function setupBlockContainer(container, cells, statsBox) {
        const color = container.classList.contains('green') ? '#4CAF50' : '#9C27B0';
        
        container.addEventListener('click', () => {
            // 取消其他容器的激活状态
            document.querySelectorAll('.block-container').forEach(c => {
                c.style.transform = 'scale(1)';
                c.classList.remove('active');
            });

            // 切换当前容器的激活状态
            if (activeColor === color) {
                activeColor = null;
                container.style.transform = 'scale(1)';
                container.classList.remove('active');
            } else {
                activeColor = color;
                container.style.transform = 'scale(1.1)';
                container.classList.add('active');
            }
        });

        cells.forEach(cell => {
            cell.addEventListener('click', () => {
                handleCellClick(cell, cells, statsBox, color);
            });

            cell.addEventListener('mouseover', (e) => {
                if (e.buttons === 1) {
                    handleCellClick(cell, cells, statsBox, color);
                }
            });
        });
    }

    function initialize() {
        initializeGrids();

        const leftStatsBox = document.querySelector('.grid-section-wrapper:first-child .stats-box');
        const rightStatsBox = document.querySelector('.grid-section-wrapper:last-child .stats-box');

        setupBlockContainer(
            document.querySelector('.block-container.green'),
            leftGridCells,
            leftStatsBox
        );

        setupBlockContainer(
            document.querySelector('.block-container.purple'),
            rightGridCells,
            rightStatsBox
        );
    }

    initialize();
}); 