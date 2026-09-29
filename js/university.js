let universityTracks = {};
let activeTrack = '';

const courseHtml = (course) => `
    <div class="course">
        <div class="course-main">
            <h3>${course.name}</h3>
            <h3 class="course-ita">${course.nameIta}</h3>
            ${course.project ? `
                <div class="course-links">
                    <a href="${course.project.url}" target="_blank" rel="noopener">\-\> ${course.project.title}</a>
                </div>
            ` : ''}
        </div>
        <div class="course-skills">${iconsHtml(course.skills)}</div>
    </div>
`;

const renderTrack = (trackName) => {
    activeTrack = trackName;
    const courses = universityTracks[trackName] || [];

    const toggleHtml = `
        ${Object.keys(universityTracks).map((name) => `
            <button type="button" aria-selected="${name === activeTrack}" onclick="renderTrack('${name}')">${name}</button>
        `).join('')}
    `;

    const listHtml = courses.length
        ? courses.map(courseHtml).join('')
        : `<p class="empty-note">No courses listed yet.</p>`;

    document.getElementById('courses-root').innerHTML = `
        <div class="track-toggle" role="tablist">${toggleHtml}</div>
        <div class="course-list">${listHtml}</div>
    `;
};

const createUniversityPage = async () => {
    const university = await loadJsonData('data/university.json');

    universityTracks = {
        'Computer Science': university.computerScience || [],
        'Mathematics': university.mathematics || [],
    };

    renderTrack(Object.keys(universityTracks)[0]);
};

createUniversityPage();
