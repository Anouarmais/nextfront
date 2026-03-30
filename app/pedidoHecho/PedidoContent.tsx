"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import CardSeguimiento, { PedidoProps } from "../components/cardSeguimiento";
import { io } from "socket.io-client";

export default function PedidoContent() {

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [pedido, setPedido] = useState<PedidoProps | null>(null);

  useEffect(() => {

    if (!id) return;

    const socket = io("http://localhost:3001");

    async function fetchPedido() {

      try {

        const res = await fetch(
          `http://localhost:3001/ordenesTrabajo/${id}`
        );

        const data = await res.json();

        setPedido(data);

      } catch (error) {

        console.error("Error cargando pedido:", error);

      }

    }

    fetchPedido();

    socket.on("pedidoActualizado", (pedidoActualizado) => {

      if (pedidoActualizado.id === Number(id)) {

        setPedido(pedidoActualizado);

      }

    });

 return () => {
  socket.disconnect();
};

  }, [id]);

  if (!pedido) return(
    <div className="mt-20">
      <p>Ningun Pedido encontrado. Vuelva a intentarlo o llame al servicio al cliente: +34 631 37 55 13</p>
    </div>
  ); 
  
  return (

    <div className="max-w-6xl mx-auto px-4">

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        <CardSeguimiento {...pedido} />

      </div>

    </div>

  );

}