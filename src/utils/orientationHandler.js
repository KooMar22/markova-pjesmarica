document.addEventListener("DOMContentLoaded", () => {
    const lockOrientation = async () => {
        if (screen.orientation && screen.orientation.lock) {
            try {
                await screen.orientation.lock("portrait");
                console.log("Orientation locked to portrait");
            } catch (err) {
                console.warn("Failed to lock orientation:", err);
            }
        } else {
            console.warn("Screen Orientation API is not supported on this browser.");
        }
    };

    const isMobile = () => /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobile()) {
        document.addEventListener("click", () => {
            lockOrientation();
        });
    }
});