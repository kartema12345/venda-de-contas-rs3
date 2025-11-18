// script.js - interações simples
document.addEventListener('DOMContentLoaded', () => {
  const buyButtons = document.querySelectorAll('.btn-buy');
  buyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const title = btn.dataset.title || 'Conta';
      const price = btn.dataset.price || '0';
      // exemplo simples de fluxo: alerta + abrir WhatsApp para finalizar
      const confirmed = confirm(`Comprar: ${title}\nPreço: R$ ${price}\n\nDeseja iniciar contato pelo WhatsApp?`);
      if (confirmed) {
        // substitua o número pelo seu
        const phone = '5511999999999';
        const text = encodeURIComponent(`Olá, quero comprar: ${title} (R$ ${price})`);
        window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
      }
    });
  });
});

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}
