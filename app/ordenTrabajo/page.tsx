"use client";
import { useEffect, useState } from "react";
import CardOrden from "../components/cardOrden";
import {io} from "socket.io-client";
export default function ordenTrabajo() {

  const [pedidos , setPedidos] = useState<Pedidos[]>([]);
type Pedidos = {
  id: number;
  domicilio: boolean;
  customer_name: string;
  adress: string;
  number: string;
  order: string;
  total?: number;
  created_at?: string;
};

useEffect(() => {
  const socket = io("https://nestback.onrender.com");

  socket.on("nuevoPedido", (nuevoPedido: Pedidos) => {
    setPedidos(prev => [...prev, nuevoPedido]);
  });

  return () => {
    socket.disconnect(); 
  };
}, []);

useEffect(() => {
  async function getData() {
    try {
      const res = await fetch("https://nestback.onrender.com/ordenesTrabajo");
      const pedidos = await res.json();
      setPedidos(pedidos); // guardamos todos los pedidos
    } catch (error) {
      console.error(error);
    }
  }

  getData();
}, []);

  return (
    <div>
        <h1 className=" text-center text-3xl mt-10 mb-10   md:text-5xl mt-10 mb-10 max-w-md mx-auto">Ordenes de Trabajo</h1>
<ul>
  <div className="max-w-6xl mx-auto px-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {pedidos.map((order) => (
    <li key={order.id}>
      <CardOrden
        id={order.id}
        domicilio={order.domicilio}
        customer_name={order.customer_name}
        adress={order.adress}
        number={order.number}
        total={order.total}
        order={order.order}
      />
    </li>
  ))}
  </div>
  </div>
</ul>
    </div>
  )
}