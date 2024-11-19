class Blog {
    constructor() {
        this.container = document.getElementById('blog-container');
        this.postsPerPage = 3;
        this.currentPage = 1;
        this.posts = [
            {
                title: 'vue3+element plus图片预览直接点击按钮就显示图片的预览形式',
                content: '介绍如何在Vue3中实现图片预览功能，使用element plus组件库...',
                date: '2023-11-20',
                tags: ['前端', 'javascript', 'vue3', 'vue router']
            },
            {
                title: 'Vue3+Vue Router跳转相同路由监听页面刷新并执行某个操作',
                content: '解决在Vue3中相同路由跳转时页面刷新和操作执行的问题...',
                date: '2023-10-18',
                tags: ['前端', 'javascript', 'vue3', 'vue router']
            },
            {
                title: '浏览器自带api语音播报speechSynthesis.speak()无法自动播报问题分析及解决方案',
                content: '分析和解决浏览器语音API的自动播报限制问题...',
                date: '2023-06-19',
                tags: ['前端', 'javascript']
            },
            {
                title: 'react高阶组件概念与简单使用',
                content: '探讨React高阶组件的概念及其实际应用...',
                date: '2022-12-05',
                tags: ['前端', 'react']
            },
            {
                title: '浅谈与使用js中的原型',
                content: '深入理解JavaScript中原型的概念和使用方法...',
                date: '2022-11-22',
                tags: ['前端', 'javascript']
            }
        ];
        
        this.init();
    }
    
    init() {
        this.renderPosts();
    }
    
    renderPosts() {
        this.container.innerHTML = '';
        const start = (this.currentPage - 1) * this.postsPerPage;
        const end = start + this.postsPerPage;
        
        const postsToShow = this.posts.slice(start, end);
        
        const postsContainer = document.createElement('div');
        postsContainer.className = 'posts-container';
        
        postsToShow.forEach(post => {
            const article = document.createElement('article');
            article.className = 'blog-post';
            article.innerHTML = `
                <h3>${post.title}</h3>
                <div class="post-meta">
                    <span class="post-date">${post.date}</span>
                    <div class="post-tags">
                        ${post.tags.map(tag => `<span class="post-tag">${tag}</span>`).join('')}
                    </div>
                </div>
                <p>${post.content}</p>
                <a href="#" class="read-more">阅读更多</a>
            `;
            postsContainer.appendChild(article);
        });
        
        this.container.appendChild(postsContainer);
        this.createPagination();
    }
    
    createPagination() {
        const totalPages = Math.ceil(this.posts.length / this.postsPerPage);
        const pagination = document.createElement('div');
        pagination.className = 'pagination';
        
        // 添加上一页按钮
        const prevButton = document.createElement('button');
        prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
        prevButton.className = 'pagination-nav';
        prevButton.disabled = this.currentPage === 1;
        prevButton.addEventListener('click', () => {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.renderPosts();
            }
        });
        pagination.appendChild(prevButton);
        
        // 添加页码按钮
        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement('button');
            button.textContent = i;
            button.className = i === this.currentPage ? 'active' : '';
            
            button.addEventListener('click', () => {
                this.currentPage = i;
                this.renderPosts();
            });
            
            pagination.appendChild(button);
        }
        
        // 添加下一页按钮
        const nextButton = document.createElement('button');
        nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
        nextButton.className = 'pagination-nav';
        nextButton.disabled = this.currentPage === totalPages;
        nextButton.addEventListener('click', () => {
            if (this.currentPage < totalPages) {
                this.currentPage++;
                this.renderPosts();
            }
        });
        pagination.appendChild(nextButton);
        
        this.container.appendChild(pagination);
    }
}

new Blog(); 