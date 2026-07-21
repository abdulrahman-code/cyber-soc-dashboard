// ======================================================
// CyberSOC Dashboard - الملف الرئيسي للجافاسكريبت
// ======================================================

// ======================================================
// 1. تهيئة المتغيرات العامة
// ======================================================
const APP = {
    config: {
        language: localStorage.getItem('soc_language') || 'ar',
        sidebarCollapsed: localStorage.getItem('soc_sidebar') === 'true',
        refreshInterval: 30000,
    },
    state: {
        isLoaded: false,
        notifications: [],
        threats: [],
        incidents: [],
        stats: {},
        charts: {},
    }
};

// ======================================================
// 2. القائمة الجانبية - للجوال (حل مضمون)
// ======================================================

// فتح وإغلاق القائمة
function toggleSidebar() {
    var sidebar = document.getElementById('sidebar');
    var overlay = document.getElementById('sidebarOverlay');
    
    console.log('🔄 toggleSidebar called!');
    
    if (sidebar) {
        sidebar.classList.toggle('open');
        console.log('📱 Sidebar classList:', sidebar.classList);
    }
    
    if (overlay) {
        overlay.classList.toggle('active');
    }
    
    // منع تمرير الصفحة عند فتح القائمة
    if (sidebar && sidebar.classList.contains('open')) {
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
    } else {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
    }
}

// إغلاق القائمة
function closeSidebar() {
    var sidebar = document.getElementById('sidebar');
    var overlay = document.getElementById('sidebarOverlay');
    
    if (sidebar) {
        sidebar.classList.remove('open');
    }
    if (overlay) {
        overlay.classList.remove('active');
    }
    
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
}

// التأكد من أن الدوال متاحة عالمياً
window.toggleSidebar = toggleSidebar;
window.closeSidebar = closeSidebar;

// ======================================================
// 3. التهيئة عند تحميل الصفحة
// ======================================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 DOM loaded successfully!');
    
    // إخفاء شاشة التحميل
    setTimeout(function() {
        var loading = document.getElementById('loading-screen');
        if (loading) loading.classList.add('hide');
    }, 800);
    
    // تهيئة اللغة
    initLanguage();
    
    // تهيئة الإشعارات
    initNotifications();
    
    // تهيئة القائمة الجانبية
    initSidebarEvents();
    
    // تحديث البيانات
    updateStats();
    updateThreats();
    updateIncidents();
    
    // ساعة
    updateClock();
    setInterval(updateClock, 1000);
    
    // التحقق من حالة تسجيل الدخول
    checkAuth();
    
    console.log('✅ Dashboard ready!');
});

// ======================================================
// 4. اللغة
// ======================================================
function initLanguage() {
    var lang = localStorage.getItem('soc_language') || 'ar';
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    
    var btn = document.querySelector('.lang-toggle');
    if (btn) {
        btn.textContent = lang === 'ar' ? '🇬🇧 EN' : '🇸🇦 عربي';
        btn.onclick = function() {
            var current = document.documentElement.lang;
            var next = current === 'ar' ? 'en' : 'ar';
            document.documentElement.dir = next === 'ar' ? 'rtl' : 'ltr';
            document.documentElement.lang = next;
            localStorage.setItem('soc_language', next);
            this.textContent = next === 'ar' ? '🇬🇧 EN' : '🇸🇦 عربي';
        };
    }
}

// ======================================================
// 5. الإشعارات
// ======================================================
function initNotifications() {
    var badge = document.querySelector('.notification-badge');
    var dropdown = document.querySelector('.notification-dropdown');
    
    if (badge && dropdown) {
        badge.onclick = function(e) {
            e.stopPropagation();
            dropdown.classList.toggle('show');
        };
        
        document.onclick = function() {
            dropdown.classList.remove('show');
        };
    }
}

// ======================================================
// 6. أحداث القائمة الجانبية
// ======================================================
function initSidebarEvents() {
    console.log('📱 Initializing sidebar events...');
    
    // إغلاق القائمة عند النقر على الروابط
    var navLinks = document.querySelectorAll('.sidebar .nav-link');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            closeSidebar();
        });
    });
    
    // إغلاق القائمة عند الضغط على زر الرجوع
    window.addEventListener('popstate', function() {
        closeSidebar();
    });
    
    // إغلاق القائمة عند تغيير حجم الشاشة (من جوال إلى سطح مكتب)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992) {
            closeSidebar();
        }
    });
    
    console.log('✅ Sidebar events initialized!');
}

// ======================================================
// 7. الساعة
// ======================================================
function updateClock() {
    var clock = document.getElementById('clock');
    if (!clock) return;
    var now = new Date();
    var time = now.toLocaleTimeString('ar-SA', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    clock.textContent = '🕐 ' + time;
}

// ======================================================
// 8. تحديث البيانات
// ======================================================
function updateStats() {
    var total = document.getElementById('total-threats');
    var critical = document.getElementById('critical-threats');
    var incidents = document.getElementById('total-incidents');
    var active = document.getElementById('active-incidents');
    
    if (total) total.textContent = '55';
    if (critical) critical.textContent = '8';
    if (incidents) incidents.textContent = '23';
    if (active) active.textContent = '5';
}

function updateThreats() {
    var tbody = document.querySelector('#threats-table tbody');
    if (!tbody) return;
    
    var data = [
        { name: 'هجوم DDoS متقدم', type: 'DDoS', severity: 'critical', source: '192.168.1.100', status: 'active', time: '2026-01-21 14:30' },
        { name: 'محاولة حقن SQL', type: 'SQL Injection', severity: 'high', source: '45.33.22.11', status: 'investigating', time: '2026-01-21 13:15' },
        { name: 'برمجية فدية WannaCry', type: 'Ransomware', severity: 'critical', source: '192.168.5.50', status: 'active', time: '2026-01-21 12:00' },
        { name: 'حملة تصيد احتيالي', type: 'Phishing', severity: 'medium', source: '203.0.113.45', status: 'investigating', time: '2026-01-21 11:20' },
        { name: 'محاولات Brute Force SSH', type: 'Brute Force', severity: 'high', source: '198.51.100.67', status: 'resolved', time: '2026-01-21 10:45' }
    ];
    
    var html = '';
    data.forEach(function(t) {
        html += '<tr>' +
            '<td>' + t.name + '</td>' +
            '<td>' + t.type + '</td>' +
            '<td><span class="badge badge-' + t.severity + '">' + t.severity + '</span></td>' +
            '<td>' + t.source + '</td>' +
            '<td><span class="badge badge-' + t.status + '">' + t.status + '</span></td>' +
            '<td>' + t.time + '</td>' +
        '</tr>';
    });
    tbody.innerHTML = html;
}

function updateIncidents() {
    var tbody = document.querySelector('#incidents-table tbody');
    if (!tbody) return;
    
    var data = [
        { id: 'INC-2026-001', title: 'هجوم DDoS على خوادم الويب', priority: 'critical', status: 'new', time: '2026-01-21 14:30' },
        { id: 'INC-2026-002', title: 'محاولة حقن SQL في قاعدة البيانات', priority: 'high', status: 'investigating', time: '2026-01-21 13:15' },
        { id: 'INC-2026-003', title: 'انتشار برمجية فدية على الشبكة', priority: 'critical', status: 'new', time: '2026-01-21 12:00' },
        { id: 'INC-2026-004', title: 'محاولات اختراق SSH متكررة', priority: 'high', status: 'resolved', time: '2026-01-21 10:45' },
        { id: 'INC-2026-005', title: 'ثغرة في تطبيق CRM', priority: 'medium', status: 'investigating', time: '2026-01-21 09:30' }
    ];
    
    var html = '';
    data.forEach(function(t) {
        html += '<tr>' +
            '<td>' + t.id + '</td>' +
            '<td>' + t.title + '</td>' +
            '<td><span class="badge badge-' + t.priority + '">' + t.priority + '</span></td>' +
            '<td><span class="badge badge-' + t.status + '">' + t.status + '</span></td>' +
            '<td>' + t.time + '</td>' +
        '</tr>';
    });
    tbody.innerHTML = html;
}

// ======================================================
// 9. التحقق من تسجيل الدخول
// ======================================================
function checkAuth() {
    var loggedIn = sessionStorage.getItem('loggedIn');
    var currentPage = window.location.pathname.split('/').pop();
    
    // إذا كانت الصفحة هي login.html أو register.html، لا نحتاج للتحقق
    if (currentPage === 'login.html' || currentPage === 'register.html') {
        return;
    }
    
    // التحقق من تسجيل الدخول
    if (!loggedIn || loggedIn !== 'true') {
        window.location.href = 'login.html';
    }
}

// ======================================================
// 10. تسجيل الخروج
// ======================================================
function logout() {
    if (confirm('هل أنت متأكد من تسجيل الخروج؟')) {
        sessionStorage.removeItem('loggedIn');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('userRole');
        sessionStorage.removeItem('userName');
        window.location.href = 'login.html';
    }
}

// ======================================================
// 11. تصدير البيانات
// ======================================================
function exportData(type) {
    if (type === 'csv') {
        var threats = APP.state.threats || [];
        if (threats.length === 0) {
            alert('⚠️ لا توجد بيانات للتصدير');
            return;
        }
        
        var csv = 'الاسم,النوع,الخطورة,المصدر,الحالة,التوقيت\n';
        threats.forEach(function(t) {
            csv += t.name + ',' + t.type + ',' + t.severity + ',' + t.source + ',' + t.status + ',' + t.time + '\n';
        });
        
        var blob = new Blob([csv], { type: 'text/csv' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'threats_export_' + new Date().toISOString().slice(0,10) + '.csv';
        a.click();
        URL.revokeObjectURL(url);
    } else {
        alert('📄 سيتم تصدير PDF قريباً');
    }
}

// ======================================================
// 12. تحديث البيانات (يدوي)
// ======================================================
function refreshData() {
    updateStats();
    updateThreats();
    updateIncidents();
    alert('🔄 تم تحديث البيانات بنجاح!');
}

// ======================================================
// 13. تصدير الوظائف للاستخدام العالمي
// ======================================================
window.APP = APP;
window.toggleSidebar = toggleSidebar;
window.closeSidebar = closeSidebar;
window.logout = logout;
window.exportData = exportData;
window.refreshData = refreshData;

console.log('✅ main.js loaded successfully!');
