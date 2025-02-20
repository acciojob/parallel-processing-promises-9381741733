document.addEventListener("DOMContentLoaded", () => {
    const output = document.getElementById("output");
    const errorDiv = document.getElementById("error");
    const loading = document.getElementById("loading");
    const btn = document.getElementById("download-images-button");

    const images = [
        { url: "https://picsum.photos/id/237/200/300" },
        { url: "https://picsum.photos/id/238/200/300" },
        { url: "https://picsum.photos/id/239/200/300" },
    ];

    function downloadImage(url) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = url;

            img.onload = () => resolve(img);
            img.onerror = () => reject(`Failed to load image: ${url}`);
        });
    }

    function downloadImages() {
        output.innerHTML = "";
        errorDiv.innerHTML = "";
        loading.style.display = "block";

        const imagePromises = images.map(img => downloadImage(img.url));

        Promise.all(imagePromises)
            .then(images => {
                loading.style.display = "none";
                images.forEach(img => output.appendChild(img));
            })
            .catch(error => {
                loading.style.display = "none";
                errorDiv.innerText = error;
            });
    }

    btn.addEventListener("click", downloadImages);
});
