"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {

  const [pedidoId, setPedidoId] = useState("");
  const [modoConsulta, setModoConsulta] = useState(false);

  const router = useRouter();

  const activarConsulta = () => {
    setModoConsulta(true);
  };

  const volverAPedir = () => {
    setModoConsulta(false);
    setPedidoId("");
  };

  const pedidohecho = async () => {

    try {

      const link = `https://www.kebabguadiaro.es/ordenesTrabajo/${pedidoId}`;

      const res = await fetch(link);

      if (!res.ok) {
        alert("Pedido no encontrado");
        return;
      }

      router.push(`/pedidoHecho?id=${pedidoId}`);

    } catch (error) {
      console.error("Error buscando pedido:", error);
    }
  };

  return (

    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "70vh",
        textAlign: "center",
        padding: "20px",
        gap: "20px"
      }}
    >

      <Image
        src="/logo1.png"
        alt="logo"
        width={160}
        height={160}
        style={{
          marginTop: "100px",
          marginBottom: "40px"
        }}
      />

      <h1>PIDE TU COMIDA EN MINUTOS</h1>

      {/* BOTÓN PEDIR */}
      {!modoConsulta && (
        <Link href="/pedidos">
          <button
            style={{
              padding: "15px 40px",
              fontSize: "30px",
              borderRadius: "5px",
              border: "none",
              backgroundColor: "#4C9453",
              cursor: "pointer"
            }}
          >
            PEDIR
          </button>
        </Link>
      )}

      {/* BOTÓN HAS PEDIDO YA */}
      {!modoConsulta && (
        <button
          onClick={activarConsulta}
          style={{
            padding: "10px 20px",
            fontSize: "20px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#00e5ff",
            cursor: "pointer"
          }}
        >
          ¿HAS PEDIDO YA?
        </button>
      )}

      {/* INPUT CONSULTA */}
      {modoConsulta && (
        <input
          type="number"
          placeholder="Introduce tu número de pedido"
          value={pedidoId}
          onChange={(e) => setPedidoId(e.target.value)}
          className="border-2 border-black p-2 rounded"
        />
      )}

      {/* BOTÓN CONSULTAR */}
      {modoConsulta && (
        <button
          onClick={pedidohecho}
          style={{
            padding: "10px 20px",
            fontSize: "20px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#00e5ff",
            cursor: "pointer"
          }}
        >
          Consultar estado de pedido
        </button>
      )}

      {/* BOTÓN VOLVER A PEDIR */}
      {modoConsulta && (
        <button
          onClick={volverAPedir}
          style={{
            padding: "10px 20px",
            fontSize: "18px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#4C9453",
            cursor: "pointer"
          }}
        >
          VOLVER A PEDIR
        </button>
      )}

    </main>
  );
}