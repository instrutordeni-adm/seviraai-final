
const categories = {
    avatares: { icon: 'fa-user-astronaut', label: 'Avatares' },
    imagens: { icon: 'fa-image', label: 'Imagens' },
    videos: { icon: 'fa-video', label: 'Vídeos' },
    'objetos-falantes': { icon: 'fa-comment-dots', label: 'Objetos Falantes' },
    publicidade: { icon: 'fa-bullhorn', label: 'Publicidade' },
    'personagens-realistas': { icon: 'fa-user', label: 'Personagens Realistas' },
    influencer: { icon: 'fa-camera-retro', label: 'Influencer' }
};

const items = [
    { id: 1, cat: 'avatares', path: '/assets/galeria/avatares/avatar-1.jpg' },
    { id: 2, cat: 'imagens', path: '/assets/galeria/imagens/imagem-2.jpg' },
    { id: 3, cat: 'videos', path: '/assets/galeria/videos/video-3.jpg' },
    { id: 4, cat: 'objetos-falantes', path: '/assets/galeria/objetos-falantes/objeto-4.jpg' },
    { id: 5, cat: 'publicidade', path: '/assets/galeria/publicidade/publicidade-5.jpg' },
    { id: 6, cat: 'personagens-realistas', path: '/assets/galeria/personagens/personagem-6.jpg' },
    { id: 7, cat: 'influencer', path: '/assets/galeria/influencer/influencer-7.jpg' },
    { id: 8, cat: 'avatares', path: '/assets/galeria/avatares/avatar-8.jpg' },
    { id: 9, cat: 'imagens', path: '/assets/galeria/imagens/imagem-9.jpg' },
    { id: 10, cat: 'videos', path: '/assets/galeria/videos/video-10.jpg' },
    { id: 11, cat: 'objetos-falantes', path: '/assets/galeria/objetos-falantes/objeto-11.jpg' },
    { id: 12, cat: 'publicidade', path: '/assets/galeria/publicidade/publicidade-12.jpg' },
    { id: 13, cat: 'personagens-realistas', path: '/assets/galeria/personagens/personagem-13.jpg' },
    { id: 14, cat: 'influencer', path: 'https://picsum.photos/seed/android/720/1280' },
    { id: 15, cat: 'avatares', path: 'https://picsum.photos/seed/neural-network/720/1280' },
    { id: 16, cat: 'imagens', path: 'https://picsum.photos/seed/sci-fi-concept/720/1280' },
    { id: 17, cat: 'videos', path: 'https://picsum.photos/seed/digital-painting/720/1280' },
    { id: 18, cat: 'objetos-falantes', path: 'https://picsum.photos/seed/3d-render/720/1280' },
    { id: 19, cat: 'publicidade', path: 'https://picsum.photos/seed/generative-art/720/1280' },
    { id: 20, cat: 'personagens-realistas', path: 'https://picsum.photos/seed/machine-learning/720/1280' }
];

// Add the extra avatars
for (let i = 1; i <= 31; i++) {
    items.push({ id: `avatar-up-${i}`, cat: 'avatares', path: `/assets/galeria/avatares/avatar-${i}.jpg`, title: `Avatar ${i}` });
}

const html = items.map(item => `
                <!-- Item ${item.id} -->
                <div class="portfolio-item group" data-category="${item.cat}">
                    <div class="relative aspect-[9/16] bg-concrete flex items-center justify-center overflow-hidden rounded-2xl border border-white/5 shadow-lg">
                        <img src="${item.path}" alt="${item.title || 'Trabalho de IA ' + item.id}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" referrerPolicy="no-referrer" onerror="this.src='https://placehold.co/720x1280/222/FFD700?text=${(item.title || 'IA Item').replace(/ /g, '+')}'">
                        <div class="absolute inset-0 bg-gradient-to-t from-asphalt/90 via-asphalt/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                            <div class="text-construction mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                <i class="fa-solid ${categories[item.cat].icon} text-xl"></i>
                            </div>
                            <span class="text-construction text-[10px] font-bold uppercase tracking-widest mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">${categories[item.cat].label}</span>
                            <h3 class="text-white font-bold text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">${item.title || 'Projeto ' + item.id}</h3>
                        </div>
                    </div>
                </div>`).join('');

console.log(html);
