const initIncludes = () => {
    const includes = document.querySelectorAll('[data-include]');
    
    const loadPromises = Array.from(includes).map(async (el) => {
        const file = el.getAttribute('data-include');
        try {
            const response = await fetch(file);
            if (response.ok) {
                el.outerHTML = await response.text();
            }
        } catch (error) {
            console.error('Error loading component:', file, error);
        }
    });

    Promise.all(loadPromises).then(() => {
        // Alpine.js automatically initializes added components
    });
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initIncludes);
} else {
    initIncludes();
}
