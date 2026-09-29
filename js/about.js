const formatTimelineDate = (year, month) => month ? `${month}/${year}` : `${year}`;

const timelineSortValue = (item) => item.from + ((item.fromMonth ?? 1) - 1) / 12;

const hobbyTagHtml = (hobby) => {
    const inner = `
        <img class="skill-icon" src="${hobby.icon}" alt="${hobby.name}" title="${hobby.name}"
             width="16" height="16" loading="lazy">
        <span>${hobby.name}</span>
    `;
    return hobby.url
        ? `<a class="tag" href="${hobby.url}" target="_blank" rel="noopener">${inner}</a>`
        : `<span class="tag">${inner}</span>`;
};

const skillCategoryHtml = (categoryName, skills) => `
    <div class="skill-category">
        <h4>${categoryName}</h4>
        <div class="skill-grid">
            ${iconsHtml(skills, 32)}
        </div>
    </div>
`;

const timelineItemHtml = (item) => `
    <div class="timeline-item">
        <div class="timeline-year">
            ${formatTimelineDate(item.from, item.fromMonth)} - ${item.to ? formatTimelineDate(item.to, item.toMonth) : 'present'}
        </div>
        <div class="timeline-body">
            <h3>${item.title}</h3>
            <p class="empty-note">${item.place}</p>
        </div>
    </div>
`;

const contactItemHtml = (contact) => `
    <a class="contact-link" href="${contact.url}" target="_blank" rel="noopener">
        <img class="skill-icon${ICON_INVERT.includes(contact.icon) ? ' invert' : ''}"
             src="${iconSrc(contact.icon)}" alt="${contact.icon}" title="${contact.icon}"
             width="${ICON_SIZE[contact.icon] ?? 20}" height="${ICON_SIZE[contact.icon] ?? 20}" loading="lazy">
        <span>${contact.label}</span>
    </a>
`;

const createAboutPage = async () => {
    const about = await loadJsonData('data/about.json');

    const hobbiesHtml = about.hobbies?.length ? `
        <div class="about-hobbies">
            <h3>Hobbies</h3>
            <div class="tag-list">
                ${about.hobbies.map(hobbyTagHtml).join('')}
            </div>
        </div>
    ` : '';

    const skillsHtml = about.skills && Object.keys(about.skills).length ? `
        <div class="about-skills">
            <h3>Skills</h3>
            ${Object.entries(about.skills)
                .map(([categoryName, skills]) => skillCategoryHtml(categoryName, skills))
                .join('')}
        </div>
    ` : '';

    const timelineHtml = about.timeline?.length ? `
        <div class="about-timeline">
            <h3>Timeline</h3>
            <div class="timeline">
                ${[...about.timeline]
                    .sort((a, b) => timelineSortValue(b) - timelineSortValue(a))
                    .map(timelineItemHtml)
                    .join('')}
            </div>
        </div>
    ` : '';

    const contactsHtml = about.contacts?.length ? `
        <div class="contact-list">
            ${about.contacts.map(contactItemHtml).join('')}
        </div>
    ` : '';

    const aboutHtml = `
        <div class="about-layout">
            <img class="about-photo" src="${about.photo}" alt="${about.name}">
            <div>
                <h1>${about.name}</h1>
                <p class="empty-note">${about.role}</p>
                <p>${about.intro}</p>
                ${about.paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join('')}
            </div>
        </div>
        ${hobbiesHtml}
        ${skillsHtml}
        ${timelineHtml}
        ${contactsHtml}
    `;

    document.getElementById('about-root').innerHTML = aboutHtml;
};

createAboutPage();