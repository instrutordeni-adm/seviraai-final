import fs from 'fs';

const html = fs.readFileSync('index.html', 'utf8');

const startMarker = '<!-- Galeria Grid -->';
const endMarker = '<div class="mt-16 text-center">';

const startIndex = html.indexOf(startMarker);
const endIndex = html.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
    console.error('Markers not found');
    process.exit(1);
}

let newGridHtml = startMarker + '\n';

newGridHtml += `
            <!-- Filtros -->
            <div class="flex flex-wrap justify-center gap-3 mb-10" id="portfolio-filters">
                <button class="filter-btn active px-6 py-2 rounded-full border border-construction bg-construction text-asphalt font-bold transition-all hover:shadow-[0_0_15px_rgba(255,215,0,0.4)]" data-filter="all">Todos</button>
                <button class="filter-btn px-6 py-2 rounded-full border border-concrete-light bg-concrete text-gray-300 font-medium transition-all hover:border-construction hover:text-construction" data-filter="imagens">Imagens</button>
                <button class="filter-btn px-6 py-2 rounded-full border border-concrete-light bg-concrete text-gray-300 font-medium transition-all hover:border-construction hover:text-construction" data-filter="videos">Vídeos</button>
                <button class="filter-btn px-6 py-2 rounded-full border border-concrete-light bg-concrete text-gray-300 font-medium transition-all hover:border-construction hover:text-construction" data-filter="avatares">Avatares</button>
            </div>
            
            <style>
                @keyframes fadeInScale {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-fade-in-scale {
                    animation: fadeInScale 0.4s ease forwards;
                }
            </style>

            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6" id="portfolio-grid">\n`;

const seeds = [
    'ai-portrait', 'cyber-city', 'neon-robot', 'digital-landscape', 'future-car',
    'space-station', 'abstract-data', 'hologram', 'synthwave', 'mecha',
    'ai-avatar', 'virtual-reality', 'cyberpunk-street', 'android', 'neural-network',
    'sci-fi-concept', 'digital-painting', '3d-render', 'generative-art', 'machine-learning',
    'ai-generated-1', 'ai-generated-2', 'ai-generated-3', 'ai-generated-4', 'ai-generated-5',
    'ai-generated-6', 'ai-generated-7', 'ai-generated-8', 'ai-generated-9', 'ai-generated-10',
    'ai-generated-11', 'ai-generated-12', 'ai-generated-13', 'ai-generated-14', 'ai-generated-15',
    'ai-generated-16', 'ai-generated-17', 'ai-generated-18', 'ai-generated-19', 'ai-generated-20',
    'ai-generated-21', 'ai-generated-22', 'ai-generated-23', 'ai-generated-24', 'ai-generated-25'
];

for (let i = 1; i <= 45; i++) {
    const seed = seeds[i - 1] || `ai-art-${i}`;
    
    let category = 'imagens';
    if (seed.includes('avatar') || seed.includes('portrait')) category = 'avatares';
    else if (seed.includes('video') || i % 5 === 0) category = 'videos';

    let icon = 'fa-image';
    if (category === 'videos') icon = 'fa-video';
    if (category === 'avatares') icon = 'fa-user-astronaut';

    newGridHtml += `
                <!-- Item ${i} -->
                <div class="portfolio-item group relative rounded-2xl overflow-hidden border border-concrete-light aspect-[4/5] bg-concrete shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(255,215,0,0.6)] hover:border-construction/80 cursor-pointer" data-category="${category}">
                    <img src="https://picsum.photos/seed/${seed}/800/1000" alt="Trabalho de IA ${i}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" referrerPolicy="no-referrer">
                    <div class="absolute inset-0 bg-gradient-to-t from-asphalt via-asphalt/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 md:p-6">
                        <div class="text-construction mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300"><i class="fa-solid ${icon} text-xl"></i></div>
                        <h3 class="text-white font-bold text-base md:text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300">Projeto ${i}</h3>
                        <p class="text-gray-300 text-xs md:text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75 capitalize">${category}</p>
                    </div>
                </div>`;
}

newGridHtml += '\n            </div>\n\n            ';
newGridHtml += `
            <script>
                document.addEventListener('DOMContentLoaded', () => {
                    const filterBtns = document.querySelectorAll('.filter-btn');
                    const portfolioItems = document.querySelectorAll('.portfolio-item');

                    filterBtns.forEach(btn => {
                        btn.addEventListener('click', () => {
                            // Reset classes
                            filterBtns.forEach(b => {
                                b.classList.remove('bg-construction', 'text-asphalt', 'border-construction', 'shadow-[0_0_15px_rgba(255,215,0,0.4)]');
                                b.classList.add('bg-concrete', 'text-gray-300', 'border-concrete-light');
                            });
                            // Set active classes
                            btn.classList.remove('bg-concrete', 'text-gray-300', 'border-concrete-light');
                            btn.classList.add('bg-construction', 'text-asphalt', 'border-construction', 'shadow-[0_0_15px_rgba(255,215,0,0.4)]');

                            const filterValue = btn.getAttribute('data-filter');

                            portfolioItems.forEach(item => {
                                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                                    item.style.display = 'block';
                                    item.classList.remove('animate-fade-in-scale');
                                    void item.offsetWidth; // trigger reflow
                                    item.classList.add('animate-fade-in-scale');
                                } else {
                                    item.style.display = 'none';
                                }
                            });
                        });
                    });
                });
            </script>
            `;

const newHtml = html.substring(0, startIndex) + newGridHtml + html.substring(endIndex);
fs.writeFileSync('index.html', newHtml);
console.log('Replaced successfully');
