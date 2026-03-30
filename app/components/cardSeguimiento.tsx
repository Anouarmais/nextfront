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

export default function CardSeguimiento({ id, order, domicilio, customer_name, adress, number, total, status }: PedidoProps) {




    return (
        <div>
        <div className="text-xl text-center flex justify-center mt-8 mb-16">
            <h1>INFORMACION DE PEDIDO </h1>
        </div>
        <div className="border-2 border-green-500 p-4 space-y-1 flex flex-col justify-between aspect-square ">
            {id && <p><strong>ID:</strong> {id}</p>}
            {customer_name && <p><strong>Nombre:</strong> {customer_name}</p>}
            {adress && <p><strong>Direccion:</strong> {adress}</p>}
            {order && <p><strong>Pedido:</strong> {order}</p>}
            <p><strong>Pedido:</strong> {total}</p>
            <p><strong>Forma entrega: {domicilio ? "DOMICILIO" : "RECOGIDA"}</strong></p>
            {number && <p><strong>Numero:</strong> {number}</p>}
             <p><strong>Estado:</strong> {status}</p>

        </div>
        </div>
        )
}