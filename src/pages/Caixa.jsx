import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CarrinhoItem from "../components/CarrinhoItem.jsx";
import { buscarProdutoPorCodigo } from "../services/localStorageService";
import "../styles/caixa.css";

/**
 * - Campo para digitar/scan de código
 * - Ao pressionar Enter (ou clicar Adicionar), busca o produto e adiciona ao carrinho
 * - Permite adicionar produtos iguais ou diferentes
 * - Controle de quantidade (+/-) e remover por item
 */
export default function Caixa() {
  const location = useLocation();
  const navigate = useNavigate();
  const produtoInicial = location.state?.produto || null;

  const [carrinho, setCarrinho] = useState([]);
  const [codigoScan, setCodigoScan] = useState("");
  const inputRef = useRef(null);

  // se a página recebeu um produto pela consulta, já adiciona ao abrir
  useEffect(() => {
    if (produtoInicial) {
      adicionarAoCarrinho(produtoInicial);
    }
    if (inputRef.current) inputRef.current.focus();
  }, []); // NÃO adicionar dependência, para não duplicar item

  function adicionarAoCarrinho(produto) {
    setCarrinho((prev) => {
      const existente = prev.find((item) => item.id === produto.id);
      if (existente) {
        return prev.map((it) =>
          it.id === produto.id ? { ...it, quantidade: it.quantidade + 1 } : it
        );
      }
      return [...prev, { ...produto, quantidade: 1 }];
    });
  }

  function adicionarPorCodigo() {
    const cod = String(codigoScan).trim();
    if (!cod) return;

    const encontrado = buscarProdutoPorCodigo(cod);
    if (!encontrado) {
      alert("Produto não encontrado. Você pode cadastrar.");
      setCodigoScan("");
      if (inputRef.current) inputRef.current.focus();
      return;
    }

    adicionarAoCarrinho(encontrado);
    setCodigoScan("");
    if (inputRef.current) inputRef.current.focus();
  }

  function incrementar(id) {
    setCarrinho((prev) =>
      prev.map((it) => (it.id === id ? { ...it, quantidade: it.quantidade + 1 } : it))
    );
  }

  function decrementar(id) {
    setCarrinho((prev) =>
      prev
        .map((it) => (it.id === id ? { ...it, quantidade: Math.max(1, it.quantidade - 1) } : it))
        .filter(Boolean)
    );
  }

  function removerItem(id) {
    setCarrinho((prev) => prev.filter((it) => it.id !== id));
  }

  function calcularTotal() {
    return carrinho.reduce((total, item) => {
      const precoUnit = item.desconto ? (item.preco - (item.preco * item.desconto) / 100) : item.preco;
      return total + precoUnit * item.quantidade;
    }, 0);
  }

  function fecharConta() {
    if (carrinho.length === 0) {
      alert("Carrinho vazio.");
      return;
    }
    const total = calcularTotal();
    alert(`Venda finalizada. Total: R$ ${total.toFixed(2)}`);
    setCarrinho([]);
    if (inputRef.current) inputRef.current.focus();
  }

  return (
    <div className="container">
      <h2>Caixa: Leitura contínua</h2>

      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <input
          ref={inputRef}
          value={codigoScan}
          onChange={(e) => setCodigoScan(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") adicionarPorCodigo();
          }}
          placeholder="Digite ou escaneie código e pressione Enter"
        />
        <button onClick={adicionarPorCodigo}>Adicionar</button>
        <button
          onClick={() => {
            setCodigoScan("");
            if (inputRef.current) inputRef.current.focus();
          }}
          style={{ background: "#94a3b8" }}
        >
          Limpar
        </button>
      </div>

      <div style={{ marginTop: 12 }}>
        <button
          onClick={() => {
            if (produtoInicial) adicionarAoCarrinho(produtoInicial);
          }}
          disabled={!produtoInicial}
        >
          Adicionar item
        </button>
      </div>

      <div className="itens-container" style={{ marginTop: 12 }}>
        {carrinho.length === 0 ? (
          <p>Nenhum item no carrinho.</p>
        ) : (
          carrinho.map((item) => (
            <CarrinhoItem
              key={item.id}
              item={item}
              aoIncrementar={(id) => incrementar(id)}
              aoDecrementar={(id) => decrementar(id)}
              aoRemover={(id) => removerItem(id)}
            />
          ))
        )}
      </div>

      <h3 style={{ marginTop: 12 }}>Total: R$ {calcularTotal().toFixed(2)}</h3>

      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
        <button onClick={fecharConta}>Fechar Conta</button>

        <button
          onClick={() => {
            setCarrinho([]);
            if (inputRef.current) inputRef.current.focus();
          }}
          style={{ background: "#94a3b8" }}
        >
          Limpar Carrinho
        </button>

        <button
          onClick={() => navigate("/consulta")}
          style={{ background: "#6b7280" }}
        >
          Voltar para Consulta
        </button>
      </div>
    </div>
  );
}
