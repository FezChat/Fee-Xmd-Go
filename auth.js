// Authentication System for FEE-XMD GO
class AuthSystem {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('feeXmdUsers')) || [];
        this.currentUser = JSON.parse(localStorage.getItem('feeXmdCurrentUser')) || null;
        this.history = JSON.parse(localStorage.getItem('feeXmdHistory')) || [];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateAuthUI();
        
        // Password toggle functionality
        this.setupPasswordToggle();
    }

    setupEventListeners() {
        // User avatar click
        document.getElementById('userAvatar').addEventListener('click', (e) => {
            this.toggleAuthModal();
        });

        // Auth tabs
        document.querySelectorAll('.auth-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const tabId = e.target.getAttribute('data-tab');
                this.switchAuthTab(tabId);
            });
        });

        // Login form
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.login();
        });

        // Signup form
        document.getElementById('signupForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.signup();
        });

        // Close auth modal
        document.querySelector('.close-modal[data-modal="authModal"]').addEventListener('click', () => {
            app.hideModal('authModal');
        });
    }

    setupPasswordToggle() {
        // Toggle login password visibility
        document.getElementById('toggleLoginPassword').addEventListener('click', (e) => {
            const passwordInput = document.getElementById('loginPassword');
            const icon = e.target;
            this.togglePasswordVisibility(passwordInput, icon);
        });

        // Toggle signup password visibility
        document.getElementById('toggleSignupPassword').addEventListener('click', (e) => {
            const passwordInput = document.getElementById('signupPassword');
            const icon = e.target;
            this.togglePasswordVisibility(passwordInput, icon);
        });
    }

    togglePasswordVisibility(input, icon) {
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    }

    toggleAuthModal() {
        if (this.currentUser) {
            // User is logged in, show logout option
            if (confirm(`Log out as ${this.currentUser.username}?`)) {
                this.logout();
            }
        } else {
            // Show login modal
            app.showModal('authModal');
        }
    }

    switchAuthTab(tabId) {
        // Update active tab
        document.querySelectorAll('.auth-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`.auth-tab[data-tab="${tabId}"]`).classList.add('active');
        
        // Show corresponding form
        document.querySelectorAll('.auth-form').forEach(form => {
            form.classList.remove('active');
        });
        document.getElementById(`${tabId}Form`).classList.add('active');
    }

    async login() {
        const emailOrUsername = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value.trim();
        
        // Validation
        if (!emailOrUsername || !password) {
            app.showNotification('Please fill all fields', 'error');
            return;
        }

        app.simulateProgress(0, 60);

        try {
            // Find user
            const user = this.users.find(u => 
                (u.email === emailOrUsername || u.username === emailOrUsername) && 
                u.password === password
            );

            if (user) {
                this.currentUser = user;
                localStorage.setItem('feeXmdCurrentUser', JSON.stringify(user));
                
                // Update app state
                app.currentUser = user;
                app.updateUserAvatar();
                
                app.simulateProgress(60, 100);
                
                setTimeout(() => {
                    app.hideModal('authModal');
                    app.showNotification(`Welcome back, ${user.username}!`, 'success');
                    
                    // Clear form
                    document.getElementById('loginForm').reset();
                }, 500);
                
                // Log login activity
                this.logActivity('login', { userId: user.id });
                
            } else {
                app.simulateProgress(60, 100);
                app.showNotification('Invalid email/username or password', 'error');
            }
            
        } catch (error) {
            console.error('Login error:', error);
            app.simulateProgress(60, 100);
            app.showNotification('Login failed. Please try again.', 'error');
        }
    }

    async signup() {
        const username = document.getElementById('signupUsername').value.trim();
        const email = document.getElementById('signupEmail').value.trim();
        const password = document.getElementById('signupPassword').value.trim();
        
        // Validation
        if (!username || !email || !password) {
            app.showNotification('Please fill all fields', 'error');
            return;
        }

        if (username.length < 3) {
            app.showNotification('Username must be at least 3 characters', 'error');
            return;
        }

        if (!this.isValidEmail(email)) {
            app.showNotification('Please enter a valid email address', 'error');
            return;
        }

        if (password.length < 6) {
            app.showNotification('Password must be at least 6 characters', 'error');
            return;
        }

        app.simulateProgress(0, 60);

        try {
            // Check if user already exists
            if (this.users.some(u => u.username === username)) {
                app.simulateProgress(60, 100);
                app.showNotification('Username already exists', 'error');
                return;
            }

            if (this.users.some(u => u.email === email)) {
                app.simulateProgress(60, 100);
                app.showNotification('Email already registered', 'error');
                return;
            }

            // Create new user
            const newUser = {
                id: Date.now().toString(),
                username,
                email,
                password,
                joinDate: new Date().toISOString(),
                preferences: {
                    theme: 'auto',
                    notifications: true
                },
                stats: {
                    totalViews: 0,
                    totalDownloads: 0,
                    lastActive: new Date().toISOString()
                }
            };

            this.users.push(newUser);
            localStorage.setItem('feeXmdUsers', JSON.stringify(this.users));
            
            // Auto login
            this.currentUser = newUser;
            localStorage.setItem('feeXmdCurrentUser', JSON.stringify(newUser));
            
            // Update app state
            app.currentUser = newUser;
            app.updateUserAvatar();
            
            app.simulateProgress(60, 100);
            
            setTimeout(() => {
                app.hideModal('authModal');
                app.showNotification(`Account created successfully! Welcome, ${username}`, 'success');
                
                // Clear form
                document.getElementById('signupForm').reset();
                
                // Log signup activity
                this.logActivity('signup', { userId: newUser.id });
                
            }, 500);
            
        } catch (error) {
            console.error('Signup error:', error);
            app.simulateProgress(60, 100);
            app.showNotification('Signup failed. Please try again.', 'error');
        }
    }

    logout() {
        // Log logout activity
        if (this.currentUser) {
            this.logActivity('logout', { userId: this.currentUser.id });
        }
        
        this.currentUser = null;
        localStorage.removeItem('feeXmdCurrentUser');
        
        app.currentUser = null;
        app.updateUserAvatar();
        
        app.showNotification('Logged out successfully', 'info');
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    updateAuthUI() {
        const avatar = document.getElementById('userAvatar');
        if (this.currentUser) {
            const initials = this.currentUser.username.charAt(0).toUpperCase();
            avatar.innerHTML = initials;
            avatar.title = `Logged in as ${this.currentUser.username}`;
            avatar.style.backgroundColor = app.settings.accentColor;
            avatar.style.color = 'white';
        } else {
            avatar.innerHTML = '<i class="fas fa-user"></i>';
            avatar.title = 'Click to login';
            avatar.style.backgroundColor = '';
            avatar.style.color = '';
        }
    }

    logActivity(type, data) {
        if (!app.settings.saveHistory) return;
        
        const activity = {
            id: Date.now().toString(),
            type,
            userId: this.currentUser?.id || 'anonymous',
            timestamp: new Date().toISOString(),
            ...data
        };
        
        this.history.unshift(activity);
        
        // Keep only last 1000 activities
        if (this.history.length > 1000) {
            this.history = this.history.slice(0, 1000);
        }
        
        localStorage.setItem('feeXmdHistory', JSON.stringify(this.history));
    }

    getUserHistory(userId) {
        return this.history.filter(activity => activity.userId === userId);
    }

    updateUserStats(userId, updates) {
        const userIndex = this.users.findIndex(u => u.id === userId);
        if (userIndex !== -1) {
            this.users[userIndex].stats = {
                ...this.users[userIndex].stats,
                ...updates,
                lastActive: new Date().toISOString()
            };
            localStorage.setItem('feeXmdUsers', JSON.stringify(this.users));
            
            // Update current user if it's the same user
            if (this.currentUser && this.currentUser.id === userId) {
                this.currentUser.stats = this.users[userIndex].stats;
                localStorage.setItem('feeXmdCurrentUser', JSON.stringify(this.currentUser));
            }
        }
    }
}

// Initialize authentication system
const authSystem = new AuthSystem();
window.authSystem = authSystem;