// Loja Secreta: desbloqueia conteúdo com senha
function acessarLojaSecreta() {
    const senha = document.getElementById('senha-secreta').value;
    const conteudoSecreto = document.getElementById('conteudo-secreto');

    if (senha === 'senha123') {
        conteudoSecreto.style.display = 'block';
    } else {
        alert('Senha incorreta!');
    }
}

// Efeito de clique no botão "Adicionar ao carrinho"
const botoesComprar = document.querySelectorAll('.btn');

botoesComprar.forEach(botao => {
    botao.addEventListener('click', () => {
        const produto = botao.closest('.produto');
        const nome = produto.querySelector('h4').textContent;
        const precoTexto = produto.querySelector('p').textContent;
        const preco = parseFloat(precoTexto.replace('R$', '').replace(',', '.'));

        adicionarAoCarrinho(nome, preco);

        botao.textContent = 'Adicionado ✔️';
        botao.disabled = true;

        setTimeout(() => {
            botao.textContent = 'Adicionar ao carrinho';
            botao.disabled = false;
        }, 2000);
    });
});

// Scroll suave para o botão "voltar ao topo"
const botaoTopo = document.querySelector('.voltar-topo');

if (botaoTopo) {
    botaoTopo.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Animação ao rolar a página com Intersection Observer
const sections = document.querySelectorAll('.animado');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visivel');
        }
    });
});

sections.forEach(section => {
    observer.observe(section);
});

// Carrinho de compras
let carrinho = [];

function adicionarAoCarrinho(botao, nomeProduto, precoID) {
    const precoTexto = document.querySelector(precoID).textContent;
    const preco = parseFloat(precoTexto.replace('R$', '').replace(',', '.'));

    carrinho.push({ nome: nomeProduto, preco: preco });
    atualizarCarrinho();
    
    botao.textContent = 'Adicionado ✔️';
    botao.disabled = true;

    setTimeout(() => {
        botao.textContent = 'Adicionar ao carrinho';
        botao.disabled = false;
    }, 2000);
}

function atualizarCarrinho() {
    const lista = document.getElementById('itens-carrinho');
    const totalSpan = document.getElementById('total-carrinho');
    lista.innerHTML = '';

    let total = 0;
    carrinho.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${item.nome} - R$ ${item.preco.toFixed(2)} <button class="btn-remover" onclick="removerDoCarrinho(${index})">x</button>`;
        lista.appendChild(li);
        total += item.preco;
    });

    totalSpan.textContent = total.toFixed(2);
}


function removerDoCarrinho(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

function finalizarCompra() {
    if (carrinho.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }
    alert('Compra finalizada! Obrigado pela preferência.');
    carrinho = [];
    atualizarCarrinho();
}

// Mostrar e esconder o carrinho com animação
const botaoCarrinho = document.getElementById('abrir-carrinho');
const divCarrinho = document.getElementById('carrinho');

botaoCarrinho.addEventListener('click', () => {
    if (divCarrinho.style.display === 'none' || divCarrinho.style.display === '') {
        divCarrinho.style.display = 'block';
    } else {
        divCarrinho.style.display = 'none';
    }
});
function filterProducts() {
  const categoryFilter = document.getElementById("category").value;
  const priceFilter = document.getElementById("price").value;

  const products = document.querySelectorAll(".product"); // Supondo que seus produtos tenham a classe 'product'

  products.forEach(product => {
    const category = product.dataset.category; // Categoria do produto
    const price = parseFloat(product.dataset.price); // Preço do produto

    // Lógica para filtro de categoria
    const categoryMatch = categoryFilter === "all" || category === categoryFilter;

    // Lógica para filtro de preço
    let priceMatch = true;
    if (priceFilter === "low") {
      priceMatch = price <= 50;
    } else if (priceFilter === "medium") {
      priceMatch = price > 50 && price <= 150;
    } else if (priceFilter === "high") {
      priceMatch = price > 150;
    }

    // Se o produto corresponder aos filtros, mostrar, caso contrário, esconder
    if (categoryMatch && priceMatch) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
}
// Pegar categorias únicas e adicionar no filtro automaticamente
function preencherCategorias() {
    const produtos = document.querySelectorAll('.produto');
    const selectCategoria = document.getElementById('category');

    const categorias = new Set(); // Isso evita categorias repetidas

    produtos.forEach(produto => {
        const categoria = produto.dataset.category;
        if (categoria) {
            categorias.add(categoria);
        }
    });

    categorias.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1); // Primeira letra maiúscula
        selectCategoria.appendChild(option);
    });
}

// Chama a função quando a página carregar
document.addEventListener('DOMContentLoaded', preencherCategorias);

    let paginaAtual = 1;
    const produtosPorPagina = 5; // Quantos produtos exibir por vez

    function exibirProdutos(categoria) {
        const produtos = document.querySelectorAll(`#${categoria} .produto`);
        const inicio = (paginaAtual - 1) * produtosPorPagina;
        const fim = inicio + produtosPorPagina;
        
        produtos.forEach((produto, index) => {
            if (index >= inicio && index < fim) {
                produto.style.display = "block";
            } else {
                produto.style.display = "none";
            }
        });

        // Habilitar ou desabilitar os botões de navegação
        document.getElementById("pagina-anterior").disabled = paginaAtual === 1;
        document.getElementById("proxima-pagina").disabled = fim >= produtos.length;
    }

    function proximaPagina(categoria) {
        paginaAtual++;
        exibirProdutos(categoria);
    }

    function paginaAnterior(categoria) {
        paginaAtual--;
        exibirProdutos(categoria);
    }

    // Inicializa os produtos na primeira página
    exibirProdutos('conjuntos');

