// 管理员功能
async function getAllUsers() {
    try {
        const response = await fetch('/api/user/all');
        const result = await response.json();

        if (result.code === 200) {
            const element = document.getElementById('userManagementResult');

            // 统计不同状态的用户
            const stats = {
                total: result.data.length,
                active: result.data.filter(u => u.status === 'ACTIVE').length,
                pending: result.data.filter(u => u.status === 'PENDING').length,
                frozen: result.data.filter(u => u.status === 'FROZEN').length
            };

            element.innerHTML = `
                <div class="stats-summary">
                    <div class="summary-card">
                        <div class="summary-number">${stats.total}</div>
                        <div class="summary-label">总用户</div>
                    </div>
                    <div class="summary-card">
                        <div class="summary-number">${stats.active}</div>
                        <div class="summary-label">已激活</div>
                    </div>
                    <div class="summary-card">
                        <div class="summary-number">${stats.pending}</div>
                        <div class="summary-label">待审核</div>
                    </div>
                    <div class="summary-card">
                        <div class="summary-number">${stats.frozen}</div>
                        <div class="summary-label">已冻结</div>
                    </div>
                </div>
                ${createDataGrid(result.data, 'user')}
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
                <div class="stats-summary">
                    <div class="summary-card">
                        <div class="summary-number">${result.data.length}</div>
                        <div class="summary-label">待审核用户</div>
                    </div>
                </div>
                ${createDataGrid(result.data, 'user')}
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
        // 显示时间段选择器
        const resultId = currentUser && currentUser.role === 'ADMIN' ? 'roomManagementResult' : 'roomStatusResult';
        const element = document.getElementById(resultId);

        element.innerHTML = `
            <div class="time-period-selector">
                <h4>🕐 会议室状态查询</h4>
                <div class="time-inputs">
                    <div class="input-group">
                        <label>查询模式:</label>
                        <select id="statusQueryMode" onchange="toggleTimeInputs()">
                            <option value="current">当前时刻状态</option>
                            <option value="period">指定时间段状态</option>
                        </select>
                    </div>
                    <div id="timeInputs" style="display: none;">
                        <div class="quick-time-selector">
                            <label>快捷选择:</label>
                            <div class="quick-buttons">
                                <button type="button" onclick="setQuickTime('today')" class="btn-quick">今天</button>
                                <button type="button" onclick="setQuickTime('tomorrow')" class="btn-quick">明天</button>
                                <button type="button" onclick="setQuickTime('thisWeek')" class="btn-quick">本周</button>
                                <button type="button" onclick="setQuickTime('nextWeek')" class="btn-quick">下周</button>
                            </div>
                        </div>
                        <div class="input-group">
                            <label>开始时间:</label>
                            <input type="datetime-local" id="statusStartTime">
                        </div>
                        <div class="input-group">
                            <label>结束时间:</label>
                            <input type="datetime-local" id="statusEndTime">
                        </div>
                    </div>
                    <button onclick="queryRoomStatus()" class="btn-primary">查询状态</button>
                </div>
            </div>
            <div id="roomStatusDisplay"></div>
        `;
        element.className = 'result success';
        element.style.display = 'block';

        // 默认查询当前时刻状态
        queryRoomStatus();

    } catch (error) {
        const resultId = currentUser && currentUser.role === 'ADMIN' ? 'roomManagementResult' : 'roomStatusResult';
        showResult(resultId, '初始化会议室状态查询失败：' + error.message, false);
    }
}

function toggleTimeInputs() {
    const mode = document.getElementById('statusQueryMode').value;
    const timeInputs = document.getElementById('timeInputs');

    if (mode === 'period') {
        timeInputs.style.display = 'block';
        // 设置默认时间
        const now = new Date();
        const startTime = new Date(now.getTime() + 60 * 60 * 1000); // 1小时后
        const endTime = new Date(startTime.getTime() + 2 * 60 * 60 * 1000); // 2小时后

        document.getElementById('statusStartTime').value = formatDateTimeLocal(startTime);
        document.getElementById('statusEndTime').value = formatDateTimeLocal(endTime);
    } else {
        timeInputs.style.display = 'none';
    }
}

function formatDateTimeLocal(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

// 快捷时间选择
function setQuickTime(period) {
    const now = new Date();
    let startTime, endTime;

    switch (period) {
        case 'today':
            startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 8, 0); // 8:00
            endTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 21, 0); // 21:00
            break;
        case 'tomorrow':
            const tomorrow = new Date(now);
            tomorrow.setDate(tomorrow.getDate() + 1);
            startTime = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 8, 0);
            endTime = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 21, 0);
            break;
        case 'thisWeek':
            // 本周剩余时间（从今天到周日）
            const daysUntilSunday = 7 - now.getDay();
            startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 8, 0);
            endTime = new Date(now);
            endTime.setDate(endTime.getDate() + daysUntilSunday);
            endTime.setHours(21, 0, 0, 0);
            break;
        case 'nextWeek':
            // 下周一到周日
            const daysUntilNextMonday = (8 - now.getDay()) % 7;
            startTime = new Date(now);
            startTime.setDate(startTime.getDate() + daysUntilNextMonday);
            startTime.setHours(8, 0, 0, 0);
            endTime = new Date(startTime);
            endTime.setDate(endTime.getDate() + 6);
            endTime.setHours(21, 0, 0, 0);
            break;
        default:
            return;
    }

    // 设置时间输入框的值
    document.getElementById('statusStartTime').value = formatDateTimeLocal(startTime);
    document.getElementById('statusEndTime').value = formatDateTimeLocal(endTime);
}

async function queryRoomStatus() {
    try {
        const mode = document.getElementById('statusQueryMode').value;
        let url = '/api/room/status-in-period';

        if (mode === 'period') {
            const startTime = document.getElementById('statusStartTime').value;
            const endTime = document.getElementById('statusEndTime').value;

            if (!startTime || !endTime) {
                showResult('roomStatusDisplay', '请选择开始时间和结束时间', false);
                return;
            }

            const params = new URLSearchParams({
                startTime: startTime.replace('T', ' ') + ':00',
                endTime: endTime.replace('T', ' ') + ':00'
            });
            url += '?' + params;
        }

        const response = await fetch(url);
        const result = await response.json();

        if (result.code === 200) {
            displayRoomStatus(result.data, mode);
        } else {
            showResult('roomStatusDisplay', result.message, false);
        }
    } catch (error) {
        showResult('roomStatusDisplay', '查询会议室状态失败：' + error.message, false);
    }
}

function displayRoomStatus(rooms, mode) {
    const displayElement = document.getElementById('roomStatusDisplay');

    if (mode === 'current') {
        // 当前时刻模式：显示统计和列表
        const stats = {
            total: rooms.length,
            available: rooms.filter(r => r.currentStatus === 'AVAILABLE').length,
            booked: rooms.filter(r => r.currentStatus === 'BOOKED').length,
            inUse: rooms.filter(r => r.currentStatus === 'IN_USE').length,
            locked: rooms.filter(r => r.currentStatus === 'LOCKED').length,
            maintenance: rooms.filter(r => r.currentStatus === 'MAINTENANCE').length
        };

        displayElement.innerHTML = `
            <div class="stats-summary">
                <div class="summary-card">
                    <div class="summary-number">${stats.total}</div>
                    <div class="summary-label">总会议室</div>
                </div>
                <div class="summary-card">
                    <div class="summary-number">${stats.available}</div>
                    <div class="summary-label">空闲</div>
                </div>
                <div class="summary-card">
                    <div class="summary-number">${stats.booked}</div>
                    <div class="summary-label">已预订</div>
                </div>
                <div class="summary-card">
                    <div class="summary-number">${stats.inUse}</div>
                    <div class="summary-label">使用中</div>
                </div>
                <div class="summary-card">
                    <div class="summary-number">${stats.locked}</div>
                    <div class="summary-label">锁定中</div>
                </div>
                <div class="summary-card">
                    <div class="summary-number">${stats.maintenance}</div>
                    <div class="summary-label">维护中</div>
                </div>
            </div>
            ${createCurrentStatusGrid(rooms)}
        `;
    } else {
        // 时间段模式：显示时间线和冲突信息
        displayElement.innerHTML = `
            <div class="period-status-header">
                <h4>📊 时间段状态分析</h4>
                <p>查询时间段内的会议室占用情况</p>
            </div>
            ${createPeriodStatusGrid(rooms)}
        `;
    }
}

function showAddRoomForm() {
    document.getElementById('addRoomSection').style.display = 'grid';
    // 滚动到表单位置
    document.getElementById('addRoomSection').scrollIntoView({ behavior: 'smooth' });
}

function hideAddRoomForm() {
    document.getElementById('addRoomSection').style.display = 'none';
    // 清空表单
    document.getElementById('roomName').value = '';
    document.getElementById('roomType').value = 'CLASSROOM';
    document.getElementById('roomCapacity').value = '';
    document.getElementById('roomPrice').value = '';
    document.getElementById('roomHasProjector').checked = false;
    document.getElementById('roomHasSound').checked = false;
    document.getElementById('roomHasNetwork').checked = false;
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
            showResult('addRoomResult', '🏢 ' + result.message);
            hideAddRoomForm();
        } else {
            showResult('addRoomResult', result.message, false);
        }
    } catch (error) {
        showResult('addRoomResult', '添加会议室失败：' + error.message, false);
    }
}

// 统计功能
async function getSystemStatistics() {
    try {
        const response = await fetch('/api/statistics/system');
        const result = await response.json();

        if (result.code === 200) {
            const stats = result.data;
            const element = document.getElementById('statisticsResult');

            element.innerHTML = `
                <div class="stats-summary">
                    <div class="summary-card">
                        <div class="summary-number">${stats.totalUsers}</div>
                        <div class="summary-label">总用户</div>
                    </div>
                    <div class="summary-card">
                        <div class="summary-number">${stats.totalRooms}</div>
                        <div class="summary-label">总会议室</div>
                    </div>
                    <div class="summary-card">
                        <div class="summary-number">${stats.totalBookings}</div>
                        <div class="summary-label">总预订</div>
                    </div>
                    <div class="summary-card">
                        <div class="summary-number">${stats.pendingCancellations}</div>
                        <div class="summary-label">待审核取消</div>
                    </div>
                </div>

                <div class="data-grid">
                    <div class="data-item">
                        <div class="data-header">
                            <div class="data-title">👥 用户统计</div>
                        </div>
                        <div class="data-details">
                            <div class="data-field">
                                <i class="fas fa-users icon"></i>
                                <span class="label">总用户数:</span>
                                <span class="value">${stats.totalUsers}</span>
                            </div>
                            <div class="data-field">
                                <i class="fas fa-check-circle icon"></i>
                                <span class="label">激活用户:</span>
                                <span class="value">${stats.activeUsers}</span>
                            </div>
                            <div class="data-field">
                                <i class="fas fa-clock icon"></i>
                                <span class="label">待审核用户:</span>
                                <span class="value">${stats.pendingUsers}</span>
                            </div>
                            <div class="data-field">
                                <i class="fas fa-ban icon"></i>
                                <span class="label">冻结用户:</span>
                                <span class="value">${stats.frozenUsers}</span>
                            </div>
                        </div>
                    </div>

                    <div class="data-item">
                        <div class="data-header">
                            <div class="data-title">🏢 会议室统计</div>
                        </div>
                        <div class="data-details">
                            <div class="data-field">
                                <i class="fas fa-building icon"></i>
                                <span class="label">总会议室数:</span>
                                <span class="value">${stats.totalRooms}</span>
                            </div>
                            <div class="data-field">
                                <i class="fas fa-check icon"></i>
                                <span class="label">可用会议室:</span>
                                <span class="value">${stats.availableRooms}</span>
                            </div>
                            <div class="data-field">
                                <i class="fas fa-calendar icon"></i>
                                <span class="label">已预订会议室:</span>
                                <span class="value">${stats.bookedRooms}</span>
                            </div>
                            <div class="data-field">
                                <i class="fas fa-play icon"></i>
                                <span class="label">使用中会议室:</span>
                                <span class="value">${stats.inUseRooms}</span>
                            </div>
                            <div class="data-field">
                                <i class="fas fa-tools icon"></i>
                                <span class="label">维护中会议室:</span>
                                <span class="value">${stats.maintenanceRooms}</span>
                            </div>
                        </div>
                    </div>

                    <div class="data-item">
                        <div class="data-header">
                            <div class="data-title">📅 预订统计</div>
                        </div>
                        <div class="data-details">
                            <div class="data-field">
                                <i class="fas fa-list icon"></i>
                                <span class="label">总预订数:</span>
                                <span class="value">${stats.totalBookings}</span>
                            </div>
                            <div class="data-field">
                                <i class="fas fa-lock icon"></i>
                                <span class="label">锁定预订:</span>
                                <span class="value">${stats.lockedBookings}</span>
                            </div>
                            <div class="data-field">
                                <i class="fas fa-credit-card icon"></i>
                                <span class="label">已支付预订:</span>
                                <span class="value">${stats.paidBookings}</span>
                            </div>
                            <div class="data-field">
                                <i class="fas fa-check-double icon"></i>
                                <span class="label">已完成预订:</span>
                                <span class="value">${stats.completedBookings}</span>
                            </div>
                            <div class="data-field">
                                <i class="fas fa-times icon"></i>
                                <span class="label">已取消预订:</span>
                                <span class="value">${stats.cancelledBookings}</span>
                            </div>
                        </div>
                    </div>

                    <div class="data-item">
                        <div class="data-header">
                            <div class="data-title">📝 取消申请统计</div>
                        </div>
                        <div class="data-details">
                            <div class="data-field">
                                <i class="fas fa-clock icon"></i>
                                <span class="label">待审核:</span>
                                <span class="value">${stats.pendingCancellations}</span>
                            </div>
                            <div class="data-field">
                                <i class="fas fa-check icon"></i>
                                <span class="label">已批准:</span>
                                <span class="value">${stats.approvedCancellations}</span>
                            </div>
                            <div class="data-field">
                                <i class="fas fa-times icon"></i>
                                <span class="label">已拒绝:</span>
                                <span class="value">${stats.rejectedCancellations}</span>
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
                <div class="stats-summary">
                    <div class="summary-card">
                        <div class="summary-number">${stats.todayBookings}</div>
                        <div class="summary-label">今日预订</div>
                    </div>
                    <div class="summary-card">
                        <div class="summary-number">¥${stats.todayRevenue.toFixed(2)}</div>
                        <div class="summary-label">今日收入</div>
                    </div>
                </div>

                <div class="data-grid">
                    <div class="data-item">
                        <div class="data-header">
                            <div class="data-title">📈 今日统计信息</div>
                            <div class="data-status status-active">实时数据</div>
                        </div>
                        <div class="data-details">
                            <div class="data-field">
                                <i class="fas fa-calendar-day icon"></i>
                                <span class="label">今日预订数:</span>
                                <span class="value">${stats.todayBookings}</span>
                            </div>
                            <div class="data-field">
                                <i class="fas fa-dollar-sign icon"></i>
                                <span class="label">今日收入:</span>
                                <span class="value">¥${stats.todayRevenue.toFixed(2)}</span>
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
        showResult('statisticsResult', '获取今日统计失败：' + error.message, false);
    }
}

// 员工功能
async function getAllBookings() {
    try {
        const response = await fetch('/api/booking/all');
        const result = await response.json();

        if (result.code === 200) {
            const element = document.getElementById('bookingManagementResult');

            // 统计不同状态的预订
            const stats = {
                total: result.data.length,
                locked: result.data.filter(b => b.status === 'LOCKED').length,
                paid: result.data.filter(b => b.status === 'PAID').length,
                completed: result.data.filter(b => b.status === 'COMPLETED').length,
                cancelled: result.data.filter(b => b.status === 'CANCELLED').length
            };

            element.innerHTML = `
                <div class="stats-summary">
                    <div class="summary-card">
                        <div class="summary-number">${stats.total}</div>
                        <div class="summary-label">总预订</div>
                    </div>
                    <div class="summary-card">
                        <div class="summary-number">${stats.locked}</div>
                        <div class="summary-label">待支付</div>
                    </div>
                    <div class="summary-card">
                        <div class="summary-number">${stats.paid}</div>
                        <div class="summary-label">已支付</div>
                    </div>
                    <div class="summary-card">
                        <div class="summary-number">${stats.completed}</div>
                        <div class="summary-label">已完成</div>
                    </div>
                    <div class="summary-card">
                        <div class="summary-number">${stats.cancelled}</div>
                        <div class="summary-label">已取消</div>
                    </div>
                </div>
                ${createDataGrid(result.data, 'booking')}
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
                <div class="stats-summary">
                    <div class="summary-card">
                        <div class="summary-number">${result.data.length}</div>
                        <div class="summary-label">待审核取消申请</div>
                    </div>
                </div>
                ${createDataGrid(result.data, 'cancellation')}
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

// 工具函数
function getRoleText(role) {
    const roleMap = {
        'ADMIN': '👑 管理员',
        'EMPLOYEE': '👔 员工',
        'CUSTOMER': '👤 客户'
    };
    return roleMap[role] || role;
}

function getUserStatusText(status) {
    const statusMap = {
        'ACTIVE': '✅ 激活',
        'PENDING': '⏳ 待审核',
        'FROZEN': '❄️ 冻结'
    };
    return statusMap[status] || status;
}

function getRoomStatusText(status) {
    const statusMap = {
        'AVAILABLE': '✅ 可用',
        'LOCKED': '🔒 锁定',
        'BOOKED': '📅 已预订',
        'IN_USE': '🏃 使用中',
        'MAINTENANCE': '🔧 维护中',
        'CONFLICT': '⚠️ 有冲突',
        'FULLY_OCCUPIED': '🔴 完全占用',
        'MOSTLY_OCCUPIED': '🟡 大部分占用',
        'PARTIALLY_OCCUPIED': '🟠 部分占用'
    };
    return statusMap[status] || status;
}

function createCurrentStatusGrid(rooms) {
    let html = '<div class="data-grid">';

    rooms.forEach(room => {
        const statusClass = getStatusClass(room.currentStatus);
        html += `
            <div class="data-item">
                <div class="data-header">
                    <div class="data-title">🏢 ${room.name}</div>
                    <div class="data-status ${statusClass}">${getRoomStatusText(room.currentStatus)}</div>
                </div>
                <div class="data-details">
                    <div class="data-field">
                        <i class="fas fa-tag icon"></i>
                        <span class="label">类型:</span>
                        <span class="value">${room.type === 'CLASSROOM' ? '教室型' : '圆桌型'}</span>
                    </div>
                    <div class="data-field">
                        <i class="fas fa-users icon"></i>
                        <span class="label">容量:</span>
                        <span class="value">${room.capacity}人</span>
                    </div>
                    <div class="data-field">
                        <i class="fas fa-dollar-sign icon"></i>
                        <span class="label">价格:</span>
                        <span class="value">¥${room.pricePerHour}/小时</span>
                    </div>
                    <div class="data-field">
                        <i class="fas fa-cogs icon"></i>
                        <span class="label">设备:</span>
                        <span class="value">${getEquipmentText(room)}</span>
                    </div>
                    <div class="data-field">
                        <i class="fas fa-info-circle icon"></i>
                        <span class="label">状态说明:</span>
                        <span class="value">${room.statusDescription}</span>
                    </div>
                </div>
            </div>
        `;
    });

    html += '</div>';
    return html;
}

function createPeriodStatusGrid(rooms) {
    let html = '<div class="data-grid">';

    rooms.forEach(room => {
        const statusClass = getStatusClass(room.periodStatus);
        html += `
            <div class="data-item">
                <div class="data-header">
                    <div class="data-title">🏢 ${room.name}</div>
                    <div class="data-status ${statusClass}">${getRoomStatusText(room.periodStatus)}</div>
                </div>
                <div class="data-details">
                    <div class="data-field">
                        <i class="fas fa-info-circle icon"></i>
                        <span class="label">状态说明:</span>
                        <span class="value">${room.statusDescription}</span>
                    </div>
                    ${room.conflicts && room.conflicts.length > 0 ? createTimelineVisualization(room.conflicts) : ''}
                </div>
            </div>
        `;
    });

    html += '</div>';
    return html;
}

function createTimelineVisualization(conflicts) {
    if (!conflicts || conflicts.length === 0) {
        return '';
    }

    // 计算时间范围用于线段图
    const timeRange = calculateTimeRange(conflicts);

    let html = `
        <div class="data-field timeline-field">
            <i class="fas fa-clock icon"></i>
            <span class="label">时间占用情况:</span>
            <div class="timeline-container">
                ${createTimelineSegments(conflicts, timeRange)}
                <div class="timeline-details">
    `;

    conflicts.forEach((conflict, index) => {
        const startTime = new Date(conflict.startTime);
        const endTime = new Date(conflict.endTime);
        const statusText = conflict.status === 'PAID' ? '已支付' : '锁定中';
        const statusClass = conflict.status === 'PAID' ? 'status-paid' : 'status-locked';

        html += `
            <div class="timeline-item">
                <div class="timeline-marker ${statusClass}"></div>
                <div class="timeline-content">
                    <div class="timeline-time">
                        ${formatTimeRange(startTime, endTime)}
                    </div>
                    <div class="timeline-status ${statusClass}">
                        ${statusText} (预订ID: ${conflict.bookingId})
                    </div>
                    <div class="timeline-duration">
                        时长: ${calculateDuration(startTime, endTime)}
                    </div>
                </div>
            </div>
        `;
    });

    html += `
                </div>
            </div>
        </div>
    `;

    return html;
}

// 计算时间范围
function calculateTimeRange(conflicts) {
    if (!conflicts || conflicts.length === 0) return null;

    let minTime = new Date(conflicts[0].startTime);
    let maxTime = new Date(conflicts[0].endTime);

    conflicts.forEach(conflict => {
        const start = new Date(conflict.startTime);
        const end = new Date(conflict.endTime);
        if (start < minTime) minTime = start;
        if (end > maxTime) maxTime = end;
    });

    return { start: minTime, end: maxTime };
}

// 创建时间线段图
function createTimelineSegments(conflicts, timeRange) {
    if (!timeRange) return '';

    const totalDuration = timeRange.end - timeRange.start;

    let html = `
        <div class="timeline-segments">
            <div class="timeline-axis">
                <div class="timeline-start">${formatTime(timeRange.start)}</div>
                <div class="timeline-end">${formatTime(timeRange.end)}</div>
            </div>
            <div class="timeline-bar">
    `;

    conflicts.forEach((conflict, index) => {
        const start = new Date(conflict.startTime);
        const end = new Date(conflict.endTime);
        const startOffset = ((start - timeRange.start) / totalDuration) * 100;
        const width = ((end - start) / totalDuration) * 100;
        const statusClass = conflict.status === 'PAID' ? 'segment-paid' : 'segment-locked';

        html += `
            <div class="timeline-segment ${statusClass}"
                 style="left: ${startOffset}%; width: ${width}%;"
                 title="预订ID: ${conflict.bookingId} | ${formatTimeRange(start, end)}">
            </div>
        `;
    });

    html += `
            </div>
        </div>
    `;

    return html;
}

// 格式化时间范围
function formatTimeRange(start, end) {
    const startStr = start.toLocaleDateString() + ' ' + start.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
    const endStr = end.toLocaleDateString() + ' ' + end.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });

    // 如果是同一天，只显示一次日期
    if (start.toDateString() === end.toDateString()) {
        return `${start.toLocaleDateString()} ${start.toLocaleTimeString('zh-CN', {hour: '2-digit', minute: '2-digit'})} - ${end.toLocaleTimeString('zh-CN', {hour: '2-digit', minute: '2-digit'})}`;
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

function getStatusClass(status) {
    const classMap = {
        'AVAILABLE': 'status-active',
        'LOCKED': 'status-warning',
        'BOOKED': 'status-info',
        'IN_USE': 'status-success',
        'MAINTENANCE': 'status-error',
        'CONFLICT': 'status-warning',
        'FULLY_OCCUPIED': 'status-error',
        'MOSTLY_OCCUPIED': 'status-warning',
        'PARTIALLY_OCCUPIED': 'status-info'
    };
    return classMap[status] || 'status-default';
}

function getEquipmentText(room) {
    const equipment = [];
    if (room.hasProjector) equipment.push('投影仪');
    if (room.hasSound) equipment.push('音响');
    if (room.hasNetwork) equipment.push('网络');
    return equipment.length > 0 ? equipment.join(', ') : '无';
}