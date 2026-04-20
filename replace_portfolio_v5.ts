import fs from 'fs';

const html = fs.readFileSync('index.html', 'utf8');

const startMarker = '<div class="text-center mb-16">';
const endMarker = '<div class="mt-16 text-center">';

const startIndex = html.indexOf(startMarker);
const endIndex = html.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
    console.error('Markers not found');
    process.exit(1);
}

let newHtmlContent = `
            <div class="flex flex-col items-center justify-center text-center mb-16">
                <h2 class="font-heading text-4xl md:text-5xl font-black mb-6 text-white tracking-tight [text-shadow:0_0_30px_rgba(255,215,0,0.5)]">O que já criamos</h2>
                <p class="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                    Confira alguns dos conteúdos de alta conversão que já produzimos para nossos clientes usando inteligência artificial.
                </p>
            </div>

            <!-- Filtros -->
            <div class="flex flex-wrap justify-center gap-3 mb-12" id="portfolio-filters">
                <button class="filter-btn active px-6 py-2 rounded-full border border-construction bg-construction text-asphalt font-bold transition-all hover:shadow-[0_0_15px_rgba(255,215,0,0.4)]" data-filter="all">Todos</button>
                <button class="filter-btn px-6 py-2 rounded-full border border-concrete-light bg-concrete text-gray-300 font-medium transition-all hover:border-construction hover:text-construction" data-filter="imagens">Imagens</button>
                <button class="filter-btn px-6 py-2 rounded-full border border-concrete-light bg-concrete text-gray-300 font-medium transition-all hover:border-construction hover:text-construction" data-filter="videos">Vídeos</button>
                <button class="filter-btn px-6 py-2 rounded-full border border-concrete-light bg-concrete text-gray-300 font-medium transition-all hover:border-construction hover:text-construction" data-filter="avatares">Avatares</button>
                <button class="filter-btn px-6 py-2 rounded-full border border-concrete-light bg-concrete text-gray-300 font-medium transition-all hover:border-construction hover:text-construction" data-filter="objetos-falantes">Objetos Falantes</button>
                <button class="filter-btn px-6 py-2 rounded-full border border-concrete-light bg-concrete text-gray-300 font-medium transition-all hover:border-construction hover:text-construction" data-filter="publicidade">Publicidade</button>
                <button class="filter-btn px-6 py-2 rounded-full border border-concrete-light bg-concrete text-gray-300 font-medium transition-all hover:border-construction hover:text-construction" data-filter="personagens-realistas">Personagens Realistas</button>
                <button class="filter-btn px-6 py-2 rounded-full border border-concrete-light bg-concrete text-gray-300 font-medium transition-all hover:border-construction hover:text-construction" data-filter="influencer">Influencer</button>
            </div>
            
            <style>
                @keyframes fadeInScaleIn {
                    0% { opacity: 0; transform: scale(0.85); }
                    100% { opacity: 1; transform: scale(1); }
                }
                .animate-fade-scale-in {
                    animation: fadeInScaleIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
                }
            </style>

            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6" id="portfolio-grid">\n`;

const seeds = [
    'ai-portrait', 'cyber-city', 'neon-robot', 'digital-landscape', 'future-car',
    'space-station', 'abstract-data', 'hologram', 'synthwave', 'mecha',
    'ai-avatar', 'virtual-reality', 'cyberpunk-street', 'android', 'neural-network',
    'sci-fi-concept', 'digital-painting', '3d-render', 'generative-art', 'machine-learning',
    'ai-generated-1', 'ai-generated-2', 'ai-generated-3', 'ai-generated-4', 'ai-generated-5',
    'ai-generated-6', 'ai-generated-7', 'ai-generated-8', 'ai-generated-9', 'ai-generated-10'
];

const categories = [
    { id: 'avatares', label: 'Avatares', icon: 'fa-user-astronaut' },
    { id: 'imagens', label: 'Imagens', icon: 'fa-image' },
    { id: 'videos', label: 'Vídeos', icon: 'fa-video' },
    { id: 'objetos-falantes', label: 'Objetos Falantes', icon: 'fa-comment-dots' },
    { id: 'publicidade', label: 'Publicidade', icon: 'fa-bullhorn' },
    { id: 'personagens-realistas', label: 'Personagens Realistas', icon: 'fa-user' },
    { id: 'influencer', label: 'Influencer', icon: 'fa-camera-retro' }
];

for (let i = 1; i <= 30; i++) {
    const seed = seeds[i - 1] || `ai-art-${i}`;
    const catIndex = (i - 1) % categories.length;
    const category = categories[catIndex];

    newHtmlContent += `
                <!-- Item ${i} -->
                <div class="portfolio-item hidden group relative rounded-2xl overflow-hidden border border-concrete-light aspect-[9/16] bg-concrete transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(255,215,0,0.5)] hover:border-construction/80 cursor-pointer" data-category="${category.id}">
                    <img src="https://picsum.photos/seed/${seed}/720/1280" alt="Trabalho de IA ${i}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" referrerPolicy="no-referrer">
                    
                    <!-- Tooltip -->
                    <div class="absolute top-4 left-1/2 -translate-x-1/2 bg-asphalt/90 text-construction text-xs font-bold px-4 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none backdrop-blur-sm border border-construction/30 z-10 whitespace-nowrap shadow-lg">
                        ${category.label}
                    </div>

                    <!-- Gradient Bottom -->
                    <div class="absolute inset-0 bg-gradient-to-t from-asphalt via-asphalt/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 md:p-6">
                        <h3 class="text-white font-bold text-base md:text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300">Projeto ${i}</h3>
                    </div>
                </div>`;
}

newHtmlContent += `
            </div>

            <div class="mt-12 text-center">
                <button id="load-more-btn" class="inline-flex items-center gap-3 bg-concrete border border-concrete-light text-white hover:border-construction hover:text-construction font-bold text-base py-3 px-8 rounded-full transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,215,0,0.2)]">
                    Ver Mais <i class="fa-solid fa-plus"></i>
                </button>
            </div>

            <script>
                document.addEventListener('DOMContentLoaded', () => {
                    const filterBtns = document.querySelectorAll('.filter-btn');
                    const allItems = Array.from(document.querySelectorAll('.portfolio-item'));
                    const loadMoreBtn = document.getElementById('load-more-btn');
                    
                    let currentFilter = 'all';
                    let visibleCount = 10;
                    const itemsPerLoad = 10;

                    function renderPortfolio() {
                        let filtered = allItems;
                        if (currentFilter !== 'all') {
                            filtered = allItems.filter(item => item.getAttribute('data-category') === currentFilter);
                        }

                        // Hide all items first
                        allItems.forEach(item => {
                            item.classList.add('hidden');
                            item.classList.remove('animate-fade-scale-in');
                        });

                        let newlyRevealed = [];

                        // Show items up to visibleCount
                        for (let i = 0; i < Math.min(visibleCount, filtered.length); i++) {
                            const item = filtered[i];
                            item.classList.remove('hidden');
                            // Trigger reflow to restart animation
                            void item.offsetWidth;
                            item.classList.add('animate-fade-scale-in');
                            
                            // Keep track of items revealed in this specific load
                            if (i >= visibleCount - itemsPerLoad) {
                                newlyRevealed.push(item);
                            }
                        }

                        // Toggle Load More button visibility
                        if (visibleCount >= filtered.length) {
                            loadMoreBtn.classList.add('hidden');
                        } else {
                            loadMoreBtn.classList.remove('hidden');
                        }

                        return newlyRevealed;
                    }

                    // Filter click events
                    filterBtns.forEach(btn => {
                        btn.addEventListener('click', () => {
                            // Reset active classes
                            filterBtns.forEach(b => {
                                b.classList.remove('bg-construction', 'text-asphalt', 'border-construction', 'shadow-[0_0_15px_rgba(255,215,0,0.4)]');
                                b.classList.add('bg-concrete', 'text-gray-300', 'border-concrete-light');
                            });
                            // Set active class on clicked button
                            btn.classList.remove('bg-concrete', 'text-gray-300', 'border-concrete-light');
                            btn.classList.add('bg-construction', 'text-asphalt', 'border-construction', 'shadow-[0_0_15px_rgba(255,215,0,0.4)]');

                            currentFilter = btn.getAttribute('data-filter');
                            visibleCount = 10; // Reset visible count on filter change
                            renderPortfolio();
                        });
                    });

                    // Load More click event
                    loadMoreBtn.addEventListener('click', () => {
                        visibleCount += itemsPerLoad;
                        const newlyRevealed = renderPortfolio();
                        
                        // Smooth scroll to the first newly revealed item
                        if (newlyRevealed.length > 0) {
                            const yOffset = -100; // Offset for fixed header
                            const element = newlyRevealed[0];
                            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                            window.scrollTo({top: y, behavior: 'smooth'});
                        }
                    });

                    // Initial render
                    renderPortfolio();
                });
            </script>
            `;

const newHtml = html.substring(0, startIndex) + newHtmlContent + html.substring(endIndex);
fs.writeFileSync('index.html', newHtml);
console.log('Replaced successfully');
