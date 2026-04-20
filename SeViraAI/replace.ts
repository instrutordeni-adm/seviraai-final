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

let newGridHtml = startMarker + '\n            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="portfolio-grid">\n';

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
    newGridHtml += `
                <!-- Item ${i} -->
                <div class="group relative rounded-2xl overflow-hidden border border-concrete-light aspect-[4/5] bg-concrete shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(255,215,0,0.15)] hover:border-construction/40">
                    <img src="https://picsum.photos/seed/${seed}/800/1000" alt="Trabalho de IA ${i}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" referrerPolicy="no-referrer">
                    <div class="absolute inset-0 bg-gradient-to-t from-asphalt via-asphalt/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                        <h3 class="text-white font-bold text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300">Projeto ${i}</h3>
                        <p class="text-construction text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">Gerado com IA</p>
                    </div>
                </div>`;
}

newGridHtml += '\n            </div>\n\n            ';

const newHtml = html.substring(0, startIndex) + newGridHtml + html.substring(endIndex);

fs.writeFileSync('index.html', newHtml);
console.log('Replaced successfully');
