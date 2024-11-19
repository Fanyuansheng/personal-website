class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.init();
        this.createNotification();
    }
    
    init() {
        emailjs.init("acUBKqHIfwSMgiSka");
        
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
    }
    
    createNotification() {
        // 创建通知容器
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.style.display = 'none';
        
        // 创建通知内容
        const content = document.createElement('div');
        content.className = 'notification-content';
        
        // 添加图标
        const icon = document.createElement('i');
        icon.className = 'notification-icon';
        
        // 添加文本
        const message = document.createElement('span');
        message.className = 'notification-message';
        
        content.appendChild(icon);
        content.appendChild(message);
        notification.appendChild(content);
        document.body.appendChild(notification);
        
        this.notification = notification;
        this.notificationMessage = message;
        this.notificationIcon = icon;
    }
    
    showNotification(type, text) {
        this.notification.className = `notification ${type}`;
        this.notificationMessage.textContent = text;
        this.notificationIcon.className = `fas ${type === 'success' ? 'fa-check-circle' : 'fa-times-circle'} notification-icon`;
        
        this.notification.style.display = 'flex';
        
        // 添加动画类
        setTimeout(() => {
            this.notification.classList.add('show');
        }, 10);
        
        // 3秒后自动关闭
        setTimeout(() => {
            this.notification.classList.remove('show');
            setTimeout(() => {
                this.notification.style.display = 'none';
            }, 300);
        }, 3000);
    }
    
    async handleSubmit() {
        const nameInput = this.form.querySelector('input[type="text"]');
        const emailInput = this.form.querySelector('input[type="email"]');
        const messageInput = this.form.querySelector('textarea');
        const submitButton = this.form.querySelector('button[type="submit"]');
        
        submitButton.disabled = true;
        submitButton.textContent = '发送中...';
        
        const templateParams = {
            from_name: nameInput.value,
            from_email: emailInput.value,
            message: messageInput.value,
            to_email: '3176864505@qq.com'
        };

        try {
            const response = await emailjs.send(
                'service_iasdjuv',    // Service ID
                'template_icpdkbf',    // Template ID
                templateParams         // 表单数据
            );
            
            console.log('SUCCESS!', response.status, response.text);
            this.showNotification('success', '消息发送成功！');
            this.form.reset();
            
        } catch (error) {
            console.error('发送失败:', error);
            this.showNotification('error', '发送失败，请稍后重试');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = '发送消息';
        }
    }
}

new ContactForm(); 