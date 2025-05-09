// Lista de itens do cardápio
const cardapio = [
    { id: 1, nome: "X-Burguer", categoria: "lanches", preco: 15.00, descricao: "Hamburguer com queijo e molho especial",  promocao: false, tamanho: ["P", "M", "G"], estrelas: 4 },
    { id: 2, nome: "Refrigerante", categoria: "bebidas", preco: 5.00, descricao: "Refrigerante gelado",  promocao: true, tamanho: ["L"], estrelas: 3 },
    { id: 3, nome: "Pizza Calabresa", categoria: "lanches", preco: 30.00, descricao: "Pizza de calabresa com borda recheada", imagem: "img/pizza_calabresa.jpg", promocao: true, tamanho: ["M", "G"], estrelas: 5 },
    // Adicione mais itens conforme necessário
  ];
  
  // Armazenamento do carrinho
  let carrinho = [];
  
  // Função para exibir itens do cardápio
  function exibirCardapio(filtroCategoria = 'todos', busca = '') {
    const container = document.getElementById("cardapio");
    container.innerHTML = '';
  
    const itensFiltrados = cardapio.filter(item => 
      (filtroCategoria === 'todos' || item.categoria === filtroCategoria) && 
      item.nome.toLowerCase().includes(busca.toLowerCase())
    );
  
    itensFiltrados.forEach(item => {
      const div = document.createElement('div');
      div.classList.add('item');
  
      div.innerHTML = `
        <h3>${item.nome}</h3>
        <p>${item.descricao}</p>
        <p>R$ ${item.preco.toFixed(2)}</p>
        <p>${item.estrelas} Estrelas</p>
        <button onclick="adicionarAoCarrinho(${item.id})">Adicionar ao Carrinho</button>
      `;
      
      container.appendChild(div);
    });
  }
  
  // Adicionar item ao carrinho
  function adicionarAoCarrinho(id) {
    const item = cardapio.find(item => item.id === id);
    carrinho.push(item);
    exibirCarrinho();
  }
  
  // Exibir itens no carrinho
  function exibirCarrinho() {
    const container = document.getElementById("itensCarrinho");
    container.innerHTML = '';
    let total = 0;
  
    carrinho.forEach(item => {
      const div = document.createElement('div');
      div.innerHTML = `${item.nome} - R$ ${item.preco.toFixed(2)} <button onclick="removerDoCarrinho(${item.id})">Remover</button>`;
      container.appendChild(div);
      total += item.preco;
    });
  
    document.getElementById("totalCarrinho").innerText = `Total: R$ ${total.toFixed(2)}`;
  }
  
  // Remover item do carrinho
  function removerDoCarrinho(id) {
    carrinho = carrinho.filter(item => item.id !== id);
    exibirCarrinho();
  }
  
  // Filtros e busca
  document.getElementById("categoria").addEventListener("change", (e) => {
    exibirCardapio(e.target.value, document.getElementById("busca").value);
  });
  
  document.getElementById("busca").addEventListener("input", (e) => {
    exibirCardapio(document.getElementById("categoria").value, e.target.value);
  });
  
  // Inicializar exibição do cardápio
  window.onload = () => {
    exibirCardapio();
  };
  