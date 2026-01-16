// Movies Dashboard
let moviesData = [];
let currentFilter = 'all';

function initMoviesPage() {
    console.log('Initializing movies page...');
    loadMovies();
    setupMoviesControls();
    updateMovieStats();
    
    // Load movie trailers
    loadMovieTrailers();
}

async function loadMovies() {
    try {
        // Simulated movies data
        moviesData = [
            {
                id: 1,
                title: "Action Thriller",
                year: 2023,
                rating: 8.5,
                category: "action",
                duration: "2h 15m",
                views: 12500,
                downloads: 4500,
                description: "An intense action thriller with amazing stunts.",
                thumbnail: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                videoUrl: "https://movies.example.com/action-thriller.mp4",
                trailerUrl: "https://movies.example.com/action-thriller-trailer.mp4"
            },
            {
                id: 2,
                title: "Romantic Comedy",
                year: 2022,
                rating: 7.2,
                category: "comedy",
                duration: "1h 45m",
                views: 9800,
                downloads: 3200,
                description: "A heartwarming romantic comedy story.",
                thumbnail: "https://images.unsplash.com/photo-1533616688419-b7a585564f70?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                videoUrl: "https://movies.example.com/romantic-comedy.mp4",
                trailerUrl: "https://movies.example.com/romantic-comedy-trailer.mp4"
            },
            {
                id: 3,
                title: "Sci-Fi Adventure",
                year: 2023,
                rating: 8.9,
                category: "action",
                duration: "2h 30m",
                views: 18500,
                downloads: 6200,
                description: "Epic sci-fi adventure across galaxies.",
                thumbnail: "https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                videoUrl: "https://movies.example.com/sci-fi-adventure.mp4",
                trailerUrl: "https://movies.example.com/sci-fi-adventure-trailer.mp4"
            },
            {
                id: 4,
                title: "Drama Series",
                year: 2021,
                rating: 8.7,
                category: "drama",
                duration: "1h 55m",
                views: 15200,
                downloads: 5100,
                description: "Emotional drama series with powerful performances.",
                thumbnail: "https://images.unsplash.com/photo-1489599809516-9827b6d1cf13?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                videoUrl: "https://movies.example.com/drama-series.mp4",
                trailerUrl: "https://movies.example.com/drama-series-trailer.mp4"
            },
            {
                id: 5,
                title: "Horror Special",
                year: 2022,
                rating: 6.8,
                category: "action",
                duration: "1h 50m",
                views: 11200,
                downloads: 3800,
                description: "Chilling horror experience.",
                thumbnail: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                videoUrl: "https://movies.example.com/horror-special.mp4",
                trailerUrl: "https://movies.example.com/horror-special-trailer.mp4"
            },
            {
                id: 6,
                title: "Upcoming Blockbuster Trailer",
                year: 2024,
                rating: 9.1,
                category: "trailers",
                duration: "3m 45s",
                views: 24500,
                downloads: 8900,
                description: "Exclusive trailer for upcoming blockbuster movie.",
                thumbnail: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                videoUrl: "https://movies.example.com/upcoming-trailer.mp4",
                trailerUrl: "https://movies.example.com/upcoming-trailer.mp4"
            }
        ];
        
        displayMovies(moviesData);
        
    } catch (error) {
        console.error('Error loading movies:', error);
        document.getElementById('moviesGrid').innerHTML = `
            <div class="error-message">
                <p>Unable to load movies. Please try again later.</p>
                <button class="btn btn-primary" onclick="loadMovies()">
                    <i class="fas fa-redo"></i> Retry
                </button>
            </div>
        `;
    }
}

async function loadMovieTrailers() {
    try {
        // Simulated API call to movieapi.giftedtech.co.ke
        const apiUrl = 'https://movieapi.giftedtech.co.ke/api/movies/latest';
        console.log('Fetching movie trailers from:', apiUrl);
        
        // In a real implementation, you would use:
        // const response = await fetch(apiUrl);
        // const trailers = await response.json();
        
        // For now, simulate with local data
        setTimeout(() => {
            const trailers = [
                {
                    id: 101,
                    title: "Summer Blockbuster 2024",
                    category: "trailers",
                    duration: "2m 30s",
                    views: 15000
                },
                {
                    id: 102,
                    title: "Action Sequel Teaser",
                    category: "trailers",
                    duration: "1m 45s",
                    views: 12000
                }
            ];
            
            console.log('Trailers loaded:', trailers);
            // You can display these trailers in a separate section
            
        }, 1000);
        
    } catch (error) {
        console.error('Error loading movie trailers:', error);
    }
}

function displayMovies(movies) {
    const container = document.getElementById('moviesGrid');
    container.innerHTML = '';
    
    // Sort by views (most popular first)
    const sortedMovies = [...movies].sort((a, b) => b.views - a.views);
    
    sortedMovies.forEach(movie => {
        const card = createMovieCard(movie);
        container.appendChild(card);
    });
}

function createMovieCard(movie) {
    const card = document.createElement('div');
    card.className = 'card movie-card';
    card.setAttribute('data-id', movie.id);
    card.setAttribute('data-category', movie.category);
    
    const isTrailer = movie.category === 'trailers';
    const badge = isTrailer ? '<span class="live-badge" style="background-color: var(--warning-color);">Trailer</span>' : '';
    
    card.innerHTML = `
        <div class="card-header" style="padding: 0; position: relative;">
            <img src="${movie.thumbnail}" alt="${movie.title}" 
                 style="width: 100%; height: 200px; object-fit: cover;">
            ${badge}
            <div style="position: absolute; top: 10px; right: 10px; background-color: rgba(0,0,0,0.7); 
                        color: white; padding: 2px 8px; border-radius: 4px; font-size: 0.8rem;">
                <i class="fas fa-star" style="color: gold;"></i> ${movie.rating}
            </div>
        </div>
        <div class="card-body" style="padding: 15px;">
            <h4 style="margin-bottom: 5px; font-size: 1rem;">${movie.title}</h4>
            <div style="display: flex; justify-content: space-between; align-items: center; 
                        font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 8px;">
                <span>${movie.year}</span>
                <span>${movie.duration}</span>
            </div>
            <div style="font-size: 0.8rem; color: var(--text-secondary);">
                <div style="display: flex; justify-content: space-between;">
                    <span><i class="fas fa-eye"></i> ${movie.views.toLocaleString()}</span>
                    <span><i class="fas fa-download"></i> ${movie.downloads.toLocaleString()}</span>
                </div>
            </div>
        </div>
        <div class="card-footer" style="padding: 10px 15px; display: flex; gap: 8px;">
            <button class="btn btn-sm btn-primary watch-btn" style="flex: 1;">
                <i class="fas fa-play"></i> ${isTrailer ? 'Watch Trailer' : 'Watch'}
            </button>
            <button class="btn btn-sm btn-secondary download-btn" style="flex: 1;">
                <i class="fas fa-download"></i> Download
            </button>
            <button class="btn btn-sm btn-secondary info-btn">
                <i class="fas fa-info"></i>
            </button>
        </div>
    `;
    
    // Add event listeners
    const watchBtn = card.querySelector('.watch-btn');
    const downloadBtn = card.querySelector('.download-btn');
    const infoBtn = card.querySelector('.info-btn');
    
    watchBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        watchMovie(movie);
    });
    
    downloadBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        downloadMovie(movie);
    });
    
    infoBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showMovieInfo(movie);
    });
    
    // Click on card
    card.addEventListener('click', (e) => {
        if (!e.target.closest('button')) {
            watchMovie(movie);
        }
    });
    
    return card;
}

function watchMovie(movie) {
    app.simulateProgress(0, 100).then(() => {
        const isTrailer = movie.category === 'trailers';
        const playerHTML = `
            <div class="modal active" style="z-index: 1003;">
                <div class="modal-content" style="max-width: 1000px; width: 95%; height: 80vh;">
                    <div class="modal-header">
                        <h3>${movie.title} ${isTrailer ? '- Trailer' : ''}</h3>
                        <button class="close-modal" onclick="closeMoviePlayer()">&times;</button>
                    </div>
                    <div class="modal-body" style="padding: 0; height: calc(100% - 60px);">
                        <div class="movie-player-container" style="width: 100%; height: 100%;">
                            <div style="width: 100%; height: 100%; background-color: #000; 
                                        display: flex; flex-direction: column;">
                                <div style="flex: 1; display: flex; align-items: center; justify-content: center; color: white;">
                                    <div style="text-align: center;">
                                        <i class="fas fa-play-circle" style="font-size: 4rem; margin-bottom: 20px;"></i>
                                        <p>${isTrailer ? 'Trailer:' : 'Movie:'} ${movie.title}</p>
                                        <p style="font-size: 0.9rem; color: #ccc;">
                                            ${movie.year} • ${movie.duration} • Rating: ${movie.rating}/10
                                        </p>
                                        <p style="font-size: 0.9rem; color: #ccc; margin-top: 10px;">
                                            ${movie.views.toLocaleString()} views
                                        </p>
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
                                            <span style="margin-left: 20px;">0:00 / ${movie.duration}</span>
                                        </div>
                                        <div style="display: flex; align-items: center; gap: 20px;">
                                            <button class="btn btn-sm btn-primary">
                                                <i class="fas fa-download"></i> Download
                                            </button>
                                            <select style="background-color: #333; color: white; border: none; padding: 5px;">
                                                <option>1080p</option>
                                                <option>720p</option>
                                                <option>480p</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div style="margin-top: 10px; height: 4px; background-color: #444; border-radius: 2px;">
                                        <div style="width: 0%; height: 100%; background-color: var(--primary-color); 
                                                    border-radius: 2px;" class="progress-bar-fill"></div>
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
            authSystem.logActivity(isTrailer ? 'watch_trailer' : 'watch_movie', {
                movieId: movie.id,
                movieTitle: movie.title,
                category: movie.category
            });
            
            // Update movie views
            movie.views += 1;
            updateMovieViews(movie.id, movie.views);
        }
        
        // Simulate progress bar
        simulateProgressBar();
    });
}

function simulateProgressBar() {
    setTimeout(() => {
        const progressBar = document.querySelector('.progress-bar-fill');
        if (progressBar) {
            let progress = 0;
            const interval = setInterval(() => {
                progress += 1;
                progressBar.style.width = `${progress}%`;
                
                if (progress >= 100) {
                    clearInterval(interval);
                }
            }, 100);
        }
    }, 1000);
}

function downloadMovie(movie) {
    app.simulateProgress(0, 100).then(() => {
        const quality = app.settings.downloadQuality || 'high';
        app.showNotification(`Downloading: ${movie.title} (${quality} quality)`, 'info');
        
        // Log activity
        if (authSystem.currentUser) {
            authSystem.logActivity('download_movie', {
                movieId: movie.id,
                movieTitle: movie.title,
                quality: quality
            });
            
            // Update movie downloads
            movie.downloads += 1;
            updateMovieDownloads(movie.id, movie.downloads);
        }
        
        // Simulate download progress
        simulateDownloadProgress(movie.title);
    });
}

function simulateDownloadProgress(title) {
    let progress = 0;
    const interval = setInterval(() => {
        progress += 5;
        app.updateProgressBar(progress);
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                app.showNotification(`Download complete: ${title}`, 'success');
                app.updateProgressBar(0);
            }, 500);
        }
    }, 200);
}

function showMovieInfo(movie) {
    const infoHTML = `
        <div class="modal active">
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h3>${movie.title}</h3>
                    <button class="close-modal" onclick="app.hideModal('movieInfo')">&times;</button>
                </div>
                <div class="modal-body">
                    <div style="display: flex; gap: 20px; margin-bottom: 20px;">
                        <img src="${movie.thumbnail}" alt="${movie.title}" 
                             style="width: 200px; height: 300px; object-fit: cover; border-radius: 8px;">
                        <div style="flex: 1;">
                            <p><strong>Year:</strong> ${movie.year}</p>
                            <p><strong>Duration:</strong> ${movie.duration}</p>
                            <p><strong>Category:</strong> ${movie.category}</p>
                            <p><strong>Rating:</strong> ${movie.rating}/10</p>
                            <p><strong>Views:</strong> ${movie.views.toLocaleString()}</p>
                            <p><strong>Downloads:</strong> ${movie.downloads.toLocaleString()}</p>
                        </div>
                    </div>
                    <div class="movie-description">
                        <h4>Description</h4>
                        <p>${movie.description}</p>
                    </div>
                    <div class="movie-actions mt-3" style="display: flex; gap: 10px;">
                        <button class="btn btn-primary" onclick="watchMovie(${JSON.stringify(movie).replace(/"/g, '&quot;')})">
                            <i class="fas fa-play"></i> ${movie.category === 'trailers' ? 'Watch Trailer' : 'Watch Movie'}
                        </button>
                        <button class="btn btn-secondary" onclick="downloadMovie(${JSON.stringify(movie).replace(/"/g, '&quot;')})">
                            <i class="fas fa-download"></i> Download
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    const infoDiv = document.createElement('div');
    infoDiv.innerHTML = infoHTML;
    infoDiv.id = 'movieInfo';
    document.body.appendChild(infoDiv);
}

function closeMoviePlayer() {
    const player = document.querySelector('.modal[style*="z-index: 1003"]');
    if (player) {
        player.remove();
    }
}

function updateMovieViews(movieId, views) {
    const movieCard = document.querySelector(`.movie-card[data-id="${movieId}"]`);
    if (movieCard) {
        const viewElement = movieCard.querySelector('[style*="fa-eye"]');
        if (viewElement) {
            viewElement.innerHTML = `<i class="fas fa-eye"></i> ${views.toLocaleString()}`;
        }
    }
    updateMovieStats();
}

function updateMovieDownloads(movieId, downloads) {
    const movieCard = document.querySelector(`.movie-card[data-id="${movieId}"]`);
    if (movieCard) {
        const downloadElement = movieCard.querySelector('[style*="fa-download"]');
        if (downloadElement) {
            downloadElement.innerHTML = `<i class="fas fa-download"></i> ${downloads.toLocaleString()}`;
        }
    }
    updateMovieStats();
}

function updateMovieStats() {
    try {
        const totalMovies = moviesData.length;
        const totalViews = moviesData.reduce((sum, movie) => sum + movie.views, 0);
        const avgRating = (moviesData.reduce((sum, movie) => sum + movie.rating, 0) / totalMovies).toFixed(1);
        const totalDownloads = moviesData.reduce((sum, movie) => sum + movie.downloads, 0);
        const newMovies = moviesData.filter(movie => movie.year >= 2023).length;
        
        document.getElementById('totalMovies').textContent = totalMovies;
        document.getElementById('avgRating').textContent = avgRating;
        document.getElementById('totalViewsToday').textContent = Math.floor(totalViews / 100).toLocaleString();
        document.getElementById('newMovies').textContent = newMovies;
        
    } catch (error) {
        console.error('Error updating movie stats:', error);
    }
}

function setupMoviesControls() {
    // Filter buttons
    document.querySelectorAll('.movies-filter .btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const filter = e.target.getAttribute('data-filter');
            currentFilter = filter;
            filterMovies(filter);
            
            // Update active button
            document.querySelectorAll('.movies-filter .btn').forEach(b => {
                b.classList.remove('active', 'btn-primary');
                b.classList.add('btn-secondary');
            });
            e.target.classList.add('active', 'btn-primary');
            e.target.classList.remove('btn-secondary');
        });
    });
    
    // Search functionality
    const searchBtn = document.getElementById('searchMovieBtn');
    const searchInput = document.getElementById('movieSearch');
    
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', () => {
            searchMovies(searchInput.value.trim());
        });
        
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchMovies(searchInput.value.trim());
            }
        });
    }
}

function filterMovies(filter) {
    if (filter === 'all') {
        displayMovies(moviesData);
    } else {
        const filteredMovies = moviesData.filter(movie => movie.category === filter);
        displayMovies(filteredMovies);
    }
}

function searchMovies(query) {
    if (!query) {
        displayMovies(moviesData);
        return;
    }
    
    const searchTerm = query.toLowerCase();
    const filteredMovies = moviesData.filter(movie => 
        movie.title.toLowerCase().includes(searchTerm) ||
        movie.description.toLowerCase().includes(searchTerm) ||
        movie.category.toLowerCase().includes(searchTerm)
    );
    
    if (filteredMovies.length === 0) {
        document.getElementById('moviesGrid').innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px;">
                <i class="fas fa-search" style="font-size: 3rem; color: var(--text-secondary); margin-bottom: 20px;"></i>
                <h3>No movies found</h3>
                <p>No movies match your search: "${query}"</p>
                <button class="btn btn-primary" onclick="displayMovies(moviesData)">
                    Show All Movies
                </button>
            </div>
        `;
    } else {
        displayMovies(filteredMovies);
    }
}

// Make functions available globally
window.initMoviesPage = initMoviesPage;
window.closeMoviePlayer = closeMoviePlayer;
window.watchMovie = watchMovie;
window.downloadMovie = downloadMovie;