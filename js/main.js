class Background {
    constructor() {
        this.container = document.getElementById('canvas-container');
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.particles = [];
        
        this.init();
        
        // 添加主题变化监听
        this.setupThemeChange();
    }

    init() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.container.appendChild(this.renderer.domElement);
        
        // 创建粒子系统
        const geometry = new THREE.BufferGeometry();
        const vertices = [];
        
        for (let i = 0; i < 5000; i++) {
            vertices.push(
                Math.random() * 2000 - 1000,
                Math.random() * 2000 - 1000,
                Math.random() * 2000 - 1000
            );
        }
        
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        
        const material = new THREE.PointsMaterial({
            color: 0x00ff88,
            size: 2,
            transparent: true
        });
        
        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
        
        this.camera.position.z = 1000;
        
        this.animate();
        this.handleResize();
    }
    
    animate() {
        requestAnimationFrame(this.animate.bind(this));
        
        this.particles.rotation.x += 0.0005;
        this.particles.rotation.y += 0.0005;
        
        this.renderer.render(this.scene, this.camera);
    }
    
    handleResize() {
        window.addEventListener('resize', () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            
            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(width, height);
        });
    }
    
    setupThemeChange() {
        window.addEventListener('themeChange', (event) => {
            const theme = event.detail.theme;
            if (theme === 'light') {
                this.scene.background = new THREE.Color(0xffffff);
                this.particles.material.color.setHex(0x00aa88);
            } else {
                this.scene.background = new THREE.Color(0x0a0a0a);
                this.particles.material.color.setHex(0x00ff88);
            }
        });
    }
}

// 初始化背景
new Background(); 