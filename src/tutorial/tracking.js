let startTime = Date.now();
const currentChapter = document.title;

document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
        const timeSpent = Math.floor((Date.now() - startTime) / 1000);

        let timeTracker = JSON.parse(sessionStorage.getItem('javaGuideReadingTime')) || {};
        timeTracker[currentChapter] = (timeTracker[currentChapter] || 0) + timeSpent;

        sessionStorage.setItem('javaGuideReadingTime', JSON.stringify(timeTracker));
    } else if (document.visibilityState === 'visible') {
        startTime = Date.now();
    }
});