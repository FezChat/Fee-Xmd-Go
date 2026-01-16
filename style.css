/* CSS Variables for Theme */
:root {
    /* Orange Theme (Default) */
    --primary-color: #FF6600;
    --primary-dark: #CC5500;
    --primary-light: #FF8C42;
    --secondary-color: #333333;
    --accent-color: #FFA726;
    
    /* Light Theme */
    --bg-color: #FFFFFF;
    --surface-color: #F8F9FA;
    --text-color: #333333;
    --text-secondary: #666666;
    --border-color: #E0E0E0;
    --shadow-color: rgba(0, 0, 0, 0.1);
    
    /* Success, Warning, Error */
    --success-color: #28A745;
    --warning-color: #FFC107;
    --error-color: #DC3545;
    --info-color: #17A2B8;
    
    /* Typography */
    --font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    --font-size-xs: 0.75rem;
    --font-size-sm: 0.875rem;
    --font-size-md: 1rem;
    --font-size-lg: 1.25rem;
    --font-size-xl: 1.5rem;
    --font-size-xxl: 2rem;
    
    /* Spacing */
    --spacing-xs: 0.25rem;
    --spacing-sm: 0.5rem;
    --spacing-md: 1rem;
    --spacing-lg: 1.5rem;
    --spacing-xl: 2rem;
    
    /* Border Radius */
    --border-radius-sm: 4px;
    --border-radius-md: 8px;
    --border-radius-lg: 12px;
    --border-radius-xl: 16px;
    
    /* Transitions */
    --transition-fast: 150ms;
    --transition-normal: 300ms;
    --transition-slow: 500ms;
}

/* Dark Theme */
[data-theme="dark"] {
    --bg-color: #121212;
    --surface-color: #1E1E1E;
    --text-color: #FFFFFF;
    --text-secondary: #B0B0B0;
    --border-color: #2D2D2D;
    --shadow-color: rgba(0, 0, 0, 0.3);
}

/* Reset & Base Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    font-size: 16px;
    scroll-behavior: smooth;
}

body {
    font-family: var(--font-family);
    background-color: var(--bg-color);
    color: var(--text-color);
    line-height: 1.6;
    transition: background-color var(--transition-normal),
                color var(--transition-normal);
    padding-bottom: 70px;
}

/* Typography */
h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    line-height: 1.3;
    margin-bottom: var(--spacing-md);
}

h1 { font-size: var(--font-size-xxl); }
h2 { font-size: var(--font-size-xl); }
h3 { font-size: var(--font-size-lg); }
h4 { font-size: var(--font-size-md); }

p {
    margin-bottom: var(--spacing-md);
}

a {
    color: var(--primary-color);
    text-decoration: none;
    transition: color var(--transition-fast);
}

a:hover {
    color: var(--primary-dark);
}

/* Layout */
.container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--spacing-md);
}

/* Progress Bar */
.progress-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: transparent;
    z-index: 9999;
}

.progress-bar {
    height: 100%;
    background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
    width: 0%;
    transition: width 0.3s ease;
    border-radius: 0 2px 2px 0;
}

/* Header */
header {
    background-color: var(--surface-color);
    border-bottom: 1px solid var(--border-color);
    position: sticky;
    top: 0;
    z-index: 1000;
    box-shadow: 0 2px 10px var(--shadow-color);
}

.header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-md) var(--spacing-lg);
    max-width: 1200px;
    margin: 0 auto;
}

.logo-container {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
}

.logo {
    width: 50px;
    height: 50px;
    border-radius: var(--border-radius-md);
    object-fit: cover;
    border: 2px solid var(--primary-color);
}

.app-name {
    font-size: var(--font-size-xl);
    font-weight: 700;
    color: var(--primary-color);
}

.app-tagline {
    font-size: var(--font-size-sm);
    color: var(--text-secondary);
}

.user-controls {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
}

/* Buttons */
.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-sm) var(--spacing-lg);
    border: none;
    border-radius: var(--border-radius-md);
    font-size: var(--font-size-md);
    font-weight: 500;
    cursor: pointer;
    transition: all var(--transition-fast);
    outline: none;
}

.btn-primary {
    background-color: var(--primary-color);
    color: white;
}

.btn-primary:hover {
    background-color: var(--primary-dark);
    transform: translateY(-1px);
}

.btn-secondary {
    background-color: var(--surface-color);
    color: var(--text-color);
    border: 1px solid var(--border-color);
}

.btn-secondary:hover {
    background-color: var(--border-color);
}

.btn-danger {
    background-color: var(--error-color);
    color: white;
}

.btn-success {
    background-color: var(--success-color);
    color: white;
}

.btn-block {
    width: 100%;
}

.btn-sm {
    padding: var(--spacing-xs) var(--spacing-md);
    font-size: var(--font-size-sm);
}

.btn-lg {
    padding: var(--spacing-md) var(--spacing-xl);
    font-size: var(--font-size-lg);
}

/* Icons */
.icon {
    width: 24px;
    height: 24px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
}

/* Side Menu */
.side-menu {
    position: fixed;
    top: 0;
    right: -300px;
    width: 300px;
    height: 100vh;
    background-color: var(--surface-color);
    box-shadow: -2px 0 10px var(--shadow-color);
    transition: right var(--transition-normal);
    z-index: 1001;
    overflow-y: auto;
}

.side-menu.open {
    right: 0;
}

.side-menu-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-lg);
    border-bottom: 1px solid var(--border-color);
}

.side-menu-content {
    padding: var(--spacing-md);
}

.menu-item {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    padding: var(--spacing-md);
    color: var(--text-color);
    border-radius: var(--border-radius-md);
    margin-bottom: var(--spacing-xs);
    transition: background-color var(--transition-fast);
}

.menu-item:hover {
    background-color: var(--border-color);
}

.menu-divider {
    height: 1px;
    background-color: var(--border-color);
    margin: var(--spacing-md) 0;
}

/* Modal */
.modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1002;
    align-items: center;
    justify-content: center;
    padding: var(--spacing-md);
}

.modal.active {
    display: flex;
}

.modal-content {
    background-color: var(--surface-color);
    border-radius: var(--border-radius-lg);
    width: 100%;
    max-width: 500px;
    max-height: 90vh;
    overflow-y: auto;
    animation: modalSlideIn 0.3s ease;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-lg);
    border-bottom: 1px solid var(--border-color);
}

.modal-body {
    padding: var(--spacing-lg);
}

.close-modal {
    background: none;
    border: none;
    font-size: var(--font-size-xl);
    color: var(--text-secondary);
    cursor: pointer;
    line-height: 1;
}

/* Auth Forms */
.auth-tabs {
    display: flex;
    border-bottom: 1px solid var(--border-color);
    margin-bottom: var(--spacing-lg);
}

.auth-tab {
    flex: 1;
    padding: var(--spacing-md);
    background: none;
    border: none;
    border-bottom: 3px solid transparent;
    color: var(--text-secondary);
    font-weight: 500;
    cursor: pointer;
    transition: all var(--transition-fast);
}

.auth-tab.active {
    color: var(--primary-color);
    border-bottom-color: var(--primary-color);
}

.auth-form {
    display: none;
}

.auth-form.active {
    display: block;
}

.form-group {
    margin-bottom: var(--spacing-lg);
    position: relative;
}

.form-group label {
    display: block;
    margin-bottom: var(--spacing-xs);
    font-weight: 500;
    color: var(--text-color);
}

.form-group input,
.form-group select,
.form-group textarea {
    width: 100%;
    padding: var(--spacing-md);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius-md);
    background-color: var(--bg-color);
    color: var(--text-color);
    font-size: var(--font-size-md);
    transition: border-color var(--transition-fast);
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
    outline: none;
    border-color: var(--primary-color);
}

.password-toggle {
    position: absolute;
    right: var(--spacing-md);
    top: calc(var(--spacing-md) + 22px);
    cursor: pointer;
    color: var(--text-secondary);
}

/* Main Content */
#mainContent {
    min-height: calc(100vh - 140px);
    padding: var(--spacing-lg);
    max-width: 1200px;
    margin: 0 auto;
}

.page-content {
    animation: fadeIn 0.3s ease;
}

/* Bottom Navigation */
.bottom-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: var(--surface-color);
    border-top: 1px solid var(--border-color);
    display: flex;
    justify-content: space-around;
    padding: var(--spacing-sm) 0;
    z-index: 1000;
    box-shadow: 0 -2px 10px var(--shadow-color);
}

.nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: var(--text-secondary);
    padding: var(--spacing-sm);
    border-radius: var(--border-radius-md);
    transition: all var(--transition-fast);
    flex: 1;
    max-width: 100px;
}

.nav-item.active {
    color: var(--primary-color);
}

.nav-item:hover {
    color: var(--primary-color);
    background-color: var(--border-color);
}

.nav-icon {
    font-size: var(--font-size-lg);
    margin-bottom: var(--spacing-xs);
}

.nav-label {
    font-size: var(--font-size-xs);
    font-weight: 500;
}

/* Cards */
.card {
    background-color: var(--surface-color);
    border-radius: var(--border-radius-lg);
    border: 1px solid var(--border-color);
    overflow: hidden;
    transition: transform var(--transition-normal),
                box-shadow var(--transition-normal);
}

.card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px var(--shadow-color);
}

.card-header {
    padding: var(--spacing-lg);
    border-bottom: 1px solid var(--border-color);
    background-color: rgba(0, 0, 0, 0.02);
}

.card-body {
    padding: var(--spacing-lg);
}

.card-footer {
    padding: var(--spacing-md) var(--spacing-lg);
    border-top: 1px solid var(--border-color);
    background-color: rgba(0, 0, 0, 0.02);
}

/* Grid System */
.grid {
    display: grid;
    gap: var(--spacing-md);
}

.grid-2 { grid-template-columns: repeat(2, 1fr); }
.grid-3 { grid-template-columns: repeat(3, 1fr); }
.grid-4 { grid-template-columns: repeat(4, 1fr); }

@media (max-width: 768px) {
    .grid-3, .grid-4 {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 480px) {
    .grid-2, .grid-3, .grid-4 {
        grid-template-columns: 1fr;
    }
}

/* Media Player */
.media-player {
    width: 100%;
    background-color: #000;
    border-radius: var(--border-radius-md);
    overflow: hidden;
    position: relative;
}

.player-controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--spacing-md);
    background-color: rgba(0, 0, 0, 0.8);
    position: absolute;
    bottom: 0;
    width: 100%;
}

.progress-bar-container {
    flex: 1;
    height: 4px;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 2px;
    margin: 0 var(--spacing-md);
    cursor: pointer;
    position: relative;
}

.progress-bar-fill {
    height: 100%;
    background-color: var(--primary-color);
    border-radius: 2px;
    width: 0%;
}

.control-btn {
    background: none;
    border: none;
    color: white;
    font-size: var(--font-size-lg);
    cursor: pointer;
    padding: var(--spacing-xs);
}

/* Stats */
.stats-container {
    display: flex;
    gap: var(--spacing-md);
    flex-wrap: wrap;
}

.stat-card {
    flex: 1;
    min-width: 200px;
    background-color: var(--surface-color);
    border-radius: var(--border-radius-md);
    padding: var(--spacing-lg);
    border-left: 4px solid var(--primary-color);
}

.stat-value {
    font-size: var(--font-size-xxl);
    font-weight: 700;
    color: var(--primary-color);
}

.stat-label {
    font-size: var(--font-size-sm);
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 1px;
}

/* Download Section */
.download-section {
    background-color: var(--surface-color);
    border-radius: var(--border-radius-lg);
    padding: var(--spacing-lg);
    margin-bottom: var(--spacing-lg);
}

.url-input-container {
    display: flex;
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-lg);
}

.url-input {
    flex: 1;
    padding: var(--spacing-md);
    border: 2px solid var(--border-color);
    border-radius: var(--border-radius-md);
    background-color: var(--bg-color);
    color: var(--text-color);
    font-size: var(--font-size-md);
}

.url-input:focus {
    outline: none;
    border-color: var(--primary-color);
}

.platform-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-lg);
}

.platform-card {
    background-color: var(--surface-color);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius-md);
    padding: var(--spacing-md);
    text-align: center;
    cursor: pointer;
    transition: all var(--transition-fast);
}

.platform-card:hover {
    transform: translateY(-2px);
    border-color: var(--primary-color);
    box-shadow: 0 4px 12px var(--shadow-color);
}

.platform-icon {
    font-size: 2rem;
    margin-bottom: var(--spacing-sm);
    color: var(--primary-color);
}

/* Coding Tools */
.tool-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: var(--spacing-lg);
}

.tool-card {
    background-color: var(--surface-color);
    border-radius: var(--border-radius-lg);
    padding: var(--spacing-xl);
    text-align: center;
    border: 1px solid var(--border-color);
    transition: all var(--transition-normal);
    cursor: pointer;
}

.tool-card:hover {
    transform: translateY(-4px);
    border-color: var(--primary-color);
    box-shadow: 0 8px 25px var(--shadow-color);
}

.tool-icon {
    font-size: 3rem;
    color: var(--primary-color);
    margin-bottom: var(--spacing-md);
}

/* Animations */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes modalSlideIn {
    from {
        opacity: 0;
        transform: translateY(-50px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes pulse {
    0% {
        transform: scale(1);
        opacity: 1;
    }
    50% {
        transform: scale(1.05);
        opacity: 0.8;
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

/* Live Badge */
.live-badge {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-xs);
    padding: var(--spacing-xs) var(--spacing-sm);
    background-color: var(--error-color);
    color: white;
    border-radius: var(--border-radius-md);
    font-size: var(--font-size-xs);
    font-weight: 600;
    text-transform: uppercase;
    animation: pulse 2s infinite;
}

.live-badge::before {
    content: '';
    width: 8px;
    height: 8px;
    background-color: white;
    border-radius: 50%;
    animation: pulse 1s infinite;
}

/* Loading Spinner */
.spinner {
    width: 40px;
    height: 40px;
    border: 3px solid var(--border-color);
    border-top-color: var(--primary-color);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: var(--spacing-xl) auto;
}

/* Utility Classes */
.text-center { text-align: center; }
.text-right { text-align: right; }
.text-left { text-align: left; }

.mt-1 { margin-top: var(--spacing-sm); }
.mt-2 { margin-top: var(--spacing-md); }
.mt-3 { margin-top: var(--spacing-lg); }
.mt-4 { margin-top: var(--spacing-xl); }

.mb-1 { margin-bottom: var(--spacing-sm); }
.mb-2 { margin-bottom: var(--spacing-md); }
.mb-3 { margin-bottom: var(--spacing-lg); }
.mb-4 { margin-bottom: var(--spacing-xl); }

.p-1 { padding: var(--spacing-sm); }
.p-2 { padding: var(--spacing-md); }
.p-3 { padding: var(--spacing-lg); }
.p-4 { padding: var(--spacing-xl); }

.d-none { display: none !important; }
.d-block { display: block !important; }
.d-flex { display: flex !important; }

.flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
}

.flex-between {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.flex-column {
    display: flex;
    flex-direction: column;
}

.w-100 { width: 100%; }
.h-100 { height: 100%; }

.rounded { border-radius: var(--border-radius-md); }
.rounded-lg { border-radius: var(--border-radius-lg); }
.rounded-xl { border-radius: var(--border-radius-xl); }

.shadow-sm { box-shadow: 0 2px 4px var(--shadow-color); }
.shadow-md { box-shadow: 0 4px 8px var(--shadow-color); }
.shadow-lg { box-shadow: 0 8px 16px var(--shadow-color); }

/* Media Queries */
@media (max-width: 768px) {
    .header-container {
        padding: var(--spacing-sm) var(--spacing-md);
    }
    
    .app-name {
        font-size: var(--font-size-lg);
    }
    
    .modal-content {
        margin: var(--spacing-sm);
    }
    
    .nav-label {
        display: none;
    }
    
    .nav-icon {
        font-size: var(--font-size-xl);
        margin-bottom: 0;
    }
}

@media (max-width: 480px) {
    html {
        font-size: 14px;
    }
    
    .logo {
        width: 40px;
        height: 40px;
    }
    
    .user-controls {
        gap: var(--spacing-sm);
    }
}