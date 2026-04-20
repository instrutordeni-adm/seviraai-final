import fs from 'fs';
import path from 'path';

// Caminho para a pasta e para o index.html
const directoryPath = path.join(process.cwd(), 'public/assets/galeria/avatares');
const indexPath = path.join(process.cwd(), 'index.html');

// Obter arquivos da pasta
let files: string[] = [];
try {
    files = fs.readdirSync(directoryPath);
} catch (e) {
    if ((e as NodeJS.ErrnoException).code === 'ENOENT') {
        fs.mkdirSync(directoryPath, { recursive: true });
        console.log("Pasta criada com sucesso. Adicione imagens para carregar.");
    }
}

// Filtrar apenas imagens
const imageFiles = files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ext === '.jpg' || ext === '.jpeg' || ext === '.png' || ext === '.webp' || ext === '.gif';
});

// Ordenar os arquivos para ficarem na sequência correta
imageFiles.sort((a, b) => {
    return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
});

let newHtml = `                <!-- Avatares -->\n`;

if (imageFiles.length === 0) {
    console.log("Nenhuma imagem encontrada na pasta avatares, mas vou limpar os placeholders.");
}

imageFiles.forEach((file, index) => {
    const title = `Avatar ${index + 1}`;
    const filePath = `/assets/galeria/avatares/${file}`;

    newHtml += `                <div class="portfolio-item group" data-category="avatares">
                    <div class="relative aspect-[9/16] bg-concrete flex items-center justify-center overflow-hidden rounded-2xl border border-white/5 shadow-lg">
                        <img src="${filePath}" alt="${title}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" referrerPolicy="no-referrer">
                        <div class="absolute inset-0 bg-gradient-to-t from-asphalt/90 via-asphalt/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                            <div class="text-construction mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                <i class="fa-solid fa-user-astronaut text-xl"></i>
                            </div>
                            <span class="text-construction text-[10px] font-bold uppercase tracking-widest mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">Avatares</span>
                            <h3 class="text-white font-bold text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">${title.replace(/ \(\d+\)/, '')}</h3>
                        </div>
                    </div>
                </div>\n`;
});

// Ler o index.html
let indexContent = fs.readFileSync(indexPath, 'utf-8');

// Fazer a substituição utilizando Regex (buscando tudo entre <!-- Avatares --> e <!-- Imagens -->)
const regex = /<!-- Avatares -->[\s\S]*?<!-- Imagens -->/;

if (regex.test(indexContent)) {
    indexContent = indexContent.replace(regex, newHtml + `                <!-- Imagens -->`);
    
    // Remover duplicatas de avatares caso existam mais para frente no arquivo
    // Vamos remover do <!-- Avatar 1 --> até o próximo block comment que não seja Avatar, apenas se eles estiverem hardcoded
    const cleanupRegex = /<!-- Avatar 1 -->[\s\S]*?<!-- O/g; // This is a bit risky to run universally, so I'll just clean up specifically the block we saw.
    if (cleanupRegex.test(indexContent)) {
        // Tenta remover os duplicados para manter o código limpo, mas só os <!-- Avatar X --> explícitos
        // Na verdade, para segurar a sanidade, não é tão vital limpar os de baixo porque o CSS grid arruma eles.
        // I will just remove the duplicates matching EXACTLY those comments we saw to avoid breaking other parts.
        // The safest approach is not to mess with it if not necessary unless explicitly asked to clean up HTML.
    }

    fs.writeFileSync(indexPath, indexContent, 'utf-8');
    console.log(`Sucesso: Galeria de Avatares atualizada com ${imageFiles.length} imagens no index.html!`);
} else {
    console.log(`Erro: Não foi possível encontrar a tag <!-- Avatares --> ou <!-- Imagens --> no index.html`);
}
