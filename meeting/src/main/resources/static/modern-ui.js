let currentUser = null;

// 动漫风格角色类型定义
const animeRoleTypes = {
    'ADMIN': {
        name: '艾莉丝·管理酱',
        avatar: '🎀',
        animeTitle: '系统管理の女王様',
        description: '拥有绝对权限的傲娇管理员，掌控着整个会议室帝国！',
        catchphrase: '哼！本女王的权限可是无敌的呢～',
        bgColor: 'linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)',
        icon: '👑'
    },
    'EMPLOYEE': {
        name: '小樱·工作娘',
        avatar: '🌸',
        animeTitle: '勤劳的会议室守护者',
        description: '温柔可靠的员工小姐姐，负责维护会议室的日常运营～',
        catchphrase: '今天也要努力工作呢！(๑•̀ㅂ•́)و✧',
        bgColor: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)',
        icon: '👔'
    },
    'CUSTOMER': {
        name: '凛音·预订姬',
        avatar: '🎵',
        animeTitle: '会议室预订の达人',
        description: '活泼开朗的客户小姐，总是能找到最合适的会议室！',
        catchphrase: '诶嘿嘿～又要开始预订会议室了呢！',
        bgColor: 'linear-gradient(135deg, #fd79a8 0%, #e84393 100%)',
        icon: '👤'
    }
};

// 特色演示账号的用户名映射（用于识别特殊账号）
const animeAccountUsernames = ['admin', 'employee', 'customer'];

// 存储所有系统用户
let allSystemUsers = [];

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎮 开始初始化系统...');

    // 分步骤初始化，避免一个失败影响全部

    // 第一步：基本UI
    try {
        console.log('📱 初始化基本UI...');
        updateUserInterface();
        addAnimations();
        console.log('✅ 基本UI初始化完成');
    } catch (error) {
        console.error('❌ 基本UI初始化失败:', error);
    }

    // 第二步：鼠标特效
    try {
        console.log('🖱️ 初始化鼠标特效...');
        initCustomCursor();
        initClickEffects();
        console.log('✅ 鼠标特效初始化完成');
    } catch (error) {
        console.error('❌ 鼠标特效初始化失败:', error);
    }

    // 第三步：账号切换器
    try {
        console.log('👥 初始化账号切换器...');
        addAccountSwitcher();
        console.log('✅ 账号切换器初始化完成');
    } catch (error) {
        console.error('❌ 账号切换器初始化失败:', error);
    }

    // 第四步：表单字段
    try {
        console.log('📝 初始化表单字段...');
        toggleCustomerFields();
        console.log('✅ 表单字段初始化完成');
    } catch (error) {
        console.error('❌ 表单字段初始化失败:', error);
    }

    // 第五步：动漫装饰（延迟执行）
    setTimeout(() => {
        try {
            console.log('🎨 初始化动漫装饰...');
            addDefaultAnimeDecorations();
            console.log('✅ 动漫装饰初始化完成');
        } catch (error) {
            console.error('❌ 动漫装饰初始化失败:', error);
        }
    }, 500);

    // 第六步：简化的图片检测（延迟执行）
    setTimeout(() => {
        try {
            console.log('🖼️ 检测动漫图片...');
            initSimpleImageSystem();
        } catch (error) {
            console.error('❌ 图片系统初始化失败:', error);
        }
    }, 1000);

    console.log('✅ 系统初始化流程完成！');
});

function addAnimations() {
    // 为卡片添加进入动画
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// 初始化自定义鼠标
function initCustomCursor() {
    const cursor = document.getElementById('customCursor');
    if (!cursor) {
        console.error('❌ 找不到自定义鼠标元素！');
        return;
    }

    console.log('✅ 找到自定义鼠标元素，开始初始化...');
    let mouseX = 0,
        mouseY = 0;
    let cursorX = 0,
        cursorY = 0;

    // 鼠标移动事件
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // 创建鼠标轨迹
        createCursorTrail(mouseX, mouseY);
    });

    console.log('✅ 鼠标移动事件已绑定');

    // 平滑跟随动画
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;

        cursor.style.left = cursorX - 10 + 'px';
        cursor.style.top = cursorY - 10 + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // 鼠标按下效果
    document.addEventListener('mousedown', () => {
        cursor.classList.add('clicking');
    });

    document.addEventListener('mouseup', () => {
        cursor.classList.remove('clicking');
    });
}

// 创建鼠标轨迹
function createCursorTrail(x, y) {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.left = x - 3 + 'px';
    trail.style.top = y - 3 + 'px';

    document.body.appendChild(trail);

    // 0.8秒后移除轨迹元素
    setTimeout(() => {
        if (trail.parentNode) {
            trail.parentNode.removeChild(trail);
        }
    }, 800);
}

// 初始化点击特效
function initClickEffects() {
    document.addEventListener('click', (e) => {
        console.log('🎯 点击位置:', e.clientX, e.clientY);
        createClickEffect(e.clientX, e.clientY);
    });
    console.log('✅ 点击特效事件已绑定');
}

// 创建点击特效
function createClickEffect(x, y) {
    const effectContainer = document.createElement('div');
    effectContainer.className = 'click-effect';
    effectContainer.style.left = x + 'px';
    effectContainer.style.top = y + 'px';

    // 创建波纹效果
    const ripple = document.createElement('div');
    ripple.className = 'click-ripple';
    effectContainer.appendChild(ripple);

    // 创建星星效果
    const stars = ['✨', '🌟', '💫', '⭐'];
    for (let i = 0; i < 4; i++) {
        const star = document.createElement('div');
        star.className = 'click-stars';
        star.textContent = stars[i];
        star.style.left = (Math.random() - 0.5) * 40 + 'px';
        star.style.top = (Math.random() - 0.5) * 40 + 'px';
        star.style.animationDelay = i * 0.1 + 's';
        effectContainer.appendChild(star);
    }

    document.body.appendChild(effectContainer);

    // 1秒后移除特效
    setTimeout(() => {
        if (effectContainer.parentNode) {
            effectContainer.parentNode.removeChild(effectContainer);
        }
    }, 1000);
}

// 动漫图片检测和应用系统
async function initAnimeImages() {
    console.log('🎨 初始化动漫图片系统...');

    // 检测可能的图片文件
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    const imagePaths = [];

    // 常见的动漫图片命名模式
    const imagePatterns = [
        'bg-main', 'bg-admin', 'bg-employee', 'bg-customer',
        'decoration-1', 'decoration-2', 'decoration-3', 'decoration-4',
        'character-1', 'character-2', 'character-3', 'character-4',
        'anime-1', 'anime-2', 'anime-3', 'anime-4',
        'wallpaper-1', 'wallpaper-2', 'wallpaper-3', 'wallpaper-4',
        'cute-1', 'cute-2', 'cute-3', 'cute-4'
    ];

    // 检测图片是否存在
    for (const pattern of imagePatterns) {
        for (const ext of imageExtensions) {
            const imagePath = `images/${pattern}.${ext}`;
            try {
                const exists = await checkImageExists(imagePath);
                if (exists) {
                    imagePaths.push({
                        path: imagePath,
                        name: pattern,
                        type: getImageType(pattern)
                    });
                    console.log(`✨ 发现动漫图片: ${imagePath}`);
                }
            } catch (e) {
                // 图片不存在，继续检测下一个
            }
        }
    }

    if (imagePaths.length > 0) {
        console.log(`🎉 总共发现 ${imagePaths.length} 张动漫图片！`);
        applyAnimeImages(imagePaths);
    } else {
        console.log('📝 未发现动漫图片，使用默认样式');
        addDefaultAnimeDecorations();
        showImageUploadTip();
    }
}

// 检查图片是否存在
function checkImageExists(imagePath) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = imagePath;
    });
}

// 获取图片类型
function getImageType(imageName) {
    if (imageName.startsWith('bg-')) return 'background';
    if (imageName.startsWith('decoration-')) return 'decoration';
    if (imageName.startsWith('character-')) return 'character';
    if (imageName.startsWith('anime-')) return 'anime';
    if (imageName.startsWith('wallpaper-')) return 'wallpaper';
    if (imageName.startsWith('cute-')) return 'cute';
    return 'general';
}

// 应用动漫图片到界面
function applyAnimeImages(imagePaths) {
    console.log('🎨 开始应用动漫图片到界面...');

    // 按类型分组图片
    const imagesByType = {};
    imagePaths.forEach(img => {
        if (!imagesByType[img.type]) imagesByType[img.type] = [];
        imagesByType[img.type].push(img);
    });

    // 应用背景图片
    applyBackgroundImages(imagesByType);

    // 应用装饰图片
    applyDecorationImages(imagesByType);

    // 应用角色图片
    applyCharacterImages(imagesByType);

    // 添加动漫风格的图片切换功能
    addImageSwitcher(imagePaths);
}

// 应用背景图片
function applyBackgroundImages(imagesByType) {
    const backgrounds = imagesByType.background || imagesByType.wallpaper || [];

    if (backgrounds.length > 0) {
        // 主背景
        const mainBg = backgrounds.find(img => img.name.includes('main')) || backgrounds[0];
        if (mainBg) {
            document.body.style.backgroundImage = `
                linear-gradient(135deg, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.8) 50%, rgba(240, 147, 251, 0.8) 100%),
                url('${mainBg.path}')
            `;
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundPosition = 'center';
            document.body.style.backgroundAttachment = 'fixed';
            console.log(`🖼️ 应用主背景: ${mainBg.path}`);
        }

        // 角色专属背景
        const adminBg = backgrounds.find(img => img.name.includes('admin'));
        const employeeBg = backgrounds.find(img => img.name.includes('employee'));
        const customerBg = backgrounds.find(img => img.name.includes('customer'));

        // 存储背景图片供角色切换时使用
        window.animeBackgrounds = {
            main: mainBg ? mainBg.path : null,
            admin: adminBg ? adminBg.path : null,
            employee: employeeBg ? employeeBg.path : null,
            customer: customerBg ? customerBg.path : null
        };
    }
}

// 应用装饰图片
function applyDecorationImages(imagesByType) {
    const decorations = imagesByType.decoration || imagesByType.cute || [];

    if (decorations.length > 0) {
        // 在页面中添加浮动装饰元素
        decorations.slice(0, 4).forEach((decoration, index) => {
            createFloatingDecoration(decoration.path, index);
        });
        console.log(`✨ 添加了 ${Math.min(decorations.length, 4)} 个装饰元素`);
    }
}

// 创建浮动装饰元素
function createFloatingDecoration(imagePath, index) {
    const decoration = document.createElement('div');
    decoration.className = 'floating-decoration';
    decoration.style.cssText = `
        position: fixed;
        width: 80px;
        height: 80px;
        background-image: url('${imagePath}');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        pointer-events: none;
        z-index: 1;
        opacity: 0.6;
        animation: floatingDecoration${index} ${8 + index * 2}s ease-in-out infinite;
    `;

    // 设置不同的位置和动画
    const positions = [
        { top: '10%', right: '10%' },
        { top: '20%', left: '5%' },
        { bottom: '15%', right: '8%' },
        { bottom: '25%', left: '3%' }
    ];

    const pos = positions[index % positions.length];
    Object.assign(decoration.style, pos);

    document.body.appendChild(decoration);

    // 添加对应的动画样式
    addFloatingAnimation(index);
}

// 添加浮动动画样式
function addFloatingAnimation(index) {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatingDecoration${index} {
            0%, 100% {
                transform: translateY(0px) rotate(0deg) scale(1);
                opacity: 0.6;
            }
            25% {
                transform: translateY(-20px) rotate(5deg) scale(1.1);
                opacity: 0.8;
            }
            50% {
                transform: translateY(-10px) rotate(-3deg) scale(0.9);
                opacity: 0.7;
            }
            75% {
                transform: translateY(-15px) rotate(8deg) scale(1.05);
                opacity: 0.9;
            }
        }
    `;
    document.head.appendChild(style);
}

// 应用角色图片
function applyCharacterImages(imagesByType) {
    const characters = imagesByType.character || imagesByType.anime || [];

    if (characters.length > 0) {
        // 在卡片中添加角色图片作为背景装饰
        addCharacterDecorations(characters);
        console.log(`👥 添加了角色装饰图片`);
    }
}

// 添加角色装饰到卡片
function addCharacterDecorations(characters) {
    // 为不同类型的卡片添加角色装饰
    const cardTypes = [
        { selector: '.admin-style', character: characters[0] },
        { selector: '.employee-style', character: characters[1] },
        { selector: '.customer-style', character: characters[2] },
        { selector: '.room-style', character: characters[3] }
    ];

    cardTypes.forEach(({ selector, character }) => {
        if (character) {
            const style = document.createElement('style');
            style.textContent = `
                ${selector}::after {
                    content: '';
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    width: 60px;
                    height: 60px;
                    background-image: url('${character.path}');
                    background-size: cover;
                    background-position: center;
                    border-radius: 50%;
                    opacity: 0.3;
                    z-index: 0;
                }
            `;
            document.head.appendChild(style);
        }
    });
}

// 添加图片切换器
function addImageSwitcher(imagePaths) {
    if (imagePaths.length <= 1) return;

    const switcher = document.createElement('div');
    switcher.className = 'anime-image-switcher';
    switcher.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        background: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(10px);
        border-radius: 15px;
        padding: 15px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        display: flex;
        gap: 10px;
        align-items: center;
    `;

    switcher.innerHTML = `
        <span style="font-size: 0.9rem; color: #666; font-weight: 600;">🎨 动漫主题:</span>
        <button onclick="switchAnimeTheme()" style="background: linear-gradient(135deg, #ff6b9d 0%, #c44569 100%); color: white; border: none; padding: 8px 15px; border-radius: 10px; cursor: pointer; font-size: 0.8rem; font-weight: 600;">
            <i class="fas fa-magic"></i> 切换
        </button>
        <button onclick="toggleImageSwitcher()" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; border: none; padding: 8px 12px; border-radius: 10px; cursor: pointer; font-size: 0.8rem;">
            <i class="fas fa-palette"></i>
        </button>
    `;

    document.body.appendChild(switcher);

    // 存储图片路径供切换使用
    window.animeImagePaths = imagePaths;
    window.currentImageIndex = 0;
}

// 切换动漫主题
function switchAnimeTheme() {
    if (!window.animeImagePaths || window.animeImagePaths.length === 0) return;

    window.currentImageIndex = (window.currentImageIndex + 1) % window.animeImagePaths.length;
    const currentImage = window.animeImagePaths[window.currentImageIndex];

    // 切换背景图片
    document.body.style.backgroundImage = `
        linear-gradient(135deg, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.8) 50%, rgba(240, 147, 251, 0.8) 100%),
        url('${currentImage.path}')
    `;

    // 显示切换提示
    showImageSwitchTip(currentImage.name);
}

// 显示图片切换提示
function showImageSwitchTip(imageName) {
    const tip = document.createElement('div');
    tip.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(255, 107, 157, 0.95);
        color: white;
        padding: 20px 30px;
        border-radius: 15px;
        font-size: 1.1rem;
        font-weight: 600;
        z-index: 10000;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        animation: tipFadeInOut 2s ease-in-out forwards;
    `;
    tip.innerHTML = `✨ 切换到: ${imageName} 🎨`;

    document.body.appendChild(tip);

    // 添加动画样式
    const style = document.createElement('style');
    style.textContent = `
        @keyframes tipFadeInOut {
            0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
            20%, 80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        }
    `;
    document.head.appendChild(style);

    setTimeout(() => {
        if (tip.parentNode) tip.parentNode.removeChild(tip);
        if (style.parentNode) style.parentNode.removeChild(style);
    }, 2000);
}

// 显示图片上传提示
function showImageUploadTip() {
    const tip = document.createElement('div');
    tip.style.cssText = `
        position: fixed;
        bottom: 80px;
        right: 20px;
        background: linear-gradient(135deg, #ff6b9d 0%, #c44569 100%);
        color: white;
        padding: 15px 20px;
        border-radius: 12px;
        font-size: 0.9rem;
        z-index: 1000;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        max-width: 300px;
        animation: tipSlideIn 3s ease-in-out forwards;
    `;
    tip.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
            <i class="fas fa-info-circle"></i>
            <strong>💡 提示</strong>
        </div>
        <div style="font-size: 0.85rem; line-height: 1.4;">
            将你的动漫图片放到 <code>images/</code> 文件夹中，<br>
            系统会自动检测并应用到界面！✨
        </div>
    `;

    document.body.appendChild(tip);

    // 添加动画样式
    const style = document.createElement('style');
    style.textContent = `
        @keyframes tipSlideIn {
            0% { opacity: 0; transform: translateX(100%); }
            10%, 90% { opacity: 1; transform: translateX(0); }
            100% { opacity: 0; transform: translateX(100%); }
        }
    `;
    document.head.appendChild(style);

    setTimeout(() => {
        if (tip.parentNode) tip.parentNode.removeChild(tip);
        if (style.parentNode) style.parentNode.removeChild(style);
    }, 8000);
}

// 简化的图片系统
function initSimpleImageSystem() {
    console.log('🖼️ 开始简化图片检测...');

    // 扩展的图片文件名检测
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    const commonNames = [
        // 背景图
        'bg-main', 'bg-admin', 'bg-employee', 'bg-customer',
        'background', 'wallpaper',
        // 装饰图 - 大幅扩展
        'anime-1', 'anime-2', 'anime-3', 'anime-4', 'anime-5', 'anime-6',
        'character-1', 'character-2', 'character-3', 'character-4',
        'decoration-1', 'decoration-2', 'decoration-3', 'decoration-4',
        'cute-1', 'cute-2', 'cute-3', 'cute-4', 'cute-5', 'cute-6',
        'kawaii-1', 'kawaii-2', 'kawaii-3', 'kawaii-4',
        'girl-1', 'girl-2', 'girl-3', 'girl-4',
        'boy-1', 'boy-2', 'boy-3', 'boy-4',
        'miku', 'rem', 'asuka', 'rei', 'sakura', 'naruto',
        'pikachu', 'totoro', 'kiki', 'chihiro',
        '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'
    ];

    // 生成所有可能的组合
    const commonImages = [];
    commonNames.forEach(name => {
        imageExtensions.forEach(ext => {
            commonImages.push(`${name}.${ext}`);
        });
    });

    let foundImages = [];
    let checkedCount = 0;

    // 检测每个可能的图片
    commonImages.forEach(imageName => {
        const img = new Image();
        img.onload = function() {
            console.log(`✅ 发现图片: ${imageName}`);
            foundImages.push({
                name: imageName,
                path: `images/${imageName}`,
                type: getSimpleImageType(imageName)
            });
            checkedCount++;

            // 如果是第一张图片，立即应用
            if (foundImages.length === 1) {
                applyFirstImage(foundImages[0]);
            }

            // 检测完成后处理所有图片
            if (checkedCount === commonImages.length) {
                handleFoundImages(foundImages);
            }
        };

        img.onerror = function() {
            checkedCount++;
            if (checkedCount === commonImages.length) {
                handleFoundImages(foundImages);
            }
        };

        img.src = `images/${imageName}`;
    });

    // 如果没有找到任何图片，显示提示
    setTimeout(() => {
        if (foundImages.length === 0) {
            showSimpleImageTip();
        }
    }, 2000);
}

// 获取简单图片类型
function getSimpleImageType(imageName) {
    // 背景图片关键词
    const backgroundKeywords = ['bg-', 'background', 'wallpaper'];

    // 检查是否为背景图
    if (backgroundKeywords.some(keyword => imageName.includes(keyword))) {
        return 'background';
    }

    // 其他都是装饰图
    return 'decoration';
}

// 应用第一张找到的图片
function applyFirstImage(image) {
    console.log(`🎨 应用背景图片: ${image.name}`);

    if (image.type === 'background') {
        // 应用背景图片
        document.body.style.backgroundImage = `
            linear-gradient(135deg, rgba(102, 126, 234, 0.7) 0%, rgba(118, 75, 162, 0.7) 50%, rgba(240, 147, 251, 0.7) 100%),
            url('${image.path}')
        `;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundAttachment = 'fixed';

        // 显示成功提示
        showImageAppliedTip(image.name);
    }
}

// 处理所有找到的图片
function handleFoundImages(images) {
    console.log(`🎉 图片检测完成！找到 ${images.length} 张图片`);

    if (images.length > 0) {
        // 分类图片
        const backgrounds = images.filter(img => img.type === 'background');
        const decorations = images.filter(img => img.type === 'decoration');

        console.log(`📸 背景图: ${backgrounds.length} 张, 装饰图: ${decorations.length} 张`);

        // 应用装饰图
        if (decorations.length > 0) {
            applyDecorationImages(decorations);
        }

        // 设置背景图系统
        if (backgrounds.length > 0) {
            setupBackgroundSystem(backgrounds);
        }

        // 创建图片切换器（已禁用）
        // createAdvancedImageSwitcher(images);

        // 启动自动轮换系统
        startAutoRotation(backgrounds);

    } else {
        console.log('📝 未找到任何图片');
    }
}

// 创建简单的图片切换器
function createSimpleImageSwitcher(images) {
    const backgrounds = images.filter(img => img.type === 'background');
    if (backgrounds.length <= 1) return;

    const switcher = document.createElement('div');
    switcher.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        border-radius: 15px;
        padding: 15px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        display: flex;
        gap: 10px;
        align-items: center;
    `;

    switcher.innerHTML = `
        <span style="font-size: 0.9rem; color: #666; font-weight: 600;">🎨 背景:</span>
        <button onclick="switchSimpleBackground()" style="background: linear-gradient(135deg, #ff6b9d 0%, #c44569 100%); color: white; border: none; padding: 8px 15px; border-radius: 10px; cursor: pointer; font-size: 0.8rem; font-weight: 600;">
            <i class="fas fa-magic"></i> 切换 (${backgrounds.length})
        </button>
    `;

    document.body.appendChild(switcher);
    console.log(`✨ 创建了图片切换器，共 ${backgrounds.length} 张背景`);
}

// 切换背景图片
function switchSimpleBackground() {
    if (!window.availableBackgrounds || window.availableBackgrounds.length <= 1) return;

    window.currentBgIndex = (window.currentBgIndex + 1) % window.availableBackgrounds.length;
    const currentBg = window.availableBackgrounds[window.currentBgIndex];

    console.log(`🔄 切换到背景: ${currentBg.name}`);

    document.body.style.backgroundImage = `
        linear-gradient(135deg, rgba(102, 126, 234, 0.7) 0%, rgba(118, 75, 162, 0.7) 50%, rgba(240, 147, 251, 0.7) 100%),
        url('${currentBg.path}')
    `;

    showImageAppliedTip(currentBg.name);
}

// 显示图片应用成功提示
function showImageAppliedTip(imageName) {
    const tip = document.createElement('div');
    tip.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(255, 107, 157, 0.95);
        color: white;
        padding: 20px 30px;
        border-radius: 15px;
        font-size: 1.1rem;
        font-weight: 600;
        z-index: 10000;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        animation: tipFadeInOut 2s ease-in-out forwards;
    `;
    tip.innerHTML = `✨ 应用背景: ${imageName} 🎨`;

    document.body.appendChild(tip);

    setTimeout(() => {
        if (tip.parentNode) tip.parentNode.removeChild(tip);
    }, 2000);
}

// 显示简单的图片提示
function showSimpleImageTip() {
    const tip = document.createElement('div');
    tip.style.cssText = `
        position: fixed;
        bottom: 80px;
        right: 20px;
        background: linear-gradient(135deg, #ff6b9d 0%, #c44569 100%);
        color: white;
        padding: 15px 20px;
        border-radius: 12px;
        font-size: 0.9rem;
        z-index: 1000;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        max-width: 300px;
        animation: tipSlideIn 5s ease-in-out forwards;
    `;
    tip.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
            <i class="fas fa-image"></i>
            <strong>🖼️ 图片提示</strong>
        </div>
        <div style="font-size: 0.85rem; line-height: 1.4;">
            将动漫图片放到 <code>images/</code> 文件夹：<br>
            • <code>bg-main.jpg</code> - 主背景<br>
            • <code>anime-1.jpg</code> - 装饰图<br>
            系统会自动检测并应用！✨
        </div>
    `;

    document.body.appendChild(tip);

    setTimeout(() => {
        if (tip.parentNode) tip.parentNode.removeChild(tip);
    }, 8000);
}

// 应用装饰图片
function applyDecorationImages(decorations) {
    console.log(`🎨 开始应用 ${decorations.length} 张装饰图片...`);

    // 显示所有找到的装饰图片
    decorations.forEach((decoration, index) => {
        setTimeout(() => {
            createFloatingImageDecoration(decoration, index);
        }, index * 300); // 每张图片延迟0.3秒出现，更快显示
    });
}

// 创建浮动图片装饰
function createFloatingImageDecoration(decoration, index) {
    const decorElement = document.createElement('div');
    decorElement.className = 'floating-image-decoration';
    // 为10张图片优化大小
    const baseSize = 110; // 固定大小，适合10张图片的布局

    decorElement.style.cssText = `
        position: fixed;
        width: ${baseSize}px;
        height: ${baseSize}px;
        background-image: url('${decoration.path}');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        pointer-events: none;
        z-index: 2;
        opacity: 0;
        border-radius: 15px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        border: 3px solid rgba(255, 255, 255, 0.3);
        animation: decorationFadeIn 1s ease-out forwards, decorationFloat${index} ${6 + index * 2}s ease-in-out infinite;
        transition: all 0.3s ease;
    `;

    // 优化的位置数组：左边5个，右边5个
    const positions = [
        // 左侧5个位置（从上到下均匀分布）
        { top: '10%', left: '2%' },
        { top: '25%', left: '1%' },
        { top: '40%', left: '2%' },
        { top: '55%', left: '1%' },
        { top: '70%', left: '2%' },

        // 右侧5个位置（从上到下均匀分布）
        { top: '10%', right: '2%' },
        { top: '25%', right: '1%' },
        { top: '40%', right: '2%' },
        { top: '55%', right: '1%' },
        { top: '70%', right: '2%' }
    ];

    const pos = positions[index % positions.length];
    Object.assign(decorElement.style, pos);

    document.body.appendChild(decorElement);

    // 添加对应的动画样式
    addFloatingImageAnimation(index);

    console.log(`✨ 添加装饰图片: ${decoration.name} 在位置 ${JSON.stringify(pos)}`);
}

// 添加浮动图片动画样式
function addFloatingImageAnimation(index) {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes decorationFadeIn {
            0% { opacity: 0; transform: scale(0.5) rotate(-10deg); }
            100% { opacity: 0.8; transform: scale(1) rotate(0deg); }
        }

        @keyframes decorationFloat${index} {
            0%, 100% {
                transform: translateY(0px) rotate(0deg) scale(1);
                opacity: 0.8;
            }
            25% {
                transform: translateY(-15px) rotate(2deg) scale(1.05);
                opacity: 0.9;
            }
            50% {
                transform: translateY(-8px) rotate(-1deg) scale(0.95);
                opacity: 0.7;
            }
            75% {
                transform: translateY(-12px) rotate(3deg) scale(1.02);
                opacity: 0.85;
            }
        }
    `;
    document.head.appendChild(style);
}

// 设置背景图系统
function setupBackgroundSystem(backgrounds) {
    console.log(`🖼️ 设置背景图系统，共 ${backgrounds.length} 张背景`);

    // 按角色分类背景图
    const bgByRole = {
        main: backgrounds.filter(bg => bg.name.includes('main')),
        admin: backgrounds.filter(bg => bg.name.includes('admin')),
        employee: backgrounds.filter(bg => bg.name.includes('employee')),
        customer: backgrounds.filter(bg => bg.name.includes('customer')),
        general: backgrounds.filter(bg => !bg.name.includes('main') && !bg.name.includes('admin') && !bg.name.includes('employee') && !bg.name.includes('customer'))
    };

    // 存储到全局变量
    window.backgroundsByRole = bgByRole;
    window.allBackgrounds = backgrounds;
    window.currentBgIndex = 0;
    window.lastRoleChange = Date.now();

    console.log('📂 背景图分类:', {
        main: bgByRole.main.length,
        admin: bgByRole.admin.length,
        employee: bgByRole.employee.length,
        customer: bgByRole.customer.length,
        general: bgByRole.general.length
    });
}

// 启动自动轮换系统
function startAutoRotation(backgrounds) {
    if (backgrounds.length <= 1) return;

    console.log('🔄 启动背景自动轮换系统...');

    // 每30秒检查一次是否需要轮换
    setInterval(() => {
        // 只有在启用自动轮换时才执行
        if (!window.autoRotationEnabled) return;

        const now = Date.now();
        const timeSinceLastChange = now - (window.lastRoleChange || now);

        // 如果在同一界面停留超过2分钟，自动轮换背景
        if (timeSinceLastChange > 120000) { // 2分钟 = 120000毫秒
            autoRotateBackground();
            window.lastRoleChange = now;
        }
    }, 30000); // 每30秒检查一次

    console.log('✅ 自动轮换系统已启动（2分钟轮换一次）');
}

// 自动轮换背景
function autoRotateBackground() {
    const currentRole = getCurrentUserRole();
    const availableBgs = getBackgroundsForRole(currentRole);

    if (availableBgs.length <= 1) return;

    // 轮换到下一张背景
    const currentIndex = window.currentBgIndex || 0;
    const nextIndex = (currentIndex + 1) % availableBgs.length;
    const nextBg = availableBgs[nextIndex];

    console.log(`🔄 自动轮换背景: ${nextBg.name} (${currentRole}角色)`);

    applyBackground(nextBg);
    window.currentBgIndex = nextIndex;

    // 显示轮换提示
    showAutoRotationTip(nextBg.name);
}

// 获取当前用户角色
function getCurrentUserRole() {
    // 根据当前显示的界面判断角色
    const container = document.querySelector('.app-container');
    if (!container) return 'general';

    const content = container.innerHTML;
    if (content.includes('admin-style') || content.includes('用户管理') || content.includes('系统统计')) {
        return 'admin';
    } else if (content.includes('employee-style') || content.includes('预订管理')) {
        return 'employee';
    } else if (content.includes('customer-style') || content.includes('搜索可用会议室')) {
        return 'customer';
    }
    return 'general';
}

// 获取指定角色的背景图
function getBackgroundsForRole(role) {
    if (!window.backgroundsByRole) return window.allBackgrounds || [];

    const roleBgs = window.backgroundsByRole[role] || [];
    const generalBgs = window.backgroundsByRole.general || [];
    const mainBgs = window.backgroundsByRole.main || [];

    // 优先使用角色专属背景，然后是通用背景，最后是主背景
    return [...roleBgs, ...generalBgs, ...mainBgs];
}

// 应用背景图
function applyBackground(background) {
    document.body.style.backgroundImage = `
        linear-gradient(135deg, rgba(102, 126, 234, 0.7) 0%, rgba(118, 75, 162, 0.7) 50%, rgba(240, 147, 251, 0.7) 100%),
        url('${background.path}')
    `;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundAttachment = 'fixed';
}

// 显示自动轮换提示
function showAutoRotationTip(imageName) {
    const tip = document.createElement('div');
    tip.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(255, 107, 157, 0.95);
        color: white;
        padding: 15px 20px;
        border-radius: 12px;
        font-size: 0.9rem;
        font-weight: 600;
        z-index: 10000;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        animation: autoTipSlideIn 3s ease-in-out forwards;
    `;
    tip.innerHTML = `🔄 自动切换背景: ${imageName}`;

    document.body.appendChild(tip);

    // 添加动画样式
    const style = document.createElement('style');
    style.textContent = `
        @keyframes autoTipSlideIn {
            0% { opacity: 0; transform: translateX(100%); }
            10%, 90% { opacity: 1; transform: translateX(0); }
            100% { opacity: 0; transform: translateX(100%); }
        }
    `;
    document.head.appendChild(style);

    setTimeout(() => {
        if (tip.parentNode) tip.parentNode.removeChild(tip);
        if (style.parentNode) style.parentNode.removeChild(style);
    }, 3000);
}

// 创建高级图片切换器
function createAdvancedImageSwitcher(images) {
    const backgrounds = images.filter(img => img.type === 'background');
    const decorations = images.filter(img => img.type === 'decoration');

    if (backgrounds.length === 0 && decorations.length === 0) return;

    const switcher = document.createElement('div');
    switcher.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        border-radius: 15px;
        padding: 15px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        display: flex;
        flex-direction: column;
        gap: 10px;
        min-width: 200px;
    `;

    let switcherHTML = `
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 5px;">
            <span style="font-size: 0.9rem; color: #666; font-weight: 600;">🎨 动漫图片控制</span>
        </div>
    `;

    // 背景图控制
    if (backgrounds.length > 0) {
        switcherHTML += `
            <div style="display: flex; gap: 8px; align-items: center;">
                <button onclick="switchRoleBackground()" style="background: linear-gradient(135deg, #ff6b9d 0%, #c44569 100%); color: white; border: none; padding: 6px 12px; border-radius: 8px; cursor: pointer; font-size: 0.75rem; font-weight: 600;">
                    🖼️ 切换背景 (${backgrounds.length})
                </button>
                <button onclick="toggleAutoRotation()" id="autoRotationBtn" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; border: none; padding: 6px 12px; border-radius: 8px; cursor: pointer; font-size: 0.75rem; font-weight: 600;">
                    🔄 自动轮换
                </button>
            </div>
        `;
    }

    // 装饰图控制
    if (decorations.length > 0) {
        switcherHTML += `
            <div style="display: flex; gap: 8px; align-items: center;">
                <button onclick="toggleDecorations()" id="decorationBtn" style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); color: white; border: none; padding: 6px 12px; border-radius: 8px; cursor: pointer; font-size: 0.75rem; font-weight: 600;">
                    ✨ 装饰图 (${decorations.length})
                </button>
                <button onclick="refreshDecorations()" style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); color: white; border: none; padding: 6px 12px; border-radius: 8px; cursor: pointer; font-size: 0.75rem; font-weight: 600;">
                    🔄 重新排列
                </button>
            </div>
        `;
    }

    switcher.innerHTML = switcherHTML;
    document.body.appendChild(switcher);

    // 初始化状态
    window.autoRotationEnabled = true;
    window.decorationsVisible = true;

    console.log(`✨ 创建了高级图片切换器 - 背景:${backgrounds.length} 装饰:${decorations.length}`);
}

// 切换角色背景
function switchRoleBackground() {
    const currentRole = getCurrentUserRole();
    const availableBgs = getBackgroundsForRole(currentRole);

    if (availableBgs.length <= 1) {
        showImageAppliedTip('只有一张背景图');
        return;
    }

    const currentIndex = window.currentBgIndex || 0;
    const nextIndex = (currentIndex + 1) % availableBgs.length;
    const nextBg = availableBgs[nextIndex];

    console.log(`🔄 手动切换背景: ${nextBg.name} (${currentRole}角色)`);

    applyBackground(nextBg);
    window.currentBgIndex = nextIndex;
    window.lastRoleChange = Date.now(); // 重置自动轮换计时器

    showImageAppliedTip(nextBg.name);
}

// 切换自动轮换
function toggleAutoRotation() {
    window.autoRotationEnabled = !window.autoRotationEnabled;
    const btn = document.getElementById('autoRotationBtn');

    if (window.autoRotationEnabled) {
        btn.style.background = 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
        btn.innerHTML = '🔄 自动轮换';
        showImageAppliedTip('自动轮换已开启');
        window.lastRoleChange = Date.now(); // 重置计时器
    } else {
        btn.style.background = 'linear-gradient(135deg, #666 0%, #999 100%)';
        btn.innerHTML = '⏸️ 已暂停';
        showImageAppliedTip('自动轮换已关闭');
    }

    console.log(`🔄 自动轮换: ${window.autoRotationEnabled ? '开启' : '关闭'}`);
}

// 切换装饰图显示
function toggleDecorations() {
    window.decorationsVisible = !window.decorationsVisible;
    const btn = document.getElementById('decorationBtn');
    const decorations = document.querySelectorAll('.floating-image-decoration');

    if (window.decorationsVisible) {
        btn.style.background = 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)';
        btn.innerHTML = `✨ 装饰图 (${decorations.length})`;
        decorations.forEach(decor => {
            decor.style.display = 'block';
        });
        showImageAppliedTip('装饰图已显示');
    } else {
        btn.style.background = 'linear-gradient(135deg, #666 0%, #999 100%)';
        btn.innerHTML = '👻 已隐藏';
        decorations.forEach(decor => {
            decor.style.display = 'none';
        });
        showImageAppliedTip('装饰图已隐藏');
    }

    console.log(`✨ 装饰图显示: ${window.decorationsVisible ? '开启' : '关闭'}`);
}

// 重新排列装饰图
function refreshDecorations() {
    const decorations = document.querySelectorAll('.floating-image-decoration');

    decorations.forEach((decor, index) => {
        // 随机新位置
        const positions = [
            { top: Math.random() * 20 + 5 + '%', right: Math.random() * 10 + 2 + '%' },
            { top: Math.random() * 20 + 15 + '%', left: Math.random() * 10 + 2 + '%' },
            { bottom: Math.random() * 20 + 10 + '%', right: Math.random() * 10 + 2 + '%' },
            { bottom: Math.random() * 20 + 20 + '%', left: Math.random() * 10 + 2 + '%' },
            { top: Math.random() * 20 + 40 + '%', right: Math.random() * 5 + 1 + '%' },
            { top: Math.random() * 20 + 55 + '%', left: Math.random() * 5 + 1 + '%' }
        ];

        const newPos = positions[index % positions.length];

        // 重置位置
        decor.style.top = 'auto';
        decor.style.bottom = 'auto';
        decor.style.left = 'auto';
        decor.style.right = 'auto';

        Object.assign(decor.style, newPos);

        // 添加重新排列动画
        decor.style.animation = `decorationReposition 0.8s ease-out, decorationFloat${index} ${6 + index * 2}s ease-in-out infinite 0.8s`;
    });

    // 添加重新排列动画样式
    if (!document.getElementById('repositionStyle')) {
        const style = document.createElement('style');
        style.id = 'repositionStyle';
        style.textContent = `
            @keyframes decorationReposition {
                0% { transform: scale(1) rotate(0deg); }
                50% { transform: scale(1.2) rotate(180deg); }
                100% { transform: scale(1) rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }

    showImageAppliedTip('装饰图已重新排列');
    console.log('🔄 装饰图重新排列完成');
}

// 添加默认动漫装饰（当没有图片时）
function addDefaultAnimeDecorations() {
    console.log('🎨 添加默认动漫装饰元素...');

    // 创建浮动的心形和星星装饰
    const decorations = [
        { emoji: '💖', class: 'heart', top: '15%', right: '10%' },
        { emoji: '✨', class: 'star', top: '25%', left: '8%' },
        { emoji: '🌟', class: 'star', bottom: '20%', right: '12%' },
        { emoji: '💫', class: 'star', bottom: '30%', left: '5%' },
        { emoji: '🎀', class: 'heart', top: '40%', right: '5%' },
        { emoji: '🌸', class: 'heart', top: '60%', left: '3%' }
    ];

    decorations.forEach((decoration, index) => {
        setTimeout(() => {
            createDefaultDecoration(decoration, index);
        }, index * 500); // 延迟出现，增加动感
    });

    // 添加动漫风格的页面装饰
    addAnimePageDecorations();
}

// 创建默认装饰元素
function createDefaultDecoration(decoration, index) {
    const element = document.createElement('div');
    element.className = `anime-decoration ${decoration.class}`;
    element.textContent = decoration.emoji;

    // 设置位置
    Object.keys(decoration).forEach(key => {
        if (['top', 'bottom', 'left', 'right'].includes(key)) {
            element.style[key] = decoration[key];
        }
    });

    // 添加随机的延迟动画
    element.style.animationDelay = `${index * 0.5}s`;

    document.body.appendChild(element);
}

// 添加动漫风格的页面装饰
function addAnimePageDecorations() {
    // 为页面标题添加动漫装饰
    const header = document.querySelector('.header h1');
    if (header) {
        // 在标题前后添加装饰
        const beforeDecor = document.createElement('span');
        beforeDecor.textContent = '🌟 ';
        beforeDecor.style.animation = 'starTwinkle 2s ease-in-out infinite';

        const afterDecor = document.createElement('span');
        afterDecor.textContent = ' 🌟';
        afterDecor.style.animation = 'starTwinkle 2s ease-in-out infinite 1s';

        header.insertBefore(beforeDecor, header.firstChild);
        header.appendChild(afterDecor);
    }

    // 为卡片添加动漫风格的边框装饰
    addCardDecorations();
}

// 为卡片添加装饰
function addCardDecorations() {
    const style = document.createElement('style');
    style.textContent = `
        .card::before {
            content: '✨';
            position: absolute;
            top: -5px;
            right: -5px;
            font-size: 1.2rem;
            animation: starTwinkle 3s ease-in-out infinite;
            z-index: 10;
        }

        .card:nth-child(even)::before {
            content: '💫';
            animation-delay: 1s;
        }

        .card:nth-child(3n)::before {
            content: '🌟';
            animation-delay: 2s;
        }

        .card-header::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%);
            animation: shimmer 3s ease-in-out infinite;
            pointer-events: none;
        }

        @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
    `;
    document.head.appendChild(style);
}

// 添加账号切换器
function addAccountSwitcher() {
    console.log('开始添加账号切换器...');

    // 先获取所有系统用户
    loadAllSystemUsers().then(() => {
                const switcherHtml = `
            <div id="accountSwitcher" style="position: fixed; top: 20px; right: 20px; z-index: 1000;">
                <div style="background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(20px); border-radius: 16px; padding: 20px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); min-width: 350px; max-height: 80vh; overflow-y: auto;">
                    <h4 style="margin: 0 0 15px 0; color: #2c3e50; display: flex; align-items: center; gap: 10px;">
                        <i class="fas fa-star"></i> 角色切换 ✨
                        <span style="font-size: 0.8rem; background: linear-gradient(135deg, #ff6b9d 0%, #c44569 100%); color: white; padding: 4px 8px; border-radius: 12px;">萌萌模式</span>
                    </h4>

                    <!-- 角色类型选择 -->
                    <div id="roleTypeSelection" style="display: grid; gap: 15px;">
                        ${Object.keys(animeRoleTypes).map(roleType => {
                            const roleInfo = animeRoleTypes[roleType];
                            const userCount = getUserCountByRole(roleType);
                            return `
                                <button onclick="showRoleAccounts('${roleType}')"
                                        style="display: flex; align-items: center; gap: 15px; padding: 18px; border: 2px solid #e1e8ed; border-radius: 16px; background: ${roleInfo.bgColor}; cursor: pointer; transition: all 0.3s ease; text-align: left; width: 100%; color: white; position: relative; overflow: hidden;">
                                    <div style="position: absolute; top: -50%; right: -50%; width: 200%; height: 200%; background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%); animation: shimmer 3s infinite;"></div>
                                    <div style="font-size: 2.5rem; z-index: 1;">${roleInfo.avatar}</div>
                                    <div style="flex: 1; z-index: 1;">
                                        <div style="font-weight: 700; margin-bottom: 6px; font-size: 1.1rem;">${roleInfo.name}</div>
                                        <div style="font-size: 0.85rem; opacity: 0.9; margin-bottom: 6px; font-style: italic;">${roleInfo.animeTitle}</div>
                                        <div style="font-size: 0.75rem; opacity: 0.8; background: rgba(255,255,255,0.2); padding: 4px 8px; border-radius: 8px; display: inline-block;">
                                            "${roleInfo.catchphrase}"
                                        </div>
                                    </div>
                                    <div style="background: rgba(255,255,255,0.3); color: white; padding: 8px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 600; z-index: 1; backdrop-filter: blur(10px);">
                                        ${userCount} 个账号
                                    </div>
                                </button>
                            `;
                        }).join('')}
                    </div>

                    <!-- 具体账号选择（初始隐藏） -->
                    <div id="accountSelection" style="display: none;">
                        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px;">
                            <button onclick="showRoleTypeSelection()" style="background: rgba(108, 117, 125, 0.1); border: 1px solid #6c757d; color: #6c757d; padding: 8px 12px; border-radius: 8px; cursor: pointer; font-size: 0.9rem;">
                                <i class="fas fa-arrow-left"></i> 返回
                            </button>
                            <h5 id="selectedRoleTitle" style="margin: 0; color: #2c3e50; flex: 1;"></h5>
                        </div>
                        <div id="accountList" style="display: grid; gap: 10px; max-height: 400px; overflow-y: auto;">
                            <!-- 动态生成账号列表 -->
                        </div>
                    </div>

                    <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #e1e8ed;">
                        <button onclick="toggleAccountSwitcher()" style="width: 100%; background: linear-gradient(135deg, #95a5a6 0%, #7f8c8d 100%); color: white; border: none; padding: 12px; border-radius: 10px; font-weight: 600; cursor: pointer; transition: all 0.3s ease;">
                            <i class="fas fa-eye-slash"></i> 隐藏切换器
                        </button>
                    </div>
                </div>
            </div>
        `;

        console.log('生成的HTML:', switcherHtml);
        document.body.insertAdjacentHTML('beforeend', switcherHtml);
        console.log('账号切换器已添加到页面');

        // 添加显示/隐藏切换器的按钮
        const toggleButton = `
            <button id="showSwitcherBtn" onclick="toggleAccountSwitcher()"
                    style="position: fixed; top: 20px; right: 20px; z-index: 999; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; padding: 15px; border-radius: 50%; width: 60px; height: 60px; cursor: pointer; box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3); transition: all 0.3s ease; display: none;">
                <i class="fas fa-users" style="font-size: 1.2rem;"></i>
            </button>
        `;

        document.body.insertAdjacentHTML('beforeend', toggleButton);
        console.log('切换按钮已添加到页面');
    }).catch(error => {
        console.error('加载用户数据失败:', error);
        // 即使加载失败也显示基本的切换器
        const basicSwitcherHtml = `
            <div id="accountSwitcher" style="position: fixed; top: 20px; right: 20px; z-index: 1000;">
                <div style="background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(20px); border-radius: 16px; padding: 20px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); min-width: 300px;">
                    <h4 style="margin: 0 0 15px 0; color: #2c3e50;">⚠️ 角色切换器加载失败</h4>
                    <p style="color: #666; margin-bottom: 15px;">无法加载系统用户数据，请刷新页面重试。</p>
                    <button onclick="toggleAccountSwitcher()" style="width: 100%; background: linear-gradient(135deg, #95a5a6 0%, #7f8c8d 100%); color: white; border: none; padding: 12px; border-radius: 10px; font-weight: 600; cursor: pointer;">
                        关闭
                    </button>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', basicSwitcherHtml);
    });
}

// 加载所有系统用户
async function loadAllSystemUsers() {
    try {
        console.log('开始加载系统用户...');
        const response = await fetch('/api/user/all');
        const result = await response.json();

        if (result.code === 200) {
            allSystemUsers = result.data;
            console.log('加载到的系统用户:', allSystemUsers);
            return allSystemUsers;
        } else {
            throw new Error(result.message || '获取用户列表失败');
        }
    } catch (error) {
        console.error('加载系统用户失败:', error);
        allSystemUsers = [];
        throw error;
    }
}

// 获取指定角色的用户数量
function getUserCountByRole(role) {
    return allSystemUsers.filter(user => user.role === role && user.status === 'ACTIVE').length;
}

// 显示指定角色的账号列表
function showRoleAccounts(roleType) {
    console.log('显示角色账号:', roleType);

    const roleInfo = animeRoleTypes[roleType];
    const systemUsers = allSystemUsers.filter(user => user.role === roleType && user.status === 'ACTIVE');

    // 分离特色演示账号和普通注册用户
    const animeUsers = systemUsers.filter(user => animeAccountUsernames.includes(user.username));
    const regularUsers = systemUsers.filter(user => !animeAccountUsernames.includes(user.username));

    // 隐藏角色类型选择，显示账号选择
    document.getElementById('roleTypeSelection').style.display = 'none';
    document.getElementById('accountSelection').style.display = 'block';

    // 设置标题
    document.getElementById('selectedRoleTitle').innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 1.5rem;">${roleInfo.avatar}</span>
            <span>${roleInfo.name} - 选择账号</span>
        </div>
    `;

    // 生成账号列表
    const accountListHtml = [];

    // 添加二次元演示账号
    if (animeUsers.length > 0) {
        accountListHtml.push(`
            <div style="margin-bottom: 15px;">
                <h6 style="color: #6c757d; margin: 0 0 10px 0; font-size: 0.9rem; display: flex; align-items: center; gap: 5px;">
                    <i class="fas fa-star"></i> 特色演示账号
                </h6>
                ${animeUsers.map(user => createAccountButton(user, true)).join('')}
            </div>
        `);
    }

    // 添加普通注册用户
    if (regularUsers.length > 0) {
        accountListHtml.push(`
            <div style="margin-bottom: 15px;">
                <h6 style="color: #6c757d; margin: 0 0 10px 0; font-size: 0.9rem; display: flex; align-items: center; gap: 5px;">
                    <i class="fas fa-users"></i> 注册用户
                </h6>
                ${regularUsers.map(user => createAccountButton(user, false)).join('')}
            </div>
        `);
    }

    if (accountListHtml.length === 0) {
        accountListHtml.push(`
            <div style="text-align: center; padding: 20px; color: #666;">
                <i class="fas fa-user-slash" style="font-size: 2rem; margin-bottom: 10px; opacity: 0.5;"></i>
                <p>该角色暂无可用账号</p>
            </div>
        `);
    }

    document.getElementById('accountList').innerHTML = accountListHtml.join('');
}

// 创建账号按钮
function createAccountButton(user, isAnime) {
    const roleInfo = animeRoleTypes[user.role];
    const displayName = user.name || user.username;
    const username = user.username;

    // 特色账号使用特定密码，普通账号使用默认密码
    const password = isAnime ? getAnimeAccountPassword(username) : '123456';

    return `
        <button onclick="switchToAccount('${username}', '${password}')"
                style="display: flex; align-items: center; gap: 12px; padding: 15px; border: 1px solid #e1e8ed; border-radius: 12px; background: white; cursor: pointer; transition: all 0.3s ease; text-align: left; width: 100%; margin-bottom: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);"
                onmouseover="this.style.borderColor='${roleInfo.bgColor.match(/#[a-fA-F0-9]{6}/)[0]}'; this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.15)';"
                onmouseout="this.style.borderColor='#e1e8ed'; this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 4px rgba(0,0,0,0.05)';">
            <div style="width: 40px; height: 40px; border-radius: 50%; background: ${roleInfo.bgColor}; display: flex; align-items: center; justify-content: center; font-size: 1.2rem;">
                ${roleInfo.avatar}
            </div>
            <div style="flex: 1;">
                <div style="font-weight: 600; color: #2c3e50; margin-bottom: 2px;">${displayName}</div>
                <div style="font-size: 0.85rem; color: #6c757d;">@${username}</div>
                ${user.company ? `<div style="font-size: 0.8rem; color: #6c757d;">${user.company}</div>` : ''}
            </div>
            <div style="background: ${roleInfo.bgColor}; color: white; padding: 4px 8px; border-radius: 6px; font-size: 0.75rem; font-weight: 600;">
                ${isAnime ? '特色' : '注册'}
            </div>
        </button>
    `;
}

// 获取特色账号的密码
function getAnimeAccountPassword(username) {
    const passwordMap = {
        'admin': 'admin123',
        'employee': 'emp123',
        'customer': 'cust123'
    };
    return passwordMap[username] || '123456';
}

// 返回角色类型选择
function showRoleTypeSelection() {
    document.getElementById('accountSelection').style.display = 'none';
    document.getElementById('roleTypeSelection').style.display = 'grid';
}

// 切换到指定账号
async function switchToAccount(username, password) {
    console.log('切换到账号:', username);

    try {
        const response = await fetch('/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        const result = await response.json();
        console.log('登录结果:', result);

        if (result.code === 200) {
            currentUser = result.data;
            console.log('登录成功，当前用户:', currentUser);

            // 显示切换成功提示
            const roleInfo = animeRoleTypes[currentUser.role];
            showSwitchSuccess({
                ...currentUser,
                avatar: roleInfo.avatar,
                catchphrase: roleInfo.catchphrase,
                bgColor: roleInfo.bgColor
            });

            // 隐藏切换器
            toggleAccountSwitcher();

            // 更新界面
            setTimeout(() => {
                updateUserInterface();
            }, 1000);
        } else {
            console.error('登录失败:', result.message);
            alert('切换失败：' + result.message);
        }
    } catch (error) {
        console.error('请求异常:', error);
        alert('切换失败：' + error.message);
    }
}

// 兼容旧的快速切换函数（保留以防其他地方调用）
async function quickSwitchAccount(username) {
    console.log('调用旧的quickSwitchAccount函数，重定向到新函数');
    const password = getAnimeAccountPassword(username);
    await switchToAccount(username, password);
}

// 显示切换成功提示 - 二次元版
function showSwitchSuccess(account) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: ${account.bgColor};
        color: white;
        padding: 30px 40px;
        border-radius: 20px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        font-size: 1.2rem;
        font-weight: 600;
        text-align: center;
        animation: switchToast 0.5s ease-out;
        border: 3px solid rgba(255, 255, 255, 0.3);
        backdrop-filter: blur(10px);
        position: relative;
        overflow: hidden;
    `;

    toast.innerHTML = `
        <div style="position: absolute; top: -50%; right: -50%; width: 200%; height: 200%; background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%); animation: shimmer 3s infinite;"></div>
        <div style="display: flex; align-items: center; gap: 20px; position: relative; z-index: 1;">
            <div style="font-size: 3rem; animation: bounce 0.6s ease-in-out;">${account.avatar}</div>
            <div>
                <div style="margin-bottom: 8px; font-size: 1.3rem;">🎉 角色切换成功！</div>
                <div style="font-size: 1rem; opacity: 0.9; margin-bottom: 6px;">欢迎回来，${account.name}！</div>
                <div style="font-size: 0.85rem; opacity: 0.8; font-style: italic; background: rgba(255,255,255,0.2); padding: 6px 12px; border-radius: 12px;">
                    "${account.catchphrase}"
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(toast);

    // 3秒后自动移除
    setTimeout(() => {
        toast.style.animation = 'switchToastOut 0.3s ease-in forwards';
        setTimeout(() => {
            if (document.body.contains(toast)) {
                document.body.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// 切换账号切换器显示/隐藏
function toggleAccountSwitcher() {
    console.log('toggleAccountSwitcher被调用');
    const switcher = document.getElementById('accountSwitcher');
    const showBtn = document.getElementById('showSwitcherBtn');

    console.log('切换器元素:', switcher);
    console.log('显示按钮元素:', showBtn);

    if (switcher.style.display === 'none') {
        switcher.style.display = 'block';
        showBtn.style.display = 'none';
        // 添加显示动画
        switcher.style.animation = 'fadeIn 0.3s ease-out';
        console.log('显示切换器');
    } else {
        switcher.style.display = 'none';
        showBtn.style.display = 'block';
        // 添加显示动画
        showBtn.style.animation = 'fadeIn 0.3s ease-out';
        console.log('隐藏切换器');
    }
}

// 测试函数 - 验证按钮点击是否工作
function testButtonClick() {
    console.log('测试按钮点击功能');
    alert('按钮点击测试成功！');
}

// 显示切换器使用提示
function showSwitcherTip() {
    setTimeout(() => {
        const tip = document.createElement('div');
        tip.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            border-radius: 16px;
            box-shadow: 0 15px 35px rgba(102, 126, 234, 0.4);
            z-index: 9999;
            max-width: 300px;
            animation: fadeIn 0.5s ease-out;
        `;

        tip.innerHTML = `
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                <i class="fas fa-star" style="font-size: 1.5rem; animation: bounce 1s infinite;"></i>
                <strong>✨ 二次元提示 ✨</strong>
            </div>
            <div style="margin-bottom: 15px; line-height: 1.5;">
                右上角有超可爱的角色切换功能哦！(｡♥‿♥｡)<br>
                可以快速体验不同角色的萌萌功能呢～
            </div>
            <button onclick="this.parentElement.remove()" style="background: rgba(255,255,255,0.2); color: white; border: none; padding: 10px 20px; border-radius: 12px; cursor: pointer; font-weight: 600; transition: all 0.3s ease;">
                知道了呢！(≧∇≦)ﾉ
            </button>
        `;

        document.body.appendChild(tip);

        // 5秒后自动消失
        setTimeout(() => {
            if (tip.parentElement) {
                tip.style.animation = 'fadeOut 0.3s ease-in forwards';
                setTimeout(() => {
                    if (tip.parentElement) {
                        tip.remove();
                    }
                }, 300);
            }
        }, 5000);
    }, 2000); // 登录后2秒显示提示
}

function toggleCustomerFields() {
    const role = document.getElementById('regRole').value;
    const companyField = document.getElementById('companyField');
    const phoneField = document.getElementById('phoneField');

    if (role === 'CUSTOMER') {
        companyField.style.display = 'block';
        phoneField.style.display = 'block';
    } else {
        companyField.style.display = 'none';
        phoneField.style.display = 'none';
    }
}

function showResult(elementId, message, isSuccess = true) {
    const element = document.getElementById(elementId);
    element.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <i class="fas fa-${isSuccess ? 'check-circle' : 'exclamation-triangle'}"></i>
            <span>${message}</span>
        </div>
    `;
    element.className = 'result ' + (isSuccess ? 'success' : 'error');
    element.style.display = 'block';

    // 添加淡入动画
    element.style.opacity = '0';
    element.style.transform = 'translateY(10px)';
    setTimeout(() => {
        element.style.transition = 'all 0.3s ease';
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }, 10);
}

function updateUserInterface() {
    if (currentUser) {
        document.getElementById('currentUser').style.display = 'flex';
        document.getElementById('userName').textContent = currentUser.name;
        document.getElementById('userRole').textContent = getRoleText(currentUser.role);

        // 设置用户头像
        const avatar = document.getElementById('userAvatar');
        avatar.textContent = currentUser.name.charAt(0).toUpperCase();

        // 隐藏登录注册表单
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('registerSection').style.display = 'none';

        // 根据角色显示不同功能
        showRoleSpecificUI();

        // 显示账号切换提示（仅首次登录时）
        if (!localStorage.getItem('switcherTipShown')) {
            showSwitcherTip();
            localStorage.setItem('switcherTipShown', 'true');
        }
    } else {
        document.getElementById('currentUser').style.display = 'none';
        document.getElementById('loginSection').style.display = 'block';
        document.getElementById('registerSection').style.display = 'block';
        hideAllRoleUI();
    }
}

function getRoleText(role) {
    const roleMap = {
        'ADMIN': '👑 管理员',
        'EMPLOYEE': '👔 员工',
        'CUSTOMER': '👤 客户'
    };
    return roleMap[role] || role;
}

function getRoleInfo(role) {
    const roleInfoMap = {
        'ADMIN': {
            icon: '👑',
            text: '管理员',
            color: '#dc3545',
            gradient: 'linear-gradient(135deg, #dc3545, #c82333)'
        },
        'EMPLOYEE': {
            icon: '👔',
            text: '员工',
            color: '#17a2b8',
            gradient: 'linear-gradient(135deg, #17a2b8, #138496)'
        },
        'CUSTOMER': {
            icon: '👤',
            text: '客户',
            color: '#28a745',
            gradient: 'linear-gradient(135deg, #28a745, #1e7e34)'
        }
    };
    return roleInfoMap[role] || {
        icon: '❓',
        text: '未知',
        color: '#6c757d',
        gradient: 'linear-gradient(135deg, #6c757d, #5a6268)'
    };
}

function showRoleSpecificUI() {
    // 移除现有的功能卡片
    const existingCards = document.querySelectorAll('.role-card');
    existingCards.forEach(card => card.remove());

    const grid = document.querySelector('.grid');

    if (currentUser.role === 'ADMIN') {
        showAdminUI(grid);
    } else if (currentUser.role === 'EMPLOYEE') {
        showEmployeeUI(grid);
    } else if (currentUser.role === 'CUSTOMER') {
        showCustomerUI(grid);
    }
}

function hideAllRoleUI() {
    const existingCards = document.querySelectorAll('.role-card');
    existingCards.forEach(card => card.remove());
}

function showAdminUI(grid) {
    const adminCards = `
        <!-- 用户管理 -->
        <div class="card fade-in role-card">
            <div class="card-header admin-style">
                <h3><i class="fas fa-crown"></i> 🎀 用户管理</h3>
            </div>
            <div class="card-body">
                <div style="display: flex; flex-direction: column; gap: 15px;">
                    <button onclick="getAllUsers()" class="btn btn-primary">
                        <i class="fas fa-users"></i> 👥 查看所有用户
                    </button>
                    <button onclick="getPendingUsers()" class="btn btn-warning">
                        <i class="fas fa-hourglass-half"></i> ⏳ 待审核用户
                    </button>
                </div>
                <div class="result" id="userManagementResult"></div>
            </div>
        </div>

        <!-- 会议室管理 -->
        <div class="card fade-in role-card">
            <div class="card-header room-style">
                <h3><i class="fas fa-castle"></i> 🏰 会议室管理</h3>
            </div>
            <div class="card-body">
                <div style="display: flex; flex-direction: column; gap: 15px;">
                    <button onclick="showRoomTimeline()" class="btn btn-primary">
                        <i class="fas fa-magic"></i> ✨ 时间轴魔法
                    </button>
                    <button onclick="getAllRooms()" class="btn btn-success">
                        <i class="fas fa-castle"></i> 🏰 管理会议室
                    </button>
                    <button onclick="showAddRoomForm()" class="btn btn-secondary">
                        <i class="fas fa-sparkles"></i> 🌟 创建新房间
                    </button>
                </div>
                <div class="result" id="roomManagementResult"></div>
            </div>
        </div>

        <!-- 系统统计 -->
        <div class="card fade-in role-card">
            <div class="card-header admin-style">
                <h3><i class="fas fa-chart-line"></i> 📊 系统统计</h3>
            </div>
            <div class="card-body">
                <div style="display: flex; flex-direction: column; gap: 15px;">
                    <button onclick="getSystemStatistics()" class="btn btn-primary">
                        <i class="fas fa-chart-line"></i> 系统统计
                    </button>
                    <button onclick="getTodayStatistics()" class="btn btn-success">
                        <i class="fas fa-calendar-day"></i> 今日统计
                    </button>
                </div>
                <div class="result" id="statisticsResult"></div>
            </div>
        </div>
    `;
    grid.insertAdjacentHTML('beforeend', adminCards);
}

function showEmployeeUI(grid) {
    const employeeCards = `
        <!-- 预订管理 -->
        <div class="card fade-in role-card">
            <div class="card-header employee-style">
                <h3><i class="fas fa-calendar-heart"></i> 🌸 预订管理</h3>
            </div>
            <div class="card-body">
                <div style="display: flex; flex-direction: column; gap: 15px;">
                    <button onclick="getAllBookings()" class="btn btn-primary">
                        <i class="fas fa-list"></i> 查看所有预订
                    </button>
                    <button onclick="getPendingCancellations()" class="btn btn-warning">
                        <i class="fas fa-exclamation-triangle"></i> 待审核取消申请
                    </button>
                </div>
                <div class="result" id="bookingManagementResult"></div>
            </div>
        </div>

        <!-- 会议室状态 -->
        <div class="card fade-in role-card">
            <div class="card-header timeline-style">
                <h3><i class="fas fa-home-heart"></i> 🏠 会议室状态</h3>
            </div>
            <div class="card-body">
                <div style="display: flex; flex-direction: column; gap: 15px;">
                    <button onclick="showRoomTimeline()" class="btn btn-primary">
                        <i class="fas fa-chart-line"></i> ✨ 时间轴魔法
                    </button>
                    <button onclick="getAllRooms()" class="btn btn-success">
                        <i class="fas fa-eye"></i> 🔍 查看房间状态
                    </button>
                    <button onclick="showRoomStatusManagement()" class="btn btn-secondary">
                        <i class="fas fa-cogs"></i> ⚙️ 状态管理
                    </button>
                </div>
                <div class="result" id="employeeResult"></div>
            </div>
        </div>
    `;
    grid.insertAdjacentHTML('beforeend', employeeCards);
}

function showCustomerUI(grid) {
    const customerCards = `
        <!-- 搜索会议室 -->
        <div class="card fade-in role-card">
            <div class="card-header customer-style">
                <h3><i class="fas fa-search-heart"></i> 🎵 搜索可用会议室</h3>
            </div>
            <div class="card-body">
                <div style="background: rgba(255, 193, 7, 0.1); padding: 15px; border-radius: 8px; margin-bottom: 20px; border: 1px solid rgba(255, 193, 7, 0.2);">
                    <div style="display: flex; align-items: center; gap: 10px; color: #856404;">
                        <i class="fas fa-clock"></i>
                        <span style="font-weight: 600;">营业时间：每日 8:00 - 21:00，只能预订整点时间</span>
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label">开始时间 <span style="color: #666; font-size: 0.9rem;">(8:00-20:00)</span></label>
                    <input type="datetime-local" class="form-input hour-only-input" id="searchStartTime" step="3600">
                </div>
                <div class="form-group">
                    <label class="form-label">结束时间 <span style="color: #666; font-size: 0.9rem;">(9:00-21:00)</span></label>
                    <input type="datetime-local" class="form-input hour-only-input" id="searchEndTime" step="3600">
                </div>
                <div class="form-group">
                    <label class="form-label">最少座位数</label>
                    <input type="number" class="form-input" id="searchCapacity" min="1" placeholder="请输入最少座位数">
                </div>
                <div class="checkbox-group">
                    <input type="checkbox" class="checkbox" id="needProjector">
                    <label>需要投影仪</label>
                </div>
                <div class="checkbox-group">
                    <input type="checkbox" class="checkbox" id="needSound">
                    <label>需要音响</label>
                </div>
                <div class="checkbox-group">
                    <input type="checkbox" class="checkbox" id="needNetwork">
                    <label>需要网络</label>
                </div>
                <button onclick="searchRooms()" class="btn btn-primary btn-full">
                    <i class="fas fa-search"></i> 🔍 寻找理想房间
                </button>
                <div class="result" id="searchResult"></div>
            </div>
        </div>

        <!-- 我的预订 -->
        <div class="card fade-in role-card">
            <div class="card-header booking-style">
                <h3><i class="fas fa-heart"></i> 💖 我的预订</h3>
            </div>
            <div class="card-body">
                <button onclick="getMyBookings()" class="btn btn-success btn-full">
                    <i class="fas fa-refresh"></i> 📋 查看我的预订
                </button>
                <div class="result" id="myBookingsResult"></div>

                <div class="form-group" style="margin-top: 25px;">
                    <label class="form-label">支付预订</label>
                    <select class="form-select" id="paymentBookingId">
                        <option value="">请先查看我的预订</option>
                    </select>
                </div>
                <button onclick="payBooking()" class="btn btn-warning btn-full">
                    <i class="fas fa-credit-card"></i> 💳 完成支付
                </button>
                <div class="result" id="paymentResult"></div>
            </div>
        </div>

        <!-- 取消申请 -->
        <div class="card fade-in role-card">
            <div class="card-header customer-style">
                <h3><i class="fas fa-sad-tear"></i> 😢 取消申请</h3>
            </div>
            <div class="card-body">
                <div style="background: rgba(255, 193, 7, 0.1); padding: 15px; border-radius: 8px; margin-bottom: 20px; border: 1px solid rgba(255, 193, 7, 0.2);">
                    <div style="display: flex; align-items: center; gap: 10px; color: #856404;">
                        <i class="fas fa-info-circle"></i>
                        <span style="font-weight: 600;">注意：只有已支付的预订才能申请取消</span>
                    </div>
                    <div style="margin-top: 8px; font-size: 0.9rem; color: #856404;">
                        刚创建的预订需要先完成支付，才能申请取消
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label">选择要取消的预订</label>
                    <select class="form-select" id="cancellationBookingId">
                        <option value="">请先查看我的预订</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">取消原因</label>
                    <textarea class="form-input" id="cancellationReason" placeholder="请输入取消原因" rows="3" style="resize: vertical;"></textarea>
                </div>
                <div style="display: flex; gap: 15px;">
                    <button onclick="submitCancellation()" class="btn btn-danger" style="flex: 1;">
                        <i class="fas fa-paper-plane"></i> 提交取消申请
                    </button>
                    <button onclick="getCancellationRules()" class="btn btn-secondary" style="flex: 1;">
                        <i class="fas fa-info-circle"></i> 查看退费规则
                    </button>
                </div>
                <div style="margin-top: 20px;">
                    <button onclick="getMyCancellationRequests()" class="btn btn-primary btn-full">
                        <i class="fas fa-list"></i> 查看我的取消申请状态
                    </button>
                </div>
                <div class="result" id="cancellationResult"></div>
            </div>
        </div>
    `;
    grid.insertAdjacentHTML('beforeend', customerCards);

    // 初始化时间输入控件的默认值为整点时间
    initializeTimeInputs();
}

// 初始化时间输入控件，设置默认的整点时间
function initializeTimeInputs() {
    const now = new Date();

    // 设置开始时间为下一个整点
    const startTime = new Date(now);
    startTime.setHours(now.getHours() + 1, 0, 0, 0);

    // 设置结束时间为开始时间后2小时
    const endTime = new Date(startTime);
    endTime.setHours(startTime.getHours() + 2);

    // 格式化为datetime-local格式
    const formatDateTime = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    // 设置默认值
    setTimeout(() => {
        const startInput = document.getElementById('searchStartTime');
        const endInput = document.getElementById('searchEndTime');

        if (startInput) startInput.value = formatDateTime(startTime);
        if (endInput) endInput.value = formatDateTime(endTime);
    }, 100); // 延迟确保DOM元素已创建
}

async function login() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    if (!username || !password) {
        showResult('loginResult', '请输入用户名和密码', false);
        return;
    }

    try {
        const response = await fetch('/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        });

        const result = await response.json();
        if (result.code === 200) {
            currentUser = result.data;
            showResult('loginResult', '🎉 登录成功！');
            setTimeout(() => {
                updateUserInterface();
            }, 1000);
        } else {
            showResult('loginResult', result.message, false);
        }
    } catch (error) {
        showResult('loginResult', '登录失败：' + error.message, false);
    }
}

function logout() {
    currentUser = null;
    updateUserInterface();
    // 清空所有结果显示
    document.querySelectorAll('.result').forEach(el => el.style.display = 'none');
    showResult('loginResult', '已成功退出登录');
}

async function register() {
    const role = document.getElementById('regRole').value;
    const userData = {
        username: document.getElementById('regUsername').value,
        password: document.getElementById('regPassword').value,
        name: document.getElementById('regName').value,
        role: role
    };

    // 只有客户需要填写公司和电话
    if (role === 'CUSTOMER') {
        userData.company = document.getElementById('regCompany').value;
        userData.phone = document.getElementById('regPhone').value;

        if (!userData.company || !userData.phone) {
            showResult('registerResult', '客户注册需要填写公司名称和联系电话', false);
            return;
        }
    }

    if (!userData.username || !userData.password || !userData.name) {
        showResult('registerResult', '请填写必要信息', false);
        return;
    }

    try {
        const response = await fetch('/api/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        });

        const result = await response.json();
        if (result.code === 200) {
            showResult('registerResult', '🎉 ' + result.message);
        } else {
            showResult('registerResult', result.message, false);
        }
    } catch (error) {
        showResult('registerResult', '注册失败：' + error.message, false);
    }
}

// 会议室搜索功能
async function searchRooms() {
    const startTime = document.getElementById('searchStartTime').value;
    const endTime = document.getElementById('searchEndTime').value;
    const capacity = document.getElementById('searchCapacity').value;
    const needProjector = document.getElementById('needProjector').checked;
    const needSound = document.getElementById('needSound').checked;
    const needNetwork = document.getElementById('needNetwork').checked;

    if (!startTime || !endTime) {
        showResult('searchResult', '请选择开始时间和结束时间', false);
        return;
    }

    // 验证营业时间：8:00-21:00
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);
    const startHour = startDate.getHours();
    const endHour = endDate.getHours();

    if (startHour < 8 || startHour >= 21) {
        showResult('searchResult', '开始时间必须在营业时间内（8:00-21:00）', false);
        return;
    }

    if (endHour < 8 || endHour > 21) {
        showResult('searchResult', '结束时间必须在营业时间内（8:00-21:00）', false);
        return;
    }

    if (endDate <= startDate) {
        showResult('searchResult', '结束时间必须晚于开始时间', false);
        return;
    }

    const params = new URLSearchParams({
        startTime: startTime.replace('T', ' ') + ':00',
        endTime: endTime.replace('T', ' ') + ':00'
    });

    if (capacity) params.append('capacity', capacity);
    if (needProjector) params.append('needProjector', 'true');
    if (needSound) params.append('needSound', 'true');
    if (needNetwork) params.append('needNetwork', 'true');

    try {
        const response = await fetch(`/api/room/search?${params}`);
        const result = await response.json();

        if (result.code === 200) {
            const element = document.getElementById('searchResult');
            element.innerHTML = `
                <div style="background: rgba(79, 172, 254, 0.1); padding: 20px; border-radius: 12px; margin-bottom: 20px;">
                    <h4 style="margin: 0; color: #0066cc;">🎉 找到 ${result.data.length} 间可用会议室</h4>
                </div>
                ${createModernRoomGrid(result.data)}
            `;
            element.className = 'result success';
            element.style.display = 'block';
        } else {
            showResult('searchResult', result.message, false);
        }
    } catch (error) {
        showResult('searchResult', '搜索失败：' + error.message, false);
    }
}

// 创建现代化的会议室网格
function createModernRoomGrid(rooms) {
    if (!rooms || rooms.length === 0) {
        return '<p style="text-align: center; color: #666; padding: 20px;">暂无可用会议室</p>';
    }

    let html = '<div style="display: grid; gap: 15px; margin-top: 20px;">';

    rooms.forEach(room => {
        html += `
            <div style="background: white; border-radius: 12px; padding: 20px; border: 1px solid #e1e8ed; transition: all 0.3s ease; cursor: pointer;"
                 onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 25px rgba(0,0,0,0.1)'"
                 onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px;">
                    <h4 style="margin: 0; color: #2c3e50; font-size: 1.2rem;">🏢 ${room.name}</h4>
                    <span style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 500;">
                        ${room.type === 'CLASSROOM' ? '教室型' : '圆桌型'}
                    </span>
                </div>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 10px; margin-bottom: 15px;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <i class="fas fa-users" style="color: #667eea;"></i>
                        <span>${room.capacity}人</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <i class="fas fa-dollar-sign" style="color: #667eea;"></i>
                        <span>¥${room.pricePerHour}/小时</span>
                    </div>
                </div>
                <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                    ${room.hasProjector ? '<span style="background: rgba(102, 126, 234, 0.1); color: #667eea; padding: 4px 8px; border-radius: 6px; font-size: 0.8rem;"><i class="fas fa-video"></i> 投影仪</span>' : ''}
                    ${room.hasSound ? '<span style="background: rgba(102, 126, 234, 0.1); color: #667eea; padding: 4px 8px; border-radius: 6px; font-size: 0.8rem;"><i class="fas fa-volume-up"></i> 音响</span>' : ''}
                    ${room.hasNetwork ? '<span style="background: rgba(102, 126, 234, 0.1); color: #667eea; padding: 4px 8px; border-radius: 6px; font-size: 0.8rem;"><i class="fas fa-wifi"></i> 网络</span>' : ''}
                </div>
                <button onclick="selectRoom(${room.id}, '${room.name}')" style="width: 100%; margin-top: 15px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; padding: 10px; border-radius: 8px; font-weight: 500; cursor: pointer; transition: all 0.3s ease;"
                        onmouseover="this.style.transform='translateY(-1px)'" onmouseout="this.style.transform='translateY(0)'">
                    <i class="fas fa-calendar-plus"></i> 选择此会议室
                </button>
            </div>
        `;
    });

    html += '</div>';
    return html;
}

// 选择会议室
function selectRoom(roomId, roomName) {
    // 显示预订表单
    showBookingForm(roomId, roomName);
}

// 显示预订表单
function showBookingForm(roomId, roomName) {
    const startTime = document.getElementById('searchStartTime').value;
    const endTime = document.getElementById('searchEndTime').value;

    const element = document.getElementById('searchResult');
    element.innerHTML = `
        <div style="background: white; border-radius: 12px; padding: 25px; border: 2px solid #667eea; margin-top: 20px;">
            <h4 style="margin: 0 0 20px 0; color: #2c3e50; display: flex; align-items: center; gap: 10px;">
                <i class="fas fa-calendar-plus"></i> 预订会议室：${roomName}
            </h4>
            <div style="display: grid; gap: 15px;">
                <div style="background: rgba(255, 193, 7, 0.1); padding: 15px; border-radius: 8px; margin-bottom: 15px; border: 1px solid rgba(255, 193, 7, 0.2);">
                    <div style="display: flex; align-items: center; gap: 10px; color: #856404;">
                        <i class="fas fa-clock"></i>
                        <span style="font-weight: 600;">营业时间：每日 8:00 - 21:00，只能预订整点时间</span>
                    </div>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div>
                        <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #2c3e50;">开始时间 <span style="color: #666; font-size: 0.9rem;">(8:00-20:00)</span></label>
                        <input type="datetime-local" class="hour-only-input" id="bookingStartTime" value="${startTime}" step="3600" style="width: 100%; padding: 12px; border: 2px solid #e1e8ed; border-radius: 8px; font-size: 1rem;">
                    </div>
                    <div>
                        <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #2c3e50;">结束时间 <span style="color: #666; font-size: 0.9rem;">(9:00-21:00)</span></label>
                        <input type="datetime-local" class="hour-only-input" id="bookingEndTime" value="${endTime}" step="3600" style="width: 100%; padding: 12px; border: 2px solid #e1e8ed; border-radius: 8px; font-size: 1rem;">
                    </div>
                </div>
                <div>
                    <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #2c3e50;">参会人数</label>
                    <input type="number" id="participantCount" min="1" placeholder="请输入参会人数" style="width: 100%; padding: 12px; border: 2px solid #e1e8ed; border-radius: 8px; font-size: 1rem;">
                </div>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px;">
                    <div style="display: flex; align-items: center; gap: 10px; padding: 12px; background: rgba(102, 126, 234, 0.05); border-radius: 8px;">
                        <input type="checkbox" id="bookingNeedProjector" style="width: 18px; height: 18px;">
                        <label for="bookingNeedProjector" style="font-weight: 500;">需要投影仪</label>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px; padding: 12px; background: rgba(102, 126, 234, 0.05); border-radius: 8px;">
                        <input type="checkbox" id="bookingNeedSound" style="width: 18px; height: 18px;">
                        <label for="bookingNeedSound" style="font-weight: 500;">需要音响</label>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px; padding: 12px; background: rgba(102, 126, 234, 0.05); border-radius: 8px;">
                        <input type="checkbox" id="bookingNeedNetwork" style="width: 18px; height: 18px;">
                        <label for="bookingNeedNetwork" style="font-weight: 500;">需要网络</label>
                    </div>
                </div>
                <div style="display: flex; gap: 15px; margin-top: 10px;">
                    <button onclick="createBooking(${roomId})" style="flex: 1; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; padding: 12px; border-radius: 8px; font-weight: 600; cursor: pointer;">
                        <i class="fas fa-calendar-plus"></i> 创建预订
                    </button>
                    <button onclick="searchRooms()" style="flex: 1; background: linear-gradient(135deg, #95a5a6, #7f8c8d); color: white; border: none; padding: 12px; border-radius: 8px; font-weight: 600; cursor: pointer;">
                        <i class="fas fa-arrow-left"></i> 返回搜索
                    </button>
                </div>
            </div>
            <div class="result" id="bookingFormResult" style="margin-top: 15px;"></div>
        </div>
    `;
    element.className = 'result success';
    element.style.display = 'block';
}

// 创建预订
async function createBooking(roomId) {
    const startTime = document.getElementById('bookingStartTime').value;
    const endTime = document.getElementById('bookingEndTime').value;
    const participantCount = document.getElementById('participantCount').value;
    const needProjector = document.getElementById('bookingNeedProjector').checked;
    const needSound = document.getElementById('bookingNeedSound').checked;
    const needNetwork = document.getElementById('bookingNeedNetwork').checked;

    if (!startTime || !endTime || !participantCount) {
        showResult('bookingFormResult', '请填写完整的预订信息', false);
        return;
    }

    if (!currentUser || currentUser.role !== 'CUSTOMER') {
        showResult('bookingFormResult', '只有客户可以创建预订', false);
        return;
    }

    // 验证时间格式 - 必须为整点
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);

    if (startDate.getMinutes() !== 0 || startDate.getSeconds() !== 0) {
        showResult('bookingFormResult', '开始时间必须为整点（如：15:00, 16:00）', false);
        return;
    }

    if (endDate.getMinutes() !== 0 || endDate.getSeconds() !== 0) {
        showResult('bookingFormResult', '结束时间必须为整点（如：15:00, 16:00）', false);
        return;
    }

    if (endDate <= startDate) {
        showResult('bookingFormResult', '结束时间必须晚于开始时间', false);
        return;
    }

    // 验证营业时间：8:00-21:00
    const startHour = startDate.getHours();
    const endHour = endDate.getHours();

    if (startHour < 8 || startHour >= 21) {
        showResult('bookingFormResult', '开始时间必须在营业时间内（8:00-21:00）', false);
        return;
    }

    if (endHour < 8 || endHour > 21) {
        showResult('bookingFormResult', '结束时间必须在营业时间内（8:00-21:00）', false);
        return;
    }

    // 如果结束时间是21:00，这是允许的（最晚可以预订到21:00结束）
    if (endHour === 21 && endDate.getMinutes() > 0) {
        showResult('bookingFormResult', '最晚只能预订到21:00结束', false);
        return;
    }

    const bookingData = {
        customerId: currentUser.id,
        roomId: parseInt(roomId),
        startTime: startTime.replace('T', ' ') + ':00',
        endTime: endTime.replace('T', ' ') + ':00',
        participantCount: parseInt(participantCount),
        needProjector: needProjector,
        needSound: needSound,
        needNetwork: needNetwork
    };

    try {
        const response = await fetch('/api/booking/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingData)
        });

        const result = await response.json();
        if (result.code === 200) {
            showResult('bookingFormResult', '🎉 ' + result.message + ' 预订ID: ' + result.data);
            // 清空表单
            document.getElementById('participantCount').value = '';
            document.getElementById('bookingNeedProjector').checked = false;
            document.getElementById('bookingNeedSound').checked = false;
            document.getElementById('bookingNeedNetwork').checked = false;
        } else {
            showResult('bookingFormResult', result.message, false);
        }
    } catch (error) {
        showResult('bookingFormResult', '创建预订失败：' + error.message, false);
    }
}

// 管理员功能实现
async function getAllUsers() {
    try {
        const response = await fetch('/api/user/all');
        const result = await response.json();

        if (result.code === 200) {
            const element = document.getElementById('userManagementResult');

            // 统计各种状态的用户数量
            const stats = {
                total: result.data.length,
                active: result.data.filter(u => u.status === 'ACTIVE').length,
                pending: result.data.filter(u => u.status === 'PENDING').length,
                frozen: result.data.filter(u => u.status === 'FROZEN').length,
                admin: result.data.filter(u => u.role === 'ADMIN').length,
                employee: result.data.filter(u => u.role === 'EMPLOYEE').length,
                customer: result.data.filter(u => u.role === 'CUSTOMER').length
            };

            element.innerHTML = `
                <div style="background: rgba(79, 172, 254, 0.1); padding: 20px; border-radius: 12px; margin-bottom: 20px;">
                    <h4 style="margin: 0 0 15px 0; color: #0066cc;">👥 用户管理统计</h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px;">
                        <div style="background: white; padding: 15px; border-radius: 8px; text-align: center;">
                            <div style="font-size: 1.5rem; font-weight: bold; color: #2c3e50;">${stats.total}</div>
                            <div style="color: #666; font-size: 0.9rem;">总用户数</div>
                        </div>
                        <div style="background: white; padding: 15px; border-radius: 8px; text-align: center;">
                            <div style="font-size: 1.5rem; font-weight: bold; color: #28a745;">${stats.active}</div>
                            <div style="color: #666; font-size: 0.9rem;">激活用户</div>
                        </div>
                        <div style="background: white; padding: 15px; border-radius: 8px; text-align: center;">
                            <div style="font-size: 1.5rem; font-weight: bold; color: #ffc107;">${stats.pending}</div>
                            <div style="color: #666; font-size: 0.9rem;">待审核</div>
                        </div>
                        <div style="background: white; padding: 15px; border-radius: 8px; text-align: center;">
                            <div style="font-size: 1.5rem; font-weight: bold; color: #dc3545;">${stats.frozen}</div>
                            <div style="color: #666; font-size: 0.9rem;">已冻结</div>
                        </div>
                        <div style="background: white; padding: 15px; border-radius: 8px; text-align: center;">
                            <div style="font-size: 1.5rem; font-weight: bold; color: #6f42c1;">${stats.admin}</div>
                            <div style="color: #666; font-size: 0.9rem;">👑 管理员</div>
                        </div>
                        <div style="background: white; padding: 15px; border-radius: 8px; text-align: center;">
                            <div style="font-size: 1.5rem; font-weight: bold; color: #17a2b8;">${stats.employee}</div>
                            <div style="color: #666; font-size: 0.9rem;">👔 员工</div>
                        </div>
                        <div style="background: white; padding: 15px; border-radius: 8px; text-align: center;">
                            <div style="font-size: 1.5rem; font-weight: bold; color: #fd7e14;">${stats.customer}</div>
                            <div style="color: #666; font-size: 0.9rem;">👤 客户</div>
                        </div>
                    </div>
                </div>
                ${createUserGrid(result.data)}
            `;
            element.className = 'result success';
            element.style.display = 'block';
        } else {
            showResult('userManagementResult', result.message, false);
        }
    } catch (error) {
        showResult('userManagementResult', '获取用户列表失败：' + error.message, false);
    }
}

async function getPendingUsers() {
    try {
        const response = await fetch('/api/user/pending');
        const result = await response.json();

        if (result.code === 200) {
            const element = document.getElementById('userManagementResult');
            element.innerHTML = `
                <div style="background: rgba(255, 193, 7, 0.1); padding: 20px; border-radius: 12px; margin-bottom: 20px;">
                    <h4 style="margin: 0; color: #856404;">⏳ 共有 ${result.data.length} 个待审核用户</h4>
                </div>
                ${createPendingUserGrid(result.data)}
            `;
            element.className = 'result success';
            element.style.display = 'block';
        } else {
            showResult('userManagementResult', result.message, false);
        }
    } catch (error) {
        showResult('userManagementResult', '获取待审核用户失败：' + error.message, false);
    }
}

async function getAllRooms() {
    try {
        const response = await fetch('/api/room/all');
        const result = await response.json();

        if (result.code === 200) {
            const resultId = currentUser && currentUser.role === 'ADMIN' ? 'roomManagementResult' : 'employeeResult';
            const element = document.getElementById(resultId);

            // 统计各种状态的会议室数量
            const stats = {
                total: result.data.length,
                available: result.data.filter(r => r.status === 'AVAILABLE').length,
                inUse: result.data.filter(r => r.status === 'IN_USE').length,
                booked: result.data.filter(r => r.status === 'BOOKED').length,
                maintenance: result.data.filter(r => r.status === 'MAINTENANCE').length,
                classroom: result.data.filter(r => r.type === 'CLASSROOM').length,
                roundtable: result.data.filter(r => r.type === 'ROUNDTABLE').length,
                withProjector: result.data.filter(r => r.hasProjector).length,
                withSound: result.data.filter(r => r.hasSound).length,
                withNetwork: result.data.filter(r => r.hasNetwork).length
            };

            element.innerHTML = `
                <div style="background: rgba(67, 233, 123, 0.1); padding: 20px; border-radius: 12px; margin-bottom: 20px;">
                    <h4 style="margin: 0 0 15px 0; color: #155724;">🏢 会议室管理统计</h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 15px;">
                        <div style="background: white; padding: 15px; border-radius: 8px; text-align: center;">
                            <div style="font-size: 1.5rem; font-weight: bold; color: #2c3e50;">${stats.total}</div>
                            <div style="color: #666; font-size: 0.9rem;">总会议室</div>
                        </div>
                        <div style="background: white; padding: 15px; border-radius: 8px; text-align: center;">
                            <div style="font-size: 1.5rem; font-weight: bold; color: #28a745;">${stats.available}</div>
                            <div style="color: #666; font-size: 0.9rem;">空闲</div>
                        </div>
                        <div style="background: white; padding: 15px; border-radius: 8px; text-align: center;">
                            <div style="font-size: 1.5rem; font-weight: bold; color: #dc3545;">${stats.inUse}</div>
                            <div style="color: #666; font-size: 0.9rem;">使用中</div>
                        </div>
                        <div style="background: white; padding: 15px; border-radius: 8px; text-align: center;">
                            <div style="font-size: 1.5rem; font-weight: bold; color: #17a2b8;">${stats.booked}</div>
                            <div style="color: #666; font-size: 0.9rem;">已预订</div>
                        </div>
                        <div style="background: white; padding: 15px; border-radius: 8px; text-align: center;">
                            <div style="font-size: 1.5rem; font-weight: bold; color: #6c757d;">${stats.maintenance}</div>
                            <div style="color: #666; font-size: 0.9rem;">维护中</div>
                        </div>
                        <div style="background: white; padding: 15px; border-radius: 8px; text-align: center;">
                            <div style="font-size: 1.5rem; font-weight: bold; color: #fd7e14;">${stats.classroom}</div>
                            <div style="color: #666; font-size: 0.9rem;">教室型</div>
                        </div>
                        <div style="background: white; padding: 15px; border-radius: 8px; text-align: center;">
                            <div style="font-size: 1.5rem; font-weight: bold; color: #6f42c1;">${stats.roundtable}</div>
                            <div style="color: #666; font-size: 0.9rem;">圆桌型</div>
                        </div>
                        <div style="background: white; padding: 15px; border-radius: 8px; text-align: center;">
                            <div style="font-size: 1.5rem; font-weight: bold; color: #20c997;">${stats.withProjector}</div>
                            <div style="color: #666; font-size: 0.9rem;">有投影仪</div>
                        </div>
                    </div>
                </div>
                ${createRoomStatusGrid(result.data)}
            `;
            element.className = 'result success';
            element.style.display = 'block';
        } else {
            const resultId = currentUser && currentUser.role === 'ADMIN' ? 'roomManagementResult' : 'employeeResult';
            showResult(resultId, result.message, false);
        }
    } catch (error) {
        const resultId = currentUser && currentUser.role === 'ADMIN' ? 'roomManagementResult' : 'employeeResult';
        showResult(resultId, '获取会议室列表失败：' + error.message, false);
    }
}

function showAddRoomForm() {
    const element = document.getElementById('roomManagementResult');
    element.innerHTML = `
        <div style="background: white; border-radius: 12px; padding: 25px; border: 2px solid #667eea;">
            <h4 style="margin: 0 0 20px 0; color: #2c3e50; display: flex; align-items: center; gap: 10px;">
                <i class="fas fa-plus-circle"></i> 添加新会议室
            </h4>
            <div style="display: grid; gap: 15px;">
                <div>
                    <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #2c3e50;">会议室名称 ✨</label>
                    <input type="text" id="roomName" placeholder="例如：樱花会议室、星空讨论室、彩虹工作间..." style="width: 100%; padding: 15px; border: 2px solid #e1e8ed; border-radius: 12px; font-size: 1rem; background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%); box-shadow: inset 0 2px 4px rgba(0,0,0,0.05); transition: all 0.3s ease;">
                    <div style="font-size: 0.8rem; color: #666; margin-top: 5px; font-style: italic;">💡 建议使用可爱的二次元风格名称哦～</div>
                </div>
                <div>
                    <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #2c3e50;">会议室类型</label>
                    <select id="roomType" style="width: 100%; padding: 15px; border: 2px solid #e1e8ed; border-radius: 12px; font-size: 1rem; background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%); box-shadow: inset 0 2px 4px rgba(0,0,0,0.05); transition: all 0.3s ease; cursor: pointer;">
                        <option value="CLASSROOM">📚 教室型</option>
                        <option value="ROUNDTABLE">🔄 圆桌型</option>
                    </select>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div>
                        <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #2c3e50;">座位数</label>
                        <input type="number" id="roomCapacity" min="1" placeholder="座位数" style="width: 100%; padding: 15px; border: 2px solid #e1e8ed; border-radius: 12px; font-size: 1rem; background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%); box-shadow: inset 0 2px 4px rgba(0,0,0,0.05); transition: all 0.3s ease;">
                    </div>
                    <div>
                        <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #2c3e50;">每小时价格</label>
                        <input type="number" id="roomPrice" min="0" step="0.01" placeholder="价格" style="width: 100%; padding: 15px; border: 2px solid #e1e8ed; border-radius: 12px; font-size: 1rem; background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%); box-shadow: inset 0 2px 4px rgba(0,0,0,0.05); transition: all 0.3s ease;">
                    </div>
                </div>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px;">
                    <div style="display: flex; align-items: center; gap: 10px; padding: 12px; background: rgba(102, 126, 234, 0.05); border-radius: 8px;">
                        <input type="checkbox" id="roomHasProjector" style="width: 18px; height: 18px;">
                        <label for="roomHasProjector" style="font-weight: 500;">有投影仪</label>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px; padding: 12px; background: rgba(102, 126, 234, 0.05); border-radius: 8px;">
                        <input type="checkbox" id="roomHasSound" style="width: 18px; height: 18px;">
                        <label for="roomHasSound" style="font-weight: 500;">有音响</label>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px; padding: 12px; background: rgba(102, 126, 234, 0.05); border-radius: 8px;">
                        <input type="checkbox" id="roomHasNetwork" style="width: 18px; height: 18px;">
                        <label for="roomHasNetwork" style="font-weight: 500;">有网络</label>
                    </div>
                </div>
                <div style="display: flex; gap: 15px; margin-top: 10px;">
                    <button onclick="addRoom()" style="flex: 1; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; padding: 12px; border-radius: 8px; font-weight: 600; cursor: pointer;">
                        <i class="fas fa-plus"></i> 添加会议室
                    </button>
                    <button onclick="hideAddRoomForm()" style="flex: 1; background: linear-gradient(135deg, #95a5a6, #7f8c8d); color: white; border: none; padding: 12px; border-radius: 8px; font-weight: 600; cursor: pointer;">
                        <i class="fas fa-times"></i> 取消
                    </button>
                </div>
            </div>
            <div class="result" id="addRoomResult" style="margin-top: 15px;"></div>
        </div>
    `;
    element.className = 'result success';
    element.style.display = 'block';
}

function hideAddRoomForm() {
    getAllRooms(); // 返回到会议室列表
}

async function addRoom() {
    const roomData = {
        name: document.getElementById('roomName').value,
        type: document.getElementById('roomType').value,
        capacity: parseInt(document.getElementById('roomCapacity').value),
        pricePerHour: parseFloat(document.getElementById('roomPrice').value),
        hasProjector: document.getElementById('roomHasProjector').checked,
        hasSound: document.getElementById('roomHasSound').checked,
        hasNetwork: document.getElementById('roomHasNetwork').checked
    };

    if (!roomData.name || !roomData.capacity || !roomData.pricePerHour) {
        showResult('addRoomResult', '请填写完整的会议室信息', false);
        return;
    }

    if (!currentUser || currentUser.role !== 'ADMIN') {
        showResult('addRoomResult', '只有管理员可以添加会议室', false);
        return;
    }

    try {
        const response = await fetch('/api/room/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(roomData)
        });

        const result = await response.json();
        if (result.code === 200) {
            showResult('addRoomResult', '✅ ' + result.message);
            setTimeout(() => {
                hideAddRoomForm();
            }, 1500);
        } else {
            showResult('addRoomResult', result.message, false);
        }
    } catch (error) {
        showResult('addRoomResult', '添加会议室失败：' + error.message, false);
    }
}

// 编辑会议室
async function editRoom(roomId) {
    try {
        // 首先获取会议室信息
        const response = await fetch('/api/room/all');
        const result = await response.json();

        if (result.code === 200) {
            const room = result.data.find(r => r.id === roomId);
            if (!room) {
                showResult('roomManagementResult', '会议室不存在', false);
                return;
            }

            // 显示编辑表单
            showEditRoomForm(room);
        } else {
            showResult('roomManagementResult', '获取会议室信息失败', false);
        }
    } catch (error) {
        showResult('roomManagementResult', '获取会议室信息失败：' + error.message, false);
    }
}

// 显示编辑会议室表单
function showEditRoomForm(room) {
    const element = document.getElementById('roomManagementResult');
    element.innerHTML = `
        <div style="background: white; border-radius: 12px; padding: 25px; border: 2px solid #667eea;">
            <h4 style="margin: 0 0 20px 0; color: #2c3e50; display: flex; align-items: center; gap: 10px;">
                <i class="fas fa-edit"></i> 编辑会议室：${room.name}
            </h4>
            <div style="display: grid; gap: 15px;">
                <input type="hidden" id="editRoomId" value="${room.id}">
                <div>
                    <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #2c3e50;">会议室名称</label>
                    <input type="text" id="editRoomName" value="${room.name}" placeholder="请输入会议室名称" style="width: 100%; padding: 15px; border: 2px solid #e1e8ed; border-radius: 12px; font-size: 1rem; background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%); box-shadow: inset 0 2px 4px rgba(0,0,0,0.05); transition: all 0.3s ease;">
                </div>
                <div>
                    <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #2c3e50;">会议室类型</label>
                    <select id="editRoomType" style="width: 100%; padding: 15px; border: 2px solid #e1e8ed; border-radius: 12px; font-size: 1rem; background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%); box-shadow: inset 0 2px 4px rgba(0,0,0,0.05); transition: all 0.3s ease; cursor: pointer;">
                        <option value="CLASSROOM" ${room.type === 'CLASSROOM' ? 'selected' : ''}>📚 教室型</option>
                        <option value="ROUNDTABLE" ${room.type === 'ROUNDTABLE' ? 'selected' : ''}>🔄 圆桌型</option>
                    </select>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div>
                        <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #2c3e50;">座位数</label>
                        <input type="number" id="editRoomCapacity" value="${room.capacity}" min="1" placeholder="座位数" style="width: 100%; padding: 15px; border: 2px solid #e1e8ed; border-radius: 12px; font-size: 1rem; background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%); box-shadow: inset 0 2px 4px rgba(0,0,0,0.05); transition: all 0.3s ease;">
                    </div>
                    <div>
                        <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #2c3e50;">每小时价格</label>
                        <input type="number" id="editRoomPrice" value="${room.pricePerHour}" min="0" step="0.01" placeholder="价格" style="width: 100%; padding: 15px; border: 2px solid #e1e8ed; border-radius: 12px; font-size: 1rem; background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%); box-shadow: inset 0 2px 4px rgba(0,0,0,0.05); transition: all 0.3s ease;">
                    </div>
                </div>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px;">
                    <div style="display: flex; align-items: center; gap: 10px; padding: 12px; background: rgba(102, 126, 234, 0.05); border-radius: 8px;">
                        <input type="checkbox" id="editRoomHasProjector" ${room.hasProjector ? 'checked' : ''} style="width: 18px; height: 18px;">
                        <label for="editRoomHasProjector" style="font-weight: 500;">有投影仪</label>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px; padding: 12px; background: rgba(102, 126, 234, 0.05); border-radius: 8px;">
                        <input type="checkbox" id="editRoomHasSound" ${room.hasSound ? 'checked' : ''} style="width: 18px; height: 18px;">
                        <label for="editRoomHasSound" style="font-weight: 500;">有音响</label>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px; padding: 12px; background: rgba(102, 126, 234, 0.05); border-radius: 8px;">
                        <input type="checkbox" id="editRoomHasNetwork" ${room.hasNetwork ? 'checked' : ''} style="width: 18px; height: 18px;">
                        <label for="editRoomHasNetwork" style="font-weight: 500;">有网络</label>
                    </div>
                </div>
                <div style="display: flex; gap: 15px; margin-top: 10px;">
                    <button onclick="updateRoom()" style="flex: 1; background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; border: none; padding: 12px; border-radius: 8px; font-weight: 600; cursor: pointer;">
                        <i class="fas fa-save"></i> 保存修改
                    </button>
                    <button onclick="getAllRooms()" style="flex: 1; background: linear-gradient(135deg, #95a5a6, #7f8c8d); color: white; border: none; padding: 12px; border-radius: 8px; font-weight: 600; cursor: pointer;">
                        <i class="fas fa-times"></i> 取消
                    </button>
                </div>
            </div>
            <div class="result" id="editRoomResult" style="margin-top: 15px;"></div>
        </div>
    `;
    element.className = 'result success';
    element.style.display = 'block';
}

// 更新会议室信息
async function updateRoom() {
    const roomData = {
        id: parseInt(document.getElementById('editRoomId').value),
        name: document.getElementById('editRoomName').value,
        type: document.getElementById('editRoomType').value,
        capacity: parseInt(document.getElementById('editRoomCapacity').value),
        pricePerHour: parseFloat(document.getElementById('editRoomPrice').value),
        hasProjector: document.getElementById('editRoomHasProjector').checked,
        hasSound: document.getElementById('editRoomHasSound').checked,
        hasNetwork: document.getElementById('editRoomHasNetwork').checked
    };

    if (!roomData.name || !roomData.capacity || !roomData.pricePerHour) {
        showResult('editRoomResult', '请填写完整的会议室信息', false);
        return;
    }

    if (!currentUser || currentUser.role !== 'ADMIN') {
        showResult('editRoomResult', '只有管理员可以修改会议室', false);
        return;
    }

    try {
        const response = await fetch('/api/room/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(roomData)
        });

        const result = await response.json();
        if (result.code === 200) {
            showResult('editRoomResult', '✅ ' + result.message);
            setTimeout(() => {
                getAllRooms();
            }, 1500);
        } else {
            showResult('editRoomResult', result.message, false);
        }
    } catch (error) {
        showResult('editRoomResult', '修改会议室失败：' + error.message, false);
    }
}

// 删除会议室
async function deleteRoom(roomId, roomName) {
    if (!confirm(`确定要删除会议室"${roomName}"吗？\n\n⚠️ 警告：删除后无法恢复，且会影响相关的预订记录！`)) {
        return;
    }

    if (!currentUser || currentUser.role !== 'ADMIN') {
        showResult('roomManagementResult', '只有管理员可以删除会议室', false);
        return;
    }

    try {
        const response = await fetch(`/api/room/delete/${roomId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const result = await response.json();
        if (result.code === 200) {
            showResult('roomManagementResult', `🗑️ 会议室"${roomName}"已删除`);
            setTimeout(() => {
                getAllRooms();
            }, 1500);
        } else {
            showResult('roomManagementResult', result.message, false);
        }
    } catch (error) {
        showResult('roomManagementResult', '删除会议室失败：' + error.message, false);
    }
}

// 员工功能实现
async function getAllBookings() {
    try {
        const response = await fetch('/api/booking/all');
        const result = await response.json();

        if (result.code === 200) {
            const element = document.getElementById('bookingManagementResult');
            element.innerHTML = `
                <div style="background: rgba(79, 172, 254, 0.1); padding: 20px; border-radius: 12px; margin-bottom: 20px;">
                    <h4 style="margin: 0; color: #0066cc;">📅 共有 ${result.data.length} 个预订</h4>
                </div>
                ${createBookingGrid(result.data)}
            `;
            element.className = 'result success';
            element.style.display = 'block';
        } else {
            showResult('bookingManagementResult', result.message, false);
        }
    } catch (error) {
        showResult('bookingManagementResult', '获取预订列表失败：' + error.message, false);
    }
}

async function getPendingCancellations() {
    try {
        const response = await fetch('/api/cancellation/pending');
        const result = await response.json();

        if (result.code === 200) {
            const element = document.getElementById('bookingManagementResult');
            element.innerHTML = `
                <div style="background: rgba(255, 193, 7, 0.1); padding: 20px; border-radius: 12px; margin-bottom: 20px;">
                    <h4 style="margin: 0; color: #856404;">⚠️ 共有 ${result.data.length} 个待审核取消申请</h4>
                </div>
                ${createCancellationGrid(result.data)}
            `;
            element.className = 'result success';
            element.style.display = 'block';
        } else {
            showResult('bookingManagementResult', result.message, false);
        }
    } catch (error) {
        showResult('bookingManagementResult', '获取待审核取消申请失败：' + error.message, false);
    }
}

function showRoomStatusManagement() {
    const element = document.getElementById('employeeResult');
    element.innerHTML = `
        <div style="background: white; border-radius: 12px; padding: 25px; border: 2px solid #667eea;">
            <h4 style="margin: 0 0 20px 0; color: #2c3e50; display: flex; align-items: center; gap: 10px;">
                <i class="fas fa-cogs"></i> 会议室状态管理
            </h4>
            <div style="display: grid; gap: 20px;">
                <div>
                    <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #2c3e50;">选择会议室</label>
                    <select id="statusRoomSelect" style="width: 100%; padding: 15px; border: 2px solid #e1e8ed; border-radius: 12px; font-size: 1rem; background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%); box-shadow: inset 0 2px 4px rgba(0,0,0,0.05); transition: all 0.3s ease; cursor: pointer;">
                        <option value="">🏢 请选择会议室</option>
                    </select>
                </div>
                <div>
                    <label style="display: block; margin-bottom: 12px; font-weight: 600; color: #2c3e50;">设置状态</label>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px;">
                        <button onclick="setRoomStatus('IN_USE')" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; border: none; padding: 12px; border-radius: 8px; font-weight: 600; cursor: pointer;">
                            <i class="fas fa-play"></i> 使用中
                        </button>
                        <button onclick="setRoomStatus('AVAILABLE')" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; border: none; padding: 12px; border-radius: 8px; font-weight: 600; cursor: pointer;">
                            <i class="fas fa-check"></i> 空闲
                        </button>
                        <button onclick="setRoomStatus('MAINTENANCE')" style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); color: white; border: none; padding: 12px; border-radius: 8px; font-weight: 600; cursor: pointer;">
                            <i class="fas fa-wrench"></i> 维护
                        </button>
                    </div>
                </div>
            </div>
            <div class="result" id="roomStatusResult" style="margin-top: 15px;"></div>
        </div>
    `;
    element.className = 'result success';
    element.style.display = 'block';

    // 加载会议室列表
    loadRoomsForStatusManagement();
}

// 显示会议室时间轴查看
function showRoomTimeline() {
    // 根据当前用户角色选择正确的结果显示元素
    const resultId = currentUser && currentUser.role === 'ADMIN' ? 'roomManagementResult' : 'employeeResult';
    const element = document.getElementById(resultId);

    if (!element) {
        console.error('找不到显示元素:', resultId);
        return;
    }
    element.innerHTML = `
        <div style="background: white; border-radius: 12px; padding: 25px; border: 2px solid #667eea;">
            <h4 style="margin: 0 0 20px 0; color: #2c3e50; display: flex; align-items: center; gap: 10px;">
                <i class="fas fa-chart-line"></i> 会议室时间轴
            </h4>
            <div style="background: rgba(102, 126, 234, 0.1); padding: 15px; border-radius: 8px; margin-bottom: 20px; border: 1px solid rgba(102, 126, 234, 0.2);">
                <div style="display: flex; align-items: center; gap: 10px; color: #495057;">
                    <i class="fas fa-info-circle"></i>
                    <span style="font-weight: 600;">查看会议室在指定时间段的占用情况和时间轴</span>
                </div>
            </div>
            <div style="display: grid; gap: 20px;">
                <!-- 会议室筛选条件 -->
                <div style="background: rgba(79, 172, 254, 0.05); padding: 20px; border-radius: 12px; border: 1px solid rgba(79, 172, 254, 0.1);">
                    <h5 style="margin: 0 0 15px 0; color: #2c3e50; display: flex; align-items: center; gap: 8px;">
                        <i class="fas fa-filter"></i> 会议室筛选条件
                    </h5>
                    <div style="display: grid; gap: 15px;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                            <div>
                                <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #2c3e50;">选择会议室</label>
                                <select id="timelineRoomSelect" multiple style="width: 100%; padding: 15px; border: 2px solid #e1e8ed; border-radius: 12px; font-size: 1rem; min-height: 140px; background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%); box-shadow: inset 0 2px 4px rgba(0,0,0,0.05); transition: all 0.3s ease;">
                                    <option value="">加载中...</option>
                                </select>
                                <div style="font-size: 0.85rem; color: #6c757d; margin-top: 8px; padding: 8px 12px; background: rgba(102, 126, 234, 0.1); border-radius: 8px; border-left: 4px solid #667eea;">
                                    <i class="fas fa-info-circle"></i> 按住Ctrl可多选，不选择则显示所有会议室
                                </div>
                            </div>
                            <div style="display: grid; gap: 10px;">
                                <div>
                                    <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #2c3e50;">会议室类型</label>
                                    <select id="timelineRoomType" style="width: 100%; padding: 15px; border: 2px solid #e1e8ed; border-radius: 12px; font-size: 1rem; background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%); box-shadow: inset 0 2px 4px rgba(0,0,0,0.05); transition: all 0.3s ease; cursor: pointer;">
                                        <option value="">🏢 所有类型</option>
                                        <option value="CLASSROOM">📚 教室型</option>
                                        <option value="ROUNDTABLE">🔄 圆桌型</option>
                                    </select>
                                </div>
                                <div>
                                    <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #2c3e50;">最小容量</label>
                                    <input type="number" id="timelineMinCapacity" min="1" placeholder="输入最小容量人数" style="width: 100%; padding: 15px; border: 2px solid #e1e8ed; border-radius: 12px; font-size: 1rem; background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%); box-shadow: inset 0 2px 4px rgba(0,0,0,0.05); transition: all 0.3s ease;">
                                </div>
                            </div>
                        </div>
                        <div>
                            <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #2c3e50;">设备要求</label>
                            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
                                <div style="display: flex; align-items: center; gap: 8px; padding: 10px; background: rgba(102, 126, 234, 0.05); border-radius: 8px;">
                                    <input type="checkbox" id="timelineNeedProjector" style="width: 16px; height: 16px;">
                                    <label for="timelineNeedProjector" style="font-weight: 500; font-size: 0.9rem;">需要投影仪</label>
                                </div>
                                <div style="display: flex; align-items: center; gap: 8px; padding: 10px; background: rgba(102, 126, 234, 0.05); border-radius: 8px;">
                                    <input type="checkbox" id="timelineNeedSound" style="width: 16px; height: 16px;">
                                    <label for="timelineNeedSound" style="font-weight: 500; font-size: 0.9rem;">需要音响</label>
                                </div>
                                <div style="display: flex; align-items: center; gap: 8px; padding: 10px; background: rgba(102, 126, 234, 0.05); border-radius: 8px;">
                                    <input type="checkbox" id="timelineNeedNetwork" style="width: 16px; height: 16px;">
                                    <label for="timelineNeedNetwork" style="font-weight: 500; font-size: 0.9rem;">需要网络</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 时间选择 -->
                <div style="background: rgba(255, 255, 255, 0.7); padding: 20px; border-radius: 12px; border: 1px solid rgba(102, 126, 234, 0.1);">
                    <h5 style="margin: 0 0 15px 0; color: #2c3e50; display: flex; align-items: center; gap: 8px;">
                        <i class="fas fa-clock"></i> 时间范围设置
                    </h5>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        <div>
                            <label style="display: block; margin-bottom: 10px; font-weight: 600; color: #2c3e50; display: flex; align-items: center; gap: 8px;">
                                <i class="fas fa-play" style="color: #28a745;"></i> 开始时间
                            </label>
                            <input type="datetime-local" id="timelineStartTime" style="width: 100%; padding: 15px; border: 2px solid #e1e8ed; border-radius: 12px; font-size: 1rem; background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%); box-shadow: inset 0 2px 4px rgba(0,0,0,0.05); transition: all 0.3s ease;" step="3600">
                        </div>
                        <div>
                            <label style="display: block; margin-bottom: 10px; font-weight: 600; color: #2c3e50; display: flex; align-items: center; gap: 8px;">
                                <i class="fas fa-stop" style="color: #dc3545;"></i> 结束时间
                            </label>
                            <input type="datetime-local" id="timelineEndTime" style="width: 100%; padding: 15px; border: 2px solid #e1e8ed; border-radius: 12px; font-size: 1rem; background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%); box-shadow: inset 0 2px 4px rgba(0,0,0,0.05); transition: all 0.3s ease;" step="3600">
                        </div>
                    </div>
                </div>
                <div>
                    <label style="display: block; margin-bottom: 12px; font-weight: 600; color: #2c3e50;">快速时间选择</label>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px; margin-bottom: 15px;">
                        <button onclick="setTimelineQuickTime('now')" style="background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%); color: white; border: none; padding: 12px; border-radius: 10px; font-weight: 600; cursor: pointer; transition: all 0.3s ease;">
                            <i class="fas fa-clock"></i> 现在开始
                        </button>
                        <button onclick="setTimelineQuickTime('today')" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; border: none; padding: 12px; border-radius: 10px; font-weight: 600; cursor: pointer; transition: all 0.3s ease;">
                            <i class="fas fa-calendar-day"></i> 今天全天
                        </button>
                        <button onclick="setTimelineQuickTime('tomorrow')" style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); color: white; border: none; padding: 12px; border-radius: 10px; font-weight: 600; cursor: pointer; transition: all 0.3s ease;">
                            <i class="fas fa-calendar-plus"></i> 明天全天
                        </button>
                        <button onclick="setTimelineQuickTime('next3days')" style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); color: white; border: none; padding: 12px; border-radius: 10px; font-weight: 600; cursor: pointer; transition: all 0.3s ease;">
                            <i class="fas fa-calendar-alt"></i> 未来3天
                        </button>
                        <button onclick="setTimelineQuickTime('thisweek')" style="background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); color: #2c3e50; border: none; padding: 12px; border-radius: 10px; font-weight: 600; cursor: pointer; transition: all 0.3s ease;">
                            <i class="fas fa-calendar-week"></i> 本周剩余
                        </button>
                        <button onclick="setTimelineQuickTime('nextweek')" style="background: linear-gradient(135deg, #d299c2 0%, #fef9d7 100%); color: #2c3e50; border: none; padding: 12px; border-radius: 10px; font-weight: 600; cursor: pointer; transition: all 0.3s ease;">
                            <i class="fas fa-forward"></i> 下周全周
                        </button>
                    </div>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px;">
                        <button onclick="viewRoomTimeline()" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; padding: 14px; border-radius: 10px; font-weight: 700; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);">
                            <i class="fas fa-search"></i> 查看时间轴
                        </button>
                        <button onclick="clearTimelineFilters()" style="background: linear-gradient(135deg, #95a5a6 0%, #7f8c8d 100%); color: white; border: none; padding: 12px; border-radius: 10px; font-weight: 600; cursor: pointer; transition: all 0.3s ease;">
                            <i class="fas fa-eraser"></i> 清除筛选
                        </button>
                    </div>
                </div>
            </div>
            <div class="result" id="timelineResult" style="margin-top: 15px;"></div>
        </div>
    `;
    element.className = 'result success';
    element.style.display = 'block';

    // 设置默认时间为现在开始
    setTimelineQuickTime('now');

    // 加载会议室列表到筛选下拉框
    loadRoomsForTimeline();
}

// 加载会议室列表到时间轴筛选下拉框
async function loadRoomsForTimeline() {
    try {
        const response = await fetch('/api/room/all');
        const result = await response.json();

        if (result.code === 200) {
            const select = document.getElementById('timelineRoomSelect');
            if (select) {
                select.innerHTML = result.data.map(room =>
                    `<option value="${room.id}">${room.type === 'CLASSROOM' ? '📚' : '🔄'} ${room.name} (${room.capacity}人, ¥${room.pricePerHour}/小时)</option>`
                ).join('');
            }
        }
    } catch (error) {
        console.error('加载会议室列表失败：', error);
        const select = document.getElementById('timelineRoomSelect');
        if (select) {
            select.innerHTML = '<option value="">加载失败</option>';
        }
    }
}



// 设置时间轴快速时间
function setTimelineQuickTime(period) {
    const now = new Date();
    let startTime, endTime;

    switch (period) {
        case 'now':
            // 当前时间开始，到今天结束
            startTime = new Date(now);
            endTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 21, 0);
            break;
        case 'today':
            // 今天全天
            startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 8, 0);
            endTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 21, 0);
            break;
        case 'tomorrow':
            // 明天全天
            const tomorrow = new Date(now);
            tomorrow.setDate(tomorrow.getDate() + 1);
            startTime = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 8, 0);
            endTime = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 21, 0);
            break;
        case 'next3days':
            // 未来3天
            startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 8, 0);
            const day3 = new Date(now);
            day3.setDate(now.getDate() + 2);
            endTime = new Date(day3.getFullYear(), day3.getMonth(), day3.getDate(), 21, 0);
            break;
        case 'thisweek':
            // 本周剩余时间（今天到周日）
            startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 8, 0);
            const sunday = new Date(now);
            sunday.setDate(now.getDate() + (7 - now.getDay()));
            endTime = new Date(sunday.getFullYear(), sunday.getMonth(), sunday.getDate(), 21, 0);
            break;
        case 'nextweek':
            // 下周全周（下周一到下周日）
            const nextMonday = new Date(now);
            nextMonday.setDate(now.getDate() + (8 - now.getDay()));
            const nextSunday = new Date(nextMonday);
            nextSunday.setDate(nextMonday.getDate() + 6);
            startTime = new Date(nextMonday.getFullYear(), nextMonday.getMonth(), nextMonday.getDate(), 8, 0);
            endTime = new Date(nextSunday.getFullYear(), nextSunday.getMonth(), nextSunday.getDate(), 21, 0);
            break;
    }

    document.getElementById('timelineStartTime').value = formatDateTimeLocal(startTime);
    document.getElementById('timelineEndTime').value = formatDateTimeLocal(endTime);
}

// 查看会议室时间轴
async function viewRoomTimeline() {
    const startTime = document.getElementById('timelineStartTime').value;
    const endTime = document.getElementById('timelineEndTime').value;

    if (!startTime || !endTime) {
        showResult('timelineResult', '请选择开始时间和结束时间', false);
        return;
    }

    // 获取筛选条件
    const selectedRooms = Array.from(document.getElementById('timelineRoomSelect').selectedOptions).map(option => option.value);
    const roomType = document.getElementById('timelineRoomType').value;
    const minCapacity = document.getElementById('timelineMinCapacity').value;
    const needProjector = document.getElementById('timelineNeedProjector').checked;
    const needSound = document.getElementById('timelineNeedSound').checked;
    const needNetwork = document.getElementById('timelineNeedNetwork').checked;

    try {
        const params = new URLSearchParams({
            startTime: startTime.replace('T', ' ') + ':00',
            endTime: endTime.replace('T', ' ') + ':00'
        });

        console.log('请求时间轴数据:', `/api/room/status-in-period?${params}`);
        const response = await fetch(`/api/room/status-in-period?${params}`);
        const result = await response.json();
        console.log('时间轴数据响应:', result);

        if (result.code === 200) {
            // 应用筛选条件
            let filteredRooms = result.data;

            // 按选择的会议室筛选
            if (selectedRooms.length > 0) {
                filteredRooms = filteredRooms.filter(room => selectedRooms.includes(room.id.toString()));
            }

            // 按会议室类型筛选
            if (roomType) {
                filteredRooms = filteredRooms.filter(room => room.type === roomType);
            }

            // 按最小容量筛选
            if (minCapacity) {
                filteredRooms = filteredRooms.filter(room => room.capacity >= parseInt(minCapacity));
            }

            // 按设备要求筛选
            if (needProjector) {
                filteredRooms = filteredRooms.filter(room => room.hasProjector);
            }
            if (needSound) {
                filteredRooms = filteredRooms.filter(room => room.hasSound);
            }
            if (needNetwork) {
                filteredRooms = filteredRooms.filter(room => room.hasNetwork);
            }

            displayTimelineView(filteredRooms, startTime, endTime, {
                selectedRooms: selectedRooms.length,
                roomType,
                minCapacity,
                needProjector,
                needSound,
                needNetwork,
                totalRooms: result.data.length
            });
        } else {
            showResult('timelineResult', result.message, false);
        }
    } catch (error) {
        console.error('时间轴查询错误:', error);
        showResult('timelineResult', '查询时间轴失败：' + error.message, false);
    }
}

// 显示时间轴视图
function displayTimelineView(rooms, startTime, endTime, filterInfo = {}) {
    console.log('显示时间轴视图:', rooms, startTime, endTime, filterInfo);
    const element = document.getElementById('timelineResult');

    if (!element) {
        console.error('找不到timelineResult元素');
        return;
    }

    if (!rooms || rooms.length === 0) {
        const filterText = createFilterSummary(filterInfo);
        element.innerHTML = `
            <div style="background: rgba(255, 193, 7, 0.1); padding: 20px; border-radius: 12px; border: 1px solid rgba(255, 193, 7, 0.2);">
                <div style="text-align: center; color: #856404;">
                    <i class="fas fa-search" style="font-size: 2rem; margin-bottom: 10px;"></i>
                    <h4 style="margin: 0 0 10px 0;">没有找到符合条件的会议室</h4>
                    ${filterText ? `<p style="margin: 0; font-size: 0.9rem;">筛选条件：${filterText}</p>` : ''}
                </div>
            </div>
        `;
        element.className = 'result';
        element.style.display = 'block';
        return;
    }

    const startDate = new Date(startTime);
    const endDate = new Date(endTime);
    console.log('时间范围:', startDate, endDate);

    try {
        const filterText = createFilterSummary(filterInfo);
        element.innerHTML = `
            <div style="background: rgba(102, 126, 234, 0.05); padding: 20px; border-radius: 12px; border: 1px solid rgba(102, 126, 234, 0.1);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <h4 style="margin: 0; color: #2c3e50;">📊 时间轴视图</h4>
                    <div style="font-size: 0.9rem; color: #666;">
                        ${formatDateTimeRange(startDate, endDate)}
                    </div>
                </div>
                <div style="margin-bottom: 15px; padding: 15px; background: rgba(79, 172, 254, 0.1); border-radius: 8px;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <strong>找到 ${rooms.length} 个会议室</strong>
                        ${filterInfo.totalRooms ? `<span style="font-size: 0.9rem; color: #666;">（共${filterInfo.totalRooms}个会议室）</span>` : ''}
                    </div>
                    ${filterText ? `<div style="margin-top: 8px; font-size: 0.9rem; color: #666;">筛选条件：${filterText}</div>` : ''}
                </div>
                ${createTimelineGrid(rooms, startDate, endDate)}
            </div>
        `;
        element.className = 'result success';
        element.style.display = 'block';
        console.log('时间轴视图显示完成');
    } catch (error) {
        console.error('显示时间轴视图时出错:', error);
        element.innerHTML = `<p style="color: red;">显示时间轴时出错: ${error.message}</p>`;
        element.className = 'result error';
        element.style.display = 'block';
    }
}

// 创建筛选条件摘要
function createFilterSummary(filterInfo) {
    const conditions = [];

    if (filterInfo.selectedRooms > 0) {
        conditions.push(`已选择${filterInfo.selectedRooms}个会议室`);
    }

    if (filterInfo.roomType) {
        const typeText = filterInfo.roomType === 'CLASSROOM' ? '教室型' : '圆桌型';
        conditions.push(`类型：${typeText}`);
    }

    if (filterInfo.minCapacity) {
        conditions.push(`最小容量：${filterInfo.minCapacity}人`);
    }

    const equipment = [];
    if (filterInfo.needProjector) equipment.push('投影仪');
    if (filterInfo.needSound) equipment.push('音响');
    if (filterInfo.needNetwork) equipment.push('网络');

    if (equipment.length > 0) {
        conditions.push(`设备：${equipment.join('、')}`);
    }

    return conditions.join('，');
}

// 清除时间轴筛选条件
function clearTimelineFilters() {
    // 清除会议室选择
    const roomSelect = document.getElementById('timelineRoomSelect');
    if (roomSelect) {
        roomSelect.selectedIndex = -1; // 清除所有选择
    }

    // 清除类型选择
    const typeSelect = document.getElementById('timelineRoomType');
    if (typeSelect) {
        typeSelect.value = '';
    }

    // 清除容量输入
    const capacityInput = document.getElementById('timelineMinCapacity');
    if (capacityInput) {
        capacityInput.value = '';
    }

    // 清除设备选择
    const projectorCheck = document.getElementById('timelineNeedProjector');
    if (projectorCheck) projectorCheck.checked = false;

    const soundCheck = document.getElementById('timelineNeedSound');
    if (soundCheck) soundCheck.checked = false;

    const networkCheck = document.getElementById('timelineNeedNetwork');
    if (networkCheck) networkCheck.checked = false;

    // 显示提示
    showResult('timelineResult', '✅ 筛选条件已清除，请重新查看时间轴');
}

// 创建时间轴网格
function createTimelineGrid(rooms, startDate, endDate) {
    console.log('创建时间轴网格，房间数量:', rooms.length);
    let html = '<div style="display: grid; gap: 20px;">';

    rooms.forEach((room, index) => {
                console.log(`处理房间 ${index + 1}:`, room.name, '冲突数量:', room.conflicts ? room.conflicts.length : 0);

                html += `
            <div style="background: white; border-radius: 12px; padding: 20px; border: 1px solid #e1e8ed;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                    <h5 style="margin: 0; color: #2c3e50; font-size: 1.1rem;">🏢 ${room.name}</h5>
                    <div style="display: flex; gap: 8px; align-items: center;">
                        <span style="font-size: 0.8rem; color: #666;">容量: ${room.capacity || '未知'}人</span>
                        <span style="font-size: 0.8rem; color: #666;">¥${room.pricePerHour || '未知'}/小时</span>
                    </div>
                </div>
                <div style="padding: 10px; background: #f8f9fa; border-radius: 8px;">
                    ${room.conflicts && room.conflicts.length > 0 ?
                        `<strong>有 ${room.conflicts.length} 个预订冲突</strong><br>${createSimpleConflictList(room.conflicts)}` :
                        '<strong style="color: #28a745;">✅ 该时间段完全空闲</strong>'
                    }
                </div>
            </div>
        `;
    });

    html += '</div>';
    console.log('时间轴网格HTML生成完成');
    return html;
}

// 创建简单的冲突列表
function createSimpleConflictList(conflicts) {
    let html = '<ul style="margin: 10px 0; padding-left: 20px;">';
    conflicts.forEach(conflict => {
        const start = new Date(conflict.startTime);
        const end = new Date(conflict.endTime);
        const statusText = conflict.status === 'PAID' ? '已支付' : '待支付';
        const statusColor = conflict.status === 'PAID' ? '#28a745' : '#ffc107';

        html += `
            <li style="margin: 5px 0;">
                <span style="color: ${statusColor}; font-weight: 600;">${statusText}</span> -
                ${start.toLocaleString('zh-CN')} 至 ${end.toLocaleString('zh-CN')}
                (预订ID: ${conflict.bookingId})
            </li>
        `;
    });
    html += '</ul>';
    return html;
}

// 创建增强的时间轴可视化
function createEnhancedTimelineVisualization(conflicts, startDate, endDate) {
    const totalDuration = endDate - startDate;

    let html = `
        <div class="timeline-container">
            <div style="margin-bottom: 15px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 0.9rem; color: #666; font-weight: 600;">
                    <span>${formatTime(startDate)}</span>
                    <span>${formatTime(endDate)}</span>
                </div>
                <div style="position: relative; height: 24px; background: #f8f9fa; border-radius: 12px; border: 2px solid #e9ecef; overflow: hidden;">
    `;

    // 添加时间段
    conflicts.forEach((conflict, index) => {
        const start = new Date(conflict.startTime);
        const end = new Date(conflict.endTime);
        const startOffset = Math.max(0, ((start - startDate) / totalDuration) * 100);
        const endOffset = Math.min(100, ((end - startDate) / totalDuration) * 100);
        const width = endOffset - startOffset;

        if (width > 0) {
            const statusClass = conflict.status === 'PAID' ? 'segment-paid' : 'segment-locked';
            const statusText = conflict.status === 'PAID' ? '已支付' : '待支付';

            html += `
                <div class="timeline-segment ${statusClass}"
                     style="left: ${startOffset}%; width: ${width}%;"
                     title="预订ID: ${conflict.bookingId} | ${formatTimeRange(start, end)} | ${statusText}">
                </div>
            `;
        }
    });

    html += `
                </div>
            </div>
            <div style="display: grid; gap: 8px;">
    `;

    // 添加详细信息
    conflicts.forEach((conflict, index) => {
        const start = new Date(conflict.startTime);
        const end = new Date(conflict.endTime);
        const statusClass = conflict.status === 'PAID' ? 'status-paid' : 'status-locked';
        const statusText = conflict.status === 'PAID' ? '已支付' : '待支付';
        const statusIcon = conflict.status === 'PAID' ? '💳' : '🔒';

        html += `
            <div class="timeline-item">
                <div class="timeline-marker ${statusClass}"></div>
                <div class="timeline-content">
                    <div class="timeline-time">${formatTimeRange(start, end)}</div>
                    <div class="timeline-status ${statusClass}">
                        ${statusIcon} ${statusText} (预订ID: ${conflict.bookingId})
                    </div>
                    <div class="timeline-duration">
                        时长: ${calculateDuration(start, end)}
                    </div>
                </div>
            </div>
        `;
    });

    html += `
            </div>
        </div>
    `;

    return html;
}

// 创建空时间轴
function createEmptyTimeline(startDate, endDate) {
    return `
        <div class="timeline-container">
            <div style="margin-bottom: 15px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 0.9rem; color: #666; font-weight: 600;">
                    <span>${formatTime(startDate)}</span>
                    <span>${formatTime(endDate)}</span>
                </div>
                <div style="position: relative; height: 24px; background: #f8f9fa; border-radius: 12px; border: 2px solid #e9ecef;">
                    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: #6c757d; font-size: 0.8rem; font-weight: 600;">
                        空闲时段
                    </div>
                </div>
            </div>
            <div style="text-align: center; color: #28a745; padding: 15px; background: rgba(40, 167, 69, 0.1); border-radius: 8px;">
                <i class="fas fa-check-circle"></i> 该时间段完全空闲，可以预订
            </div>
        </div>
    `;
}

// 格式化日期时间为本地输入格式
function formatDateTimeLocal(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

// 格式化时间范围
function formatDateTimeRange(startDate, endDate) {
    const startStr = startDate.toLocaleDateString('zh-CN') + ' ' + startDate.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
    const endStr = endDate.toLocaleDateString('zh-CN') + ' ' + endDate.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });

    if (startDate.toDateString() === endDate.toDateString()) {
        return `${startDate.toLocaleDateString('zh-CN')} ${startDate.toLocaleTimeString('zh-CN', {hour: '2-digit', minute: '2-digit'})} - ${endDate.toLocaleTimeString('zh-CN', {hour: '2-digit', minute: '2-digit'})}`;
    }

    return `${startStr} - ${endStr}`;
}

// 格式化时间范围（用于冲突显示）
function formatTimeRange(start, end) {
    const startStr = start.toLocaleDateString('zh-CN') + ' ' + start.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
    const endStr = end.toLocaleDateString('zh-CN') + ' ' + end.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });

    // 如果是同一天，只显示一次日期
    if (start.toDateString() === end.toDateString()) {
        return `${start.toLocaleDateString('zh-CN')} ${start.toLocaleTimeString('zh-CN', {hour: '2-digit', minute: '2-digit'})} - ${end.toLocaleTimeString('zh-CN', {hour: '2-digit', minute: '2-digit'})}`;
    }

    return `${startStr} - ${endStr}`;
}

// 格式化时间
function formatTime(date) {
    return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
}

// 计算时长
function calculateDuration(start, end) {
    const diffMs = end - start;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    if (diffHours > 0) {
        return `${diffHours}小时${diffMinutes > 0 ? diffMinutes + '分钟' : ''}`;
    } else {
        return `${diffMinutes}分钟`;
    }
}

// 客户功能实现
async function getMyBookings() {
    if (!currentUser || currentUser.role !== 'CUSTOMER') {
        showResult('myBookingsResult', '只有客户可以查看预订', false);
        return;
    }

    try {
        const response = await fetch(`/api/booking/customer/${currentUser.id}`);
        const result = await response.json();

        if (result.code === 200) {
            const element = document.getElementById('myBookingsResult');
            element.innerHTML = `
                <div style="background: rgba(79, 172, 254, 0.1); padding: 20px; border-radius: 12px; margin-bottom: 20px;">
                    <h4 style="margin: 0; color: #0066cc;">📋 您有 ${result.data.length} 个预订</h4>
                </div>
                ${createMyBookingGrid(result.data)}
            `;
            element.className = 'result success';
            element.style.display = 'block';

            // 更新支付和取消选项
            updatePaymentBookingOptions(result.data);
            updateCancellationBookingOptions(result.data);
        } else {
            showResult('myBookingsResult', result.message, false);
        }
    } catch (error) {
        showResult('myBookingsResult', '获取预订列表失败：' + error.message, false);
    }
}

async function payBooking() {
    const bookingId = document.getElementById('paymentBookingId').value;

    if (!bookingId) {
        showResult('paymentResult', '请选择要支付的预订', false);
        return;
    }

    if (!currentUser || currentUser.role !== 'CUSTOMER') {
        showResult('paymentResult', '只有客户可以支付预订', false);
        return;
    }

    try {
        const response = await fetch(`/api/booking/pay/${bookingId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const result = await response.json();
        if (result.code === 200) {
            showResult('paymentResult', '💳 ' + result.message);
            // 清空选择并刷新预订列表
            document.getElementById('paymentBookingId').value = '';
            setTimeout(() => {
                getMyBookings();
            }, 1500);
        } else {
            showResult('paymentResult', result.message, false);
        }
    } catch (error) {
        showResult('paymentResult', '支付失败：' + error.message, false);
    }
}

async function submitCancellation() {
    const bookingId = document.getElementById('cancellationBookingId').value;
    const reason = document.getElementById('cancellationReason').value;

    if (!bookingId) {
        showResult('cancellationResult', '请选择要取消的预订', false);
        return;
    }

    if (!currentUser || currentUser.role !== 'CUSTOMER') {
        showResult('cancellationResult', '只有客户可以提交取消申请', false);
        return;
    }

    const cancellationData = {
        bookingId: parseInt(bookingId),
        customerId: currentUser.id,
        reason: reason || '无'
    };

    try {
        const response = await fetch('/api/cancellation/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cancellationData)
        });

        const result = await response.json();
        if (result.code === 200) {
            showResult('cancellationResult', '📝 ' + result.message);
            // 清空表单
            document.getElementById('cancellationBookingId').value = '';
            document.getElementById('cancellationReason').value = '';
            // 1.5秒后自动显示取消申请状态
            setTimeout(() => {
                getMyCancellationRequests();
            }, 1500);
        } else {
            showResult('cancellationResult', result.message, false);
        }
    } catch (error) {
        showResult('cancellationResult', '提交取消申请失败：' + error.message, false);
    }
}

async function getCancellationRules() {
    try {
        const response = await fetch('/api/cancellation/rules');
        const result = await response.json();

        if (result.code === 200) {
            const element = document.getElementById('cancellationResult');
            element.innerHTML = `
                <div style="background: rgba(79, 172, 254, 0.1); padding: 20px; border-radius: 12px;">
                    <h4 style="margin: 0 0 15px 0; color: #0066cc; display: flex; align-items: center; gap: 10px;">
                        <i class="fas fa-info-circle"></i> 退费规则
                    </h4>
                    <div style="display: grid; gap: 12px;">
                        <div style="display: flex; align-items: center; gap: 12px; padding: 12px; background: rgba(40, 167, 69, 0.1); border-radius: 8px;">
                            <i class="fas fa-check-circle" style="color: #28a745; font-size: 1.2rem;"></i>
                            <span><strong>提前72小时以上：</strong>退全款（100%）</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 12px; padding: 12px; background: rgba(255, 193, 7, 0.1); border-radius: 8px;">
                            <i class="fas fa-exclamation-triangle" style="color: #ffc107; font-size: 1.2rem;"></i>
                            <span><strong>提前48-72小时：</strong>退75%</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 12px; padding: 12px; background: rgba(220, 53, 69, 0.1); border-radius: 8px;">
                            <i class="fas fa-times-circle" style="color: #dc3545; font-size: 1.2rem;"></i>
                            <span><strong>提前24-48小时：</strong>退25%</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 12px; padding: 12px; background: rgba(108, 117, 125, 0.1); border-radius: 8px;">
                            <i class="fas fa-ban" style="color: #6c757d; font-size: 1.2rem;"></i>
                            <span><strong>提前不足24小时：</strong>不可取消</span>
                        </div>
                    </div>
                </div>
            `;
            element.className = 'result success';
            element.style.display = 'block';
        } else {
            showResult('cancellationResult', result.message, false);
        }
    } catch (error) {
        showResult('cancellationResult', '获取退费规则失败：' + error.message, false);
    }
}

// 获取客户的取消申请状态
async function getMyCancellationRequests() {
    if (!currentUser || currentUser.role !== 'CUSTOMER') {
        showResult('cancellationResult', '只有客户可以查看取消申请状态', false);
        return;
    }

    try {
        const response = await fetch(`/api/cancellation/customer/${currentUser.id}`);
        const result = await response.json();

        if (result.code === 200) {
            const element = document.getElementById('cancellationResult');
            element.innerHTML = `
                <div style="background: rgba(79, 172, 254, 0.1); padding: 20px; border-radius: 12px; margin-bottom: 20px;">
                    <h4 style="margin: 0; color: #0066cc; display: flex; align-items: center; gap: 10px;">
                        <i class="fas fa-list"></i> 我的取消申请 (${result.data.length}个)
                    </h4>
                </div>
                ${createMyCancellationGrid(result.data)}
            `;
            element.className = 'result success';
            element.style.display = 'block';
        } else {
            showResult('cancellationResult', result.message, false);
        }
    } catch (error) {
        showResult('cancellationResult', '获取取消申请状态失败：' + error.message, false);
    }
}

// 创建客户取消申请网格
function createMyCancellationGrid(cancellations) {
    if (!cancellations || cancellations.length === 0) {
        return `
            <div style="text-align: center; padding: 40px; background: rgba(108, 117, 125, 0.1); border-radius: 12px;">
                <i class="fas fa-inbox" style="font-size: 3rem; color: #6c757d; margin-bottom: 15px;"></i>
                <h4 style="margin: 0; color: #6c757d;">暂无取消申请</h4>
                <p style="margin: 10px 0 0 0; color: #6c757d;">您还没有提交过任何取消申请</p>
            </div>
        `;
    }

    let html = '<div style="display: grid; gap: 15px; margin-top: 20px;">';

    cancellations.forEach(request => {
                const statusInfo = getCancellationStatusInfo(request.status);
                const submitTime = new Date(request.createTime).toLocaleString('zh-CN');
                const reviewTime = request.reviewTime ? new Date(request.reviewTime).toLocaleString('zh-CN') : null;

                html += `
            <div style="background: white; border-radius: 12px; padding: 20px; border: 1px solid #e1e8ed; border-left: 4px solid ${statusInfo.color};">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px;">
                    <h5 style="margin: 0; color: #2c3e50; font-size: 1.1rem;">📋 取消申请 #${request.id}</h5>
                    <span style="background: ${statusInfo.color}; color: white; padding: 6px 12px; border-radius: 20px; font-size: 0.85rem; font-weight: 600;">
                        ${statusInfo.icon} ${statusInfo.text}
                    </span>
                </div>

                <div style="display: grid; gap: 12px; margin-bottom: 15px;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <i class="fas fa-calendar" style="color: #667eea;"></i>
                        <span><strong>预订ID:</strong> ${request.bookingId}</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <i class="fas fa-clock" style="color: #667eea;"></i>
                        <span><strong>申请时间:</strong> ${submitTime}</span>
                    </div>
                    ${request.reason ? `
                        <div style="display: flex; align-items: start; gap: 8px;">
                            <i class="fas fa-comment" style="color: #667eea; margin-top: 2px;"></i>
                            <span><strong>取消原因:</strong> ${request.reason}</span>
                        </div>
                    ` : ''}
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <i class="fas fa-percentage" style="color: #667eea;"></i>
                        <span><strong>退款比例:</strong> ${(request.refundRate * 100).toFixed(0)}%</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <i class="fas fa-money-bill" style="color: #667eea;"></i>
                        <span><strong>退款金额:</strong> ¥${request.refundAmount}</span>
                    </div>
                </div>

                ${request.status !== 'PENDING' ? `
                    <div style="padding: 15px; background: ${statusInfo.bgColor}; border-radius: 8px; border: 1px solid ${statusInfo.borderColor};">
                        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                            <i class="fas fa-user-tie" style="color: ${statusInfo.color};"></i>
                            <span style="font-weight: 600; color: ${statusInfo.color};">审核结果</span>
                        </div>
                        ${reviewTime ? `
                            <div style="margin-bottom: 8px; font-size: 0.9rem; color: #666;">
                                审核时间: ${reviewTime}
                            </div>
                        ` : ''}
                        ${request.reviewComment ? `
                            <div style="font-size: 0.9rem; color: #666;">
                                审核意见: ${request.reviewComment}
                            </div>
                        ` : ''}
                    </div>
                ` : `
                    <div style="padding: 15px; background: rgba(255, 193, 7, 0.1); border-radius: 8px; border: 1px solid rgba(255, 193, 7, 0.2);">
                        <div style="display: flex; align-items: center; gap: 8px; color: #856404;">
                            <i class="fas fa-hourglass-half"></i>
                            <span style="font-weight: 600;">等待员工审核中...</span>
                        </div>
                        <div style="margin-top: 8px; font-size: 0.9rem; color: #856404;">
                            请耐心等待，我们会尽快处理您的申请
                        </div>
                    </div>
                `}
            </div>
        `;
    });

    html += '</div>';
    return html;
}

// 获取取消申请状态信息
function getCancellationStatusInfo(status) {
    const statusMap = {
        'PENDING': {
            color: '#ffc107',
            icon: '⏳',
            text: '待审核',
            bgColor: 'rgba(255, 193, 7, 0.1)',
            borderColor: 'rgba(255, 193, 7, 0.2)'
        },
        'APPROVED': {
            color: '#28a745',
            icon: '✅',
            text: '已批准',
            bgColor: 'rgba(40, 167, 69, 0.1)',
            borderColor: 'rgba(40, 167, 69, 0.2)'
        },
        'REJECTED': {
            color: '#dc3545',
            icon: '❌',
            text: '已拒绝',
            bgColor: 'rgba(220, 53, 69, 0.1)',
            borderColor: 'rgba(220, 53, 69, 0.2)'
        }
    };
    return statusMap[status] || {
        color: '#6c757d',
        icon: '❓',
        text: '未知',
        bgColor: 'rgba(108, 117, 125, 0.1)',
        borderColor: 'rgba(108, 117, 125, 0.2)'
    };
}

// 辅助函数 - 创建用户网格
function createUserGrid(users) {
    if (!users || users.length === 0) {
        return '<p style="text-align: center; color: #666; padding: 20px;">暂无用户数据</p>';
    }

    let html = '<div style="display: grid; gap: 15px; margin-top: 20px;">';

    users.forEach(user => {
                const statusColor = user.status === 'ACTIVE' ? '#28a745' : user.status === 'PENDING' ? '#ffc107' : '#dc3545';
                const statusText = user.status === 'ACTIVE' ? '激活' : user.status === 'PENDING' ? '待审核' : '冻结';
                const roleIcon = user.role === 'ADMIN' ? '👑' : user.role === 'EMPLOYEE' ? '👔' : '👤';

                html += `
            <div style="background: white; border-radius: 12px; padding: 20px; border: 1px solid #e1e8ed; display: flex; justify-content: space-between; align-items: center;">
                <div style="display: flex; align-items: center; gap: 15px;">
                    <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem;">
                        ${roleIcon}
                    </div>
                    <div>
                        <h4 style="margin: 0; color: #2c3e50;">${user.name} (${user.username})</h4>
                        <p style="margin: 5px 0 0 0; color: #666; display: flex; align-items: center; gap: 10px;">
                            <span>${user.role === 'ADMIN' ? '管理员' : user.role === 'EMPLOYEE' ? '员工' : '客户'}</span>
                            ${user.company ? `• ${user.company}` : ''}
                            ${user.phone ? `• ${user.phone}` : ''}
                        </p>
                    </div>
                </div>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <span style="background: ${statusColor}; color: white; padding: 6px 12px; border-radius: 20px; font-size: 0.85rem; font-weight: 600;">
                        ${statusText}
                    </span>
                    ${currentUser && currentUser.role === 'ADMIN' ? `
                        <div style="display: flex; gap: 8px;">
                            ${user.status === 'ACTIVE' && user.role !== 'ADMIN' ? `
                                <button onclick="freezeUser(${user.id})" style="background: #dc3545; color: white; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-size: 0.8rem;">
                                    <i class="fas fa-lock"></i> 冻结
                                </button>
                            ` : ''}
                            ${user.status === 'FROZEN' ? `
                                <button onclick="unfreezeUser(${user.id})" style="background: #28a745; color: white; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-size: 0.8rem;">
                                    <i class="fas fa-unlock"></i> 解冻
                                </button>
                            ` : ''}
                            ${user.status === 'PENDING' ? `
                                <button onclick="approveUser(${user.id})" style="background: #28a745; color: white; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-size: 0.8rem;">
                                    <i class="fas fa-check"></i> 审核通过
                                </button>
                                <button onclick="rejectUser(${user.id})" style="background: #dc3545; color: white; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-size: 0.8rem;">
                                    <i class="fas fa-times"></i> 拒绝
                                </button>
                            ` : ''}
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    });

    html += '</div>';
    return html;
}

// 创建待审核用户网格
function createPendingUserGrid(users) {
    if (!users || users.length === 0) {
        return '<p style="text-align: center; color: #666; padding: 20px;">暂无待审核用户</p>';
    }

    let html = '<div style="display: grid; gap: 15px; margin-top: 20px;">';

    users.forEach(user => {
        const roleInfo = getRoleInfo(user.role);

        html += `
            <div style="background: white; border-radius: 12px; padding: 20px; border: 1px solid #e1e8ed;">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px;">
                    <div style="display: flex; align-items: center; gap: 15px;">
                        <div style="width: 50px; height: 50px; background: ${roleInfo.gradient}; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem;">
                            ${roleInfo.icon}
                        </div>
                        <div>
                            <h4 style="margin: 0; color: #2c3e50;">${user.name} (${user.username})</h4>
                            <div style="display: flex; align-items: center; gap: 8px; margin-top: 5px;">
                                <span style="background: ${roleInfo.color}; color: white; padding: 4px 8px; border-radius: 12px; font-size: 0.8rem; font-weight: 600;">
                                    ${roleInfo.text}
                                </span>
                                <span style="background: rgba(255, 193, 7, 0.1); color: #856404; padding: 4px 8px; border-radius: 12px; font-size: 0.8rem; font-weight: 600;">
                                    ⏳ 待审核
                                </span>
                            </div>
                        </div>
                    </div>
                    <div style="display: flex; gap: 10px;">
                        <button onclick="approveUser(${user.id})" style="background: #28a745; color: white; border: none; padding: 10px 15px; border-radius: 8px; cursor: pointer; font-weight: 600;">
                            <i class="fas fa-check"></i> 通过
                        </button>
                        <button onclick="rejectUser(${user.id})" style="background: #dc3545; color: white; border: none; padding: 10px 15px; border-radius: 8px; cursor: pointer; font-weight: 600;">
                            <i class="fas fa-times"></i> 拒绝
                        </button>
                    </div>
                </div>
                <div style="display: grid; gap: 10px; padding-left: 65px;">
                    ${user.company ? `
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <i class="fas fa-building" style="color: #667eea;"></i>
                            <span>公司: ${user.company}</span>
                        </div>
                    ` : ''}
                    ${user.phone ? `
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <i class="fas fa-phone" style="color: #667eea;"></i>
                            <span>电话: ${user.phone}</span>
                        </div>
                    ` : ''}
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <i class="fas fa-clock" style="color: #667eea;"></i>
                        <span>注册时间: ${user.createTime || '未知'}</span>
                    </div>
                </div>
            </div>
        `;
    });

    html += '</div>';
    return html;
}

// 创建会议室状态网格
function createRoomStatusGrid(rooms) {
    if (!rooms || rooms.length === 0) {
        return '<p style="text-align: center; color: #666; padding: 20px;">暂无会议室数据</p>';
    }

    let html = '<div style="display: grid; gap: 15px; margin-top: 20px;">';

    rooms.forEach(room => {
        const statusInfo = getStatusInfo(room.status);

        html += `
            <div style="background: white; border-radius: 12px; padding: 20px; border: 1px solid #e1e8ed;">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px;">
                    <h4 style="margin: 0; color: #2c3e50; font-size: 1.2rem;">🏢 ${room.name}</h4>
                    <span style="background: ${statusInfo.color}; color: white; padding: 6px 12px; border-radius: 20px; font-size: 0.85rem; font-weight: 600;">
                        ${statusInfo.icon} ${statusInfo.text}
                    </span>
                </div>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 15px; margin-bottom: 15px;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <i class="fas fa-layer-group" style="color: #667eea;"></i>
                        <span>${room.type === 'CLASSROOM' ? '教室型' : '圆桌型'}</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <i class="fas fa-users" style="color: #667eea;"></i>
                        <span>${room.capacity}人</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <i class="fas fa-dollar-sign" style="color: #667eea;"></i>
                        <span>¥${room.pricePerHour}/小时</span>
                    </div>
                </div>
                <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 15px;">
                    ${room.hasProjector ? '<span style="background: rgba(102, 126, 234, 0.1); color: #667eea; padding: 4px 8px; border-radius: 6px; font-size: 0.8rem;"><i class="fas fa-video"></i> 投影仪</span>' : ''}
                    ${room.hasSound ? '<span style="background: rgba(102, 126, 234, 0.1); color: #667eea; padding: 4px 8px; border-radius: 6px; font-size: 0.8rem;"><i class="fas fa-volume-up"></i> 音响</span>' : ''}
                    ${room.hasNetwork ? '<span style="background: rgba(102, 126, 234, 0.1); color: #667eea; padding: 4px 8px; border-radius: 6px; font-size: 0.8rem;"><i class="fas fa-wifi"></i> 网络</span>' : ''}
                </div>
                ${currentUser && currentUser.role === 'ADMIN' ? `
                    <div style="display: flex; gap: 10px;">
                        <button onclick="editRoom(${room.id})" style="flex: 1; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; padding: 10px; border-radius: 8px; font-weight: 600; cursor: pointer;">
                            <i class="fas fa-edit"></i> 编辑
                        </button>
                        <button onclick="deleteRoom(${room.id}, '${room.name}')" style="flex: 1; background: linear-gradient(135deg, #dc3545 0%, #c82333 100%); color: white; border: none; padding: 10px; border-radius: 8px; font-weight: 600; cursor: pointer;">
                            <i class="fas fa-trash"></i> 删除
                        </button>
                    </div>
                ` : ''}
            </div>
        `;
    });

    html += '</div>';
    return html;
}

// 获取状态信息
function getStatusInfo(status) {
    const statusMap = {
        'AVAILABLE': { color: '#28a745', icon: '✅', text: '空闲' },
        'LOCKED': { color: '#ffc107', icon: '🔒', text: '锁定' },
        'BOOKED': { color: '#17a2b8', icon: '📅', text: '预定' },
        'IN_USE': { color: '#dc3545', icon: '🏃', text: '使用中' },
        'MAINTENANCE': { color: '#6c757d', icon: '🔧', text: '维护' }
    };
    return statusMap[status] || { color: '#6c757d', icon: '❓', text: '未知' };
}

// 创建预订网格
function createBookingGrid(bookings) {
    if (!bookings || bookings.length === 0) {
        return '<p style="text-align: center; color: #666; padding: 20px;">暂无预订数据</p>';
    }

    let html = '<div style="display: grid; gap: 15px; margin-top: 20px;">';

    bookings.forEach(booking => {
        const statusInfo = getBookingStatusInfo(booking.status);

        html += `
            <div style="background: white; border-radius: 12px; padding: 20px; border: 1px solid #e1e8ed;">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px;">
                    <h4 style="margin: 0; color: #2c3e50;">📅 预订 #${booking.id}</h4>
                    <span style="background: ${statusInfo.color}; color: white; padding: 6px 12px; border-radius: 20px; font-size: 0.85rem; font-weight: 600;">
                        ${statusInfo.icon} ${statusInfo.text}
                    </span>
                </div>
                <div style="display: grid; gap: 10px; margin-bottom: 15px;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <i class="fas fa-user" style="color: #667eea;"></i>
                        <span>客户ID: ${booking.customerId}</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <i class="fas fa-building" style="color: #667eea;"></i>
                        <span>会议室ID: ${booking.roomId}</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <i class="fas fa-clock" style="color: #667eea;"></i>
                        <span>${booking.startTime} 至 ${booking.endTime}</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <i class="fas fa-users" style="color: #667eea;"></i>
                        <span>参会人数: ${booking.participantCount}</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <i class="fas fa-dollar-sign" style="color: #667eea;"></i>
                        <span>总价: ¥${booking.totalPrice}</span>
                    </div>
                    ${booking.paymentDeadline ? `
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <i class="fas fa-exclamation-triangle" style="color: #ffc107;"></i>
                            <span>支付截止: ${booking.paymentDeadline}</span>
                        </div>
                    ` : ''}
                </div>
                ${booking.status === 'BOOKED' ? `
                    <button onclick="completeBooking(${booking.id})" style="width: 100%; background: #28a745; color: white; border: none; padding: 12px; border-radius: 8px; font-weight: 600; cursor: pointer;">
                        <i class="fas fa-check"></i> 完成预订
                    </button>
                ` : ''}
            </div>
        `;
    });

    html += '</div>';
    return html;
}

// 获取预订状态信息
function getBookingStatusInfo(status) {
    const statusMap = {
        'LOCKED': { color: '#ffc107', icon: '🔒', text: '待支付' },
        'PAID': { color: '#17a2b8', icon: '💳', text: '已支付' },
        'BOOKED': { color: '#28a745', icon: '✅', text: '已预订' },
        'COMPLETED': { color: '#6c757d', icon: '✔️', text: '已完成' },
        'CANCELLED': { color: '#dc3545', icon: '❌', text: '已取消' }
    };
    return statusMap[status] || { color: '#6c757d', icon: '❓', text: '未知' };
}

// 创建我的预订网格
function createMyBookingGrid(bookings) {
    if (!bookings || bookings.length === 0) {
        return '<p style="text-align: center; color: #666; padding: 20px;">您还没有任何预订</p>';
    }

    let html = '<div style="display: grid; gap: 15px; margin-top: 20px;">';

    bookings.forEach(booking => {
        const statusInfo = getBookingStatusInfo(booking.status);

        html += `
            <div style="background: white; border-radius: 12px; padding: 20px; border: 1px solid #e1e8ed;">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px;">
                    <h4 style="margin: 0; color: #2c3e50;">📅 预订 #${booking.id}</h4>
                    <span style="background: ${statusInfo.color}; color: white; padding: 6px 12px; border-radius: 20px; font-size: 0.85rem; font-weight: 600;">
                        ${statusInfo.icon} ${statusInfo.text}
                    </span>
                </div>
                <div style="display: grid; gap: 10px; margin-bottom: 15px;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <i class="fas fa-building" style="color: #667eea;"></i>
                        <span>会议室ID: ${booking.roomId}</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <i class="fas fa-clock" style="color: #667eea;"></i>
                        <span>${booking.startTime} 至 ${booking.endTime}</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <i class="fas fa-users" style="color: #667eea;"></i>
                        <span>参会人数: ${booking.participantCount}</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <i class="fas fa-dollar-sign" style="color: #667eea;"></i>
                        <span>总价: ¥${booking.totalPrice}</span>
                    </div>
                    ${booking.paymentDeadline && booking.status === 'LOCKED' ? `
                        <div style="display: flex; align-items: center; gap: 8px; padding: 10px; background: rgba(255, 193, 7, 0.1); border-radius: 8px;">
                            <i class="fas fa-exclamation-triangle" style="color: #ffc107;"></i>
                            <span style="color: #856404; font-weight: 600;">支付截止: ${booking.paymentDeadline}</span>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    });

    html += '</div>';
    return html;
}

// 创建取消申请网格
function createCancellationGrid(cancellations) {
    if (!cancellations || cancellations.length === 0) {
        return '<p style="text-align: center; color: #666; padding: 20px;">暂无待审核取消申请</p>';
    }

    let html = '<div style="display: grid; gap: 15px; margin-top: 20px;">';

    cancellations.forEach(request => {
        html += `
            <div style="background: white; border-radius: 12px; padding: 20px; border: 1px solid #e1e8ed;">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px;">
                    <h4 style="margin: 0; color: #2c3e50;">📝 取消申请 #${request.id}</h4>
                    <span style="background: #ffc107; color: white; padding: 6px 12px; border-radius: 20px; font-size: 0.85rem; font-weight: 600;">
                        ⏳ 待审核
                    </span>
                </div>
                <div style="display: grid; gap: 10px; margin-bottom: 15px;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <i class="fas fa-calendar" style="color: #667eea;"></i>
                        <span>预订ID: ${request.bookingId}</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <i class="fas fa-user" style="color: #667eea;"></i>
                        <span>客户ID: ${request.customerId}</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <i class="fas fa-comment" style="color: #667eea;"></i>
                        <span>取消原因: ${request.reason}</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <i class="fas fa-money-bill" style="color: #667eea;"></i>
                        <span>退款金额: ¥${request.refundAmount} (${(request.refundRate * 100).toFixed(1)}%)</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <i class="fas fa-clock" style="color: #667eea;"></i>
                        <span>申请时间: ${request.createTime}</span>
                    </div>
                </div>
                <div style="display: flex; gap: 10px;">
                    <button onclick="reviewCancellation(${request.id}, true)" style="flex: 1; background: #28a745; color: white; border: none; padding: 12px; border-radius: 8px; font-weight: 600; cursor: pointer;">
                        <i class="fas fa-check"></i> 批准
                    </button>
                    <button onclick="reviewCancellation(${request.id}, false)" style="flex: 1; background: #dc3545; color: white; border: none; padding: 12px; border-radius: 8px; font-weight: 600; cursor: pointer;">
                        <i class="fas fa-times"></i> 拒绝
                    </button>
                </div>
            </div>
        `;
    });

    html += '</div>';
    return html;
}

// 更新支付选项
function updatePaymentBookingOptions(bookings) {
    const select = document.getElementById('paymentBookingId');
    if (!select) return;

    select.innerHTML = '<option value="">请选择要支付的预订</option>';

    // 只显示锁定状态的预订（需要支付的）
    bookings.filter(booking => booking.status === 'LOCKED').forEach(booking => {
        const option = document.createElement('option');
        option.value = booking.id;
        option.textContent = `预订${booking.id} - ${booking.startTime} 至 ${booking.endTime} - ¥${booking.totalPrice}`;
        select.appendChild(option);
    });
}

// 更新取消选项
function updateCancellationBookingOptions(bookings) {
    const select = document.getElementById('cancellationBookingId');
    if (!select) return;

    // 只显示已支付的预订
    const paidBookings = bookings.filter(booking => booking.status === 'PAID');

    if (paidBookings.length === 0) {
        select.innerHTML = '<option value="">暂无可取消的预订（只有已支付的预订才能申请取消）</option>';
    } else {
        select.innerHTML = '<option value="">请选择要取消的预订（只显示已支付的预订）</option>';
        paidBookings.forEach(booking => {
            const option = document.createElement('option');
            option.value = booking.id;
            option.textContent = `预订${booking.id} - ${booking.startTime} 至 ${booking.endTime} - ¥${booking.totalPrice}`;
            select.appendChild(option);
        });
    }
}

// 管理员操作函数
async function approveUser(userId) {
    try {
        const response = await fetch(`/api/user/approve/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const result = await response.json();
        if (result.code === 200) {
            showResult('userManagementResult', '✅ ' + result.message);
            setTimeout(() => {
                getPendingUsers();
            }, 1500);
        } else {
            showResult('userManagementResult', result.message, false);
        }
    } catch (error) {
        showResult('userManagementResult', '审核失败：' + error.message, false);
    }
}

async function rejectUser(userId) {
    if (!confirm('确定要拒绝这个用户的注册申请吗？拒绝后该用户将被删除。')) {
        return;
    }

    try {
        const response = await fetch(`/api/user/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const result = await response.json();
        if (result.code === 200) {
            showResult('userManagementResult', '❌ 用户注册申请已拒绝');
            setTimeout(() => {
                getPendingUsers();
            }, 1500);
        } else {
            showResult('userManagementResult', result.message, false);
        }
    } catch (error) {
        showResult('userManagementResult', '拒绝失败：' + error.message, false);
    }
}

async function freezeUser(userId) {
    try {
        const response = await fetch(`/api/user/freeze/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const result = await response.json();
        if (result.code === 200) {
            showResult('userManagementResult', '🔒 ' + result.message);
            setTimeout(() => {
                getAllUsers();
            }, 1500);
        } else {
            showResult('userManagementResult', result.message, false);
        }
    } catch (error) {
        showResult('userManagementResult', '冻结失败：' + error.message, false);
    }
}

async function unfreezeUser(userId) {
    try {
        const response = await fetch(`/api/user/unfreeze/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const result = await response.json();
        if (result.code === 200) {
            showResult('userManagementResult', '🔓 ' + result.message);
            setTimeout(() => {
                getAllUsers();
            }, 1500);
        } else {
            showResult('userManagementResult', result.message, false);
        }
    } catch (error) {
        showResult('userManagementResult', '解冻失败：' + error.message, false);
    }
}

// 员工操作函数
async function loadRoomsForStatusManagement() {
    try {
        const response = await fetch('/api/room/all');
        const result = await response.json();

        if (result.code === 200) {
            const select = document.getElementById('statusRoomSelect');
            if (select) {
                select.innerHTML = '<option value="">请选择会议室</option>';
                result.data.forEach(room => {
                    const option = document.createElement('option');
                    option.value = room.id;
                    option.textContent = `${room.name} - 当前状态: ${getStatusInfo(room.status).text}`;
                    select.appendChild(option);
                });
            }
        }
    } catch (error) {
        console.error('加载会议室列表失败：', error);
    }
}

async function setRoomStatus(status) {
    const roomId = document.getElementById('statusRoomSelect').value;

    if (!roomId) {
        showResult('roomStatusResult', '请先选择会议室', false);
        return;
    }

    try {
        // 使用表单数据发送status参数
        const formData = new FormData();
        formData.append('status', status);

        const response = await fetch(`/api/room/status/${roomId}`, {
            method: 'POST',
            body: formData
        });

        const result = await response.json();
        if (result.code === 200) {
            const statusInfo = getStatusInfo(status);
            showResult('roomStatusResult', `✅ ${result.message} - 状态已更新为: ${statusInfo.text}`);
            setTimeout(() => {
                loadRoomsForStatusManagement();
            }, 1500);
        } else {
            showResult('roomStatusResult', result.message, false);
        }
    } catch (error) {
        showResult('roomStatusResult', '设置状态失败：' + error.message, false);
    }
}

async function completeBooking(bookingId) {
    try {
        const response = await fetch(`/api/booking/complete/${bookingId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const result = await response.json();
        if (result.code === 200) {
            showResult('bookingManagementResult', '✅ ' + result.message);
            setTimeout(() => {
                getAllBookings();
            }, 1500);
        } else {
            showResult('bookingManagementResult', result.message, false);
        }
    } catch (error) {
        showResult('bookingManagementResult', '完成预订失败：' + error.message, false);
    }
}

async function reviewCancellation(requestId, approved) {
    try {
        const response = await fetch(`/api/cancellation/review/${requestId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ approved: approved })
        });

        const result = await response.json();
        if (result.code === 200) {
            showResult('bookingManagementResult', (approved ? '✅ 已批准' : '❌ 已拒绝') + '取消申请');
            setTimeout(() => {
                getPendingCancellations();
            }, 1500);
        } else {
            showResult('bookingManagementResult', result.message, false);
        }
    } catch (error) {
        showResult('bookingManagementResult', '审核失败：' + error.message, false);
    }
}

// 注册表单动态字段控制
function toggleCustomerFields() {
    const role = document.getElementById('regRole').value;
    const companyField = document.getElementById('companyField');
    const phoneField = document.getElementById('phoneField');

    if (role === 'CUSTOMER') {
        // 客户需要填写公司和电话
        companyField.style.display = 'block';
        phoneField.style.display = 'block';
        // 设置为必填
        document.getElementById('regCompany').required = true;
        document.getElementById('regPhone').required = true;
    } else {
        // 员工和管理员不需要填写公司和电话
        companyField.style.display = 'none';
        phoneField.style.display = 'none';
        // 清空值并取消必填
        document.getElementById('regCompany').value = '';
        document.getElementById('regPhone').value = '';
        document.getElementById('regCompany').required = false;
        document.getElementById('regPhone').required = false;
    }
}

// 统计功能实现
async function getSystemStatistics() {
    try {
        const response = await fetch('/api/statistics/system');
        const result = await response.json();

        if (result.code === 200) {
            const stats = result.data;
            const element = document.getElementById('statisticsResult');

            element.innerHTML = `
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px;">
                    <div style="background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 25px; border-radius: 16px; text-align: center; box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);">
                        <div style="font-size: 2.5rem; font-weight: bold; margin-bottom: 8px;">${stats.totalUsers}</div>
                        <div style="font-size: 1rem; opacity: 0.9;">总用户数</div>
                    </div>
                    <div style="background: linear-gradient(135deg, #4facfe, #00f2fe); color: white; padding: 25px; border-radius: 16px; text-align: center; box-shadow: 0 8px 25px rgba(79, 172, 254, 0.3);">
                        <div style="font-size: 2.5rem; font-weight: bold; margin-bottom: 8px;">${stats.totalRooms}</div>
                        <div style="font-size: 1rem; opacity: 0.9;">总会议室数</div>
                    </div>
                    <div style="background: linear-gradient(135deg, #43e97b, #38f9d7); color: white; padding: 25px; border-radius: 16px; text-align: center; box-shadow: 0 8px 25px rgba(67, 233, 123, 0.3);">
                        <div style="font-size: 2.5rem; font-weight: bold; margin-bottom: 8px;">${stats.totalBookings}</div>
                        <div style="font-size: 1rem; opacity: 0.9;">总预订数</div>
                    </div>
                    <div style="background: linear-gradient(135deg, #fa709a, #fee140); color: white; padding: 25px; border-radius: 16px; text-align: center; box-shadow: 0 8px 25px rgba(250, 112, 154, 0.3);">
                        <div style="font-size: 2.5rem; font-weight: bold; margin-bottom: 8px;">${stats.pendingCancellations}</div>
                        <div style="font-size: 1rem; opacity: 0.9;">待审核取消</div>
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 25px;">
                    <!-- 用户统计 -->
                    <div style="background: white; border-radius: 16px; padding: 25px; box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1); border: 1px solid rgba(255, 255, 255, 0.2);">
                        <h4 style="margin: 0 0 20px 0; color: #2c3e50; display: flex; align-items: center; gap: 10px;">
                            <i class="fas fa-users" style="color: #667eea;"></i> 用户统计
                        </h4>
                        <div style="display: grid; gap: 12px;">
                            <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: rgba(40, 167, 69, 0.1); border-radius: 8px;">
                                <span style="color: #28a745; font-weight: 600;">激活用户</span>
                                <span style="color: #28a745; font-weight: bold; font-size: 1.1rem;">${stats.activeUsers}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: rgba(255, 193, 7, 0.1); border-radius: 8px;">
                                <span style="color: #ffc107; font-weight: 600;">待审核用户</span>
                                <span style="color: #ffc107; font-weight: bold; font-size: 1.1rem;">${stats.pendingUsers}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: rgba(220, 53, 69, 0.1); border-radius: 8px;">
                                <span style="color: #dc3545; font-weight: 600;">冻结用户</span>
                                <span style="color: #dc3545; font-weight: bold; font-size: 1.1rem;">${stats.frozenUsers}</span>
                            </div>
                        </div>
                    </div>

                    <!-- 会议室统计 -->
                    <div style="background: white; border-radius: 16px; padding: 25px; box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1); border: 1px solid rgba(255, 255, 255, 0.2);">
                        <h4 style="margin: 0 0 20px 0; color: #2c3e50; display: flex; align-items: center; gap: 10px;">
                            <i class="fas fa-building" style="color: #4facfe;"></i> 会议室统计
                        </h4>
                        <div style="display: grid; gap: 12px;">
                            <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: rgba(40, 167, 69, 0.1); border-radius: 8px;">
                                <span style="color: #28a745; font-weight: 600;">空闲</span>
                                <span style="color: #28a745; font-weight: bold; font-size: 1.1rem;">${stats.availableRooms}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: rgba(23, 162, 184, 0.1); border-radius: 8px;">
                                <span style="color: #17a2b8; font-weight: 600;">已预订</span>
                                <span style="color: #17a2b8; font-weight: bold; font-size: 1.1rem;">${stats.bookedRooms}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: rgba(220, 53, 69, 0.1); border-radius: 8px;">
                                <span style="color: #dc3545; font-weight: 600;">使用中</span>
                                <span style="color: #dc3545; font-weight: bold; font-size: 1.1rem;">${stats.inUseRooms}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: rgba(108, 117, 125, 0.1); border-radius: 8px;">
                                <span style="color: #6c757d; font-weight: 600;">维护中</span>
                                <span style="color: #6c757d; font-weight: bold; font-size: 1.1rem;">${stats.maintenanceRooms}</span>
                            </div>
                        </div>
                    </div>

                    <!-- 预订统计 -->
                    <div style="background: white; border-radius: 16px; padding: 25px; box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1); border: 1px solid rgba(255, 255, 255, 0.2);">
                        <h4 style="margin: 0 0 20px 0; color: #2c3e50; display: flex; align-items: center; gap: 10px;">
                            <i class="fas fa-calendar-check" style="color: #43e97b;"></i> 预订统计
                        </h4>
                        <div style="display: grid; gap: 12px;">
                            <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: rgba(255, 193, 7, 0.1); border-radius: 8px;">
                                <span style="color: #ffc107; font-weight: 600;">待支付</span>
                                <span style="color: #ffc107; font-weight: bold; font-size: 1.1rem;">${stats.lockedBookings}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: rgba(23, 162, 184, 0.1); border-radius: 8px;">
                                <span style="color: #17a2b8; font-weight: 600;">已支付</span>
                                <span style="color: #17a2b8; font-weight: bold; font-size: 1.1rem;">${stats.paidBookings}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: rgba(40, 167, 69, 0.1); border-radius: 8px;">
                                <span style="color: #28a745; font-weight: 600;">已完成</span>
                                <span style="color: #28a745; font-weight: bold; font-size: 1.1rem;">${stats.completedBookings}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: rgba(220, 53, 69, 0.1); border-radius: 8px;">
                                <span style="color: #dc3545; font-weight: 600;">已取消</span>
                                <span style="color: #dc3545; font-weight: bold; font-size: 1.1rem;">${stats.cancelledBookings}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            element.className = 'result success';
            element.style.display = 'block';
        } else {
            showResult('statisticsResult', result.message, false);
        }
    } catch (error) {
        showResult('statisticsResult', '获取系统统计失败：' + error.message, false);
    }
}

async function getTodayStatistics() {
    try {
        const response = await fetch('/api/statistics/today');
        const result = await response.json();

        if (result.code === 200) {
            const stats = result.data;
            const element = document.getElementById('statisticsResult');

            element.innerHTML = `
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 25px; margin-bottom: 30px;">
                    <div style="background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 30px; border-radius: 20px; text-align: center; box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4); position: relative; overflow: hidden;">
                        <div style="position: absolute; top: -20px; right: -20px; width: 80px; height: 80px; background: rgba(255, 255, 255, 0.1); border-radius: 50%;"></div>
                        <div style="position: relative; z-index: 1;">
                            <i class="fas fa-calendar-day" style="font-size: 2rem; margin-bottom: 15px; opacity: 0.9;"></i>
                            <div style="font-size: 3rem; font-weight: bold; margin-bottom: 10px;">${stats.todayBookings}</div>
                            <div style="font-size: 1.1rem; opacity: 0.9;">今日预订数</div>
                        </div>
                    </div>
                    <div style="background: linear-gradient(135deg, #43e97b, #38f9d7); color: white; padding: 30px; border-radius: 20px; text-align: center; box-shadow: 0 12px 35px rgba(67, 233, 123, 0.4); position: relative; overflow: hidden;">
                        <div style="position: absolute; top: -20px; right: -20px; width: 80px; height: 80px; background: rgba(255, 255, 255, 0.1); border-radius: 50%;"></div>
                        <div style="position: relative; z-index: 1;">
                            <i class="fas fa-dollar-sign" style="font-size: 2rem; margin-bottom: 15px; opacity: 0.9;"></i>
                            <div style="font-size: 3rem; font-weight: bold; margin-bottom: 10px;">¥${stats.todayRevenue.toFixed(2)}</div>
                            <div style="font-size: 1.1rem; opacity: 0.9;">今日收入</div>
                        </div>
                    </div>
                </div>

                <div style="background: white; border-radius: 20px; padding: 30px; box-shadow: 0 12px 35px rgba(0, 0, 0, 0.1); border: 1px solid rgba(255, 255, 255, 0.2);">
                    <h4 style="margin: 0 0 25px 0; color: #2c3e50; display: flex; align-items: center; gap: 12px; font-size: 1.3rem;">
                        <i class="fas fa-chart-line" style="color: #667eea; font-size: 1.5rem;"></i> 今日详细统计
                    </h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
                        <div style="text-align: center; padding: 20px; background: rgba(102, 126, 234, 0.05); border-radius: 12px; border: 1px solid rgba(102, 126, 234, 0.1);">
                            <div style="font-size: 2rem; color: #667eea; margin-bottom: 8px;">📅</div>
                            <div style="font-size: 1.8rem; font-weight: bold; color: #2c3e50; margin-bottom: 5px;">${stats.todayBookings}</div>
                            <div style="color: #6c757d; font-size: 0.9rem;">预订总数</div>
                        </div>
                        <div style="text-align: center; padding: 20px; background: rgba(67, 233, 123, 0.05); border-radius: 12px; border: 1px solid rgba(67, 233, 123, 0.1);">
                            <div style="font-size: 2rem; color: #43e97b; margin-bottom: 8px;">💰</div>
                            <div style="font-size: 1.8rem; font-weight: bold; color: #2c3e50; margin-bottom: 5px;">¥${stats.todayRevenue.toFixed(2)}</div>
                            <div style="color: #6c757d; font-size: 0.9rem;">收入总额</div>
                        </div>
                        <div style="text-align: center; padding: 20px; background: rgba(79, 172, 254, 0.05); border-radius: 12px; border: 1px solid rgba(79, 172, 254, 0.1);">
                            <div style="font-size: 2rem; color: #4facfe; margin-bottom: 8px;">📊</div>
                            <div style="font-size: 1.8rem; font-weight: bold; color: #2c3e50; margin-bottom: 5px;">${stats.todayBookings > 0 ? (stats.todayRevenue / stats.todayBookings).toFixed(2) : '0.00'}</div>
                            <div style="color: #6c757d; font-size: 0.9rem;">平均单价</div>
                        </div>
                        <div style="text-align: center; padding: 20px; background: rgba(250, 112, 154, 0.05); border-radius: 12px; border: 1px solid rgba(250, 112, 154, 0.1);">
                            <div style="font-size: 2rem; color: #fa709a; margin-bottom: 8px;">⏰</div>
                            <div style="font-size: 1.8rem; font-weight: bold; color: #2c3e50; margin-bottom: 5px;">${new Date().toLocaleDateString('zh-CN')}</div>
                            <div style="color: #6c757d; font-size: 0.9rem;">统计日期</div>
                        </div>
                    </div>
                </div>
            `;
            element.className = 'result success';
            element.style.display = 'block';
        } else {
            showResult('statisticsResult', result.message, false);
        }
    } catch (error) {
        showResult('statisticsResult', '获取今日统计失败：' + error.message, false);
    }
}