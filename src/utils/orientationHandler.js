document.addEventListener("DOMContentLoaded", () => {
    const preventOrientationChange = () => {
        const orientation = window.innerWidth / window.innerHeight;

        if (orientation > 1 && window.innerWidth < 800) {  
            document.body.style.transform = "rotate(0deg)";
            document.body.style.webkitTransform = "rotate(0deg)";
            window.scrollTo(0, 0);
        }
    };

    window.addEventListener("orientationchange", preventOrientationChange);
    window.addEventListener("resize", preventOrientationChange);

    preventOrientationChange();
});