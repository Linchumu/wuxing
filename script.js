// const canvas = document.getElementById('pentagonCanvas');
// const ctx = canvas.getContext('2d');

// 获取五行元素
const elements = document.querySelectorAll('.element');

// 添加容器尺寸计算以动态设置元素间距
function setContainerRadius() {
    const container = document.querySelector('.wuxing-container'); // 使用正确的容器
    if (!container) return;
    const containerRect = container.getBoundingClientRect();
    console.log('Container dimensions:', containerRect.width, 'x', containerRect.height);
    const elementSize = 60; // 元素半径（120px宽度的一半）
    const calculatedRadius = (Math.min(containerRect.width, containerRect.height) / 2 * 0.5) - elementSize; // 进一步减小乘数缩小距离
    const minRadius = 80; // 进一步减小最小半径缩小距离
    const radius = Math.max(calculatedRadius, minRadius);
    console.log('Calculated radius:', calculatedRadius, 'Final radius used:', radius);
    container.style.setProperty('--element-radius', `${radius}px`);
}

// 初始化并监听窗口变化
// setContainerRadius();
// window.addEventListener('resize', setContainerRadius);

// function positionElements() {
//     const container = document.querySelector('.container');
//     const containerRect = container.getBoundingClientRect();
//     const centerX = containerRect.width / 2;
//     const centerY = containerRect.height / 2;
//     const radius = Math.min(centerX, centerY) * 0.8;
//     const numElements = elements.length;
//     const angleStep = (2 * Math.PI) / numElements;
//     const colors = ['#e74c3c', '#f39c12', '#2ecc71', '#3498db', '#9b59b6'];
// 
//     elements.forEach((element, i) => {
//         // 删除JS定位代码，保留样式设置
//         element.style.width = '100px';
//         element.style.height = '100px';
//         element.style.zIndex = '2';
//         element.style.borderRadius = '50%';
//         element.style.backgroundColor = colors[i];
//     });
// }

// 旋转功能实现
let isDragging = false;
let startAngle = 0;
let currentRotation = -162; // 保持当前布局的初始旋转角度
const container = document.querySelector('.pentagon-container');
const centerPoint = document.getElementById('pointA');

// 设置旋转原点为中心点
container.style.transformOrigin = 'center center';

// 计算鼠标位置到中心点的角度
function getAngle(clientX, clientY) {
    const centerRect = centerPoint.getBoundingClientRect();
    const centerX = centerRect.left + centerRect.width / 2;
    const centerY = centerRect.top + centerRect.height / 2;
    return Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI);
}

// 鼠标按下开始拖动
container.addEventListener('mousedown', (e) => {
    isDragging = true;
    startAngle = getAngle(e.clientX, e.clientY) - currentRotation;
    container.style.cursor = 'grabbing';
});

// 鼠标移动时旋转
document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const currentAngle = getAngle(e.clientX, e.clientY);
    currentRotation = currentAngle - startAngle;
    container.style.transform = `rotate(${currentRotation}deg)`;
});

// 鼠标释放停止拖动
document.addEventListener('mouseup', () => {
    if (isDragging) {
        isDragging = false;
        container.style.cursor = 'grab';
    }
});

// 初始化鼠标样式和旋转角度
container.style.cursor = 'grab';
container.style.transform = `rotate(${currentRotation}deg)`;

// 初始化
// 删除canvas相关的resize函数和事件监听
// function resizeCanvas() {
//     const canvas = document.getElementById('pentagon-canvas');
//     if (!canvas) return;
//     const container = document.querySelector('.container');
//     const size = Math.min(container.clientWidth, container.clientHeight) * 0.8;
//     canvas.width = size;
//     canvas.height = size;
//     canvas.style.width = `${size}px`;
//     canvas.style.height = `${size}px`;
// }
// 删除窗口大小调整事件监听和调用
// window.addEventListener('resize', resizeCanvas);
// resizeCanvas();

document.addEventListener('DOMContentLoaded', () => {
    // 对照图上传功能
    const referenceUpload = document.getElementById('reference-upload');
    const uploadButton = document.querySelector('.upload-reference');
    const toggleButton = document.querySelector('.toggle-reference');
    const referenceImage = document.querySelector('.reference-image');
    const loadingIndicator = document.createElement('div');
    loadingIndicator.textContent = '正在加载对照图...';
    loadingIndicator.style.position = 'fixed';
    loadingIndicator.style.top = '50%';
    loadingIndicator.style.left = '50%';
    loadingIndicator.style.transform = 'translate(-50%, -50%)';
    loadingIndicator.style.padding = '20px';
    loadingIndicator.style.backgroundColor = 'rgba(0,0,0,0.7)';
    loadingIndicator.style.color = 'white';
    loadingIndicator.style.borderRadius = '5px';
    loadingIndicator.style.display = 'none';
    document.body.appendChild(loadingIndicator);

    // 上传按钮点击事件
    uploadButton.addEventListener('click', () => {
        referenceUpload.click();
    });

    // 文件选择变化事件
    referenceUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // 验证文件格式
        const validTypes = ['image/png', 'image/jpeg', 'image/svg+xml'];
        if (!validTypes.includes(file.type)) {
            alert('请上传png/jpg/svg格式的图片');
            return;
        }

        loadingIndicator.style.display = 'block';

        // 读取文件并显示
        const reader = new FileReader();
        reader.onload = function(event) {
            referenceImage.style.backgroundImage = `url('${event.target.result}')`;
            loadingIndicator.style.display = 'none';
        };
        reader.onerror = function() {
            alert('图片加载失败，请重试');
            loadingIndicator.style.display = 'none';
        };
        reader.readAsDataURL(file);
    });

    // 显示/隐藏参照图
    let referenceVisible = true;
    toggleButton.addEventListener('click', () => {
        referenceVisible = !referenceVisible;
        referenceImage.style.opacity = referenceVisible ? '0.3' : '0';
        toggleButton.textContent = referenceVisible ? '隐藏参照图' : '显示参照图';
    });

    // 注释resizeCanvas调用
    // resizeCanvas();
  });
// 注释文件开头的canvas初始化代码
// const canvas = document.getElementById('pentagonCanvas');
// const ctx = canvas.getContext('2d');
// function drawPentagon() {
//     const canvas = document.getElementById('pentagon-canvas');
//     if (!canvas) return;
//     const ctx = canvas.getContext('2d');
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     
//     const centerX = canvas.width / 2;
//     const centerY = canvas.height / 2;
//     const radius = Math.min(centerX, centerY) * 0.8;
//     const numPoints = 5;
//     const angleStep = (2 * Math.PI) / numPoints;
//     
//     // 开始绘制
//     ctx.beginPath();
//     for (let i = 0; i < numPoints; i++) {
//         const angle = angleStep * i - Math.PI / 2; // 从顶部开始
//         const x = centerX + radius * Math.cos(angle);
//         const y = centerY + radius * Math.sin(angle);
//         
//         if (i === 0) {
//             ctx.moveTo(x, y);
//         } else {
//             ctx.lineTo(x, y);
//         }
//     }
//     ctx.closePath();
//     
//     // 设置样式并描边
//     ctx.strokeStyle = '#333';
//     ctx.lineWidth = 2;
//     ctx.stroke();
// }
// 注释未清理的resizeCanvas调用
// resizeCanvas();

// 添加五行生克动画逻辑
function initializeElementInteractions() {
    const elementButtons = document.querySelectorAll('.element-button');
    const resetButton = document.getElementById('resetButton');
    const elements = document.querySelectorAll('.element');

    // 五行克制关系
    const克制关系 = {
        'fire': 'metal',   // 火克金
        'metal': 'wood',   // 金克木
        'wood': 'earth',   // 木克土
        'earth': 'water',  // 土克水
        'water': 'fire'    // 水克火
    };

    // 按钮点击事件
    elementButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 重置所有元素状态
            elements.forEach(el => {
                el.classList.remove('strong', 'restrained');
                el.querySelector('.element-status').textContent = '正常';
            });

            // 获取当前选中的元素类型
            const elementType = this.classList[1]; // 获取wood/fire/earth/metal/water
            const element = document.querySelector(`.${elementType}-element`);

            // 设置元素为强盛状态
            element.classList.add('strong');
            element.querySelector('.element-status').textContent = '强盛';

            // 找到被克制的元素并应用克制效果
            const 被克制元素 = 克制关系[elementType];
            if (被克制元素) {
                const restrainedElement = document.querySelector(`.${被克制元素}-element`);
                restrainedElement.classList.add('restrained');
                restrainedElement.querySelector('.element-status').textContent = '被克制';
                
                // 创建克制关系箭头动画
                createRestraintArrow(elementType, 被克制元素);
            }
        });
    });

    // 重置按钮事件
    resetButton.addEventListener('click', function() {
        elements.forEach(el => {
            el.classList.remove('strong', 'restrained');
            el.querySelector('.element-status').textContent = '正常';
        });
        
        // 移除所有箭头
        document.querySelectorAll('.克制-arrow').forEach(arrow => arrow.remove());
    });
}

// 创建克制关系箭头
function createRestraintArrow(fromElement, toElement) {
    // 移除已存在的箭头
    document.querySelectorAll('.克制-arrow').forEach(arrow => arrow.remove());
    
    const relationships = document.querySelector('.relationships');
    const fromEl = document.querySelector(`.${fromElement}-element`);
    const toEl = document.querySelector(`.${toElement}-element`);
    
    const fromRect = fromEl.getBoundingClientRect();
    const toRect = toEl.getBoundingClientRect();
    const containerRect = document.querySelector('.pentagon-container').getBoundingClientRect();
    
    // 计算箭头起点和终点位置
    const fromX = fromRect.left + fromRect.width / 2 - containerRect.left;
    const fromY = fromRect.top + fromRect.height / 2 - containerRect.top;
    const toX = toRect.left + toRect.width / 2 - containerRect.left;
    const toY = toRect.top + toRect.height / 2 - containerRect.top;
    
    // 创建箭头元素
    const arrow = document.createElement('div');
    arrow.className = 'relationship-arrow 克制-arrow';
    arrow.style.position = 'absolute';
    
    // 设置箭头位置和旋转
    const length = Math.sqrt(Math.pow(toX - fromX, 2) + Math.pow(toY - fromY, 2));
    const angle = Math.atan2(toY - fromY, toX - fromX) * 180 / Math.PI;
    
    arrow.style.width = `${length}px`;
    // 移除箭头位置和旋转控制
    // arrow.style.left = `${fromX}px`;
    // arrow.style.top = `${fromY}px`;
    // arrow.style.transform = `rotate(${angle}deg)`;
    arrow.style.setProperty('--arrow-angle', `${angle}deg`);
    
    // 特殊样式 - 火克金关系
    if (fromElement === 'fire' && toElement === 'metal') {
        arrow.style.background = 'linear-gradient(90deg, rgba(255,69,0,0.8), rgba(255,165,0,0.6))';
        arrow.style.height = '6px';
        arrow.style.borderRadius = '3px';
        arrow.classList.add('fire-to-metal');
    }
    
    relationships.appendChild(arrow);
}

// 初始化交互功能
document.addEventListener('DOMContentLoaded', initializeElementInteractions);