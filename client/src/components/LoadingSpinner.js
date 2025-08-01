import React from 'react';

const LoadingSpinner = ({ 
  size = 'md', 
  color = 'amber', 
  text = '', 
  className = '',
  fullScreen = false 
}) => {
  // Definir tamaños
  const sizeClasses = {
    xs: 'w-4 h-4',
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  // Definir colores
  const colorClasses = {
    amber: 'border-amber-700',
    blue: 'border-blue-600',
    green: 'border-green-600',
    red: 'border-red-600',
    gray: 'border-gray-600',
    white: 'border-white'
  };

  // Definir tamaños de texto
  const textSizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  const spinnerClasses = `
    spinner 
    ${sizeClasses[size]} 
    ${colorClasses[color]} 
    ${className}
  `.trim();

  const containerClasses = fullScreen 
    ? 'fixed inset-0 bg-white bg-opacity-75 flex flex-col items-center justify-center z-50'
    : 'flex flex-col items-center justify-center';

  return (
    <div className={containerClasses}>
      <div className={spinnerClasses}></div>
      {text && (
        <p className={`mt-3 text-gray-600 ${textSizeClasses[size]} animate-pulse`}>
          {text}
        </p>
      )}
    </div>
  );
};

// Componente para spinner de página completa
export const FullPageSpinner = ({ text = 'Cargando...' }) => {
  return (
    <LoadingSpinner 
      size="lg" 
      text={text} 
      fullScreen={true}
    />
  );
};

// Componente para spinner de botón
export const ButtonSpinner = ({ size = 'sm' }) => {
  return (
    <LoadingSpinner 
      size={size} 
      color="white" 
      className="mr-2"
    />
  );
};

// Componente para spinner de tarjeta
export const CardSpinner = ({ text = 'Cargando contenido...' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <LoadingSpinner size="lg" text={text} />
    </div>
  );
};

// Componente para skeleton loading
export const SkeletonLoader = ({ 
  lines = 3, 
  className = '',
  showAvatar = false 
}) => {
  return (
    <div className={`animate-pulse ${className}`}>
      {showAvatar && (
        <div className="flex items-center space-x-4 mb-4">
          <div className="skeleton-avatar"></div>
          <div className="flex-1">
            <div className="skeleton-text w-1/4 mb-2"></div>
            <div className="skeleton-text w-1/2"></div>
          </div>
        </div>
      )}
      <div className="space-y-3">
        {Array.from({ length: lines }).map((_, index) => (
          <div 
            key={index}
            className={`skeleton-text ${
              index === lines - 1 ? 'w-3/4' : 'w-full'
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

// Componente para skeleton de producto
export const ProductSkeleton = () => {
  return (
    <div className="card animate-pulse">
      <div className="skeleton h-48 rounded-t-xl"></div>
      <div className="card-body">
        <div className="skeleton-text w-3/4 mb-2"></div>
        <div className="skeleton-text w-full mb-3"></div>
        <div className="skeleton-text w-1/2 mb-4"></div>
        <div className="skeleton h-10 rounded-lg"></div>
      </div>
    </div>
  );
};

// Componente para skeleton de lista
export const ListSkeleton = ({ items = 5 }) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: items }).map((_, index) => (
        <div key={index} className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow animate-pulse">
          <div className="skeleton-avatar"></div>
          <div className="flex-1">
            <div className="skeleton-text w-1/3 mb-2"></div>
            <div className="skeleton-text w-2/3"></div>
          </div>
          <div className="skeleton w-20 h-8 rounded"></div>
        </div>
      ))}
    </div>
  );
};

// Componente para skeleton de tabla
export const TableSkeleton = ({ rows = 5, columns = 4 }) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Header skeleton */}
      <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
        <div className="flex space-x-4">
          {Array.from({ length: columns }).map((_, index) => (
            <div key={index} className="skeleton-text w-20 h-4"></div>
          ))}
        </div>
      </div>
      
      {/* Rows skeleton */}
      <div className="divide-y divide-gray-200">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="px-6 py-4">
            <div className="flex space-x-4">
              {Array.from({ length: columns }).map((_, colIndex) => (
                <div 
                  key={colIndex} 
                  className={`skeleton-text h-4 ${
                    colIndex === 0 ? 'w-32' : 
                    colIndex === columns - 1 ? 'w-16' : 'w-24'
                  }`}
                ></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Componente para estados de carga con diferentes variantes
export const LoadingState = ({ 
  variant = 'spinner', 
  size = 'md',
  text = 'Cargando...',
  className = ''
}) => {
  // Definir tamaños
  const sizeClasses = {
    xs: 'w-4 h-4',
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };
  
  switch (variant) {
    case 'dots':
      return (
        <div className={`flex items-center justify-center space-x-2 ${className}`}>
          <div className="w-2 h-2 bg-amber-700 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-amber-700 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-amber-700 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          {text && <span className="ml-3 text-gray-600">{text}</span>}
        </div>
      );
    
    case 'pulse':
      return (
        <div className={`flex items-center justify-center ${className}`}>
          <div className={`${sizeClasses[size]} bg-amber-700 rounded-full animate-pulse-slow`}></div>
          {text && <span className="ml-3 text-gray-600">{text}</span>}
        </div>
      );
    
    case 'bars':
      return (
        <div className={`flex items-center justify-center space-x-1 ${className}`}>
          <div className="w-1 h-6 bg-amber-700 animate-pulse" style={{ animationDelay: '0s' }}></div>
          <div className="w-1 h-6 bg-amber-700 animate-pulse" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-1 h-6 bg-amber-700 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-1 h-6 bg-amber-700 animate-pulse" style={{ animationDelay: '0.3s' }}></div>
          {text && <span className="ml-3 text-gray-600">{text}</span>}
        </div>
      );
    
    default:
      return <LoadingSpinner size={size} text={text} className={className} />;
  }
};

export default LoadingSpinner;