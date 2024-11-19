class ProjectsManager {
    constructor() {
        this.container = document.getElementById('projects-container');
        this.projects = [
            {
                name: "Fanyuansheng.github.io",
                description: "我的个人网站，使用 Docusaurus 2 构建的技术博客",
                tags: ["React", "NodeJS", "Express", "Docusaurus2"],
                url: "https://github.com/Fanyuansheng/Fanyuansheng.github.io"
            },
            {
                name: "PHP-Background-management-system",
                description: "基于 PHP 和 Layui 开发的学生后台管理系统，包含完整的 CRUD 功能",
                tags: ["PHP", "Layui", "MySQL", "管理系统"],
                url: "https://github.com/Fanyuansheng/PHP-Background-management-system"
            },
            {
                name: "Vue-demo",
                description: "Vue.js 学习笔记和实践项目集合，包含多个实用组件示例",
                tags: ["Vue", "JavaScript", "前端开发"],
                url: "https://github.com/Fanyuansheng/Vue-demo"
            },
            {
                name: "Vue-element-admin",
                description: "基于 Vue 和 Element UI 的后台管理系统模板，包含权限管理",
                tags: ["Vue", "Element UI", "后台管理"],
                url: "https://github.com/Fanyuansheng/Vue-element-admin"
            },
            {
                name: "react-blog",
                description: "使用 React 开发的个人博客系统，支持 Markdown 编辑",
                tags: ["React", "Node.js", "MongoDB", "博客系统"],
                url: "https://github.com/Fanyuansheng/react-blog"
            },
            {
                name: "python-spider",
                description: "Python 爬虫项目集合，包含多个网站的数据采集示例",
                tags: ["Python", "爬虫", "数据分析"],
                url: "https://github.com/Fanyuansheng/python-spider"
            },
            {
                name: "node-express-blog",
                description: "基于 Node.js 和 Express 框架的博客系统后端",
                tags: ["Node.js", "Express", "MongoDB", "RESTful API"],
                url: "https://github.com/Fanyuansheng/node-express-blog"
            },
            {
                name: "flutter-app",
                description: "使用 Flutter 开发的跨平台移动应用示例",
                tags: ["Flutter", "Dart", "移动开发"],
                url: "https://github.com/Fanyuansheng/flutter-app"
            }
        ];
        
        this.init();
    }
    
    init() {
        this.renderProjects();
    }
    
    renderProjects() {
        this.projects.forEach(project => {
            const card = this.createProjectCard(project);
            this.container.appendChild(card);
        });
    }
    
    createProjectCard(project) {
        const card = document.createElement('div');
        card.className = 'project-card';
        
        card.innerHTML = `
            <h3>${project.name}</h3>
            <p>${project.description}</p>
            <div class="project-tags">
                ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
            </div>
            <div class="project-links">
                <a href="${project.url}" class="project-link" target="_blank">
                    <i class="fab fa-github"></i>
                    查看代码
                </a>
            </div>
        `;
        
        return card;
    }
}

new ProjectsManager(); 