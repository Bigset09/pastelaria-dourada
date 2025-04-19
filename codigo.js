import { config } from './config.js';
import gsap from 'gsap';
import ScrollTrigger from 'ScrollTrigger';

// Registrar plugin GSAP
gsap.registerPlugin(ScrollTrigger);

// Carrinho de compras
const cart = {
  items: [],
  
  // Adicionar item ao carrinho
  addItem(item, quantity = 1) {
    const existingItem = this.items.find(i => i.id === item.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({
        ...item,
        quantity
      });
    }
    
    this.updateCart();
    this.saveCart();
    
    // Mostrar notificação
    showNotification('success', `${item.name} adicionado ao carrinho!`);
  },
  
  // Remover item do carrinho
  removeItem(itemId) {
    this.items = this.items.filter(item => item.id !== itemId);
    this.updateCart();
    this.saveCart();
  },
  
  // Atualizar quantidade de um item
  updateQuantity(itemId, quantity) {
    const item = this.items.find(i => i.id === itemId);
    
    if (item) {
      if (quantity <= 0) {
        this.removeItem(itemId);
      } else {
        item.quantity = quantity;
        this.updateCart();
        this.saveCart();
      }
    }
  },
  
  // Calcular o subtotal
  getSubtotal() {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  },
  
  // Calcular a taxa de entrega
  getDeliveryFee() {
    const subtotal = this.getSubtotal();
    if (subtotal >= config.order.freeDeliveryOver || subtotal === 0) {
      return 0;
    }
    return config.order.deliveryFee;
  },
  
  // Calcular o total
  getTotal() {
    return this.getSubtotal() + this.getDeliveryFee();
  },
  
  // Obter o número de itens no carrinho
  getItemCount() {
    return this.items.reduce((count, item) => count + item.quantity, 0);
  },
  
  // Atualizar a exibição do carrinho na UI
  updateCart() {
    // Atualizar contador do carrinho
    const cartCount = document.querySelector('.cart-count');
    cartCount.textContent = this.getItemCount();
    
    // Atualizar carrinho lateral
    this.updateCartSidebar();
    
    // Atualizar carrinho da página de pedidos
    this.updateOrderCart();
  },
  
  // Atualizar o carrinho lateral
  updateCartSidebar() {
    const cartList = document.querySelector('.cart-sidebar .cart-list');
    const emptyMessage = document.querySelector('.cart-sidebar .cart-empty-message');
    const totalPrice = document.querySelector('.cart-sidebar .total-price');
    
    // Limpar conteúdo atual
    cartList.innerHTML = '';
    
    // Verificar se o carrinho está vazio
    if (this.items.length === 0) {
      emptyMessage.style.display = 'block';
      cartList.style.display = 'none';
    } else {
      emptyMessage.style.display = 'none';
      cartList.style.display = 'block';
      
      // Adicionar itens ao carrinho
      this.items.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
          <div class="cart-item-image" style="background-image: url('${item.image}')"></div>
          <div class="cart-item-details">
            <div class="cart-item-title">${item.name}</div>
            <div class="cart-item-price">R$ ${item.price.toFixed(2)}</div>
          </div>
          <div class="cart-item-quantity">
            <button class="quantity-btn decrease">-</button>
            <span class="quantity-value">${item.quantity}</span>
            <button class="quantity-btn increase">+</button>
          </div>
          <button class="cart-item-remove"><i class="bi bi-trash"></i></button>
        `;
        
        // Adicionar event listeners
        const decreaseBtn = cartItem.querySelector('.decrease');
        const increaseBtn = cartItem.querySelector('.increase');
        const removeBtn = cartItem.querySelector('.cart-item-remove');
        
        decreaseBtn.addEventListener('click', () => {
          this.updateQuantity(item.id, item.quantity - 1);
        });
        
        increaseBtn.addEventListener('click', () => {
          this.updateQuantity(item.id, item.quantity + 1);
        });
        
        removeBtn.addEventListener('click', () => {
          this.removeItem(item.id);
        });
        
        cartList.appendChild(cartItem);
      });
    }
    
    // Atualizar total
    totalPrice.textContent = `R$ ${this.getTotal().toFixed(2)}`;
  },
  
  // Atualizar o carrinho na seção de pedidos
  updateOrderCart() {
    const cartItemsSection = document.querySelector('.order-step-content.step-1 .cart-items');
    if (!cartItemsSection) return;
    
    const cartList = cartItemsSection.querySelector('.cart-list');
    const emptyMessage = cartItemsSection.querySelector('.cart-empty-message');
    const totalItems = cartItemsSection.querySelector('.cart-total-items');
    const subtotalEl = document.querySelector('.order-step-content.step-1 .subtotal .price');
    const taxEl = document.querySelector('.order-step-content.step-1 .tax .price');
    const totalEl = document.querySelector('.order-step-content.step-1 .total .price');
    const continueBtn = document.querySelector('.order-step-content.step-1 .next-step');
    
    // Limpar conteúdo atual
    cartList.innerHTML = '';
    
    // Atualizar contador de itens
    totalItems.textContent = `(${this.getItemCount()} itens)`;
    
    // Verificar se o carrinho está vazio
    if (this.items.length === 0) {
      emptyMessage.style.display = 'block';
      cartList.style.display = 'none';
      continueBtn.disabled = true;
    } else {
      emptyMessage.style.display = 'none';
      cartList.style.display = 'block';
      continueBtn.disabled = false;
      
      // Adicionar itens ao carrinho
      this.items.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
          <div class="cart-item-image" style="background-image: url('${item.image}')"></div>
          <div class="cart-item-details">
            <div class="cart-item-title">${item.name}</div>
            <div class="cart-item-price">R$ ${item.price.toFixed(2)} x ${item.quantity} = R$ ${(item.price * item.quantity).toFixed(2)}</div>
          </div>
          <div class="cart-item-quantity">
            <button class="quantity-btn decrease">-</button>
            <span class="quantity-value">${item.quantity}</span>
            <button class="quantity-btn increase">+</button>
          </div>
          <button class="cart-item-remove"><i class="bi bi-trash"></i></button>
        `;
        
        // Adicionar event listeners
        const decreaseBtn = cartItem.querySelector('.decrease');
        const increaseBtn = cartItem.querySelector('.increase');
        const removeBtn = cartItem.querySelector('.cart-item-remove');
        
        decreaseBtn.addEventListener('click', () => {
          this.updateQuantity(item.id, item.quantity - 1);
        });
        
        increaseBtn.addEventListener('click', () => {
          this.updateQuantity(item.id, item.quantity + 1);
        });
        
        removeBtn.addEventListener('click', () => {
          this.removeItem(item.id);
        });
        
        cartList.appendChild(cartItem);
      });
    }
    
    // Atualizar totais
    subtotalEl.textContent = `R$ ${this.getSubtotal().toFixed(2)}`;
    taxEl.textContent = `R$ ${this.getDeliveryFee().toFixed(2)}`;
    totalEl.textContent = `R$ ${this.getTotal().toFixed(2)}`;
    
    // Atualizar resumo do pedido (se estivermos no passo 3)
    this.updateOrderSummary();
  },
  
  // Atualizar o resumo do pedido no passo 3
  updateOrderSummary() {
    const summaryItemsSection = document.querySelector('.order-step-content.step-3 .summary-items');
    if (!summaryItemsSection) return;
    
    // Limpar conteúdo atual
    summaryItemsSection.innerHTML = '';
    
    // Adicionar itens ao resumo
    this.items.forEach(item => {
      const summaryItem = document.createElement('div');
      summaryItem.className = 'summary-item';
      summaryItem.innerHTML = `
        <div class="summary-item-name">
          <span class="summary-item-quantity">${item.quantity}x</span>
          <span>${item.name}</span>
        </div>
        <div class="summary-item-price">R$ ${(item.price * item.quantity).toFixed(2)}</div>
      `;
      
      summaryItemsSection.appendChild(summaryItem);
    });
    
    // Atualizar totais no resumo
    const subtotalEl = document.querySelector('.order-step-content.step-3 .subtotal .price');
    const taxEl = document.querySelector('.order-step-content.step-3 .tax .price');
    const totalEl = document.querySelector('.order-step-content.step-3 .total .price');
    
    if (subtotalEl && taxEl && totalEl) {
      subtotalEl.textContent = `R$ ${this.getSubtotal().toFixed(2)}`;
      taxEl.textContent = `R$ ${this.getDeliveryFee().toFixed(2)}`;
      totalEl.textContent = `R$ ${this.getTotal().toFixed(2)}`;
    }
  },
  
  // Salvar carrinho no localStorage
  saveCart() {
    localStorage.setItem('pastelCart', JSON.stringify(this.items));
  },
  
  // Carregar carrinho do localStorage
  loadCart() {
    const savedCart = localStorage.getItem('pastelCart');
    if (savedCart) {
      this.items = JSON.parse(savedCart);
      this.updateCart();
    }
  },
  
  // Limpar carrinho
  clearCart() {
    this.items = [];
    this.updateCart();
    this.saveCart();
  }
};

// Função para mostrar notificações
function showNotification(type, message) {
  const notification = document.getElementById('notification');
  const messageEl = notification.querySelector('.notification-message');
  const iconEl = notification.querySelector('.notification-icon');
  
  // Definir ícone baseado no tipo
  let icon = '';
  switch (type) {
    case 'success':
      icon = 'bi-check-circle-fill';
      break;
    case 'error':
      icon = 'bi-exclamation-circle-fill';
      break;
    case 'warning':
      icon = 'bi-exclamation-triangle-fill';
      break;
    case 'info':
      icon = 'bi-info-circle-fill';
      break;
    default:
      icon = 'bi-bell-fill';
  }
  
  // Definir conteúdo e classe
  iconEl.className = `notification-icon bi ${icon}`;
  messageEl.textContent = message;
  notification.className = `notification ${type} show`;
  
  // Fechar automaticamente após 3 segundos
  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
  
  // Adicionar event listener ao botão de fechar
  const closeBtn = notification.querySelector('.notification-close');
  closeBtn.addEventListener('click', () => {
    notification.classList.remove('show');
  });
}

// Navegação mobile
function setupMobileNav() {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  const overlay = document.querySelector('.overlay');
  
  if (!mobileMenuToggle) return;
  
  mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    mainNav.classList.toggle('active');
    overlay.classList.toggle('open');
    document.body.classList.toggle('no-scroll');
  });
  
  // Fechar menu ao clicar em um link
  const navLinks = mainNav.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuToggle.classList.remove('active');
      mainNav.classList.remove('active');
      overlay.classList.remove('open');
      document.body.classList.remove('no-scroll');
    });
  });
  
  // Fechar menu ao clicar no overlay
  overlay.addEventListener('click', () => {
    mobileMenuToggle.classList.remove('active');
    mainNav.classList.remove('active');
    overlay.classList.remove('open');
    document.body.classList.remove('no-scroll');
  });
}

// Carrinho lateral
function setupCartSidebar() {
  const cartButton = document.querySelector('.cart-button');
  const cartSidebar = document.querySelector('.cart-sidebar');
  const closeCart = document.querySelector('.close-cart');
  const overlay = document.querySelector('.overlay');
  
  cartButton.addEventListener('click', () => {
    cartSidebar.classList.add('open');
    overlay.classList.add('open');
    document.body.classList.add('no-scroll');
  });
  
  closeCart.addEventListener('click', () => {
    cartSidebar.classList.remove('open');
    overlay.classList.remove('open');
    document.body.classList.remove('no-scroll');
  });
  
  overlay.addEventListener('click', () => {
    cartSidebar.classList.remove('open');
    overlay.classList.remove('open');
    document.body.classList.remove('no-scroll');
  });
  
  // Checkout button
  const checkoutBtn = document.querySelector('.checkout-btn');
  checkoutBtn.addEventListener('click', () => {
    cartSidebar.classList.remove('open');
    overlay.classList.remove('open');
    document.body.classList.remove('no-scroll');
  });
}

// Modal de produto
function setupProductModal() {
  const modal = document.getElementById('item-modal');
  const closeModal = modal.querySelector('.modal-close');
  const overlay = document.querySelector('.overlay');
  
  // Fechar modal ao clicar no botão
  closeModal.addEventListener('click', () => {
    modal.classList.remove('open');
    overlay.classList.remove('open');
    document.body.classList.remove('no-scroll');
  });
  
  // Fechar modal ao clicar no overlay
  overlay.addEventListener('click', () => {
    modal.classList.remove('open');
    overlay.classList.remove('open');
    document.body.classList.remove('no-scroll');
  });
}

// Abre o modal com os detalhes do produto
function openProductModal(product) {
  const modal = document.getElementById('item-modal');
  const modalBody = modal.querySelector('.modal-body');
  const overlay = document.querySelector('.overlay');
  
  // Preencher conteúdo
  modalBody.innerHTML = `
    <div class="modal-item">
      <div class="modal-item-header">
        <div class="modal-item-image" style="background-image: url('${product.image}')"></div>
        <div class="modal-item-info">
          <h3 class="modal-item-title">${product.name}</h3>
          <div class="modal-item-price">R$ ${product.price.toFixed(2)}</div>
          <p class="modal-item-description">${product.description}</p>
          
          ${product.ingredients && product.ingredients.length > 0 ? `
            <div class="modal-item-details">
              <div class="details-title">Ingredientes:</div>
              <ul class="details-list">
                ${product.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
          
          ${product.nutritionalInfo ? `
            <div class="modal-item-details">
              <div class="details-title">Informações Nutricionais:</div>
              <p>${product.nutritionalInfo}</p>
            </div>
          ` : ''}
          
          <div class="modal-item-quantity">
            <label for="modal-quantity">Quantidade:</label>
            <div class="cart-item-quantity">
              <button class="quantity-btn decrease">-</button>
              <span class="quantity-value">1</span>
              <button class="quantity-btn increase">+</button>
            </div>
          </div>
          
          <button class="btn btn-primary modal-add-to-cart">
            <i class="bi bi-cart-plus"></i> Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </div>
  `;
  
  // Configurar controles de quantidade
  const quantityValue = modalBody.querySelector('.quantity-value');
  const decreaseBtn = modalBody.querySelector('.decrease');
  const increaseBtn = modalBody.querySelector('.increase');
  const addToCartBtn = modalBody.querySelector('.modal-add-to-cart');
  
  let quantity = 1;
  
  decreaseBtn.addEventListener('click', () => {
    if (quantity > 1) {
      quantity--;
      quantityValue.textContent = quantity;
    }
  });
  
  increaseBtn.addEventListener('click', () => {
    quantity++;
    quantityValue.textContent = quantity;
  });
  
  addToCartBtn.addEventListener('click', () => {
    cart.addItem(product, quantity);
    modal.classList.remove('open');
    overlay.classList.remove('open');
    document.body.classList.remove('no-scroll');
  });
  
  // Abrir modal
  modal.classList.add('open');
  overlay.classList.add('open');
  document.body.classList.add('no-scroll');
}

// Slider dos destaques
function setupHighlightsSlider() {
  const slidesContainer = document.querySelector('.slides-container');
  const prevSlide = document.querySelector('.prev-slide');
  const nextSlide = document.querySelector('.next-slide');
  
  if (!slidesContainer || !prevSlide || !nextSlide) return;
  
  let currentSlide = 0;
  const highlights = config.highlights;
  
  // Criar slides
  highlights.forEach((highlight, index) => {
    const slide = document.createElement('div');
    slide.className = 'slide';
    slide.dataset.index = index;
    
    slide.innerHTML = `
      <div class="slide-image">
        <img src="${highlight.image}" alt="${highlight.name}">
      </div>
      <div class="slide-content">
        <h3>${highlight.name}</h3>
        <p>${highlight.description}</p>
        <div class="slide-price">R$ ${highlight.price.toFixed(2)}</div>
        <button class="btn btn-primary add-to-cart-highlight" data-id="${highlight.id}">
          <i class="bi bi-cart-plus"></i> Adicionar ao Carrinho
        </button>
      </div>
    `;
    
    slidesContainer.appendChild(slide);
  });
  
  const slides = slidesContainer.querySelectorAll('.slide');
  if (slides.length === 0) return;
  
  // Configurar slides
  function updateSlides() {
    slides.forEach((slide, index) => {
      if (index === currentSlide) {
        slide.style.transform = 'translateX(0)';
        slide.style.opacity = '1';
        slide.style.zIndex = '1';
      } else if (index < currentSlide) {
        slide.style.transform = 'translateX(-100%)';
        slide.style.opacity = '0';
        slide.style.zIndex = '0';
      } else {
        slide.style.transform = 'translateX(100%)';
        slide.style.opacity = '0';
        slide.style.zIndex = '0';
      }
    });
  }
  
  updateSlides();
  
  // Controles do slider
  prevSlide.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlides();
  });
  
  nextSlide.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlides();
  });
  
  // Auto slide a cada 5 segundos
  let slideInterval = setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlides();
  }, 5000);
  
  // Pausar o intervalo quando o mouse estiver sobre o slider
  slidesContainer.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
  });
  
  // Retomar o intervalo quando o mouse sair do slider
  slidesContainer.addEventListener('mouseleave', () => {
    slideInterval = setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length;
      updateSlides();
    }, 5000);
  });
  
  // Adicionar ao carrinho
  const addToCartButtons = slidesContainer.querySelectorAll('.add-to-cart-highlight');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const id = e.target.dataset.id || e.target.parentElement.dataset.id;
      const highlight = config.highlights.find(h => h.id === id);
      
      if (highlight) {
        cart.addItem(highlight);
      }
    });
  });
}

// Cardápio e filtros
function setupMenu() {
  const menuItems = document.querySelector('.menu-items');
  const filterButtons = document.querySelectorAll('.filter-btn');
  
  if (!menuItems) return;
  
  // Gerar itens do menu
  function generateMenuItems(category = 'todos') {
    // Limpar conteúdo anterior
    menuItems.innerHTML = '';
    
    // Filtrar itens
    const filteredItems = category === 'todos' 
      ? config.menu 
      : config.menu.filter(item => item.category === category);
    
    // Verificar se há itens para exibir
    if (filteredItems.length === 0) {
      menuItems.innerHTML = '<div class="empty-menu">Nenhum item encontrado nesta categoria.</div>';
      return;
    }
    
    // Gerar HTML para cada item
    filteredItems.forEach(item => {
      const menuItem = document.createElement('div');
      menuItem.className = 'menu-item';
      menuItem.dataset.category = item.category;
      
      menuItem.innerHTML = `
        <div class="menu-item-image">
          <img src="${item.image}" alt="${item.name}">
          ${item.tags && item.tags.length > 0 ? `
            <div class="menu-item-tag">${item.tags[0]}</div>
          ` : ''}
        </div>
        <div class="menu-item-content">
          <div class="menu-item-header">
            <h3 class="menu-item-title">${item.name}</h3>
            <div class="menu-item-price">R$ ${item.price.toFixed(2)}</div>
          </div>
          <p class="menu-item-description">${item.description}</p>
          <div class="menu-item-actions">
            <button class="add-to-cart" data-id="${item.id}">
              <i class="bi bi-cart-plus"></i> Adicionar
            </button>
            <button class="view-item" data-id="${item.id}">Ver detalhes</button>
          </div>
        </div>
      `;
      
      menuItems.appendChild(menuItem);
    });
    
    // Adicionar event listeners para os botões
    const addToCartButtons = menuItems.querySelectorAll('.add-to-cart');
    const viewItemButtons = menuItems.querySelectorAll('.view-item');
    
    addToCartButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const id = e.target.dataset.id || e.target.parentElement.dataset.id;
        const item = config.menu.find(i => i.id === id);
        
        if (item) {
          cart.addItem(item);
        }
      });
    });
    
    viewItemButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        const item = config.menu.find(i => i.id === id);
        
        if (item) {
          openProductModal(item);
        }
      });
    });
  }
  
  // Gerar menu inicial - Garantir que o menu seja gerado imediatamente
  generateMenuItems();
  
  // Configurar filtros
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remover classe active de todos os botões
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Adicionar classe active ao botão clicado
      button.classList.add('active');
      
      // Filtrar itens
      const category = button.dataset.filter;
      generateMenuItems(category);
    });
  });
}

// Configurar slider de depoimentos
function setupTestimonials() {
  const testimonialsContainer = document.querySelector('.testimonials-container');
  const dotContainer = document.querySelector('.testimonials-dots');
  
  if (!testimonialsContainer) return;
  
  const testimonials = config.testimonials;
  let currentTestimonial = 0;
  
  // Criar depoimentos
  testimonials.forEach((testimonial, index) => {
    const testimonialEl = document.createElement('div');
    testimonialEl.className = `testimonial ${index === 0 ? 'active' : ''}`;
    
    testimonialEl.innerHTML = `
      <div class="testimonial-text">${testimonial.text}</div>
      <div class="testimonial-author">
        <div class="author-image">
          <i class="bi bi-person"></i>
        </div>
        <div class="author-name">${testimonial.name}</div>
        <div class="author-rating">
          ${'★'.repeat(testimonial.rating)}${'☆'.repeat(5 - testimonial.rating)}
        </div>
      </div>
    `;
    
    testimonialsContainer.appendChild(testimonialEl);
    
    // Criar dots de navegação
    const dot = document.createElement('div');
    dot.className = `dot ${index === 0 ? 'active' : ''}`;
    dot.dataset.index = index;
    
    dotContainer.appendChild(dot);
  });
  
  // Configurar navegação por dots
  const dots = dotContainer.querySelectorAll('.dot');
  const testimonialElements = testimonialsContainer.querySelectorAll('.testimonial');
  
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const index = parseInt(dot.dataset.index);
      
      // Atualizar dot ativo
      dots.forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
      
      // Atualizar depoimento ativo
      testimonialElements.forEach(t => t.classList.remove('active'));
      testimonialElements[index].classList.add('active');
      
      currentTestimonial = index;
    });
  });
  
  // Auto-rotação a cada 5 segundos
  setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    
    // Atualizar dot ativo
    dots.forEach(d => d.classList.remove('active'));
    dots[currentTestimonial].classList.add('active');
    
    // Atualizar depoimento ativo
    testimonialElements.forEach(t => t.classList.remove('active'));
    testimonialElements[currentTestimonial].classList.add('active');
  }, 5000);
}

// Configurar seção de pedidos
function setupOrderSection() {
  const orderSteps = document.querySelectorAll('.order-steps .step');
  const stepContents = document.querySelectorAll('.order-step-content');
  const nextButtons = document.querySelectorAll('.next-step');
  const prevButtons = document.querySelectorAll('.prev-step');
  const placeOrderButton = document.querySelector('.place-order');
  
  if (!orderSteps.length) return;
  
  // Navegar para o próximo passo
  nextButtons.forEach(button => {
    button.addEventListener('click', () => {
      const nextStep = parseInt(button.dataset.next);
      
      // Atualizar passos ativos
      orderSteps.forEach(step => {
        const stepNum = parseInt(step.dataset.step);
        if (stepNum <= nextStep) {
          step.classList.add('active');
        } else {
          step.classList.remove('active');
        }
      });
      
      // Atualizar conteúdo ativo
      stepContents.forEach(content => {
        content.classList.remove('active');
      });
      
      document.querySelector(`.step-${nextStep}`).classList.add('active');
      
      // Se for o último passo, atualizar o resumo
      if (nextStep === 3) {
        updateDeliverySummary();
      }
      
      // Scroll para o topo da seção
      document.querySelector('.order-form-container').scrollIntoView({ behavior: 'smooth' });
    });
  });
  
  // Navegar para o passo anterior
  prevButtons.forEach(button => {
    button.addEventListener('click', () => {
      const prevStep = parseInt(button.dataset.prev);
      
      // Atualizar passos ativos
      orderSteps.forEach(step => {
        const stepNum = parseInt(step.dataset.step);
        if (stepNum < prevStep) {
          step.classList.add('active');
        } else {
          step.classList.remove('active');
        }
      });
      
      // Atualizar conteúdo ativo
      stepContents.forEach(content => {
        content.classList.remove('active');
      });
      
      document.querySelector(`.step-${prevStep}`).classList.add('active');
      
      // Scroll para o topo da seção
      document.querySelector('.order-form-container').scrollIntoView({ behavior: 'smooth' });
    });
  });
  
  // Configurar alternância entre entrega e retirada
  const deliveryMethodRadios = document.querySelectorAll('input[name="deliveryMethod"]');
  const deliveryAddress = document.querySelector('.delivery-address');
  const pickupDetails = document.querySelector('.pickup-details');
  
  deliveryMethodRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      if (radio.value === 'delivery') {
        deliveryAddress.style.display = 'block';
        pickupDetails.style.display = 'none';
      } else {
        deliveryAddress.style.display = 'none';
        pickupDetails.style.display = 'block';
      }
    });
  });
  
  // Configurar alternância da opção de troco
  const paymentMethodRadios = document.querySelectorAll('input[name="paymentMethod"]');
  const changeAmount = document.querySelector('.change-amount');
  
  paymentMethodRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      if (radio.value === 'cash') {
        changeAmount.style.display = 'block';
      } else {
        changeAmount.style.display = 'none';
      }
    });
  });
  
  // Preencher opções de horário para retirada
  const pickupTimeSelect = document.getElementById('pickup-time');
  
  if (pickupTimeSelect) {
    config.order.pickupTimeOptions.forEach(time => {
      const option = document.createElement('option');
      option.value = time;
      option.textContent = time;
      pickupTimeSelect.appendChild(option);
    });
  }
  
  // Atualizar resumo do pedido
  function updateDeliverySummary() {
    const deliverySummary = document.querySelector('.delivery-summary');
    const paymentSummary = document.querySelector('.payment-summary');
    
    if (!deliverySummary || !paymentSummary) return;
    
    // Obter método de entrega
    const deliveryMethod = document.querySelector('input[name="deliveryMethod"]:checked').value;
    
    if (deliveryMethod === 'delivery') {
      // Entrega
      const name = document.getElementById('name').value;
      const phone = document.getElementById('phone').value;
      const address = document.getElementById('address').value;
      const number = document.getElementById('number').value;
      const complement = document.getElementById('complement').value;
      const neighborhood = document.getElementById('neighborhood').value;
      const city = document.getElementById('city').value;
      const zipcode = document.getElementById('zipcode').value;
      const instructions = document.getElementById('instructions').value;
      
      deliverySummary.innerHTML = `
        <p><strong>Método:</strong> Entrega</p>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Telefone:</strong> ${phone}</p>
        <p><strong>Endereço:</strong> ${address}, ${number}${complement ? ` - ${complement}` : ''}</p>
        <p><strong>Bairro:</strong> ${neighborhood}</p>
        <p><strong>Cidade:</strong> ${city}</p>
        <p><strong>CEP:</strong> ${zipcode}</p>
        ${instructions ? `<p><strong>Instruções:</strong> ${instructions}</p>` : ''}
      `;
    } else {
      // Retirada
      const name = document.getElementById('pickup-name').value;
      const phone = document.getElementById('pickup-phone').value;
      const time = document.getElementById('pickup-time').value;
      
      deliverySummary.innerHTML = `
        <p><strong>Método:</strong> Retirada na loja</p>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Telefone:</strong> ${phone}</p>
        <p><strong>Horário de retirada:</strong> ${time}</p>
        <p><strong>Endereço da loja:</strong> ${config.store.address.street}, ${config.store.address.number}</p>
        <p><strong>Bairro:</strong> ${config.store.address.neighborhood}</p>
        <p><strong>Cidade:</strong> ${config.store.address.city}</p>
      `;
    }
    
    // Obter método de pagamento
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    let paymentText = '';
    
    switch (paymentMethod) {
      case 'credit':
        paymentText = 'Cartão de Crédito';
        break;
      case 'debit':
        paymentText = 'Cartão de Débito';
        break;
      case 'cash':
        const change = document.getElementById('change').value || 'Sem troco';
        paymentText = `Dinheiro - Troco para: ${change}`;
        break;
      case 'pix':
        paymentText = 'PIX';
        break;
    }
    
    paymentSummary.innerHTML = `
      <p><strong>Forma de pagamento:</strong> ${paymentText}</p>
    `;
  }
  
  // Configurar finalização do pedido
  if (placeOrderButton) {
    placeOrderButton.addEventListener('click', () => {
      // Validar que há itens no carrinho
      if (cart.items.length === 0) {
        showNotification('error', 'Seu carrinho está vazio. Adicione itens para continuar.');
        return;
      }
      
      // Preparar dados do pedido para envio por email
      const orderData = {
        to: "derikossman6@gmail.com",
        items: cart.items,
        subtotal: cart.getSubtotal(),
        deliveryFee: cart.getDeliveryFee(),
        total: cart.getTotal(),
        // Obter informações de entrega dependendo do método selecionado
        deliveryMethod: document.querySelector('input[name="deliveryMethod"]:checked').value,
        deliveryInfo: document.querySelector('input[name="deliveryMethod"]:checked').value === 'delivery' 
          ? {
              name: document.getElementById('name').value,
              phone: document.getElementById('phone').value,
              address: document.getElementById('address').value,
              number: document.getElementById('number').value,
              complement: document.getElementById('complement').value,
              neighborhood: document.getElementById('neighborhood').value,
              city: document.getElementById('city').value,
              zipcode: document.getElementById('zipcode').value,
              instructions: document.getElementById('instructions').value
            }
          : {
              name: document.getElementById('pickup-name').value,
              phone: document.getElementById('pickup-phone').value,
              pickupTime: document.getElementById('pickup-time').value
            },
        paymentMethod: document.querySelector('input[name="paymentMethod"]:checked').value,
        change: document.getElementById('change').value
      };
      
      // Simulação de envio de email - em produção, isso seria um fetch para um endpoint de e-mail
      console.log("Enviando pedido para:", orderData.to, orderData);
      
      // Simular envio do pedido
      placeOrderButton.textContent = 'Processando...';
      placeOrderButton.disabled = true;
      
      setTimeout(() => {
        // Limpar carrinho
        cart.clearCart();
        
        // Mostrar mensagem de sucesso
        showNotification('success', 'Seu pedido foi enviado com sucesso! Em breve entraremos em contato.');
        
        // Redirecionar para o início
        setTimeout(() => {
          window.location.href = '#inicio';
          
          // Voltar para o passo 1
          orderSteps.forEach(step => {
            const stepNum = parseInt(step.dataset.step);
            if (stepNum === 1) {
              step.classList.add('active');
            } else {
              step.classList.remove('active');
            }
          });
          
          stepContents.forEach(content => {
            content.classList.remove('active');
          });
          
          document.querySelector(`.step-1`).classList.add('active');
          
          // Resetar formulário
          document.getElementById('delivery-form').reset();
          
          // Restaurar botão
          placeOrderButton.textContent = 'Finalizar pedido';
          placeOrderButton.disabled = false;
        }, 1000);
      }, 2000);
    });
  }
}

// Botão voltar ao topo
function setupBackToTop() {
  const backToTopButton = document.querySelector('.back-to-top');
  
  if (!backToTopButton) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopButton.classList.add('show');
    } else {
      backToTopButton.classList.remove('show');
    }
  });
}

// Formulário de contato
function setupContactForm() {
  const contactForm = document.getElementById('contact-form');
  
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Obter dados do formulário
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const subject = document.getElementById('contact-subject').value;
    const message = document.getElementById('contact-message').value;
    
    // Validar dados (simulação)
    if (!name || !email || !subject || !message) {
      showNotification('error', 'Por favor, preencha todos os campos do formulário.');
      return;
    }
    
    // Simular envio
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;
    
    // Preparar dados para envio
    const emailData = {
      to: "derikossman6@gmail.com",
      name: name,
      email: email,
      subject: subject,
      message: message
    };
    
    // Simulação de envio de email - em produção, isso seria um fetch para um endpoint de e-mail
    console.log("Enviando email para:", emailData.to, emailData);
    
    setTimeout(() => {
      // Mostrar mensagem de sucesso
      showNotification('success', 'Sua mensagem foi enviada com sucesso! Retornaremos em breve.');
      
      // Resetar formulário
      contactForm.reset();
      
      // Restaurar botão
      submitBtn.textContent = 'Enviar Mensagem';
      submitBtn.disabled = false;
    }, 1500);
  });
}

// Configurar mapa e funcionalidades de localização
function setupMap() {
  const mapContainer = document.getElementById('google-map');
  const searchInput = document.getElementById('map-search-input');
  const searchBtn = document.getElementById('map-search-btn');
  const locateBtn = document.getElementById('map-locate-btn');
  
  if (!mapContainer) return;
  
  // Verificar se a API do Google Maps está carregada
  if (typeof google === 'undefined' || typeof google.maps === 'undefined') {
    console.error("Google Maps API não carregou corretamente");
    
    // Exibir mapa estático com mensagem de erro e coordenadas fixas
    mapContainer.innerHTML = `
      <div style="text-align:center; padding: 2rem; height: 100%; display: flex; flex-direction: column; justify-content: center; background-color: #f5f9ff; border-radius: var(--border-radius);">
        <i class="bi bi-map" style="font-size: 3rem; color: var(--primary-color); margin-bottom: 1rem;"></i>
        <h3 style="margin-bottom: 1rem;">Localização da Pastelaria Dourada</h3>
        <p style="margin-bottom: 1rem;">Av. dos Pastéis, 1234, Centro - São Paulo, SP</p>
        <p>Coordenadas: -23.550520, -46.633308</p>
        <a href="https://maps.google.com/?q=-23.550520,-46.633308" target="_blank" class="btn btn-primary" style="margin-top: 1rem; display: inline-block;">Abrir no Google Maps</a>
      </div>
    `;
    return;
  }
  
  try {
    // Coordenadas iniciais da pastelaria (exemplo)
    const initialPosition = { lat: -23.550520, lng: -46.633308 };
    
    // Inicializar o mapa
    const map = new google.maps.Map(mapContainer, {
      center: initialPosition,
      zoom: 15,
      mapTypeControl: true,
      streetViewControl: true,
      fullscreenControl: true
    });
    
    // Adicionar marcador da loja
    const marker = new google.maps.Marker({
      position: initialPosition,
      map: map,
      title: 'Pastelaria Dourada',
      animation: google.maps.Animation.DROP,
      icon: {
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 60 60">
            <circle cx="30" cy="30" r="20" fill="#1e90ff" stroke="white" stroke-width="3"/>
            <path d="M15,30 L45,30 L40,45 L20,45 Z" fill="white" stroke="#0066cc" stroke-width="1"/>
          </svg>
        `),
        scaledSize: new google.maps.Size(40, 40)
      }
    });
    
    // InfoWindow para o marcador
    const infoWindow = new google.maps.InfoWindow({
      content: `
        <div style="text-align:center;">
          <h3 style="margin:5px 0;">Pastelaria Dourada</h3>
          <p style="margin:5px 0;">Av. dos Pastéis, 1234</p>
          <p style="margin:5px 0;">Aberto hoje: 10h às 22h</p>
        </div>
      `
    });
    
    // Abrir InfoWindow ao clicar no marcador
    marker.addListener('click', () => {
      infoWindow.open(map, marker);
    });
    
    // Função para buscar endereço
    const geocoder = new google.maps.Geocoder();
    
    searchBtn.addEventListener('click', () => {
      const address = searchInput.value;
      if (!address) return;
      
      geocoder.geocode({ 'address': address + ', Brasil' }, (results, status) => {
        if (status === 'OK' && results[0]) {
          map.setCenter(results[0].geometry.location);
          
          // Adicionar marcador temporário
          new google.maps.Marker({
            map: map,
            position: results[0].geometry.location,
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: '#e74c3c',
              fillOpacity: 1,
              strokeColor: 'white',
              strokeWeight: 2
            },
            animation: google.maps.Animation.DROP
          });
          
          // Calcular e exibir rota
          calculateRoute(results[0].geometry.location, initialPosition);
        } else {
          showNotification('error', 'Endereço não encontrado. Tente adicionar mais detalhes como cidade ou estado.');
        }
      });
    });
    
    // Tecla Enter para buscar
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') searchBtn.click();
    });
    
    // Função para calcular rota
    function calculateRoute(origin, destination) {
      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer({
        map: map,
        suppressMarkers: true,
        polylineOptions: {
          strokeColor: '#1e90ff',
          strokeWeight: 5
        }
      });
      
      directionsService.route({
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING
      }, (result, status) => {
        if (status === 'OK') {
          directionsRenderer.setDirections(result);
          
          // Mostrar distância e tempo
          const route = result.routes[0].legs[0];
          showNotification('info', `Distância: ${route.distance.text} - Tempo: ${route.duration.text}`);
        }
      });
    }
    
    // Função para localização atual
    locateBtn.addEventListener('click', () => {
      if (navigator.geolocation) {
        locateBtn.disabled = true;
        locateBtn.innerHTML = '<i class="bi bi-arrow-repeat"></i>';
        
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            
            map.setCenter(userLocation);
            
            // Adicionar marcador do usuário
            const userMarker = new google.maps.Marker({
              position: userLocation,
              map: map,
              title: 'Sua localização',
              animation: google.maps.Animation.DROP,
              icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: '#2ecc71',
                fillOpacity: 1,
                strokeColor: 'white',
                strokeWeight: 2
              }
            });
            
            // Calcular rota
            calculateRoute(userLocation, initialPosition);
            
            // Restaurar botão
            locateBtn.disabled = false;
            locateBtn.innerHTML = '<i class="bi bi-geo-alt"></i>';
          },
          (error) => {
            showNotification('error', 'Não foi possível obter sua localização. Verifique se permitiu o acesso à localização.');
            locateBtn.disabled = false;
            locateBtn.innerHTML = '<i class="bi bi-geo-alt"></i>';
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
          }
        );
      } else {
        showNotification('error', 'Seu navegador não suporta geolocalização.');
      }
    });
  } catch (error) {
    console.error("Error loading Google Maps:", error);
    mapContainer.innerHTML = `
      <div style="text-align:center; padding: 2rem;">
        <i class="bi bi-map" style="font-size: 3rem; color: var(--primary-color);"></i>
        <p style="margin-top: 1rem;">Não foi possível carregar o mapa neste momento.</p>
      </div>
    `;
  }
}

// Função para tela de carregamento
function handleLoader() {
  const loader = document.querySelector('.loader-container');
  
  if (!loader) return;
  
  // Ocultar o loader após 3 segundos
  setTimeout(() => {
    loader.style.opacity = '0';
    loader.style.visibility = 'hidden';
    
    // Iniciar animações após o loader desaparecer
    setTimeout(() => {
      setupAnimations();
    }, 200);
  }, 3000); 
  
  // Adicionar um timeout de segurança para remover o loader após 3.5 segundos
  setTimeout(() => {
    if (loader.style.visibility !== 'hidden') {
      loader.style.opacity = '0';
      loader.style.visibility = 'hidden';
      setupAnimations();
    }
  }, 3500); 
}

// Inicializar tudo quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  // Inicializar loader
  handleLoader();
  
  // Carregar carrinho do localStorage
  cart.loadCart();
  
  // Inicializar componentes
  setupMobileNav();
  setupCartSidebar();
  setupProductModal();
  setupHighlightsSlider();
  setupMenu(); // Garantir que o menu seja inicializado corretamente
  setupTestimonials();
  setupOrderSection();
  setupBackToTop();
  setupContactForm();
  setTimeout(() => setupMap(), 1000);
  
  // Adicionar eventos para navegação suave
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const target = document.querySelector(this.getAttribute('href'));
      
      if (target) {
        // Calcular offset para o header fixo
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Mobile navigation fix
  const mainNav = document.querySelector('.main-nav');
  if (window.innerWidth <= 992) {
    mainNav.classList.add('mobile');
  }
  
  window.addEventListener('resize', () => {
    if (window.innerWidth <= 992) {
      mainNav.classList.add('mobile');
    } else {
      mainNav.classList.remove('mobile');
      mainNav.classList.remove('active');
      document.querySelector('.mobile-menu-toggle')?.classList.remove('active');
      document.querySelector('.overlay')?.classList.remove('open');
      document.body.classList.remove('no-scroll');
    }
  });
  
  // Header fixo ao rolar
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }
  });
  
  // Atualizar link ativo no menu conforme rolagem
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const headerHeight = document.querySelector('.header').offsetHeight;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - headerHeight - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        document.querySelector('.main-nav a.active')?.classList.remove('active');
        document.querySelector(`.main-nav a[href="#${sectionId}"]`)?.classList.add('active');
      }
    });
  });
});

// Animações GSAP
function setupAnimations() {
  // Hero section
  gsap.from('.hero-content h2', { 
    duration: 1, 
    y: 50, 
    opacity: 0, 
    ease: 'power3.out' 
  });
  
  gsap.from('.hero-content p', { 
    duration: 1, 
    y: 50, 
    opacity: 0, 
    ease: 'power3.out',
    delay: 0.3
  });
  
  gsap.from('.hero-buttons', { 
    duration: 1, 
    y: 50, 
    opacity: 0, 
    ease: 'power3.out',
    delay: 0.6
  });
  
  // Pastel flutuando no hero
  const pastelElements = document.querySelectorAll('.pastel-float');
  pastelElements.forEach((pastel, index) => {
    gsap.from(pastel, {
      duration: 1.5,
      y: 100,
      opacity: 0,
      delay: 0.2 * index,
      ease: 'power3.out'
    });
  });
  
  // Scroll reveal para seções
  const sections = [
    '.highlights',
    '.about',
    '.menu',
    '.testimonials',
    '.order-section',
    '.contact'
  ];
  
  sections.forEach(section => {
    const sectionElement = document.querySelector(section);
    if (sectionElement) {
      ScrollTrigger.create({
        trigger: sectionElement,
        start: 'top 80%',
        onEnter: () => {
          gsap.from(sectionElement.querySelector('.section-header'), {
            duration: 0.8,
            y: 50,
            opacity: 0,
            ease: 'power3.out'
          });
          
          gsap.from(sectionElement.querySelectorAll(':scope > div:not(.section-header)'), {
            duration: 1,
            y: 50,
            opacity: 0,
            stagger: 0.2,
            ease: 'power3.out',
            delay: 0.3
          });
        },
        once: true
      });
    }
  });
  
  // Animação para as features na seção about
  const features = document.querySelectorAll('.feature');
  features.forEach((feature, index) => {
    ScrollTrigger.create({
      trigger: feature,
      start: 'top 80%',
      onEnter: () => {
        gsap.from(feature, {
          duration: 0.8,
          y: 50,
          opacity: 0,
          ease: 'power3.out',
          delay: 0.15 * index
        });
      },
      once: true
    });
  });
  
  // Animação para os itens do menu
  const menuItems = document.querySelectorAll('.menu-item');
  menuItems.forEach((item, index) => {
    ScrollTrigger.create({
      trigger: item,
      start: 'top 90%',
      onEnter: () => {
        gsap.from(item, {
          duration: 0.6,
          y: 30,
          opacity: 0,
          ease: 'power3.out',
          delay: 0.1 * (index % 4) // Agrupar em linhas de 4
        });
      },
      once: true
    });
  });
}