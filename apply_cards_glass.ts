import fs from 'fs';

let html = fs.readFileSync('index.html', 'utf8');

// Replace bg-asphalt in Acordeão (Para Quem é)
html = html.replace(
    /class="group bg-asphalt border border-green-900\/50/g,
    'class="group bg-white/5 backdrop-blur-md border border-green-900/50'
);
html = html.replace(
    /class="group bg-asphalt border border-red-900\/50/g,
    'class="group bg-white/5 backdrop-blur-md border border-red-900/50'
);

// Replace bg-asphalt in "O Que Você Vai Aprender" cards
html = html.replace(
    /class="bg-asphalt p-6 rounded-xl border border-concrete-light"/g,
    'class="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10 shadow-[0_4px_16px_0_rgba(0,0,0,0.2)]"'
);

// Replace bg-asphalt in Pricing cards
html = html.replace(
    /class="bg-asphalt rounded-3xl p-8 border border-concrete-light/g,
    'class="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]'
);

// Replace bg-concrete in Testimonial cards
html = html.replace(
    /class="bg-concrete p-8 rounded-2xl border border-concrete-light/g,
    'class="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-[0_4px_16px_0_rgba(0,0,0,0.2)]'
);

// Replace bg-concrete in FAQ
html = html.replace(
    /class="group bg-concrete rounded-2xl border border-concrete-light/g,
    'class="group bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-[0_4px_16px_0_rgba(0,0,0,0.2)]'
);

fs.writeFileSync('index.html', html);
console.log('Card liquid glass styles applied successfully.');
