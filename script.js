// ===== Data for Mining in Kyrgyzstan 2025 =====
const miningData = {
    'jalalabad': {
        name: 'Джалал-Абадская область',
        value: 31766039.7,
        formatted: '31 766 039,7',
        billions: '31.77',
        share: 43.3,
        index: 136.4,
        growth: '+36.4%',
        isPositive: true,
        details: {
            coal: 821167.2,
            oil: 7486690.2,
            metalOres: 22710693.9,
            other: 747488.4
        }
    },
    'chui': {
        name: 'Чуйская область',
        value: 27319504.3,
        formatted: '27 319 504,3',
        billions: '27.32',
        share: 37.2,
        index: 95.6,
        growth: '-4.4%',
        isPositive: false,
        details: {
            metalOres: 26384051.6,
            other: 935452.7
        }
    },
    'naryn': {
        name: 'Нарынская область',
        value: 5369630.2,
        formatted: '5 369 630,2',
        billions: '5.37',
        share: 7.3,
        index: 111.5,
        growth: '+11.5%',
        isPositive: true,
        details: {
            coal: 5177314.8,
            metalOres: 106743,
            other: 85572.4
        }
    },
    'batken': {
        name: 'Баткенская область',
        value: 4034139.7,
        formatted: '4 034 139,7',
        billions: '4.03',
        share: 5.5,
        index: 128.6,
        growth: '+28.6%',
        isPositive: true,
        details: {
            coal: 3573773.6,
            oil: 324759.9,
            metalOres: 84591.3,
            other: 51014.9
        }
    },
    'osh': {
        name: 'Ошская область',
        value: 2806474.5,
        formatted: '2 806 474,5',
        billions: '2.81',
        share: 3.8,
        index: 84.4,
        growth: '-15.6%',
        isPositive: false,
        details: {
            coal: 1596346.3,
            metalOres: 642104.2,
            other: 568024
        }
    },
    'issykkul': {
        name: 'Иссык-Кульская область',
        value: 1685797.6,
        formatted: '1 685 797,6',
        billions: '1.69',
        share: 2.3,
        index: 179.3,
        growth: '+79.3%',
        isPositive: true,
        details: {
            coal: 4928.5,
            metalOres: 1405022.7,
            other: 275846.4
        }
    },
    'talas': {
        name: 'Таласская область',
        value: 233666.9,
        formatted: '233 666,9',
        billions: '0.23',
        share: 0.3,
        index: 228.7,
        growth: '+128.7%',
        isPositive: true,
        details: {
            other: 154329.1,
            services: 79337.8
        }
    },
    'bishkek': {
        name: 'г. Бишкек',
        value: 64558.1,
        formatted: '64 558,1',
        billions: '0.06',
        share: 0.1,
        index: 88.6,
        growth: '-11.4%',
        isPositive: false,
        details: {
            other: 64558.1
        }
    },
    'osh-city': {
        name: 'г. Ош',
        value: 76011.2,
        formatted: '76 011,2',
        billions: '0.08',
        share: 0.1,
        index: 131.4,
        growth: '+31.4%',
        isPositive: true,
        details: {
            coal: 76011.2
        }
    }
};

// Total mining value for Kyrgyzstan
const totalMining = 73355822.2;

// ===== DOM Elements =====
const tooltip = document.getElementById('tooltip');
const regions = document.querySelectorAll('.region');
const cities = document.querySelectorAll('.city');
const regionCards = document.querySelectorAll('.region-card');

// ===== Tooltip Functions =====
function showTooltip(event, regionId) {
    const data = miningData[regionId];
    if (!data) return;

    // Update tooltip content
    tooltip.querySelector('.tooltip-region').textContent = data.name;
    tooltip.querySelector('.value').textContent = data.formatted;
    tooltip.querySelector('.share').textContent = data.share + '%';
    tooltip.querySelector('.index').textContent = data.index + '%';

    // Position tooltip
    const rect = event.target.getBoundingClientRect();
    const mapContainer = document.querySelector('.map-container');
    const containerRect = mapContainer.getBoundingClientRect();

    let tooltipX = event.clientX - containerRect.left + 15;
    let tooltipY = event.clientY - containerRect.top + 15;

    // Adjust if tooltip goes off screen
    const tooltipWidth = 220;
    const tooltipHeight = 180;

    if (tooltipX + tooltipWidth > containerRect.width) {
        tooltipX = tooltipX - tooltipWidth - 30;
    }

    if (tooltipY + tooltipHeight > containerRect.height) {
        tooltipY = tooltipY - tooltipHeight - 30;
    }

    tooltip.style.left = tooltipX + 'px';
    tooltip.style.top = tooltipY + 'px';

    tooltip.classList.add('visible');
}

function hideTooltip() {
    tooltip.classList.remove('visible');
}

function moveTooltip(event) {
    if (!tooltip.classList.contains('visible')) return;

    const mapContainer = document.querySelector('.map-container');
    const containerRect = mapContainer.getBoundingClientRect();

    let tooltipX = event.clientX - containerRect.left + 15;
    let tooltipY = event.clientY - containerRect.top + 15;

    const tooltipWidth = 220;
    const tooltipHeight = 180;

    if (tooltipX + tooltipWidth > containerRect.width) {
        tooltipX = tooltipX - tooltipWidth - 30;
    }

    if (tooltipY + tooltipHeight > containerRect.height) {
        tooltipY = tooltipY - tooltipHeight - 30;
    }

    tooltip.style.left = tooltipX + 'px';
    tooltip.style.top = tooltipY + 'px';
}

// ===== Region Interaction =====
function highlightRegion(regionId) {
    // Remove active class from all regions
    regions.forEach(r => r.classList.remove('active'));
    cities.forEach(c => c.classList.remove('active'));
    regionCards.forEach(c => c.classList.remove('active'));

    // Add active class to selected region
    const regionElement = document.querySelector(`[data-region="${regionId}"]`);
    if (regionElement) {
        regionElement.classList.add('active');
    }

    // Highlight corresponding card
    const card = document.querySelector(`.region-card[data-region="${regionId}"]`);
    if (card) {
        card.classList.add('active');
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// ===== Event Listeners for Regions =====
regions.forEach(region => {
    const regionId = region.dataset.region;

    region.addEventListener('mouseenter', (e) => {
        showTooltip(e, regionId);
        highlightRegion(regionId);
    });

    region.addEventListener('mousemove', moveTooltip);

    region.addEventListener('mouseleave', () => {
        hideTooltip();
        region.classList.remove('active');
    });

    region.addEventListener('click', () => {
        highlightRegion(regionId);
    });
});

// ===== Event Listeners for Cities =====
cities.forEach(city => {
    const regionId = city.dataset.region;

    city.addEventListener('mouseenter', (e) => {
        showTooltip(e, regionId);
    });

    city.addEventListener('mousemove', moveTooltip);

    city.addEventListener('mouseleave', () => {
        hideTooltip();
    });

    city.addEventListener('click', () => {
        highlightRegion(regionId);
    });
});

// ===== Event Listeners for Region Cards =====
regionCards.forEach(card => {
    const regionId = card.dataset.region;

    card.addEventListener('mouseenter', () => {
        highlightRegion(regionId);
    });

    card.addEventListener('click', () => {
        highlightRegion(regionId);

        // Scroll to map
        document.querySelector('.map-section').scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    });
});

// ===== Animate Bars on Load =====
function animateBars() {
    const bars = document.querySelectorAll('.bar-fill');
    bars.forEach((bar, index) => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 100 + index * 50);
    });
}

// ===== Animate Numbers =====
function animateNumbers() {
    const statValues = document.querySelectorAll('.stat-value');
    statValues.forEach(stat => {
        stat.classList.add('fade-in');
    });
}

// ===== Add Entrance Animations =====
function initAnimations() {
    // Animate sections on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');

                // Animate bars when data section comes into view
                if (entry.target.classList.contains('data-section')) {
                    setTimeout(animateBars, 300);
                }
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Animate region cards with stagger
    const cards = document.querySelectorAll('.region-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('slide-up');
    });
}

// ===== Format Numbers =====
function formatNumber(num) {
    return new Intl.NumberFormat('ru-RU').format(num);
}

// ===== Update Stats =====
function updateStats() {
    // Calculate and update dynamic stats if needed
    const totalFormatted = formatNumber(Math.round(totalMining / 1000000 * 10) / 10);

    // Could add more dynamic updates here
}

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    initAnimations();
    animateNumbers();
    updateStats();

    // Add hover effect for mining icons
    const miningIcons = document.querySelectorAll('.mining-icon');
    miningIcons.forEach((icon, index) => {
        icon.style.animationDelay = `${index * 0.3}s`;
    });

    console.log('Kyrgyzstan Mining Data Visualization initialized');
    console.log('Total mining value:', formatNumber(totalMining), 'thousand soms');
});

// ===== Keyboard Navigation =====
document.addEventListener('keydown', (e) => {
    const regionIds = Object.keys(miningData);
    const currentActive = document.querySelector('.region.active, .city.active');

    if (!currentActive) return;

    const currentId = currentActive.dataset.region;
    const currentIndex = regionIds.indexOf(currentId);

    let newIndex;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        newIndex = (currentIndex + 1) % regionIds.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        newIndex = (currentIndex - 1 + regionIds.length) % regionIds.length;
    }

    if (newIndex !== undefined) {
        highlightRegion(regionIds[newIndex]);
    }
});

// ===== Resize Handler =====
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        hideTooltip();
    }, 100);
});
