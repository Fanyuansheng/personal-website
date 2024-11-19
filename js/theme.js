class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.themeText = this.themeToggle.querySelector('.theme-text');
        this.body = document.documentElement;
        this.currentTheme = localStorage.getItem('theme') || 'dark';
        
        this.init();
    }
    
    init() {
        this.setTheme(this.currentTheme);
        
        this.themeToggle.addEventListener('click', () => {
            this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
            this.setTheme(this.currentTheme);
            localStorage.setItem('theme', this.currentTheme);
        });
    }
    
    setTheme(theme) {
        this.body.setAttribute('data-theme', theme);
        this.currentTheme = theme;
        
        // 更新主题文字
        this.themeText.textContent = theme === 'dark' ? '夜间模式' : '日间模式';
        
        // 更新 Three.js 背景颜色
        const event = new CustomEvent('themeChange', { detail: { theme } });
        window.dispatchEvent(event);
    }
}

new ThemeManager(); 