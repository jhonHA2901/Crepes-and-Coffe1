import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaExclamationCircle, FaArrowLeft, FaQuestionCircle } from 'react-icons/fa';

const ReservaFallida = () => {
  const { id } = useParams();

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="bg-red-50 border border-red-200 rounded-lg p-8 mb-8 text-center">
        <FaExclamationCircle className="text-red-500 text-6xl mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-red-700 mb-2">Pago no completado</h1>
        <p className="text-lg text-red-600 mb-4">Lo sentimos, no pudimos procesar tu pago correctamente.</p>
        <p className="text-gray-600 mb-6">Tu reserva no ha sido confirmada. Puedes intentarlo nuevamente o contactar con nuestro equipo de soporte.</p>
      </div>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
        <div className="bg-gray-100 p-6">
          <h2 className="text-xl font-semibold">¿Qué puedo hacer ahora?</h2>
        </div>
        
        <div className="p-6">
          <ul className="space-y-4">
            <li className="flex">
              <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-primary text-white font-bold mr-3">1</div>
              <div>
                <p className="text-gray-700">Verifica que los datos de tu tarjeta sean correctos e intenta nuevamente.</p>
              </div>
            </li>
            <li className="flex">
              <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-primary text-white font-bold mr-3">2</div>
              <div>
                <p className="text-gray-700">Prueba con otro método de pago si está disponible.</p>
              </div>
            </li>
            <li className="flex">
              <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-primary text-white font-bold mr-3">3</div>
              <div>
                <p className="text-gray-700">Contacta con nuestro equipo de soporte si el problema persiste.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 justify-center">
        <Link to={`/eventos`} className="bg-primary text-white px-6 py-3 rounded-full hover:bg-primary-dark transition duration-300 flex items-center">
          <FaArrowLeft className="mr-2" />
          Volver a eventos
        </Link>
        <Link to="/contacto" className="bg-white border border-primary text-primary px-6 py-3 rounded-full hover:bg-gray-50 transition duration-300 flex items-center">
          <FaQuestionCircle className="mr-2" />
          Contactar soporte
        </Link>
      </div>
    </div>
  );
};

export default ReservaFallida;