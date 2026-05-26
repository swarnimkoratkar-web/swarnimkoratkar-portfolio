// Database storage file holding extended metrics and images for your projects
const gameDatabase = {
    pirate: {
        title: "Pirate's Gamble",
        engine: "UNITY / C# / NETCODE MULTIPLAYER / ADS MONETIZATION",
        desc: "A high-stakes 3D strategy card game full of backstabbing, tactical betrayals, and chasing gold. Out-gamble and out-maneuver rival captains to secure the ultimate hoard. Features a robust client-server networking model, a custom local bot intelligence system for offline simulation testing, and an integrated mobile ads monetization pipeline utilizing rewarded video ad reward-callback systems to seamlessly distribute player currency.",
        images: ["pirate-video.mp4", "pirate-shot1.png", "pirate-shot2.png", "pirate-shot3.png", "pirate-shot4.png"]
    },
    caverns: {
        title: "CAVERNS",
        engine: "UNITY / C# / ADS MONETIZATION",
        desc: "An intense, atmospheric neon endless runner driven by a pulsing synthwave soundtrack. Engineered to deliver a highly synchronized, visually striking audio-visual experience where procedural environmental obstacles react dynamically to sound frequencies. Features an integrated mobile monetization engine configured with high-retention 'Second Chance' ad networks that let players execute arcade-style revives to extend their active runs.",
        images: ["caverns-video.mp4", "caverns-shot1.png", "caverns-shot2.jpg", "caverns-shot3.jpg"]
    }
};

let currentActiveGameKey = "";
let currentActiveImageIndex = 0;

// Open the custom dashboard overlay panel
function openArcadePanel(gameKey) {
    currentActiveGameKey = gameKey;
    const data = gameDatabase[gameKey];
    if (!data) return;

    // Inject text database metrics
    document.getElementById("arcadeTitle").innerText = data.title;
    document.getElementById("arcadeEngine").innerText = data.engine;
    document.getElementById("arcadeDesc").innerText = data.desc;

    // --- SMART INTERACTIVE LABELS GENERATOR FOR BOTH GAMES ---
    const galleryContainer = document.querySelector(".playstore-gallery");
    if (galleryContainer) {
        galleryContainer.innerHTML = ""; // Wipe old placeholders
        
        data.images.forEach((fileName, index) => {
            let labelContent = "";
            
            if (fileName.toLowerCase().endsWith(".mp4")) {
                labelContent = `<span style="color: var(--neon-cyan); font-weight: bold; font-size: 1.1rem;">🎬 PLAY TRAILER</span>`;
            } else {
                labelContent = `<span style="color: #ffd966; font-weight: bold; font-size: 1.1rem;">📷 VIEW SNAPSHOT</span>`;
            }
            
            // Build the dynamic button block frame instantly on the dashboard
            const thumbButton = document.createElement("div");
            thumbButton.className = "media-placeholder";
            thumbButton.id = `gallery-img-${index}`;
            thumbButton.innerHTML = labelContent;
            
            // Hook the script zoom launch trigger
            thumbButton.addEventListener("click", () => openGalleryLightbox(index));
            
            galleryContainer.appendChild(thumbButton);
        });
    }

    document.getElementById("arcadePanel").classList.add("active");
}

// Close panel instantly if background field area is clicked
function closeArcadePanel(event) {
    if (event.target.id === "arcadePanel") {
        document.getElementById("arcadePanel").classList.remove("active");
    }
}

/* =========================================
   SLIDESHOW MOTOR CODES
   ========================================= */
function openGalleryLightbox(index) {
    currentActiveImageIndex = index;
    const lightbox = document.getElementById("galleryLightbox");
    const container = document.getElementById("galleryLightboxContent");
    const activeMediaContent = gameDatabase[currentActiveGameKey].images[currentActiveImageIndex];

    // Determine the exact neon engine glow class based on the active game selection
    let glowClass = "pirate-lightbox-glow"; 
    if (currentActiveGameKey === "caverns") {
        glowClass = "caverns-lightbox-glow"; 
    }

    // INTERACTIVE MEDIA FILTER LOGIC
    if (activeMediaContent.toLowerCase().endsWith(".mp4")) {
        container.innerHTML = `
            <video src="${activeMediaContent}" class="lightbox-img ${glowClass}" autoplay loop controls playsinline>
            </video>`; 
    } else if (activeMediaContent.startsWith("[")) {
        container.innerHTML = `<div class="media-placeholder lightbox-img ${glowClass}" style="width:600px; height:400px; font-size:1.5rem;">${activeMediaContent}</div>`;
    } else {
        container.innerHTML = `<img src="${activeMediaContent}" class="lightbox-img ${glowClass}">`;
    }

    lightbox.classList.add("active");
}

// Close gallery viewer overlay and terminate active media sound streams
function closeGalleryLightbox(event) {
    if (event.target.id === "galleryLightbox" || event.target.id === "galleryLightboxContent") {
        const lightbox = document.getElementById("galleryLightbox");
        const container = document.getElementById("galleryLightboxContent");
        
        lightbox.classList.remove("active");
        
        if (container) {
            container.innerHTML = ""; // Instantly terminates streaming background audio threads
        }
    }
}

// Cycle back and forth through current active album array
function changeSlide(direction) {
    const imagesArray = gameDatabase[currentActiveGameKey].images;
    currentActiveImageIndex += direction;

    if (currentActiveImageIndex >= imagesArray.length) currentActiveImageIndex = 0;
    if (currentActiveImageIndex < 0) currentActiveImageIndex = imagesArray.length - 1;

    openGalleryLightbox(currentActiveImageIndex);
}

/* =========================================
   CERTIFICATE SINGLE IMAGE EXPANSION
   ========================================= */
document.addEventListener("DOMContentLoaded", () => {
    const certImg = document.getElementById("certImg");
    if (certImg) {
        const lightbox = document.createElement("div");
        lightbox.className = "cert-lightbox";
        lightbox.innerHTML = `<img src="${certImg.src}" class="lightbox-img" alt="Zoomed Certificate">`;
        document.body.appendChild(lightbox);

        certImg.addEventListener("click", () => lightbox.classList.add("active"));
        lightbox.addEventListener("click", () => lightbox.classList.remove("active"));
    }
});

/* =========================================
   DYNAMIC DOCK TILE GRID ARCHITECTURE LOOP
   ========================================= */
document.addEventListener("DOMContentLoaded", () => {
    const gridCanvas = document.getElementById("cyber-grid-canvas");
    if (!gridCanvas) return;

    const TOTAL_TILES = 600; 

    for (let i = 0; i < TOTAL_TILES; i++) {
        const tile = document.createElement("div");
        tile.className = "grid-tile";

        tile.addEventListener("mousedown", () => {
            tile.classList.toggle("clicked-active");
        });

        gridCanvas.appendChild(tile);
    }
});