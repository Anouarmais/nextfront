import React, { useState } from "react";
export enum PedidosStatus {
    EN_PROCESO = 'EN PROCESO',
    EN_REPARTO = 'EN REPARTO',
    ENTREGADO = 'ENTREGADO',
    CANCELADO = 'CANCELADO'
}
export type PedidoProps = {
    id: number;
    domicilio: boolean;
    customer_name: string;
    adress: string;
    number: string;
    order: string;
    total?: number;
    status?: PedidosStatus;
};

export default function CardOrden({ id, order, domicilio, customer_name, adress, number, total }: PedidoProps) {

    const [status, setStatus] = useState<PedidosStatus>(PedidosStatus.EN_PROCESO);
    const [totalmod, setTotalmod] = useState(total || 0);
    const nuevoTotal = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        setTotalmod(value);
                try {
            const link = `http://localhost:3001/ordenesTrabajo/${id}/total`;
            fetch(link, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ total: value }),
            })
        }
        catch (error) {
            console.error("Error al actualizar el total del pedido:", error);
        }
    }
    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const nuevoStatus = e.target.value as PedidosStatus;
        setStatus(nuevoStatus);

        try {
            const link = `http://localhost:3001/ordenesTrabajo/${id}/status`;
            fetch(link, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ status: nuevoStatus }),
            })
        }
        catch (error) {
            console.error("Error al actualizar el estado del pedido:", error);
        }
    };
    return (
        <div className="border-2 border-green-500 p-4 space-y-1 flex flex-col justify-between aspect-square ">
            {id && <p><strong>ID:</strong> {id}</p>}
            {customer_name && <p><strong>Nombre:</strong> {customer_name}</p>}
            {adress && <p><strong>Direccion:</strong> {adress}</p>}
            {order && <p><strong>Pedido:</strong> {order}</p>}
            <input
                type="number"
                value={totalmod}
                onChange={nuevoTotal}
                className="border-2 border-black rounded-md px-2 py-1 w-24"
            />
            <p><strong>Forma entrega: {domicilio ? "DOMICILIO" : "RECOGIDA"}</strong></p>
            {number && <p><strong>Numero:</strong> {number}</p>}
            <select
                value={status}
                onChange={handleStatusChange}
                className="border-2 border-black rounded-md px-2 py-1 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
                {Object.values(PedidosStatus).map((statusOption) => (
                    <option key={statusOption} value={statusOption}>
                        {statusOption}
                    </option>
                ))}
            </select>
        </div>)
}