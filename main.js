// Animasi scroll masuk untuk elemen dengan class .animate-scroll
const scrollEls = document.querySelectorAll('.animate-scroll');
const animateOnScroll = () => {
  scrollEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if(rect.top < window.innerHeight - 60) {
      el.style.opacity = 1;
      el.style.transform = 'translateY(0)';
      el.style.transition = 'opacity 0.6s cubic-bezier(.48,.16,.23,1), transform 0.45s cubic-bezier(.48,.16,.23,1)';
    }
  });
}
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('DOMContentLoaded', () => {
  // Set initial style
  scrollEls.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(60px)';
  });
  animateOnScroll();

  // Produk card click: arahkan ke chat WA (atau tampilkan alert)
  document.querySelectorAll('.produk-card').forEach(card=>{
    card.onclick = function() {
      window.open('https://wa.me/6281318241171?text=Halo%20saya%20mau%20order:%20'+encodeURIComponent(card.querySelector('h3')?.textContent || ''),'_blank');
    };
  });

  // Live testimoni marquee pause on hover
  const marquee = document.getElementById('testimoni-marquee');
  if (marquee) {
    marquee.addEventListener('mouseenter', () => marquee.style.animationPlayState = 'paused');
    marquee.addEventListener('mouseleave', () => marquee.style.animationPlayState = 'running');
  }
});