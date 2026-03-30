"use client";

import { Suspense } from "react";
import PedidoContent from "./PedidoContent";

export default function PedidoHechoPage() {
  return (
    <Suspense fallback={<p>Ningun pedido encontrado</p>}>
      <PedidoContent />
    </Suspense>
  );
}