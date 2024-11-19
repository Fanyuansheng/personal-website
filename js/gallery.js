class Gallery {
    constructor() {
        this.container = document.getElementById('gallery-container');
        this.images = [
            'https://picsum.photos/1200/800?random=1',
            'https://picsum.photos/1200/800?random=2',
            'https://picsum.photos/1200/800?random=3',
            'https://picsum.photos/1200/800?random=4',
            'https://picsum.photos/1200/800?random=5'
        ];
        this.currentIndex = 0;
        this.autoPlayInterval = null;
        this.isAnimating = false;
        
        this.init();
    }
    
    init() {
        // 创建轮播图结构
        this.container.innerHTML = `
            <div class="carousel visible">
                <div class="carousel-inner"></div>
                <button class="carousel-prev">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <button class="carousel-next">
                    <i class="fas fa-chevron-right"></i>
                </button>
                <div class="carousel-dots"></div>
            </div>
        `;
        
        this.carouselInner = this.container.querySelector('.carousel-inner');
        this.prevButton = this.container.querySelector('.carousel-prev');
        this.nextButton = this.container.querySelector('.carousel-next');
        this.dotsContainer = this.container.querySelector('.carousel-dots');
        
        // 立即添加所有图片
        this.images.forEach((image, index) => {
            const slide = document.createElement('div');
            slide.className = `carousel-slide ${index === 0 ? 'active' : ''}`;
            slide.innerHTML = `<img src="${image}" alt="图片 ${index + 1}">`;
            this.carouselInner.appendChild(slide);
            
            // 添加导航点
            const dot = document.createElement('button');
            dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => this.goToSlide(index));
            this.dotsContainer.appendChild(dot);
        });
        
        // 添加事件监听
        this.prevButton.addEventListener('click', () => this.prevSlide());
        this.nextButton.addEventListener('click', () => this.nextSlide());
        
        // 启动自动播放
        this.startAutoPlay();
        
        // 鼠标悬停时暂停自动播放
        this.container.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.container.addEventListener('mouseleave', () => this.startAutoPlay());
    }
    
    goToSlide(index) {
        if (this.isAnimating) return;
        this.isAnimating = true;

        const slides = this.carouselInner.querySelectorAll('.carousel-slide');
        const dots = this.dotsContainer.querySelectorAll('.carousel-dot');
        
        slides[this.currentIndex].classList.remove('active');
        dots[this.currentIndex].classList.remove('active');
        
        this.currentIndex = index;
        
        slides[this.currentIndex].classList.add('active');
        dots[this.currentIndex].classList.add('active');

        setTimeout(() => {
            this.isAnimating = false;
        }, 500);
    }
    
    nextSlide() {
        let nextIndex = (this.currentIndex + 1) % this.images.length;
        this.goToSlide(nextIndex);
    }
    
    prevSlide() {
        let prevIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.goToSlide(prevIndex);
    }
    
    startAutoPlay() {
        this.stopAutoPlay();
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
}

new Gallery(); 