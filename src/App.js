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

<div className="p-3 bg-purple-100 rounded-full">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tasa Conversión</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {data.quotations.length > 0 
                  ? Math.round((data.quotations.filter(q => q.status === 'Facturada').length / data.quotations.length) * 100)
                  : 0}%
              </p>
              <p className="text-sm text-orange-600 mt-2">↗ +2% vs mes anterior</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Lista de cotizaciones recientes */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Cotizaciones Recientes</h3>
        </div>
        <div className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Número</th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Cliente</th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Fecha</th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Total</th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Estado</th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Prioridad</th>
                </tr>
              </thead>
              <tbody>
                {data.quotations.slice(-5).reverse().map(quote => (
                  <tr key={quote.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 font-medium text-gray-900">{quote.number}</td>
                    <td className="py-4 px-6 text-gray-700">{quote.client}</td>
                    <td className="py-4 px-6 text-gray-600">{quote.date}</td>
                    <td className="py-4 px-6 font-semibold text-gray-900">${quote.total.toLocaleString()}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        quote.status === 'Facturada' 
                          ? 'bg-green-100 text-green-800' 
                          : quote.status === 'Pendiente'
                          ? 'bg-yellow-100 text-yellow-800'
                          : quote.status === 'En Proceso'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {quote.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        quote.priority === 'Alta' 
                          ? 'bg-red-100 text-red-800' 
                          : quote.priority === 'Media'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {quote.priority}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  // Vista de cotizaciones mejorada
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
      
      {/* Filtros avanzados */}
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
              <option value="En Proceso">En Proceso</option>
              <option value="Facturada">Facturada</option>
              <option value="Rechazada">Rechazada</option>
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
        </div>
        
        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={() => setFilters({
              dateFrom: '', dateTo: '', status: '', priority: '', minAmount: '', maxAmount: '', client: '', createdBy: ''
            })}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Limpiar Filtros
          </button>
          <button
            onClick={() => setShowFilters(false)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Aplicar Filtros
          </button>
        </div>
      </div>
      
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
                  <td className="py-4 px-6 font-semibold text-gray-900">${quote.total.toLocaleString()}</td>
                  <td className="py-4 px-6">
                    <select
                      value={quote.status}
                      onChange={(e) => changeQuotationStatus(quote.id, e.target.value)}
                      className={`text-xs font-medium rounded-full px-3 py-1 border-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        quote.status === 'Facturada' 
                          ? 'bg-green-100 text-green-800' 
                          : quote.status === 'Pendiente'
                          ? 'bg-yellow-100 text-yellow-800'
                          : quote.status === 'En Proceso'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      <option value="Pendiente">Pendiente</option>
                      <option value="En Proceso">En Proceso</option>
                      <option value="Facturada">Facturada</option>
                      <option value="Rechazada">Rechazada</option>
                    </select>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      quote.priority === 'Alta' 
                        ? 'bg-red-100 text-red-800' 
                        : quote.priority === 'Media'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {quote.priority}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex space-x-1">
                      <button 
                        onClick={() => exportToPDF(quote)}
                        className="p-2 text-purple-600 hover:text-purple-800 hover:bg-purple-100 rounded-lg transition-colors"
                        title="Exportar PDF"
                      >
                        <FileText className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => sendViaWhatsApp(quote)}
                        className="p-2 text-green-600 hover:text-green-800 hover:bg-green-100 rounded-lg transition-colors"
                        title="Enviar por WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => sendViaEmail(quote)}
                        className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-lg transition-colors"
                        title="Enviar por Email"
                      >
                        <Mail className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => startEdit('quotation', quote)}
                        className="p-2 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-100 rounded-lg transition-colors"
                        title="Editar"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => deleteItem('quotations', quote.id)}
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
          
          {getFilteredQuotations().length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <FileText className="w-16 h-16 mx-auto mb-4 opacity-30" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No hay cotizaciones</h3>
              <p>No se encontraron cotizaciones que coincidan con tu búsqueda.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

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
                      <span className="font-semibold">-${totals.discountAmount.to        <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
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
    const BOM = '\uFEFF';
    const blob = new Blob([BOM + content], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Funciones para filtrar datos
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

  const getFilteredClients = () => {
    return data.clients.filter(client => 
      client.empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.encargado.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.rut.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.ciudad.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase())
    ).sort((a, b) => a.empresa.localeCompare(b.empresa));
  };

  const getFilteredServices = () => {
    return data.services.filter(service => 
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.category.toLowerCase().includes(searchTerm.toLowerCase())
    ).sort((a, b) => a.name.localeCompare(b.name));
  };

  // Funciones para guardar datos
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

  // Funciones auxiliares
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

  const cancelEdit = () => {
    setEditingQuotation(null);
    setEditingClient(null);
    setEditingService(null);
    setShowModal(false);
  };

  // Componente de notificaciones del sistema
  const NotificationContainer = () => (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map(notification => (
        <div
          key={notification.id}
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg shadow-lg transition-all transform ${
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

  // Componente del sidebar
  const Sidebar = () => (
    <div className={`w-64 bg-gray-900 text-white h-screen flex flex-col transition-all duration-300`}>
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <Building2 className="w-8 h-8 text-blue-400" />
          <div className="overflow-hidden">
            <h2 className="font-bold text-sm truncate">{data.company.razonSocial}</h2>
            <p className="text-xs text-gray-400 truncate">{currentUser?.displayName || currentUser?.email}</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-2">
        <div className="space-y-1">
          {[
            { id: 'dashboard', icon: BarChart3, label: 'Dashboard' },
            { id: 'quotations', icon: FileText, label: 'Cotizaciones' },
            { id: 'clients', icon: Users, label: 'Clientes' },
            { id: 'services', icon: Calculator, label: 'Servicios' },
            { id: 'settings', icon: Settings, label: 'Configuración' }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
                currentView === item.id 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
      
      <div className="p-2 border-t border-gray-700 space-y-1">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm">Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );

  // Componente de autenticación mejorado
  const AuthView = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Building2 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {authMode === 'login' ? 'Iniciar Sesión' : 
             authMode === 'register' ? 'Crear Cuenta' : 
             'Recuperar Contraseña'}
          </h1>
          <p className="text-gray-600 text-sm">
            {authMode === 'login' ? 'Accede a tu cuenta para continuar' : 
             authMode === 'register' ? 'Crea tu cuenta en el sistema' : 
             'Te enviaremos un enlace de recuperación'}
          </p>
        </div>
        
        <form onSubmit={handleAuth} className="space-y-4">
          {authMode === 'register' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre Completo
              </label>
              <input
                type="text"
                value={registerForm.name}
                onChange={(e) => setRegisterForm(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                placeholder="Tu nombre completo"
                required
              />
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={authMode === 'login' ? loginForm.email : 
                     authMode === 'register' ? registerForm.email : 
                     forgotForm.email}
              onChange={(e) => {
                const value = e.target.value;
                if (authMode === 'login') {
                  setLoginForm(prev => ({ ...prev, email: value }));
                } else if (authMode === 'register') {
                  setRegisterForm(prev => ({ ...prev, email: value }));
                } else {
                  setForgotForm(prev => ({ ...prev, email: value }));
                }
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              placeholder="tu@email.com"
              required
            />
          </div>

          {authMode !== 'forgot' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                value={authMode === 'login' ? loginForm.password : registerForm.password}
                onChange={(e) => {
                  const value = e.target.value;
                  if (authMode === 'login') {
                    setLoginForm(prev => ({ ...prev, password: value }));
                  } else {
                    setRegisterForm(prev => ({ ...prev, password: value }));
                  }
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                placeholder="Tu contraseña"
                required
              />
            </div>
          )}

          {authMode === 'register' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirmar Contraseña
              </label>
              <input
                type="password"
                value={registerForm.confirmPassword}
                onChange={(e) => setRegisterForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                placeholder="Confirma tu contraseña"
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white py-3 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-medium"
          >
            {authMode === 'login' ? 'Iniciar Sesión' : 
             authMode === 'register' ? 'Crear Cuenta' : 
             'Enviar Enlace'}
          </button>
        </form>
        
        <div className="mt-6 text-center space-y-2">
          {authMode === 'login' && (
            <>
              <button
                onClick={() => setAuthMode('forgot')}
                className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                ¿Olvidaste tu contraseña?
              </button>
              <div className="text-sm text-gray-500">
                ¿No tienes cuenta? 
                <button
                  onClick={() => setAuthMode('register')}
                  className="ml-1 text-blue-600 hover:underline font-medium"
                >
                  Regístrate
                </button>
              </div>
            </>
          )}
          
          {authMode !== 'login' && (
            <button
              onClick={() => setAuthMode('login')}
              className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              ← Volver al inicio de sesión
            </button>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center mb-2">
            Cuentas de demo:
          </p>
          <div className="text-xs text-gray-600 space-y-1">
            <div>👨‍💼 Admin: admin@empresa.com / 123456</div>
            <div>👤 Usuario: usuario@empresa.com / 123456</div>
            <div>💼 Vendedor: vendedor@empresa.com / 123456</div>
          </div>
        </div>
      </div>
    </div>
  );

  // Dashboard mejorado
  const DashboardView = () => (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600 mt-1">Bienvenido, {currentUser?.displayName || currentUser?.email}</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={generateBackup}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Backup</span>
          </button>
        </div>
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Cotizaciones</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{data.quotations.length}</p>
              <p className="text-sm text-green-600 mt-2">↗ +12% vs mes anterior</p> 
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Clientes Activos</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{data.clients.length}</p>
              <p className="text-sm text-blue-600 mt-2">↗ +3 nuevos</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Ingresos del Mes</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                ${data.quotations.filter(q => q.status === 'Facturada').reduce((sum, q) => sum + q.total, 0).toLocaleString()}
              </p>
              <p className="text-sm text-green-600 mt-2">↗ +8% vs mes anterior</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <DollarSign className="w-6 h-6 text-purple-600import React, { useState, useEffect } from 'react';

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