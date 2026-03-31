"use client";
import PopupTrue from "../components/popuptrue";
import Image from "next/image";
import { useState } from "react";
export default function TelefonoInput() {


  const [number, setTelefono] = useState("");
  const [customer_name, setName] = useState("");
  const [adress, setAdress] = useState("");
  const [order, setOrder] = useState("");
  const [visible, setvisible] = useState(false);
  const [pedidoID, setPedidoID] = useState(0);
  const [formaEntrega, setFormaEntrega] = useState("domicilio");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log({ customer_name, adress, number, order });
    
    const domicilio = formaEntrega === "domicilio";
    console.log("domicilio:", domicilio);
    const res = await fetch("https://nestback.onrender.com/ordenesTrabajo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ customer_name, adress, number, order , domicilio})
    });
    const data = await res.json();
    setPedidoID(data.id);
    setvisible(true);
    console.log(data);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    let value = e.target.value.replace(/\D/g, "");


    if (value.length > 9) value = value.slice(0, 9);

    let formatted = "";
    if (value.length > 0) formatted += value.slice(0, 3);
    if (value.length >= 4) formatted += " " + value.slice(3, 5);
    if (value.length >= 6) formatted += " " + value.slice(5, 7);
    if (value.length >= 8) formatted += " " + value.slice(7, 9);

    setTelefono(formatted);
  };

  return (
    <main className="flex flex-col items-center justify-center text-center p-5">
      <PopupTrue
        visible={visible}
        pedidoID={pedidoID}
        onClose={() => setvisible(false)}
      />
      <Image
        src="/logo1.png"
        alt="logo"
        width={100}
        height={100}
        style={{
        }}
      />

      {/* Formulario de pedidos */}
      <section className="ñ w-full max-w-md bg-white rounded-xl shadow-lg p-8">

        <h2 className="text-2xl font-bold mb-6">Haz tu pedido</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <h3 className="text-left text-sm font-semibold text-gray-600 mb-2">
            Forma de entrega
          </h3>

          <div className="flex items-center px-3 py-2 bg-gray-50 border border-gray-200 rounded-md">
            <input
              id="domicilio"
              type="radio"
              value="domicilio"
              name="forma_entrega"
               checked={formaEntrega === "domicilio"}
              onChange={(e) => setFormaEntrega(e.target.value)}
              className="w-4 h-4 border-gray-300 text-[#4C9453] focus:ring-[#4C9453]"
            />
            <label
              htmlFor="domicilio"
              className="select-none ml-2 text-sm text-gray-700"
            >
              🏠 Domicilio
            </label>
          </div>

          <div className="flex items-center px-3 py-2 bg-gray-50 border border-gray-200 rounded-md mt-2">
            <input
              id="recogida"
              type="radio"
              name="forma_entrega"
              value="recogida"
              checked={formaEntrega === "recogida"}
              onChange={(e) => setFormaEntrega(e.target.value)}
              className="w-4 h-4 border-gray-300 text-[#4C9453] focus:ring-[#4C9453]"
            />
            <label
              htmlFor="recogida"
              className="select-none ml-2 text-sm text-gray-700"
            >
              🏪 Recogida en tienda
            </label>
          </div>

          <input
         
            type="text"
            name="customer name"
            placeholder="Nombre"
            value={customer_name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4C9453]"
          />
          {formaEntrega === "domicilio" && (
            <input
              type="text"
              name="adress"
              value={adress}
              onChange={(e) => setAdress(e.target.value)}
              placeholder="Dirección completa con C.P. y población"
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4C9453]"
            />
          )}

          <input
            type="text"
            name="number"
            value={number}
            onChange={handleChange}
            inputMode="numeric"
            placeholder="Teléfono"
            maxLength={14}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4C9453]"
          />
          <textarea
            name="order"
            placeholder="¿Qué quieres pedir?"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            rows={4}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4C9453] resize-none"
          />
          <button

            type="submit"
            className="mt-3 py-3 bg-[#4C9453] text-white rounded-md text-xl font-bold hover:bg-green-700 transition">
            Enviar pedido
          </button>
        </form>
      </section>

    </main>

  );
}