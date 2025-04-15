const faqItems = document.querySelectorAll(".faq-right .item");

faqItems.forEach((item) => {
  item.addEventListener("click", toggleExpansion);
});
