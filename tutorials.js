// Tutorials Dashboard - Enhanced Version
let tutorialsData = [];
let currentCategory = 'all';
let mediaDurationCache = {};

function initTutorialsPage() {
    console.log('Initializing tutorials page...');
    setupTutorialsControls();
    loadTutorialsFromJSON();
    updateTutorialStats();
    
    // Set up real-time updates
    setInterval(updateTutorialStats, 30000);
}

async function loadTutorialsFromJSON() {
    try {
        // Load from multiple JSON files
        const [videoData, audioData, imageData] = await Promise.all([
            loadJSONFile('video.json'),
            loadJSONFile('audio.json'),
            loadJSONFile('image.json')
        ]);
        
        // Combine and process all data
        tutorialsData = [
            ...(videoData || []).map(item => ({ 
                ...item, 
                category: 'video',
                type: detectMediaType(item.videoUrl || item.downloadUrl, 'video')
            })),
            ...(audioData || []).map(item => ({ 
                ...item, 
                category: 'audio',
                type: 'audio'
            })),
            ...(imageData || []).map(item => ({ 
                ...item, 
                category: 'image',
                type: 'image',
                caption: item.caption || item.description || ''
            }))
        ];
        
        // Get durations for videos
        await getMediaDurations();
        
        displayTutorials(tutorialsData);
        
    } catch (error) {
        console.error('Error loading tutorials from JSON:', error);
        // Fallback to default data
        loadDefaultTutorials();
    }
}

async function loadJSONFile(filename) {
    try {
        const response = await fetch(`data/${filename}?t=${Date.now()}`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const data = await response.json();
        return Array.isArray(data) ? data : [];
        
    } catch (error) {
        console.warn(`Failed to load ${filename}:`, error);
        return [];
    }
}

function loadDefaultTutorials() {
    // Default fallback data
    tutorialsData = [
        {
            id: 1,
            title: "How To Use Bible Command",
            category: "video",
            type: "reel",
            duration: "1min+",
            author: "Fredi Ezra",
            views: 2570,
            rating: 4.9,
            difficulty: "Beginner",
            description: "This video teach WhatsApp bot users about how to use bible command in Fee-xmd WhatsApp bot.",
            thumbnail: "https://files.catbox.moe/5sh4fp.jpeg",
            videoUrl: "https://files.catbox.moe/9dprzr.mp4",
            downloadUrl: "https://files.catbox.moe/9dprzr.mp4",
            fileSize: "15.2 MB",
            resolution: "720p",
            uploadDate: "2024-01-15"
        },
        {
            id: 2,
            title: "Advanced Bot Configuration",
            category: "video",
            type: "video",
            duration: "5:32",
            author: "Fredi Ezra",
            views: 1890,
            rating: 4.8,
            difficulty: "Intermediate",
            description: "Learn advanced configuration for Fee-xmd WhatsApp bot with custom commands.",
            thumbnail: "https://files.catbox.moe/3k7t9x.jpeg",
            videoUrl: "https://files.catbox.moe/7b4q2s.mp4",
            downloadUrl: "https://files.catbox.moe/7b4q2s.mp4",
            fileSize: "42.5 MB",
            resolution: "1080p",
            uploadDate: "2024-01-10"
        },
        {
            id: 3,
            title: "Bot Installation Guide",
            category: "audio",
            duration: "25:15",
            author: "Fredi Ezra",
            views: 1450,
            rating: 4.7,
            difficulty: "Beginner",
            description: "Audio guide for installing and setting up Fee-xmd WhatsApp bot.",
            thumbnail: "https://files.catbox.moe/8j3k2p.jpeg",
            audioUrl: "https://files.catbox.moe/6f9t2q.mp3",
            downloadUrl: "https://files.catbox.moe/6f9t2q.mp3",
            fileSize: "24.8 MB",
            bitrate: "192kbps",
            uploadDate: "2024-01-05"
        },
        {
            id: 4,
            title: "Bot Command Reference",
            category: "image",
            duration: "8 images",
            author: "Fredi Ezra",
            views: 3200,
            rating: 4.9,
            difficulty: "Beginner",
            description: "Complete visual guide to all available bot commands with examples.",
            caption: "This image shows all available commands with detailed explanations and usage examples for Fee-xmd WhatsApp bot.",
            thumbnail: "https://files.catbox.moe/2p9t7x.jpeg",
            images: [
                "https://files.catbox.moe/2p9t7x.jpeg",
                "https://files.catbox.moe/4k8q1w.jpeg",
                "https://files.catbox.moe/6j2t5r.jpeg"
            ],
            downloadUrl: "https://github.com/Fred1e/fee-xmd-docs/raw/main/images/commands-guide.zip",
            fileSize: "8.7 MB",
            uploadDate: "2024-01-20"
        }
    ];
    
    displayTutorials(tutorialsData);
}

async function getMediaDurations() {
    // Get durations for video and audio files
    for (const tutorial of tutorialsData) {
        if ((tutorial.category === 'video' || tutorial.category === 'audio') && tutorial.videoUrl) {
            const cacheKey = tutorial.videoUrl;
            
            if (!mediaDurationCache[cacheKey]) {
                try {
                    const duration = await getMediaDuration(tutorial.videoUrl);
                    mediaDurationCache[cacheKey] = duration;
                    tutorial.duration = duration;
                    tutorial.type = detectMediaType(tutorial.videoUrl, tutorial.category);
                } catch (error) {
                    console.warn(`Could not get duration for ${tutorial.videoUrl}:`, error);
                }
            } else {
                tutorial.duration = mediaDurationCache[cacheKey];
                tutorial.type = detectMediaType(tutorial.videoUrl, tutorial.category);
            }
        }
    }
}

async function getMediaDuration(url) {
    return new Promise((resolve) => {
        // Create a video/audio element to get duration
        const media = document.createElement(tutorial.category === 'video' ? 'video' : 'audio');
        
        media.onloadedmetadata = () => {
            const duration = media.duration;
            const formatted = formatDuration(duration);
            media.remove();
            resolve(formatted);
        };
        
        media.onerror = () => {
            media.remove();
            // Return default duration
            resolve(tutorial.category === 'video' ? '3:45' : '25:15');
        };
        
        media.src = url;
        media.load();
    });
}

function formatDuration(seconds) {
    if (!seconds || isNaN(seconds)) return 'N/A';
    
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    } else {
        return `${minutes}:${secs.toString().padStart(2, '0')}`;
    }
}

function detectMediaType(url, category) {
    if (category !== 'video') return category;
    
    // Check if it's a short video (reel) based on filename or metadata
    const urlLower = url.toLowerCase();
    
    // Check for reel indicators
    if (urlLower.includes('reel') || urlLower.includes('short') || urlLower.includes('tiktok')) {
        return 'reel';
    }
    
    // Check duration if available
    if (mediaDurationCache[url]) {
        const duration = mediaDurationCache[url];
        if (typeof duration === 'string') {
            // Parse duration string like "1:23"
            const parts = duration.split(':');
            const minutes = parseInt(parts[0]) || 0;
            if (minutes < 1) return 'reel';
        }
    }
    
    return 'video';
}

function displayTutorials(tutorials) {
    const container = document.getElementById('tutorialsList');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Sort by selected option
    const sortBy = document.getElementById('sortTutorials')?.value || 'popular';
    let sortedTutorials = [...tutorials];
    
    switch (sortBy) {
        case 'recent':
            sortedTutorials.sort((a, b) => new Date(b.uploadDate || 0) - new Date(a.uploadDate || 0));
            break;
        case 'rating':
            sortedTutorials.sort((a, b) => b.rating - a.rating);
            break;
        case 'views':
            sortedTutorials.sort((a, b) => b.views - a.views);
            break;
        case 'popular':
        default:
            sortedTutorials.sort((a, b) => (b.views * b.rating) - (a.views * a.rating));
    }
    
    if (sortedTutorials.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-graduation-cap" style="font-size: 4rem; color: var(--text-secondary); margin-bottom: 20px;"></i>
                <h3>No Tutorials Available</h3>
                <p>Check back later for new tutorials.</p>
            </div>
        `;
        return;
    }
    
    sortedTutorials.forEach(tutorial => {
        const item = createTutorialItem(tutorial);
        container.appendChild(item);
    });
}

function createTutorialItem(tutorial) {
    const item = document.createElement('div');
    item.className = 'tutorial-item card';
    item.setAttribute('data-id', tutorial.id);
    item.setAttribute('data-category', tutorial.category);
    item.setAttribute('data-type', tutorial.type || tutorial.category);
    
    const categoryIcon = getTutorialCategoryIcon(tutorial.category);
    const difficultyColor = getDifficultyColor(tutorial.difficulty);
    const typeBadge = tutorial.type === 'reel' ? '<span class="live-badge" style="background-color: #FF3366; margin-left: 5px;">REEL</span>' : '';
    
    item.innerHTML = `
        <div style="display: flex; gap: 20px; padding: 20px;">
            <div class="tutorial-media" style="flex: 0 0 200px; position: relative;">
                <img src="${tutorial.thumbnail}" alt="${tutorial.title}" 
                     style="width: 100%; height: 150px; object-fit: cover; border-radius: 8px;">
                ${tutorial.category === 'video' ? `
                    <div style="position: absolute; bottom: 10px; right: 10px; background-color: rgba(0,0,0,0.7); 
                                color: white; padding: 3px 8px; border-radius: 4px; font-size: 0.8rem;">
                        <i class="fas fa-play-circle"></i> ${tutorial.duration || 'N/A'}
                    </div>
                ` : ''}
                <div style="margin-top: 10px; text-align: center;">
                    <span class="live-badge" style="background-color: ${getCategoryColor(tutorial.category)}; font-size: 0.7rem;">
                        ${categoryIcon} ${tutorial.type ? tutorial.type.toUpperCase() : tutorial.category.toUpperCase()}
                    </span>
                    ${typeBadge}
                </div>
            </div>
            <div class="tutorial-content" style="flex: 1;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                    <div>
                        <h3 style="margin-bottom: 5px;">${tutorial.title}</h3>
                        <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 10px;">
                            <span style="color: var(--text-secondary);">
                                <i class="fas fa-user"></i> ${tutorial.author || 'Unknown'}
                            </span>
                            <span style="color: var(--text-secondary);">
                                <i class="fas fa-clock"></i> ${tutorial.duration || 'N/A'}
                            </span>
                            <span style="color: ${difficultyColor}; font-weight: 500;">
                                ${tutorial.difficulty || 'Beginner'}
                            </span>
                            ${tutorial.uploadDate ? `<span style="color: var(--text-secondary); font-size: 0.8rem;">
                                <i class="fas fa-calendar"></i> ${formatDate(tutorial.uploadDate)}
                            </span>` : ''}
                        </div>
                    </div>
                    <div style="text-align: right;">
                        <div style="color: gold; font-size: 1.1rem;">
                            <i class="fas fa-star"></i> ${tutorial.rating || 4.5}
                        </div>
                        <div style="font-size: 0.8rem; color: var(--text-secondary);">
                            <i class="fas fa-eye"></i> ${(tutorial.views || 0).toLocaleString()} views
                        </div>
                    </div>
                </div>
                
                <p style="margin-bottom: 15px; color: var(--text-secondary);">
                    ${tutorial.description || 'No description available.'}
                </p>
                
                ${tutorial.category === 'image' && tutorial.caption ? `
                    <div style="background-color: var(--surface-color); padding: 10px; border-radius: 5px; 
                                margin-bottom: 15px; border-left: 3px solid ${getCategoryColor(tutorial.category)};">
                        <i class="fas fa-quote-left" style="color: var(--text-secondary); margin-right: 5px;"></i>
                        ${tutorial.caption}
                    </div>
                ` : ''}
                
                <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                    <button class="btn btn-sm btn-primary watch-tutorial-btn">
                        <i class="fas fa-play"></i> ${tutorial.category === 'image' ? 'View' : 
                                                      tutorial.category === 'audio' ? 'Listen' : 'Watch'}
                    </button>
                    <button class="btn btn-sm btn-secondary download-tutorial-btn">
                        <i class="fas fa-download"></i> Download
                    </button>
                    <button class="btn btn-sm btn-secondary tutorial-info-btn">
                        <i class="fas fa-info-circle"></i> Details
                    </button>
                    ${tutorial.fileSize ? `
                        <span style="background-color: var(--surface-color); padding: 5px 10px; 
                                    border-radius: 4px; font-size: 0.8rem; color: var(--text-secondary);">
                            <i class="fas fa-weight"></i> ${tutorial.fileSize}
                        </span>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
    
    // Add event listeners
    const watchBtn = item.querySelector('.watch-tutorial-btn');
    const downloadBtn = item.querySelector('.download-tutorial-btn');
    const infoBtn = item.querySelector('.tutorial-info-btn');
    
    watchBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        accessTutorial(tutorial);
    });
    
    downloadBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        downloadTutorial(tutorial);
    });
    
    infoBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showTutorialInfo(tutorial);
    });
    
    return item;
}

function formatDate(dateString) {
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    } catch {
        return 'Unknown date';
    }
}

function getTutorialCategoryIcon(category) {
    const icons = {
        video: 'fa-video',
        audio: 'fa-music',
        image: 'fa-image'
    };
    return icons[category] || 'fa-file';
}

function getCategoryColor(category) {
    const colors = {
        video: '#FF3366',
        audio: '#33CCFF',
        image: '#66CC33',
        reel: '#FF6600'
    };
    return colors[category] || '#999999';
}

function getDifficultyColor(difficulty) {
    const colors = {
        'Beginner': '#28A745',
        'Intermediate': '#FFC107',
        'Advanced': '#DC3545',
        'Expert': '#6F42C1'
    };
    return colors[difficulty] || '#6C757D';
}

async function accessTutorial(tutorial) {
    app.simulateProgress(0, 30);
    
    try {
        if (tutorial.category === 'video') {
            await playVideoTutorial(tutorial);
        } else if (tutorial.category === 'audio') {
            await playAudioTutorial(tutorial);
        } else if (tutorial.category === 'image') {
            await showImageTutorial(tutorial);
        }
        
        app.simulateProgress(30, 100);
        
        // Log activity
        if (authSystem.currentUser) {
            authSystem.logActivity('access_tutorial', {
                tutorialId: tutorial.id,
                tutorialTitle: tutorial.title,
                category: tutorial.category,
                type: tutorial.type
            });
            
            // Update tutorial views
            tutorial.views = (tutorial.views || 0) + 1;
            updateTutorialViews(tutorial.id, tutorial.views);
        }
        
    } catch (error) {
        console.error('Error accessing tutorial:', error);
        app.simulateProgress(30, 100);
        app.showNotification('Failed to load tutorial. Please try again.', 'error');
    }
}

async function playVideoTutorial(tutorial) {
    const videoUrl = tutorial.videoUrl || tutorial.downloadUrl;
    if (!videoUrl) {
        throw new Error('No video URL available');
    }
    
    // Check if video is accessible
    const isAccessible = await checkMediaAccessibility(videoUrl);
    if (!isAccessible) {
        throw new Error('Video not accessible');
    }
    
    const playerHTML = `
        <div class="modal active" style="z-index: 1003;">
            <div class="modal-content" style="max-width: 1000px; width: 95%; height: 85vh;">
                <div class="modal-header">
                    <h3>${tutorial.title}</h3>
                    <button class="close-modal" onclick="closeMediaPlayer()">&times;</button>
                </div>
                <div class="modal-body" style="padding: 0; height: calc(100% - 60px);">
                    <div class="media-player-container" style="width: 100%; height: 100%;">
                        <video id="tutorialVideoPlayer" controls 
                               style="width: 100%; height: 100%; background-color: #000;">
                            <source src="${videoUrl}" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
                <div class="modal-footer" style="padding: 10px 20px; border-top: 1px solid var(--border-color);
                                               display: flex; justify-content: space-between; align-items: center;">
                    <div style="font-size: 0.9rem; color: var(--text-secondary);">
                        ${tutorial.author} • ${tutorial.duration} • ${tutorial.fileSize || ''}
                    </div>
                    <div>
                        <button class="btn btn-sm btn-primary" onclick="downloadMedia('${videoUrl}', '${tutorial.title}.mp4')">
                            <i class="fas fa-download"></i> Download
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    const playerDiv = document.createElement('div');
    playerDiv.innerHTML = playerHTML;
    playerDiv.id = 'mediaPlayer';
    document.body.appendChild(playerDiv);
    
    // Auto-play
    setTimeout(() => {
        const video = document.getElementById('tutorialVideoPlayer');
        if (video) {
            video.play().catch(e => console.log('Auto-play prevented:', e));
        }
    }, 500);
}

async function playAudioTutorial(tutorial) {
    const audioUrl = tutorial.audioUrl || tutorial.downloadUrl;
    if (!audioUrl) {
        throw new Error('No audio URL available');
    }
    
    // Check if audio is accessible
    const isAccessible = await checkMediaAccessibility(audioUrl);
    if (!isAccessible) {
        throw new Error('Audio not accessible');
    }
    
    const playerHTML = `
        <div class="modal active">
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h3><i class="fas fa-music"></i> ${tutorial.title}</h3>
                    <button class="close-modal" onclick="closeMediaPlayer()">&times;</button>
                </div>
                <div class="modal-body">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <img src="${tutorial.thumbnail}" alt="${tutorial.title}" 
                             style="width: 200px; height: 200px; object-fit: cover; border-radius: 50%; margin-bottom: 20px;">
                        <h4>Audio Tutorial</h4>
                        <p style="color: var(--text-secondary);">By ${tutorial.author} • ${tutorial.duration}</p>
                    </div>
                    
                    <div class="audio-player" style="background-color: var(--surface-color); padding: 20px; 
                                                     border-radius: 10px; margin-bottom: 20px;">
                        <audio id="tutorialAudioPlayer" controls 
                               style="width: 100%; margin-bottom: 15px;">
                            <source src="${audioUrl}" type="audio/mpeg">
                            Your browser does not support the audio element.
                        </audio>
                        <div style="display: flex; justify-content: center; gap: 20px;">
                            <button class="btn btn-sm btn-secondary" onclick="skipBackward()">
                                <i class="fas fa-step-backward"></i>
                            </button>
                            <button class="btn btn-sm btn-secondary" onclick="toggleVolume()">
                                <i class="fas fa-volume-up"></i>
                            </button>
                            <button class="btn btn-sm btn-secondary" onclick="skipForward()">
                                <i class="fas fa-step-forward"></i>
                            </button>
                        </div>
                    </div>
                    
                    <div class="tutorial-info">
                        <p><strong>Description:</strong> ${tutorial.description}</p>
                        <p><strong>Difficulty:</strong> ${tutorial.difficulty}</p>
                        <p><strong>File Size:</strong> ${tutorial.fileSize || 'Unknown'}</p>
                        <p><strong>Bitrate:</strong> ${tutorial.bitrate || 'Unknown'}</p>
                    </div>
                </div>
                <div class="modal-footer" style="padding: 15px 20px; border-top: 1px solid var(--border-color); 
                                               display: flex; justify-content: space-between;">
                    <button class="btn btn-secondary" onclick="downloadMedia('${audioUrl}', '${tutorial.title}.mp3')">
                        <i class="fas fa-download"></i> Download Audio
                    </button>
                    <button class="btn btn-primary" onclick="markAsComplete(${tutorial.id})">
                        <i class="fas fa-check"></i> Mark as Complete
                    </button>
                </div>
            </div>
        </div>
    `;
    
    const playerDiv = document.createElement('div');
    playerDiv.innerHTML = playerHTML;
    playerDiv.id = 'mediaPlayer';
    document.body.appendChild(playerDiv);
}

async function showImageTutorial(tutorial) {
    const images = tutorial.images || [tutorial.thumbnail];
    
    const galleryHTML = `
        <div class="modal active">
            <div class="modal-content" style="max-width: 1000px; max-height: 90vh;">
                <div class="modal-header">
                    <h3><i class="fas fa-images"></i> ${tutorial.title}</h3>
                    <button class="close-modal" onclick="closeMediaPlayer()">&times;</button>
                </div>
                <div class="modal-body" style="overflow-y: auto;">
                    <div style="text-align: center; margin-bottom: 20px;">
                        <div id="mainImageContainer">
                            <img id="mainImage" src="${images[0]}" alt="${tutorial.title}" 
                                 style="max-width: 100%; max-height: 500px; object-fit: contain; border-radius: 8px;">
                        </div>
                        ${tutorial.caption ? `
                            <p style="margin-top: 15px; color: var(--text-secondary); font-style: italic;">
                                ${tutorial.caption}
                            </p>
                        ` : ''}
                    </div>
                    
                    ${images.length > 1 ? `
                        <div class="image-thumbnails" style="margin-top: 20px;">
                            <h4>Gallery (${images.length} images)</h4>
                            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); 
                                        gap: 10px; margin-top: 15px;">
                                ${images.map((img, index) => `
                                    <img src="${img}" alt="Image ${index + 1}" 
                                         style="width: 100%; height: 100px; object-fit: cover; border-radius: 8px; 
                                                cursor: pointer; border: 2px solid ${index === 0 ? 'var(--primary-color)' : 'transparent'};"
                                         onclick="changeMainImage('${img}', this)">
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                    
                    <div class="tutorial-details" style="margin-top: 20px;">
                        <p><strong>Author:</strong> ${tutorial.author}</p>
                        <p><strong>Difficulty:</strong> ${tutorial.difficulty}</p>
                        <p><strong>Images:</strong> ${images.length}</p>
                        <p><strong>File Size:</strong> ${tutorial.fileSize || 'Unknown'}</p>
                    </div>
                </div>
                <div class="modal-footer" style="padding: 15px 20px; border-top: 1px solid var(--border-color); 
                                               display: flex; justify-content: space-between;">
                    <button class="btn btn-secondary" onclick="downloadMedia('${tutorial.downloadUrl || images[0]}', '${tutorial.title}.zip')">
                        <i class="fas fa-download"></i> Download All
                    </button>
                    <button class="btn btn-primary" onclick="markAsComplete(${tutorial.id})">
                        <i class="fas fa-check"></i> Mark as Complete
                    </button>
                </div>
            </div>
        </div>
    `;
    
    const galleryDiv = document.createElement('div');
    galleryDiv.innerHTML = galleryHTML;
    galleryDiv.id = 'mediaPlayer';
    document.body.appendChild(galleryDiv);
}

async function downloadTutorial(tutorial) {
    app.simulateProgress(0, 20);
    
    const downloadUrl = tutorial.downloadUrl || tutorial.videoUrl || tutorial.audioUrl || tutorial.thumbnail;
    const filename = `${tutorial.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.${getFileExtension(tutorial)}`;
    
    if (!downloadUrl) {
        app.simulateProgress(20, 100);
        app.showNotification('Download URL not available', 'error');
        return;
    }
    
    // Check if file is accessible
    const isAccessible = await checkMediaAccessibility(downloadUrl);
    if (!isAccessible) {
        app.simulateProgress(20, 100);
        app.showNotification('File not accessible for download', 'error');
        return;
    }
    
    app.simulateProgress(20, 40);
    
    try {
        // Real download using fetch
        const response = await fetch(downloadUrl);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        app.simulateProgress(40, 60);
        
        const blob = await response.blob();
        app.simulateProgress(60, 80);
        
        // Create download link
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        
        // Cleanup
        setTimeout(() => {
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        }, 100);
        
        app.simulateProgress(80, 100);
        
        // Log activity
        if (authSystem.currentUser) {
            authSystem.logActivity('download_tutorial', {
                tutorialId: tutorial.id,
                tutorialTitle: tutorial.title,
                category: tutorial.category,
                fileSize: tutorial.fileSize,
                filename: filename
            });
        }
        
        app.showNotification(`Downloaded: ${filename}`, 'success');
        
    } catch (error) {
        console.error('Download error:', error);
        app.simulateProgress(40, 100);
        app.showNotification('Download failed. Please try again.', 'error');
        
        // Fallback to direct link
        window.open(downloadUrl, '_blank');
    }
}

async function checkMediaAccessibility(url) {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        return response.ok;
    } catch (error) {
        console.warn('Media accessibility check failed:', error);
        return false;
    }
}

function getFileExtension(tutorial) {
    const url = tutorial.downloadUrl || tutorial.videoUrl || tutorial.audioUrl || '';
    const extMatch = url.match(/\.([a-z0-9]+)(?:[?#]|$)/i);
    
    if (extMatch) {
        return extMatch[1].toLowerCase();
    }
    
    // Default extensions by category
    switch (tutorial.category) {
        case 'video': return 'mp4';
        case 'audio': return 'mp3';
        case 'image': return 'jpg';
        default: return 'bin';
    }
}

async function downloadMedia(url, filename) {
    try {
        app.simulateProgress(0, 30);
        
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        app.simulateProgress(30, 70);
        
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        
        app.simulateProgress(70, 100);
        
        // Cleanup
        setTimeout(() => {
            window.URL.revokeObjectURL(downloadUrl);
            document.body.removeChild(a);
        }, 100);
        
        app.showNotification(`Downloaded: ${filename}`, 'success');
        
    } catch (error) {
        console.error('Media download error:', error);
        app.showNotification('Download failed. Opening in new tab...', 'warning');
        window.open(url, '_blank');
    }
}

function showTutorialInfo(tutorial) {
    const infoHTML = `
        <div class="modal active">
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h3>${tutorial.title} - Details</h3>
                    <button class="close-modal" onclick="app.hideModal('tutorialInfo')">&times;</button>
                </div>
                <div class="modal-body">
                    <div style="margin-bottom: 20px;">
                        <img src="${tutorial.thumbnail}" alt="${tutorial.title}" 
                             style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 15px;">
                        
                        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-bottom: 15px;">
                            <div>
                                <strong>Category:</strong><br>
                                <span style="color: ${getCategoryColor(tutorial.category)};">
                                    <i class="fas ${getTutorialCategoryIcon(tutorial.category)}"></i>
                                    ${tutorial.type ? tutorial.type.toUpperCase() : tutorial.category.toUpperCase()}
                                </span>
                            </div>
                            <div>
                                <strong>Duration:</strong><br>
                                ${tutorial.duration || 'N/A'}
                            </div>
                            <div>
                                <strong>Author:</strong><br>
                                ${tutorial.author || 'Unknown'}
                            </div>
                            <div>
                                <strong>Difficulty:</strong><br>
                                <span style="color: ${getDifficultyColor(tutorial.difficulty)};">
                                    ${tutorial.difficulty || 'Beginner'}
                                </span>
                            </div>
                            <div>
                                <strong>Rating:</strong><br>
                                <span style="color: gold;">
                                    <i class="fas fa-star"></i> ${tutorial.rating || 'N/A'}
                                </span>
                            </div>
                            <div>
                                <strong>Views:</strong><br>
                                ${(tutorial.views || 0).toLocaleString()}
                            </div>
                            ${tutorial.fileSize ? `
                                <div>
                                    <strong>File Size:</strong><br>
                                    ${tutorial.fileSize}
                                </div>
                            ` : ''}
                            ${tutorial.uploadDate ? `
                                <div>
                                    <strong>Uploaded:</strong><br>
                                    ${formatDate(tutorial.uploadDate)}
                                </div>
                            ` : ''}
                        </div>
                        
                        <div style="margin-bottom: 15px;">
                            <strong>Description:</strong>
                            <p style="color: var(--text-secondary); margin-top: 5px;">
                                ${tutorial.description || 'No description available.'}
                            </p>
                        </div>
                        
                        ${tutorial.caption ? `
                            <div style="background-color: var(--surface-color); padding: 10px; border-radius: 5px; 
                                        margin-bottom: 15px; border-left: 3px solid ${getCategoryColor(tutorial.category)};">
                                <strong>Caption:</strong>
                                <p style="color: var(--text-secondary); margin-top: 5px;">
                                    ${tutorial.caption}
                                </p>
                            </div>
                        ` : ''}
                        
                        <div style="background-color: var(--surface-color); padding: 10px; border-radius: 5px;">
                            <strong>Download URL:</strong><br>
                            <code style="font-size: 0.8rem; color: var(--text-secondary); word-break: break-all;">
                                ${tutorial.downloadUrl || tutorial.videoUrl || tutorial.audioUrl || 'No URL available'}
                            </code>
                        </div>
                    </div>
                </div>
                <div class="modal-footer" style="padding: 15px 20px; border-top: 1px solid var(--border-color); 
                                               display: flex; gap: 10px;">
                    <button class="btn btn-primary" style="flex: 1;" 
                            onclick="accessTutorial(${JSON.stringify(tutorial).replace(/"/g, '&quot;')}); app.hideModal('tutorialInfo')">
                        <i class="fas fa-play"></i> ${tutorial.category === 'image' ? 'View' : 
                                                      tutorial.category === 'audio' ? 'Listen' : 'Watch'}
                    </button>
                    <button class="btn btn-secondary" style="flex: 1;" 
                            onclick="downloadTutorial(${JSON.stringify(tutorial).replace(/"/g, '&quot;')}); app.hideModal('tutorialInfo')">
                        <i class="fas fa-download"></i> Download
                    </button>
                </div>
            </div>
        </div>
    `;
    
    const infoDiv = document.createElement('div');
    infoDiv.innerHTML = infoHTML;
    infoDiv.id = 'tutorialInfo';
    document.body.appendChild(infoDiv);
}

function markAsComplete(tutorialId) {
    const tutorial = tutorialsData.find(t => t.id === tutorialId);
    if (tutorial) {
        app.showNotification(`Marked "${tutorial.title}" as complete!`, 'success');
        
        if (authSystem.currentUser) {
            authSystem.logActivity('complete_tutorial', {
                tutorialId: tutorial.id,
                tutorialTitle: tutorial.title
            });
        }
    }
}

function updateTutorialViews(tutorialId, views) {
    const tutorialItem = document.querySelector(`.tutorial-item[data-id="${tutorialId}"]`);
    if (tutorialItem) {
        const viewElement = tutorialItem.querySelector('[style*="fa-eye"]');
        if (viewElement) {
            viewElement.innerHTML = `<i class="fas fa-eye"></i> ${views.toLocaleString()} views`;
        }
    }
    updateTutorialStats();
}

function updateTutorialStats() {
    try {
        const totalTutorials = tutorialsData.length;
        const totalViews = tutorialsData.reduce((sum, tutorial) => sum + (tutorial.views || 0), 0);
        const avgRating = tutorialsData.length > 0 ? 
            (tutorialsData.reduce((sum, tutorial) => sum + (tutorial.rating || 4.5), 0) / tutorialsData.length).toFixed(1) : 0;
        
        // Count by type
        const videoCount = tutorialsData.filter(t => t.category === 'video').length;
        const audioCount = tutorialsData.filter(t => t.category === 'audio').length;
        const imageCount = tutorialsData.filter(t => t.category === 'image').length;
        const reelCount = tutorialsData.filter(t => t.type === 'reel').length;
        
        document.getElementById('totalTutorials').textContent = totalTutorials;
        document.getElementById('completionRate').textContent = `${Math.floor(Math.random() * 30) + 60}%`;
        document.getElementById('avgTutorialRating').textContent = avgRating;
        
        // Update additional stats if elements exist
        const videoStats = document.getElementById('videoStats');
        const audioStats = document.getElementById('audioStats');
        const imageStats = document.getElementById('imageStats');
        const reelStats = document.getElementById('reelStats');
        
        if (videoStats) videoStats.textContent = `${videoCount} videos`;
        if (audioStats) audioStats.textContent = `${audioCount} audios`;
        if (imageStats) imageStats.textContent = `${imageCount} images`;
        if (reelStats) reelStats.textContent = `${reelCount} reels`;
        
    } catch (error) {
        console.error('Error updating tutorial stats:', error);
    }
}

function setupTutorialsControls() {
    // Category filter buttons - Remove "text" category
    document.querySelectorAll('.category-filter .btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const category = e.target.getAttribute('data-category');
            currentCategory = category;
            filterTutorials(category);
            
            // Update active button
            document.querySelectorAll('.category-filter .btn').forEach(b => {
                b.classList.remove('active', 'btn-primary');
                b.classList.add('btn-secondary');
            });
            e.target.classList.add('active', 'btn-primary');
            e.target.classList.remove('btn-secondary');
        });
    });
    
    // Remove text category button if it exists
    const textBtn = document.querySelector('.category-filter .btn[data-category="text"]');
    if (textBtn) {
        textBtn.remove();
    }
    
    // Sort select
    const sortSelect = document.getElementById('sortTutorials');
    if (sortSelect) {
        // Remove text-related options if any
        const options = sortSelect.querySelectorAll('option');
        options.forEach(option => {
            if (option.value.includes('text')) {
                option.remove();
            }
        });
        
        sortSelect.addEventListener('change', () => {
            displayTutorials(currentCategory === 'all' ? tutorialsData : 
                tutorialsData.filter(t => t.category === currentCategory));
        });
    }
    
    // Refresh button
    const refreshBtn = document.getElementById('refreshTutorials');
    if (!refreshBtn) {
        // Add refresh button if not exists
        const controls = document.querySelector('.tutorials-controls .flex-between');
        if (controls) {
            const refreshBtn = document.createElement('button');
            refreshBtn.className = 'btn btn-primary';
            refreshBtn.id = 'refreshTutorials';
            refreshBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Refresh';
            refreshBtn.addEventListener('click', () => {
                app.simulateProgress(0, 100).then(() => {
                    loadTutorialsFromJSON();
                    updateTutorialStats();
                });
            });
            controls.appendChild(refreshBtn);
        }
    }
}

function filterTutorials(category) {
    if (category === 'all') {
        displayTutorials(tutorialsData);
    } else {
        const filteredTutorials = tutorialsData.filter(tutorial => tutorial.category === category);
        displayTutorials(filteredTutorials);
    }
}

function changeMainImage(imgSrc, element) {
    const mainImg = document.getElementById('mainImage');
    if (mainImg) {
        mainImg.src = imgSrc;
        
        // Update active thumbnail
        document.querySelectorAll('.image-thumbnails img').forEach(img => {
            img.style.borderColor = 'transparent';
        });
        element.style.borderColor = 'var(--primary-color)';
    }
}

function closeMediaPlayer() {
    const player = document.getElementById('mediaPlayer');
    if (player) {
        player.remove();
    }
}

function skipBackward() {
    const audio = document.getElementById('tutorialAudioPlayer');
    if (audio) {
        audio.currentTime = Math.max(0, audio.currentTime - 10);
    }
}

function skipForward() {
    const audio = document.getElementById('tutorialAudioPlayer');
    if (audio) {
        audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
    }
}

function toggleVolume() {
    const audio = document.getElementById('tutorialAudioPlayer');
    if (audio) {
        audio.muted = !audio.muted;
        const btn = document.querySelector('[onclick="toggleVolume()"]');
        if (btn) {
            btn.innerHTML = audio.muted ? 
                '<i class="fas fa-volume-mute"></i>' : 
                '<i class="fas fa-volume-up"></i>';
        }
    }
}

// Make functions available globally
window.initTutorialsPage = initTutorialsPage;
window.accessTutorial = accessTutorial;
window.downloadTutorial = downloadTutorial;
window.downloadMedia = downloadMedia;
window.markAsComplete = markAsComplete;
window.changeMainImage = changeMainImage;
window.closeMediaPlayer = closeMediaPlayer;
window.skipBackward = skipBackward;
window.skipForward = skipForward;
window.toggleVolume = toggleVolume;