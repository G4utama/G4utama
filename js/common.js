// Base path
const DEVICON_BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons';

// Some icons only ship a "-plain" variant instead of "-original"
const ICON_PLAIN_ONLY = ['linux', 'mysql'];

// Missing icons
const ICON_OVERRIDES = {
    ampl: 'https://cdn.brandfetch.io/idMIN8367h/theme/dark/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B',
    assembly: 'https://img.icons8.com/color/48/assembly.png',
    ida: 'https://img.informer.com/icons/png/48/5058/5058085.png',
    mail: 'https://img.icons8.com/?size=100&id=53435&format=png&color=0000000',
    pop: 'https://upload.wikimedia.org/wikipedia/commons/4/46/Pop%21_OS_Icon.svg',
    windows7: 'https://img.icons8.com/?size=100&id=17854&format=png&color=000000',
    windows10: 'https://img.icons8.com/?size=100&id=108792&format=png&color=000000',
    wireshark: 'https://upload.wikimedia.org/wikipedia/commons/d/df/Wireshark_icon.svg'
};

// Inverted color
const ICON_INVERT = ['apachekafka', 'bash', 'github', 'latex', 'linux', 'mail', 'markdown'];

// Different size
const ICON_SIZE = { latex: 32 };

const iconSrc = (name) => {
    if (ICON_OVERRIDES[name]) return ICON_OVERRIDES[name];
    const variant = ICON_PLAIN_ONLY.includes(name) ? 'plain' : 'original';
    return `${DEVICON_BASE}/${name}/${name}-${variant}.svg`;
};

const iconsHtml = (names = [], size = 24) => `
    ${names.map((name) => `
        <a href="${name.url}">
            <img class="skill-icon${ICON_INVERT.includes(name.name) ? ' invert' : ''}"
                src="${iconSrc(name.name)}" alt="${name.name}" title="${name.name}"
                width="${ICON_SIZE[name.name] ?? size}" height="${ICON_SIZE[name.name] ?? size}" loading="lazy">
        </a>
    `).join('')}
`;

const loadJsonData = async (path) => {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`Failed to load ${path}: ${res.status}`);
    return res.json();
};

// Marks the current page's nav link so CSS can highlight it.
const markActiveNav = () => {
    const current = document.body.dataset.page;
    document.querySelectorAll('nav.site-nav a').forEach((a) => {
        if (a.dataset.page === current) a.setAttribute('aria-current', 'page');
    });
};
document.addEventListener('DOMContentLoaded', markActiveNav);

