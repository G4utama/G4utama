const siteCardHtml = (site) => `
    <a class="site-card" href="${site.url}" target="_blank" rel="noopener">
        <img class="thumb" src="${site.image}" alt="${site.title}">
        <div class="site-card-body">
            <h3>${site.title}</h3>
            <span class="visit">visit ↗</span>
        </div>
    </a>
`;

const createSitesPage = async () => {
    const { sites } = await loadJsonData('data/sites.json');

    document.getElementById('sites-root').innerHTML = sites?.length
        ? `<div class="site-grid">${sites.map(siteCardHtml).join('')}</div>`
        : `<p class="empty-note">No sites listed yet.</p>`;
};

createSitesPage();
