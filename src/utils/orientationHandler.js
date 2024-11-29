document.addEventListener("DOMContentLoaded", () => {
    const isMobile = () => {
        const aspectRatio = window.innerWidth / window.innerHeight;
        return aspectRatio < 1;
    };

    const checkOrientation = () => {
        const aspectRatio = window.innerWidth / window.innerHeight;
        const message = document.getElementById("orientation-message");

        if (aspectRatio > 1 && isMobile()) {
            if (!message) {
                const alert = document.createElement("div");
                alert.id = "orientation-message";
                alert.style.position = "fixed";
                alert.style.top = "0";
                alert.style.left = "0";
                alert.style.width = "100%";
                alert.style.height = "100%";
                alert.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
                alert.style.color = "white";
                alert.style.display = "flex";
                alert.style.justifyContent = "center";
                alert.style.alignItems = "center";
                alert.style.zIndex = "1000";
                alert.innerHTML =
                    "<p>Please rotate your device back to portrait (vertical) mode.</p>";
                document.body.appendChild(alert);
            }
        } else {
            if (message) {
                message.remove();
            }
        }
    };

    checkOrientation();

    if ("onchange" in screen.orientation) {
        screen.orientation.onchange = checkOrientation;
    } else {
        window.addEventListener("resize", checkOrientation);
    }
});