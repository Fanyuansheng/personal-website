class LanguageManager {
    constructor() {
        this.langToggle = document.getElementById('lang-toggle');
        this.langText = this.langToggle.querySelector('.lang-text');
        this.currentLang = localStorage.getItem('language') || 'cn';
        this.translations = {
            cn: {
                home: '首页',
                gallery: '照片展示',
                blog: '博客',
                contact: '联系我',
                projects: '开源项目',
                darkMode: '夜间模式',
                lightMode: '日间模式',
                chinese: '中文',
                english: 'English',
                name: '您的姓名',
                email: '您的邮箱',
                message: '请输入您的留言',
                sendMessage: '发送消息',
                about: '关于我',
                quickLinks: '快速链接',
                contactInfo: '联系方式',
                notice: '注意事项',
                copyright: '版权所有',
                allRightsReserved: '保留所有权利',
                viewCode: '查看代码',
                viewDemo: '查看演示',
                readMore: '阅读更多',
                publishedOn: '发布于',
                noticeTitle: '注意事项',
                noticeItem1: '本网站所有内容仅代表个人观点',
                noticeItem2: '转载请注明出处，保留原作者信息',
                noticeItem3: '如有侵权请联系我们删除',
                aboutMe: '热爱编程与设计的开发者，专注于创造优秀的用户体验。',
                followMe: '关注我',
                wechat: '微信',
                weibo: '微博',
                github: 'GitHub',
                linkedin: '领英',
                backToTop: '返回顶部'
            },
            en: {
                home: 'Home',
                gallery: 'Gallery',
                blog: 'Blog',
                contact: 'Contact',
                projects: 'Projects',
                darkMode: 'Dark Mode',
                lightMode: 'Light Mode',
                chinese: '中文',
                english: 'English',
                name: 'Your Name',
                email: 'Your Email',
                message: 'Your Message',
                sendMessage: 'Send Message',
                about: 'About Me',
                quickLinks: 'Quick Links',
                contactInfo: 'Contact Info',
                notice: 'Notice',
                copyright: 'Copyright',
                allRightsReserved: 'All Rights Reserved',
                viewCode: 'View Code',
                viewDemo: 'View Demo',
                readMore: 'Read More',
                publishedOn: 'Published on',
                noticeTitle: 'Notice',
                noticeItem1: 'All content on this website represents personal views only',
                noticeItem2: 'Please retain attribution when sharing content',
                noticeItem3: 'Contact us for any copyright concerns',
                aboutMe: 'A developer passionate about programming and design, focused on creating excellent user experiences.',
                followMe: 'Follow Me',
                wechat: 'WeChat',
                weibo: 'Weibo',
                github: 'GitHub',
                linkedin: 'LinkedIn',
                backToTop: 'Back to Top'
            }
        };
        
        this.init();
    }
    
    init() {
        this.setLanguage(this.currentLang);
        
        this.langToggle.addEventListener('click', () => {
            this.currentLang = this.currentLang === 'cn' ? 'en' : 'cn';
            this.setLanguage(this.currentLang);
            localStorage.setItem('language', this.currentLang);
        });
    }
    
    setLanguage(lang) {
        // 更新按钮文字
        this.langText.textContent = lang === 'cn' ? '中文' : 'English';
        
        // 更新导航链接
        document.querySelectorAll('[data-lang-cn]').forEach(element => {
            element.textContent = element.getAttribute(`data-lang-${lang}`);
        });
        
        // 更新其他文本内容
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (this.translations[lang][key]) {
                element.textContent = this.translations[lang][key];
            }
        });
        
        // 更新表单占位符
        const form = document.querySelector('.contact-form');
        if (form) {
            form.querySelector('input[type="text"]').placeholder = this.translations[lang].name;
            form.querySelector('input[type="email"]').placeholder = this.translations[lang].email;
            form.querySelector('textarea').placeholder = this.translations[lang].message;
            form.querySelector('button').textContent = this.translations[lang].sendMessage;
        }
        
        // 触发语言变化事件
        window.dispatchEvent(new CustomEvent('languageChange', { detail: { language: lang } }));
    }
}

new LanguageManager(); 