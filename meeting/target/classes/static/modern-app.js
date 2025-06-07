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
                <div class="stats-summary">
                    <div class="summary-card">
                        <div class="summary-number">${result.data.length}</div>
                        <div class="summary-label">可用会议室</div>
                    </div>
                </div>
                ${createDataGrid(result.data, 'room')}
            `;
            element.className = 'result success';
            element.style.display = 'block';

            // 更新预订选项
            updateBookingRoomOptions(result.data, startTime, endTime);
        } else {
            showResult('searchResult', result.message, false);
        }
    } catch (error) {
        showResult('searchResult', '搜索失败：' + error.message, false);
    }
}

function updateBookingRoomOptions(rooms, startTime, endTime) {
    const select = document.getElementById('bookingRoomId');
    select.innerHTML = '<option value="">请选择会议室</option>';

    rooms.forEach(room => {
        const option = document.createElement('option');
        option.value = room.id;
        option.textContent = `${room.name} - ${room.type === 'CLASSROOM' ? '教室型' : '圆桌型'} - ${room.capacity}人 - ¥${room.pricePerHour}/小时`;
        select.appendChild(option);
    });

    // 同步时间到预订表单
    document.getElementById('bookingStartTime').value = startTime;
    document.getElementById('bookingEndTime').value = endTime;
}

// 预订相关功能
async function createBooking() {
    const roomId = document.getElementById('bookingRoomId').value;
    const startTime = document.getElementById('bookingStartTime').value;
    const endTime = document.getElementById('bookingEndTime').value;
    const participantCount = document.getElementById('participantCount').value;
    const needProjector = document.getElementById('bookingNeedProjector').checked;
    const needSound = document.getElementById('bookingNeedSound').checked;
    const needNetwork = document.getElementById('bookingNeedNetwork').checked;

    if (!roomId || !startTime || !endTime || !participantCount) {
        showResult('bookingResult', '请填写完整的预订信息', false);
        return;
    }

    if (!currentUser || currentUser.role !== 'CUSTOMER') {
        showResult('bookingResult', '只有客户可以创建预订', false);
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
            showResult('bookingResult', '✅ ' + result.message);
            // 清空表单
            document.getElementById('bookingRoomId').value = '';
            document.getElementById('participantCount').value = '';
            document.getElementById('bookingNeedProjector').checked = false;
            document.getElementById('bookingNeedSound').checked = false;
            document.getElementById('bookingNeedNetwork').checked = false;
        } else {
            showResult('bookingResult', result.message, false);
        }
    } catch (error) {
        showResult('bookingResult', '创建预订失败：' + error.message, false);
    }
}

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

            // 统计不同状态的预订
            const stats = {
                total: result.data.length,
                locked: result.data.filter(b => b.status === 'LOCKED').length,
                paid: result.data.filter(b => b.status === 'PAID').length,
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
                        <div class="summary-number">${stats.cancelled}</div>
                        <div class="summary-label">已取消</div>
                    </div>
                </div>
                ${createDataGrid(result.data, 'booking')}
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

function getStatusText(status) {
    const statusMap = {
        'LOCKED': '🔒 已锁定(待支付)',
        'PAID': '✅ 已支付',
        'CANCELLED': '❌ 已取消',
        'COMPLETED': '✔️ 已完成'
    };
    return statusMap[status] || status;
}

function updatePaymentBookingOptions(bookings) {
    const select = document.getElementById('paymentBookingId');
    select.innerHTML = '<option value="">请选择要支付的预订</option>';

    bookings.filter(booking => booking.status === 'LOCKED').forEach(booking => {
        const option = document.createElement('option');
        option.value = booking.id;
        option.textContent = `预订${booking.id} - ${booking.startTime} 至 ${booking.endTime} - ¥${booking.totalPrice}`;
        select.appendChild(option);
    });
}

function updateCancellationBookingOptions(bookings) {
    const select = document.getElementById('cancellationBookingId');
    select.innerHTML = '<option value="">请选择要取消的预订</option>';

    bookings.filter(booking => booking.status === 'PAID').forEach(booking => {
        const option = document.createElement('option');
        option.value = booking.id;
        option.textContent = `预订${booking.id} - ${booking.startTime} 至 ${booking.endTime} - ¥${booking.totalPrice}`;
        select.appendChild(option);
    });
}

async function payBooking() {
    const bookingId = document.getElementById('paymentBookingId').value;

    if (!bookingId) {
        showResult('paymentResult', '请选择要支付的预订', false);
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
            document.getElementById('paymentBookingId').value = '';
            getMyBookings(); // 刷新预订列表
        } else {
            showResult('paymentResult', result.message, false);
        }
    } catch (error) {
        showResult('paymentResult', '支付失败：' + error.message, false);
    }
}

// 取消申请功能
async function submitCancellation() {
    const bookingId = document.getElementById('cancellationBookingId').value;
    const reason = document.getElementById('cancellationReason').value;

    if (!bookingId) {
        showResult('cancellationResult', '请选择要取消的预订', false);
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
            document.getElementById('cancellationBookingId').value = '';
            document.getElementById('cancellationReason').value = '';
        } else {
            showResult('cancellationResult', result.message, false);
        }
    } catch (error) {
        showResult('cancellationResult', '提交取消申请失败：' + error.message, false);
    }
}

async function getCancellationRules() {
    const message = `📋 退费规则：\n\n` +
        `🟢 提前72小时以上：退全款（100%）\n` +
        `🟡 提前48-72小时：退75%\n` +
        `🟠 提前24-48小时：退25%\n` +
        `🔴 提前不足24小时：不可取消`;
    showResult('cancellationResult', message);
}

// 美化数据展示函数
function createDataGrid(data, type) {
    if (!data || data.length === 0) {
        return `<div class="empty-state">
            <div class="icon">📭</div>
            <div>暂无数据</div>
        </div>`;
    }

    let html = '<div class="data-grid">';

    data.forEach(item => {
        html += createDataItem(item, type);
    });

    html += '</div>';
    return html;
}

function createDataItem(item, type) {
    switch (type) {
        case 'room':
            return createRoomItem(item);
        case 'booking':
            return createBookingItem(item);
        case 'user':
            return createUserItem(item);
        case 'cancellation':
            return createCancellationItem(item);
        default:
            return createGenericItem(item);
    }
}

function createRoomItem(room) {
    const statusClass = room.status === 'AVAILABLE' ? 'status-available' : 'status-in-use';
    const statusText = room.status === 'AVAILABLE' ? '可用' : '使用中';

    return `
        <div class="data-item">
            <div class="data-header">
                <div class="data-title">🏢 ${room.name}</div>
                <div class="data-status ${statusClass}">${statusText}</div>
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
                    <i class="fas fa-tools icon"></i>
                    <span class="label">设备:</span>
                    <span class="value">${getEquipmentText(room)}</span>
                </div>
            </div>
        </div>
    `;
}

function createBookingItem(booking) {
    const statusClass = getBookingStatusClass(booking.status);
    const statusText = getStatusText(booking.status);

    return `
        <div class="data-item">
            <div class="data-header">
                <div class="data-title">📅 预订 #${booking.id}</div>
                <div class="data-status ${statusClass}">${statusText}</div>
            </div>
            <div class="data-details">
                <div class="data-field">
                    <i class="fas fa-building icon"></i>
                    <span class="label">会议室:</span>
                    <span class="value">${booking.roomName || `ID: ${booking.roomId}`}</span>
                </div>
                <div class="data-field">
                    <i class="fas fa-clock icon"></i>
                    <span class="label">开始时间:</span>
                    <span class="value">${formatDateTime(booking.startTime)}</span>
                </div>
                <div class="data-field">
                    <i class="fas fa-clock icon"></i>
                    <span class="label">结束时间:</span>
                    <span class="value">${formatDateTime(booking.endTime)}</span>
                </div>
                <div class="data-field">
                    <i class="fas fa-users icon"></i>
                    <span class="label">参会人数:</span>
                    <span class="value">${booking.participantCount}人</span>
                </div>
                <div class="data-field">
                    <i class="fas fa-dollar-sign icon"></i>
                    <span class="label">总价:</span>
                    <span class="value">¥${booking.totalPrice}</span>
                </div>
                ${booking.status === 'LOCKED' ? `
                <div class="data-field">
                    <i class="fas fa-exclamation-triangle icon"></i>
                    <span class="label">支付截止:</span>
                    <span class="value">${formatDateTime(booking.paymentDeadline)}</span>
                </div>
                ` : ''}
            </div>
        </div>
    `;
}

function createUserItem(user) {
    const statusClass = user.status === 'ACTIVE' ? 'status-active' : 'status-pending';
    const statusText = user.status === 'ACTIVE' ? '已激活' : '待审核';

    return `
        <div class="data-item">
            <div class="data-header">
                <div class="data-title">👤 ${user.name}</div>
                <div class="data-status ${statusClass}">${statusText}</div>
            </div>
            <div class="data-details">
                <div class="data-field">
                    <i class="fas fa-user icon"></i>
                    <span class="label">用户名:</span>
                    <span class="value">${user.username}</span>
                </div>
                <div class="data-field">
                    <i class="fas fa-id-badge icon"></i>
                    <span class="label">角色:</span>
                    <span class="value">${getRoleText(user.role)}</span>
                </div>
                ${user.company ? `
                <div class="data-field">
                    <i class="fas fa-building icon"></i>
                    <span class="label">公司:</span>
                    <span class="value">${user.company}</span>
                </div>
                ` : ''}
                ${user.phone ? `
                <div class="data-field">
                    <i class="fas fa-phone icon"></i>
                    <span class="label">电话:</span>
                    <span class="value">${user.phone}</span>
                </div>
                ` : ''}
            </div>
        </div>
    `;
}

function createCancellationItem(cancellation) {
    const statusClass = cancellation.status === 'APPROVED' ? 'status-active' : 'status-pending';
    const statusText = cancellation.status === 'APPROVED' ? '已批准' : '待审核';

    return `
        <div class="data-item">
            <div class="data-header">
                <div class="data-title">🚫 取消申请 #${cancellation.id}</div>
                <div class="data-status ${statusClass}">${statusText}</div>
            </div>
            <div class="data-details">
                <div class="data-field">
                    <i class="fas fa-calendar icon"></i>
                    <span class="label">预订ID:</span>
                    <span class="value">${cancellation.bookingId}</span>
                </div>
                <div class="data-field">
                    <i class="fas fa-user icon"></i>
                    <span class="label">客户:</span>
                    <span class="value">${cancellation.customerName || `ID: ${cancellation.customerId}`}</span>
                </div>
                <div class="data-field">
                    <i class="fas fa-comment icon"></i>
                    <span class="label">原因:</span>
                    <span class="value">${cancellation.reason || '无'}</span>
                </div>
                <div class="data-field">
                    <i class="fas fa-dollar-sign icon"></i>
                    <span class="label">退款金额:</span>
                    <span class="value">¥${cancellation.refundAmount || '待计算'}</span>
                </div>
            </div>
        </div>
    `;
}

// 辅助函数
function getEquipmentText(room) {
    const equipment = [];
    if (room.hasProjector) equipment.push('投影仪');
    if (room.hasSound) equipment.push('音响');
    if (room.hasNetwork) equipment.push('网络');
    return equipment.length > 0 ? equipment.join(', ') : '无';
}

function getBookingStatusClass(status) {
    const statusMap = {
        'LOCKED': 'status-pending',
        'PAID': 'status-paid',
        'CANCELLED': 'status-locked',
        'COMPLETED': 'status-active'
    };
    return statusMap[status] || 'status-pending';
}

function getRoleText(role) {
    const roleMap = {
        'ADMIN': '管理员',
        'EMPLOYEE': '员工',
        'CUSTOMER': '客户'
    };
    return roleMap[role] || role;
}

function formatDateTime(dateTimeStr) {
    if (!dateTimeStr) return '';
    return dateTimeStr.replace('T', ' ').substring(0, 16);
}

// 初始化页面
document.addEventListener('DOMContentLoaded', function() {
    updateUserInterface();
    toggleCustomerFields();
});