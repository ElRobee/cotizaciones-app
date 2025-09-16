import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Users, 
  Settings, 
  Plus, 
  Search, 
  Filter,
  Download,
  Edit,
  Trash2,
  Eye,
  Calendar,
  DollarSign,
  Building,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Importar servicios
import {
  getQuotations,
  addQuotation,
  updateQuotation,
  deleteQuotation,
  getClients,
  addClient,
  getServices,
  addService
} from './services/firebaseService';

// Importar utilidades
import { generateQuotationPDF } from './utils/pdfGenerator';
import { exportQuotationsToExcel, exportClientsToExcel, exportServicesToExcel } from './utils/excelExporter';
import { showNotification } from './utils/notifications';

function App() {
  const [activeTab, setActiveTab] = useState('quotations');
  const [quotations, setQuotations] = useState([]);
  const [clients, setClients] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editingItem, setEditingItem] = useState(null);

  // Datos de la empresa
  const companyData = {
    razonSocial: "Mi Empresa de Maquinaria",
    rut: "12.345.678-9",
    direccion: "Av. Principal 123",
    ciudad: "Santiago",
    region: "Metropolitana",
    telefono: "+56 9 1234 5678",
    email: "contacto@miempresa.cl"
  };

  // Cargar datos iniciales
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [quotationsData, clientsData, servicesData] = await Promise.all([
        getQuotations(),
        getClients(),
        getServices()
      ]);
      
      setQuotations(quotationsData);
      setClients(clientsData);
      setServices(servicesData);
    } catch (error) {
      showNotification.error('Error al cargar los datos');
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Componente de navegación
  const Navigation = () => (
    <nav className="bg-white shadow-lg border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl font-bold text-gray-800">Sistema de Cotizaciones</h1>
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab('quotations')}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'quotations' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <FileText className="w-4 h-4 mr-2" />
                Cotizaciones
              </button>
              <button
                onClick={() => setActiveTab('clients')}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'clients' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Users className="w-4 h-4 mr-2" />
                Clientes
              </button>
              <button
                onClick={() => setActiveTab('services')}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'services' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Settings className="w-4 h-4 mr-2" />
                Servicios
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );

  // Componente de cotizaciones
  const QuotationsView = () => {
    const filteredQuotations = quotations.filter(q => 
      q.client?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.number?.toString().includes(searchTerm)
    );

    const handleNewQuotation = () => {
      setModalType('quotation');
      setEditingItem(null);
      setShowModal(true);
    };

    const handleEditQuotation = (quotation) => {
      setModalType('quotation');
      setEditingItem(quotation);
      setShowModal(true);
    };

    const handleDeleteQuotation = async (id) => {
      if (window.confirm('¿Está seguro de eliminar esta cotización?')) {
        try {
          await deleteQuotation(id);
          setQuotations(quotations.filter(q => q.id !== id));
          showNotification.success('Cotización eliminada exitosamente');
        } catch (error) {
          showNotification.error('Error al eliminar la cotización');
        }
      }
    };

    const handleGeneratePDF = async (quotation) => {
      try {
        const client = clients.find(c => c.empresa === quotation.client);
        await generateQuotationPDF(quotation, companyData, client);
        showNotification.success('PDF generado exitosamente');
      } catch (error) {
        showNotification.error('Error al generar el PDF');
      }
    };

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Cotizaciones</h2>
          <div className="flex space-x-3">
            <button
              onClick={() => exportQuotationsToExcel(quotations)}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <Download className="w-4 h-4 mr-2" />
              Exportar Excel
            </button>
            <button
              onClick={handleNewQuotation}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nueva Cotización
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar cotizaciones..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
            />
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Número
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredQuotations.map((quotation) => (
                <tr key={quotation.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {quotation.number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {quotation.client}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {quotation.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${quotation.total?.toLocaleString() || '0'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      quotation.status === 'Aprobada' ? 'bg-green-100 text-green-800' :
                      quotation.status === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {quotation.status || 'Pendiente'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleGeneratePDF(quotation)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Generar PDF"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEditQuotation(quotation)}
                        className="text-indigo-600 hover:text-indigo-900"
                        title="Editar"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteQuotation(quotation.id)}
                        className="text-red-600 hover:text-red-900"
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
          {filteredQuotations.length === 0 && (
            <div className="text-center py-12">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No hay cotizaciones</h3>
              <p className="mt-1 text-sm text-gray-500">Comience creando una nueva cotización.</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Componente de clientes
  const ClientsView = () => {
    const filteredClients = clients.filter(c => 
      c.empresa?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.rut?.includes(searchTerm)
    );

    const handleNewClient = () => {
      setModalType('client');
      setEditingItem(null);
      setShowModal(true);
    };

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Clientes</h2>
          <div className="flex space-x-3">
            <button
              onClick={() => exportClientsToExcel(clients)}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <Download className="w-4 h-4 mr-2" />
              Exportar Excel
            </button>
            <button
              onClick={handleNewClient}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Cliente
            </button>
          </div>
        </div>

        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Buscar clientes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClients.map((client) => (
            <div key={client.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{client.empresa}</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Building className="w-4 h-4 mr-2" />
                      <span>RUT: {client.rut}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      <span>{client.encargado}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{client.ciudad}, {client.region}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-2" />
                      <span>{client.telefono}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-2" />
                      <span>{client.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredClients.length === 0 && (
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No hay clientes</h3>
            <p className="mt-1 text-sm text-gray-500">Comience agregando un nuevo cliente.</p>
          </div>
        )}
      </div>
    );
  };

  // Componente de servicios
  const ServicesView = () => {
    const filteredServices = services.filter(s => 
      s.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleNewService = () => {
      setModalType('service');
      setEditingItem(null);
      setShowModal(true);
    };

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Servicios</h2>
          <div className="flex space-x-3">
            <button
              onClick={() => exportServicesToExcel(services)}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <Download className="w-4 h-4 mr-2" />
              Exportar Excel
            </button>
            <button
              onClick={handleNewService}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Servicio
            </button>
          </div>
        </div>

        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Buscar servicios..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
          />
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Servicio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Precio
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredServices.map((service) => (
                <tr key={service.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {service.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${service.price?.toLocaleString() || '0'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <Settings className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No hay servicios</h3>
            <p className="mt-1 text-sm text-gray-500">Comience agregando un nuevo servicio.</p>
          </div>
        )}
      </div>
    );
  };

  // Modal básico (placeholder)
  const Modal = () => {
    if (!showModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
          <h3 className="text-lg font-semibold mb-4">
            {modalType === 'quotation' ? 'Cotización' : 
             modalType === 'client' ? 'Cliente' : 'Servicio'}
          </h3>
          <p className="text-gray-600 mb-4">
            Funcionalidad de formulario en desarrollo...
          </p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {activeTab === 'quotations' && <QuotationsView />}
        {activeTab === 'clients' && <ClientsView />}
        {activeTab === 'services' && <ServicesView />}
      </main>

      <Modal />
      <ToastContainer />
    </div>
  );
}

export default App;