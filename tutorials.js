// Tutorials Dashboard
let tutorialsData = [];
let currentCategory = 'all';

function initTutorialsPage() {
    console.log('Initializing tutorials page...');
    loadTutorials();
    setupTutorialsControls();
    updateTutorialStats();
}

async function loadTutorials() {
    try {
        // Simulated tutorials data
        tutorialsData = [
            {
                id: 1,
                title: "How To Use Bible Command",
                category: "video",
                duration: "1min+",
                author: "Fredi Ezra",
                views: 2570,
                rating: 4.9,
                difficulty: "Beginner",
                description: "This video teach WhatsApp bot users about how to use bible command in Fee-xmd WhatsApp bot.",
                thumbnail: "https://files.catbox.moe/5sh4fp.jpeg",
                videoUrl: "https://files.catbox.moe/9dprzr.mp4",
                downloadUrl: "https://files.catbox.moe/9dprzr.mp4"
            },
            {
                id: 2,
                title: "Graphic Design Basics",
                category: "image",
                duration: "12 images",
                author: "Jane Smith",
                views: 850,
                rating: 4.7,
                difficulty: "Beginner",
                description: "Basic principles of graphic design with examples.",
                thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                downloadUrl: "https://tutorials.example.com/graphic-design.zip"
            },
            {
                id: 3,
                title: "Audio Editing Tutorial",
                category: "audio",
                duration: "32:15",
                author: "Mike Johnson",
                views: 620,
                rating: 4.8,
                difficulty: "Intermediate",
                description: "Professional audio editing techniques.",
                thumbnail: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                audioUrl: "https://tutorials.example.com/audio-editing.mp3",
                downloadUrl: "https://tutorials.example.com/audio-editing.zip"
            },
            {
                id: 4,
                title: "HTML & CSS Complete Guide",
                category: "text",
                duration: "45 min read",
                author: "Sarah Williams",
                views: 2100,
                rating: 4.9,
                difficulty: "Beginner",
                description: "Complete guide to HTML and CSS with code examples.",
                thumbnail: "https://images.unsplash.com/photo-1526379879527-8559ecfcaec8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                content: "Complete HTML and CSS tutorial content...",
                downloadUrl: "https://tutorials.example.com/html-css-guide.pdf"
            },
            {
                id: 5,
                title: "Video Editing for Beginners",
                category: "video",
                duration: "58:40",
                author: "David Brown",
                views: 980,
                rating: 4.6,
                difficulty: "Beginner",
                description: "Start video editing with free software.",
                thumbnail: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                videoUrl: "https://tutorials.example.com/video-editing.mp4",
                downloadUrl: "https://tutorials.example.com/video-editing.zip"
            },
            {
                id: 6,
                title: "Python Programming Basics",
                category: "text",
                duration: "60 min read",
                author: "Alex Chen",
                views: 1500,
                rating: 4.8,
                difficulty: "Beginner",
                description: "Learn Python programming from scratch.",
                thumbnail: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                content: "Python programming tutorial content...",
                downloadUrl: "https://tutorials.example.com/python-basics.pdf"
            }
        ];
        
        displayTutorials(tutorialsData);
        
    } catch (error) {
        console.error('Error loading tutorials:', error);
        document.getElementById('tutorialsList').innerHTML = `
            <div class="error-message">
                <p>Unable to load tutorials. Please try again later.</p>
                <button class="btn btn-primary" onclick="loadTutorials()">
                    <i class="fas fa-redo"></i> Retry
                </button>
            </div>
        `;
    }
}

function displayTutorials(tutorials) {
    const container = document.getElementById('tutorialsList');
    container.innerHTML = '';
    
    // Sort by selected option
    const sortBy = document.getElementById('sortTutorials')?.value || 'popular';
    let sortedTutorials = [...tutorials];
    
    switch (sortBy) {
        case 'recent':
            sortedTutorials.sort((a, b) => b.id - a.id); // Assuming higher ID = newer
            break;
        case 'rating':
            sortedTutorials.sort((a, b) => b.rating - a.rating);
            break;
        case 'popular':
        default:
            sortedTutorials.sort((a, b) => b.views - a.views);
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
    
    const categoryIcon = getTutorialCategoryIcon(tutorial.category);
    const difficultyColor = getDifficultyColor(tutorial.difficulty);
    
    item.innerHTML = `
        <div style="display: flex; gap: 20px; padding: 20px;">
            <div class="tutorial-media" style="flex: 0 0 200px;">
                <img src="${tutorial.thumbnail}" alt="${tutorial.title}" 
                     style="width: 100%; height: 150px; object-fit: cover; border-radius: 8px;">
                <div style="margin-top: 10px; text-align: center;">
                    <span class="live-badge" style="background-color: ${getCategoryColor(tutorial.category)}; font-size: 0.7rem;">
                        ${categoryIcon} ${tutorial.category.toUpperCase()}
                    </span>
                </div>
            </div>
            <div class="tutorial-content" style="flex: 1;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                    <div>
                        <h3 style="margin-bottom: 5px;">${tutorial.title}</h3>
                        <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 10px;">
                            <span style="color: var(--text-secondary);">
                                <i class="fas fa-user"></i> ${tutorial.author}
                            </span>
                            <span style="color: var(--text-secondary);">
                                <i class="fas fa-clock"></i> ${tutorial.duration}
                            </span>
                            <span style="color: ${difficultyColor}; font-weight: 500;">
                                ${tutorial.difficulty}
                            </span>
                        </div>
                    </div>
                    <div style="text-align: right;">
                        <div style="color: gold; font-size: 1.1rem;">
                            <i class="fas fa-star"></i> ${tutorial.rating}
                        </div>
                        <div style="font-size: 0.8rem; color: var(--text-secondary);">
                            <i class="fas fa-eye"></i> ${tutorial.views.toLocaleString()} views
                        </div>
                    </div>
                </div>
                
                <p style="margin-bottom: 15px; color: var(--text-secondary);">
                    ${tutorial.description}
                </p>
                
                <div style="display: flex; gap: 10px;">
                    <button class="btn btn-sm btn-primary watch-tutorial-btn">
                        <i class="fas fa-play"></i> ${tutorial.category === 'text' ? 'Read' : 'Watch'}
                    </button>
                    <button class="btn btn-sm btn-secondary download-tutorial-btn">
                        <i class="fas fa-download"></i> Download
                    </button>
                    <button class="btn btn-sm btn-secondary tutorial-info-btn">
                        <i class="fas fa-info-circle"></i> Details
                    </button>
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

function getTutorialCategoryIcon(category) {
    const icons = {
        video: 'fa-video',
        audio: 'fa-music',
        image: 'fa-image',
        text: 'fa-file-alt'
    };
    return icons[category] || 'fa-file';
}

function getCategoryColor(category) {
    const colors = {
        video: '#FF3366',
        audio: '#33CCFF',
        image: '#66CC33',
        text: '#FFCC00'
    };
    return colors[category] || '#999999';
}

function getDifficultyColor(difficulty) {
    const colors = {
        'Beginner': '#28A745',
        'Intermediate': '#FFC107',
        'Advanced': '#DC3545'
    };
    return colors[difficulty] || '#6C757D';
}

function accessTutorial(tutorial) {
    app.simulateProgress(0, 100).then(() => {
        if (tutorial.category === 'text') {
            // Show text content
            showTextTutorial(tutorial);
        } else if (tutorial.category === 'video') {
            // Show video player
            showVideoTutorial(tutorial);
        } else if (tutorial.category === 'audio') {
            // Show audio player
            showAudioTutorial(tutorial);
        } else if (tutorial.category === 'image') {
            // Show image gallery
            showImageTutorial(tutorial);
        }
        
        // Log activity
        if (authSystem.currentUser) {
            authSystem.logActivity('access_tutorial', {
                tutorialId: tutorial.id,
                tutorialTitle: tutorial.title,
                category: tutorial.category
            });
            
            // Update tutorial views
            tutorial.views += 1;
            updateTutorialViews(tutorial.id, tutorial.views);
        }
    });
}

function showTextTutorial(tutorial) {
    const modalHTML = `
        <div class="modal active">
            <div class="modal-content" style="max-width: 800px; max-height: 90vh;">
                <div class="modal-header">
                    <h3>${tutorial.title}</h3>
                    <button class="close-modal" onclick="app.hideModal('textTutorial')">&times;</button>
                </div>
                <div class="modal-body" style="overflow-y: auto;">
                    <div style="margin-bottom: 20px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; 
                                    margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px solid var(--border-color);">
                            <div>
                                <span><i class="fas fa-user"></i> ${tutorial.author}</span>
                                <span style="margin-left: 15px;"><i class="fas fa-clock"></i> ${tutorial.duration}</span>
                            </div>
                            <div>
                                <span style="color: gold;"><i class="fas fa-star"></i> ${tutorial.rating}</span>
                                <span style="margin-left: 15px;">
                                    <i class="fas fa-eye"></i> ${tutorial.views.toLocaleString()}
                                </span>
                            </div>
                        </div>
                        <p style="color: var(--text-secondary); margin-bottom: 20px;">
                            ${tutorial.description}
                        </p>
                    </div>
                    
                    <div class="tutorial-content" style="font-size: 1.1rem; line-height: 1.8;">
                        <h4>Introduction</h4>
                        <p>Welcome to the "${tutorial.title}" tutorial. This guide will walk you through all the fundamental concepts you need to know.</p>
                        
                        <h4>Main Content</h4>
                        <p>${tutorial.content || 'This is where the tutorial content would appear. In a real implementation, this would be loaded from the server or database.'}</p>
                        
                        <h4>Key Points</h4>
                        <ul>
                            <li>Learn the basics step by step</li>
                            <li>Practice with examples</li>
                            <li>Test your knowledge</li>
                            <li>Apply what you've learned</li>
                        </ul>
                        
                        <h4>Conclusion</h4>
                        <p>You've now completed the basic tutorial. Continue practicing to master the skills.</p>
                    </div>
                </div>
                <div class="modal-footer" style="padding: 15px 20px; border-top: 1px solid var(--border-color); 
                                               display: flex; justify-content: space-between;">
                    <button class="btn btn-secondary" onclick="downloadTutorial(${JSON.stringify(tutorial).replace(/"/g, '&quot;')})">
                        <i class="fas fa-download"></i> Download PDF
                    </button>
                    <button class="btn btn-primary" onclick="markAsComplete(${tutorial.id})">
                        <i class="fas fa-check"></i> Mark as Complete
                    </button>
                </div>
            </div>
        </div>
    `;
    
    const modalDiv = document.createElement('div');
    modalDiv.innerHTML = modalHTML;
    modalDiv.id = 'textTutorial';
    document.body.appendChild(modalDiv);
}

function showVideoTutorial(tutorial) {
    // Similar to movie player but for tutorials
    const playerHTML = `
        <div class="modal active" style="z-index: 1003;">
            <div class="modal-content" style="max-width: 1000px; width: 95%; height: 80vh;">
                <div class="modal-header">
                    <h3>${tutorial.title}</h3>
                    <button class="close-modal" onclick="app.hideModal('videoTutorial')">&times;</button>
                </div>
                <div class="modal-body" style="padding: 0; height: calc(100% - 60px);">
                    <div style="width: 100%; height: 100%; background-color: #000; 
                                display: flex; flex-direction: column;">
                        <div style="flex: 1; display: flex; align-items: center; justify-content: center; color: white;">
                            <div style="text-align: center;">
                                <i class="fas fa-play-circle" style="font-size: 4rem; margin-bottom: 20px;"></i>
                                <p>Video Tutorial: ${tutorial.title}</p>
                                <p style="font-size: 0.9rem; color: #ccc;">
                                    ${tutorial.duration} • By ${tutorial.author} • Rating: ${tutorial.rating}
                                </p>
                            </div>
                        </div>
                        <div class="player-controls" style="background-color: rgba(0,0,0,0.8); 
                                                           padding: 10px 20px; color: white;">
                            <!-- Player controls would go here -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    const playerDiv = document.createElement('div');
    playerDiv.innerHTML = playerHTML;
    playerDiv.id = 'videoTutorial';
    document.body.appendChild(playerDiv);
}

function showAudioTutorial(tutorial) {
    const playerHTML = `
        <div class="modal active">
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h3>${tutorial.title}</h3>
                    <button class="close-modal" onclick="app.hideModal('audioTutorial')">&times;</button>
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
                        <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">
                            <button class="btn btn-primary" style="width: 50px; height: 50px; border-radius: 50%;">
                                <i class="fas fa-play"></i>
                            </button>
                            <div style="flex: 1;">
                                <div style="height: 4px; background-color: var(--border-color); border-radius: 2px;">
                                    <div style="width: 30%; height: 100%; background-color: var(--primary-color); 
                                                border-radius: 2px;"></div>
                                </div>
                                <div style="display: flex; justify-content: space-between; font-size: 0.8rem; 
                                            color: var(--text-secondary); margin-top: 5px;">
                                    <span>0:00</span>
                                    <span>${tutorial.duration}</span>
                                </div>
                            </div>
                        </div>
                        <div style="display: flex; justify-content: center; gap: 20px;">
                            <button class="control-btn">
                                <i class="fas fa-step-backward"></i>
                            </button>
                            <button class="control-btn">
                                <i class="fas fa-volume-up"></i>
                            </button>
                            <button class="control-btn">
                                <i class="fas fa-step-forward"></i>
                            </button>
                        </div>
                    </div>
                    
                    <div class="tutorial-info">
                        <p><strong>Description:</strong> ${tutorial.description}</p>
                        <p><strong>Difficulty:</strong> ${tutorial.difficulty}</p>
                        <p><strong>Rating:</strong> ${tutorial.rating}/5</p>
                        <p><strong>Views:</strong> ${tutorial.views.toLocaleString()}</p>
                    </div>
                </div>
                <div class="modal-footer" style="padding: 15px 20px; border-top: 1px solid var(--border-color); 
                                               display: flex; justify-content: space-between;">
                    <button class="btn btn-secondary" onclick="downloadTutorial(${JSON.stringify(tutorial).replace(/"/g, '&quot;')})">
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
    playerDiv.id = 'audioTutorial';
    document.body.appendChild(playerDiv);
}

function showImageTutorial(tutorial) {
    // Image gallery view
    const galleryHTML = `
        <div class="modal active">
            <div class="modal-content" style="max-width: 1000px; max-height: 90vh;">
                <div class="modal-header">
                    <h3>${tutorial.title}</h3>
                    <button class="close-modal" onclick="app.hideModal('imageTutorial')">&times;</button>
                </div>
                <div class="modal-body" style="overflow-y: auto;">
                    <div style="text-align: center; margin-bottom: 20px;">
                        <img src="${tutorial.thumbnail}" alt="${tutorial.title}" 
                             style="max-width: 100%; max-height: 400px; object-fit: contain; border-radius: 8px;">
                        <p style="margin-top: 15px; color: var(--text-secondary);">
                            ${tutorial.description}
                        </p>
                    </div>
                    
                    <div class="image-gallery">
                        <h4>Gallery (${tutorial.duration})</h4>
                        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 15px;">
                            ${Array.from({length: 6}, (_, i) => `
                                <img src="https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                                     alt="Tutorial Image ${i + 1}" 
                                     style="width: 100%; height: 150px; object-fit: cover; border-radius: 8px; cursor: pointer;"
                                     onclick="viewImage(${i + 1})">
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="tutorial-details" style="margin-top: 20px;">
                        <p><strong>Author:</strong> ${tutorial.author}</p>
                        <p><strong>Difficulty:</strong> ${tutorial.difficulty}</p>
                        <p><strong>Rating:</strong> ${tutorial.rating}/5</p>
                        <p><strong>Views:</strong> ${tutorial.views.toLocaleString()}</p>
                    </div>
                </div>
                <div class="modal-footer" style="padding: 15px 20px; border-top: 1px solid var(--border-color); 
                                               display: flex; justify-content: space-between;">
                    <button class="btn btn-secondary" onclick="downloadTutorial(${JSON.stringify(tutorial).replace(/"/g, '&quot;')})">
                        <i class="fas fa-download"></i> Download Images
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
    galleryDiv.id = 'imageTutorial';
    document.body.appendChild(galleryDiv);
}

function downloadTutorial(tutorial) {
    app.simulateProgress(0, 100).then(() => {
        const fileType = tutorial.category === 'text' ? 'PDF' : 
                        tutorial.category === 'audio' ? 'MP3' : 
                        tutorial.category === 'video' ? 'MP4' : 'ZIP';
        
        app.showNotification(`Downloading: ${tutorial.title}.${fileType.toLowerCase()}`, 'info');
        
        // Log activity
        if (authSystem.currentUser) {
            authSystem.logActivity('download_tutorial', {
                tutorialId: tutorial.id,
                tutorialTitle: tutorial.title,
                category: tutorial.category,
                fileType: fileType
            });
        }
        
        // Simulate download
        simulateTutorialDownload(tutorial.title, fileType);
    });
}

function simulateTutorialDownload(title, fileType) {
    let progress = 0;
    const interval = setInterval(() => {
        progress += 5;
        app.updateProgressBar(progress);
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                app.showNotification(`Download complete: ${title}.${fileType.toLowerCase()}`, 'success');
                app.updateProgressBar(0);
            }, 500);
        }
    }, 200);
}

function showTutorialInfo(tutorial) {
    const infoHTML = `
        <div class="modal active">
            <div class="modal-content" style="max-width: 500px;">
                <div class="modal-header">
                    <h3>${tutorial.title} - Details</h3>
                    <button class="close-modal" onclick="app.hideModal('tutorialInfo')">&times;</button>
                </div>
                <div class="modal-body">
                    <div style="margin-bottom: 20px;">
                        <img src="${tutorial.thumbnail}" alt="${tutorial.title}" 
                             style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 15px;">
                        
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 15px;">
                            <div>
                                <strong>Category:</strong><br>
                                <span style="color: ${getCategoryColor(tutorial.category)};">
                                    <i class="fas ${getTutorialCategoryIcon(tutorial.category)}"></i>
                                    ${tutorial.category.toUpperCase()}
                                </span>
                            </div>
                            <div>
                                <strong>Duration:</strong><br>
                                ${tutorial.duration}
                            </div>
                            <div>
                                <strong>Author:</strong><br>
                                ${tutorial.author}
                            </div>
                            <div>
                                <strong>Difficulty:</strong><br>
                                <span style="color: ${getDifficultyColor(tutorial.difficulty)};">
                                    ${tutorial.difficulty}
                                </span>
                            </div>
                            <div>
                                <strong>Rating:</strong><br>
                                <span style="color: gold;">
                                    <i class="fas fa-star"></i> ${tutorial.rating}
                                </span>
                            </div>
                            <div>
                                <strong>Views:</strong><br>
                                ${tutorial.views.toLocaleString()}
                            </div>
                        </div>
                        
                        <div>
                            <strong>Description:</strong>
                            <p style="color: var(--text-secondary); margin-top: 5px;">
                                ${tutorial.description}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="modal-footer" style="padding: 15px 20px; border-top: 1px solid var(--border-color); 
                                               display: flex; gap: 10px;">
                    <button class="btn btn-primary" style="flex: 1;" 
                            onclick="accessTutorial(${JSON.stringify(tutorial).replace(/"/g, '&quot;')}); app.hideModal('tutorialInfo')">
                        <i class="fas fa-play"></i> ${tutorial.category === 'text' ? 'Read' : 'Access'}
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
        const totalViews = tutorialsData.reduce((sum, tutorial) => sum + tutorial.views, 0);
        const avgRating = (tutorialsData.reduce((sum, tutorial) => sum + tutorial.rating, 0) / totalTutorials).toFixed(1);
        
        // Simulate completion rate
        const completionRate = Math.floor(Math.random() * 30) + 60; // 60-90%
        
        document.getElementById('totalTutorials').textContent = totalTutorials;
        document.getElementById('completionRate').textContent = `${completionRate}%`;
        document.getElementById('avgTutorialRating').textContent = avgRating;
        
    } catch (error) {
        console.error('Error updating tutorial stats:', error);
    }
}

function setupTutorialsControls() {
    // Category filter buttons
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
    
    // Sort select
    const sortSelect = document.getElementById('sortTutorials');
    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            displayTutorials(currentCategory === 'all' ? tutorialsData : 
                tutorialsData.filter(t => t.category === currentCategory));
        });
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

function viewImage(imageNumber) {
    // In a real implementation, this would show the image in full screen
    alert(`Viewing image ${imageNumber} in full screen`);
}

// Make functions available globally
window.initTutorialsPage = initTutorialsPage;
window.accessTutorial = accessTutorial;
window.downloadTutorial = downloadTutorial;
window.markAsComplete = markAsComplete;
window.viewImage = viewImage;