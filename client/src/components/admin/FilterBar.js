import React from 'react';

/**
 * Componente para barra de filtros y búsqueda en paneles administrativos
 * @param {string} searchTerm - Término de búsqueda
 * @param {function} onSearchChange - Función para manejar cambios en la búsqueda
 * @param {array} filters - Array de filtros disponibles
 * @param {object} activeFilters - Objeto con filtros activos
 * @param {function} onFilterChange - Función para manejar cambios en los filtros
 * @param {function} onClearFilters - Función para limpiar todos los filtros
 * @param {string} searchPlaceholder - Texto de placeholder para el campo de búsqueda
 * @param {boolean} showClearButton - Si se muestra el botón de limpiar filtros
 */
const FilterBar = ({
  searchTerm = '',
  onSearchChange,
  filters = [],
  activeFilters = {},
  onFilterChange,
  onClearFilters,
  searchPlaceholder = 'Buscar...',
  showClearButton = true
}) => {
  // Verificar si hay filtros activos
  const hasActiveFilters = Object.values(activeFilters).some(value => {
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    return value !== '' && value !== null && value !== undefined;
  });

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        {/* Campo de búsqueda */}
        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <i className="fas fa-search text-gray-400"></i>
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
            placeholder={searchPlaceholder}
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap items-center gap-3">
          {filters.map((filter) => {
            // Si el filtro es un select
            if (filter.type === 'select') {
              return (
                <div key={filter.id} className="flex items-center">
                  <label htmlFor={filter.id} className="mr-2 text-sm font-medium text-gray-700">
                    {filter.label}:
                  </label>
                  <select
                    id={filter.id}
                    value={activeFilters[filter.id] || ''}
                    onChange={(e) => onFilterChange(filter.id, e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm rounded-md"
                  >
                    <option value="">{filter.placeholder || 'Todos'}</option>
                    {filter.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              );
            }

            // Si el filtro es un rango de fechas
            if (filter.type === 'dateRange') {
              return (
                <div key={filter.id} className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-700">{filter.label}:</label>
                  <input
                    type="date"
                    value={activeFilters[`${filter.id}Start`] || ''}
                    onChange={(e) => onFilterChange(`${filter.id}Start`, e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm rounded-md"
                  />
                  <span className="text-gray-500">a</span>
                  <input
                    type="date"
                    value={activeFilters[`${filter.id}End`] || ''}
                    onChange={(e) => onFilterChange(`${filter.id}End`, e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm rounded-md"
                  />
                </div>
              );
            }

            // Si el filtro es un checkbox
            if (filter.type === 'checkbox') {
              return (
                <div key={filter.id} className="flex items-center">
                  <input
                    id={filter.id}
                    type="checkbox"
                    checked={!!activeFilters[filter.id]}
                    onChange={(e) => onFilterChange(filter.id, e.target.checked)}
                    className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                  />
                  <label htmlFor={filter.id} className="ml-2 block text-sm text-gray-700">
                    {filter.label}
                  </label>
                </div>
              );
            }

            // Si el filtro es un radio
            if (filter.type === 'radio') {
              return (
                <div key={filter.id} className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-700">{filter.label}:</span>
                  <div className="flex space-x-4">
                    {filter.options.map((option) => (
                      <div key={option.value} className="flex items-center">
                        <input
                          id={`${filter.id}-${option.value}`}
                          name={filter.id}
                          type="radio"
                          value={option.value}
                          checked={activeFilters[filter.id] === option.value}
                          onChange={() => onFilterChange(filter.id, option.value)}
                          className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300"
                        />
                        <label
                          htmlFor={`${filter.id}-${option.value}`}
                          className="ml-2 block text-sm text-gray-700"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }

            return null;
          })}

          {/* Botón para limpiar filtros */}
          {showClearButton && hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
            >
              <i className="fas fa-times-circle mr-2"></i>
              Limpiar filtros
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;