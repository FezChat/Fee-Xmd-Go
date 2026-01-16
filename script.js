// Main Application Controller
class FEEXMDApp {
    constructor() {
        this.currentUser = null;
        this.currentPage = 'home';
        this.theme = 'auto';
        this.settings = {};
        this.init();
    }

    init() {
        this.loadSettings();
        this.setupEventListeners();
        this.checkAuthStatus();
        this.loadPage('home');
        this.updateProgressBar(30);
    }

    loadSettings() {
        const savedSettings = localStorage.getItem('feeXmdSettings');
        if (savedSettings) {
            this.settings = JSON.parse(savedSettings);
            this.applySettings();
        } else {
            this.settings = {
                theme: 'auto',
                accentColor: '#FF6600',
                saveHistory: true,
                autoDownload: true,
                downloadQuality: 'high',
                notifications: true
            };
            this.saveSettings();
        }
    }

    saveSettings() {
        localStorage.setItem('feeXmdSettings', JSON.stringify(this.settings));
    }

    applySettings() {
        // Apply theme
        this.applyTheme(this.settings.theme);
        
        // Apply accent color
        document.documentElement.style.setProperty('--primary-color', this.settings.accentColor);
        
        // Calculate darker/lighter variants
        const darker = this.darkenColor(this.settings.accentColor, 20);
        const lighter = this.lightenColor(this.settings.accentColor, 20);
        document.documentElement.style.setProperty('--primary-dark', darker);
        document.documentElement.style.setProperty('--primary-light', lighter);
    }

    applyTheme(theme) {
        this.theme = theme;
        
        if (theme === 'auto') {
            // Check system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
        } else {
            document.documentElement.setAttribute('data-theme', theme);
        }
        
        // Update theme toggle button
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            const icon = theme === 'dark' ? 'fa-sun' : 'fa-moon';
            themeToggle.innerHTML = `<i class="fas ${icon}"></i>`;
        }
    }

    darkenColor(color, percent) {
        const num = parseInt(color.slice(1), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) - amt;
        const G = (num >> 8 & 0x00FF) - amt;
        const B = (num & 0x0000FF) - amt;
        return `#${(0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
            (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
            (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1)}`;
    }

    lightenColor(color, percent) {
        const num = parseInt(color.slice(1), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) + amt;
        const G = (num >> 8 & 0x00FF) + amt;
        const B = (num & 0x0000FF) + amt;
        return `#${(0x1000000 + (R > 255 ? 255 : R) * 0x10000 +
            (G > 255 ? 255 : G) * 0x100 +
            (B > 255 ? 255 : B)).toString(16).slice(1)}`;
    }

    setupEventListeners() {
        // Theme toggle
        document.getElementById('themeToggle')?.addEventListener('click', () => {
            this.toggleTheme();
        });

        // Menu toggle
        document.getElementById('menuToggle')?.addEventListener('click', () => {
            document.getElementById('sideMenu').classList.add('open');
        });

        document.getElementById('closeMenu')?.addEventListener('click', () => {
            document.getElementById('sideMenu').classList.remove('open');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            const sideMenu = document.getElementById('sideMenu');
            const menuToggle = document.getElementById('menuToggle');
            
            if (sideMenu.classList.contains('open') && 
                !sideMenu.contains(e.target) && 
                !menuToggle.contains(e.target)) {
                sideMenu.classList.remove('open');
            }
        });

        // Bottom navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const page = item.getAttribute('data-page');
                this.loadPage(page);
            });
        });

        // Side menu items
        document.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const page = item.getAttribute('data-page');
                if (page) {
                    this.loadPage(page);
                    document.getElementById('sideMenu').classList.remove('open');
                }
            });
        });

        // Modal close buttons
        document.querySelectorAll('.close-modal').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const modalId = btn.getAttribute('data-modal');
                this.hideModal(modalId);
            });
        });

        // About menu item
        document.getElementById('menuAbout')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.showModal('aboutModal');
            document.getElementById('sideMenu').classList.remove('open');
        });

        // Contact menu item
        document.getElementById('menuContact')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.showModal('contactModal');
            document.getElementById('sideMenu').classList.remove('open');
        });

        // Settings menu item
        document.getElementById('menuSettings')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.showModal('settingsModal');
            this.loadSettingsModal();
            document.getElementById('sideMenu').classList.remove('open');
        });

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (this.theme === 'auto') {
                this.applyTheme('auto');
            }
        });

        // Contact form
        document.getElementById('messageForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.sendContactMessage();
        });

        // Clear history button
        document.getElementById('clearHistory')?.addEventListener('click', () => {
            if (confirm('Are you sure you want to clear all history?')) {
                this.clearHistory();
            }
        });
    }

    toggleTheme() {
        if (this.theme === 'auto') {
            this.theme = 'light';
        } else if (this.theme === 'light') {
            this.theme = 'dark';
        } else {
            this.theme = 'auto';
        }
        
        this.settings.theme = this.theme;
        this.saveSettings();
        this.applyTheme(this.theme);
    }

    checkAuthStatus() {
        const savedUser = localStorage.getItem('feeXmdCurrentUser');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.updateUserAvatar();
        }
    }

    updateUserAvatar() {
        const avatar = document.getElementById('userAvatar');
        if (this.currentUser) {
            const initials = this.currentUser.username.charAt(0).toUpperCase();
            avatar.innerHTML = initials;
            avatar.title = `Logged in as ${this.currentUser.username}`;
        } else {
            avatar.innerHTML = '<i class="fas fa-user"></i>';
            avatar.title = 'Click to login';
        }
    }

    async loadPage(page) {
        this.updateProgressBar(20);
        
        // Update active navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelectorAll(`.nav-item[data-page="${page}"]`).forEach(item => {
            item.classList.add('active');
        });

        this.currentPage = page;
        
        try {
            // Load page content based on page
            let content = '';
            
            switch (page) {
                case 'home':
                    content = await this.loadHomePage();
                    break;
                case 'live':
                    content = await this.loadLivePage();
                    break;
                case 'movies':
                    content = await this.loadMoviesPage();
                    break;
                case 'tutorials':
                    content = await this.loadTutorialsPage();
                    break;
                case 'downloader':
                    content = await this.loadDownloaderPage();
                    break;
                case 'coding':
                    content = await this.loadCodingPage();
                    break;
                default:
                    content = await this.loadHomePage();
            }
            
            document.getElementById('mainContent').innerHTML = content;
            this.updateProgressBar(80);
            
            // Initialize page-specific functionality
            this.initializePage(page);
            
            // Update page title
            const pageTitles = {
                home: 'Home',
                live: 'Live Streaming',
                movies: 'Movies & Trailers',
                tutorials: 'Tutorials',
                downloader: 'Media Downloader',
                coding: 'Coding Tools'
            };
            document.title = `${pageTitles[page]} - FEE-XMD GO`;
            
            this.updateProgressBar(100);
            
        } catch (error) {
            console.error('Error loading page:', error);
            document.getElementById('mainContent').innerHTML = `
                <div class="error-container">
                    <h2>Error Loading Page</h2>
                    <p>${error.message}</p>
                    <button class="btn btn-primary" onclick="app.loadPage('home')">
                        Go Home
                    </button>
                </div>
            `;
            this.updateProgressBar(100);
        }
    }

    async loadHomePage() {
        return `
            <div class="page-content">
                <div class="welcome-section mb-4">
                    <h1>Welcome to FEE-XMD GO</h1>
                    <p class="text-secondary">Your ultimate streaming and multimedia platform</p>
                </div>
                
                <div class="stats-container mb-4">
                    <div class="stat-card">
                        <div class="stat-value" id="totalViews">0</div>
                        <div class="stat-label">Total Views</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value" id="activeUsers">0</div>
                        <div class="stat-label">Active Users</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value" id="downloadsToday">0</div>
                        <div class="stat-label">Downloads Today</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value" id="topCategory">-</div>
                        <div class="stat-label">Top Category</div>
                    </div>
                </div>
                
                <div class="trending-section mb-4">
                    <h2><i class="fas fa-fire"></i> Trending Now</h2>
                    <div class="grid grid-4" id="trendingContent">
                        <!-- Content will be loaded by home.js -->
                    </div>
                </div>
                
                <div class="recent-section mb-4">
                    <h2><i class="fas fa-history"></i> Recently Added</h2>
                    <div class="grid grid-4" id="recentContent">
                        <!-- Content will be loaded by home.js -->
                    </div>
                </div>
                
                <div class="info-section">
                    <div class="card">
                        <div class="card-header">
                            <h3><i class="fas fa-info-circle"></i> About FEE-XMD GO</h3>
                        </div>
                        <div class="card-body">
                            <p>FEE-XMD GO is a comprehensive streaming and multimedia platform developed by Fredi.E.Ezra from Tanzania. The platform offers:</p>
                            <ul>
                                <li>Live streaming channels</li>
                                <li>Movies and trailers</li>
                                <li>Educational tutorials</li>
                                <li>Media downloader from various platforms</li>
                                <li>Coding tools for developers</li>
                            </ul>
                            <p>All features are available for free with a simple authentication system.</p>
                            <button class="btn btn-secondary" onclick="app.showModal('aboutModal')">
                                <i class="fas fa-user-tie"></i> View Developer Info
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    async loadLivePage() {
        return `
            <div class="page-content">
                <div class="live-header mb-4">
                    <h1><i class="fas fa-tv"></i> Live Streaming</h1>
                    <p class="text-secondary">Watch live channels from around the world in real-time</p>
                </div>
                
                <div class="live-controls mb-4">
                    <div class="flex-between">
                        <div class="category-filter">
                            <button class="btn btn-sm btn-secondary active" data-filter="all">All</button>
                            <button class="btn btn-sm btn-secondary" data-filter="music">Music</button>
                            <button class="btn btn-sm btn-secondary" data-filter="sports">Sports</button>
                            <button class="btn btn-sm btn-secondary" data-filter="gaming">Gaming</button>
                            <button class="btn btn-sm btn-secondary" data-filter="news">News</button>
                        </div>
                        <button class="btn btn-primary" id="refreshLive">
                            <i class="fas fa-sync-alt"></i> Refresh
                        </button>
                    </div>
                </div>
                
                <div class="live-channels-container">
                    <div class="grid grid-3" id="liveChannelsGrid">
                        <!-- Live channels will be loaded by live.js -->
                    </div>
                </div>
                
                <div class="live-stats mt-4">
                    <div class="card">
                        <div class="card-body">
                            <h4><i class="fas fa-chart-line"></i> Live Statistics</h4>
                            <div class="stats-container">
                                <div class="stat-card">
                                    <div class="stat-value" id="liveViewers">0</div>
                                    <div class="stat-label">Current Viewers</div>
                                </div>
                                <div class="stat-card">
                                    <div class="stat-value" id="totalChannels">0</div>
                                    <div class="stat-label">Active Channels</div>
                                </div>
                                <div class="stat-card">
                                    <div class="stat-value" id="peakViewers">0</div>
                                    <div class="stat-label">Peak Viewers Today</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    async loadMoviesPage() {
        return `
            <div class="page-content">
                <div class="movies-header mb-4">
                    <h1><i class="fas fa-film"></i> Movies & Trailers</h1>
                    <p class="text-secondary">Watch and download latest movies and trailers</p>
                </div>
                
                <div class="movies-controls mb-4">
                    <div class="flex-between">
                        <div class="movies-filter">
                            <button class="btn btn-sm btn-primary active" data-filter="all">All</button>
                            <button class="btn btn-sm btn-secondary" data-filter="action">Action</button>
                            <button class="btn btn-sm btn-secondary" data-filter="comedy">Comedy</button>
                            <button class="btn btn-sm btn-secondary" data-filter="drama">Drama</button>
                            <button class="btn btn-sm btn-secondary" data-filter="trailers">Trailers</button>
                        </div>
                        <div class="search-box">
                            <input type="text" class="url-input" id="movieSearch" placeholder="Search movies...">
                            <button class="btn btn-primary" id="searchMovieBtn">
                                <i class="fas fa-search"></i>
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="movies-grid-container">
                    <div class="grid grid-4" id="moviesGrid">
                        <!-- Movies will be loaded by movies.js -->
                    </div>
                </div>
                
                <div class="movie-stats mt-4">
                    <div class="card">
                        <div class="card-header">
                            <h4><i class="fas fa-chart-bar"></i> Movie Statistics</h4>
                        </div>
                        <div class="card-body">
                            <div class="stats-container">
                                <div class="stat-card">
                                    <div class="stat-value" id="totalMovies">0</div>
                                    <div class="stat-label">Total Movies</div>
                                </div>
                                <div class="stat-card">
                                    <div class="stat-value" id="avgRating">0.0</div>
                                    <div class="stat-label">Average Rating</div>
                                </div>
                                <div class="stat-card">
                                    <div class="stat-value" id="totalViewsToday">0</div>
                                    <div class="stat-label">Views Today</div>
                                </div>
                                <div class="stat-card">
                                    <div class="stat-value" id="newMovies">0</div>
                                    <div class="stat-label">New This Week</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    async loadTutorialsPage() {
        return `
            <div class="page-content">
                <div class="tutorials-header mb-4">
                    <h1><i class="fas fa-graduation-cap"></i> Tutorials</h1>
                    <p class="text-secondary">Learn new skills with video, audio, image, and text tutorials</p>
                </div>
                
                <div class="tutorials-controls mb-4">
                    <div class="flex-between">
                        <div class="category-filter">
                            <button class="btn btn-sm btn-primary active" data-category="all">All</button>
                            <button class="btn btn-sm btn-secondary" data-category="video">Video</button>
                            <button class="btn btn-sm btn-secondary" data-category="audio">Audio</button>
                            <button class="btn btn-sm btn-secondary" data-category="image">Image</button>
                            <button class="btn btn-sm btn-secondary" data-category="text">Text</button>
                        </div>
                        <div class="sort-controls">
                            <select class="url-input" id="sortTutorials">
                                <option value="popular">Most Popular</option>
                                <option value="recent">Most Recent</option>
                                <option value="rating">Highest Rated</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                <div class="tutorials-list" id="tutorialsList">
                    <!-- Tutorials will be loaded by tutorials.js -->
                </div>
                
                <div class="tutorial-stats mt-4">
                    <div class="card">
                        <div class="card-body">
                            <h4><i class="fas fa-chart-pie"></i> Tutorial Analytics</h4>
                            <div class="stats-container">
                                <div class="stat-card">
                                    <div class="stat-value" id="totalTutorials">0</div>
                                    <div class="stat-label">Total Tutorials</div>
                                </div>
                                <div class="stat-card">
                                    <div class="stat-value" id="completionRate">0%</div>
                                    <div class="stat-label">Completion Rate</div>
                                </div>
                                <div class="stat-card">
                                    <div class="stat-value" id="avgTutorialRating">0.0</div>
                                    <div class="stat-label">Avg. Rating</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    async loadDownloaderPage() {
        return `
            <div class="page-content">
                <div class="downloader-header mb-4">
                    <h1><i class="fas fa-download"></i> Media Downloader</h1>
                    <p class="text-secondary">Download media from various platforms with premium quality</p>
                </div>
                
                <div class="downloader-container">
                    <div class="download-section mb-4">
                        <h3><i class="fas fa-link"></i> Paste URL</h3>
                        <div class="url-input-container">
                            <input type="url" class="url-input" id="downloadUrl" 
                                   placeholder="Paste Facebook, YouTube, TikTok, Instagram, etc. URL here...">
                            <button class="btn btn-primary btn-lg" id="downloadBtn">
                                <i class="fas fa-download"></i> Download
                            </button>
                        </div>
                        <div class="flex-between mt-2">
                            <div class="download-options">
                                <label class="checkbox-label">
                                    <input type="checkbox" id="audioOnly" checked>
                                    <span>Audio Only</span>
                                </label>
                                <label class="checkbox-label ml-2">
                                    <input type="checkbox" id="highQuality">
                                    <span>High Quality</span>
                                </label>
                            </div>
                            <select class="url-input" id="downloadFormat" style="width: 150px;">
                                <option value="mp4">MP4</option>
                                <option value="mp3">MP3</option>
                                <option value="webm">WebM</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="platforms-section mb-4">
                        <h3><i class="fas fa-th-large"></i> Supported Platforms</h3>
                        <div class="platform-grid" id="platformsGrid">
                            <!-- Platforms will be loaded by downloader.js -->
                        </div>
                    </div>
                    
                    <div class="search-section mb-4">
                        <h3><i class="fas fa-search"></i> Search Media</h3>
                        <div class="url-input-container">
                            <input type="text" class="url-input" id="searchMedia" 
                                   placeholder="Search for videos, music, or media...">
                            <button class="btn btn-secondary" id="searchMediaBtn">
                                <i class="fas fa-search"></i> Search
                            </button>
                        </div>
                    </div>
                    
                    <div class="download-result" id="downloadResult">
                        <!-- Download results will be shown here -->
                    </div>
                    
                    <div class="download-stats mt-4">
                        <div class="card">
                            <div class="card-header">
                                <h4><i class="fas fa-chart-line"></i> Download Statistics</h4>
                            </div>
                            <div class="card-body">
                                <div class="stats-container">
                                    <div class="stat-card">
                                        <div class="stat-value" id="totalDownloads">0</div>
                                        <div class="stat-label">Total Downloads</div>
                                    </div>
                                    <div class="stat-card">
                                        <div class="stat-value" id="downloadsTodayCount">0</div>
                                        <div class="stat-label">Today</div>
                                    </div>
                                    <div class="stat-card">
                                        <div class="stat-value" id="successRate">100%</div>
                                        <div class="stat-label">Success Rate</div>
                                    </div>
                                    <div class="stat-card">
                                        <div class="stat-value" id="topPlatform">-</div>
                                        <div class="stat-label">Top Platform</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    async loadCodingPage() {
        return `
            <div class="page-content">
                <div class="coding-header mb-4">
                    <h1><i class="fas fa-code"></i> Coding Tools</h1>
                    <p class="text-secondary">Developer tools for testing and coding various languages</p>
                </div>
                
                <div class="tools-section mb-4">
                    <div class="tool-grid" id="codingTools">
                        <!-- Tools will be loaded by coding.js -->
                    </div>
                </div>
                
                <div class="code-editor-section mb-4">
                    <div class="card">
                        <div class="card-header">
                            <h4><i class="fas fa-edit"></i> Code Editor</h4>
                        </div>
                        <div class="card-body">
                            <div class="editor-tabs mb-2">
                                <button class="btn btn-sm btn-secondary active" data-language="html">HTML</button>
                                <button class="btn btn-sm btn-secondary" data-language="css">CSS</button>
                                <button class="btn btn-sm btn-secondary" data-language="js">JavaScript</button>
                                <button class="btn btn-sm btn-secondary" data-language="python">Python</button>
                            </div>
                            <textarea class="url-input" id="codeEditor" rows="10" 
                                      placeholder="Write your code here..."></textarea>
                            <div class="flex-between mt-2">
                                <div class="editor-options">
                                    <select class="url-input" id="editorTheme">
                                        <option value="light">Light</option>
                                        <option value="dark">Dark</option>
                                    </select>
                                </div>
                                <div class="editor-actions">
                                    <button class="btn btn-secondary" id="clearCode">
                                        <i class="fas fa-trash"></i> Clear
                                    </button>
                                    <button class="btn btn-primary" id="runCode">
                                        <i class="fas fa-play"></i> Run Code
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="output-section">
                    <div class="card">
                        <div class="card-header">
                            <h4><i class="fas fa-terminal"></i> Output</h4>
                        </div>
                        <div class="card-body">
                            <div id="codeOutput" class="output-container">
                                <p class="text-secondary">Output will appear here...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    initializePage(page) {
        switch (page) {
            case 'home':
                if (typeof initHomePage === 'function') initHomePage();
                break;
            case 'live':
                if (typeof initLivePage === 'function') initLivePage();
                break;
            case 'movies':
                if (typeof initMoviesPage === 'function') initMoviesPage();
                break;
            case 'tutorials':
                if (typeof initTutorialsPage === 'function') initTutorialsPage();
                break;
            case 'downloader':
                if (typeof initDownloaderPage === 'function') initDownloaderPage();
                break;
            case 'coding':
                if (typeof initCodingPage === 'function') initCodingPage();
                break;
        }
    }

    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    hideModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    loadSettingsModal() {
        // Theme select
        const themeSelect = document.getElementById('themeSelect');
        if (themeSelect) {
            themeSelect.value = this.settings.theme;
            themeSelect.addEventListener('change', (e) => {
                this.settings.theme = e.target.value;
                this.saveSettings();
                this.applyTheme(e.target.value);
            });
        }

        // Color picker
        document.querySelectorAll('.color-option').forEach(option => {
            option.classList.remove('active');
            if (option.getAttribute('data-color') === this.settings.accentColor) {
                option.classList.add('active');
            }
            
            option.addEventListener('click', (e) => {
                document.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('active'));
                e.target.classList.add('active');
                
                const color = e.target.getAttribute('data-color');
                this.settings.accentColor = color;
                this.saveSettings();
                this.applySettings();
            });
        });

        // Quality select
        const qualitySelect = document.getElementById('qualitySelect');
        if (qualitySelect) {
            qualitySelect.value = this.settings.downloadQuality;
            qualitySelect.addEventListener('change', (e) => {
                this.settings.downloadQuality = e.target.value;
                this.saveSettings();
            });
        }

        // Auto download checkbox
        const autoDownload = document.getElementById('autoDownload');
        if (autoDownload) {
            autoDownload.checked = this.settings.autoDownload;
            autoDownload.addEventListener('change', (e) => {
                this.settings.autoDownload = e.target.checked;
                this.saveSettings();
            });
        }

        // Save history checkbox
        const saveHistory = document.getElementById('saveHistory');
        if (saveHistory) {
            saveHistory.checked = this.settings.saveHistory;
            saveHistory.addEventListener('change', (e) => {
                this.settings.saveHistory = e.target.checked;
                this.saveSettings();
            });
        }
    }

    updateProgressBar(percentage) {
        const progressBar = document.getElementById('progressBar');
        if (progressBar) {
            progressBar.style.width = `${percentage}%`;
            
            if (percentage >= 100) {
                setTimeout(() => {
                    progressBar.style.width = '0%';
                }, 500);
            }
        }
    }

    simulateProgress(start, end, duration = 1000) {
        return new Promise(resolve => {
            let current = start;
            const increment = (end - start) / (duration / 50);
            
            const timer = setInterval(() => {
                current += increment;
                this.updateProgressBar(Math.min(current, end));
                
                if (current >= end) {
                    clearInterval(timer);
                    resolve();
                }
            }, 50);
        });
    }

    sendContactMessage() {
        const form = document.getElementById('messageForm');
        const inputs = form.querySelectorAll('input, textarea');
        
        let isValid = true;
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = 'var(--error-color)';
            } else {
                input.style.borderColor = '';
            }
        });
        
        if (isValid) {
            this.showNotification('Message sent successfully!', 'success');
            form.reset();
            this.hideModal('contactModal');
        } else {
            this.showNotification('Please fill all fields', 'error');
        }
    }

    clearHistory() {
        localStorage.removeItem('feeXmdHistory');
        this.showNotification('History cleared successfully!', 'success');
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="close-notification">&times;</button>
        `;
        
        // Style the notification
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            background-color: var(--surface-color);
            border: 1px solid var(--border-color);
            border-radius: var(--border-radius-md);
            box-shadow: 0 4px 12px var(--shadow-color);
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 9999;
            animation: slideIn 0.3s ease;
            max-width: 400px;
        `;
        
        // Add color based on type
        const colors = {
            success: 'var(--success-color)',
            error: 'var(--error-color)',
            info: 'var(--info-color)'
        };
        notification.style.borderLeft = `4px solid ${colors[type]}`;
        
        document.body.appendChild(notification);
        
        // Close button
        notification.querySelector('.close-notification').addEventListener('click', () => {
            notification.remove();
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }
}

// Initialize the app
const app = new FEEXMDApp();
window.app = app; // Make app available globally

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .close-notification {
        background: none;
        border: none;
        color: var(--text-secondary);
        cursor: pointer;
        font-size: 1.2rem;
        line-height: 1;
        margin-left: auto;
    }
`;
document.head.appendChild(notificationStyles);