// Componente de cotizaciones
  const QuotationsView = () => (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Cotizaciones</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => exportToExcel('quotations')}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Excel</span>
          </button>
          <button
            onClick={() => {
              setModalType('quotation');
              setShowModal(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Nueva Cotización</span>
          </button>
        </div>
      </div>
      
      {/* Barra de búsqueda y filtros */}
      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar por cliente o número..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Filter className="w-4 h-4" />
            <span>Filtros Avanzados</span>
          </button>
        </div>
      </div>
      
      <AdvancedFilters />
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4">Número</th>
                <th className="text-left py-3 px-4">Cliente</th>
                <th className="text-left py-3 px-4">Fecha</th>
                <th className="text-left py-3 px-4">Total</th>
                <th className="text-left py-3 px-4">Estado</th>
                <th className="text-left py-3 px-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {getFilteredQuotations().map(quote => (
                <tr key={quote.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{quote.number}</td>
                  <td className="py-3 px-4">{quote.client}</td>
                  <td className="py-3 px-4">{quote.date}</td>
                  <td className="py-3 px-4 font-semibold">${quote.total.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <span className={import React, { useState, useEffect } from 'react';
import { 
  User, 
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
  Download,
  Eye
} from 'lucide-react';

// Simulación de Firebase (en producción usar Firebase SDK)
const mockFirebaseData = {
  users: [
    { id: 1, username: 'admin', password: 'admin123', role: 'admin', name: 'Administrador' },
    { id: 2, username: 'usuario', password: 'user123', role: 'user', name: 'Usuario Regular' }
  ],
  company: {
    razonSocial: 'Mi Empresa de Arriendo',
    rut: '12.345.678-9',
    direccion: 'Av. Principal 123',
    ciudad: 'Viña del Mar',
    region: 'Valparaíso',
    telefono: '+56 32 123 4567',
    email: 'contacto@miempresa.cl',
    logo: null
  },
  clients: [
    {
      id: 1,
      rut: '77648180-7',
      encargado: 'NN',
      empresa: 'Befoods',
      direccion: 'sin informar',
      ciudad: 'Viña del mar',
      region: 'Valparaíso',
      telefono: 'sin informar',
      email: 'sigpre@befoods.cl'
    },
    {
      id: 2,
      rut: '96870780-9',
      encargado: 'Ro Gomez',
      empresa: 'Echeverria Izquierdo',
      direccion: 'Santiago',
      ciudad: 'Santiago',
      region: 'Metropolitana de Santiago',
      telefono: '+56971345589',
      email: 'rgomez@eimontajes.cl'
    },
    {
      id: 3,
      rut: '77241463-3',
      encargado: 'Marco Perez',
      empresa: 'Organismo Tecnico Capacitacion',
      direccion: 'Viña',
      ciudad: 'Viña del mar',
      region: 'Valparaíso',
      telefono: '+56934683151',
      email: 'marco.perez@ia-im.com'
    }
  ],
  services: [
    { id: 1, name: 'PLATAFORMAS ELEVADORAS TIJERA', price: 100000 },
    { id: 2, name: 'BRAZO ARTICULADO 16 MT', price: 100000 },
    { id: 3, name: 'ELEVADOR ELECTRICO 8 MT', price: 50000 },
    { id: 4, name: 'ELEVADOR ELECTRICO 10 MT', price: 70000 },
    { id: 5, name: 'ELEVADOR ELECTRICO GENIE 12 MT', price: 135000 },
    { id: 6, name: 'ALZA HOMBRE 15 MT', price: 120000 },
    { id: 7, name: 'ALZA HOMBRE JLG 30 MT', price: 250000 },
    { id: 8, name: 'CAMIONES TRANSPORTE', price: 600000 },
    { id: 9, name: 'MANIPULADORES TELESCOPICOS', price: 60000 },
    { id: 10, name: 'GRUAS HORQUILLA', price: 80000 },
    { id: 11, name: 'OPERADOR', price: 45000 },
    { id: 12, name: 'COMBUSTIBLE LITRO DIESEL', price: 1200 }
  ],
  quotations: [
    {
      id: 1,
      number: 'COT-2025-001',
      client: 'Befoods',
      date: '2025-01-15',
      total: 234000,
      status: 'Enviada',
      items: [
        { id: 1, quantity: 2, service: 'ELEVADOR ELECTRICO 8 MT', unitPrice: 50000, total: 100000 },
        { id: 2, quantity: 1, service: 'OPERADOR', unitPrice: 45000, total: 45000 }
      ],
      discount: 0
    }
  ]
};

const CotizacionesApp = () => {
  // Estados principales
  const [currentUser, setCurrentUser] = useState(null);
  const [currentView, setCurrentView] = useState('login');
  const [data, setData] = useState(mockFirebaseData);
  
  // Estados para formularios
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [newQuotation, setNewQuotation] = useState({
    client: '',
    items: [{ quantity: 1, service: '', unitPrice: 0, total: 0 }],
    discount: 0
  });
  const [newClient, setNewClient] = useState({
    rut: '', encargado: '', empresa: '', direccion: '',
    ciudad: '', region: '', telefono: '', email: ''
  });
  const [newService, setNewService] = useState({ name: '', price: 0 });

  // Estados para modales y edición
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Función de login
  const handleLogin = (e) => {
    e.preventDefault();
    const user = data.users.find(u => 
      u.username === loginForm.username && u.password === loginForm.password
    );
    if (user) {
      setCurrentUser(user);
      setCurrentView('dashboard');
    } else {
      alert('Credenciales incorrectas');
    }
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
    setNewQuotation(prev => ({
      ...prev,
      items: [...prev.items, { quantity: 1, service: '', unitPrice: 0, total: 0 }]
    }));
  };

  // Función para actualizar item de cotización
  const updateQuotationItem = (index, field, value) => {
    const updatedItems = [...newQuotation.items];
    updatedItems[index][field] = value;
    
    // Si se cambia el servicio, actualizar precio unitario
    if (field === 'service') {
      const service = data.services.find(s => s.name === value);
      updatedItems[index].unitPrice = service ? service.price : 0;
    }
    
    // Recalcular total del item
    updatedItems[index].total = updatedItems[index].quantity * updatedItems[index].unitPrice;
    
    setNewQuotation(prev => ({ ...prev, items: updatedItems }));
  };

  // Función para guardar cotización
  const saveQuotation = () => {
    const totals = calculateQuotationTotals(newQuotation.items, newQuotation.discount);
    const quotation = {
      id: data.quotations.length + 1,
      number: `COT-2025-${String(data.quotations.length + 1).padStart(3, '0')}`,
      client: newQuotation.client,
      date: new Date().toISOString().split('T')[0],
      total: totals.total,
      status: 'Borrador',
      items: newQuotation.items,
      discount: newQuotation.discount
    };
    
    setData(prev => ({
      ...prev,
      quotations: [...prev.quotations, quotation]
    }));
    
    setNewQuotation({
      client: '',
      items: [{ quantity: 1, service: '', unitPrice: 0, total: 0 }],
      discount: 0
    });
    
    setShowModal(false);
    alert('Cotización guardada exitosamente');
  };

  // Función para agregar cliente
  const addClient = () => {
    const client = {
      id: data.clients.length + 1,
      ...newClient
    };
    
    setData(prev => ({
      ...prev,
      clients: [...prev.clients, client]
    }));
    
    setNewClient({
      rut: '', encargado: '', empresa: '', direccion: '',
      ciudad: '', region: '', telefono: '', email: ''
    });
    
    setShowModal(false);
    alert('Cliente agregado exitosamente');
  };

  // Función para agregar servicio
  const addService = () => {
    const service = {
      id: data.services.length + 1,
      ...newService,
      price: Number(newService.price)
    };
    
    setData(prev => ({
      ...prev,
      services: [...prev.services, service]
    }));
    
    setNewService({ name: '', price: 0 });
    setShowModal(false);
    alert('Servicio agregado exitosamente');
  };

  // Componente del sidebar
  const Sidebar = () => (
    <div className="w-64 bg-gray-900 text-white h-screen flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <Building2 className="w-8 h-8 text-blue-400" />
          <div>
            <h2 className="font-bold">{data.company.razonSocial}</h2>
            <p className="text-sm text-gray-400">{currentUser?.name}</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {[
            { id: 'dashboard', icon: BarChart3, label: 'Dashboard' },
            { id: 'quotations', icon: FileText, label: 'Cotizaciones' },
            { id: 'clients', icon: Users, label: 'Clientes' },
            { id: 'services', icon: Calculator, label: 'Servicios' },
            { id: 'settings', icon: Settings, label: 'Ajustes' }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                currentView === item.id 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
      
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={() => {
            setCurrentUser(null);
            setCurrentView('login');
          }}
          className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800"
        >
          <LogOut className="w-5 h-5" />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );

  // Componente de login
  const LoginView = () => (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <div className="text-center mb-8">
          <Building2 className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800">Sistema de Cotizaciones</h1>
          <p className="text-gray-600">Inicia sesión para continuar</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Usuario</label>
            <input
              type="text"
              value={loginForm.username}
              onChange={(e) => setLoginForm(prev => ({ ...prev, username: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
            <input
              type="password"
              value={loginForm.password}
              onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Iniciar Sesión
          </button>
        </form>
        
        <div className="mt-4 text-sm text-gray-600">
          <p>Usuarios de prueba:</p>
          <p>Admin: admin / admin123</p>
          <p>Usuario: usuario / user123</p>
        </div>
      </div>
    </div>
  );

  // Componente del dashboard
  const DashboardView = () => (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <FileText className="w-10 h-10 text-blue-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-800">{data.quotations.length}</p>
              <p className="text-gray-600">Cotizaciones</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Users className="w-10 h-10 text-green-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-800">{data.clients.length}</p>
              <p className="text-gray-600">Clientes</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Calculator className="w-10 h-10 text-purple-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-800">{data.services.length}</p>
              <p className="text-gray-600">Servicios</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Últimas Cotizaciones</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Número</th>
                <th className="text-left py-2">Cliente</th>
                <th className="text-left py-2">Fecha</th>
                <th className="text-left py-2">Total</th>
                <th className="text-left py-2">Estado</th>
              </tr>
            </thead>
            <tbody>
              {data.quotations.slice(-5).map(quote => (
                <tr key={quote.id} className="border-b">
                  <td className="py-2">{quote.number}</td>
                  <td className="py-2">{quote.client}</td>
                  <td className="py-2">{quote.date}</td>
                  <td className="py-2">${quote.total.toLocaleString()}</td>
                  <td className="py-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      quote.status === 'Enviada' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {quote.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Componente de cotizaciones
  const QuotationsView = () => (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Cotizaciones</h1>
        <button
          onClick={() => {
            setModalType('quotation');
            setShowModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Nueva Cotización</span>
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4">Número</th>
                <th className="text-left py-3 px-4">Cliente</th>
                <th className="text-left py-3 px-4">Fecha</th>
                <th className="text-left py-3 px-4">Total</th>
                <th className="text-left py-3 px-4">Estado</th>
                <th className="text-left py-3 px-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data.quotations.map(quote => (
                <tr key={quote.id} className="border-b">
                  <td className="py-3 px-4">{quote.number}</td>
                  <td className="py-3 px-4">{quote.client}</td>
                  <td className="py-3 px-4">{quote.date}</td>
                  <td className="py-3 px-4">${quote.total.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      quote.status === 'Enviada' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {quote.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-800">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
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

  // Modal para nueva cotización
  const QuotationModal = () => {
    const totals = calculateQuotationTotals(newQuotation.items, newQuotation.discount);
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-screen overflow-y-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Nueva Cotización</h2>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Cliente</label>
            <select
              value={newQuotation.client}
              onChange={(e) => setNewQuotation(prev => ({ ...prev, client: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Seleccionar cliente</option>
              {data.clients.map(client => (
                <option key={client.id} value={client.empresa}>
                  {client.empresa} - {client.encargado}
                </option>
              ))}
            </select>
          </div>
          
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Detalle de Servicios</h3>
              <button
                onClick={addQuotationItem}
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 flex items-center space-x-1"
              >
                <Plus className="w-4 h-4" />
                <span>Agregar</span>
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-2 px-3 border-b">Cantidad</th>
                    <th className="text-left py-2 px-3 border-b">Servicio</th>
                    <th className="text-left py-2 px-3 border-b">Precio Unit.</th>
                    <th className="text-left py-2 px-3 border-b">Total</th>
                    <th className="text-left py-2 px-3 border-b">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {newQuotation.items.map((item, index) => (
                    <tr key={index}>
                      <td className="py-2 px-3 border-b">
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateQuotationItem(index, 'quantity', Number(e.target.value))}
                          className="w-20 px-2 py-1 border rounded"
                          min="1"
                        />
                      </td>
                      <td className="py-2 px-3 border-b">
                        <select
                          value={item.service}
                          onChange={(e) => updateQuotationItem(index, 'service', e.target.value)}
                          className="w-full px-2 py-1 border rounded"
                        >
                          <option value="">Seleccionar servicio</option>
                          {data.services.map(service => (
                            <option key={service.id} value={service.name}>
                              {service.name}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="py-2 px-3 border-b">
                        ${item.unitPrice.toLocaleString()}
                      </td>
                      <td className="py-2 px-3 border-b">
                        ${item.total.toLocaleString()}
                      </td>
                      <td className="py-2 px-3 border-b">
                        <button
                          onClick={() => {
                            const updatedItems = newQuotation.items.filter((_, i) => i !== index);
                            setNewQuotation(prev => ({ ...prev, items: updatedItems }));
                          }}
                          className="text-red-600 hover:text-red-800"
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
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Descuento</label>
                <select
                  value={newQuotation.discount}
                  onChange={(e) => setNewQuotation(prev => ({ ...prev, discount: Number(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value={0}>0%</option>
                  <option value={3}>3%</option>
                  <option value={5}>5%</option>
                  <option value={8}>8%</option>
                  <option value={10}>10%</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${totals.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>IVA (19%):</span>
                  <span>${totals.iva.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Bruto:</span>
                  <span>${totals.totalBruto.toLocaleString()}</span>
                </div>
                {totals.discountAmount > 0 && (
                  <div className="flex justify-between text-red-600">
                    <span>Descuento ({newQuotation.discount}%):</span>
                    <span>-${totals.discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Total Final:</span>
                  <span>${totals.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              onClick={saveQuotation}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Guardar</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Renderizado condicional basado en login y vista actual
  if (!currentUser) {
    return <LoginView />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        {currentView === 'dashboard' && <DashboardView />}
        {currentView === 'quotations' && <QuotationsView />}
        {currentView === 'clients' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-800">Clientes</h1>
              <button
                onClick={() => {
                  setModalType('client');
                  setShowModal(true);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Nuevo Cliente</span>
              </button>
            </div>
            
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-3 px-4">RUT</th>
                      <th className="text-left py-3 px-4">Empresa</th>
                      <th className="text-left py-3 px-4">Encargado</th>
                      <th className="text-left py-3 px-4">Ciudad</th>
                      <th className="text-left py-3 px-4">Teléfono</th>
                      <th className="text-left py-3 px-4">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.clients
                      .filter(client => 
                        client.empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        client.encargado.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .sort((a, b) => a.empresa.localeCompare(b.empresa))
                      .map(client => (
                      <tr key={client.id} className="border-b">
                        <td className="py-3 px-4">{client.rut}</td>
                        <td className="py-3 px-4">{client.empresa}</td>
                        <td className="py-3 px-4">{client.encargado}</td>
                        <td className="py-3 px-4">{client.ciudad}</td>
                        <td className="py-3 px-4">{client.telefono}</td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <button className="text-green-600 hover:text-green-800">
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-800">
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
        )}
        {currentView === 'services' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-800">Servicios</h1>
              <button
                onClick={() => {
                  setModalType('service');
                  setShowModal(true);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Nuevo Servicio</span>
              </button>
            </div>
            
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-3 px-4">Servicio</th>
                      <th className="text-left py-3 px-4">Precio</th>
                      <th className="text-left py-3 px-4">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.services.map(service => (
                      <tr key={service.id} className="border-b">
                        <td className="py-3 px-4">{service.name}</td>
                        <td className="py-3 px-4">${service.price.toLocaleString()}</td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <button className="text-green-600 hover:text-green-800">
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-800">
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
        )}
        {currentView === 'settings' && (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Configuración de la Empresa</h1>
            
            <div className="bg-white rounded-lg shadow p-6">
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Dirección</label>
                  <input
                    type="text"
                    value={data.company.direccion}
                    onChange={(e) => setData(prev => ({
                      ...prev,
                      company: { ...prev.company, direccion: e.target.value }
                    }))}
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Logo de la Empresa</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <button
                    type="button"
                    onClick={() => {
                      showNotification('Configuración guardada exitosamente', 'success');
                    }}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Guardar Configuración</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      
      {/* Notificaciones */}
      <NotificationContainer />
      
      {/* Modales */}
      {showModal && modalType === 'quotation' && <QuotationModal />}
      
      {showModal && modalType === 'client' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Nuevo Cliente</h2>
            
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">RUT</label>
                <input
                  type="text"
                  value={newClient.rut}
                  onChange={(e) => setNewClient(prev => ({ ...prev, rut: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Encargado</label>
                <input
                  type="text"
                  value={newClient.encargado}
                  onChange={(e) => setNewClient(prev => ({ ...prev, encargado: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Empresa</label>
                <input
                  type="text"
                  value={newClient.empresa}
                  onChange={(e) => setNewClient(prev => ({ ...prev, empresa: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Dirección</label>
                <input
                  type="text"
                  value={newClient.direccion}
                  onChange={(e) => setNewClient(prev => ({ ...prev, direccion: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ciudad</label>
                <input
                  type="text"
                  value={newClient.ciudad}
                  onChange={(e) => setNewClient(prev => ({ ...prev, ciudad: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Región</label>
                <input
                  type="text"
                  value={newClient.region}
                  onChange={(e) => setNewClient(prev => ({ ...prev, region: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                <input
                  type="text"
                  value={newClient.telefono}
                  onChange={(e) => setNewClient(prev => ({ ...prev, telefono: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={newClient.email}
                  onChange={(e) => setNewClient(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </form>
            
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={addClient}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Guardar Cliente</span>
              </button>
            </div>
          </div>
        </div>
      )}
      
      {showModal && modalType === 'service' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Nuevo Servicio</h2>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del Servicio</label>
                <input
                  type="text"
                  value={newService.name}
                  onChange={(e) => setNewService(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ej: GRUA HORQUILLA 5 TON"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Precio ($)</label>
                <input
                  type="number"
                  value={newService.price}
                  onChange={(e) => setNewService(prev => ({ ...prev, price: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0"
                />
              </div>
            </form>
            
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={addService}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Guardar Servicio</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CotizacionesApp;