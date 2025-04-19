// Configurações do site da Pastelaria Dourada
export const config = {
  // Informações da loja
  store: {
    name: "Pastelaria Dourada",
    slogan: "Sabores Inesquecíveis",
    founded: 1985,
    phone: "(11) 5555-1234",
    whatsapp: "(11) 98765-4321",
    email: "contato@pastelariadourada.com",
    address: {
      street: "Av. dos Pastéis",
      number: "1234",
      neighborhood: "Centro",
      city: "São Paulo",
      state: "SP",
      zipcode: "01234-567"
    },
    openingHours: {
      weekdays: "10h às 22h",
      weekends: "10h às 20h",
      sunday: "10h às 20h"
    },
    social: {
      instagram: "https://www.instagram.com/pastelariadourada",
      facebook: "https://www.facebook.com/pastelariadourada",
      whatsapp: "https://wa.me/5511987654321",
      tiktok: "https://www.tiktok.com/@pastelariadourada"
    }
  },
  
  // Configurações de pedidos
  order: {
    minimumOrderValue: 15, // Valor mínimo para pedidos em reais
    deliveryFee: 5, // Taxa de entrega em reais
    freeDeliveryOver: 50, // Valor mínimo para entrega grátis
    maxDeliveryDistance: 8, // Distância máxima para entrega em km
    pickupTimeOptions: [
      "10:30", "11:00", "11:30", "12:00", "12:30", 
      "13:00", "13:30", "14:00", "14:30", "15:00", 
      "15:30", "16:00", "16:30", "17:00", "17:30", 
      "18:00", "18:30", "19:00", "19:30", "20:00", 
      "20:30", "21:00", "21:30"
    ]
  },
  
  // Destaques da semana
  highlights: [
    {
      id: "highlight1",
      name: "Super Combo Família",
      description: "4 pastéis grandes + 2 pastéis doces + 2 refrigerantes de 2L. Perfeito para reuniões em família!",
      price: 89.90,
      image: "https://images.unsplash.com/photo-1585511582331-860dde6bfb62?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tags: ["Destaque", "Promoção"]
    },
    {
      id: "highlight2",
      name: "Festival Gourmet",
      description: "Experimente nossa linha especial de pastéis gourmet com recheios elaborados e massas especiais.",
      price: 59.90,
      image: "https://images.unsplash.com/photo-1617307322936-96a99ac05437?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tags: ["Destaque", "Gourmet"]
    },
    {
      id: "highlight3",
      name: "Pastel Surpresa Doce",
      description: "Nossa criação especial com massa doce e recheios sortidos que vão te surpreender a cada mordida.",
      price: 29.90,
      image: "https://images.unsplash.com/photo-1614145121029-83a9f7b68bf4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tags: ["Destaque", "Doce", "Novidade"]
    }
  ],
  
  // Menu de produtos
  menu: [
    // Pastéis Salgados
    {
      id: "s1",
      category: "salgados",
      name: "Pastel de Carne",
      description: "Recheado com carne moída temperada, cebola e azeitonas",
      price: 9.90,
      image: "https://images.unsplash.com/photo-1604477677019-6d7131d43d74?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      tags: ["Popular"],
      ingredients: ["Massa crocante", "Carne moída", "Cebola", "Temperos", "Azeitonas"],
      nutritionalInfo: "Calorias: 320 kcal | Carboidratos: 30g | Proteínas: 15g | Gorduras: 14g"
    },
    {
      id: "s2",
      category: "salgados",
      name: "Pastel de Queijo",
      description: "Recheado com queijo mussarela derretido",
      price: 8.90,
      image: "https://images.unsplash.com/photo-1627308595171-d1b5d67129c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      tags: ["Popular", "Vegetariano"],
      ingredients: ["Massa crocante", "Queijo mussarela", "Orégano"],
      nutritionalInfo: "Calorias: 290 kcal | Carboidratos: 28g | Proteínas: 12g | Gorduras: 15g"
    },
    {
      id: "s3",
      category: "salgados",
      name: "Pastel de Frango",
      description: "Recheado com frango desfiado, catupiry e milho",
      price: 9.90,
      image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      tags: ["Popular"],
      ingredients: ["Massa crocante", "Frango desfiado", "Catupiry", "Milho", "Temperos"],
      nutritionalInfo: "Calorias: 310 kcal | Carboidratos: 29g | Proteínas: 17g | Gorduras: 13g"
    },
    {
      id: "s4",
      category: "salgados",
      name: "Pastel de Calabresa",
      description: "Recheado com calabresa, cebola e queijo",
      price: 10.90,
      image: "https://images.unsplash.com/photo-1641057312360-2105e847757e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      tags: [],
      ingredients: ["Massa crocante", "Calabresa", "Cebola", "Queijo", "Temperos"],
      nutritionalInfo: "Calorias: 340 kcal | Carboidratos: 30g | Proteínas: 14g | Gorduras: 17g"
    },
    {
      id: "s5",
      category: "salgados",
      name: "Pastel de Palmito",
      description: "Recheado com palmito, molho branco e ervas",
      price: 10.90,
      image: "https://images.unsplash.com/photo-1579888944880-d98341245702?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      tags: ["Vegetariano"],
      ingredients: ["Massa crocante", "Palmito", "Molho branco", "Ervas"],
      nutritionalInfo: "Calorias: 280 kcal | Carboidratos: 31g | Proteínas: 10g | Gorduras: 13g"
    },
    {
      id: "s6",
      category: "salgados",
      name: "Pastel de Pizza",
      description: "Recheado com mussarela, presunto, tomate e orégano",
      price: 11.90,
      image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      tags: [],
      ingredients: ["Massa crocante", "Mussarela", "Presunto", "Tomate", "Orégano"],
      nutritionalInfo: "Calorias: 350 kcal | Carboidratos: 32g | Proteínas: 16g | Gorduras: 16g"
    },
    {
      id: "s7",
      category: "salgados",
      name: "Pastel de Camarão",
      description: "Recheado com camarão, catupiry e cebolinha",
      price: 14.90,
      image: "https://images.unsplash.com/photo-1625944525533-473f1b3d333c?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      tags: ["Premium"],
      ingredients: ["Massa crocante", "Camarão", "Catupiry", "Cebolinha", "Temperos"],
      nutritionalInfo: "Calorias: 320 kcal | Carboidratos: 29g | Proteínas: 18g | Gorduras: 15g"
    },
    {
      id: "s8",
      category: "salgados",
      name: "Pastel 4 Queijos",
      description: "Recheado com mussarela, provolone, parmesão e gorgonzola",
      price: 12.90,
      image: "https://images.unsplash.com/photo-1559054663-e8d23213f55c?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      tags: ["Especial", "Vegetariano"],
      ingredients: ["Massa crocante", "Mussarela", "Provolone", "Parmesão", "Gorgonzola"],
      nutritionalInfo: "Calorias: 380 kcal | Carboidratos: 28g | Proteínas: 18g | Gorduras: 22g"
    },
    
    // Pastéis Doces
    {
      id: "d1",
      category: "doces",
      name: "Pastel de Chocolate",
      description: "Recheado com chocolate meio amargo derretido",
      price: 9.90,
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      tags: ["Popular"],
      ingredients: ["Massa doce", "Chocolate meio amargo"],
      nutritionalInfo: "Calorias: 340 kcal | Carboidratos: 42g | Proteínas: 8g | Gorduras: 18g"
    },
    {
      id: "d2",
      category: "doces",
      name: "Pastel de Banana com Canela",
      description: "Recheado com banana caramelizada e canela",
      price: 9.90,
      image: "https://images.unsplash.com/photo-1594063596316-47e7b9964183?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      tags: [],
      ingredients: ["Massa doce", "Banana", "Açúcar", "Canela"],
      nutritionalInfo: "Calorias: 290 kcal | Carboidratos: 48g | Proteínas: 6g | Gorduras: 10g"
    },
    {
      id: "d3",
      category: "doces",
      name: "Pastel de Doce de Leite",
      description: "Recheado com doce de leite cremoso",
      price: 9.90,
      image: "https://images.unsplash.com/photo-1584829554555-a3c1e0180962?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      tags: ["Popular"],
      ingredients: ["Massa doce", "Doce de leite"],
      nutritionalInfo: "Calorias: 320 kcal | Carboidratos: 50g | Proteínas: 7g | Gorduras: 12g"
    },
    {
      id: "d4",
      category: "doces",
      name: "Pastel de Morango com Chocolate",
      description: "Recheado com morangos frescos e chocolate",
      price: 11.90,
      image: "https://images.unsplash.com/photo-1560180474-e8563fd75bab?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      tags: ["Especial"],
      ingredients: ["Massa doce", "Morangos", "Chocolate"],
      nutritionalInfo: "Calorias: 300 kcal | Carboidratos: 45g | Proteínas: 7g | Gorduras: 13g"
    },
    
    // Pastéis Especiais
    {
      id: "e1",
      category: "especiais",
      name: "Pastel Vegetariano",
      description: "Recheado com mix de legumes, cogumelos e queijo",
      price: 12.90,
      image: "https://images.unsplash.com/photo-1574343635105-4cf2ea136b8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      tags: ["Especial", "Vegetariano"],
      ingredients: ["Massa crocante", "Cenoura", "Abobrinha", "Cogumelos", "Queijo"],
      nutritionalInfo: "Calorias: 290 kcal | Carboidratos: 32g | Proteínas: 12g | Gorduras: 14g"
    },
    {
      id: "e2",
      category: "especiais",
      name: "Pastel do Chef",
      description: "Recheio especial com carne, queijo, presunto e catupiry",
      price: 15.90,
      image: "https://images.unsplash.com/photo-1610614991969-ceeb293e3932?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      tags: ["Premium", "Especial"],
      ingredients: ["Massa especial", "Carne", "Queijo", "Presunto", "Catupiry", "Temperos selecionados"],
      nutritionalInfo: "Calorias: 420 kcal | Carboidratos: 32g | Proteínas: 24g | Gorduras: 24g"
    },
    {
      id: "e3",
      category: "especiais",
      name: "Pastel Crocante de Costela",
      description: "Recheado com costela desfiada ao molho especial",
      price: 16.90,
      image: "https://images.unsplash.com/photo-1573821663912-569905455b1c?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      tags: ["Premium", "Novidade"],
      ingredients: ["Massa super crocante", "Costela desfiada", "Molho especial", "Temperos"],
      nutritionalInfo: "Calorias: 380 kcal | Carboidratos: 30g | Proteínas: 22g | Gorduras: 20g"
    },
    
    // Bebidas
    {
      id: "b1",
      category: "bebidas",
      name: "Refrigerante Lata",
      description: "Coca-Cola, Guaraná, Fanta ou Sprite",
      price: 6.00,
      image: "https://images.unsplash.com/photo-1581636625402-29b2a704ef13?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      tags: [],
      ingredients: [],
      nutritionalInfo: "Varia conforme o sabor escolhido"
    },
    {
      id: "b2",
      category: "bebidas",
      name: "Suco Natural",
      description: "Laranja, Limão, Abacaxi ou Maracujá",
      price: 9.00,
      image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      tags: ["Natural"],
      ingredients: [],
      nutritionalInfo: "Varia conforme o sabor escolhido"
    },
    {
      id: "b3",
      category: "bebidas",
      name: "Água Mineral",
      description: "Com ou sem gás",
      price: 4.00,
      image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      tags: [],
      ingredients: [],
      nutritionalInfo: "0 calorias"
    },
    {
      id: "b4",
      category: "bebidas",
      name: "Caldo de Cana",
      description: "Caldo de cana fresco - 500ml",
      price: 8.00,
      image: "https://images.unsplash.com/photo-1553530666-ba11a90bb0ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      tags: ["Especial", "Natural"],
      ingredients: [],
      nutritionalInfo: "Calorias: 250 kcal | Carboidratos: 65g | Proteínas: 0g | Gorduras: 0g"
    }
  ],
  
  // Depoimentos
  testimonials: [
    {
      id: 1,
      name: "Carlos Silva",
      text: "Os pastéis da Pastelaria Dourada são simplesmente os melhores que já comi! A massa é super crocante e os recheios são generosos. Virou tradição de domingo para minha família.",
      rating: 5
    },
    {
      id: 2,
      name: "Ana Oliveira",
      text: "Experimentei o pastel de camarão e fiquei impressionada. O sabor é incrível e o atendimento é excelente. Recomendo a todos!",
      rating: 5
    },
    {
      id: 3,
      name: "Marcelo Santos",
      text: "Peço delivery toda semana e nunca me decepcionei. Os pastéis chegam quentinhos e crocantes mesmo após a entrega. O de 4 queijos é sensacional!",
      rating: 4
    },
    {
      id: 4,
      name: "Fernanda Costa",
      text: "Adoro os pastéis doces, especialmente o de chocolate! É a sobremesa perfeita depois dos salgados. O ambiente da loja também é muito aconchegante.",
      rating: 5
    },
    {
      id: 5,
      name: "Roberto Almeida",
      text: "Frequento a Pastelaria Dourada há anos e a qualidade nunca caiu. São consistentes e sempre inovam no cardápio. O pastel do chef é uma obra-prima!",
      rating: 5
    }
  ]
};

// Configurações de animação
export const animations = {
  scrollReveal: {
    distance: '60px',
    duration: 1200,
    delay: 200,
    origin: 'bottom'
  }
};