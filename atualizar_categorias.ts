import fs from 'fs';
import path from 'path';

const indexPath = path.join(process.cwd(), 'index.html');

function generateHtmlForCategory(folderConfig: { folder: string, category: string, icon: string, label: string, titlePrefix: string }) {
    const directoryPath = path.join(process.cwd(), 'public/assets/galeria', folderConfig.folder);
    let files: string[] = [];
    try {
        files = fs.readdirSync(directoryPath);
    } catch (e) {
        if ((e as NodeJS.ErrnoException).code === 'ENOENT') {
            fs.mkdirSync(directoryPath, { recursive: true });
        }
    }

    const imageFiles = files.filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ext === '.jpg' || ext === '.jpeg' || ext === '.png' || ext === '.webp' || ext === '.gif';
    });

    imageFiles.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

    let html = `                <!-- ${folderConfig.folder === 'personagens' ? 'Personagens' : 'Publicidade'} -->\n`;
    
    imageFiles.forEach((file, index) => {
        const title = `${folderConfig.titlePrefix} ${index + 1}`;
        const filePath = `/assets/galeria/${folderConfig.folder}/${file}`;

        html += `                <div class="portfolio-item group" data-category="${folderConfig.category}">
                    <div class="relative aspect-[9/16] bg-concrete flex items-center justify-center overflow-hidden rounded-2xl border border-white/5 shadow-lg">
                        <img src="${filePath}" alt="${title}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" referrerPolicy="no-referrer">
                        <div class="absolute inset-0 bg-gradient-to-t from-asphalt/90 via-asphalt/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                            <div class="text-construction mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                <i class="fa-solid ${folderConfig.icon} text-xl"></i>
                            </div>
                            <span class="text-construction text-[10px] font-bold uppercase tracking-widest mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">${folderConfig.label}</span>
                            <h3 class="text-white font-bold text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">${title}</h3>
                        </div>
                    </div>
                </div>\n`;
    });
    
    return html;
}

const personagensHtml = generateHtmlForCategory({
    folder: 'personagens',
    category: 'personagens-realistas',  // Fixed data-category so the filter button works
    icon: 'fa-user',
    label: 'Personagens Realistas',
    titlePrefix: 'Personagem'
});

const publicidadeHtml = generateHtmlForCategory({
    folder: 'publicidade',
    category: 'publicidade',
    icon: 'fa-bullhorn',
    label: 'Publicidade',
    titlePrefix: 'Publicidade'
});

let indexContent = fs.readFileSync(indexPath, 'utf-8');

const regex = /<!-- Personagens -->[\s\S]*?<!-- Vídeos -->/;

if (regex.test(indexContent)) {
    indexContent = indexContent.replace(regex, personagensHtml + publicidadeHtml + `                <!-- Vídeos -->`);
    fs.writeFileSync(indexPath, indexContent, 'utf-8');
    console.log(`Sucesso: Galerias Personagens e Publicidade atualizadas no index.html!`);
} else {
    console.log(`Erro: Não foi possível encontrar a tag <!-- Personagens --> ou <!-- Vídeos --> no index.html`);
}
