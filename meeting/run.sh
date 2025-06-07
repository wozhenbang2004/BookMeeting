#!/bin/bash

echo ""
echo "🎨 ========================================"
echo "   动漫风格会议室预订系统启动器"
echo "🎨 ========================================"
echo ""

# 切换到脚本所在目录
cd "$(dirname "$0")"

echo "📦 正在编译项目..."
mvn clean compile

if [ $? -ne 0 ]; then
    echo ""
    echo "❌ 编译失败！请检查代码错误。"
    echo ""
    exit 1
fi

echo ""
echo "✅ 编译成功！"
echo ""
echo "🚀 正在启动动漫风格会议室预订系统..."
echo ""
echo "💡 启动完成后请访问："
echo "   🎨 动漫风格界面: http://localhost:8080/modern-ui.html"
echo "   📊 API文档: http://localhost:8080/swagger-ui.html"
echo ""
echo "🎮 按 Ctrl+C 停止服务器"
echo ""

mvn spring-boot:run

echo ""
echo "👋 系统已停止运行"
