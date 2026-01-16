// Home Page Functionality
function initHomePage() {
    console.log('Initializing home page...');
    loadHomeStats();
    loadTrendingContent();
    loadRecentContent();
    setupHomeEventListeners();
}

async function loadHomeStats() {
    try {
        // Simulate API call for stats
        const stats = {
            totalViews: 15423,
            activeUsers: 1243,
            downloadsToday: 387,
            topCategory: 'Movies'
        };
        
        // Update DOM
        document.getElementById('totalViews').textContent = stats.totalViews.toLocaleString();
        document.getElementById('activeUsers').textContent = stats.activeUsers.toLocaleString();
        document.getElementById('downloadsToday').textContent = stats.downloadsToday.toLocaleString();
        document.getElementById('topCategory').textContent = stats.topCategory;
        
    } catch (error) {
        console.error('Error loading home stats:', error);
    }
}

async function loadTrendingContent() {
    try {
        // Simulated trending content data
        const trendingData = [
            {
                id: 1,
                title: "Action Movie Marathon",
                type: "movie",
                category: "action",
                views: 1250,
                rating: 4.8,
                thumbnail: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
            },
            {
                id: 2,
                title: "Web Development Tutorial",
                type: "tutorial",
                category: "video",
                views: 980,
                rating: 4.9,
                thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
            },
            {
                id: 3,
                title: "Live Music Channel",
                type: "live",
                category: "music",
                views: 2150,
                rating: 4.7,
                thumbnail: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
            },
            {
                id: 4,
                title: "Python Programming Basics",
                type: "tutorial",
                category: "text",
                views: 750,
                rating: 4.6,
                thumbnail: "https://images.unsplash.com/photo-1526379879527-8559ecfcaec8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
            }
        ];
        
        const container = document.getElementById('trendingContent');
        container.innerHTML = '';
        
        trendingData.forEach(item => {
            const card = createContentCard(item, true);
            container.appendChild(card);
        });
        
    } catch (error) {
        console.error('Error loading trending content:', error);
    }
}

async function loadRecentContent() {
    try {
        // Simulated recent content data
        const recentData = [
            {
                id: 5,
                title: "Comedy Special",
                type: "movie",
                category: "comedy",
                views: 1100,
                rating: 4.5,
                thumbnail: "https://images.unsplash.com/photo-1533616688419-b7a585564f70?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
            },
            {
                id: 6,
                title: "Graphic Design Tutorial",
                type: "tutorial",
                category: "image",
                views: 620,
                rating: 4.8,
                thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
            },
            {
                id: 7,
                title: "News Live Stream",
                type: "live",
                category: "news",
                views: 1850,
                rating: 4.4,
                thumbnail: "https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
            },
            {
                id: 8,
                title: "Audio Editing Masterclass",
                type: "tutorial",
                category: "audio",
                views: 430,
                rating: 4.9,
                thumbnail: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
            }
        ];
        
        const container = document.getElementById('recentContent');
        container.innerHTML = '';
        
        recentData.forEach(item => {
            const card = createContentCard(item, false);
            container.appendChild(card);
        });
        
    } catch (error) {
        console.error('Error loading recent content:', error);
    }
}

function createContentCard(item, isTrending) {
    const card = document.createElement('div');
    card.className = 'card content-card';
    card.setAttribute('data-id', item.id);
    card.setAttribute('data-type', item.type);
    
    const badge = isTrending ? '<span class="live-badge" style="background-color: var(--primary-color);">Trending</span>' : '';
    
    card.innerHTML = `
        <div class="card-header" style="padding: 0; position: relative;">
            <img src="${item.thumbnail}" alt="${item.title}" 
                 style="width: 100%; height: 150px; object-fit: cover;">
            ${badge}
        </div>
        <div class="card-body" style="padding: 15px;">
            <h4 style="margin-bottom: 5px; font-size: 1rem;">${item.title}</h4>
            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem; color: var(--text-secondary);">
                <span>
                    <i class="fas fa-${getTypeIcon(item.type)}"></i>
                    ${item.type}
                </span>
                <span>
                    <i class="fas fa-eye"></i> ${item.views.toLocaleString()}
                </span>
            </div>
            <div style="margin-top: 8px; display: flex; justify-content: space-between;">
                <span style="font-size: 0.8rem; color: var(--text-secondary);">
                    ${item.category}
                </span>
                <span style="color: gold; font-size: 0.9rem;">
                    <i class="fas fa-star"></i> ${item.rating}
                </span>
            </div>
        </div>
        <div class="card-footer" style="padding: 10px 15px; display: flex; gap: 8px;">
            <button class="btn btn-sm btn-primary watch-btn" style="flex: 1;">
                <i class="fas fa-play"></i> Watch
            </button>
            <button class="btn btn-sm btn-secondary download-btn" style="flex: 1;">
                <i class="fas fa-download"></i> Download
            </button>
        </div>
    `;
    
    // Add event listeners
    const watchBtn = card.querySelector('.watch-btn');
    const downloadBtn = card.querySelector('.download-btn');
    
    watchBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        playContent(item);
    });
    
    downloadBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        downloadContent(item);
    });
    
    // Click on card
    card.addEventListener('click', (e) => {
        if (!e.target.closest('button')) {
            playContent(item);
        }
    });
    
    return card;
}

function getTypeIcon(type) {
    const icons = {
        movie: 'film',
        tutorial: 'graduation-cap',
        live: 'tv'
    };
    return icons[type] || 'file';
}

function playContent(item) {
    app.simulateProgress(0, 100).then(() => {
        const playerHTML = `
            <div class="modal active" style="z-index: 1003;">
                <div class="modal-content" style="max-width: 800px;">
                    <div class="modal-header">
                        <h3>${item.title}</h3>
                        <button class="close-modal" onclick="closePlayer()">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="media-player" style="margin-bottom: 20px;">
                            <div style="width: 100%; height: 400px; background-color: #000; 
                                        display: flex; align-items: center; justify-content: center; color: white;">
                                <i class="fas fa-play-circle" style="font-size: 4rem;"></i>
                            </div>
                        </div>
                        <div class="content-info">
                            <p><strong>Type:</strong> ${item.type}</p>
                            <p><strong>Category:</strong> ${item.category}</p>
                            <p><strong>Views:</strong> ${item.views.toLocaleString()}</p>
                            <p><strong>Rating:</strong> ${item.rating}/5</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        const playerDiv = document.createElement('div');
        playerDiv.innerHTML = playerHTML;
        document.body.appendChild(playerDiv);
        
        // Log activity
        if (authSystem.currentUser) {
            authSystem.logActivity('watch', {
                contentId: item.id,
                contentTitle: item.title,
                contentType: item.type
            });
            
            authSystem.updateUserStats(authSystem.currentUser.id, {
                totalViews: (authSystem.currentUser.stats?.totalViews || 0) + 1
            });
        }
    });
}

function downloadContent(item) {
    app.simulateProgress(0, 100).then(() => {
        app.showNotification(`Downloading: ${item.title}`, 'info');
        
        // Log activity
        if (authSystem.currentUser) {
            authSystem.logActivity('download', {
                contentId: item.id,
                contentTitle: item.title,
                contentType: item.type
            });
            
            authSystem.updateUserStats(authSystem.currentUser.id, {
                totalDownloads: (authSystem.currentUser.stats?.totalDownloads || 0) + 1
            });
        }
    });
}

function closePlayer() {
    const player = document.querySelector('.modal[style*="z-index: 1003"]');
    if (player) {
        player.remove();
    }
}

function setupHomeEventListeners() {
    // Refresh button if exists
    const refreshBtn = document.getElementById('refreshHome');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => {
            app.loadPage('home');
        });
    }
}

// Make functions available globally
window.initHomePage = initHomePage;
window.playContent = playContent;
window.downloadContent = downloadContent;
window.closePlayer = closePlayer;