onKeyDown={(e) => e.stopPropagation()}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Dirección</label>
                <input
                  type="text"
                  value={data.company.direccion}
                  onChange={(e) => setData(prev => ({
                    ...prev,
                    company: { ...prev.company, direccion: e.target.value }
                  }))}
                  onKeyDown={(e) => e.stopPropagation()}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ciudad</label>
                <input
                  type="text"
                  value={data.company.ciudad}
                  onChange={(e) => setData(prev => ({
                    ...prev,
                    company: { ...prev.company, ciudad: e.target.value }
                  }))}
                  onKeyDown={(e) => e.stopPropagation()}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Región</label>
                <input
                  type="text"
                  value={data.company.region}
                  onChange={(e) => setData(prev => ({
                    ...prev,
                    company: { ...prev.company, region: e.target.value }
                  }))}
                  onKeyDown={(e) => e.stopPropagation()}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                <input
                  type="text"
                  value={data.company.telefono}
                  onChange={(e) => setData(prev => ({
                    ...prev,
                    company: { ...prev.company, telefono: e.target.value }
                  }))}
                  onKeyDown={(e) => e.stopPropagation()}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={data.company.email}
                  onChange={(e) => setData(prev => ({
                    ...prev,
                    company: { ...prev.company, email: e.target.value }
                  }))}
                  onKeyDown={(e) => e.stopPropagation()}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Logo de la Empresa</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Arrastra tu logo aquí o haz clic para seleccionar</p>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              </div>
              
              <div className="md:col-span-2">
                <button
                  type="button"
                  onClick={() => {
                    showNotification('Configuración guardada exitosamente', 'success');
                  }}
                  className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Guardar Configuración</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Panel de personalización */}
        <div className="space-y-6">
          {/* Personalización de tema */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Personalización</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tema de Color</label>
                <div className="grid grid-cols-5 gap-2">
                  {Object.entries(themes).map(([themeName, themeColors]) => (
                    <button
                      key={themeName}
                      onClick={() => setTheme(themeName)}
                      className={`w-10 h-10 rounded-lg border-2 transition-all ${
                        theme === themeName ? 'border-gray-400 scale-110' : 'border-gray-200'
                      }`}
                      style={{ backgroundColor: `var(--${themeColors.primary})` }}
                      title={`Tema ${themeName}`}
                    >
                      {theme === themeName && (
                        <div className="w-full h-full rounded-md bg-white bg-opacity-30 flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Modo Oscuro</label>
                  <p className="text-xs text-gray-500">Cambia la apariencia de la aplicación</p>
                </div>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    darkMode ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      darkMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Vista Compacta</label>
                  <p className="text-xs text-gray-500">Reduce el tamaño del sidebar</p>
                </div>
                <button
                  onClick={() => setCompactView(!compactView)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    compactView ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      compactView ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Gestión de usuarios (solo para admin) */}
          {currentUser?.role === 'admin' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Usuarios del Sistema</h3>
              
              <div className="space-y-3">
                {data.users.map(user => (
                  <div key={user.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{user.name}</p>
                        <p className="text-gray-500 text-xs">{user.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        user.role === 'admin' 
                          ? 'bg-red-100 text-red-800'
                          : user.role === 'seller'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {user.role === 'admin' ? 'Administrador' : 
                         user.role === 'seller' ? 'Vendedor' : 'Usuario'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Acciones del sistema */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Acciones del Sistema</h3>
            
            <div className="space-y-3">
              <button
                onClick={generateBackup}
                className="w-full flex items-center space-x-3 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Download className="w-5 h-5 text-blue-600" />
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900">Crear Backup</p>
                  <p className="text-xs text-gray-500">Descargar copia de seguridad</p>
                </div>
              </button>
              
              <button
                onClick={() => {
                  if (window.confirm('¿Estás seguro de que quieres reiniciar la aplicación? Se perderán los datos no guardados.')) {
                    window.location.reload();
                  }
                }}
                className="w-full flex items-center space-x-3 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <RefreshCw className="w-5 h-5 text-orange-600" />
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900">Reiniciar Sistema</p>
                  <p className="text-xs text-gray-500">Recargar la aplicación</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Modales para clientes y servicios (simplificados para espacio)
  const ClientModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {editingClient ? 'Editar Cliente' : 'Nuevo Cliente'}
            </h2>
            <button onClick={cancelEdit} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">RUT *</label>
              <input
                type="text"
                value={editingClient ? editingClient.rut : newClient.rut}
                onChange={(e) => {
                  const formattedRut = formatRut(e.target.value);
                  if (editingClient) {
                    setEditingClient(prev => ({ ...prev, rut: formattedRut }));
                  } else {
                    setNewClient(prev => ({ ...prev, rut: formattedRut }));
                  }
                }}
                onKeyDown={(e) => e.stopPropagation()}
                placeholder="12.345.678-9"
                maxLength="12"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Encargado</label>
              <input
                type="text"
                value={editingClient ? editingClient.encargado : newClient.encargado}
                onChange={(e) => {
                  const value = e.target.value;
                  if (editingClient) {
                    setEditingClient(prev => ({ ...prev, encargado: value }));
                  } else {
                    setNewClient(prev => ({ ...prev, encargado: value }));
                  }
                }}
                onKeyDown={(e) => e.stopPropagation()}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Empresa *</label>
              <input
                type="text"
                value={editingClient ? editingClient.empresa : newClient.empresa}
                onChange={(e) => {
                  const value = e.target.value;
                  if (editingClient) {
                    setEditingClient(prev => ({ ...prev, empresa: value }));
                  } else {
                    setNewClient(prev => ({ ...prev, empresa: value }));
                  }
                }}
                onKeyDown={(e) => e.stopPropagation()}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            {/* Resto de campos similares... */}
          </form>
          
          <div className="flex justify-end space-x-4 mt-6">
            <button
              onClick={cancelEdit}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={saveClient}
              className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>{editingClient ? 'Actualizar' : 'Guardar'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const ServiceModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {editingService ? 'Editar Servicio' : 'Nuevo Servicio'}
            </h2>
            <button onClick={cancelEdit} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del Servicio *</label>
              <input
                type="text"
                value={editingService ? editingService.name : newService.name}
                onChange={(e) => {
                  const value = e.target.value;
                  if (editingService) {
                    setEditingService(prev => ({ ...prev, name: value }));
                  } else {
                    setNewService(prev => ({ ...prev, name: value }));
                  }
                }}
                onKeyDown={(e) => e.stopPropagation()}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ej: GRUA HORQUILLA 5 TON"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
              <select
                value={editingService ? editingService.category : newService.category}
                onChange={(e) => {
                  const value = e.target.value;
                  if (editingService) {
                    setEditingService(prev => ({ ...prev, category: value }));
                  } else {
                    setNewService(prev => ({ ...prev, category: value }));
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="General">General</option>
                <option value="Elevadores">Elevadores</option>
                <option value="Transporte">Transporte</option>
                <option value="Personal">Personal</option>
                <option value="Combustible">Combustible</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Precio ($) *</label>
              <input
                type="number"
                value={editingService ? editingService.price : newService.price}
                onChange={(e) => {
                  const value = e.target.value;
                  if (editingService) {
                    setEditingService(prev => ({ ...prev, price: value }));
                  } else {
                    setNewService(prev => ({ ...prev, price: value }));
                  }
                }}
                onKeyDown={(e) => e.stopPropagation()}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
                min="0"
                required
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                checked={editingService ? editingService.active : newService.active}
                onChange={(e) => {
                  const value = e.target.checked;
                  if (editingService) {
                    setEditingService(prev => ({ ...prev, active: value }));
                  } else {
                    setNewService(prev => ({ ...prev, active: value }));
                  }
                }}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 text-sm text-gray-700">Servicio activo</label>
            </div>
          </form>
          
          <div className="flex justify-end space-x-4 mt-6">
            <button
              onClick={cancelEdit}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={saveService}
              className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>{editingService ? 'Actualizar' : 'Guardar'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Renderizado condicional principal
  if (!currentUser) {
    return (
      <>
        <AuthView />
        <NotificationContainer />
      </>
    );
  }

  return (
    <div className={`flex h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'} transition-colors duration-300`}>
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        {currentView === 'dashboard' && <DashboardView />}
        {currentView === 'quotations' && <QuotationsView />}
        {currentView === 'clients' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Clientes</h1>
                <p className="text-gray-600 mt-1">{getFilteredClients().length} clientes registrados</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => exportToExcel('clients')}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Excel</span>
                </button>
                <button
                  onClick={() => {
                    setModalType('client');
                    setShowModal(true);
                  }}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Nuevo Cliente</span>
                </button>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Buscar clientes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.stopPropagation()}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">RUT</th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Empresa</th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Encargado</th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Ciudad</th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Cotizaciones</th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getFilteredClients().map(client => {
                      const clientQuotations = data.quotations.filter(q => q.client === client.empresa);
                      return (
                        <tr key={client.id} className="hover:bg-gray-50 transition-colors border-b border-gray-100">
                          <td className="py-4 px-6 font-semibold text-green-600">${service.price.toLocaleString()}</td>
                          <td className="py-4 px-6">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                              service.active 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {service.active ? 'Activo' : 'Inactivo'}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-gray-600">{serviceUsage}x usado</td>
                          <td className="py-4 px-6">
                            <div className="flex space-x-1">
                              <button 
                                onClick={() => startEdit('service', service)}
                                className="p-2 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-100 rounded-lg transition-colors"
                                title="Editar"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => deleteItem('services', service.id)}
                                className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-lg transition-colors"
                                title="Eliminar"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        {currentView === 'reports' && <ReportsView />}
        {currentView === 'settings' && <SettingsView />}
      </div>
      
      {/* Componentes flotantes */}
      <NotificationContainer />
      <SystemNotificationPanel />
      
      {/* Modales */}
      {showModal && modalType === 'quotation' && <QuotationModal />}
      {showModal && modalType === 'client' && <ClientModal />}
      {showModal && modalType === 'service' && <ServiceModal />}
      
      {/* Estilos CSS adicionales */}
      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
        
        /* Personalización de scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 3px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }
        
        /* Efectos de hover mejorados */
        .hover-scale:hover {
          transform: scale(1.02);
          transition: transform 0.2s ease-in-out;
        }
        
        /* Animaciones de carga */
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        
        /* Variables de color CSS para temas */
        :root {
          --blue-600: #2563eb;
          --blue-100: #dbeafe;
          --blue-400: #60a5fa;
          --green-600: #16a34a;
          --green-100: #dcfce7;
          --green-400: #4ade80;
          --purple-600: #9333ea;
          --purple-100: #f3e8ff;
          --purple-400: #c084fc;
          --red-600: #dc2626;
          --red-100: #fee2e2;
          --red-400: #f87171;
          --gray-600: #4b5563;
          --gray-100: #f3f4f6;
          --gray-400: #9ca3af;
        }
      `}</style>
    </div>
  );
};

export default CotizacionesApp;font-mono text-sm text-gray-900">{client.rut}</td>
                          <td className="py-4 px-6 font-medium text-gray-900">{client.empresa}</td>
                          <td className="py-4 px-6 text-gray-700">{client.encargado}</td>
                          <td className="py-4 px-6 text-gray-600">{client.ciudad}</td>
                          <td className="py-4 px-6">
                            <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                              {clientQuotations.length} cotizaciones
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex space-x-1">
                              <button 
                                onClick={() => startEdit('client', client)}
                                className="p-2 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-100 rounded-lg transition-colors"
                                title="Editar"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => deleteItem('clients', client.id)}
                                className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-lg transition-colors"
                                title="Eliminar"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        {currentView === 'services' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Servicios</h1>
                <p className="text-gray-600 mt-1">{getFilteredServices().length} servicios disponibles</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => exportToExcel('services')}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Excel</span>
                </button>
                <button
                  onClick={() => {
                    setModalType('service');
                    setShowModal(true);
                  }}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Nuevo Servicio</span>
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Servicio</th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Categoría</th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Precio</th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Estado</th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Uso</th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getFilteredServices().map(service => {
                      const serviceUsage = data.quotations.reduce((count, q) => 
                        count + q.items.filter(item => item.service === service.name).length, 0
                      );
                      
                      return (
                        <tr key={service.id} className="hover:bg-gray-50 transition-colors border-b border-gray-100">
                          <td className="py-4 px-6 font-medium text-gray-900">{service.name}</td>
                          <td className="py-4 px-6 text-gray-600">{service.category}</td>
                          <td className="py-4 px-6   // Vista de configuración con temas y personalización
  const SettingsView = () => (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Configuración</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuración de la empresa */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Información de la Empresa</h2>
            
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Razón Social</label>
                <input
                  type="text"
                  value={data.company.razonSocial}
                  onChange={(e) => setData(prev => ({
                    ...prev,
                    company: { ...prev.company, razonSocial: e.target.value }
                  }))}
                  onKeyDown={(e) => e.stopPropagation()}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">RUT</label>
                <input
                  type="text"
                  value={data.company.rut}
                  onChange={(e) => setData(prev => ({
                    ...prev,
                    company: { ...prev.company, rut: e.target.value }
                  }))}
                  onKeyDown={(e) => e.stopPropagation  // Vista de cotizaciones mejorada
  const QuotationsView = () => (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Cotizaciones</h1>
          <p className="text-gray-600 mt-1">{getFilteredQuotations().length} cotizaciones encontradas</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => exportToExcel('quotations')}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Excel</span>
          </button>
          <button
            onClick={() => {
              setModalType('quotation');
              setShowModal(true);
            }}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Nueva Cotización</span>
          </button>
        </div>
      </div>
      
      {/* Barra de búsqueda y filtros mejorada */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar por cliente, número o estado..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.stopPropagation()}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center space-x-2 px-4 py-2 border rounded-lg transition-colors ${
                showFilters ? 'bg-blue-50 border-blue-500 text-blue-700' : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Filter className="w-4 h-4" />
              <span>Filtros</span>
              {Object.values(filters).some(f => f !== '') && (
                <span className="bg-blue-500 text-white text-xs rounded-full w-2 h-2"></span>
              )}
            </button>
          </div>
        </div>
      </div>
      
      <AdvancedFilters />
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Número</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Cliente</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Fecha</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Válida Hasta</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Total</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Estado</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Prioridad</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {getFilteredQuotations().map(quote => (
                <tr key={quote.id} className="hover:bg-gray-50 transition-colors border-b border-gray-100">
                  <td className="py-4 px-6 font-medium text-gray-900">{quote.number}</td>
                  <td className="py-4 px-6 text-gray-700">{quote.client}</td>
                  <td className="py-4 px-6 text-gray-600">{quote.date}</td>
                  <td className="py-4 px-6 text-gray-600">
                    <span className={`${new Date(quote.validUntil) < new Date() ? 'text-red-600 font-medium' : 'text-gray-600'}`}>
                      {quote.validUntil}
                    </span>
                  </td>
                  <td className="py-4 px-6 font-semibold text-gray-900">${quote.total.toLoc  // Función para agregar item a cotización
  const addQuotationItem = () => {
    const currentItems = editingQuotation ? editingQuotation.items : newQuotation.items;
    const newItem = { quantity: 1, service: '', unitPrice: 0, total: 0 };
    
    if (editingQuotation) {
      setEditingQuotation(prev => ({ ...prev, items: [...currentItems, newItem] }));
    } else {
      setNewQuotation(prev => ({ ...prev, items: [...currentItems, newItem] }));
    }
  };

  // Función para actualizar item de cotización
  const updateQuotationItem = (index, field, value) => {
    const isEditing = editingQuotation !== null;
    const items = isEditing ? [...editingQuotation.items] : [...newQuotation.items];
    
    items[index][field] = value;
    
    if (field === 'service') {
      const service = data.services.find(s => s.name === value);
      items[index].unitPrice = service ? service.price : 0;
    }
    
    items[index].total = items[index].quantity * items[index].unitPrice;
    
    if (isEditing) {
      setEditingQuotation(prev => ({ ...prev, items }));
    } else {
      setNewQuotation(prev => ({ ...prev, items }));
    }
  };

  // Función para exportar a PDF
  const exportToPDF = (quotation) => {
    const totals = calculateQuotationTotals(quotation.items, quotation.discount);
    const client = data.clients.find(c => c.empresa === quotation.client);
    
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 30px;">
          <h1 style="color: #333; margin: 0;">${data.company.razonSocial}</h1>
          <p style="margin: 5px 0;">${data.company.direccion} - ${data.company.ciudad}, ${data.company.region}</p>
          <p style="margin: 5px 0;">RUT: ${data.company.rut} | Tel: ${data.company.telefono}</p>
          <p style="margin: 5px 0;">Email: ${data.company.email}</p>
        </div>
        
        <div style="display: flex; justify-content: space-between; margin-bottom: 30px;">
          <div>
            <h2 style="color: #333;">COTIZACIÓN</h2>
            <p><strong>Número:</strong> ${quotation.number}</p>
            <p><strong>Fecha:</strong> ${quotation.date}</p>
            <p><strong>Válida hasta:</strong> ${quotation.validUntil}</p>
            <p><strong>Estado:</strong> ${quotation.status}</p>
            <p><strong>Prioridad:</strong> ${quotation.priority}</p>
          </div>
          <div style="text-align: right;">
            <h3 style="color: #333;">CLIENTE</h3>
            <p><strong>${client?.empresa || quotation.client}</strong></p>
            <p>RUT: ${client?.rut || ''}</p>
            <p>Contacto: ${client?.encargado || ''}</p>
            <p>${client?.direccion || ''}</p>
            <p>${client?.ciudad || ''}, ${client?.region || ''}</p>
            <p>Tel: ${client?.telefono || ''}</p>
            <p>Email: ${client?.email || ''}</p>
          </div>
        </div>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
          <thead>
            <tr style="background-color: #f5f5f5;">
              <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Cantidad</th>
              <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Servicio</th>
              <th style="border: 1px solid #ddd; padding: 12px; text-align: right;">Precio Unit.</th>
              <th style="border: 1px solid #ddd; padding: 12px; text-align: right;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${quotation.items.map(item => `
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">${item.quantity}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${item.service}</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${item.unitPrice.toLocaleString()}</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${item.total.toLocaleString()}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        
        ${quotation.notes ? `
          <div style="margin-bottom: 20px; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #007bff;">
            <h4 style="margin: 0 0 10px 0; color: #333;">Notas:</h4>
            <p style="margin: 0; color: #666;">${quotation.notes}</p>
          </div>
        ` : ''}
        
        <div style="display: flex; justify-content: flex-end;">
          <div style="width: 350px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span>Subtotal:</span>
              <span>${totals.subtotal.toLocaleString()}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span>IVA (19%):</span>
              <span>${totals.iva.toLocaleString()}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span>Total Bruto:</span>
              <span>${totals.totalBruto.toLocaleString()}</span>
            </div>
            ${totals.discountAmount > 0 ? `
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px; color: red;">
                <span>Descuento (${quotation.discount}%):</span>
                <span>-${totals.discountAmount.toLocaleString()}</span>
              </div>
            ` : ''}
            <div style="display: flex; justify-content: space-between; border-top: 2px solid #333; padding-top: 8px; font-weight: bold; font-size: 18px;">
              <span>TOTAL FINAL:</span>
              <span>${totals.total.toLocaleString()}</span>
            </div>
          </div>
        </div>
        
        <div style="margin-top: 50px; padding: 20px; background-color: #f9f9f9; border-left: 4px solid #333;">
          <p style="margin: 0; font-style: italic; color: #666; text-align: center; font-size: 12px;">
            "Documento válido sólo como Cotización; No constituye venta ni recibo de dinero; No válido como documento tributario."<br>
            Cotización válida hasta: ${quotation.validUntil} | Generada por: ${quotation.createdBy || 'Sistema'}
          </p>
        </div>
      </div>
    `;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Cotización ${quotation.number} - ${data.company.razonSocial}</title>
          <meta charset="UTF-8">
          <style>
            @media print {
              body { margin: 0; }
              @page { 
                margin: 1cm; 
                size: A4;
              }
            }
            body {
              font-family: Arial, sans-serif;
              line-height: 1.4;
              color: #333;
            }
          </style>
        </head>
        <body>
          ${htmlContent}
        </body>
      </html>
    `);
    printWindow.document.close();
    
    setTimeout(() => {
      if (window.confirm('¿Deseas imprimir o descargar como PDF?')) {
        printWindow.print();
      }
    }, 500);
    
    showNotification('Cotización preparada para imprimir/PDF', 'success');
  };

  // Función para exportar a Excel/CSV
  const exportToExcel = (type = 'quotations') => {
    let dataToExport = [];
    let filename = '';
    
    if (type === 'quotations') {
      dataToExport = data.quotations.map(q => ({
        'Número': q.number,
        'Cliente': q.client,
        'Fecha': q.date,
        'Válida Hasta': q.validUntil,
        'Total': q.total,
        'Estado': q.status,
        'Prioridad': q.priority,
        'Descuento (%)': q.discount,
        'Creado Por': q.createdBy,
        'Última Modificación': q.lastModified
      }));
      filename = `cotizaciones-${new Date().toISOString().split('T')[0]}.csv`;
    } else if (type === 'clients') {
      dataToExport = data.clients.map(c => ({
        'RUT': c.rut,
        'Empresa': c.empresa,
        'Encargado': c.encargado,
        'Dirección': c.direccion,
        'Ciudad': c.ciudad,
        'Región': c.region,
        'Teléfono': c.telefono,
        'Email': c.email,
        'Fecha Registro': c.createdAt
      }));
      filename = `clientes-${new Date().toISOString().split('T')[0]}.csv`;
    } else if (type === 'services') {
      dataToExport = data.services.map(s => ({
        'Servicio': s.name,
        'Precio': s.price,
        'Categoría': s.category,
        'Estado': s.active ? 'Activo' : 'Inactivo'
      }));
      filename = `servicios-${new Date().toISOString().split('T')[0]}.csv`;
    }
    
    const csvContent = convertToCSV(dataToExport);
    downloadCSV(csvContent, filename);
    showNotification(`${type === 'quotations' ? 'Cotizaciones' : type === 'clients' ? 'Clientes' : 'Servicios'} exportados exitosamente`, 'success');
  };

  // Función auxiliar para convertir a CSV
  const convertToCSV = (data) => {
    if (data.length === 0) return '';
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(row => 
      Object.values(row).map(val => 
        typeof val === 'string' && val.includes(',') ? `"${val}"` : val
      ).join(',')
    ).join('\n');
    return headers + '\n' + rows;
  };

  // Función auxiliar para descargar CSV
  const downloadCSV = (content, filename) => {
    const BOM = '\uFEFF'; // UTF-8 BOM para Excel
    const blob = new Blob([BOM + content], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Función para filtrar cotizaciones con filtros avanzados
  const getFilteredQuotations = () => {
    return data.quotations.filter(quotation => {
      const matchesSearch = quotation.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           quotation.number.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDateFrom = !filters.dateFrom || quotation.date >= filters.dateFrom;
      const matchesDateTo = !filters.dateTo || quotation.date <= filters.dateTo;
      const matchesStatus = !filters.status || quotation.status === filters.status;
      const matchesPriority = !filters.priority || quotation.priority === filters.priority;
      const matchesMinAmount = !filters.minAmount || quotation.total >= parseInt(filters.minAmount);
      const matchesMaxAmount = !filters.maxAmount || quotation.total <= parseInt(filters.maxAmount);
      const matchesClient = !filters.client || quotation.client.toLowerCase().includes(filters.client.toLowerCase());
      const matchesCreatedBy = !filters.createdBy || quotation.createdBy?.includes(filters.createdBy);
      
      return matchesSearch && matchesDateFrom && matchesDateTo && matchesStatus && 
             matchesPriority && matchesMinAmount && matchesMaxAmount && matchesClient && matchesCreatedBy;
    });
  };

  // Función para filtrar clientes
  const getFilteredClients = () => {
    return data.clients.filter(client => 
      client.empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.encargado.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.rut.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.ciudad.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase())
    ).sort((a, b) => a.empresa.localeCompare(b.empresa));
  };

  // Función para filtrar servicios
  const getFilteredServices = () => {
    return data.services.filter(service => 
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.category.toLowerCase().includes(searchTerm.toLowerCase())
    ).sort((a, b) => a.name.localeCompare(b.name));
  };

  // Función para guardar cotización
  const saveQuotation = () => {
    const quotationData = editingQuotation || newQuotation;
    const totals = calculateQuotationTotals(quotationData.items, quotationData.discount);
    
    if (editingQuotation) {
      setData(prev => ({
        ...prev,
        quotations: prev.quotations.map(q => 
          q.id === editingQuotation.id 
            ? { ...editingQuotation, ...totals, lastModified: new Date().toISOString() }
            : q
        )
      }));
      setEditingQuotation(null);
      showNotification('Cotización actualizada exitosamente', 'success');
    } else {
      const quotation = {
        id: data.quotations.length + 1,
        number: `COT-${new Date().getFullYear()}-${String(data.quotations.length + 1).padStart(3, '0')}`,
        client: newQuotation.client,
        date: newQuotation.date,
        validUntil: newQuotation.validUntil,
        priority: newQuotation.priority,
        notes: newQuotation.notes,
        total: totals.total,
        status: 'Pendiente',
        items: newQuotation.items,
        discount: newQuotation.discount,
        createdBy: currentUser.email,
        lastModified: new Date().toISOString()
      };
      
      setData(prev => ({
        ...prev,
        quotations: [...prev.quotations, quotation]
      }));
      
      setNewQuotation({
        client: '',
        date: new Date().toISOString().split('T')[0],
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        priority: 'Media',
        notes: '',
        items: [{ quantity: 1, service: '', unitPrice: 0, total: 0 }],
        discount: 0
      });
      
      showNotification('Cotización guardada exitosamente', 'success');
    }
    
    setShowModal(false);
  };

  // Función para guardar cliente
  const saveClient = () => {
    if (!validateRut(editingClient ? editingClient.rut : newClient.rut)) {
      showNotification('RUT inválido. Verifique el formato y dígito verificador.', 'error');
      return;
    }

    if (editingClient) {
      setData(prev => ({
        ...prev,
        clients: prev.clients.map(c => 
          c.id === editingClient.id ? editingClient : c
        )
      }));
      setEditingClient(null);
      showNotification('Cliente actualizado exitosamente', 'success');
    } else {
      const client = {
        id: data.clients.length + 1,
        ...newClient,
        createdAt: new Date().toISOString().split('T')[0]
      };
      
      setData(prev => ({
        ...prev,
        clients: [...prev.clients, client]
      }));
      
      setNewClient({
        rut: '', encargado: '', empresa: '', direccion: '',
        ciudad: '', region: '', telefono: '', email: ''
      });
      
      showNotification('Cliente agregado exitosamente', 'success');
    }
    
    setShowModal(false);
  };

  // Función para guardar servicio
  const saveService = () => {
    if (editingService) {
      setData(prev => ({
        ...prev,
        services: prev.services.map(s => 
          s.id === editingService.id 
            ? { ...editingService, price: Number(editingService.price) }
            : s
        )
      }));
      setEditingService(null);
      showNotification('Servicio actualizado exitosamente', 'success');
    } else {
      const service = {
        id: data.services.length + 1,
        ...newService,
        price: Number(newService.price)
      };
      
      setData(prev => ({
        ...prev,
        services: [...prev.services, service]
      }));
      
      setNewService({ name: '', price: 0, category: 'General', active: true });
      showNotification('Servicio agregado exitosamente', 'success');
    }
    
    setShowModal(false);
  };

  // Función para eliminar elemento
  const deleteItem = (type, id) => {
    const itemName = type === 'quotations' ? 'cotización' : type === 'clients' ? 'cliente' : 'servicio';
    if (window.confirm(`¿Estás seguro de eliminar este ${itemName}?`)) {
      setData(prev => ({
        ...prev,
        [type]: prev[type].filter(item => item.id !== id)
      }));
      showNotification(`${itemName.charAt(0).toUpperCase() + itemName.slice(1)} eliminado`, 'success');
    }
  };

  // Función para iniciar edición
  const startEdit = (type, item) => {
    if (type === 'quotation') {
      setEditingQuotation({ ...item });
      setModalType('quotation');
    } else if (type === 'client') {
      setEditingClient({ ...item });
      setModalType('client');
    } else if (type === 'service') {
      setEditingService({ ...item });
      setModalType('service');
    }
    setShowModal(true);
  };

  // Función para cancelar edición
  const cancelEdit = () => {
    setEditingQuotation(null);
    setEditingClient(null);
    setEditingService(null);
    setShowModal(false);
  };

  // Marcar notificación como leída
  const markNotificationAsRead = (notificationId) => {
    setSystemNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
    );
  };

  // Componente de notificaciones del sistema
  const NotificationContainer = () => (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map(notification => (
        <div
          key={notification.id}
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg shadow-lg transition-all transform animate-slide-in ${
            notification.type === 'success' 
              ? 'bg-green-500 text-white' 
              : notification.type === 'error'
              ? 'bg-red-500 text-white'
              : notification.type === 'warning'
              ? 'bg-yellow-500 text-white'
              : 'bg-blue-500 text-white'
          }`}
        >
          {notification.type === 'success' && <CheckCircle className="w-5 h-5" />}
          {notification.type === 'error' && <AlertCircle className="w-5 h-5" />}
          {notification.type === 'warning' && <AlertCircle className="w-5 h-5" />}
          {notification.type === 'info' && <Info className="w-5 h-5" />}
          <span className="flex-1">{notification.message}</span>
          <button
            onClick={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
            className="ml-2 hover:bg-white hover:bg-opacity-20 rounded p-1 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );

  // Panel de notificaciones del sistema
  const SystemNotificationPanel = () => (
    <div className={`fixed top-16 right-4 w-96 bg-white rounded-lg shadow-xl border z-40 transform transition-all ${
      showNotificationPanel ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'
    }`}>
      <div className="p-4 border-b bg-gray-50 rounded-t-lg">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-gray-800">Notificaciones</h3>
          <button
            onClick={() => setShowNotificationPanel(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {systemNotifications.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <Bell className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No hay notificaciones</p>
          </div>
        ) : (
          systemNotifications.map(notification => (
            <div
              key={notification.id}
              className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
                !notification.read ? 'bg-blue-50 border-l-4 border-blue-500' : ''
              }`}
              onClick={() => markNotificationAsRead(notification.id)}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-1 rounded-full ${
                  notification.priority === 'high' ? 'bg-red-100 text-red-600' :
                  notification.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                  'bg-blue-100 text-blue-600'
                }`}>
                  {notification.type === 'reminder' ? <Clock className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800 text-sm">{notification.title}</p>
                  <p className="text-gray-600 text-xs mt-1">{notification.message}</p>
                  <p className="text-gray-400 text-xs mt-2">
                    {new Date(notification.date).toLocaleDateString()}
                  </p>
                </div>
                {!notification.read && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  // Componente de filtros avanzados
  const AdvancedFilters = () => (
    <div className={`bg-white border rounded-lg shadow-lg p-4 mb-4 transition-all ${showFilters ? 'block' : 'hidden'}`}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Desde</label>
          <input
            type="date"
            value={filters.dateFrom}
            onChange={(e) => setFilters(prev => ({ ...prev, dateFrom: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Hasta</label>
          <input
            type="date"
            value={filters.dateTo}
            onChange={(e) => setFilters(prev => ({ ...prev, dateTo: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
          <select
            value={filters.status}
            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todos los estados</option>
            <option value="Pendiente">Pendiente</option>
            <option value="Facturada">Facturada</option>
            <option value="Rechazada">Rechazada</option>
            <option value="En Proceso">En Proceso</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Prioridad</label>
          <select
            value={filters.priority}
            onChange={(e) => setFilters(prev => ({ ...prev, priority: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todas las prioridades</option>
            <option value="Alta">Alta</option>
            <option value="Media">Media</option>
            <option value="Baja">Baja</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Monto Mínimo</label>
          <input
            type="number"
            value={filters.minAmount}
            onChange={(e) => setFilters(prev => ({ ...prev, minAmount: e.target.value }))}
            placeholder="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Monto Máximo</label>
          <input
            type="number"
            value={filters.maxAmount}
            onChange={(e) => setFilters(prev => ({ ...prev, maxAmount: e.target.value }))}
            placeholder="Sin límite"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
          <input
            type="text"
            value={filters.client}
            onChange={(e) => setFilters(prev => ({ ...prev, client: e.target.value }))}
            placeholder="Buscar cliente..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Creado Por</label>
          <select
            value={filters.createdBy}
            onChange={(e) => setFilters(prev => ({ ...prev, createdBy: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todos los usuarios</option>
            {data.users.map(user => (
              <option key={user.id} value={user.email}>{user.name}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="flex justify-end space-x-2 mt-4">
        <button
          onClick={() => setFilters({
            dateFrom: '', dateTo: '', status: '', priority: '', minAmount: '', maxAmount: '', client: '', createdBy: ''
          })}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Limpiar Filtros
        </buttonimport React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Users, 
  Settings, 
  BarChart3, 
  Plus, 
  Edit2, 
  Trash2, 
  Save,
  LogOut,
  Building2,
  Calculator,
  Search,
  Eye,
  Filter,
  FileSpreadsheet,
  CheckCircle,
  AlertCircle,
  Info,
  X,
  Send,
  MessageCircle,
  RefreshCw,
  Mail,
  TrendingUp,
  Calendar,
  DollarSign,
  Clock,
  Download,
  Upload,
  Palette,
  Shield,
  FileBarChart,
  Bell,
  Moon,
  Sun,
  Smartphone,
  Monitor,
  User
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

// Simulación de Firebase Auth (en producción usar Firebase Auth)
const mockFirebaseAuth = {
  currentUser: null,
  signInWithEmailAndPassword: async (email, password) => {
    // Simular autenticación
    const validUsers = [
      { uid: '1', email: 'admin@empresa.com', displayName: 'Administrador', role: 'admin' },
      { uid: '2', email: 'usuario@empresa.com', displayName: 'Usuario Regular', role: 'user' },
      { uid: '3', email: 'vendedor@empresa.com', displayName: 'Vendedor', role: 'seller' }
    ];
    
    const user = validUsers.find(u => u.email === email);
    if (user && password === '123456') {
      return { user };
    }
    throw new Error('Credenciales incorrectas');
  },
  createUserWithEmailAndPassword: async (email, password) => {
    // Simular registro
    return { 
      user: { 
        uid: Date.now().toString(), 
        email, 
        displayName: 'Usuario Nuevo',
        role: 'user'
      } 
    };
  },
  signOut: async () => {
    return Promise.resolve();
  },
  sendPasswordResetEmail: async (email) => {
    return Promise.resolve();
  }
};

// Datos simulados expandidos
const mockFirebaseData = {
  users: [
    { id: 1, email: 'admin@empresa.com', name: 'Administrador', role: 'admin', avatar: null },
    { id: 2, email: 'usuario@empresa.com', name: 'Usuario Regular', role: 'user', avatar: null },
    { id: 3, email: 'vendedor@empresa.com', name: 'Vendedor', role: 'seller', avatar: null }
  ],
  company: {
    razonSocial: 'Mi Empresa de Arriendo',
    rut: '12.345.678-9',
    direccion: 'Av. Principal 123',
    ciudad: 'Viña del Mar',
    region: 'Valparaíso',
    telefono: '+56 32 123 4567',
    email: 'contacto@miempresa.cl',
    logo: null,
    theme: 'blue',
    currency: 'CLP'
  },
  clients: [
    {
      id: 1,
      rut: '77.648.180-7',
      encargado: 'NN',
      empresa: 'Befoods',
      direccion: 'sin informar',
      ciudad: 'Viña del mar',
      region: 'Valparaíso',
      telefono: 'sin informar',
      email: 'sigpre@befoods.cl',
      createdAt: '2025-01-01'
    },
    {
      id: 2,
      rut: '96.870.780-9',
      encargado: 'Ro Gomez',
      empresa: 'Echeverria Izquierdo',
      direccion: 'Santiago',
      ciudad: 'Santiago',
      region: 'Metropolitana de Santiago',
      telefono: '+56971345589',
      email: 'rgomez@eimontajes.cl',
      createdAt: '2025-01-02'
    },
    {
      id: 3,
      rut: '77.241.463-3',
      encargado: 'Marco Perez',
      empresa: 'Organismo Tecnico Capacitacion',
      direccion: 'Viña',
      ciudad: 'Viña del mar',
      region: 'Valparaíso',
      telefono: '+56934683151',
      email: 'marco.perez@ia-im.com',
      createdAt: '2025-01-03'
    }
  ],
  services: [
    { id: 1, name: 'PLATAFORMAS ELEVADORAS TIJERA', price: 100000, category: 'Elevadores', active: true },
    { id: 2, name: 'BRAZO ARTICULADO 16 MT', price: 100000, category: 'Elevadores', active: true },
    { id: 3, name: 'ELEVADOR ELECTRICO 8 MT', price: 50000, category: 'Elevadores', active: true },
    { id: 4, name: 'ELEVADOR ELECTRICO 10 MT', price: 70000, category: 'Elevadores', active: true },
    { id: 5, name: 'CAMIONES TRANSPORTE', price: 600000, category: 'Transporte', active: true },
    { id: 6, name: 'OPERADOR', price: 45000, category: 'Personal', active: true }
  ],
  quotations: [
    {
      id: 1,
      number: 'COT-2025-001',
      client: 'Befoods',
      date: '2025-01-15',
      total: 234000,
      status: 'Pendiente',
      priority: 'Alta',
      validUntil: '2025-02-15',
      notes: 'Cliente preferencial',
      items: [
        { id: 1, quantity: 2, service: 'ELEVADOR ELECTRICO 8 MT', unitPrice: 50000, total: 100000 },
        { id: 2, quantity: 1, service: 'OPERADOR', unitPrice: 45000, total: 45000 }
      ],
      discount: 0,
      createdBy: 'admin@empresa.com',
      lastModified: '2025-01-15T10:30:00Z'
    },
    {
      id: 2,
      number: 'COT-2025-002',
      client: 'Echeverria Izquierdo',
      date: '2025-01-10',
      total: 850000,
      status: 'Facturada',
      priority: 'Media',
      validUntil: '2025-02-10',
      notes: 'Proyecto a largo plazo',
      items: [
        { id: 1, quantity: 1, service: 'CAMIONES TRANSPORTE', unitPrice: 600000, total: 600000 },
        { id: 2, quantity: 2, service: 'OPERADOR', unitPrice: 45000, total: 90000 }
      ],
      discount: 5,
      createdBy: 'vendedor@empresa.com',
      lastModified: '2025-01-10T14:20:00Z'
    }
  ],
  notifications: [
    {
      id: 1,
      type: 'reminder',
      title: 'Cotización por vencer',
      message: 'La cotización COT-2025-001 vence en 3 días',
      date: new Date().toISOString(),
      read: false,
      priority: 'high'
    }
  ],
  reports: [
    {
      id: 1,
      name: 'Reporte Mensual Enero',
      type: 'monthly',
      period: '2025-01',
      createdAt: '2025-01-31',
      data: {
        totalQuotations: 15,
        totalRevenue: 2500000,
        conversionRate: 67,
        topClient: 'Befoods'
      }
    }
  ]
};

// Datos para gráficos
const chartData = {
  sales: [
    { name: 'Ene', ventas: 2400, cotizaciones: 12 },
    { name: 'Feb', ventas: 1398, cotizaciones: 8 },
    { name: 'Mar', ventas: 3800, cotizaciones: 15 },
    { name: 'Abr', ventas: 3908, cotizaciones: 18 },
    { name: 'May', ventas: 4800, cotizaciones: 22 },
    { name: 'Jun', ventas: 3800, cotizaciones: 16 }
  ],
  services: [
    { name: 'Elevadores', value: 45, color: '#8884d8' },
    { name: 'Transporte', value: 35, color: '#82ca9d' },
    { name: 'Personal', value: 20, color: '#ffc658' }
  ],
  status: [
    { name: 'Pendientes', value: 8 },
    { name: 'Facturadas', value: 12 },
    { name: 'Rechazadas', value: 3 },
    { name: 'En Proceso', value: 5 }
  ]
};

const CotizacionesApp = () => {
  // Estados principales
  const [currentUser, setCurrentUser] = useState(null);
  const [currentView, setCurrentView] = useState('login');
  const [data, setData] = useState(mockFirebaseData);
  const [authMode, setAuthMode] = useState('login'); // 'login', 'register', 'forgot'
  
  // Estados de tema y configuración
  const [theme, setTheme] = useState('blue');
  const [darkMode, setDarkMode] = useState(false);
  const [compactView, setCompactView] = useState(false);
  
  // Estados para formularios
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ 
    email: '', 
    password: '', 
    confirmPassword: '', 
    name: '' 
  });
  const [forgotForm, setForgotForm] = useState({ email: '' });
  
  const [newQuotation, setNewQuotation] = useState({
    client: '',
    date: new Date().toISOString().split('T')[0],
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    priority: 'Media',
    notes: '',
    items: [{ quantity: 1, service: '', unitPrice: 0, total: 0 }],
    discount: 0
  });
  
  const [newClient, setNewClient] = useState({
    rut: '', encargado: '', empresa: '', direccion: '',
    ciudad: '', region: '', telefono: '', email: ''
  });
  
  const [newService, setNewService] = useState({ 
    name: '', 
    price: 0, 
    category: 'General',
    active: true 
  });

  // Estados para edición
  const [editingQuotation, setEditingQuotation] = useState(null);
  const [editingClient, setEditingClient] = useState(null);
  const [editingService, setEditingService] = useState(null);

  // Estados para modales y edición
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Estados para notificaciones y alertas
  const [notifications, setNotifications] = useState([]);
  const [systemNotifications, setSystemNotifications] = useState(data.notifications);
  const [showNotificationPanel, setShowNotificationPanel] = useState(false);
  
  // Estados para filtros avanzados
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    status: '',
    priority: '',
    minAmount: '',
    maxAmount: '',
    client: '',
    createdBy: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  // Estados para reportes
  const [reportType, setReportType] = useState('monthly');
  const [reportPeriod, setReportPeriod] = useState('2025-01');
  const [generatingReport, setGeneratingReport] = useState(false);

  // Hook para cargar notificaciones del sistema
  useEffect(() => {
    const checkReminders = () => {
      const today = new Date();
      const upcomingQuotations = data.quotations.filter(q => {
        const validUntil = new Date(q.validUntil);
        const diffTime = validUntil.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 3 && diffDays > 0 && q.status === 'Pendiente';
      });

      const reminders = upcomingQuotations.map(q => ({
        id: Date.now() + Math.random(),
        type: 'reminder',
        title: 'Cotización por vencer',
        message: `La cotización ${q.number} vence en ${Math.ceil((new Date(q.validUntil).getTime() - today.getTime()) / (1000 * 60 * 60 * 24))} días`,
        date: new Date().toISOString(),
        read: false,
        priority: 'high',
        quotationId: q.id
      }));

      setSystemNotifications(prev => [...prev, ...reminders]);
    };

    if (currentUser) {
      checkReminders();
      const interval = setInterval(checkReminders, 24 * 60 * 60 * 1000); // Check daily
      return () => clearInterval(interval);
    }
  }, [currentUser, data.quotations]);

  // Temas disponibles
  const themes = {
    blue: { primary: 'blue-600', secondary: 'blue-100', accent: 'blue-400' },
    green: { primary: 'green-600', secondary: 'green-100', accent: 'green-400' },
    purple: { primary: 'purple-600', secondary: 'purple-100', accent: 'purple-400' },
    red: { primary: 'red-600', secondary: 'red-100', accent: 'red-400' },
    gray: { primary: 'gray-600', secondary: 'gray-100', accent: 'gray-400' }
  };

  // Función para formatear RUT chileno
  const formatRut = (value) => {
    const cleanRut = value.replace(/[^\dkK]/g, '');
    if (cleanRut.length <= 1) return cleanRut;
    const body = cleanRut.slice(0, -1);
    const dv = cleanRut.slice(-1);
    const formattedBody = body.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `${formattedBody}-${dv}`;
  };

  // Función para validar RUT
  const validateRut = (rut) => {
    const cleanRut = rut.replace(/[^\dkK]/g, '');
    if (cleanRut.length < 8 || cleanRut.length > 9) return false;
    const body = cleanRut.slice(0, -1);
    const dv = cleanRut.slice(-1).toLowerCase();
    let sum = 0;
    let multiplier = 2;
    for (let i = body.length - 1; i >= 0; i--) {
      sum += parseInt(body[i]) * multiplier;
      multiplier = multiplier === 7 ? 2 : multiplier + 1;
    }
    const remainder = sum % 11;
    const calculatedDv = remainder < 2 ? remainder.toString() : remainder === 10 ? 'k' : (11 - remainder).toString();
    return calculatedDv === dv;
  };

  // Función para validar email
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Función para mostrar notificaciones
  const showNotification = (message, type = 'success') => {
    const id = Date.now();
    const notification = { id, message, type };
    setNotifications(prev => [...prev, notification]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 4000);
  };

  // Función de autenticación con Firebase
  const handleAuth = async (e) => {
    e.preventDefault();
    
    try {
      if (authMode === 'login') {
        if (!validateEmail(loginForm.email)) {
          showNotification('Por favor ingresa un email válido', 'error');
          return;
        }
        
        const result = await mockFirebaseAuth.signInWithEmailAndPassword(
          loginForm.email, 
          loginForm.password
        );
        
        setCurrentUser(result.user);
        setCurrentView('dashboard');
        showNotification('¡Bienvenido al sistema!', 'success');
        
      } else if (authMode === 'register') {
        if (!validateEmail(registerForm.email)) {
          showNotification('Por favor ingresa un email válido', 'error');
          return;
        }
        
        if (registerForm.password !== registerForm.confirmPassword) {
          showNotification('Las contraseñas no coinciden', 'error');
          return;
        }
        
        if (registerForm.password.length < 6) {
          showNotification('La contraseña debe tener al menos 6 caracteres', 'error');
          return;
        }
        
        await mockFirebaseAuth.createUserWithEmailAndPassword(
          registerForm.email,
          registerForm.password
        );
        
        showNotification('Usuario registrado exitosamente', 'success');
        setAuthMode('login');
        setRegisterForm({ email: '', password: '', confirmPassword: '', name: '' });
        
      } else if (authMode === 'forgot') {
        if (!validateEmail(forgotForm.email)) {
          showNotification('Por favor ingresa un email válido', 'error');
          return;
        }
        
        await mockFirebaseAuth.sendPasswordResetEmail(forgotForm.email);
        showNotification('Se ha enviado un email para restablecer tu contraseña', 'info');
        setAuthMode('login');
        setForgotForm({ email: '' });
      }
    } catch (error) {
      showNotification(error.message, 'error');
    }
  };

  // Función de logout
  const handleLogout = async () => {
    try {
      await mockFirebaseAuth.signOut();
      setCurrentUser(null);
      setCurrentView('login');
      showNotification('Sesión cerrada exitosamente', 'info');
    } catch (error) {
      showNotification('Error al cerrar sesión', 'error');
    }
  };

  // Función para cambiar estado de cotización
  const changeQuotationStatus = (quotationId, newStatus) => {
    setData(prev => ({
      ...prev,
      quotations: prev.quotations.map(q => 
        q.id === quotationId ? { ...q, status: newStatus, lastModified: new Date().toISOString() } : q
      )
    }));
    showNotification(`Cotización marcada como ${newStatus}`, 'success');
  };

  // Función para enviar por WhatsApp
  const sendViaWhatsApp = (quotation) => {
    const client = data.clients.find(c => c.empresa === quotation.client);
    const totals = calculateQuotationTotals(quotation.items, quotation.discount);
    
    const message = `
*COTIZACIÓN ${quotation.number}* 📋
━━━━━━━━━━━━━━━━━━━━
📅 *Fecha:* ${quotation.date}
⏰ *Válida hasta:* ${quotation.validUntil}
🏢 *Cliente:* ${quotation.client}
💰 *Total:* $${totals.total.toLocaleString()}
📊 *Estado:* ${quotation.status}
🔥 *Prioridad:* ${quotation.priority}

*🛠️ SERVICIOS:*
${quotation.items.map(item => 
  `• ${item.quantity}x ${item.service}\n  💵 $${item.total.toLocaleString()}`
).join('\n')}

*💳 RESUMEN FINANCIERO:*
• Subtotal: $${totals.subtotal.toLocaleString()}
• IVA (19%): $${totals.iva.toLocaleString()}
${totals.discountAmount > 0 ? `• Descuento: -$${totals.discountAmount.toLocaleString()}` : ''}
• *TOTAL: $${totals.total.toLocaleString()}*

━━━━━━━━━━━━━━━━━━━━
🏢 *${data.company.razonSocial}*
📞 ${data.company.telefono}
📧 ${data.company.email}
📍 ${data.company.direccion}

💬 _Contáctanos para más información_
⚡ _Respuesta rápida garantizada_

_"Documento válido sólo como Cotización"_
    `.trim();

    const phoneNumber = client?.telefono?.replace(/[^\d]/g, '') || '';
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = phoneNumber 
      ? `https://wa.me/56${phoneNumber.slice(-8)}?text=${encodedMessage}`
      : `https://web.whatsapp.com/send?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    showNotification('Abriendo WhatsApp...', 'info');
  };

  // Función para enviar por Email
  const sendViaEmail = (quotation) => {
    const client = data.clients.find(c => c.empresa === quotation.client);
    const totals = calculateQuotationTotals(quotation.items, quotation.discount);
    
    const subject = `Cotización ${quotation.number} - ${data.company.razonSocial}`;
    const body = `
Estimado/a ${client?.encargado || 'Cliente'},

Adjunto encontrará la cotización solicitada con el siguiente detalle:

COTIZACIÓN: ${quotation.number}
FECHA: ${quotation.date}
VÁLIDA HASTA: ${quotation.validUntil}
PRIORIDAD: ${quotation.priority}

SERVICIOS:
${quotation.items.map(item => 
  `- ${item.quantity}x ${item.service}: $${item.total.toLocaleString()}`
).join('\n')}

RESUMEN:
Subtotal: $${totals.subtotal.toLocaleString()}
IVA (19%): $${totals.iva.toLocaleString()}
${totals.discountAmount > 0 ? `Descuento: -$${totals.discountAmount.toLocaleString()}\n` : ''}TOTAL: $${totals.total.toLocaleString()}

${quotation.notes ? `NOTAS: ${quotation.notes}\n` : ''}
Quedamos atentos a sus comentarios y disponibles para cualquier consulta.

Saludos cordiales,
${data.company.razonSocial}
${data.company.telefono}
${data.company.email}

"Documento válido sólo como Cotización; No constituye venta ni recibo de dinero; No válido como documento tributario."
    `.trim();

    const mailtoUrl = `mailto:${client?.email || ''}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl);
    showNotification('Abriendo cliente de email...', 'info');
  };

  // Función para generar reportes
  const generateReport = async () => {
    setGeneratingReport(true);
    
    // Simular generación de reporte
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const filteredQuotations = data.quotations.filter(q => {
      const quotationDate = new Date(q.date);
      const [year, month] = reportPeriod.split('-');
      
      if (reportType === 'monthly') {
        return quotationDate.getFullYear() == year && 
               quotationDate.getMonth() == month - 1;
      } else if (reportType === 'yearly') {
        return quotationDate.getFullYear() == year;
      }
      return true;
    });

    const reportData = {
      period: reportPeriod,
      type: reportType,
      totalQuotations: filteredQuotations.length,
      totalRevenue: filteredQuotations
        .filter(q => q.status === 'Facturada')
        .reduce((sum, q) => sum + q.total, 0),
      pendingQuotations: filteredQuotations.filter(q => q.status === 'Pendiente').length,
      conversionRate: filteredQuotations.length > 0 
        ? Math.round((filteredQuotations.filter(q => q.status === 'Facturada').length / filteredQuotations.length) * 100)
        : 0,
      topClient: filteredQuotations.reduce((acc, q) => {
        acc[q.client] = (acc[q.client] || 0) + 1;
        return acc;
      }, {}),
      avgQuotationValue: filteredQuotations.length > 0
        ? filteredQuotations.reduce((sum, q) => sum + q.total, 0) / filteredQuotations.length
        : 0
    };

    const topClientName = Object.entries(reportData.topClient)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A';

    const reportContent = `
REPORTE ${reportType.toUpperCase()} - ${reportPeriod}
${data.company.razonSocial}
Generado: ${new Date().toLocaleDateString()}

RESUMEN EJECUTIVO:
═══════════════════
• Total Cotizaciones: ${reportData.totalQuotations}
• Ingresos Generados: $${reportData.totalRevenue.toLocaleString()}
• Cotizaciones Pendientes: ${reportData.pendingQuotations}
• Tasa de Conversión: ${reportData.conversionRate}%
• Valor Promedio: $${Math.round(reportData.avgQuotationValue).toLocaleString()}
• Cliente Principal: ${topClientName}

DETALLE POR COTIZACIÓN:
═══════════════════════
${filteredQuotations.map(q => `
${q.number} | ${q.client} | ${q.date} | $${q.total.toLocaleString()} | ${q.status}
`).join('')}

ANÁLISIS:
═════════
${reportData.conversionRate >= 70 ? '✅' : reportData.conversionRate >= 50 ? '⚠️' : '❌'} Tasa de conversión: ${reportData.conversionRate}%
${reportData.totalQuotations >= 10 ? '✅' : '⚠️'} Actividad comercial: ${reportData.totalQuotations} cotizaciones
${reportData.pendingQuotations <= 5 ? '✅' : '⚠️'} Gestión pendientes: ${reportData.pendingQuotations} por cerrar

RECOMENDACIONES:
════════════════
${reportData.conversionRate < 50 ? '• Revisar estrategia de seguimiento de cotizaciones\n' : ''}${reportData.pendingQuotations > 10 ? '• Priorizar cierre de cotizaciones pendientes\n' : ''}• Mantener comunicación constante con ${topClientName}
• Evaluar oportunidades de cross-selling con clientes frecuentes
    `;

    // Crear y descargar archivo
    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `reporte-${reportType}-${reportPeriod}.txt`;
    a.click();
    URL.revokeObjectURL(url);

    setGeneratingReport(false);
    showNotification('Reporte generado y descargado exitosamente', 'success');
  };

  // Función de backup completo
  const generateBackup = () => {
    const backupData = {
      company: data.company,
      clients: data.clients,
      services: data.services,
      quotations: data.quotations,
      users: data.users,
      generatedAt: new Date().toISOString(),
      version: '1.0'
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { 
      type: 'application/json' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    showNotification('Backup generado exitosamente', 'success');
  };

  // Función para calcular totales de cotización
  const calculateQuotationTotals = (items, discount = 0) => {
    const subtotal = items.reduce((sum, item) => sum + item.total, 0);
    const iva = subtotal * 0.19;
    const totalBruto = subtotal + iva;
    const discountAmount = totalBruto * (discount / 100);
    const total = totalBruto - discountAmount;
    return { subtotal, iva, totalBruto, discountAmount, total };
  };

  // Función para agregar item a cotización
  const addQuotationItem = () => {
    const currentItems = editingQuotation ? editingQuotation.items : newQuotation.items;