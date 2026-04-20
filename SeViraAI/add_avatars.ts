import fs from 'fs';

const htmlFile = 'index.html';
let html = fs.readFileSync(htmlFile, 'utf8');

let newItems = '';
for (let i = 1; i <= 31; i++) {
    newItems += `
                    <!-- Avatar Upload ${i} -->
                    <div class="swiper-slide portfolio-item-slide" data-category="avatares">
                        <div class="relative aspect-[9/16] bg-concrete flex items-center justify-center overflow-hidden group">
                            <img src="/assets/galeria/avatares/avatar-${i}.jpg" alt="Avatar ${i}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" referrerPolicy="no-referrer" onerror="this.src='https://placehold.co/720x1280/222/FFD700?text=Avatar+${i}'">
                            
                            <!-- Tooltip -->
                            <div class="absolute top-4 left-1/2 -translate-x-1/2 bg-asphalt/90 text-construction text-xs font-bold px-4 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none backdrop-blur-sm border border-construction/30 z-10 whitespace-nowrap shadow-lg">
                                Avatares
                            </div>

                            <div class="absolute inset-0 bg-gradient-to-t from-asphalt via-asphalt/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8 md:p-12">
                                <div class="text-construction mb-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-300"><i class="fa-solid fa-user-astronaut text-3xl"></i></div>
                                <h3 class="text-white font-bold text-2xl md:text-3xl translate-y-4 group-hover:translate-y-0 transition-transform duration-300">Avatar ${i}</h3>
                                <p class="text-gray-300 text-sm md:text-base translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75 capitalize">Avatar gerado com IA</p>
                            </div>
                        </div>
                    </div>`;
}

// Find the end of the portfolio-wrapper
const targetStr = '                </div>\n                <!-- Add Pagination -->';
const wrapperEndIndex = html.indexOf(targetStr);
if (wrapperEndIndex !== -1) {
    html = html.slice(0, wrapperEndIndex) + newItems + '\n' + html.slice(wrapperEndIndex);
    fs.writeFileSync(htmlFile, html);
    console.log('Successfully added 31 avatar items.');
} else {
    console.error('Could not find the target string.');
}
