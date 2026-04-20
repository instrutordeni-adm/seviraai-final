import fs from 'fs';

let html = fs.readFileSync('index.html', 'utf8');

// 1. Add global background after <body>
const bodyTag = '<body class="font-sans antialiased selection:bg-construction selection:text-asphalt">';
const globalBg = `
    <!-- Global Liquid Glass Background -->
    <div class="fixed inset-0 z-[-1] bg-[#0a0a0a] overflow-hidden">
        <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-construction/20 rounded-full blur-[120px] mix-blend-screen animate-pulse-subtle"></div>
        <div class="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-concrete-light/30 rounded-full blur-[150px] mix-blend-screen animate-pulse-glow-subtle" style="animation-delay: 2s;"></div>
        <div class="absolute top-[40%] left-[60%] w-[30%] h-[30%] bg-construction/10 rounded-full blur-[100px] mix-blend-screen animate-pulse-subtle" style="animation-delay: 1s;"></div>
    </div>
`;
html = html.replace(bodyTag, bodyTag + globalBg);

// 2. Hero Background
html = html.replace(
    '<div class="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-concrete/20 via-asphalt to-asphalt bg-fixed"></div>',
    '<div class="absolute inset-0 z-0 bg-white/[0.02] backdrop-blur-3xl"></div>'
);

// 3. Para Quem é
html = html.replace(
    '<section class="relative py-20 border-y border-concrete bg-asphalt-light overflow-hidden">',
    '<section class="relative py-20 border-y border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">'
);

// 4. Carrossel
html = html.replace(
    '<section class="py-20 overflow-hidden">',
    '<section class="py-20 overflow-hidden relative">\n        <div class="absolute inset-0 z-0 bg-white/[0.02] backdrop-blur-2xl"></div>'
);

// 5. O Que Você Vai Aprender
html = html.replace(
    '<section class="bg-asphalt-light py-20 border-y border-concrete">',
    '<section class="bg-white/[0.03] backdrop-blur-xl py-20 border-y border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">'
);

// 6. Planos
html = html.replace(
    '<div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-concrete/40 via-asphalt to-asphalt"></div>',
    '<div class="absolute inset-0 bg-white/[0.04] backdrop-blur-2xl border-y border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]"></div>'
);

// 7. Depoimentos (Note: this is the second occurrence of the old class)
html = html.replace(
    '<section class="bg-asphalt-light py-20 border-y border-concrete">',
    '<section class="bg-white/[0.03] backdrop-blur-xl py-20 border-y border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">'
);

// 8. Portfólio
html = html.replace(
    '<div class="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-concrete/20 via-asphalt to-asphalt z-0 pointer-events-none"></div>',
    '<div class="absolute top-0 left-0 w-full h-full bg-white/[0.02] backdrop-blur-3xl z-0 pointer-events-none border-y border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]"></div>'
);

// 9. FAQ
html = html.replace(
    '<section class="py-20 bg-asphalt-light border-t border-concrete">',
    '<section class="py-20 bg-white/[0.03] backdrop-blur-xl border-t border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">'
);

// 10. Footer
html = html.replace(
    '<footer class="bg-black py-12 border-t border-concrete">',
    '<footer class="bg-white/[0.02] backdrop-blur-2xl py-12 border-t border-white/10 relative overflow-hidden shadow-[0_-8px_32px_0_rgba(0,0,0,0.3)]">'
);

fs.writeFileSync('index.html', html);
console.log('Liquid glass styles applied successfully.');
