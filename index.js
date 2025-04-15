const faqItems = document.querySelectorAll(".faq-right .item");
const list = document.querySelectorAll(".services-list-item-content");
const tradeLeft = document.querySelector(".trade .trade-controls-left");
const tradeRight = document.querySelector(".trade .trade-controls-right");
const stepContainer = document.querySelector(".steps");
const feedbackLeft = document.querySelector(".feedbacks .trade-controls-left");
const feedbackRight = document.querySelector(
  ".feedbacks .trade-controls-right"
);
const feedbackContainer = document.querySelector(".feedback");
const platformLeft = document.querySelector(".platforms .trade-controls-left");
const platformRight = document.querySelector(
  ".platforms .trade-controls-right"
);
const platformContainer = document.querySelector(".platform");
const joinVideos = document.querySelectorAll(".join-section-video");

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => addIframe(entry, observer));
});

const steps = { count: 0 };
const feedback = { count: 0 };
const platform = { count: 0 };

function createIframe(item) {
  const iframe = document.createElement("iframe");
  iframe.src = item.dataset.src;
  iframe.allow =
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;";
  iframe.referrerPolicy = "strict-origin-when-cross-origin";
  iframe.allowFullscreen = true;

  return iframe;
}

function addIframe(entry, observer) {
  if (entry.isIntersecting) {
    const item = entry.target;

    const iframe = createIframe(item);

    item.innerHTML = "";
    item.appendChild(iframe);

    observer.unobserve(item);
  }
}

function goAhead(counter, container, isPlatform = false) {
  const { innerWidth } = window;
  let max;

  if (innerWidth > 992) {
    max = isPlatform ? 0 : 3;
  } else if (innerWidth > 768) {
    max = isPlatform ? 1 : 4;
  } else {
    max = isPlatform ? 2 : 5;
  }

  if (counter.count === max) return;

  counter.count++;

  const element = container.children[0];
  const { width } = element.getBoundingClientRect();

  container.style.transform = `translateX(-${(width + 30) * counter.count}px)`;
}

function goBack(counter, container) {
  if (counter.count === 0) return;

  counter.count--;

  const element = container.children[0];
  const { width } = element.getBoundingClientRect();

  if (counter.count === 0) {
    container.style.transform = `translateX(0)`;
  } else {
    container.style.transform = `translateX(-${
      (width + 30) * counter.count
    }px)`;
  }
}

faqItems.forEach((item) => {
  item.addEventListener("click", toggleExpansion);
});

tradeLeft.addEventListener("click", () => goBack(steps, stepContainer));
tradeRight.addEventListener("click", () => goAhead(steps, stepContainer));

feedbackLeft.addEventListener("click", () =>
  goBack(feedback, feedbackContainer)
);
feedbackRight.addEventListener("click", () =>
  goAhead(feedback, feedbackContainer)
);

platformLeft.addEventListener("click", () =>
  goBack(platform, platformContainer)
);
platformRight.addEventListener("click", () =>
  goAhead(platform, platformContainer, true)
);

list.forEach((item) => observer.observe(item));

joinVideos.forEach((item) =>
  item.addEventListener("click", () => {
    const iframe = createIframe(item);

    item.innerHTML = "";
    item.appendChild(iframe);
  })
);
