// Media Downloader Dashboard
const downloaderAPIs = {
    facebook: [
        'https://api.ootaizumi.web.id/downloader/facebook'
    ],
    instagram: [
        'https://api.ootaizumi.web.id/downloader/instagram/v1',
        'https://api.ootaizumi.web.id/downloader/instagram/v2'
    ],
    youtube: [
        'https://api.ootaizumi.web.id/downloader/youtube/v2',
        'https://api.ootaizumi.web.id/downloader/youtube',
        'https://api.ootaizumi.web.id/downloader/youtube/play'
    ],
    tiktok: [
        'https://api.ootaizumi.web.id/downloader/tiktok/v1',
        'https://api.ootaizumi.web.id/downloader/tiktok/v2',
        'https://api.ootaizumi.web.id/downloader/tiktok/v3'
    ],
    twitter: [
        'https://api.ootaizumi.web.id/downloader/twitter'
    ],
    spotify: [
        'https://api.ootaizumi.web.id/downloader/spotify-v2',
        'https://api.ootaizumi.web.id/downloader/spotifyplay',
        'https://api.ootaizumi.web.id/downloader/spotify'
    ],
    soundcloud: [
        'https://api.ootaizumi.web.id/downloader/soundcloud'
    ],
    pinterest: [
        'https://api.ootaizumi.web.id/downloader/pinterest'
    ],
    gdrive: [
        'https://api.ootaizumi.web.id/downloader/gdrive'
    ],
    applemusic: [
        'https://api.ootaizumi.web.id/downloader/applemusic'
    ],
    ncs: [
        'https://api.ootaizumi.web.id/downloader/ncs'
    ],
    mediafire: [
        'https://api.ootaizumi.web.id/downloader/mediafire'
    ],
    rednote: [
        'https://api.ootaizumi.web.id/downloader/rednote'
    ],
    scribd: [
        'https://api.ootaizumi.web.id/downloader/scribd'
    ],
    sfile: [
        'https://api.ootaizumi.web.id/downloader/sfile'
    ],
    telegram: [
        'https://api.ootaizumi.web.id/downloader/telegram-sticker'
    ]
};

let downloadStats = {
    totalDownloads: 0,
    downloadsToday: 0,
    successRate: 100,
    topPlatform: 'YouTube'
};

function initDownloaderPage() {
    console.log('Initializing downloader page...');
    loadDownloadPlatforms();
    setupDownloaderControls();
    updateDownloadStats();
    
    // Load saved stats
    const savedStats = localStorage.getItem('feeXmdDownloadStats');
    if (savedStats) {
        downloadStats = JSON.parse(savedStats);
    }
}

function loadDownloadPlatforms() {
    const platforms = [
        { name: 'Facebook', icon: 'fab fa-facebook', color: '#1877F2', key: 'facebook' },
        { name: 'Instagram', icon: 'fab fa-instagram', color: '#E4405F', key: 'instagram' },
        { name: 'YouTube', icon: 'fab fa-youtube', color: '#FF0000', key: 'youtube' },
        { name: 'TikTok', icon: 'fab fa-tiktok', color: '#000000', key: 'tiktok' },
        { name: 'Twitter', icon: 'fab fa-twitter', color: '#1DA1F2', key: 'twitter' },
        { name: 'Spotify', icon: 'fab fa-spotify', color: '#1DB954', key: 'spotify' },
        { name: 'SoundCloud', icon: 'fab fa-soundcloud', color: '#FF3300', key: 'soundcloud' },
        { name: 'Pinterest', icon: 'fab fa-pinterest', color: '#BD081C', key: 'pinterest' },
        { name: 'Google Drive', icon: 'fab fa-google-drive', color: '#4285F4', key: 'gdrive' },
        { name: 'Apple Music', icon: 'fab fa-apple', color: '#FA243C', key: 'applemusic' },
        { name: 'NCS', icon: 'fas fa-music', color: '#8B5CF6', key: 'ncs' },
        { name: 'MediaFire', icon: 'fas fa-cloud', color: '#1298F6', key: 'mediafire' },
        { name: 'RedNote', icon: 'fas fa-sticky-note', color: '#FF4757', key: 'rednote' },
        { name: 'Scribd', icon: 'fas fa-book', color: '#1E7B85', key: 'scribd' },
        { name: 'SFile', icon: 'fas fa-file', color: '#00B894', key: 'sfile' },
        { name: 'Telegram', icon: 'fab fa-telegram', color: '#0088CC', key: 'telegram' }
    ];

    const container = document.getElementById('platformsGrid');
    container.innerHTML = '';

    platforms.forEach(platform => {
        const card = createPlatformCard(platform);
        container.appendChild(card);
    });
}

function createPlatformCard(platform) {
    const card = document.createElement('div');
    card.className = 'platform-card';
    card.setAttribute('data-platform', platform.key);
    card.style.border = `2px solid ${platform.color}`;

    card.innerHTML = `
        <div class="platform-icon" style="color: ${platform.color}; font-size: 2.5rem;">
            <i class="${platform.icon}"></i>
        </div>
        <div class="platform-name" style="font-weight: 600; margin-top: 10px;">
            ${platform.name}
        </div>
        <div class="platform-status" style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 5px;">
            <i class="fas fa-check-circle" style="color: var(--success-color);"></i> Available
        </div>
    `;

    card.addEventListener('click', () => {
        const exampleUrls = {
            facebook: 'https://facebook.com/watch?v=...',
            instagram: 'https://instagram.com/p/...',
            youtube: 'https://youtube.com/watch?v=...',
            tiktok: 'https://tiktok.com/@user/video/...',
            twitter: 'https://twitter.com/user/status/...',
            spotify: 'https://open.spotify.com/track/...',
            soundcloud: 'https://soundcloud.com/user/track',
            pinterest: 'https://pinterest.com/pin/...',
            gdrive: 'https://drive.google.com/file/d/...',
            applemusic: 'https://music.apple.com/album/...',
            ncs: 'https://ncs.io/track/...',
            mediafire: 'https://mediafire.com/file/...',
            rednote: 'https://rednote.com/note/...',
            scribd: 'https://scribd.com/document/...',
            sfile: 'https://sfile.mobi/file/...',
            telegram: 'https://t.me/addstickers/...'
        };

        document.getElementById('downloadUrl').value = exampleUrls[platform.key] || '';
        document.getElementById('downloadUrl').focus();
        
        // Show platform info
        showPlatformInfo(platform);
    });

    return card;
}

function showPlatformInfo(platform) {
    const apis = downloaderAPIs[platform.key] || [];
    
    const infoHTML = `
        <div class="modal active">
            <div class="modal-content" style="max-width: 500px;">
                <div class="modal-header">
                    <h3><i class="${platform.icon}" style="color: ${platform.color};"></i> ${platform.name}</h3>
                    <button class="close-modal" onclick="app.hideModal('platformInfo')">&times;</button>
                </div>
                <div class="modal-body">
                    <div style="margin-bottom: 20px;">
                        <p><strong>Supported URLs:</strong></p>
                        <ul style="padding-left: 20px; color: var(--text-secondary);">
                            <li>Direct video links</li>
                            <li>Post URLs</li>
                            <li>Playlist links</li>
                            <li>Audio tracks</li>
                        </ul>
                    </div>
                    
                    <div style="margin-bottom: 20px;">
                        <p><strong>Available APIs:</strong></p>
                        <div style="background-color: var(--surface-color); padding: 10px; border-radius: 8px; font-size: 0.9rem;">
                            ${apis.map(api => `<div style="margin-bottom: 5px;"><code>${api}</code></div>`).join('')}
                        </div>
                    </div>
                    
                    <div style="margin-bottom: 20px;">
                        <p><strong>Download Options:</strong></p>
                        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
                            <span style="background-color: var(--surface-color); padding: 5px 10px; border-radius: 4px; text-align: center;">
                                <i class="fas fa-video"></i> Video
                            </span>
                            <span style="background-color: var(--surface-color); padding: 5px 10px; border-radius: 4px; text-align: center;">
                                <i class="fas fa-music"></i> Audio
                            </span>
                            <span style="background-color: var(--surface-color); padding: 5px 10px; border-radius: 4px; text-align: center;">
                                <i class="fas fa-image"></i> Image
                            </span>
                            <span style="background-color: var(--surface-color); padding: 5px 10px; border-radius: 4px; text-align: center;">
                                <i class="fas fa-file"></i> Document
                            </span>
                        </div>
                    </div>
                </div>
                <div class="modal-footer" style="padding: 15px 20px; border-top: 1px solid var(--border-color);">
                    <button class="btn btn-primary" onclick="document.getElementById('downloadUrl').focus(); app.hideModal('platformInfo')">
                        <i class="fas fa-link"></i> Paste URL
                    </button>
                </div>
            </div>
        </div>
    `;

    const infoDiv = document.createElement('div');
    infoDiv.innerHTML = infoHTML;
    infoDiv.id = 'platformInfo';
    document.body.appendChild(infoDiv);
}

function setupDownloaderControls() {
    // Download button
    const downloadBtn = document.getElementById('downloadBtn');
    const urlInput = document.getElementById('downloadUrl');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            const url = urlInput.value.trim();
            if (url) {
                processDownload(url);
            } else {
                app.showNotification('Please enter a URL', 'error');
                urlInput.focus();
            }
        });
    }
    
    // Search button
    const searchBtn = document.getElementById('searchMediaBtn');
    const searchInput = document.getElementById('searchMedia');
    
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', () => {
            const query = searchInput.value.trim();
            if (query) {
                searchMedia(query);
            } else {
                app.showNotification('Please enter search terms', 'error');
                searchInput.focus();
            }
        });
        
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchMedia(searchInput.value.trim());
            }
        });
    }
    
    // URL input enter key
    if (urlInput) {
        urlInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const url = urlInput.value.trim();
                if (url) {
                    processDownload(url);
                }
            }
        });
    }
}

async function processDownload(url) {
    try {
        app.simulateProgress(0, 30);
        
        // Detect platform from URL
        const platform = detectPlatform(url);
        if (!platform) {
            app.simulateProgress(30, 100);
            app.showNotification('Unsupported URL. Please check the platform.', 'error');
            return;
        }
        
        // Show analyzing message
        showDownloadResult('analyzing', { platform: platform.name, url });
        app.simulateProgress(30, 60);
        
        // Simulate API call
        setTimeout(async () => {
            try {
                const mediaInfo = await fetchMediaInfo(url, platform.key);
                app.simulateProgress(60, 80);
                
                // Show media options
                showMediaOptions(mediaInfo, platform);
                app.simulateProgress(80, 100);
                
                // Update stats
                updateDownloadStats('analyzed');
                
            } catch (error) {
                console.error('Error fetching media info:', error);
                app.simulateProgress(60, 100);
                showDownloadResult('error', { platform: platform.name, error: error.message });
            }
        }, 2000);
        
    } catch (error) {
        console.error('Download process error:', error);
        app.simulateProgress(30, 100);
        app.showNotification('Download failed. Please try again.', 'error');
    }
}

function detectPlatform(url) {
    const platformPatterns = [
        { key: 'facebook', pattern: /facebook\.com|fb\.watch|fb\.com/ },
        { key: 'instagram', pattern: /instagram\.com|instagr\.am/ },
        { key: 'youtube', pattern: /youtube\.com|youtu\.be/ },
        { key: 'tiktok', pattern: /tiktok\.com/ },
        { key: 'twitter', pattern: /twitter\.com|t\.co|x\.com/ },
        { key: 'spotify', pattern: /spotify\.com/ },
        { key: 'soundcloud', pattern: /soundcloud\.com/ },
        { key: 'pinterest', pattern: /pinterest\.com/ },
        { key: 'gdrive', pattern: /drive\.google\.com/ },
        { key: 'applemusic', pattern: /music\.apple\.com/ },
        { key: 'mediafire', pattern: /mediafire\.com/ }
    ];
    
    const platform = platformPatterns.find(p => p.pattern.test(url));
    
    if (platform) {
        const platformNames = {
            facebook: { name: 'Facebook', icon: 'fab fa-facebook' },
            instagram: { name: 'Instagram', icon: 'fab fa-instagram' },
            youtube: { name: 'YouTube', icon: 'fab fa-youtube' },
            tiktok: { name: 'TikTok', icon: 'fab fa-tiktok' },
            twitter: { name: 'Twitter', icon: 'fab fa-twitter' },
            spotify: { name: 'Spotify', icon: 'fab fa-spotify' },
            soundcloud: { name: 'SoundCloud', icon: 'fab fa-soundcloud' },
            pinterest: { name: 'Pinterest', icon: 'fab fa-pinterest' },
            gdrive: { name: 'Google Drive', icon: 'fab fa-google-drive' },
            applemusic: { name: 'Apple Music', icon: 'fab fa-apple' },
            mediafire: { name: 'MediaFire', icon: 'fas fa-cloud' }
        };
        
        return { key: platform.key, ...platformNames[platform.key] };
    }
    
    return null;
}

async function fetchMediaInfo(url, platformKey) {
    // Simulate API response based on platform
    const mockResponses = {
        facebook: {
            success: true,
            title: 'Facebook Video',
            duration: '2:45',
            thumbnail: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            formats: [
                { quality: 'HD', format: 'mp4', size: '45MB' },
                { quality: 'SD', format: 'mp4', size: '25MB' },
                { quality: 'Audio', format: 'mp3', size: '8MB' }
            ]
        },
        instagram: {
            success: true,
            title: 'Instagram Post',
            duration: '0:45',
            thumbnail: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            formats: [
                { quality: 'HD', format: 'mp4', size: '15MB' },
                { quality: 'SD', format: 'mp4', size: '8MB' },
                { quality: 'Image', format: 'jpg', size: '3MB' }
            ]
        },
        youtube: {
            success: true,
            title: 'YouTube Video',
            duration: '10:30',
            thumbnail: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            formats: [
                { quality: '4K', format: 'mp4', size: '850MB' },
                { quality: '1080p', format: 'mp4', size: '250MB' },
                { quality: '720p', format: 'mp4', size: '120MB' },
                { quality: '360p', format: 'mp4', size: '45MB' },
                { quality: 'Audio', format: 'mp3', size: '12MB' }
            ]
        },
        tiktok: {
            success: true,
            title: 'TikTok Video',
            duration: '0:59',
            thumbnail: 'https://images.unsplash.com/photo-1611605698323-b1e99cfd37ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            formats: [
                { quality: 'HD', format: 'mp4', size: '25MB' },
                { quality: 'SD', format: 'mp4', size: '12MB' },
                { quality: 'Audio', format: 'mp3', size: '4MB' }
            ]
        }
    };
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return mockResponses[platformKey] || {
        success: true,
        title: 'Media File',
        duration: 'N/A',
        thumbnail: 'https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        formats: [
            { quality: 'Original', format: 'mp4', size: '50MB' },
            { quality: 'Audio', format: 'mp3', size: '10MB' }
        ]
    };
}

function showDownloadResult(type, data) {
    const container = document.getElementById('downloadResult');
    
    let content = '';
    
    switch (type) {
        case 'analyzing':
            content = `
                <div class="card">
                    <div class="card-body">
                        <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">
                            <div class="spinner" style="width: 30px; height: 30px;"></div>
                            <div>
                                <h4 style="margin-bottom: 5px;">Analyzing URL...</h4>
                                <p style="color: var(--text-secondary); font-size: 0.9rem;">
                                    Detected: <strong>${data.platform}</strong>
                                </p>
                            </div>
                        </div>
                        <div style="background-color: var(--surface-color); padding: 10px; border-radius: 8px; font-size: 0.9rem;">
                            <code>${data.url}</code>
                        </div>
                    </div>
                </div>
            `;
            break;
            
        case 'media_options':
            content = `
                <div class="card">
                    <div class="card-header">
                        <h4><i class="${data.platform.icon}" style="color: ${data.platform.color};"></i> ${data.mediaInfo.title}</h4>
                    </div>
                    <div class="card-body">
                        <div style="display: flex; gap: 20px; margin-bottom: 20px;">
                            <img src="${data.mediaInfo.thumbnail}" alt="${data.mediaInfo.title}" 
                                 style="width: 150px; height: 100px; object-fit: cover; border-radius: 8px;">
                            <div style="flex: 1;">
                                <p><strong>Platform:</strong> ${data.platform.name}</p>
                                <p><strong>Duration:</strong> ${data.mediaInfo.duration}</p>
                                <p><strong>Status:</strong> <span style="color: var(--success-color);">Ready to download</span></p>
                            </div>
                        </div>
                        
                        <div class="formats-section">
                            <h5>Available Formats:</h5>
                            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 10px; margin-top: 10px;">
                                ${data.mediaInfo.formats.map((format, index) => `
                                    <div class="format-option" style="background-color: var(--surface-color); padding: 15px; 
                                                                      border-radius: 8px; border: 2px solid var(--border-color);
                                                                      cursor: pointer; transition: all 0.3s;"
                                         onclick="startDownload('${data.url}', ${index})">
                                        <div style="display: flex; justify-content: space-between; align-items: center;">
                                            <div>
                                                <div style="font-weight: 600;">${format.quality}</div>
                                                <div style="font-size: 0.8rem; color: var(--text-secondary);">
                                                    ${format.format.toUpperCase()} • ${format.size}
                                                </div>
                                            </div>
                                            <i class="fas fa-download" style="color: var(--primary-color);"></i>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            `;
            break;
            
        case 'downloading':
            content = `
                <div class="card">
                    <div class="card-body">
                        <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 20px;">
                            <i class="fas fa-download" style="font-size: 2rem; color: var(--primary-color);"></i>
                            <div>
                                <h4 style="margin-bottom: 5px;">Downloading...</h4>
                                <p style="color: var(--text-secondary); font-size: 0.9rem;">
                                    ${data.title} (${data.quality})
                                </p>
                            </div>
                        </div>
                        
                        <div style="margin-bottom: 15px;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                                <span>Progress</span>
                                <span id="downloadPercentage">0%</span>
                            </div>
                            <div style="height: 8px; background-color: var(--border-color); border-radius: 4px; overflow: hidden;">
                                <div id="downloadProgressBar" style="width: 0%; height: 100%; 
                                                                      background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
                                                                      transition: width 0.3s;"></div>
                            </div>
                        </div>
                        
                        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; font-size: 0.8rem;">
                            <div style="text-align: center;">
                                <div style="color: var(--text-secondary);">Speed</div>
                                <div id="downloadSpeed">0 MB/s</div>
                            </div>
                            <div style="text-align: center;">
                                <div style="color: var(--text-secondary);">Time Left</div>
                                <div id="downloadTime">--:--</div>
                            </div>
                            <div style="text-align: center;">
                                <div style="color: var(--text-secondary);">Size</div>
                                <div>${data.size}</div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            break;
            
        case 'completed':
            content = `
                <div class="card">
                    <div class="card-body">
                        <div style="text-align: center; padding: 20px;">
                            <div style="width: 80px; height: 80px; background-color: var(--success-color); color: white; 
                                      border-radius: 50%; display: flex; align-items: center; justify-content: center;
                                      margin: 0 auto 20px; font-size: 2rem;">
                                <i class="fas fa-check"></i>
                            </div>
                            <h4>Download Complete!</h4>
                            <p style="color: var(--text-secondary); margin-bottom: 20px;">
                                ${data.title} has been downloaded successfully.
                            </p>
                            <div style="background-color: var(--surface-color); padding: 15px; border-radius: 8px; 
                                        margin-bottom: 20px; text-align: left;">
                                <p style="margin-bottom: 5px;"><strong>File:</strong> ${data.filename}</p>
                                <p style="margin-bottom: 5px;"><strong>Size:</strong> ${data.size}</p>
                                <p style="margin-bottom: 5px;"><strong>Saved to:</strong> Downloads/FEE-XMD/</p>
                                <p><strong>Format:</strong> ${data.format.toUpperCase()}</p>
                            </div>
                            <div style="display: flex; gap: 10px; justify-content: center;">
                                <button class="btn btn-primary" onclick="openDownloadedFile('${data.filename}')">
                                    <i class="fas fa-folder-open"></i> Open File
                                </button>
                                <button class="btn btn-secondary" onclick="shareDownload('${data.filename}')">
                                    <i class="fas fa-share"></i> Share
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            break;
            
        case 'error':
            content = `
                <div class="card">
                    <div class="card-body">
                        <div style="text-align: center; padding: 20px;">
                            <div style="width: 80px; height: 80px; background-color: var(--error-color); color: white; 
                                      border-radius: 50%; display: flex; align-items: center; justify-content: center;
                                      margin: 0 auto 20px; font-size: 2rem;">
                                <i class="fas fa-exclamation"></i>
                            </div>
                            <h4>Download Failed</h4>
                            <p style="color: var(--text-secondary); margin-bottom: 20px;">
                                ${data.error || 'Unable to download the media.'}
                            </p>
                            <div style="display: flex; gap: 10px; justify-content: center;">
                                <button class="btn btn-primary" onclick="processDownload('${data.url}')">
                                    <i class="fas fa-redo"></i> Try Again
                                </button>
                                <button class="btn btn-secondary" onclick="clearDownloadResult()">
                                    <i class="fas fa-times"></i> Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            break;
    }
    
    container.innerHTML = content;
    container.classList.remove('hidden');
    
    // Scroll to result
    setTimeout(() => {
        container.scrollIntoView({ behavior: 'smooth' });
    }, 100);
}

function showMediaOptions(mediaInfo, platform) {
    showDownloadResult('media_options', { mediaInfo, platform });
}

function startDownload(url, formatIndex) {
    // Get format details
    const resultCard = document.querySelector('#downloadResult .card');
    if (!resultCard) return;
    
    const formats = Array.from(resultCard.querySelectorAll('.format-option'));
    if (formatIndex >= formats.length) return;
    
    const formatElement = formats[formatIndex];
    const quality = formatElement.querySelector('div > div:first-child').textContent;
    const size = formatElement.querySelector('div > div:last-child').textContent.split('•')[1].trim();
    
    const title = resultCard.querySelector('.card-header h4').textContent;
    
    showDownloadResult('downloading', {
        title,
        quality,
        size
    });
    
    // Simulate download progress
    simulateDownloadProgress(url, quality, size);
}

function simulateDownloadProgress(url, quality, size) {
    let progress = 0;
    let speed = 0;
    let timeLeft = '--:--';
    
    const progressBar = document.getElementById('downloadProgressBar');
    const percentage = document.getElementById('downloadPercentage');
    const speedElement = document.getElementById('downloadSpeed');
    const timeElement = document.getElementById('downloadTime');
    
    const interval = setInterval(() => {
        // Update progress
        progress += Math.random() * 5;
        if (progress > 100) progress = 100;
        
        // Update speed (random between 1-10 MB/s)
        speed = (Math.random() * 9 + 1).toFixed(1);
        
        // Calculate time left
        const remaining = Math.max(0, 100 - progress);
        const secondsLeft = Math.floor((remaining / (speed * 10)) * 100);
        const minutes = Math.floor(secondsLeft / 60);
        const seconds = secondsLeft % 60;
        timeLeft = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        // Update UI
        if (progressBar) progressBar.style.width = `${progress}%`;
        if (percentage) percentage.textContent = `${Math.floor(progress)}%`;
        if (speedElement) speedElement.textContent = `${speed} MB/s`;
        if (timeElement) timeElement.textContent = timeLeft;
        
        // Complete download
        if (progress >= 100) {
            clearInterval(interval);
            
            setTimeout(() => {
                // Generate filename
                const timestamp = new Date().getTime();
                const format = quality === 'Audio' ? 'mp3' : 'mp4';
                const filename = `FEE-XMD_${timestamp}.${format}`;
                
                showDownloadResult('completed', {
                    title: 'Media File',
                    filename,
                    size,
                    format: format
                });
                
                // Update stats
                updateDownloadStats('completed');
                
                // Log activity
                if (authSystem.currentUser) {
                    authSystem.logActivity('download_media', {
                        platform: detectPlatform(url)?.name || 'Unknown',
                        quality,
                        size,
                        format
                    });
                }
                
            }, 500);
        }
    }, 200);
}

function openDownloadedFile(filename) {
    app.showNotification(`Opening: ${filename}`, 'info');
    // In a real app, this would open the file
}

function shareDownload(filename) {
    if (navigator.share) {
        navigator.share({
            title: 'Downloaded from FEE-XMD GO',
            text: `Check out this file I downloaded: ${filename}`,
            url: window.location.href
        });
    } else {
        app.showNotification('Sharing not supported on this device', 'info');
    }
}

function clearDownloadResult() {
    const container = document.getElementById('downloadResult');
    container.innerHTML = '';
    container.classList.add('hidden');
}

function searchMedia(query) {
    app.simulateProgress(0, 100).then(() => {
        const results = [
            { title: 'Music Video', platform: 'YouTube', duration: '3:45' },
            { title: 'Tutorial', platform: 'YouTube', duration: '15:20' },
            { title: 'Podcast', platform: 'Spotify', duration: '45:30' },
            { title: 'Dance Video', platform: 'TikTok', duration: '0:59' },
            { title: 'Motivational Speech', platform: 'Facebook', duration: '8:15' }
        ].filter(item => 
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.platform.toLowerCase().includes(query.toLowerCase())
        );
        
        const container = document.getElementById('downloadResult');
        
        if (results.length === 0) {
            container.innerHTML = `
                <div class="card">
                    <div class="card-body" style="text-align: center; padding: 40px;">
                        <i class="fas fa-search" style="font-size: 3rem; color: var(--text-secondary); margin-bottom: 20px;"></i>
                        <h4>No Results Found</h4>
                        <p style="color: var(--text-secondary);">No media found for "${query}"</p>
                    </div>
                </div>
            `;
        } else {
            container.innerHTML = `
                <div class="card">
                    <div class="card-header">
                        <h4>Search Results for "${query}"</h4>
                    </div>
                    <div class="card-body">
                        <div style="display: grid; gap: 10px;">
                            ${results.map(item => `
                                <div style="display: flex; align-items: center; justify-content: space-between; 
                                            padding: 15px; background-color: var(--surface-color); border-radius: 8px;">
                                    <div>
                                        <div style="font-weight: 600; margin-bottom: 5px;">${item.title}</div>
                                        <div style="font-size: 0.8rem; color: var(--text-secondary);">
                                            ${item.platform} • ${item.duration}
                                        </div>
                                    </div>
                                    <button class="btn btn-sm btn-primary" onclick="searchAndDownload('${item.title}', '${item.platform}')">
                                        <i class="fas fa-download"></i> Download
                                    </button>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
        }
        
        container.classList.remove('hidden');
        container.scrollIntoView({ behavior: 'smooth' });
    });
}

function searchAndDownload(title, platform) {
    // This would trigger an actual search and download
    app.showNotification(`Searching for: ${title} on ${platform}`, 'info');
    
    // Simulate search result
    setTimeout(() => {
        document.getElementById('downloadUrl').value = `https://${platform.toLowerCase()}.com/search?q=${encodeURIComponent(title)}`;
        processDownload(document.getElementById('downloadUrl').value);
    }, 1000);
}

function updateDownloadStats(action) {
    // Update stats based on action
    switch (action) {
        case 'analyzed':
            // No change to counts
            break;
        case 'completed':
            downloadStats.totalDownloads += 1;
            downloadStats.downloadsToday += 1;
            
            // Update success rate (simulated)
            downloadStats.successRate = Math.min(100, Math.floor(Math.random() * 10) + 95);
            
            // Update top platform (simulated)
            const platforms = ['YouTube', 'Facebook', 'TikTok', 'Instagram', 'Twitter'];
            downloadStats.topPlatform = platforms[Math.floor(Math.random() * platforms.length)];
            
            // Save to localStorage
            localStorage.setItem('feeXmdDownloadStats', JSON.stringify(downloadStats));
            break;
    }
    
    // Update display
    document.getElementById('totalDownloads').textContent = downloadStats.totalDownloads.toLocaleString();
    document.getElementById('downloadsTodayCount').textContent = downloadStats.downloadsToday.toLocaleString();
    document.getElementById('successRate').textContent = `${downloadStats.successRate}%`;
    document.getElementById('topPlatform').textContent = downloadStats.topPlatform;
}

// Make functions available globally
window.initDownloaderPage = initDownloaderPage;
window.processDownload = processDownload;
window.startDownload = startDownload;
window.openDownloadedFile = openDownloadedFile;
window.shareDownload = shareDownload;
window.clearDownloadResult = clearDownloadResult;
window.searchMedia = searchMedia;
window.searchAndDownload = searchAndDownload;