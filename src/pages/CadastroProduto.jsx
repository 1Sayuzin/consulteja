import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { adicionarProduto, buscarProdutos } from "../services/localStorageService";
import "../styles/cadastro.css";

export default function CadastroProduto() {
  const navigate = useNavigate();
  const location = useLocation();
  const codigoInicial = location.state?.codigoDigitado || "";

  const [codigo, setCodigo] = useState(codigoInicial);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [desconto, setDesconto] = useState(0);

  function salvar() {
    if (!codigo || !nome || !preco) {
      alert("Código, nome e preço são obrigatórios.");
      return;
    }

    // evita duplicar código
    const existentes = buscarProdutos();
    if (existentes.find((p) => p.codigo === codigo)) {
      alert("Já existe um produto com esse código.");
      return;
    }

    const novo = {
      id: Date.now(),
      codigo,
      nome,
      descricao,
      preco: parseFloat(preco),
      desconto: Number(desconto) || 0,
    };

    adicionarProduto(novo);
    alert("Produto cadastrado com sucesso.");
    navigate("/");
  }

  return (
    <div className="container">
      <h2>Cadastrar Produto</h2>

      <input value={codigo} onChange={(e) => setCodigo(e.target.value)} placeholder="Código de barras" />
      <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome" />
      <input value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Descrição" />
      <input type="number" value={preco} onChange={(e) => setPreco(e.target.value)} placeholder="Preço (ex: 5.90)" />
      <input type="number" value={desconto} onChange={(e) => setDesconto(e.target.value)} placeholder="Desconto (%) opcional" />

      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={salvar}>Salvar</button>
        <button onClick={() => navigate(-1)}>Cancelar</button>
      </div>
    </div>
  );
}
