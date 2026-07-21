// ======================================================
// CyberSOC Dashboard - الملف الرئيسي للجافاسكريبت
// ======================================================

// ======================================================
// 1. تهيئة المتغيرات العامة
// ======================================================
const APP = {
    config: {
        theme: localStorage.getItem('soc_theme') || 'dark',
        language: localStorage.getItem('soc_language') || 'ar',
        background: localStorage.getItem('soc_background') || 'matrix',
        sidebarCollapsed: localStorage.getItem('soc_sidebar') === 'true',
        refreshInterval: 30000, // 30 ثانية
    },
    state: {
        isLoaded: false,
        notifications: [],
        threats: [],
        incidents: [],
        stats: {},
        charts: {},
        currentPage: window.location.pathname.split('/').pop() || 'index.html',
    }
};

// ======================================================
// 2. نظام الخلفيات الحية
// ======================================================
class BackgroundManager {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.currentBg = APP.config.background;
        this.animationId = null;
        this.particles = [];
        this.matrixColumns = [];
        this.nodes = [];
        this.codeLines = [];
        this.width = 0;
        this.height = 0;
        
        this.init();
    }
    
    init() {
        // إنشاء حاوية الخلفية
        const container = document.createElement('div');
        container.id = 'background-container';
        container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            z-index: -1;
            pointer-events: none;
            overflow: hidden;
        `;
        document.body.prepend(container);
        
        // إنشاء canvas
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'bg-canvas';
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            z-index: -1;
            pointer-events: none;
        `;
        container.appendChild(this.canvas);
        
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        
        // بدء الخلفية المناسبة
        this.loadBackground(this.currentBg);
        
        // إضافة مستمعي الأحداث
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        const dpr = window.devicePixelRatio || 1;
        const rect = document.body.getBoundingClientRect();
        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;
        this.canvas.style.width = rect.width + 'px';
        this.canvas.style.height = rect.height + 'px';
        this.ctx.scale(dpr, dpr);
        this.width = rect.width;
        this.height = rect.height;
        
        // إعادة تهيئة الخلفية الحالية
        if (this.currentBg) {
            this.loadBackground(this.currentBg);
        }
    }
    
    loadBackground(type) {
        this.currentBg = type;
        this.clear();
        
        switch(type) {
            case 'matrix':
                this.initMatrixRain();
                break;
            case 'network':
                this.initNetworkRipple();
                break;
            case 'particles':
                this.initParticles();
                break;
            case 'code':
                this.initCodeStream();
                break;
            case 'fog':
                this.initCyberFog();
                break;
            default:
                this.initMatrixRain();
        }
        
        this.animate();
    }
    
    // 2.1 خلفية المطر الرقمي (Matrix)
    initMatrixRain() {
        this.matrixColumns = [];
        const cols = Math.floor(this.width / 20);
        for (let i = 0; i < cols; i++) {
            this.matrixColumns[i] = Math.floor(Math.random() * this.height / 20);
        }
        this.matrixChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
        this.matrixFontSize = 18;
        this.matrixSpeed = 0.3;
    }
    
    drawMatrixRain() {
        const ctx = this.ctx;
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, this.width, this.height);
        
        ctx.font = this.matrixFontSize + 'px "Courier New", monospace';
        
        for (let i = 0; i < this.matrixColumns.length; i++) {
            const char = this.matrixChars[Math.floor(Math.random() * this.matrixChars.length)];
            const x = i * this.matrixFontSize + 5;
            const y = this.matrixColumns[i] * this.matrixFontSize;
            
            // تغيير اللون لإنشاء تأثير متدرج
            const green = Math.floor(Math.random() * 155 + 100);
            const opacity = Math.random() * 0.5 + 0.5;
            ctx.fillStyle = 'rgba(0, ' + green + ', 0, ' + opacity + ')';
            ctx.shadowColor = 'rgba(0, 255, 0, 0.3)';
            ctx.shadowBlur = 10;
            
            ctx.fillText(char, x, y);
            
            // إعادة تعيين العمود
            if (y > this.height && Math.random() > 0.98) {
                this.matrixColumns[i] = 0;
            }
            this.matrixColumns[i] += this.matrixSpeed;
        }
        
        // ومضات عشوائية
        if (Math.random() > 0.997) {
            ctx.fillStyle = 'rgba(0, 255, 0, 0.8)';
            ctx.shadowBlur = 50;
            ctx.shadowColor = 'rgba(0, 255, 0, 0.5)';
            const x = Math.random() * this.width;
            const y = Math.random() * this.height;
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.shadowBlur = 0;
    }
    
    // 2.2 خلفية الشبكة (Network Ripple)
    initNetworkRipple() {
        this.nodes = [];
        const numNodes = 50;
        for (let i = 0; i < numNodes; i++) {
            this.nodes.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 3 + 2,
                pulse: Math.random() * Math.PI * 2,
            });
        }
    }
    
    drawNetworkRipple() {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.width, this.height);
        
        // خلفية داكنة
        const gradient = ctx.createRadialGradient(
            this.width / 2, this.height / 2, 0,
            this.width / 2, this.height / 2, this.width / 2
        );
        gradient.addColorStop(0, 'rgba(0, 10, 20, 0.9)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0.95)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, this.width, this.height);
        
        // تحديث وتحرك العقد
        for (let node of this.nodes) {
            node.x += node.vx;
            node.y += node.vy;
            node.pulse += 0.02;
            
            if (node.x < 0 || node.x > this.width) node.vx *= -1;
            if (node.y < 0 || node.y > this.height) node.vy *= -1;
        }
        
        // رسم الخطوط بين العقد القريبة
        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = i + 1; j < this.nodes.length; j++) {
                const dx = this.nodes[i].x - this.nodes[j].x;
                const dy = this.nodes[i].y - this.nodes[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < 200) {
                    const opacity = (1 - dist / 200) * 0.3;
                    ctx.beginPath();
                    ctx.moveTo(this.nodes[i].x, this.nodes[i].y);
                    ctx.lineTo(this.nodes[j].x, this.nodes[j].y);
                    ctx.strokeStyle = 'rgba(0, 240, 255, ' + opacity + ')';
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                    
                    if (dist < 80) {
                        ctx.shadowColor = 'rgba(0, 240, 255, 0.1)';
                        ctx.shadowBlur = 15;
                    }
                }
            }
        }
        
        // رسم العقد
        for (let node of this.nodes) {
            const pulseRadius = node.radius + Math.sin(node.pulse) * 2;
            const gradient2 = ctx.createRadialGradient(
                node.x, node.y, 0,
                node.x, node.y, pulseRadius * 2
            );
            gradient2.addColorStop(0, 'rgba(0, 240, 255, 1)');
            gradient2.addColorStop(0.5, 'rgba(0, 240, 255, 0.4)');
            gradient2.addColorStop(1, 'rgba(0, 240, 255, 0)');
            
            ctx.beginPath();
            ctx.arc(node.x, node.y, pulseRadius * 2, 0, Math.PI * 2);
            ctx.fillStyle = gradient2;
            ctx.fill();
            
            ctx.beginPath();
            ctx.arc(node.x, node.y, pulseRadius, 0, Math.PI * 2);
            ctx.fillStyle = '#00f0ff';
            ctx.shadowColor = 'rgba(0, 240, 255, 0.5)';
            ctx.shadowBlur = 15;
            ctx.fill();
        }
        ctx.shadowBlur = 0;
    }
    
    // 2.3 خلفية الجسيمات
    initParticles() {
        this.particles = [];
        const numParticles = 120;
        for (let i = 0; i < numParticles; i++) {
            const hue = Math.random() * 60 + 180;
            this.particles.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                vx: (Math.random() - 0.5) * 1.2,
                vy: (Math.random() - 0.5) * 1.2,
                radius: Math.random() * 2 + 1,
                color: 'hsl(' + hue + ', 100%, 50%)',
            });
        }
    }
    
    drawParticles() {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.width, this.height);
        
        ctx.fillStyle = 'rgba(0, 0, 0, 0.95)';
        ctx.fillRect(0, 0, this.width, this.height);
        
        for (let p of this.particles) {
            p.x += p.vx;
            p.y += p.vy;
            
            if (p.x < 0 || p.x > this.width) p.vx *= -1;
            if (p.y < 0 || p.y > this.height) p.vy *= -1;
            
            // اتصال بين الجسيمات القريبة
            for (let p2 of this.particles) {
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < 120) {
                    const opacity = (1 - dist / 120) * 0.3;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = 'rgba(0, 240, 255, ' + opacity + ')';
                    ctx.lineWidth = 0.3;
                    ctx.stroke();
                }
            }
            
            // رسم الجسيم
            const gradient = ctx.createRadialGradient(
                p.x, p.y, 0,
                p.x, p.y, p.radius * 3
            );
            gradient.addColorStop(0, p.color);
            gradient.addColorStop(1, 'rgba(0, 240, 255, 0)');
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.shadowColor = p.color;
            ctx.shadowBlur = 10;
            ctx.fill();
        }
        ctx.shadowBlur = 0;
    }
    
    // 2.4 خلفية سطور الأكواد
    initCodeStream() {
        this.codeLines = [];
        const languages = ['python', 'javascript', 'php', 'sql', 'bash'];
        const codeSnippets = {
            python: ['import os, sys', 'def exploit(target):', '    socket.connect(ip, port)', '    return payload.encode()', 'class ReverseShell:', '    def __init__(self):', '        self.conn = None', 'while True:', '    data = socket.recv(1024)'],
            javascript: ['const express = require("express");', 'app.get("/", (req, res) => {', '    res.send("Hacked!");', '});', 'const socket = io.connect();', 'socket.emit("attack", payload);', 'function exploit() {', '    return new Promise((resolve) => {', '        resolve("Access Granted");', '    });', '}'],
            php: ['<?php', '$conn = mysqli_connect($host, $user, $pass);', 'function exploit($input) {', '    return eval($input);', '}', 'if (isset($_GET["cmd"])) {', '    system($_GET["cmd"]);', '}', '?>'],
            sql: ['SELECT * FROM users;', 'DROP TABLE logs;', 'INSERT INTO admins VALUES ("hacker", "pass");', 'UPDATE passwords SET hash = "hacked";', 'SELECT password FROM users WHERE id = 1;'],
            bash: ['#!/bin/bash', 'nc -l -p 4444 -e /bin/sh', 'rm -rf /var/log/*', 'echo "Hacked" > index.html', './exploit.sh']
        };
        
        const totalLines = 50;
        for (let i = 0; i < totalLines; i++) {
            const lang = languages[Math.floor(Math.random() * languages.length)];
            const snippets = codeSnippets[lang];
            const text = snippets[Math.floor(Math.random() * snippets.length)];
            const hue = Math.random() * 60 + 120;
            this.codeLines.push({
                text: text,
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                speed: Math.random() * 0.5 + 0.2,
                opacity: Math.random() * 0.2 + 0.05,
                color: 'hsl(' + hue + ', 80%, 50%)',
            });
        }
    }
    
    drawCodeStream() {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.width, this.height);
        
        ctx.fillStyle = 'rgba(0, 0, 0, 0.95)';
        ctx.fillRect(0, 0, this.width, this.height);
        
        ctx.font = '12px "Courier New", monospace';
        
        for (let line of this.codeLines) {
            line.y += line.speed;
            if (line.y > this.height) {
                line.y = -20;
                line.x = Math.random() * this.width;
            }
            
            ctx.fillStyle = line.color;
            ctx.globalAlpha = line.opacity;
            ctx.shadowColor = line.color;
            ctx.shadowBlur = 5;
            ctx.fillText(line.text, line.x, line.y);
        }
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
    }
    
    // 2.5 خلفية الضباب الإلكتروني
    initCyberFog() {
        this.fogTime = 0;
    }
    
    drawCyberFog() {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.width, this.height);
        
        const gradient = ctx.createRadialGradient(
            this.width / 2 + Math.sin(this.fogTime) * 100,
            this.height / 2 + Math.cos(this.fogTime * 0.7) * 100,
            0,
            this.width / 2,
            this.height / 2,
            this.width * 0.7
        );
        const alpha1 = 0.03 + Math.sin(this.fogTime) * 0.01;
        const alpha2 = 0.02 + Math.cos(this.fogTime * 0.5) * 0.01;
        const alpha3 = 0.01 + Math.sin(this.fogTime * 0.3) * 0.005;
        gradient.addColorStop(0, 'rgba(0, 240, 255, ' + alpha1 + ')');
        gradient.addColorStop(0.3, 'rgba(124, 58, 237, ' + alpha2 + ')');
        gradient.addColorStop(0.6, 'rgba(236, 72, 153, ' + alpha3 + ')');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0.9)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, this.width, this.height);
        
        this.fogTime += 0.003;
    }
    
    // 2.6 حلقة الرسم الرئيسية
    animate() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        switch(this.currentBg) {
            case 'matrix':
                this.drawMatrixRain();
                break;
            case 'network':
                this.drawNetworkRipple();
                break;
            case 'particles':
                this.drawParticles();
                break;
            case 'code':
                this.drawCodeStream();
                break;
            case 'fog':
                this.drawCyberFog();
                break;
            default:
                this.drawMatrixRain();
        }
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    clear() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }
    
    switchBackground(type) {
        this.loadBackground(type);
        APP.config.background = type;
        localStorage.setItem('soc_background', type);
        
        // تحديث الأزرار النشطة
        document.querySelectorAll('.bg-switcher-btn').forEach(function(btn) {
            btn.classList.toggle('active', btn.dataset.bg === type);
        });
    }
}

// ======================================================
// 3. تهيئة التطبيق
// ======================================================
var backgroundManager = null;

document.addEventListener('DOMContentLoaded', function() {
    // إخفاء شاشة التحميل
    setTimeout(function() {
        var loading = document.getElementById('loading-screen');
        if (loading) loading.classList.add('hide');
    }, 1000);
    
    // تهيئة الخلفيات
    backgroundManager = new BackgroundManager();
    
    // تهيئة المكونات
    initTheme();
    initLanguage();
    initSidebar();
    initBackgroundSwitcher();
    initNotifications();
    initCharts();
    initDataRefresh();
    initEventListeners();
    
    // تحميل البيانات
    loadStats();
    loadThreats();
    loadIncidents();
    
    APP.state.isLoaded = true;
    console.log('🚀 CyberSOC Dashboard initialized successfully!');
});

// ======================================================
// 4. نظام الثيمات
// ======================================================
function initTheme() {
    var theme = APP.config.theme;
    document.documentElement.setAttribute('data-theme', theme);
    
    var icon = document.querySelector('.theme-toggle');
    if (icon) {
        icon.textContent = theme === 'dark' ? '🌙' : '☀️';
    }
}

function toggleTheme() {
    var current = APP.config.theme;
    var newTheme = current === 'dark' ? 'light' : 'dark';
    APP.config.theme = newTheme;
    localStorage.setItem('soc_theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    
    var icon = document.querySelector('.theme-toggle');
    if (icon) {
        icon.textContent = newTheme === 'dark' ? '🌙' : '☀️';
        icon.style.transform = 'rotate(360deg)';
        setTimeout(function() {
            icon.style.transform = 'rotate(0)';
        }, 300);
    }
}

// ======================================================
// 5. نظام اللغة
// ======================================================
function initLanguage() {
    var lang = APP.config.language;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    
    var btn = document.querySelector('.lang-toggle');
    if (btn) {
        btn.textContent = lang === 'ar' ? '🇬🇧 EN' : '🇸🇦 عربي';
    }
}

function toggleLanguage() {
    var current = APP.config.language;
    var newLang = current === 'ar' ? 'en' : 'ar';
    APP.config.language = newLang;
    localStorage.setItem('soc_language', newLang);
    
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
    
    var btn = document.querySelector('.lang-toggle');
    if (btn) {
        btn.textContent = newLang === 'ar' ? '🇬🇧 EN' : '🇸🇦 عربي';
    }
    
    updateLanguage(newLang);
}

function updateLanguage(lang) {
    var translations = {
        ar: {
            dashboard: 'لوحة التحكم',
            threats: 'التهديدات',
            incidents: 'الحوادث',
            settings: 'الإعدادات',
        },
        en: {
            dashboard: 'Dashboard',
            threats: 'Threats',
            incidents: 'Incidents',
            settings: 'Settings',
        }
    };
    
    document.querySelectorAll('[data-translate]').forEach(function(el) {
        var key = el.dataset.translate;
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
}

// ======================================================
// 6. الشريط الجانبي
// ======================================================
function initSidebar() {
    var sidebar = document.querySelector('.sidebar');
    var mainContent = document.querySelector('.main-content');
    
    if (APP.config.sidebarCollapsed) {
        if (sidebar) sidebar.classList.add('collapsed');
        if (mainContent) mainContent.classList.add('expanded');
    }
}

function toggleSidebar() {
    var sidebar = document.querySelector('.sidebar');
    var mainContent = document.querySelector('.main-content');
    
    if (!sidebar) return;
    
    sidebar.classList.toggle('collapsed');
    if (mainContent) mainContent.classList.toggle('expanded');
    
    APP.config.sidebarCollapsed = sidebar.classList.contains('collapsed');
    localStorage.setItem('soc_sidebar', APP.config.sidebarCollapsed);
}
// ==========================================
// تبديل القائمة الجانبية (للجوال)
// ==========================================
function toggleSidebar() {
    var sidebar = document.getElementById('sidebar');
    if (sidebar) {
        sidebar.classList.toggle('open');
    }
}

// إغلاق القائمة عند النقر خارجها (للجوال)
document.addEventListener('click', function(event) {
    var sidebar = document.getElementById('sidebar');
    var toggle = document.querySelector('.menu-toggle');
    
    if (sidebar && toggle) {
        var isClickInsideSidebar = sidebar.contains(event.target);
        var isClickOnToggle = toggle.contains(event.target);
        
        if (!isClickInsideSidebar && !isClickOnToggle) {
            sidebar.classList.remove('open');
        }
    }
});

// ======================================================
// 7. مبدل الخلفيات
// ======================================================
function initBackgroundSwitcher() {
    document.querySelectorAll('.bg-switcher-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var bgType = this.dataset.bg;
            if (backgroundManager) {
                backgroundManager.switchBackground(bgType);
            }
        });
    });
}

// ======================================================
// 8. الإشعارات
// ======================================================
function initNotifications() {
    var badge = document.querySelector('.notification-badge');
    var dropdown = document.querySelector('.notification-dropdown');
    
    if (badge && dropdown) {
        badge.addEventListener('click', function(e) {
            e.stopPropagation();
            dropdown.classList.toggle('show');
        });
        
        document.addEventListener('click', function(e) {
            if (!badge.contains(e.target)) {
                dropdown.classList.remove('show');
            }
        });
    }
}

// ======================================================
// 9. الرسوم البيانية
// ======================================================
function initCharts() {
    // يتم تهيئة الرسوم البيانية في الصفحات الفردية
    console.log('📊 Charts initialized');
}

// ======================================================
// 10. تحديث البيانات الفوري
// ======================================================
function initDataRefresh() {
    setInterval(function() {
        loadStats();
        loadThreats();
        loadIncidents();
    }, APP.config.refreshInterval);
}

// ======================================================
// 11. تحميل البيانات من API
// ======================================================
function loadStats() {
    // بيانات تجريبية
    var stats = {
        total_threats: 55,
        critical_threats: 8,
        total_incidents: 23,
        active_incidents: 5
    };
    APP.state.stats = stats;
    updateStatsUI(stats);
}

function loadThreats() {
    // بيانات تجريبية
    var threats = [
        { name: 'هجوم DDoS متقدم', type: 'DDoS', severity: 'critical', source: '192.168.1.100', status: 'active', timestamp: '2026-01-15 14:30:22' },
        { name: 'محاولة حقن SQL', type: 'SQL Injection', severity: 'high', source: '45.33.22.11', status: 'investigating', timestamp: '2026-01-15 13:15:45' },
        { name: 'برمجية فدية WannaCry', type: 'Ransomware', severity: 'critical', source: '192.168.5.50', status: 'active', timestamp: '2026-01-15 12:00:10' },
        { name: 'حملة تصيد احتيالي', type: 'Phishing', severity: 'medium', source: '203.0.113.45', status: 'investigating', timestamp: '2026-01-15 11:20:33' },
        { name: 'محاولات Brute Force SSH', type: 'Brute Force', severity: 'high', source: '198.51.100.67', status: 'resolved', timestamp: '2026-01-15 10:45:18' }
    ];
    APP.state.threats = threats;
    updateThreatsUI(threats);
}

function loadIncidents() {
    // بيانات تجريبية
    var incidents = [
        { id: 'INC-2026-001', title: 'هجوم DDoS على خوادم الويب', priority: 'critical', status: 'new', time: '2026-01-15 14:30:22' },
        { id: 'INC-2026-002', title: 'محاولة حقن SQL في قاعدة البيانات', priority: 'high', status: 'investigating', time: '2026-01-15 13:15:45' },
        { id: 'INC-2026-003', title: 'انتشار برمجية فدية على الشبكة', priority: 'critical', status: 'new', time: '2026-01-15 12:00:10' },
        { id: 'INC-2026-004', title: 'محاولات اختراق SSH متكررة', priority: 'high', status: 'resolved', time: '2026-01-15 10:45:18' },
        { id: 'INC-2026-005', title: 'ثغرة في تطبيق CRM', priority: 'medium', status: 'investigating', time: '2026-01-15 09:30:55' }
    ];
    APP.state.incidents = incidents;
    updateIncidentsUI(incidents);
}

// ======================================================
// 12. تحديث واجهة المستخدم
// ======================================================
function updateStatsUI(stats) {
    var totalThreats = document.getElementById('total-threats');
    var criticalThreats = document.getElementById('critical-threats');
    var totalIncidents = document.getElementById('total-incidents');
    var activeIncidents = document.getElementById('active-incidents');
    
    if (totalThreats) totalThreats.textContent = stats.total_threats || 0;
    if (criticalThreats) criticalThreats.textContent = stats.critical_threats || 0;
    if (totalIncidents) totalIncidents.textContent = stats.total_incidents || 0;
    if (activeIncidents) activeIncidents.textContent = stats.active_incidents || 0;
}

function updateThreatsUI(threats) {
    var table = document.querySelector('#threats-table tbody');
    if (!table) return;
    
    var html = '';
    threats.forEach(function(threat) {
        html += '<tr>' +
            '<td>' + (threat.name || '') + '</td>' +
            '<td>' + (threat.type || '') + '</td>' +
            '<td><span class="badge badge-' + (threat.severity || 'low') + '">' + (threat.severity || 'Low') + '</span></td>' +
            '<td>' + (threat.source || '') + '</td>' +
            '<td><span class="badge badge-' + (threat.status || 'active') + '">' + (threat.status || 'Active') + '</span></td>' +
            '<td>' + (threat.timestamp || '') + '</td>' +
        '</tr>';
    });
    table.innerHTML = html;
}

function updateIncidentsUI(incidents) {
    var table = document.querySelector('#incidents-table tbody');
    if (!table) return;
    
    var html = '';
    incidents.forEach(function(incident) {
        html += '<tr>' +
            '<td>' + (incident.id || '') + '</td>' +
            '<td>' + (incident.title || '') + '</td>' +
            '<td><span class="badge badge-' + (incident.priority || 'medium') + '">' + (incident.priority || 'Medium') + '</span></td>' +
            '<td><span class="badge badge-' + (incident.status || 'new') + '">' + (incident.status || 'New') + '</span></td>' +
            '<td>' + (incident.time || '') + '</td>' +
        '</tr>';
    });
    table.innerHTML = html;
}

// ======================================================
// 13. مستمعي الأحداث العامة
// ======================================================
function initEventListeners() {
    // زر تبديل الثيم
    var themeBtn = document.querySelector('.theme-toggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', toggleTheme);
    }
    
    // زر تبديل اللغة
    var langBtn = document.querySelector('.lang-toggle');
    if (langBtn) {
        langBtn.addEventListener('click', toggleLanguage);
    }
    
    // زر تبديل الشريط الجانبي
    var menuBtn = document.querySelector('.menu-toggle');
    if (menuBtn) {
        menuBtn.addEventListener('click', toggleSidebar);
    }
    
    // تأثير التوهج على البطاقات حسب حركة الماوس
    document.querySelectorAll('.glass-card').forEach(function(card) {
        card.addEventListener('mousemove', function(e) {
            var rect = this.getBoundingClientRect();
            var x = ((e.clientX - rect.left) / rect.width) * 100;
            var y = ((e.clientY - rect.top) / rect.height) * 100;
            this.style.setProperty('--mouse-x', x + '%');
            this.style.setProperty('--mouse-y', y + '%');
        });
    });
}

// ======================================================
// 14. دوال مساعدة للتصدير
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
            csv += t.name + ',' + t.type + ',' + t.severity + ',' + t.source + ',' + t.status + ',' + t.timestamp + '\n';
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

function refreshData() {
    loadStats();
    loadThreats();
    loadIncidents();
    alert('🔄 تم تحديث البيانات بنجاح!');
}

// ======================================================
// 15. تصدير الوظائف للاستخدام في صفحات أخرى
// ======================================================
window.APP = APP;
window.toggleTheme = toggleTheme;
window.toggleLanguage = toggleLanguage;
window.toggleSidebar = toggleSidebar;
window.loadStats = loadStats;
window.loadThreats = loadThreats;
window.loadIncidents = loadIncidents;
window.exportData = exportData;
window.refreshData = refreshData;

console.log('✅ main.js loaded successfully!');
// ==========================================
// القائمة الجانبية - للجوال
// ==========================================

// فتح وإغلاق القائمة
function toggleSidebar() {
    var sidebar = document.getElementById('sidebar');
    var overlay = document.getElementById('sidebarOverlay');
    
    if (sidebar) {
        sidebar.classList.toggle('open');
    }
    if (overlay) {
        overlay.classList.toggle('active');
    }
}

// إغلاق القائمة عند النقر على الخلفية المظلمة
function closeSidebar() {
    var sidebar = document.getElementById('sidebar');
    var overlay = document.getElementById('sidebarOverlay');
    
    if (sidebar) {
        sidebar.classList.remove('open');
    }
    if (overlay) {
        overlay.classList.remove('active');
    }
}

// إغلاق القائمة عند النقر على رابط داخلها
document.addEventListener('DOMContentLoaded', function() {
    var navLinks = document.querySelectorAll('.sidebar .nav-link');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            closeSidebar();
        });
    });
});

// إغلاق القائمة عند الضغط على زر الرجوع في الجوال
window.addEventListener('popstate', function() {
    closeSidebar();
});
