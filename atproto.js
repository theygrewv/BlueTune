// Skyline Audio: Lightweight AT-Bridge
window.atprotoBridge = {
    init: function() {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = "https://unpkg.com/@atproto/api@0.13.20/dist/bundle.js";
            script.crossOrigin = "anonymous";
            script.onload = () => {
                console.log("ATProto Library Injected successfully.");
                resolve(true);
            };
            script.onerror = () => {
                console.error("Library load failed.");
                reject(new Error("Security block detected."));
            };
            document.head.appendChild(script);
        });
    }
};
