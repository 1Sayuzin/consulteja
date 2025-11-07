import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import ConsultaProduto from "./pages/ConsultaProduto.jsx";
import CadastroProduto from "./pages/CadastroProduto.jsx";
import Caixa from "./pages/Caixa.jsx";
import ProdutosCadastrados from "./pages/ProdutosCadastrados.jsx";
import EditarProduto from "./pages/EditarProduto.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ConsultaProduto />} />
      <Route path="/cadastrar" element={<CadastroProduto />} />
      <Route path="/caixa" element={<Caixa />} />
      <Route path="/produtos" element={<ProdutosCadastrados />} />
      <Route path="/editar/:id" element={<EditarProduto />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
