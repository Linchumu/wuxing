// Updated: 2025-07-29 20:00
console.log('Loaded script.js v5');
// const canvas = document.getElementById('pentagonCanvas');
// const ctx = canvas.getContext('2d');

// 获取五行元素
const elements = document.querySelectorAll('.element');



function drawPentagon() {
    if (!canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const sideLength = 5; // 边长为5
    const radius = sideLength / (2 * Math.sin(Math.PI / 5)); // 计算外接圆半径
    const numPoints = 5;
    const angleStep = (2 * Math.PI) / numPoints;
    
    ctx.beginPath();
    for (let i = 0; i < numPoints; i++) {
        const angle = angleStep * i - Math.PI / 2; // 从顶部开始绘制
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.closePath();
    
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    ctx.stroke();
}

// 获取canvas元素和上下文
const canvas = document.getElementById('pentagon-canvas');
const ctx = canvas ? canvas.getContext('2d') : null;


// 初始化canvas尺寸（已注释，HTML中无canvas元素）
// resizeCanvas();
// window.addEventListener('resize', resizeCanvas);

// function positionElements() {
//     const container = document.querySelector('.container');
//     const containerRect = rotationContainer.getBoundingClientRect();
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