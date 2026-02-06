// Skyline Audio Bridge Loader
(function() {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@atproto/api@0.13.20/dist/bundle.js';
    script.crossOrigin = 'anonymous';
    script.onload = () => {
        console.log("BlueSky Bridge Active");
        // Notify the app that the library is ready
        window.dispatchEvent(new Event('lib-loaded'));
    };
    document.head.appendChild(script);
})();
