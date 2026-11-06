// Database storage file holding extended metrics and images for your projects
const gameDatabase = {
    pirate: {
        title: "Pirate's Gamble",
        engine: "UNITY / C# / NETCODE MULTIPLAYER / ADS MONETIZATION",
        themeClass: "theme-pirate",
        accentColor: "#ffd966",
        desc: "A high-stakes 3D strategy card game full of backstabbing, tactical betrayals, and chasing gold. Out-gamble and out-maneuver rival captains to secure the ultimate hoard. Features a robust client-server networking model, a custom local bot intelligence system for offline simulation testing, and an integrated mobile ads monetization pipeline utilizing rewarded video ad reward-callback systems to seamlessly distribute player currency.",
        images: ["pirate-video.mp4", "pirate-shot1.png", "pirate-shot2.png", "pirate-shot3.png", "pirate-shot4.png"],
        actionType: "soon"
    },
    caverns: {
        title: "CAVERNS",
        engine: "UNITY / C# / ADS MONETIZATION",
        themeClass: "theme-caverns",
        accentColor: "#00f3ff",
        desc: "An intense, atmospheric neon endless runner driven by a pulsing synthwave soundtrack. Engineered to deliver a highly synchronized, visually striking audio-visual experience where procedural environmental obstacles react dynamically to sound frequencies. Features an integrated mobile monetization engine configured with high-retention 'Second Chance' ad networks that let players execute arcade-style revives to extend their active runs.",
        images: ["caverns-video.mp4", "caverns-video2.mp4", "caverns-shot1.png", "caverns-shot2.png", "caverns-shot3.png"],
        actionType: "soon"
    },
    chameleon: {
        title: "Meta Chameleon",
        engine: "UNITY 6 / NETCODE MULTIPLAYER / ANDROID / LEVELPLAY",
        themeClass: "theme-chameleon",
        accentColor: "#ff007f",
        desc: "Fast-paced multiplayer hide-and-seek mobile game built on Unity Netcode with public matchmaking lobbies. Features two completed 3D playground maps, texture atlasing, low draw-call optimizations, dynamic camouflage painting shaders, and LevelPlay ad mediation.",
        images: [
            "chameleon-video1.mp4",
            "chameleon-video2.mp4",
            "chameleon-shot1.png",
            "chameleon-shot2.jpeg",
            "chameleon-shot3.png",
            "chameleon-shot4.jpeg",
            "chameleon-shot5.jpg"
        ],
        actionType: "playstore",
        playStoreUrl: "https://play.google.com/store/apps/details?id=com.bloodyskulls.metachameleon&pcampaignid=web_share"
    },
    bhola: {
        title: "Rebirth of Bhola",
        engine: "UNITY / C# / HORROR NARRATIVE / 3D",
        themeClass: "theme-bhola",
        accentColor: "#ff1a1a",
        desc: "A dark, atmospheric story-driven 3D horror game currently in active building. Designed around immersive occult storytelling, mystery investigation, dark room puzzle solving, and psychological pacing built directly in Unity.",
        images: ["bhola-video1.mp4", "bhola-shot1.png", "bhola-shot2.png", "bhola-shot3.png", "bhola-shot4.png"],
        actionType: "building"
    }
};

let currentActiveGameKey = "";
let currentActiveImageIndex = 0;

// Open the custom dashboard overlay panel
function openArcadePanel(gameKey) {
    currentActiveGameKey = gameKey;
    const data = gameDatabase[gameKey];
    if (!data) return;

    const cabinet = document.getElementById("arcadeCabinet");
    if (cabinet) {
        cabinet.classList.remove("theme-pirate", "theme-caverns", "theme-chameleon", "theme-bhola");
        cabinet.classList.add(data.themeClass);
    }

    // Inject text database metrics
    document.getElementById("arcadeTitle").innerText = data.title;
    document.getElementById("arcadeEngine").innerText = data.engine;
    document.getElementById("arcadeDesc").innerText = data.desc;

    // --- SMART ACTION BUTTON GENERATOR ---
    const actionContainer = document.getElementById("arcadeActionContainer");
    if (actionContainer) {
        if (data.actionType === "playstore") {
            actionContainer.innerHTML = `
                <a href="${data.playStoreUrl}" target="_blank" rel="noopener noreferrer" class="arcade-playstore-link">
                    GET ON GOOGLE PLAY <span class="btn-sub">✦ LIVE ON ANDROID</span>
                </a>
            `;
        } else if (data.actionType === "building") {
            actionContainer.innerHTML = `
                <div class="arcade-building-badge">
                    IN BUILDING <span class="btn-sub">✦ ACTIVE DEVELOPMENT</span>
                </div>
            `;
        } else {
            actionContainer.innerHTML = `
                <button class="arcade-play-btn" disabled>
                    LAUNCH WEB PLAY <span class="btn-sub">COMING SOON</span>
                </button>
            `;
        }
    }

    // --- SMART INTERACTIVE GALLERY LABELS GENERATOR ---
    const galleryContainer = document.querySelector(".playstore-gallery");
    if (galleryContainer) {
        galleryContainer.innerHTML = "";
        
        let videoCount = 0;
        let snapshotCount = 0;

        data.images.forEach((fileName, index) => {
            let labelContent = "";
            
            if (fileName.toLowerCase().endsWith(".mp4")) {
                videoCount++;
                const vidLabel = `🎬 PLAY VIDEO ${videoCount}`;
                labelContent = `<span style="color: var(--neon-cyan); font-weight: bold; font-size: 1.05rem;">${vidLabel}</span>`;
            } else {
                snapshotCount++;
                labelContent = `<span style="color: ${data.accentColor}; font-weight: bold; font-size: 1.05rem;">📷 SNAPSHOT ${snapshotCount}</span>`;
            }
            
            const thumbButton = document.createElement("div");
            thumbButton.className = "media-placeholder";
            thumbButton.id = `gallery-img-${index}`;
            thumbButton.innerHTML = labelContent;
            
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

    let glowClass = "pirate-lightbox-glow"; 
    if (currentActiveGameKey === "caverns") glowClass = "caverns-lightbox-glow";
    if (currentActiveGameKey === "chameleon") glowClass = "chameleon-lightbox-glow";
    if (currentActiveGameKey === "bhola") glowClass = "bhola-lightbox-glow";

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

function closeGalleryLightbox(event) {
    if (event.target.id === "galleryLightbox" || event.target.id === "galleryLightboxContent") {
        const lightbox = document.getElementById("galleryLightbox");
        const container = document.getElementById("galleryLightboxContent");
        
        lightbox.classList.remove("active");
        
        if (container) {
            container.innerHTML = "";
        }
    }
}

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
