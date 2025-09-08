import React, { useState, useEffect } from 'react';
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

  // Modal para cotización simplificado
  const QuotationModal = () => {
    const isEditing = editingQuotation !== null;
    const quotationData = isEditing ? editingQuotation : newQuotation;
    const totals = calculateQuotationTotals(quotationData.items, quotationData.discount);
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">
                {isEditing ? 'Editar Cotización' : 'Nueva Cotización'}
              </h2>
              <button
                onClick={cancelEdit}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Información básica */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cliente *</label>
                <select
                  value={quotationData.client}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (isEditing) {
                      setEditingQuotation(prev => ({ ...prev, client: value }));
                    } else {
                      setNewQuotation(prev => ({ ...prev, client: value }));
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Seleccionar cliente</option>
                  {data.clients.map(client => (
                    <option key={client.id} value={client.empresa}>
                      {client.empresa} - {client.encargado}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fecha</label>
                <input
                  type="date"
                  value={quotationData.date}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (isEditing) {
                      setEditingQuotation(prev => ({ ...prev, date: value }));
                    } else {
                      setNewQuotation(prev => ({ ...prev, date: value }));
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Válida Hasta</label>
                <input
                  type="date"
                  value={quotationData.validUntil}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (isEditing) {
                      setEditingQuotation(prev => ({ ...prev, validUntil: value }));
                    } else {
                      setNewQuotation(prev => ({ ...prev, validUntil: value }));
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Prioridad</label>
                <select
                  value={quotationData.priority}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (isEditing) {
                      setEditingQuotation(prev => ({ ...prev, priority: value }));
                    } else {
                      setNewQuotation(prev => ({ ...prev, priority: value }));
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Baja">Baja</option>
                  <option value="Media">Media</option>
                  <option value="Alta">Alta</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Descuento (%)</label>
                <select
                  value={quotationData.discount}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (isEditing) {
                      setEditingQuotation(prev => ({ ...prev, discount: value }));
                    } else {
                      setNewQuotation(prev => ({ ...prev, discount: value }));
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={0}>0%</option>
                  <option value={3}>3%</option>
                  <option value={5}>5%</option>
                  <option value={8}>8%</option>
                  <option value={10}>10%</option>
                  <option value={15}>15%</option>
                  <option value={20}>20%</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Notas</label>
              <textarea
                value={quotationData.notes}
                onChange={(e) => {
                  const value = e.target.value;
                  if (isEditing) {
                    setEditingQuotation(prev => ({ ...prev, notes: value }));
                  } else {
                    setNewQuotation(prev => ({ ...prev, notes: value }));
                  }
                }}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Notas adicionales para la cotización..."
              />
            </div>

            {/* Detalle de servicios */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Servicios</h3>
                <button
                  onClick={addQuotationItem}
                  className="flex items-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Agregar</span>
                </button>
              </div>
              
              <div className="bg-gray-50 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Cantidad</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Servicio</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Precio Unit.</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Total</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {quotationData.items.map((item, index) => (
                        <tr key={index} className="border-t border-gray-200">
                          <td className="py-3 px-4">
                            <input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => updateQuotationItem(index, 'quantity', Number(e.target.value))}
                              className="w-20 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                              min="1"
                            />
                          </td>
                          <td className="py-3 px-4">
                            <select
                              value={item.service}
                              onChange={(e) => updateQuotationItem(index, 'service', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            >
                              <option value="">Seleccionar servicio</option>
                              {data.services.filter(s => s.active).map(service => (
                                <option key={service.id} value={service.name}>
                                  {service.name}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="py-3 px-4 text-gray-700">
                            ${item.unitPrice.toLocaleString()}
                          </td>
                          <td className="py-3 px-4 font-semibold text-gray-900">
                            ${item.total.toLocaleString()}
                          </td>
                          <td className="py-3 px-4">
                            <button
                              onClick={() => {
                                const updatedItems = quotationData.items.filter((_, i) => i !== index);
                                if (isEditing) {
                                  setEditingQuotation(prev => ({ ...prev, items: updatedItems }));
                                } else {
                                  setNewQuotation(prev => ({ ...prev, items: updatedItems }));
                                }
                              }}
                              className="p-1 text-red-600 hover:text-red-800 hover:bg-red-100 rounded transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Resumen financiero */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Resumen Financiero</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-semibold">${totals.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">IVA (19%):</span>
                    <span className="font-semibold">${totals.iva.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Bruto:</span>
                    <span className="font-semibold">${totals.totalBruto.toLocaleString()}</span>
                  </div>
                  {totals.discountAmount > 0 && (
                    <div className="flex justify-between text-red-600">
                      <span>Descuento ({quotationData.discount}%):</span>
                      <span className="font-semibold">-${totals.discountAmount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between border-t pt-3 text-xl font-bold text-blue-700">
                    <span>TOTAL FINAL:</span>
                    <span>${totals.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-end space-x-3">
            <button
              onClick={cancelEdit}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={saveQuotation}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {isEditing ? 'Actualizar' : 'Guardar'} Cotización
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Modal para clientes
  const ClientModal = () => {
    const isEditing = editingClient !== null;
    const clientData = isEditing ? editingClient : newClient;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">
                {isEditing ? 'Editar Cliente' : 'Nuevo Cliente'}
              </h2>
              <button
                onClick={cancelEdit}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">RUT *</label>
                <input
                  type="text"
                  value={clientData.rut}
                  onChange={(e) => {
                    const value = formatRut(e.target.value);
                    if (isEditing) {
                      setEditingClient(prev => ({ ...prev, rut: value }));
                    } else {
                      setNewClient(prev => ({ ...prev, rut: value }));
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="12.345.678-9"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Empresa *</label>
                <input
                  type="text"
                  value={clientData.empresa}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (isEditing) {
                      setEditingClient(prev => ({ ...prev, empresa: value }));
                    } else {
                      setNewClient(prev => ({ ...prev, empresa: value }));
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nombre de la empresa"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Encargado</label>
                <input
                  type="text"
                  value={clientData.encargado}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (isEditing) {
                      setEditingClient(prev => ({ ...prev, encargado: value }));
                    } else {
                      setNewClient(prev => ({ ...prev, encargado: value }));
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Persona de contacto"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={clientData.email}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (isEditing) {
                      setEditingClient(prev => ({ ...prev, email: value }));
                    } else {
                      setNewClient(prev => ({ ...prev, email: value }));
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="email@empresa.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Dirección</label>
              <input
                type="text"
                value={clientData.direccion}
                onChange={(e) => {
                  const value = e.target.value;
                  if (isEditing) {
                    setEditingClient(prev => ({ ...prev, direccion: value }));
                  } else {
                    setNewClient(prev => ({ ...prev, direccion: value }));
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Dirección completa"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ciudad</label>
                <input
                  type="text"
                  value={clientData.ciudad}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (isEditing) {
                      setEditingClient(prev => ({ ...prev, ciudad: value }));
                    } else {
                      setNewClient(prev => ({ ...prev, ciudad: value }));
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ciudad"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Región</label>
                <select
                  value={clientData.region}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (isEditing) {
                      setEditingClient(prev => ({ ...prev, region: value }));
                    } else {
                      setNewClient(prev => ({ ...prev, region: value }));
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seleccionar región</option>
                  <option value="Arica y Parinacota">Arica y Parinacota</option>
                  <option value="Tarapacá">Tarapacá</option>
                  <option value="Antofagasta">Antofagasta</option>
                  <option value="Atacama">Atacama</option>
                  <option value="Coquimbo">Coquimbo</option>
                  <option value="Valparaíso">Valparaíso</option>
                  <option value="Metropolitana de Santiago">Metropolitana de Santiago</option>
                  <option value="O'Higgins">O'Higgins</option>
                  <option value="Maule">Maule</option>
                  <option value="Ñuble">Ñuble</option>
                  <option value="Biobío">Biobío</option>
                  <option value="Araucanía">Araucanía</option>
                  <option value="Los Ríos">Los Ríos</option>
                  <option value="Los Lagos">Los Lagos</option>
                  <option value="Aysén">Aysén</option>
                  <option value="Magallanes">Magallanes</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                <input
                  type="tel"
                  value={clientData.telefono}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (isEditing) {
                      setEditingClient(prev => ({ ...prev, telefono: value }));
                    } else {
                      setNewClient(prev => ({ ...prev, telefono: value }));
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="+56 9 1234 5678"
                />
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-end space-x-3">
            <button
              onClick={cancelEdit}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={saveClient}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {isEditing ? 'Actualizar' : 'Guardar'} Cliente
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Vista principal de clientes
  const ClientsView = () => (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Clientes</h1>
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

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar clientes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">RUT</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Empresa</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Encargado</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Ciudad</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Email</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {getFilteredClients().map(client => (
                <tr key={client.id} className="hover:bg-gray-50 transition-colors border-b border-gray-100">
                  <td className="py-4 px-6 font-medium text-gray-900">{client.rut}</td>
                  <td className="py-4 px-6 text-gray-700">{client.empresa}</td>
                  <td className="py-4 px-6 text-gray-700">{client.encargado}</td>
                  <td className="py-4 px-6 text-gray-600">{client.ciudad}</td>
                  <td className="py-4 px-6 text-gray-600">{client.email}</td>
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Vista de servicios
  const ServicesView = () => (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Servicios</h1>
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

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar servicios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Servicio</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Precio</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Categoría</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Estado</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {getFilteredServices().map(service => (
                <tr key={service.id} className="hover:bg-gray-50 transition-colors border-b border-gray-100">
                  <td className="py-4 px-6 font-medium text-gray-900">{service.name}</td>
                  <td className="py-4 px-6 text-gray-700">${service.price.toLocaleString()}</td>
                  <td className="py-4 px-6 text-gray-600">{service.category}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      service.active 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {service.active ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Modal para servicios
  const ServiceModal = () => {
    const isEditing = editingService !== null;
    const serviceData = isEditing ? editingService : newService;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
          <div className="border-b border-gray-200 px-6 py-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">
                {isEditing ? 'Editar Servicio' : 'Nuevo Servicio'}
              </h2>
              <button
                onClick={cancelEdit}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del Servicio *</label>
              <input
                type="text"
                value={serviceData.name}
                onChange={(e) => {
                  const value = e.target.value;
                  if (isEditing) {
                    setEditingService(prev => ({ ...prev, name: value }));
                  } else {
                    setNewService(prev => ({ ...prev, name: value }));
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nombre del servicio"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Precio *</label>
              <input
                type="number"
                value={serviceData.price}
                onChange={(e) => {
                  const value = e.target.value;
                  if (isEditing) {
                    setEditingService(prev => ({ ...prev, price: value }));
                  } else {
                    setNewService(prev => ({ ...prev, price: value }));
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
                min="0"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
              <select
                value={serviceData.category}
                onChange={(e) => {
                  const value = e.target.value;
                  if (isEditing) {
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
                <option value="Maquinaria">Maquinaria</option>
                <option value="Otros">Otros</option>
              </select>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={serviceData.active}
                onChange={(e) => {
                  const value = e.target.checked;
                  if (isEditing) {
                    setEditingService(prev => ({ ...prev, active: value }));
                  } else {
                    setNewService(prev => ({ ...prev, active: value }));
                  }
                }}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-900">
                Servicio activo
              </label>
            </div>
          </div>

          <div className="border-t border-gray-200 px-6 py-4 flex justify-end space-x-3">
            <button
              onClick={cancelEdit}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={saveService}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {isEditing ? 'Actualizar' : 'Guardar'}
            </button>
          </div>
        </div>
      </div>
    );
  };

// Simulación de Firebase Auth (en producción usar Firebase Auth)
const mockFirebaseAuth = {
  currentUser: null,
  signInWithEmailAndPassword: async (email, password) => {
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
  ]
};

const CotizacionesApp = () => {
  // Estados principales
  const [currentUser, setCurrentUser] = useState(null);
  const [currentView, setCurrentView] = useState('login');
  const [data, setData] = useState(mockFirebaseData);
  const [authMode, setAuthMode] = useState('login');
  
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
━━━━━━━━━━━━━━━━━━━━━━━
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

━━━━━━━━━━━━━━━━━━━━━━━
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
╔═════════════════════
• Total Cotizaciones: ${reportData.totalQuotations}
• Ingresos Generados: $${reportData.totalRevenue.toLocaleString()}
• Cotizaciones Pendientes: ${reportData.pendingQuotations}
• Tasa de Conversión: ${reportData.conversionRate}%
• Valor Promedio: $${Math.round(reportData.avgQuotationValue).toLocaleString()}
• Cliente Principal: ${topClientName}

DETALLE POR COTIZACIÓN:
╔════════════════════════
${filteredQuotations.map(q => `
${q.number} | ${q.client} | ${q.date} | $${q.total.toLocaleString()} | ${q.status}
`).join('')}

ANÁLISIS:
╔═════════
${reportData.conversionRate >= 70 ? '✅' : reportData.conversionRate >= 50 ? '⚠️' : '❌'} Tasa de conversión: ${reportData.conversionRate}%
${reportData.totalQuotations >= 10 ? '✅' : '⚠️'} Actividad comercial: ${reportData.totalQuotations} cotizaciones
${reportData.pendingQuotations <= 5 ? '✅' : '⚠️'} Gestión pendientes: ${reportData.pendingQuotations} por cerrar

RECOMENDACIONES:
╔════════════════
${reportData.conversionRate < 50 ? '• Revisar estrategia de seguimiento de cotizaciones\n' : ''}${reportData.pendingQuotations > 10 ? '• Priorizar cierre de cotizaciones pendientes\n' : ''}• Mantener comunicación constante con ${topClientName}
• Evaluar oportunidades de cross-selling con clientes frecuentes
    `;

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
  
// Renderizado principal
  return (
    <div className="min-h-screen bg-gray-50">
      {!currentUser ? (
        <AuthView />
      ) : (
        <div className="flex">
          <Sidebar />
          <div className="flex-1">
            {currentView === 'dashboard' && <DashboardView />}
            {currentView === 'quotations' && <QuotationsView />}
            {currentView === 'clients' && <ClientsView />}
            {currentView === 'services' && <ServicesView />}
          </div>
        </div>
      )}
      
      {showModal && modalType === 'quotation' && <QuotationModal />}
      {showModal && modalType === 'client' && <ClientModal />}
      {showModal && modalType === 'service' && <ServiceModal />}
      <NotificationContainer />
    </div>
  );
};

export default CotizacionesApp;