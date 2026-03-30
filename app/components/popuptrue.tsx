"use client";

type Props = {
    visible: boolean;
    pedidoID: number;
    onClose: () => void;
}

export default function PopupTrue({ visible, pedidoID, onClose }: Props) {
    if (!visible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center max-w-sm w-full">
                <h2 className="text-2xl font-bold text-green-600 mb-4">Pedido Completado</h2>

                <p className="mb-2">
                    Tu pedido se ha realizado con éxito.
                </p>

                <p className="font-semibold mb-2">
                    Id del pedido: {pedidoID}
                </p>

                <p className="text-sm text-gray-600 mb-2">
                    Una vez busques tu pedido se actualizará en tiempo real en un máximo de cinco minutos para ver el precio y el estado.
                </p>

                <p className="text-sm text-gray-600 mb-4">
                    Para cualquier duda llama al: <b>+34 631 37 55 13</b>
                </p>

                {/* Botón extra para consultar el estado */}
                <a
                    href={`http://localhost:3000/pedidoHecho?id=${pedidoID}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mb-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                >
                    Con el ID que ves en pantalla puedes consultarlo
                </a>

                {/* Botón para cerrar popup */}
                <button
                    className="mt-2 px-4 py-2 bg-[#4C9453] text-white rounded-md hover:bg-green-700"
                    onClick={onClose}
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
}