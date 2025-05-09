// Lista de lançamentos
const lancamentos = [
    { id: 1, nome: "X-Burguer Premium", categoria: "novidades", preco: 20.00, descricao: "Novo hambúrguer com bacon crocante",  promocao: false, ingredientes: "Carne, queijo, bacon, alface, molho especial", estrelas: 5, lancamento: true },
    { id: 2, nome: "Cerveja Artesanal", categoria: "promocoes", preco: 15.00, descricao: "Cerveja artesanal, sabor único",promocao: true, ingredientes: "Água, malte, lúpulo", estrelas: 4, lancamento: false },
    { id: 3, nome: "Pizza de Frango com Catupiry", categoria: "novidades", preco: 35.00, descricao: "Pizza de frango com catupiry, uma delícia",  promocao: true, ingredientes: "Frango, catupiry, massa crocante", estrelas: 4, lancamento: true },
    // Adicione mais itens conforme necessário
  ];
  
  // Função para exibir os lançamentos
  function exibirLancamentos(filtroCategoria = 'todos', busca = '') {
    const container = document.getElementById("lancamentos");
    container.innerHTML = '';
  
    const lancamentosFiltrados = lancamentos.filter(item => 
      (filtroCategoria === 'todos' || item.categoria === filtroCategoria) && 
      item.nome.toLowerCase().includes(busca.toLowerCase())
    );
  
    lancamentosFiltrados.forEach(item => {
      const div = document.createElement('div');
      div.classList.add('item');
  
      div.innerHTML = `
        
        <h3>${item.nome}</h3>
        <p>${item.descricao}</p>
        <p>R$ ${item.preco.toFixed(2)}</p>
        <p>⭐ ${item.estrelas} Estrelas</p>
        ${item.lancamento ? '<p><strong>LANÇAMENTO</strong></p>' : ''}
        <button onclick="adicionarAoCarrinho(${item.id})">Adicionar ao Carrinho</button>
      `;
      
      container.appendChild(div);
    });
  }
  
  // Adicionar item ao carrinho
  function adicionarAoCarrinho(id) {
    const item = lancamentos.find(item => item.id === id);
    alert(`${item.nome} adicionado ao carrinho!`);
  }
  
  // Filtros e busca
  document.getElementById("categoria").addEventListener("change", (e) => {
    exibirLancamentos(e.target.value, document.getElementById("busca").value);
  });
  
  document.getElementById("busca").addEventListener("input", (e) => {
    exibirLancamentos(document.getElementById("categoria").value, e.target.value);
  });
  
  // Inicializar exibição dos lançamentos
  window.onload = () => {
    exibirLancamentos();
  };
  