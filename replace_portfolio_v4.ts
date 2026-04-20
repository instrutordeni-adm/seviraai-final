import fs from 'fs';

const html = fs.readFileSync('index.html', 'utf8');

const startMarker = '<!-- Filtros -->';
const endMarker = '<!-- Hidden container to store original slides for filtering -->';

const startIndex = html.indexOf(startMarker);
const endIndex = html.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
    console.error('Markers not found');
    process.exit(1);
}

let newGridHtml = startMarker + '\n';

newGridHtml += `            <div class="flex flex-wrap justify-center gap-3 mb-10" id="portfolio-filters">
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
                .portfolio-pagination .swiper-pagination-bullet {
                    background: #fff;
                    opacity: 0.5;
                    width: 12px;
                    height: 12px;
                    transition: all 0.3s ease;
                    margin: 0 6px !important;
                }
                .portfolio-pagination .swiper-pagination-bullet-active {
                    background: #FFD700;
                    opacity: 1;
                    transform: scale(1.3);
                    box-shadow: 0 0 10px rgba(255, 215, 0, 0.6);
                }
                .portfolio-swiper {
                    padding-bottom: 50px !important; /* Space for pagination */
                }
            </style>

            <div class="swiper portfolio-swiper w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-concrete-light">
                <div class="swiper-wrapper" id="portfolio-wrapper">\n`;

const seeds = [
    'ai-portrait', 'cyber-city', 'neon-robot', 'digital-landscape', 'future-car',
    'space-station', 'abstract-data', 'hologram', 'synthwave', 'mecha',
    'ai-avatar', 'virtual-reality', 'cyberpunk-street', 'android', 'neural-network',
    'sci-fi-concept', 'digital-painting', '3d-render', 'generative-art', 'machine-learning'
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

for (let i = 1; i <= 20; i++) {
    const seed = seeds[i - 1] || `ai-art-${i}`;
    
    const catIndex = (i - 1) % categories.length;
    const category = categories[catIndex];

    newGridHtml += `
                    <!-- Item ${i} -->
                    <div class="swiper-slide portfolio-item-slide" data-category="${category.id}">
                        <div class="relative aspect-[16/9] md:aspect-[21/9] bg-concrete flex items-center justify-center overflow-hidden group">
                            <img src="https://picsum.photos/seed/${seed}/1920/1080" alt="Trabalho de IA ${i}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" referrerPolicy="no-referrer">
                            <div class="absolute inset-0 bg-gradient-to-t from-asphalt via-asphalt/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8 md:p-12">
                                <div class="text-construction mb-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-300"><i class="fa-solid ${category.icon} text-3xl"></i></div>
                                <h3 class="text-white font-bold text-2xl md:text-3xl translate-y-4 group-hover:translate-y-0 transition-transform duration-300">Projeto ${i}</h3>
                                <p class="text-gray-300 text-sm md:text-base translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75 capitalize">${category.label} gerado com IA</p>
                            </div>
                        </div>
                    </div>`;
}

newGridHtml += `
                </div>
                <!-- Add Pagination -->
                <div class="swiper-pagination portfolio-pagination absolute bottom-0"></div>
                <!-- Add Navigation -->
                <div class="swiper-button-next !text-construction drop-shadow-md hidden md:flex"></div>
                <div class="swiper-button-prev !text-construction drop-shadow-md hidden md:flex"></div>
            </div>

            `;

const newHtml = html.substring(0, startIndex) + newGridHtml + html.substring(endIndex);
fs.writeFileSync('index.html', newHtml);
console.log('Replaced successfully');
