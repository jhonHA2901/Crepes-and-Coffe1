import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  FaHome,
  FaBox,
  FaShoppingCart,
  FaUsers,
  FaCalendarAlt,
  FaTicketAlt,
  FaChartBar,
  FaCog,
  FaSignOutAlt
} from 'react-icons/fa';

const AdminSidebar = () => {
  const { logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100';
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="w-64 bg-white shadow-md min-h-screen">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-primary">Panel Admin</h2>
        <p className="text-sm text-gray-500">Gestión de la tienda</p>
      </div>
      
      <nav className="mt-4">
        <ul>
          <li>
            <Link
              to="/admin"
              className={`flex items-center px-4 py-3 ${isActive('/admin')}`}
            >
              <FaHome className="mr-3" />
              <span>Dashboard</span>
            </Link>
          </li>
          
          <li>
            <Link
              to="/admin/productos"
              className={`flex items-center px-4 py-3 ${isActive('/admin/productos')}`}
            >
              <FaBox className="mr-3" />
              <span>Productos</span>
            </Link>
          </li>
          
          <li>
            <Link
              to="/admin/pedidos"
              className={`flex items-center px-4 py-3 ${isActive('/admin/pedidos')}`}
            >
              <FaShoppingCart className="mr-3" />
              <span>Pedidos</span>
            </Link>
          </li>
          
          <li>
            <Link
              to="/admin/usuarios"
              className={`flex items-center px-4 py-3 ${isActive('/admin/usuarios')}`}
            >
              <FaUsers className="mr-3" />
              <span>Usuarios</span>
            </Link>
          </li>
          
          <li>
            <Link
              to="/admin/eventos"
              className={`flex items-center px-4 py-3 ${isActive('/admin/eventos')}`}
            >
              <FaCalendarAlt className="mr-3" />
              <span>Eventos</span>
            </Link>
          </li>
          
          <li>
            <Link
              to="/admin/reservas"
              className={`flex items-center px-4 py-3 ${isActive('/admin/reservas')}`}
            >
              <FaTicketAlt className="mr-3" />
              <span>Reservas</span>
            </Link>
          </li>
        </ul>
      </nav>
      
      <div className="absolute bottom-0 w-full border-t border-gray-200 p-4">
        <button
          onClick={handleLogout}
          className="flex items-center text-red-500 hover:text-red-700 w-full"
        >
          <FaSignOutAlt className="mr-3" />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;