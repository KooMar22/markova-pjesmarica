document.addEventListener("DOMContentLoaded", () => {
    const lockOrientation = async () => {
        if (screen.orientation && screen.orientation.lock) {
            try {
                await screen.orientation.lock("portrait");
                console.log("Orientation locked to portrait.");
            } catch (error) {
                console.warn("Could not lock the orientation:", error);
            }
        } else {
            console.warn("Screen Orientation API is not supported on this browser.");
        }
    };
    document.addEventListener("click", () => {
        lockOrientation();
    });
});