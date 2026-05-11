// ================================================
//   PORTFÓLIO - POLIANA SILVA DE FRANÇA
//   Arquivo: script.js
//   Descrição: Interações e validações em JavaScript puro
// ================================================


// ================================================
// 1. MENU RESPONSIVO (hamburguer)
// Faz o menu aparecer/desaparecer em dispositivos móveis
// ================================================

const menuToggle = document.getElementById('menuToggle');
const navLinks   = document.getElementById('navLinks');

menuToggle.addEventListener('click', function() {
  navLinks.classList.toggle('aberto');
});

// Fecha o menu ao clicar em qualquer link
const todosOsLinks = document.querySelectorAll('.nav-links a');
todosOsLinks.forEach(function(link) {
  link.addEventListener('click', function() {
    navLinks.classList.remove('aberto');
  });
});


// ================================================
// 2. ALTERNADOR DE TEMA (claro / escuro)
// ================================================

const temaBtn = document.getElementById('temaBtn');

temaBtn.addEventListener('click', function() {
  document.body.classList.toggle('tema-escuro');

  if (document.body.classList.contains('tema-escuro')) {
    temaBtn.textContent = '☀️';
  } else {
    temaBtn.textContent = '🌙';
  }
});


// ================================================
// 3. VALIDAÇÃO DO FORMULÁRIO DE CONTATO
// Verifica os campos antes de simular o envio
// ================================================

const formulario = document.getElementById('formContato');

formulario.addEventListener('submit', function(evento) {
  evento.preventDefault();

  const nome     = document.getElementById('nome').value.trim();
  const email    = document.getElementById('email').value.trim();
  const mensagem = document.getElementById('mensagem').value.trim();

  // Limpa erros anteriores
  document.getElementById('erroNome').textContent     = '';
  document.getElementById('erroEmail').textContent    = '';
  document.getElementById('erroMensagem').textContent = '';

  let formularioValido = true;

  // Valida nome
  if (nome === '') {
    document.getElementById('erroNome').textContent = 'Por favor, informe seu nome.';
    formularioValido = false;
  }

  // Valida e-mail
  if (email === '') {
    document.getElementById('erroEmail').textContent = 'Por favor, informe seu e-mail.';
    formularioValido = false;
  } else {
    const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formatoEmail.test(email)) {
      document.getElementById('erroEmail').textContent = 'E-mail inválido. Use: usuario@dominio.com';
      formularioValido = false;
    }
  }

  // Valida mensagem
  if (mensagem === '') {
    document.getElementById('erroMensagem').textContent = 'Por favor, escreva sua mensagem.';
    formularioValido = false;
  }

  // Se válido: limpa campos e mostra sucesso
  if (formularioValido) {
    formulario.reset();
    const msgSucesso = document.getElementById('mensagemSucesso');
    msgSucesso.style.display = 'block';

    setTimeout(function() {
      msgSucesso.style.display = 'none';
    }, 5000);
  }
});


// ================================================
// 4. ROLAGEM SUAVE AO CLICAR NOS LINKS DO MENU
// ================================================

const linksAncora = document.querySelectorAll('a[href^="#"]');

linksAncora.forEach(function(link) {
  link.addEventListener('click', function(evento) {
    evento.preventDefault();

    const alvo = document.querySelector(this.getAttribute('href'));

    if (alvo) {
      const posicao = alvo.getBoundingClientRect().top + window.pageYOffset - 65;
      window.scrollTo({ top: posicao, behavior: 'smooth' });
    }
  });
});


// ================================================
// 5. EFEITO DIGITANDO NO TÍTULO
// Simula o texto sendo digitado letra por letra
// ================================================

const textoDigitando = 'Olá! Sou Poliana França 🎀';
const elementoTitulo = document.getElementById('titulo-digitando');
let indiceLetra = 0;

function digitar() {
  if (indiceLetra < textoDigitando.length) {
    elementoTitulo.textContent += textoDigitando.charAt(indiceLetra);
    indiceLetra++;
    setTimeout(digitar, 80);
  }
}

digitar();


// ================================================
// 6. FADE-IN AO ROLAR A PÁGINA
// Cards aparecem suavemente conforme o usuário rola
// ================================================

const todosOsCards = document.querySelectorAll('.card, .sobre-card, .projeto');
todosOsCards.forEach(function(card) {
  card.classList.add('fade-in');
});

const observador = new IntersectionObserver(function(entradas) {
  entradas.forEach(function(entrada) {
    if (entrada.isIntersecting) {
      entrada.target.classList.add('visivel');
    }
  });
}, { threshold: 0.15 });

todosOsCards.forEach(function(card) {
  observador.observe(card);
});


// ================================================
// 7. BARRAS DE HABILIDADES ANIMADAS
// Anima a largura das barras quando entram na tela
// ================================================

const barras = document.querySelectorAll('.barra-preenchimento');

const observadorBarras = new IntersectionObserver(function(entradas) {
  entradas.forEach(function(entrada) {
    if (entrada.isIntersecting) {
      const nivel = entrada.target.getAttribute('data-nivel');
      entrada.target.style.width = nivel + '%';
      observadorBarras.unobserve(entrada.target);
    }
  });
}, { threshold: 0.3 });

barras.forEach(function(barra) {
  observadorBarras.observe(barra);
});
