# 🛡️ CyberSOC Dashboard - منصة مراقبة وتحليل الأمن السيبراني

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Status](https://img.shields.io/badge/status-active-success.svg)

> **منصة متقدمة لمراقبة وتحليل التهديدات الأمنية وإدارة الحوادث السيبرانية في الوقت الفعلي**

---

## 📋 **نظرة عامة**

**CyberSOC Dashboard** هي منصة أمن سيبراني متكاملة مصممة خصيصاً لمساعدة فرق مراكز العمليات الأمنية (SOC) في مراقبة وتحليل التهديدات وإدارة الحوادث بكفاءة عالية. تم تطوير المنصة بأحدث تقنيات الويب مع واجهة مستخدم احترافية تشبه منصات SOC الحقيقية.

---

## ✨ **المميزات الرئيسية**

### 🔐 **الأمان والتحكم**
- ✅ نظام تسجيل دخول آمن مع صلاحيات متعددة
- ✅ تشفير كلمات المرور باستخدام bcrypt
- ✅ حماية ضد CSRF و XSS و SQL Injection
- ✅ جلسات آمنة مع انتهاء صلاحية تلقائية
- ✅ سجل نشاطات كامل للمستخدمين

### 📊 **لوحة التحكم**
- ✅ إحصائيات فورية للتهديدات والحوادث
- ✅ رسوم بيانية تفاعلية (خطية ودائرية)
- ✅ بطاقات عرض سريعة للمؤشرات الرئيسية
- ✅ تحديث تلقائي للبيانات
- ✅ عرض آخر التهديدات والحوادث

### ⚠️ **إدارة التهديدات**
- ✅ قائمة شاملة للتهديدات مع تفاصيل كاملة
- ✅ تصفية متقدمة حسب: الخطورة، النوع، الحالة
- ✅ البحث السريع عن التهديدات
- ✅ تحديث حالة التهديدات
- ✅ تصدير البيانات بصيغ CSV

### 🚨 **إدارة الحوادث**
- ✅ إضافة حوادث جديدة بكل التفاصيل
- ✅ تعيين مسؤولية الحوادث
- ✅ تتبع زمني للحوادث
- ✅ تحديث حالة الحوادث
- ✅ تصدير البيانات بصيغ CSV

### 🌐 **الدعم اللغوي**
- ✅ دعم كامل للغتين العربية والإنجليزية
- ✅ تبديل فوري بين اللغات مع حفظ التفضيل
- ✅ دعم RTL (من اليمين لليسار) للعربية

### 🎨 **تصميم وتجربة المستخدم**
- ✅ ثيم داكن افتراضي مع دعم للثيم الفاتح
- ✅ تأثيرات Glassmorphism الحديثة
- ✅ أيقونات متحركة وتأثيرات نيون
- ✅ تجربة مستخدم سلسة ومتجاوبة
- ✅ سايدبار ثابت في اللابتوب ومنزلق في الجوال

### 📱 **التوافق والاستجابة**
- ✅ تصميم متجاوب بالكامل مع جميع الشاشات
- ✅ دعم أجهزة سطح المكتب، الأجهزة اللوحية، والهواتف
- ✅ دعم جميع المتصفحات الحديثة

---

## 🏗️ **الهيكل التقني**

### **التقنيات المستخدمة**

| **التقنية** | **الاستخدام** | **الإصدار** |
|------------|--------------|-------------|
| **HTML5** | هيكل الصفحات | - |
| **CSS3** | التنسيقات والتصميم | - |
| **JavaScript (ES6)** | التفاعل والمنطق | ES6+ |
| **Chart.js** | الرسوم البيانية | v4.4.0 |
| **PHP** | الواجهة الخلفية | 7.4+ |
| **MySQL** | قاعدة البيانات | 5.7+ |

### **هيكل الملفات**

```
cyber-soc-dashboard/
│
├── 📄 index.html                  # الصفحة الرئيسية - لوحة التحكم
├── 📄 login.html                  # صفحة تسجيل الدخول
├── 📄 register.html               # صفحة إنشاء حساب جديد
├── 📄 about.html                  # صفحة من نحن
├── 📄 threats.html                # صفحة إدارة التهديدات
├── 📄 incidents.html              # صفحة إدارة الحوادث
├── 📄 settings.html               # صفحة الإعدادات
│
├── 📁 assets/
│   ├── 📁 css/
│   │   └── 📄 style.css           # ملف التنسيقات الرئيسي
│   │
│   ├── 📁 js/
│   │   └── 📄 main.js             # ملف الجافاسكريبت الرئيسي
│   │
│   ├── 📁 php/                    # (اختياري - للخادم المحلي)
│   │   ├── 📄 config.php          # إعدادات النظام
│   │   ├── 📄 db_connect.php      # اتصال قاعدة البيانات
│   │   ├── 📄 get_stats.php       # جلب الإحصائيات
│   │   ├── 📄 get_threats.php     # جلب التهديدات
│   │   └── 📄 get_incidents.php   # جلب الحوادث
│   │
│   └── 📁 sql/
│       └── 📄 database.sql        # هيكل قاعدة البيانات
│
└── 📄 README.md                    # هذا الملف
```

---

## 🚀 **متطلبات التشغيل**

### **الحد الأدنى للمتطلبات**

| **المكون** | **المواصفات** |
|-----------|---------------|
| **خادم ويب** | Apache 2.4+ / Nginx 1.18+ |
| **PHP** | الإصدار 7.4 أو أعلى |
| **قاعدة البيانات** | MySQL 5.7+ / MariaDB 10.3+ |
| **المتصفح** | Chrome 90+, Firefox 88+, Edge 90+, Safari 14+ |

---

## 📦 **خطوات التثبيت**

### **1. تحميل المشروع**

```bash
# عن طريق Git
git clone https://github.com/abdulrahman-code/cyber-soc-dashboard.git

# أو تحميل الملفات مباشرة
```

### **2. إعداد خادم محلي**

#### **على XAMPP:**
```bash
# انسخ المجلد إلى
C:\xampp\htdocs\cyber-soc-dashboard\
```

#### **على WAMP:**
```bash
# انسخ المجلد إلى
C:\wamp64\www\cyber-soc-dashboard\
```

#### **على Laragon:**
```bash
# انسخ المجلد إلى
C:\laragon\www\cyber-soc-dashboard\
```

### **3. إعداد قاعدة البيانات**

```sql
-- 1. افتح phpMyAdmin
-- 2. أنشئ قاعدة بيانات جديدة
CREATE DATABASE soc_dashboard;

-- 3. استورد ملف SQL
SOURCE assets/sql/database.sql;
```

### **4. تكوين الإعدادات**

```php
// افتح ملف assets/php/config.php
// وقم بتعديل إعدادات الاتصال

define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'soc_dashboard');
```

### **5. تشغيل الموقع**

```bash
# افتح المتصفح واكتب
http://localhost/cyber-soc-dashboard/
```

### **6. تسجيل الدخول**

استخدم بيانات المستخدمين التجريبيين:

| **المستخدم** | **كلمة المرور** | **الدور** |
|-------------|----------------|----------|
| `admin` | `admin` | مدير النظام |
| `analyst1` | `admin` | محلل أمني أول |
| `analyst2` | `admin` | محلل أمني |
| `viewer1` | `admin` | مشاهد |

---

## 🎨 **تصميم واجهة المستخدم**

### **لوحة الألوان**

| **اللون** | **الرمز** | **الاستخدام** |
|-----------|-----------|---------------|
| نيون سماوي | `#00f0ff` | النصوص الرئيسية، الأزرار، التوهج |
| أزرق داكن | `#4f46e5` | التدرجات، الخلفيات |
| أرجواني | `#7c3aed` | التدرجات، العناصر المميزة |
| وردي نيون | `#ec4899` | التأكيدات، التوهج |
| أخضر نيون | `#10b981` | الحالات الإيجابية |
| أحمر نيون | `#ef4444` | التهديدات الحرجة |

### **الخطوط المستخدمة**

- **العربية:** [Cairo](https://fonts.google.com/specimen/Cairo)
- **الإنجليزية:** [Inter](https://fonts.google.com/specimen/Inter)

---

## 📱 **الاستجابة (Responsive)**

| **الشاشة** | **العرض** | **التعديلات** |
|-----------|-----------|---------------|
| **Desktop** | > 1400px | عرض كامل، 4 أعمدة |
| **Laptop** | 992px - 1400px | 3 أعمدة، سايدبار ثابت |
| **Tablet** | 768px - 992px | 2 أعمدة، سايدبار منزلق |
| **Mobile** | < 768px | عمود واحد، سايدبار منزلق |

---

## 🔒 **ميزات الأمان المطبقة**

| **الميزة** | **الوصف** | **الحالة** |
|-----------|-----------|------------|
| **حماية CSRF** | توكن لكل طلب POST | ✅ مطبقة |
| **تشفير كلمات المرور** | باستخدام password_hash() | ✅ مطبقة |
| **حماية XSS** | htmlspecialchars() للمخرجات | ✅ مطبقة |
| **حماية SQL Injection** | PDO prepared statements | ✅ مطبقة |
| **جلسات آمنة** | HttpOnly, Secure, SameSite | ✅ مطبقة |
| **صلاحيات المستخدم** | نظام أدوار (Admin, Analyst, Viewer) | ✅ مطبقة |
| **تسجيل النشاطات** | سجل كامل لجميع العمليات | ✅ مطبقة |

---

## 🔧 **API Endpoints**

| **Endpoint** | **Method** | **الوصف** |
|--------------|-----------|-----------|
| `/get_stats.php` | GET | جلب الإحصائيات |
| `/get_threats.php` | GET | جلب التهديدات |
| `/get_incidents.php` | GET | جلب الحوادث |
| `/update_threat.php` | POST | تحديث التهديد |
| `/update_incident.php` | POST | تحديث الحادث |
| `/add_incident.php` | POST | إضافة حادث |
| `/login.php` | POST | تسجيل الدخول |

---

## 🧪 **اختبار المشروع**

### **اختبار الوظائف الأساسية**

```bash
✅ تسجيل الدخول - استخدام بيانات المستخدمين التجريبيين
✅ لوحة التحكم - عرض الإحصائيات والرسوم البيانية
✅ التهديدات - عرض قائمة التهديدات وتصفيتها
✅ الحوادث - إدارة الحوادث وتحديث حالتها
✅ الإعدادات - تغيير الإعدادات وحفظها
✅ تبديل اللغة - التبديل بين العربية والإنجليزية
✅ تبديل الثيم - التبديل بين الثيم الداكن والفاتح
✅ السايدبار - ثابت في اللابتوب ومنزلق في الجوال
```

---

## 🐛 **حل المشاكل الشائعة**

### **1. الموقع لا يعمل**
```bash
✅ تأكد من تشغيل خادم Apache/MySQL
✅ تأكد من وجود ملفات المشروع في المجلد الصحيح
✅ تحقق من إعدادات config.php
```

### **2. خطأ 404 - الصفحة غير موجودة**
```bash
✅ تأكد من اسم المجلد: cyber-soc-dashboard
✅ تحقق من وجود جميع الملفات
```

### **3. خطأ في قاعدة البيانات**
```bash
✅ تأكد من تشغيل MySQL
✅ تحقق من بيانات الاتصال في config.php
✅ تأكد من استيراد database.sql بشكل صحيح
```

### **4. السايدبار لا يعمل في الجوال**
```bash
✅ تأكد من وجود زر ☰ في الشريط العلوي
✅ تأكد من وجود الكود CSS الخاص بالسايدبار
✅ تحقق من JavaScript function toggleSidebar()
```

---

## 📝 **سجل التغييرات (Changelog)**

### **الإصدار 1.0.0** (2026-01-21)

#### ✅ **مميزات جديدة**
- لوحة تحكم رئيسية مع إحصائيات فورية
- نظام تسجيل دخول آمن مع صلاحيات
- إدارة التهديدات مع تصفية وبحث
- إدارة الحوادث مع نموذج متكامل
- دعم اللغتين العربية والإنجليزية
- ثيم داكن/فاتح مع حفظ التفضيل
- تصميم متجاوب بالكامل
- تأثيرات Glassmorphism و Neon
- سايدبار ثابت في اللابتوب ومنزلق في الجوال

#### 🐛 **إصلاحات**
- تحسين محاذاة النصوص في RTL
- تحسين أداء الخلفيات
- تصحيح أخطاء JavaScript
- إصلاح مشاكل التوافق مع المتصفحات

---

## 🤝 **المساهمة في المشروع**

نرحب بمساهماتكم! يرجى اتباع الخطوات التالية:

1. **Fork** المشروع
2. أنشئ فرعاً جديداً (`git checkout -b feature/amazing-feature`)
3. أضف تغييراتك (`git commit -m 'Add some amazing feature'`)
4. ادفع التغييرات (`git push origin feature/amazing-feature`)
5. افتح **Pull Request**

### **قواعد المساهمة**

- ✅ اتبع معايير الكود
- ✅ أضف تعليقات توضيحية للكود
- ✅ اختبر الكود قبل الرفع
- ✅ حدد التغييرات بوضوح في Pull Request

---

## 📄 **الترخيص**

هذا المشروع مرخص تحت [MIT License](LICENSE) - انظر ملف LICENSE للتفاصيل.

```
MIT License

Copyright (c) 2026 Abdelrahman Hgazy

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
...
```

---

## 👥 **المطور**

| **الدور** | **الاسم** | **المسؤوليات** |
|-----------|-----------|---------------|
| **Full Stack Developer** | Abdelrahman Hgazy | تطوير الواجهة الخلفية والأمامية |
| **UI/UX Designer** | Abdelrahman Hgazy | تصميم واجهة المستخدم |
| **Security Expert** | Abdelrahman Hgazy | تأمين المنصة |

---

## 📞 **طرق التواصل**

- 📧 **البريد الإلكتروني:** [a.hgaze2000@gmail.com](mailto:a.hgaze2000@gmail.com)
- 🐦 **تويتر:** [@abdulrahman-code](https://twitter.com/abdulrahman-code)
- 📱 **لينكد إن:** [linkedin.com/in/abdulrahman-code](https://linkedin.com/in/abdulrahman-code)
- 🌐 **الموقع:** [https://github.com/abdulrahman-code](https://github.com/abdulrahman-code)

---

## ⭐ **الدعم**

إذا أعجبك المشروع، لا تنسى أن تمنحه ⭐ على GitHub!

[![Star on GitHub](https://img.shields.io/github/stars/abdulrahman-code/cyber-soc-dashboard.svg?style=social)](https://github.com/abdulrahman-code/cyber-soc-dashboard/stargazers)

---

## 🙏 **شكر وتقدير**

- [Chart.js](https://www.chartjs.org/) - مكتبة الرسوم البيانية
- [Font Awesome](https://fontawesome.com/) - الأيقونات
- [Google Fonts](https://fonts.google.com/) - الخطوط المجانية
- [GitHub](https://github.com/) - منصة استضافة المشروع

---

<div align="center">
  
**🛡️ CyberSOC Dashboard - حماية ذكية لمستقبل آمن** 🚀

---

_تم تطويره بـ ❤️ بواسطة [Abdelrahman Hgazy](https://github.com/abdulrahman-code)_

</div>
```
