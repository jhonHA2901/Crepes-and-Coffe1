import React from 'react';

/**
 * Componente para mostrar un estado vacío con mensaje y opcionalmente un botón de acción
 * @param {string} title - Título del estado vacío
 * @param {string} message - Mensaje descriptivo
 * @param {string} icon - Nombre del icono de FontAwesome (sin el 'fa-')
 * @param {string} actionText - Texto del botón de acción
 * @param {function} onAction - Función a ejecutar al hacer clic en el botón
 * @param {string} className - Clases adicionales
 */
const EmptyState = ({
  title = 'No hay datos disponibles',
  message = 'No se encontraron elementos para mostrar.',
  icon = 'inbox',
  actionText,
  onAction,
  className = ''
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm p-8 text-center ${className}`}>
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
        <i className={`fas fa-${icon} text-2xl text-gray-500`}></i>
      </div>
      
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">{message}</p>
      
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

/**
 * Componente para mostrar un estado vacío de búsqueda
 */
export const SearchEmptyState = ({
  searchTerm,
  onClear
}) => {
  return (
    <EmptyState
      title="No se encontraron resultados"
      message={`No se encontraron elementos que coincidan con "${searchTerm}".`}
      icon="search"
      actionText="Limpiar búsqueda"
      onAction={onClear}
    />
  );
};

/**
 * Componente para mostrar un estado vacío de filtro
 */
export const FilterEmptyState = ({
  onClear
}) => {
  return (
    <EmptyState
      title="No hay coincidencias"
      message="No se encontraron elementos que coincidan con los filtros aplicados."
      icon="filter"
      actionText="Limpiar filtros"
      onAction={onClear}
    />
  );
};

/**
 * Componente para mostrar un estado vacío con opción de crear
 */
export const CreateEmptyState = ({
  entityName = 'elementos',
  onCreate
}) => {
  return (
    <EmptyState
      title={`No hay ${entityName} disponibles`}
      message={`Aún no se han creado ${entityName}. ¡Crea el primero ahora!`}
      icon="plus-circle"
      actionText={`Crear ${entityName.slice(0, -1)}`} // Quita la 's' final para singular
      onAction={onCreate}
    />
  );
};

export default EmptyState;