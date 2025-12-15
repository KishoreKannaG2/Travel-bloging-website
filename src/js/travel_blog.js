/* =========================
   Place data (links unchanged)
   ========================= */
const places = {
  shimla: {
    images: [
      "https://www.oyorooms.com/travel-guide/wp-content/uploads/2021/08/BlogImage-12thAug-Shimla_7-1.jpg",
      "https://www.jakhuropewayshimla.com/wp-content/uploads/2022/01/mall-road.jpg",
      "https://www.hindustantimes.com/ht-img/img/2024/02/03/1600x900/ANI-20240201323-0_1706807941007_1706943308957.jpg"
    ],
    captions: ["Shimla Hills", "Snowy Shimla", "Winter in Shimla"]
  },

  coorg: {
    images: [
      "https://etimg.etb2bimg.com/photo/94583307.cms",
      "https://thumbs.dreamstime.com/b/village-road-to-home-jungle-forest-coorg-233756065.jpg",
      "https://stayinmazra.com/wp-content/uploads/2024/01/d947eb42-157d-49d8-8f3f-616b274a46e9_Tadinadamol-Trek-Banner-Image-Indiahikes-Suhas-Saya-1024x683.jpg"
    ],
    captions: ["Coorg Coffee Plantations", "Coorg Forest Roads", "Foggy Coorg Mountains"]
  },

  ooty: {
    images: [
      "https://www.indiasinvitation.com/wp-content/uploads/2019/09/Places-to-visit-in-Ooty.jpg",
      "https://www.trawell.in/blog/wp-content/uploads/2021/02/Needle_Rock_Hillpoint_Main.jpg",
      "https://yourkeys.in/wp-content/uploads/2025/08/How-to-Book-Ooty-Toy-Train-Ticket.webp"
    ],
    captions: ["Ooty Tea Gardens", "Ooty Hills View", "Ooty Toy Train"]
  },

  kodaikanal: {
    images: [
      "https://curlytales.com/wp-content/uploads/2025/07/Untitled-design-46.jpg",
      "https://i0.wp.com/eindiatourism.in/wp-content/uploads/2023/07/Pine-Forest.jpg",
      "https://www.stayvista.com/blog/wp-content/uploads/2024/10/3592782210_3451840790_b.jpg"
    ],
    captions: ["Kodaikanal Lake", "Pine Forest", "Kodai Hills Sunrise"]
  }
  ,
  goa: {
    images: [
      "https://media1.thrillophilia.com/filestore/8asovra9hft5e4vfhl54o9hg0gha_arambol_beach.jpg?w=753&h=450&dpr=2.0",
      "https://allaboutgoa.com/wp-content/uploads/2023/08/Colva-Beach-6.jpg",
      "https://www.zingbus.com/blog/wp-content/uploads/2023/11/Image-01.jpg"
    ],
    captions: ["Goa Beach", "night in Goa", "Goa Coastline"]
  },
  pondicherry: {
    images: [
      "https://lacedilleindia.com/wp-content/uploads/2025/05/Promenade-Beach-Pondicherry-Explore-the-Coastal-Charm-from-the-Heart-of-White-Town.jpg",
      "https://www.laurewanders.com/wp-content/uploads/2023/01/French-quarter-pondicherry-00001.jpg",
      "https://media1.thrillophilia.com/filestore/3xlpsrsfae3c3dlutxk7gbyvww1z_C9mfEbPFPG.jpg"
    ],
    captions: ["Pondicherry Promenade", "French Quarter", "Pondicherry Beachfront"]
  },
  vizag: {
    images: [
      "https://vizagtourism.org.in/images/places-to-visit/header/vizag-3-nights-4-days-tour-packages-header-vizag-tourism.jpg.jpg",
      "https://pub-6637fac653e84bcf92528aee66112f75.r2.dev/images/S6c7HFG9nSCqwwhaLj0YExnc74W5aAv3S3yl2qvs.jpg",
      "https://hblimg.mmtcdn.com/content/hubble/img/araku%20valley/mmt/activities/m_activities_araku_valley_ramakrishna_beach_l_535_803.jpg"
    ],
    captions: ["Vizag Bay", "Ramakrishna Beach", "Vizag Waterfront"]
  }
};

/* ===========
   Hover glow
   =========== */
function glowPoint(id){ const el = document.getElementById(id); if(el) el.classList.add('glow'); }
function unglowPoint(id){ const el = document.getElementById(id); if(el) el.classList.remove('glow'); }

/* =====================
   Popup / slideshow
   ===================== */
let currentPlace = null;
let slideIndex = 0;
let autoTimer = null;
let popupHovered = false; // track mouse inside popup to prevent auto-close race
let closeTimeout = null; // moved here so functions can clear it safely

function openPlace(name){
  if(!places[name]) return;
  currentPlace = name;
  slideIndex = 0;
  showSlide();

  const popup = document.getElementById('popup');
  popup.style.display = 'block';

  clearInterval(autoTimer);
  autoTimer = setInterval(nextSlide, 1100); // faster slideshow (1.1s)
}

/* show current slide */
function showSlide(){
  if(!currentPlace) return;
  const data = places[currentPlace];
  slideIndex = ((slideIndex % data.images.length) + data.images.length) % data.images.length;
  document.getElementById('popupImg').src = data.images[slideIndex];
  document.getElementById('popupCaption').textContent = data.captions[slideIndex] || '';
}
function navigateToSection(e, place) {
  if(e) e.preventDefault();  // Stop default link behavior
  if(!place) return;
  closePopup();  // Close the popup first
  
  // Map place names to section IDs
  const sectionMap = {
    'shimla': 'shimla',
    'coorg': 'coorg',
    'ooty': 'ooty',
    'kodaikanal': 'kodaikanal',
    'goa': 'goa',
    'pondicherry': 'pondicherry',
    'vizag': 'vizag'
  };
  
  const sectionId = sectionMap[place];
  if(!sectionId) return;
  
  const el = document.getElementById(sectionId);
  if(el) {
    setTimeout(()=> el.scrollIntoView({behavior:'smooth', block:'start'}), 200);
  }
}
/* next / prev controls */
function nextSlide(){
  if(!currentPlace) return;
  slideIndex++;
  showSlide();
}
function prevSlide(){
  if(!currentPlace) return;
  slideIndex--;
  showSlide();
}
/* ========================
   CONTACT POPUP FUNCTIONS
   ======================== */
function openContactPopup(e) {
  if(e) e.preventDefault();
  const contactPopup = document.getElementById('contactPopup');
  const contactOverlay = document.getElementById('contactOverlay');
  contactPopup.style.display = 'block';
  contactOverlay.style.display = 'block';
}

function closeContactPopup() {
  const contactPopup = document.getElementById('contactPopup');
  const contactOverlay = document.getElementById('contactOverlay');
  contactPopup.style.display = 'none';
  contactOverlay.style.display = 'none';
}

// Close contact popup on Escape key
document.addEventListener('keydown', function(e) {
  if(e.key === 'Escape' && document.getElementById('contactPopup').style.display === 'block') {
    closeContactPopup();
  }
});

/* popup auto-close when pointer leaves popup (or map area) */
function closePopup(){
  const popup = document.getElementById('popup');
  if(!popup) return;
  popup.style.display = 'none';
  clearInterval(autoTimer);
  currentPlace = null;
}

/* when popup content gets pointer inside */
function popupMouseIn(){
  popupHovered = true;
  // clear any pending close
  clearTimeout(closeTimeout);
}

/* when pointer exits popup – close it immediately */
function popupMouseOut(){
  popupHovered = false;
  // give a tiny delay to avoid accidental immediate close during small moves
  clearTimeout(closeTimeout);
  closeTimeout = setTimeout(()=>{
    if(!popupHovered) closePopup();
  }, 120); // 120ms
}

/* Also close popup if user clicks outside the popup */
document.addEventListener('click', function(e){
  const popup = document.getElementById('popup');
  if(!popup) return;
  if(popup.style.display !== 'block') return;
  // if the click target is not inside the popup and not on a click-area that opened it => close
  if(!popup.contains(e.target) && !e.target.closest('.click-area')){
    closePopup();
  }
});


/* accessibility: allow keyboard left/right when popup open */
document.addEventListener('keydown', function(e){
  if(document.getElementById('popup').style.display !== 'block') return;
  if(e.key === 'ArrowRight') nextSlide();
  if(e.key === 'ArrowLeft') prevSlide();
  if(e.key === 'Escape') closePopup();
});

/* IntersectionObserver to toggle 'active' on sections when they enter the viewport
   so the torn-paper divider animates as the user scrolls through sections. */
(function(){
  const sections = document.querySelectorAll('.place-section');
  if(!sections.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const el = entry.target;
      if(entry.isIntersecting && entry.intersectionRatio > 0.25){
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });
  }, { threshold: [0, 0.15, 0.25, 0.5] });

  sections.forEach(s => obs.observe(s));
})();

/* Lightweight JS parallax controller for elements with [data-parallax]
   Uses requestAnimationFrame for smooth updates and works on mobile where
   background-attachment: fixed is not reliable. */
(function(){
  const parallaxEls = Array.from(document.querySelectorAll('[data-parallax]'));
  if(!parallaxEls.length) return;

  // capture initial offsets to compute movement
  const items = parallaxEls.map(el => {
    const rect = el.getBoundingClientRect();
    // if element uses background-image we will modify backgroundPositionY
    return {
      el,
      startTop: rect.top + window.scrollY,
      height: rect.height,
      speed: parseFloat(el.getAttribute('data-parallax-speed')) || 0.35 // 0.0 - 1.0
    };
  });

  let ticking = false;
  function onScroll(){
    if(!ticking){
      window.requestAnimationFrame(() => {
        const scrollY = window.scrollY || window.pageYOffset;
        items.forEach(item => {
          const pct = (scrollY - item.startTop) * item.speed;
          // prefer transform trick for mobile performance when element has children
          // but simpler: adjust background-position to create parallax effect
          item.el.style.backgroundPosition = `center ${50 + pct/10}%`;
        });
        ticking = false;
      });
      ticking = true;
    }
  }

  // initially set positions
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => {
    // recalc startTop on resize
    items.forEach(item => {
      const rect = item.el.getBoundingClientRect();
      item.startTop = rect.top + window.scrollY;
      item.height = rect.height;
    });
    onScroll();
  });
})();

(() => {
  const heading = document.getElementById('heroHeading');
  if(!heading) return;

  let ticking = false;
  let lastProgress = 0;

  function updateColor(progress){
    // accelerate the progress so the color shift completes earlier while scrolling
    const accelerated = Math.min(1, progress * 2.5);
    // map accelerated progress to a pleasing green -> blue hue range
    // green ~150 -> blue ~210
    const hueStart = 150;
    const hueEnd = 210;
    const hue = Math.round(hueStart + (hueEnd - hueStart) * accelerated);
    // use slightly warm saturation and medium lightness for aesthetic tones
    heading.style.color = `hsl(${hue}, 68%, 45%)`;
  }

  function onScroll(){
    if(!ticking){
      window.requestAnimationFrame(() => {
        const doc = document.documentElement;
        const scrollTop = window.scrollY || doc.scrollTop || document.body.scrollTop || 0;
        const maxScroll = Math.max(1, (doc.scrollHeight - window.innerHeight));
        const progress = Math.min(1, Math.max(0, scrollTop / maxScroll));
        if(Math.abs(progress - lastProgress) > 0.002) {
          updateColor(progress);
          lastProgress = progress;
        }
        ticking = false;
      });
      ticking = true;
    }
  }

  updateColor(0);
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
})();