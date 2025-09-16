// CryptoVerse NFT Marketplace - Production JavaScript

// Sample NFT Data
const sampleNFTs = [
    {
        id: 1,
        title: "Neon Dreams #001",
        creator: "DigitalVision",
        creatorAvatar: "https://i.pravatar.cc/100?img=1",
        price: "2.5 ETH",
        priceUSD: "$4,200",
        category: "art",
        image: "https://picsum.photos/400/400?random=1",
        rarity: "Rare",
        description: "A stunning digital artwork featuring neon colors and futuristic themes",
        likes: 234,
        views: 1520
    },
    {
        id: 2,
        title: "Cyber Punk Hero",
        creator: "PixelMaster",
        creatorAvatar: "https://i.pravatar.cc/100?img=2",
        price: "1.8 ETH",
        priceUSD: "$3,024",
        category: "gaming",
        image: "https://picsum.photos/400/400?random=2",
        rarity: "Epic",
        description: "Legendary character from the cyber world with unique abilities",
        likes: 189,
        views: 2150
    },
    {
        id: 3,
        title: "Abstract Waves",
        creator: "ArtFlow",
        creatorAvatar: "https://i.pravatar.cc/100?img=3",
        price: "0.9 ETH",
        priceUSD: "$1,512",
        category: "art",
        image: "https://picsum.photos/400/400?random=3",
        rarity: "Common",
        description: "Beautiful abstract composition with flowing wave patterns",
        likes: 98,
        views: 856
    },
    {
        id: 4,
        title: "Beat Drop #47",
        creator: "SoundWave",
        creatorAvatar: "https://i.pravatar.cc/100?img=4",
        price: "3.2 ETH",
        priceUSD: "$5,376",
        category: "music",
        image: "https://picsum.photos/400/400?random=4",
        rarity: "Legendary",
        description: "Exclusive music NFT with rare audio frequencies",
        likes: 445,
        views: 3200
    },
    {
        id: 5,
        title: "Virtual Villa",
        creator: "MetaBuilder",
        creatorAvatar: "https://i.pravatar.cc/100?img=5",
        price: "5.7 ETH",
        priceUSD: "$9,576",
        category: "virtual-real-estate",
        image: "https://picsum.photos/400/400?random=5",
        rarity: "Ultra Rare",
        description: "Luxury virtual property in prime metaverse location",
        likes: 678,
        views: 4500
    },
    {
        id: 6,
        title: "Championship Ring",
        creator: "SportsFan",
        creatorAvatar: "https://i.pravatar.cc/100?img=6",
        price: "4.1 ETH",
        priceUSD: "$6,888",
        category: "sports",
        image: "https://picsum.photos/400/400?random=6",
        rarity: "Epic",
        description: "Commemorative NFT of the 2024 championship victory",
        likes: 321,
        views: 2890
    },
    {
        id: 7,
        title: "Digital Landscape",
        creator: "NatureArt",
        creatorAvatar: "https://i.pravatar.cc/100?img=7",
        price: "1.2 ETH",
        priceUSD: "$2,016",
        category: "art",
        image: "https://picsum.photos/400/400?random=7",
        rarity: "Rare",
        description: "Breathtaking digital landscape with vibrant colors",
        likes: 156,
        views: 1234
    },
    {
        id: 8,
        title: "Gaming Avatar #12",
        creator: "GameForge",
        creatorAvatar: "https://i.pravatar.cc/100?img=8",
        price: "2.8 ETH",
        priceUSD: "$4,704",
        category: "gaming",
        image: "https://picsum.photos/400/400?random=8",
        rarity: "Epic",
        description: "Unique gaming character with special abilities",
        likes: 267,
        views: 1876
    }
];

// Top Creators Data
const topCreators = [
    {
        id: 1,
        name: "DigitalVision",
        avatar: "https://i.pravatar.cc/100?img=1",
        totalSales: "127.8 ETH",
        itemsCount: 45,
        verified: true
    },
    {
        id: 2,
        name: "PixelMaster",
        avatar: "https://i.pravatar.cc/100?img=2",
        totalSales: "98.3 ETH",
        itemsCount: 32,
        verified: true
    },
    {
        id: 3,
        name: "ArtFlow",
        avatar: "https://i.pravatar.cc/100?img=3",
        totalSales: "86.1 ETH",
        itemsCount: 28,
        verified: false
    },
    {
        id: 4,
        name: "SoundWave",
        avatar: "https://i.pravatar.cc/100?img=4",
        totalSales: "75.9 ETH",
        itemsCount: 22,
        verified: true
    },
    {
        id: 5,
        name: "MetaBuilder",
        avatar: "https://i.pravatar.cc/100?img=5",
        totalSales: "92.4 ETH",
        itemsCount: 18,
        verified: true
    },
    {
        id: 6,
        name: "SportsFan",
        avatar: "https://i.pravatar.cc/100?img=6",
        totalSales: "64.7 ETH",
        itemsCount: 35,
        verified: false
    }
];

// Global Variables
let currentFilter = 'all';
let currentSort = 'recent';
let isWalletConnected = false;
let currentAccount = '';
let displayedNFTs = 6;
let searchQuery = '';

// DOM Elements
const elements = {
    loadingScreen: document.getElementById('loading-screen'),
    navbar: document.getElementById('navbar'),
    navToggle: document.getElementById('nav-toggle'),
    navMenu: document.getElementById('nav-menu'),
    connectWallet: document.getElementById('connect-wallet'),
    searchInput: document.getElementById('search-input'),
    nftGrid: document.getElementById('nft-grid'),
    creatorsGrid: document.getElementById('creators-grid'),
    marketplaceGrid: document.getElementById('marketplace-grid'),
    loadMoreBtn: document.getElementById('load-more'),
    createNftBtn: document.getElementById('create-nft-btn'),
    createForm: document.getElementById('create-form'),
    nftForm: document.getElementById('nft-form'),
    nftModal: document.getElementById('nft-modal'),
    walletModal: document.getElementById('wallet-modal'),
    notification: document.getElementById('notification')
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // Hide loading screen
    setTimeout(() => {
        if (elements.loadingScreen) {
            elements.loadingScreen.style.opacity = '0';
            setTimeout(() => {
                elements.loadingScreen.style.display = 'none';
            }, 500);
        }
    }, 1500);

    // Initialize components
    setupEventListeners();
    renderFeaturedNFTs();
    renderTopCreators();
    renderMarketplaceNFTs();
    animateCounters();
    setupScrollEffects();
    
    // Check for saved wallet connection
    checkSavedWalletConnection();
}

// Event Listeners
function setupEventListeners() {
    // Navigation
    if (elements.navToggle) {
        elements.navToggle.addEventListener('click', toggleMobileMenu);
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
            
            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Close mobile menu if open
            if (elements.navMenu) {
                elements.navMenu.classList.remove('active');
            }
        });
    });

    // Wallet connection
    if (elements.connectWallet) {
        elements.connectWallet.addEventListener('click', handleWalletConnection);
    }

    // Search functionality
    if (elements.searchInput) {
        elements.searchInput.addEventListener('input', handleSearch);
        elements.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
    }

    // Category filters
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const category = e.target.getAttribute('data-category');
            setActiveFilter(e.target, category);
            filterNFTs(category);
        });
    });

    // Sorting and filtering
    const sortFilter = document.getElementById('sort-filter');
    if (sortFilter) {
        sortFilter.addEventListener('change', (e) => {
            currentSort = e.target.value;
            renderMarketplaceNFTs();
        });
    }

    const categoryFilter = document.getElementById('category-filter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', (e) => {
            currentFilter = e.target.value;
            renderMarketplaceNFTs();
        });
    }

    // Load more NFTs
    if (elements.loadMoreBtn) {
        elements.loadMoreBtn.addEventListener('click', loadMoreNFTs);
    }

    // Create NFT
    if (elements.createNftBtn) {
        elements.createNftBtn.addEventListener('click', showCreateForm);
    }

    if (elements.nftForm) {
        elements.nftForm.addEventListener('submit', handleNFTCreation);
    }

    // File upload
    const nftFileInput = document.getElementById('nft-file');
    if (nftFileInput) {
        nftFileInput.addEventListener('change', handleFileUpload);
    }

    // Modal close events
    document.querySelectorAll('.modal-close').forEach(closeBtn => {
        closeBtn.addEventListener('click', closeModals);
    });

    // Wallet modal options
    document.querySelectorAll('.wallet-option').forEach(option => {
        option.addEventListener('click', (e) => {
            const wallet = e.currentTarget.getAttribute('data-wallet');
            connectSpecificWallet(wallet);
        });
    });

    // Close modals on outside click
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModals();
        }
    });

    // Notification close
    const notificationClose = document.querySelector('.notification-close');
    if (notificationClose) {
        notificationClose.addEventListener('click', hideNotification);
    }
}

// Navigation Functions
function toggleMobileMenu() {
    if (elements.navMenu) {
        elements.navMenu.classList.toggle('active');
    }
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Wallet Connection Functions
function handleWalletConnection() {
    if (isWalletConnected) {
        disconnectWallet();
    } else {
        showWalletModal();
    }
}

function showWalletModal() {
    if (elements.walletModal) {
        elements.walletModal.style.display = 'block';
    }
}

function connectSpecificWallet(walletType) {
    closeModals();
    
    // Simulate wallet connection
    setTimeout(() => {
        const mockAddress = generateMockAddress();
        connectWallet(mockAddress, walletType);
        showNotification(`${walletType.charAt(0).toUpperCase() + walletType.slice(1)} connected successfully!`, 'success');
    }, 1000);
}

function generateMockAddress() {
    const chars = '0123456789abcdef';
    let address = '0x';
    for (let i = 0; i < 40; i++) {
        address += chars[Math.floor(Math.random() * chars.length)];
    }
    return address;
}

function connectWallet(address, walletType) {
    isWalletConnected = true;
    currentAccount = address;
    
    // Update UI
    if (elements.connectWallet) {
        elements.connectWallet.innerHTML = `
            <i class="fas fa-wallet"></i>
            <span class="wallet-text">${address.substring(0, 6)}...${address.substring(-4)}</span>
        `;
        elements.connectWallet.classList.add('connected');
    }
    
    // Save to localStorage
    localStorage.setItem('walletConnected', 'true');
    localStorage.setItem('walletAddress', address);
    localStorage.setItem('walletType', walletType);
}

function disconnectWallet() {
    isWalletConnected = false;
    currentAccount = '';
    
    // Update UI
    if (elements.connectWallet) {
        elements.connectWallet.innerHTML = `
            <i class="fas fa-wallet"></i>
            <span class="wallet-text">Connect Wallet</span>
        `;
        elements.connectWallet.classList.remove('connected');
    }
    
    // Clear localStorage
    localStorage.removeItem('walletConnected');
    localStorage.removeItem('walletAddress');
    localStorage.removeItem('walletType');
    
    showNotification('Wallet disconnected', 'success');
}

function checkSavedWalletConnection() {
    const savedConnection = localStorage.getItem('walletConnected');
    const savedAddress = localStorage.getItem('walletAddress');
    const savedWalletType = localStorage.getItem('walletType');
    
    if (savedConnection === 'true' && savedAddress) {
        connectWallet(savedAddress, savedWalletType || 'metamask');
    }
}

// NFT Rendering Functions
function renderFeaturedNFTs() {
    if (!elements.nftGrid) return;
    
    const featuredNFTs = sampleNFTs.slice(0, 6);
    elements.nftGrid.innerHTML = featuredNFTs.map(nft => createNFTCard(nft)).join('');
    
    // Add click events to NFT cards
    document.querySelectorAll('.nft-card').forEach(card => {
        card.addEventListener('click', (e) => {
            const nftId = parseInt(e.currentTarget.getAttribute('data-nft-id'));
            showNFTModal(nftId);
        });
    });
}

function renderTopCreators() {
    if (!elements.creatorsGrid) return;
    
    elements.creatorsGrid.innerHTML = topCreators.map(creator => `
        <div class="creator-card" data-creator-id="${creator.id}">
            <img src="${creator.avatar}" alt="${creator.name}" class="creator-avatar-large">
            <h3 class="creator-name-large">
                ${creator.name}
                ${creator.verified ? '<i class="fas fa-check-circle" style="color: #48bb78; margin-left: 8px;"></i>' : ''}
            </h3>
            <div class="creator-stats">
                <div class="creator-stat">
                    <div class="creator-stat-value">${creator.totalSales}</div>
                    <div class="creator-stat-label">Total Sales</div>
                </div>
                <div class="creator-stat">
                    <div class="creator-stat-value">${creator.itemsCount}</div>
                    <div class="creator-stat-label">Items</div>
                </div>
            </div>
        </div>
    `).join('');
}

function renderMarketplaceNFTs() {
    if (!elements.marketplaceGrid) return;
    
    let filteredNFTs = [...sampleNFTs];
    
    // Apply category filter
    if (currentFilter !== 'all') {
        filteredNFTs = filteredNFTs.filter(nft => nft.category === currentFilter);
    }
    
    // Apply search filter
    if (searchQuery) {
        filteredNFTs = filteredNFTs.filter(nft => 
            nft.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            nft.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
            nft.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }
    
    // Apply sorting
    switch (currentSort) {
        case 'price-low':
            filteredNFTs.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
            break;
        case 'price-high':
            filteredNFTs.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
            break;
        case 'popular':
            filteredNFTs.sort((a, b) => b.likes - a.likes);
            break;
        default: // recent
            filteredNFTs.sort((a, b) => b.id - a.id);
    }
    
    elements.marketplaceGrid.innerHTML = filteredNFTs.map(nft => createNFTCard(nft)).join('');
    
    // Add click events
    document.querySelectorAll('.marketplace-grid .nft-card').forEach(card => {
        card.addEventListener('click', (e) => {
            const nftId = parseInt(e.currentTarget.getAttribute('data-nft-id'));
            showNFTModal(nftId);
        });
    });
}

function createNFTCard(nft) {
    return `
        <div class="nft-card" data-nft-id="${nft.id}">
            <img src="${nft.image}" alt="${nft.title}" class="nft-image">
            <div class="nft-info">
                <h3 class="nft-title">${nft.title}</h3>
                <div class="nft-creator">
                    <img src="${nft.creatorAvatar}" alt="${nft.creator}" class="creator-avatar">
                    <span class="creator-name">${nft.creator}</span>
                </div>
                <div class="nft-price">
                    <div>
                        <div class="price-label">Current Price</div>
                        <div class="price-value">${nft.price}</div>
                    </div>
                    <div class="rarity-badge rarity-${nft.rarity.toLowerCase().replace(' ', '-')}">${nft.rarity}</div>
                </div>
                <div class="nft-actions">
                    <button class="btn btn-primary btn-small" onclick="buyNFT(${nft.id}, event)">
                        <i class="fas fa-shopping-cart"></i> Buy Now
                    </button>
                    <button class="btn btn-secondary btn-small" onclick="placeBid(${nft.id}, event)">
                        <i class="fas fa-gavel"></i> Bid
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Search and Filter Functions
function handleSearch() {
    if (!elements.searchInput) return;
    
    searchQuery = elements.searchInput.value.trim();
    renderMarketplaceNFTs();
    
    // Show search results message
    if (searchQuery) {
        showNotification(`Searching for "${searchQuery}"...`, 'success');
    }
}

function setActiveFilter(button, category) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    currentFilter = category;
}

function filterNFTs(category) {
    currentFilter = category;
    renderFeaturedNFTs();
    renderMarketplaceNFTs();
}

function loadMoreNFTs() {
    displayedNFTs += 3;
    renderFeaturedNFTs();
    
    if (displayedNFTs >= sampleNFTs.length && elements.loadMoreBtn) {
        elements.loadMoreBtn.style.display = 'none';
    }
}

// NFT Creation Functions
function showCreateForm() {
    if (!isWalletConnected) {
        showNotification('Please connect your wallet first', 'error');
        showWalletModal();
        return;
    }
    
    if (elements.createForm) {
        elements.createForm.style.display = 'block';
        elements.createForm.scrollIntoView({ behavior: 'smooth' });
    }
}

function handleFileUpload(e) {
    const file = e.target.files[0];
    if (file) {
        const fileUploadText = document.querySelector('.file-upload-text span');
        if (fileUploadText) {
            fileUploadText.textContent = `Selected: ${file.name}`;
        }
    }
}

function handleNFTCreation(e) {
    e.preventDefault();
    
    if (!isWalletConnected) {
        showNotification('Please connect your wallet first', 'error');
        return;
    }
    
    const formData = new FormData(elements.nftForm);
    const nftData = {
        name: formData.get('nft-name') || document.getElementById('nft-name').value,
        description: formData.get('nft-description') || document.getElementById('nft-description').value,
        price: formData.get('nft-price') || document.getElementById('nft-price').value,
        royalty: formData.get('nft-royalty') || document.getElementById('nft-royalty').value
    };
    
    // Simulate NFT creation
    showNotification('Creating your NFT... Please wait.', 'success');
    
    setTimeout(() => {
        showNotification('NFT created successfully! 🎉', 'success');
        elements.nftForm.reset();
        document.querySelector('.file-upload-text span').textContent = 'Drag and drop or click to upload';
        
        // Add the new NFT to the array (mock)
        const newNFT = {
            id: sampleNFTs.length + 1,
            title: nftData.name,
            creator: "You",
            creatorAvatar: "https://i.pravatar.cc/100?img=99",
            price: `${nftData.price} ETH`,
            category: "art",
            image: "https://picsum.photos/400/400?random=" + (sampleNFTs.length + 1),
            rarity: "Common",
            description: nftData.description,
            likes: 0,
            views: 0
        };
        
        sampleNFTs.unshift(newNFT);
        renderFeaturedNFTs();
        renderMarketplaceNFTs();
    }, 3000);
}

// Modal Functions
function showNFTModal(nftId) {
    const nft = sampleNFTs.find(n => n.id === nftId);
    if (!nft || !elements.nftModal) return;
    
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <div class="nft-modal-content">
            <div class="nft-modal-image">
                <img src="${nft.image}" alt="${nft.title}">
            </div>
            <div class="nft-modal-info">
                <h2>${nft.title}</h2>
                <div class="nft-creator">
                    <img src="${nft.creatorAvatar}" alt="${nft.creator}" class="creator-avatar">
                    <span class="creator-name">${nft.creator}</span>
                </div>
                <p class="nft-description">${nft.description}</p>
                
                <div class="nft-stats">
                    <div class="stat">
                        <i class="fas fa-heart"></i>
                        <span>${nft.likes} likes</span>
                    </div>
                    <div class="stat">
                        <i class="fas fa-eye"></i>
                        <span>${nft.views} views</span>
                    </div>
                </div>
                
                <div class="nft-price-large">
                    <div class="price-label">Current Price</div>
                    <div class="price-value">${nft.price}</div>
                    <div class="price-usd">${nft.priceUSD}</div>
                </div>
                
                <div class="nft-modal-actions">
                    <button class="btn btn-primary btn-large" onclick="buyNFT(${nft.id}, event)">
                        <i class="fas fa-shopping-cart"></i> Buy Now
                    </button>
                    <button class="btn btn-secondary btn-large" onclick="placeBid(${nft.id}, event)">
                        <i class="fas fa-gavel"></i> Place Bid
                    </button>
                </div>
            </div>
        </div>
    `;
    
    elements.nftModal.style.display = 'block';
}

function closeModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
}

// NFT Transaction Functions
function buyNFT(nftId, event) {
    event.stopPropagation();
    
    if (!isWalletConnected) {
        showNotification('Please connect your wallet first', 'error');
        showWalletModal();
        return;
    }
    
    const nft = sampleNFTs.find(n => n.id === nftId);
    if (nft) {
        showNotification(`Processing purchase of ${nft.title}...`, 'success');
        
        setTimeout(() => {
            showNotification(`Successfully purchased ${nft.title}! 🎉`, 'success');
            closeModals();
        }, 2000);
    }
}

function placeBid(nftId, event) {
    event.stopPropagation();
    
    if (!isWalletConnected) {
        showNotification('Please connect your wallet first', 'error');
        showWalletModal();
        return;
    }
    
    const nft = sampleNFTs.find(n => n.id === nftId);
    if (nft) {
        const bidAmount = prompt(`Enter your bid for ${nft.title} (current price: ${nft.price}):`);
        if (bidAmount) {
            showNotification(`Bid of ${bidAmount} ETH placed successfully!`, 'success');
            closeModals();
        }
    }
}

// Utility Functions
function showNotification(message, type = 'success') {
    if (!elements.notification) return;
    
    const notificationText = elements.notification.querySelector('.notification-text');
    if (notificationText) {
        notificationText.textContent = message;
    }
    
    elements.notification.className = `notification ${type}`;
    elements.notification.style.display = 'block';
    
    // Auto hide after 4 seconds
    setTimeout(hideNotification, 4000);
}

function hideNotification() {
    if (elements.notification) {
        elements.notification.style.display = 'none';
    }
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(counter) {
    const target = parseInt(counter.getAttribute('data-target'));
    const increment = target / 100;
    let current = 0;
    
    const updateCounter = () => {
        if (current < target) {
            current += increment;
            counter.textContent = Math.floor(current).toLocaleString() + '+';
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target.toLocaleString() + '+';
        }
    };
    
    updateCounter();
}

function setupScrollEffects() {
    const navbar = elements.navbar;
    if (!navbar) return;
    
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Add background to navbar when scrolled
        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
    
    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.nft-card, .creator-card, .step-card');
    
    const scrollObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('slide-up');
            }
        });
    }, { threshold: 0.1 });
    
    animateElements.forEach(element => scrollObserver.observe(element));
}

// Add CSS for rarity badges
const rarityStyles = `
    .rarity-badge {
        padding: 4px 8px;
        border-radius: 12px;
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
    }
    
    .rarity-common {
        background: rgba(107, 114, 128, 0.2);
        color: #9CA3AF;
    }
    
    .rarity-rare {
        background: rgba(59, 130, 246, 0.2);
        color: #3B82F6;
    }
    
    .rarity-epic {
        background: rgba(147, 51, 234, 0.2);
        color: #9333EA;
    }
    
    .rarity-legendary {
        background: rgba(245, 158, 11, 0.2);
        color: #F59E0B;
    }
    
    .rarity-ultra-rare {
        background: rgba(239, 68, 68, 0.2);
        color: #EF4444;
    }
    
    .nft-modal-content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
        align-items: start;
    }
    
    .nft-modal-image img {
        width: 100%;
        border-radius: 1rem;
    }
    
    .nft-price-large {
        background: rgba(99, 102, 241, 0.1);
        padding: 1rem;
        border-radius: 0.5rem;
        margin: 1rem 0;
    }
    
    .nft-price-large .price-value {
        font-size: 1.5rem;
        font-weight: 700;
    }
    
    .nft-stats {
        display: flex;
        gap: 1rem;
        margin: 1rem 0;
    }
    
    .nft-stats .stat {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: #9CA3AF;
    }
    
    .nft-modal-actions {
        display: flex;
        gap: 1rem;
        margin-top: 1.5rem;
    }
    
    .btn.connected {
        background: var(--success);
    }
    
    @media (max-width: 768px) {
        .nft-modal-content {
            grid-template-columns: 1fr;
        }
        
        .nft-modal-actions {
            flex-direction: column;
        }
    }
`;

// Add the styles to the document
const styleSheet = document.createElement('style');
styleSheet.textContent = rarityStyles;
document.head.appendChild(styleSheet);

// Export functions for global access
window.scrollToSection = scrollToSection;
window.buyNFT = buyNFT;
window.placeBid = placeBid;