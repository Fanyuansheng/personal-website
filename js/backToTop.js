class BackToTop {
    constructor() {
        this.button = document.getElementById('back-to-top');
        this.scrollThreshold = 300; // 滚动多少距离显示按钮
        
        this.init();
    }
    
    init() {
        // 监听滚动事件
        window.addEventListener('scroll', () => {
            this.toggleButton();
        });
        
        // 点击事件
        this.button.addEventListener('click', () => {
            this.scrollToTop();
        });
    }
    
    toggleButton() {
        if (window.scrollY > this.scrollThreshold) {
            this.button.classList.add('visible');
        } else {
            this.button.classList.remove('visible');
        }
    }
    
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

new BackToTop(); 