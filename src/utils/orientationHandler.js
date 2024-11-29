if ('orientation' in screen) {
    screen.orientation.lock("portrait").catch((err) => {
        console.error("Orientation lock failed:", err);
    });
} else {
    console.warn("Screen Orientation API is not supported by this browser.");
}