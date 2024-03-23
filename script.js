document.addEventListener('DOMContentLoaded', function() {
    const carouselContainer = document.getElementById('gallery');
    const images = [];

    for (let i = 1; i < 50; i++) {
        const newPathToImage = `assets/portfolio/image (${i}).jpg`;
        images.push(newPathToImage);
    }

    function loadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = () => reject(new Error(`Failed to load image at ${src}`));
            img.src = src;
        });
    }
    
    async function processImagesSequentially(images) {
        for (let src of images) {
            try {
                console.log(src);
                const img = await loadImage(src); 
                img.classList.add('gallery_image');
                const imageWrapper = document.createElement('div');
                imageWrapper.classList.add('gallery_item');
                imageWrapper.appendChild(img);
                carouselContainer.appendChild(imageWrapper);

                img.addEventListener('click', () => {
                    img.classList.toggle('img_zoomed');
                });
            } catch (error) {
                console.error(error);
                break; 
            }
        }
    }
    
    processImagesSequentially(images);
});
