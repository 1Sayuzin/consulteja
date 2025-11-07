// Serviços para manipular produtos no LocalStorage
const CHAVE_PRODUTOS = "consulteja_produtos_v1";

export function buscarProdutos() {
  const raw = localStorage.getItem(CHAVE_PRODUTOS);
  return raw ? JSON.parse(raw) : [];
}

function salvarTodos(produtos) {
  localStorage.setItem(CHAVE_PRODUTOS, JSON.stringify(produtos));
}

export function adicionarProduto(produto) {
  const produtos = buscarProdutos();
  produtos.push(produto);
  salvarTodos(produtos);
}

export function editarProduto(produtoEditado) {
  const produtos = buscarProdutos();
  const index = produtos.findIndex((p) => p.id === produtoEditado.id);
  if (index !== -1) {
    produtos[index] = produtoEditado;
    salvarTodos(produtos);
  }
}

export function excluirProduto(id) {
  const produtos = buscarProdutos();
  const novos = produtos.filter((p) => p.id !== id);
  salvarTodos(novos);
}

export function buscarProdutoPorCodigo(codigo) {
  const produtos = buscarProdutos();
  return produtos.find((p) => p.codigo === String(codigo)) || null;
}
