// Live Streaming Dashboard
function initLivePage() {
    console.log('Initializing live page...');
    loadLiveChannels();
    setupLiveControls();
    updateLiveStats();
    
    // Simulate real-time updates
    setInterval(updateLiveStats, 30000); // Update every 30 seconds
    setInterval(updateViewerCounts, 10000); // Update viewer counts every 10 seconds
}

async function loadLiveChannels() {
    try {
        // Simulated live channels data
        const liveChannels = [
            {
                id: 1,
                title: "Music Live 24/7",
                category: "music",
                viewers: 1250,
                isLive: true,
                thumbnail: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                streamUrl: "https://stream.music.live/24-7",
                quality: "HD",
                uptime: "12:45:23"
            },
            {
                id: 2,
                title: "News Channel",
                category: "news",
                viewers: 850,
                isLive: true,
                thumbnail: "https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                streamUrl: "https://stream.news.live",
                quality: "FHD",
                uptime: "08:20:15"
            },
            {
                id: 3,
                title: "Sports Highlights",
                category: "sports",
                viewers: 3200,
                isLive: true,
                thumbnail: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                streamUrl: "https://stream.sports.live",
                quality: "4K",
                uptime: "05:45:30"
            },
            {
                id: 4,
                title: "Gaming Stream",
                category: "gaming",
                viewers: 980,
                isLive: true,
                thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                streamUrl: "https://stream.gaming.live",
                quality: "HD",
                uptime: "03:15:45"
            },
            {
                id: 5,
                title: "Educational Channel",
                category: "education",
                viewers: 540,
                isLive: true,
                thumbnail: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                streamUrl: "https://stream.edu.live",
                quality: "HD",
                uptime: "01:30:20"
            },
            {
                id: 6,
                title: "Movie Channel",
                category: "movies",
                viewers: 2100,
                isLive: true,
                thumbnail: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                streamUrl: "https://stream.movies.live",
                quality: "FHD",
                uptime: "06:45:10"
            }
        ];
        
        const container = document.getElementById('liveChannelsGrid');
        container.innerHTML = '';
        
        liveChannels.forEach(channel => {
            const card = createLiveChannelCard(channel);
            container.appendChild(card);
        });
        
    } catch (error) {
        console.error('Error loading live channels:', error);
        document.getElementById('liveChannelsGrid').innerHTML = `
            <div class="error-message">
                <p>Unable to load live channels. Please try again later.</p>
                <button class="btn btn-primary" onclick="loadLiveChannels()">
                    <i class="fas fa-redo"></i> Retry
                </button>
            </div>
        `;
    }
}

function createLiveChannelCard(channel) {
    const card = document.createElement('div');
    card.className = 'card live-channel-card';
    card.setAttribute('data-id', channel.id);
    card.setAttribute('data-category', channel.category);
    
    const categoryIcon = getCategoryIcon(channel.category);
    
    card.innerHTML = `
        <div class="card-header" style="padding: 0; position: relative;">
            <img src="${channel.thumbnail}" alt="${channel.title}" 
                 style="width: 100%; height: 180px; object-fit: cover;">
            <div style="position: absolute; top: 10px; left: 10px; display: flex; gap: 5px;">
                <span class="live-badge">LIVE</span>
                <span style="background-color: rgba(0,0,0,0.7); color: white; padding: 2px 8px; 
                            border-radius: 4px; font-size: 0.8rem; font-weight: bold;">
                    ${channel.quality}
                </span>
            </div>
            <div style="position: absolute; top: 10px; right: 10px; background-color: rgba(0,0,0,0.7); 
                        color: white; padding: 2px 8px; border-radius: 4px; font-size: 0.8rem;">
                <i class="fas fa-users"></i> ${channel.viewers.toLocaleString()}
            </div>
        </div>
        <div class="card-body" style="padding: 15px;">
            <h4 style="margin-bottom: 8px; font-size: 1.1rem;">${channel.title}</h4>
            <div style="display: flex; justify-content: space-between; align-items: center; 
                        font-size: 0.8rem; color: var(--text-secondary);">
                <span>
                    <i class="fas fa-${categoryIcon}"></i>
                    ${channel.category}
                </span>
                <span>
                    <i class="fas fa-clock"></i> ${channel.uptime}
                </span>
            </div>
        </div>
        <div class="card-footer" style="padding: 10px 15px; display: flex; gap: 8px;">
            <button class="btn btn-sm btn-primary watch-live-btn" style="flex: 1;">
                <i class="fas fa-play"></i> Watch Live
            </button>
            <button class="btn btn-sm btn-secondary channel-info-btn" style="flex: 1;">
                <i class="fas fa-info-circle"></i> Info
            </button>
        </div>
    `;
    
    // Add event listeners
    const watchBtn = card.querySelector('.watch-live-btn');
    const infoBtn = card.querySelector('.channel-info-btn');
    
    watchBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        watchLiveStream(channel);
    });
    
    infoBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showChannelInfo(channel);
    });
    
    // Click on card
    card.addEventListener('click', (e) => {
        if (!e.target.closest('button')) {
            watchLiveStream(channel);
        }
    });
    
    return card;
}

function getCategoryIcon(category) {
    const icons = {
        music: 'music',
        news: 'newspaper',
        sports: 'futbol',
        gaming: 'gamepad',
        education: 'graduation-cap',
        movies: 'film'
    };
    return icons[category] || 'tv';
}

function watchLiveStream(channel) {
    app.simulateProgress(0, 100).then(() => {
        const playerHTML = `
            <div class="modal active" style="z-index: 1003;">
                <div class="modal-content" style="max-width: 1000px; width: 95%; height: 80vh;">
                    <div class="modal-header">
                        <h3>${channel.title} - Live</h3>
                        <button class="close-modal" onclick="closeLivePlayer()">&times;</button>
                    </div>
                    <div class="modal-body" style="padding: 0; height: calc(100% - 60px);">
                        <div class="live-player-container" style="width: 100%; height: 100%;">
                            <div style="width: 100%; height: 100%; background-color: #000; 
                                        display: flex; flex-direction: column;">
                                <div style="flex: 1; display: flex; align-items: center; justify-content: center; color: white;">
                                    <div style="text-align: center;">
                                        <i class="fas fa-play-circle" style="font-size: 4rem; margin-bottom: 20px;"></i>
                                        <p>Streaming: ${channel.title}</p>
                                        <p style="font-size: 0.9rem; color: #ccc;">Quality: ${channel.quality}</p>
                                    </div>
                                </div>
                                <div class="player-controls" style="background-color: rgba(0,0,0,0.8); 
                                                                   padding: 10px 20px; color: white;">
                                    <div style="display: flex; justify-content: space-between; align-items: center;">
                                        <div>
                                            <button class="control-btn">
                                                <i class="fas fa-play"></i>
                                            </button>
                                            <button class="control-btn">
                                                <i class="fas fa-volume-up"></i>
                                            </button>
                                            <span style="margin-left: 20px;">Live</span>
                                        </div>
                                        <div style="display: flex; align-items: center; gap: 20px;">
                                            <span>
                                                <i class="fas fa-users"></i> ${channel.viewers.toLocaleString()} viewers
                                            </span>
                                            <span>
                                                <i class="fas fa-clock"></i> ${channel.uptime}
                                            </span>
                                            <select style="background-color: #333; color: white; border: none; padding: 5px;">
                                                <option>${channel.quality}</option>
                                                <option>HD</option>
                                                <option>SD</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
            authSystem.logActivity('watch_live', {
                channelId: channel.id,
                channelTitle: channel.title,
                category: channel.category
            });
        }
        
        // Simulate viewer count increase
        setTimeout(() => {
            channel.viewers += 1;
            updateViewerDisplay(channel.id, channel.viewers);
        }, 2000);
    });
}

function showChannelInfo(channel) {
    const infoHTML = `
        <div class="modal active">
            <div class="modal-content" style="max-width: 500px;">
                <div class="modal-header">
                    <h3>${channel.title}</h3>
                    <button class="close-modal" onclick="app.hideModal('channelInfo')">&times;</button>
                </div>
                <div class="modal-body">
                    <div style="display: flex; gap: 20px; margin-bottom: 20px;">
                        <img src="${channel.thumbnail}" alt="${channel.title}" 
                             style="width: 150px; height: 100px; object-fit: cover; border-radius: 8px;">
                        <div>
                            <p><strong>Category:</strong> ${channel.category}</p>
                            <p><strong>Quality:</strong> ${channel.quality}</p>
                            <p><strong>Uptime:</strong> ${channel.uptime}</p>
                            <p><strong>Viewers:</strong> ${channel.viewers.toLocaleString()}</p>
                        </div>
                    </div>
                    <div class="channel-description">
                        <p>Live streaming channel ${channel.category} content. Available 24/7 with ${channel.quality} quality.</p>
                    </div>
                    <div class="channel-stats" style="margin-top: 20px;">
                        <h4>Channel Statistics</h4>
                        <div class="stats-container" style="grid-template-columns: repeat(2, 1fr);">
                            <div class="stat-card">
                                <div class="stat-value">${Math.floor(channel.viewers / 1000)}K</div>
                                <div class="stat-label">Total Viewers</div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-value">${channel.uptime.split(':')[0]}+</div>
                                <div class="stat-label">Hours Live</div>
                            </div>
                        </div>
                    </div>
                    <button class="btn btn-primary btn-block mt-3" onclick="watchLiveStream(${JSON.stringify(channel).replace(/"/g, '&quot;')})">
                        <i class="fas fa-play"></i> Watch Live
                    </button>
                </div>
            </div>
        </div>
    `;
    
    const infoDiv = document.createElement('div');
    infoDiv.innerHTML = infoHTML;
    infoDiv.id = 'channelInfo';
    document.body.appendChild(infoDiv);
}

function closeLivePlayer() {
    const player = document.querySelector('.modal[style*="z-index: 1003"]');
    if (player) {
        player.remove();
    }
}

function updateViewerDisplay(channelId, viewers) {
    const channelCard = document.querySelector(`.live-channel-card[data-id="${channelId}"]`);
    if (channelCard) {
        const viewerElement = channelCard.querySelector('[style*="position: absolute; top: 10px; right: 10px"]');
        if (viewerElement) {
            viewerElement.innerHTML = `<i class="fas fa-users"></i> ${viewers.toLocaleString()}`;
        }
    }
}

function updateViewerCounts() {
    // Simulate changing viewer counts
    document.querySelectorAll('.live-channel-card').forEach(card => {
        const currentViewers = parseInt(card.querySelector('[style*="top: 10px; right: 10px"]')?.textContent?.replace(/,/g, '') || '0');
        const change = Math.floor(Math.random() * 50) - 25; // Random change between -25 and +25
        const newViewers = Math.max(100, currentViewers + change);
        
        const channelId = card.getAttribute('data-id');
        updateViewerDisplay(channelId, newViewers);
    });
}

function updateLiveStats() {
    try {
        const totalViewers = Array.from(document.querySelectorAll('.live-channel-card'))
            .reduce((sum, card) => {
                const viewersText = card.querySelector('[style*="top: 10px; right: 10px"]')?.textContent || '0';
                const viewers = parseInt(viewersText.replace(/,/g, '')) || 0;
                return sum + viewers;
            }, 0);
        
        const totalChannels = document.querySelectorAll('.live-channel-card').length;
        const peakViewers = Math.floor(totalViewers * (1 + Math.random() * 0.3)); // Simulate peak
        
        document.getElementById('liveViewers').textContent = totalViewers.toLocaleString();
        document.getElementById('totalChannels').textContent = totalChannels;
        document.getElementById('peakViewers').textContent = peakViewers.toLocaleString();
        
    } catch (error) {
        console.error('Error updating live stats:', error);
    }
}

function setupLiveControls() {
    // Category filter buttons
    document.querySelectorAll('.category-filter .btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const filter = e.target.getAttribute('data-filter');
            filterLiveChannels(filter);
            
            // Update active button
            document.querySelectorAll('.category-filter .btn').forEach(b => {
                b.classList.remove('active', 'btn-primary');
                b.classList.add('btn-secondary');
            });
            e.target.classList.add('active', 'btn-primary');
            e.target.classList.remove('btn-secondary');
        });
    });
    
    // Refresh button
    const refreshBtn = document.getElementById('refreshLive');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => {
            app.simulateProgress(0, 100).then(() => {
                loadLiveChannels();
                updateLiveStats();
            });
        });
    }
}

function filterLiveChannels(filter) {
    const allChannels = document.querySelectorAll('.live-channel-card');
    
    allChannels.forEach(channel => {
        if (filter === 'all' || channel.getAttribute('data-category') === filter) {
            channel.style.display = 'block';
        } else {
            channel.style.display = 'none';
        }
    });
}

// Make functions available globally
window.initLivePage = initLivePage;
window.closeLivePlayer = closeLivePlayer;