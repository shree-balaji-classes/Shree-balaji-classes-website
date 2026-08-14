document.addEventListener("DOMContentLoaded", () => {
  const cfg = window.ACADEMY_CONFIG || {};
  const $ = (id) => document.getElementById(id);

  function setText(id, value, fallback = "") {
    const el = $(id);
    if (el) el.textContent = value || fallback;
  }

 setText("academyName", cfg.academyName, "Shree Balaji Classes");
  setText("footerName", cfg.academyName, "Shree Balaji Classes");
  setText("footerYearName", cfg.academyName, "Shree Balaji Classes");
  setText("teacherName", cfg.teacherName, "Khushboo Agrawal");
  setText("teacherContact", cfg.teacherName, "Khushboo Agrawal");
  setText("address", cfg.address, "Infront of Rajput Boarding Shree Balaji classes, near priti city scan center, Shastri Nagar, Ratlam, Madhya Pradesh 457001");
  setText("whatsappDisplay", cfg.whatsapp, "9196606774424");
  setText("phoneDisplay", cfg.phone, "+919660674424");
  const teacherPhoto = document.getElementById("teacherPhoto");
  if (teacherPhoto) teacherPhoto.src = "assets/teacher.jpg";
  const mapLink = document.getElementById("mapLink");
  if (mapLink && cfg.mapsUrl) mapLink.href = cfg.mapsUrl;

  const cleanNumber = String(cfg.whatsapp || "").replace(/\D/g, "");
  const waUrl = (message) => {
    if (!cleanNumber || cleanNumber.includes("XXXXXXXX")) return null;
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
  };

  document.querySelectorAll(".whatsapp").forEach((el) => {
    el.addEventListener("click", (e) => {
      const url = waUrl(el.dataset.message || "Hello, I would like to know more about the academy.");
      if (!url) {
        e.preventDefault();
        alert("Please add the real WhatsApp number in config.js before publishing.");
        return;
      }
      el.href = url;
      el.target = "_blank";
      el.rel = "noopener";
    });
  });

  // Mobile navigation
  const menu = document.querySelector(".menu-toggle");
  const links = document.querySelector(".nav-links");
  menu?.addEventListener("click", () => links?.classList.toggle("open"));
  links?.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => links?.classList.remove("open"))
  );

  // Scroll reveal
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.12 });

  document.querySelectorAll("section, .reveal").forEach((el) => observer.observe(el));

  // Contact form -> WhatsApp
  const form = $("enquiryForm");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const message = [
      "Hello, I would like to enquire about the academy.",
      "",
      `Parent's Name: ${data.get("parent")}`,
      `Student's Name: ${data.get("student")}`,
      `Class: ${data.get("class")}`,
      `Interested In: ${data.get("service")}`,
      `Phone: ${data.get("phone")}`,
      `Message: ${data.get("message") || "—"}`
    ].join("\n");

    const url = waUrl(message);
    if (url) window.open(url, "_blank", "noopener");
    else alert("Please add the real WhatsApp number in config.js before publishing.");
  });

  // Gallery — one playful, unified gallery (no category tabs/bifurcations)
  const gallery = $("galleryGrid");
  if (gallery) {
    const items = [
      ["Moral Values Project", "assets/media/project-moral-values-1.jpg", "image"],
      ["Handwriting Practice", "assets/media/handwriting-practice-1.jpg", "image"],
      ["Project Making", "assets/media/project-making-1.jpg", "image"],
      ["Moral Values Project", "assets/media/project-moral-values-2.jpg", "image"],
      ["Dolphin Artwork", "assets/media/art-dolphin.jpg", "image"],
      ["Superhero Artwork", "assets/media/art-superhero.jpg", "image"],
      ["Nature & Animal Artwork", "assets/media/art-squirrel.jpg", "image"],
      ["Creative Lettering", "assets/media/art-name-lettering.jpg", "image"],
      ["Character Illustration", "assets/media/art-character-1.jpg", "image"],
      ["Sports Character Illustration", "assets/media/art-character-2.jpg", "image"],
      ["Creative Classes", "assets/media/summer-creative-classes-poster.jpg", "image"],
      ["Craft Creations", "assets/media/craft-creations-1.jpg", "image"],
      ["Craft Creations", "assets/media/craft-creations-2.jpg", "image"],
      ["Handmade Craft", "assets/media/handmade-rakhi-craft.jpg", "image"],
      ["Gift Box Craft", "assets/media/gift-box-craft.jpg", "image"],
      ["Kalakaarz 3.0 — Judge Recognition", "assets/media/kalakaar-judge-award.jpg", "image"],
      ["Creative Costume Activity", "assets/media/creative-umbrella-costume.jpg", "image"],
      ["Handwriting Practice", "assets/media/handwriting-practice-2.jpg", "image"],
      ["Group Learning", "assets/media/group-learning-moment.jpg", "image"],
      ["Rainbow of Nutrition Project", "assets/media/rainbow-of-nutrition-project.jpg", "image"],
      ["Latitude & Longitude Project", "assets/media/latitude-longitude-project.jpg", "image"],
      ["Art Workshop", "assets/media/art-workshop.jpg", "image"],
      ["Student Creations", "assets/media/student-creations-group.jpg", "image"],
      ["Classroom Activity", "assets/video-posters/classroom-activity-video.jpg", "video", "assets/media/classroom-activity-video.mp4"],
      ["Craft Activity", "assets/video-posters/craft-making-video.jpg", "video", "assets/media/craft-making-video.mp4"],
      ["Creative Project", "assets/video-posters/creative-project-video.jpg", "video", "assets/media/creative-project-video.mp4"],
      ["Student Learning", "assets/video-posters/student-learning-video.jpg", "video", "assets/media/student-learning-video.mp4"],
      ["Classroom Group", "assets/video-posters/classroom-group-video.jpg", "video", "assets/media/classroom-group-video.mp4"],
      ["Art Activity", "assets/video-posters/art-activity-video.jpg", "video", "assets/media/art-activity-video.mp4"]
    ];

    items.forEach(([label, src, type, videoSrc], i) => {
      const card = document.createElement("button");
      card.className = "gallery-photo";
      card.type = "button";
      card.style.setProperty("--i", i);
      card.innerHTML = `
        <img src="${src}" alt="${label}" loading="lazy">
        ${type === "video" ? '<span class="media-play">▶</span>' : ''}
        <span class="gallery-caption">${label}</span>
      `;
      card.addEventListener("click", () => {
        if (type === "video") openVideoLightbox(videoSrc, label, src);
        else openLightbox(src, label);
      });
      gallery.appendChild(card);
    });
  }

  // Lightbox
  function getOrCreateLightbox() {
    let box = $("lightbox");
    if (!box) {
      box = document.createElement("div");
      box.id = "lightbox";
      box.className = "lightbox";
      box.innerHTML = `
        <button class="lightbox-close" aria-label="Close">×</button>
        <img id="lightboxImage" alt="">
        <video id="lightboxVideo" controls playsinline></video>
        <div id="lightboxLabel"></div>
      `;
      document.body.appendChild(box);
      box.querySelector(".lightbox-close").addEventListener("click", () => {
        box.classList.remove("show");
        const v = $("lightboxVideo");
        if (v) { v.pause(); v.removeAttribute("src"); v.load(); }
      });
      box.addEventListener("click", (e) => {
        if (e.target === box) {
          box.classList.remove("show");
          const v = $("lightboxVideo");
          if (v) { v.pause(); v.removeAttribute("src"); v.load(); }
        }
      });
    }
    return box;
  }

  function openLightbox(src, label) {
    const box = getOrCreateLightbox();
    $("lightboxImage").style.display = "block";
    $("lightboxVideo").style.display = "none";
    $("lightboxImage").src = src;
    $("lightboxImage").alt = label;
    $("lightboxLabel").textContent = label;
    box.classList.add("show");
  }

  function openVideoLightbox(src, label, poster) {
    const box = getOrCreateLightbox();
    $("lightboxImage").style.display = "none";
    const video = $("lightboxVideo");
    video.style.display = "block";
    video.poster = poster || "";
    video.src = src;
    $("lightboxLabel").textContent = label;
    box.classList.add("show");
    video.play().catch(() => {});
  }

});
