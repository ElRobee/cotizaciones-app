import React, { useState, useCallback, useMemo } from 'react';
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
  User,
  Home,
  Check,
  XCircle
} from 'lucide-react';

// SIMULACIÓN DE FIREBASE AUTH
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

// DATOS SIMULADOS
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
      total: 145000,
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
      total: 690000,
      status: 'Facturada',
      priority: 'Media',
      validUntil: '2025-02-10',
      notes: 'Proyecto a largo plazo',
      items: [
        { id: 1, quantity: 1, service: 'CAMIONES TRANSPORTE', unitPrice: 600000, total: 600000 },
        { id: 2, quantity: 2, service: 'OPERADOR', unitPrice: 45000, total: 90000 }
      ],
      discount: 0,
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
  // ESTADOS PRINCIPALES
  const [currentUser, setCurrentUser] = useState(null);
  const [currentView, setCurrentView] = useState('login');
  const [data, setData] = useState(mockFirebaseData);
  const [authMode, setAuthMode] = useState('login');
  
  // ESTADOS DE TEMA Y CONFIGURACIÓN
  const [theme, setTheme] = useState('blue');
  const [darkMode, setDarkMode] = useState(false);
  const [compactView, setCompactView] = useState(false);
  
  // ESTADOS PARA FORMULARIOS DE AUTENTICACIÓN
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ 
    email: '', 
    password: '', 
    confirmPassword: '', 
    name: '' 
  });
  const [forgotForm, setForgotForm] = useState({ email: '' });
  
  // ESTADOS PARA NUEVOS ELEMENTOS (usando useCallback para evitar recreaciones)
  const initialQuotation = useMemo(() => ({
    client: '',
    date: new Date().toISOString().split('T')[0],
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    priority: 'Media',
    notes: '',
    items: [{ id: Date.now(), quantity: 1, service: '', unitPrice: 0, total: 0 }],
    discount: 0
  }), []);

  const [newQuotation, setNewQuotation] = useState(initialQuotation);
  
  const initialClient = useMemo(() => ({
    rut: '', 
    encargado: '', 
    empresa: '', 
    direccion: '',
    ciudad: '', 
    region: '', 
    telefono: '', 
    email: ''
  }), []);

  const [newClient, setNewClient] = useState(initialClient);
  
  const initialService = useMemo(() => ({ 
    name: '', 
    price: 0, 
    category: 'General',
    active: true 
  }), []);

  const [newService, setNewService] = useState(initialService);

  // ESTADOS PARA EDICIÓN
  const [editingQuotation, setEditingQuotation] = useState(null);
  const [editingClient, setEditingClient] = useState(null);
  const [editingService, setEditingService] = useState(null);
  const [editingCompany, setEditingCompany] = useState(null);
  const [newCompanyLogo, setNewCompanyLogo] = useState(null);

  // ESTADOS PARA MODALES Y UI
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  // ESTADOS PARA NOTIFICACIONES
  const [notifications, setNotifications] = useState([]);
  const [systemNotifications, setSystemNotifications] = useState(mockFirebaseData.notifications);
  const [showNotificationPanel, setShowNotificationPanel] = useState(false);
  
  // ESTADOS PARA FILTROS
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
  
  // ESTADOS PARA REPORTES
  const [reportType, setReportType] = useState('monthly');
  const [reportPeriod, setReportPeriod] = useState('2025-01');
  const [generatingReport, setGeneratingReport] = useState(false);

 
// PARTE 2 - FUNCIONES AUXILIARES Y UTILITARIOS

// TEMAS DISPONIBLES
  const themes = useMemo(() => ({
    blue: { primary: 'blue-600', secondary: 'blue-100', accent: 'blue-400' },
    green: { primary: 'green-600', secondary: 'green-100', accent: 'green-400' },
    purple: { primary: 'purple-600', secondary: 'purple-100', accent: 'purple-400' },
    red: { primary: 'red-600', secondary: 'red-100', accent: 'red-400' },
    gray: { primary: 'gray-600', secondary: 'gray-100', accent: 'gray-400' }
  }), []);

  // FUNCIÓN PARA FORMATEAR RUT CHILENO
  const formatRut = useCallback((value) => {
    const cleanRut = value.replace(/[^\dkK]/g, '');
    if (cleanRut.length <= 1) return cleanRut;
    const body = cleanRut.slice(0, -1);
    const dv = cleanRut.slice(-1);
    const formattedBody = body.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `${formattedBody}-${dv}`;
  }, []);
 return (
   
  // FUNCIÓN PARA VALIDAR RUT
  const validateRut = useCallback((rut) => {
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
  }, []);

  // FUNCIÓN PARA VALIDAR EMAIL
  const validateEmail = useCallback((email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }, []);

  // FUNCIÓN PARA MOSTRAR NOTIFICACIONES
  const showNotification = useCallback((message, type = 'success') => {
    const id = Date.now();
    const notification = { id, message, type };
    setNotifications(prev => [...prev, notification]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 4000);
  }, []);

  // FUNCIÓN PARA CALCULAR TOTALES DE COTIZACIÓN
  const calculateQuotationTotals = useCallback((items, discount = 0) => {
    const subtotal = items.reduce((sum, item) => sum + (item.total || 0), 0);
    const iva = subtotal * 0.19;
    const totalBruto = subtotal + iva;
    const discountAmount = totalBruto * (discount / 100);
    const total = totalBruto - discountAmount;
    return { subtotal, iva, totalBruto, discountAmount, total };
  }, []);

  // FUNCIÓN PARA CALCULAR FECHA VÁLIDA HASTA (suma 30 días a la fecha)
  const calculateValidUntilDate = useCallback((fromDate) => {
    const date = new Date(fromDate);
    date.setDate(date.getDate() + 30);
    return date.toISOString().split('T')[0];
  }, []);

  // FUNCIONES DE FILTRADO OPTIMIZADAS
  const getFilteredClients = useCallback(() => {
    if (!searchTerm && !data?.clients) return [];
    
    const searchLower = searchTerm.toLowerCase();
    return data.clients.filter(client => {
      if (!searchTerm) return true;
      
      return (
        client.empresa.toLowerCase().includes(searchLower) ||
        client.encargado.toLowerCase().includes(searchLower) ||
        client.rut.includes(searchTerm) ||
        client.email.toLowerCase().includes(searchLower)
      );
    });
  }, [searchTerm, data?.clients]);

  const getFilteredServices = useCallback(() => {
    if (!searchTerm && !data?.services) return [];
    
    const searchLower = searchTerm.toLowerCase();
    return data.services.filter(service => {
      if (!searchTerm) return true;
      
      return (
        service.name.toLowerCase().includes(searchLower) ||
        service.category.toLowerCase().includes(searchLower)
      );
    });
  }, [searchTerm, data?.services]);

  const getFilteredQuotations = useCallback(() => {
    if (!data?.quotations) return [];
    
    return data.quotations.filter(quotation => {
      // Filtro de búsqueda
      const matchesSearch = !searchTerm || 
        quotation.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quotation.client.toLowerCase().includes(searchTerm.toLowerCase());

      // Filtros avanzados
      const matchesFilters = 
        (!filters.status || quotation.status === filters.status) &&
        (!filters.priority || quotation.priority === filters.priority) &&
        (!filters.client || quotation.client === filters.client) &&
        (!filters.dateFrom || quotation.date >= filters.dateFrom) &&
        (!filters.dateTo || quotation.date <= filters.dateTo) &&
        (!filters.minAmount || quotation.total >= Number(filters.minAmount)) &&
        (!filters.maxAmount || quotation.total <= Number(filters.maxAmount)) &&
        (!filters.createdBy || quotation.createdBy === filters.createdBy);

      return matchesSearch && matchesFilters;
    });
  }, [searchTerm, filters, data?.quotations]);

  // FUNCIÓN PARA LIMPIAR FILTROS
  const clearFilters = useCallback(() => {
    setFilters({
      dateFrom: '',
      dateTo: '',
      status: '',
      priority: '',
      minAmount: '',
      maxAmount: '',
      client: '',
      createdBy: ''
    });
    setSearchTerm('');
    showNotification('Filtros limpiados', 'info');
  }, [showNotification]);

  // FUNCIÓN PARA GENERAR NÚMERO DE COTIZACIÓN
  const generateQuotationNumber = useCallback(() => {
    const currentYear = new Date().getFullYear();
    const maxId = Math.max(...(data?.quotations?.map(q => q.id) || [0]), 0);
    const newId = maxId + 1;
    return `COT-${currentYear}-${String(newId).padStart(3, '0')}`;
  }, [data?.quotations]);

  // FUNCIÓN PARA OBTENER CLIENTE POR EMPRESA
  const getClientByCompany = useCallback((companyName) => {
    if (!data?.clients) return null;
    return data.clients.find(c => c.empresa === companyName) || null;
  }, [data?.clients]);

  // FUNCIÓN PARA OBTENER SERVICIO POR NOMBRE
  const getServiceByName = useCallback((serviceName) => {
    if (!data?.services) return null;
    return data.services.find(s => s.name === serviceName) || null;
  }, [data?.services]);

  // FUNCIÓN PARA FORMATEAR MONEDA
  const formatCurrency = useCallback((amount, currency = 'CLP') => {
    if (typeof amount !== 'number') return '$0';
    
    const formatOptions = {
      style: 'currency',
      currency: currency === 'CLP' ? 'CLP' : currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    };

    try {
      return new Intl.NumberFormat('es-CL', formatOptions).format(amount);
    } catch (error) {
      return `$${amount.toLocaleString()}`;
    }
  }, []);

  // FUNCIÓN PARA FORMATEAR FECHA
  const formatDate = useCallback((dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-CL');
    } catch (error) {
      return dateString;
    }
  }, []);

  // FUNCIÓN PARA VALIDAR FORMULARIO DE COTIZACIÓN
  const validateQuotationForm = useCallback((quotationData) => {
    const errors = [];
    
    if (!quotationData.client) {
      errors.push('Por favor selecciona un cliente');
    }
    
    if (!quotationData.items || quotationData.items.length === 0) {
      errors.push('Por favor agrega al menos un servicio');
    } else {
      const hasValidItems = quotationData.items.some(item => item.service && item.quantity > 0);
      if (!hasValidItems) {
        errors.push('Por favor agrega al menos un servicio válido');
      }
    }
    
    if (quotationData.discount < 0 || quotationData.discount > 100) {
      errors.push('El descuento debe estar entre 0% y 100%');
    }
    
    return errors;
  }, []);

  // FUNCIÓN PARA VALIDAR FORMULARIO DE CLIENTE
  const validateClientForm = useCallback((clientData, isEditing = false, existingClients = []) => {
    const errors = [];
    
    if (!clientData.rut || !clientData.empresa) {
      errors.push('RUT y Empresa son campos obligatorios');
    }
    
    if (clientData.rut && !validateRut(clientData.rut)) {
      errors.push('RUT inválido');
    }
    
    if (clientData.email && !validateEmail(clientData.email)) {
      errors.push('Email inválido');
    }
    
    // Verificar RUT duplicado
    if (clientData.rut) {
      const duplicateClient = existingClients.find(c => 
        c.rut === clientData.rut && (!isEditing || c.id !== clientData.id)
      );
      if (duplicateClient) {
        errors.push('Ya existe un cliente con este RUT');
      }
    }
    
    return errors;
  }, [validateRut, validateEmail]);

  // FUNCIÓN PARA VALIDAR FORMULARIO DE SERVICIO
  const validateServiceForm = useCallback((serviceData, isEditing = false, existingServices = []) => {
    const errors = [];
    
    if (!serviceData.name || serviceData.price <= 0) {
      errors.push('Nombre y precio válido son campos obligatorios');
    }
    
    if (serviceData.price < 0) {
      errors.push('El precio no puede ser negativo');
    }
    
    // Verificar nombre duplicado
    if (serviceData.name) {
      const duplicateService = existingServices.find(s => 
        s.name.toLowerCase() === serviceData.name.toLowerCase() && 
        (!isEditing || s.id !== serviceData.id)
      );
      if (duplicateService) {
        errors.push('Ya existe un servicio con este nombre');
      }
    }
    
    return errors;
  }, []);

  return (


// PARTE 3 - FUNCIONES CRUD Y GESTIÓN DE ESTADOS

// FUNCIONES DE GESTIÓN DE ESTADOS DE EDICIÓN
  const startEdit = useCallback((type, item) => {
    switch (type) {
      case 'quotation':
        setEditingQuotation({ ...item });
        setModalType('quotation');
        break;
      case 'client':
        setEditingClient({ ...item });
        setModalType('client');
        break;
      case 'service':
        setEditingService({ ...item });
        setModalType('service');
        break;
      case 'company':
        setEditingCompany({ ...item });
        setModalType('company');
        break;
      default:
        return;
    }
    setShowModal(true);
  }, []);

  const cancelEdit = useCallback(() => {
    setEditingQuotation(null);
    setEditingClient(null);
    setEditingService(null);
    setEditingCompany(null);
    setShowModal(false);
    setModalType('');
    
    // Reset forms to initial state
    const initialQuotation = {
      client: '',
      date: new Date().toISOString().split('T')[0],
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      priority: 'Media',
      notes: '',
      items: [{ id: Date.now(), quantity: 1, service: '', unitPrice: 0, total: 0 }],
      discount: 0
    };

    const initialClient = {
      rut: '', 
      encargado: '', 
      empresa: '', 
      direccion: '',
      ciudad: '', 
      region: '', 
      telefono: '', 
      email: ''
    };

    const initialService = { 
      name: '', 
      price: 0, 
      category: 'General',
      active: true 
    };

    setNewQuotation(initialQuotation);
    setNewClient(initialClient);
    setNewService(initialService);
  }, []);

  // FUNCIÓN GENÉRICA PARA ELIMINAR ELEMENTOS
  const deleteItem = useCallback((type, id) => {
    const confirmMessages = {
      quotations: '¿Estás seguro de que deseas eliminar esta cotización?',
      clients: '¿Estás seguro de que deseas eliminar este cliente?',
      services: '¿Estás seguro de que deseas eliminar este servicio?'
    };

    const successMessages = {
      quotations: 'Cotización eliminada exitosamente',
      clients: 'Cliente eliminado exitosamente',
      services: 'Servicio eliminado exitosamente'
    };

    if (window.confirm(confirmMessages[type] || '¿Estás seguro de que deseas eliminar este elemento?')) {
      setData(prev => ({
        ...prev,
        [type]: prev[type].filter(item => item.id !== id)
      }));
      
      const message = successMessages[type] || 'Elemento eliminado exitosamente';
      showNotification(message, 'success');
    }
  }, []);

  // FUNCIÓN PARA GUARDAR COTIZACIÓN
  const saveQuotation = useCallback(() => {
    const quotationData = editingQuotation || newQuotation;
    
    // Validar datos básicos
    const errors = validateQuotationForm(quotationData);
    if (errors.length > 0) {
      showNotification(errors[0], 'error');
      return;
    }
    
    // Calcular totales antes de guardar
    const totals = calculateQuotationTotals(quotationData.items, quotationData.discount);
    
    if (editingQuotation) {
      // Actualizar cotización existente
      setData(prev => ({
        ...prev,
        quotations: prev.quotations.map(q => 
          q.id === editingQuotation.id 
            ? { 
                ...quotationData, 
                total: totals.total, 
                lastModified: new Date().toISOString() 
              }
            : q
        )
      }));
      showNotification('Cotización actualizada exitosamente', 'success');
    } else {
      // Crear nueva cotización
      const newId = Math.max(...(data?.quotations?.map(q => q.id) || [0]), 0) + 1;
      const quotationNumber = `COT-${new Date().getFullYear()}-${String(newId).padStart(3, '0')}`;
      
      setData(prev => ({
        ...prev,
        quotations: [...prev.quotations, {
          ...quotationData,
          id: newId,
          number: quotationNumber,
          status: 'Pendiente',
          total: totals.total,
          createdBy: currentUser?.email || 'Sistema',
          lastModified: new Date().toISOString()
        }]
      }));
      showNotification('Cotización creada exitosamente', 'success');
    }
    
    cancelEdit();
  }, [editingQuotation, newQuotation, data?.quotations, currentUser, cancelEdit]);

  // FUNCIÓN PARA GUARDAR CLIENTE
  const saveClient = useCallback(() => {
    const clientData = editingClient || newClient;
    
    // Validar datos del cliente
    const errors = validateClientForm(clientData, !!editingClient, data?.clients || []);
    if (errors.length > 0) {
      showNotification(errors[0], 'error');
      return;
    }
    
    if (editingClient) {
      // Actualizar cliente existente
      setData(prev => ({
        ...prev,
        clients: prev.clients.map(c => 
          c.id === editingClient.id ? { ...clientData, id: editingClient.id } : c
        )
      }));
      showNotification('Cliente actualizado exitosamente', 'success');
    } else {
      // Crear nuevo cliente
      const newId = Math.max(...(data?.clients?.map(c => c.id) || [0]), 0) + 1;
      setData(prev => ({
        ...prev,
        clients: [...prev.clients, { 
          ...clientData, 
          id: newId,
          createdAt: new Date().toISOString().split('T')[0]
        }]
      }));
      showNotification('Cliente creado exitosamente', 'success');
    }
    
    cancelEdit();
  }, [editingClient, newClient, data?.clients, cancelEdit]);

  // FUNCIÓN PARA GUARDAR SERVICIO
  const saveService = useCallback(() => {
    const serviceData = editingService || newService;
    
    // Validar datos del servicio
    const errors = validateServiceForm(serviceData, !!editingService, data?.services || []);
    if (errors.length > 0) {
      showNotification(errors[0], 'error');
      return;
    }
    
    if (editingService) {
      // Actualizar servicio existente
      setData(prev => ({
        ...prev,
        services: prev.services.map(s => 
          s.id === editingService.id ? { 
            ...serviceData, 
            id: editingService.id,
            price: Number(serviceData.price) 
          } : s
        )
      }));
      showNotification('Servicio actualizado exitosamente', 'success');
    } else {
      // Crear nuevo servicio
      const newId = Math.max(...(data?.services?.map(s => s.id) || [0]), 0) + 1;
      setData(prev => ({
        ...prev,
        services: [...prev.services, { 
          ...serviceData, 
          id: newId,
          price: Number(serviceData.price)
        }]
      }));
      showNotification('Servicio creado exitosamente', 'success');
    }
    
    cancelEdit();
  }, [editingService, newService, data?.services, cancelEdit]);

  // FUNCIÓN PARA GUARDAR DATOS DE EMPRESA
  const saveCompany = useCallback((companyData) => {
    // Validar datos de empresa
    if (!companyData.razonSocial || !companyData.rut) {
      showNotification('Razón Social y RUT son campos obligatorios', 'error');
      return;
    }
    
    if (!validateRut(companyData.rut)) {
      showNotification('RUT de empresa inválido', 'error');
      return;
    }
    
    if (companyData.email && !validateEmail(companyData.email)) {
      showNotification('Email de empresa inválido', 'error');
      return;
    }
    
    setData(prev => ({
      ...prev,
      company: { ...prev.company, ...companyData }
    }));
    
    showNotification('Datos de empresa actualizados exitosamente', 'success');
    cancelEdit();
  }, [cancelEdit]);

  // FUNCIONES DE GESTIÓN DE COTIZACIONES
  const changeQuotationStatus = useCallback((quotationId, newStatus) => {
    setData(prev => ({
      ...prev,
      quotations: prev.quotations.map(q => 
        q.id === quotationId ? { 
          ...q, 
          status: newStatus, 
          lastModified: new Date().toISOString() 
        } : q
      )
    }));
    
    const statusMessages = {
      'Pendiente': 'Cotización marcada como Pendiente',
      'Facturada': 'Cotización facturada exitosamente',
      'Rechazada': 'Cotización marcada como Rechazada',
      'Cancelada': 'Cotización cancelada'
    };
    
    const message = statusMessages[newStatus] || `Estado cambiado a ${newStatus}`;
    showNotification(message, 'success');
  }, []);

  // FUNCIONES DE MANEJO DE ÍTEMS DE COTIZACIÓN
  const addQuotationItem = useCallback(() => {
    const newItem = { 
      id: Date.now(), 
      quantity: 1, 
      service: '', 
      unitPrice: 0, 
      total: 0 
    };
    
    if (editingQuotation) {
      setEditingQuotation(prev => ({ 
        ...prev, 
        items: [...(prev.items || []), newItem] 
      }));
    } else {
      setNewQuotation(prev => ({ 
        ...prev, 
        items: [...(prev.items || []), newItem] 
      }));
    }
  }, [editingQuotation]);

  const updateQuotationItem = useCallback((index, field, value) => {
    const updateFunction = (prev) => {
      const items = [...(prev.items || [])];
      if (!items[index]) return prev;
      
      items[index] = { ...items[index], [field]: value };
      
      // Si se cambia el servicio, actualizar precio unitario
      if (field === 'service' && data?.services) {
        const service = data.services.find(s => s.name === value);
        items[index].unitPrice = service ? service.price : 0;
      }
      
      // Recalcular total del ítem
      items[index].total = (items[index].quantity || 0) * (items[index].unitPrice || 0);
      
      return { ...prev, items };
    };
    
    if (editingQuotation) {
      setEditingQuotation(updateFunction);
    } else {
      setNewQuotation(updateFunction);
    }
  }, [editingQuotation, data?.services]);

  const removeQuotationItem = useCallback((index) => {
    if (editingQuotation) {
      setEditingQuotation(prev => ({
        ...prev,
        items: (prev.items || []).filter((_, i) => i !== index)
      }));
    } else {
      setNewQuotation(prev => ({
        ...prev,
        items: (prev.items || []).filter((_, i) => i !== index)
      }));
    }
  }, [editingQuotation]);

  // FUNCIÓN PARA DUPLICAR COTIZACIÓN
  const duplicateQuotation = useCallback((quotation) => {
    const newId = Math.max(...(data?.quotations?.map(q => q.id) || [0]), 0) + 1;
    const quotationNumber = `COT-${new Date().getFullYear()}-${String(newId).padStart(3, '0')}`;
    
    const duplicatedQuotation = {
      ...quotation,
      id: newId,
      number: quotationNumber,
      date: new Date().toISOString().split('T')[0],
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'Pendiente',
      createdBy: currentUser?.email || 'Sistema',
      lastModified: new Date().toISOString(),
      items: quotation.items.map(item => ({ ...item, id: Date.now() + Math.random() }))
    };
    
    setData(prev => ({
      ...prev,
      quotations: [...prev.quotations, duplicatedQuotation]
    }));
    
    showNotification('Cotización duplicada exitosamente', 'success');
  }, [data?.quotations, currentUser]);

  // FUNCIÓN PARA OBTENER ESTADÍSTICAS
  const getStatistics = useCallback(() => {
    if (!data?.quotations) return null;
    
    const totalQuotations = data.quotations.length;
    const pendingQuotations = data.quotations.filter(q => q.status === 'Pendiente').length;
    const invoicedQuotations = data.quotations.filter(q => q.status === 'Facturada').length;
    const totalRevenue = data.quotations
      .filter(q => q.status === 'Facturada')
      .reduce((sum, q) => sum + (q.total || 0), 0);
    const averageQuotationValue = totalQuotations > 0 
      ? data.quotations.reduce((sum, q) => sum + (q.total || 0), 0) / totalQuotations 
      : 0;
    
    return {
      totalQuotations,
      pendingQuotations,
      invoicedQuotations,
      totalRevenue,
      averageQuotationValue,
      totalClients: data?.clients?.length || 0,
      activeServices: data?.services?.filter(s => s.active)?.length || 0
    };
  }, [data]);

  // Funciones auxiliares necesarias (placeholder para las que vienen de parte 2)
  const showNotification = useCallback((message, type) => {
    console.log(`${type.toUpperCase()}: ${message}`);
  }, []);

  const validateQuotationForm = useCallback((quotationData) => {
    return [];
  }, []);

  const validateClientForm = useCallback((clientData, isEditing, existingClients) => {
    return [];
  }, []);

  const validateServiceForm = useCallback((serviceData, isEditing, existingServices) => {
    return [];
  }, []);

  const validateRut = useCallback((rut) => {
    return true;
  }, []);

  const validateEmail = useCallback((email) => {
    return true;
  }, []);

  const calculateQuotationTotals = useCallback((items, discount) => {
    return { total: 0, subtotal: 0, iva: 0, totalBruto: 0, discountAmount: 0 };
  }, []);

  return (


// PARTE 4 - FUNCIONES DE EXPORTACIÓN, WHATSAPP Y AUTENTICACIÓN

// FUNCIONES DE EXPORTACIÓN Y ENVÍO POR WHATSAPP
  const sendViaWhatsApp = useCallback((quotation) => {
    if (!quotation || !data?.clients) {
      showNotification('Error al preparar la cotización para WhatsApp', 'error');
      return;
    }

    const client = data.clients.find(c => c.empresa === quotation.client);
    const totals = calculateQuotationTotals(quotation.items, quotation.discount);
    
    const message = `
*COTIZACIÓN ${quotation.number}* 📋
▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪
📅 *Fecha:* ${quotation.date}
⏰ *Válida hasta:* ${quotation.validUntil}
🏢 *Cliente:* ${quotation.client}
💰 *Total:* $${totals.total.toLocaleString()}
📊 *Estado:* ${quotation.status}
🎯 *Prioridad:* ${quotation.priority}

*🛠️ SERVICIOS:*
${quotation.items.map(item => 
  `• ${item.quantity}x ${item.service}\n  💵 $${item.total.toLocaleString()}`
).join('\n')}

*💳 RESUMEN FINANCIERO:*
• Subtotal: $${totals.subtotal.toLocaleString()}
• IVA (19%): $${totals.iva.toLocaleString()}
${totals.discountAmount > 0 ? `• Descuento: -$${totals.discountAmount.toLocaleString()}` : ''}
• *TOTAL: $${totals.total.toLocaleString()}*

▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪
🏢 *${data.company?.razonSocial || 'Mi Empresa'}*
📞 ${data.company?.telefono || 'Sin teléfono'}
📧 ${data.company?.email || 'Sin email'}
📍 ${data.company?.direccion || 'Sin dirección'}

💬 _Contáctanos para más información_
⚡ _Respuesta rápida garantizada_

_"Documento válido sólo como Cotización"_
    `.trim();

    const phoneNumber = client?.telefono?.replace(/[^\d]/g, '') || '';
    const encodedMessage = encodeURIComponent(message);
    
    let whatsappUrl;
    if (phoneNumber && phoneNumber.length >= 8) {
      const cleanPhone = phoneNumber.startsWith('56') ? phoneNumber : `56${phoneNumber.slice(-8)}`;
      whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
    } else {
      whatsappUrl = `https://web.whatsapp.com/send?text=${encodedMessage}`;
    }
    
    window.open(whatsappUrl, '_blank');
    showNotification('Abriendo WhatsApp...', 'info');
  }, [data?.clients, data?.company]);

  // FUNCIÓN DE EXPORTACIÓN A PDF
  const exportToPDF = useCallback((quotation) => {
    if (!quotation || !data?.clients || !data?.company) {
      showNotification('Error al preparar la cotización para PDF', 'error');
      return;
    }

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
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">$${item.unitPrice.toLocaleString()}</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">$${item.total.toLocaleString()}</td>
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
              <span>$${totals.subtotal.toLocaleString()}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span>IVA (19%):</span>
              <span>$${totals.iva.toLocaleString()}</span>
            </div>
            ${totals.discountAmount > 0 ? `
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px; color: red;">
                <span>Descuento (${quotation.discount}%):</span>
                <span>-$${totals.discountAmount.toLocaleString()}</span>
              </div>
            ` : ''}
            <div style="display: flex; justify-content: space-between; border-top: 2px solid #333; padding-top: 8px; font-weight: bold; font-size: 18px;">
              <span>TOTAL FINAL:</span>
              <span>$${totals.total.toLocaleString()}</span>
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
    if (printWindow) {
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
    } else {
      showNotification('Error al abrir ventana de impresión', 'error');
    }
  }, [data?.clients, data?.company]);

  // FUNCIÓN DE BACKUP COMPLETO
  const generateBackup = useCallback(() => {
    if (!data) {
      showNotification('No hay datos para respaldar', 'error');
      return;
    }

    const backupData = {
      company: data.company,
      clients: data.clients,
      services: data.services,
      quotations: data.quotations,
      users: data.users,
      generatedAt: new Date().toISOString(),
      version: '1.0',
      appVersion: 'CotizApp v1.0'
    };

    try {
      const blob = new Blob([JSON.stringify(backupData, null, 2)], { 
        type: 'application/json' 
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `backup-cotizapp-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      showNotification('Backup generado exitosamente', 'success');
    } catch (error) {
      showNotification('Error al generar backup', 'error');
    }
  }, [data]);

  // FUNCIÓN PARA RESTAURAR BACKUP
  const restoreBackup = useCallback((event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const backupData = JSON.parse(e.target.result);
        
        // Validar estructura del backup
        if (!backupData.version || !backupData.company) {
          throw new Error('Archivo de backup inválido');
        }

        // Confirmar restauración
        if (window.confirm('¿Estás seguro de que deseas restaurar este backup? Se perderán los datos actuales.')) {
          setData({
            company: backupData.company,
            clients: backupData.clients || [],
            services: backupData.services || [],
            quotations: backupData.quotations || [],
            users: backupData.users || []
          });
          
          showNotification('Backup restaurado exitosamente', 'success');
        }
      } catch (error) {
        showNotification('Error al restaurar backup: Archivo inválido', 'error');
      }
    };
    
    reader.readAsText(file);
    
    // Limpiar el input
    event.target.value = '';
  }, []);

  // FUNCIONES DE AUTENTICACIÓN
  const handleAuth = useCallback(async (e) => {
    e.preventDefault();
    
    try {
      if (authMode === 'login') {
        if (!validateEmail(loginForm.email)) {
          showNotification('Por favor ingresa un email válido', 'error');
          return;
        }
        
        if (!loginForm.password) {
          showNotification('Por favor ingresa tu contraseña', 'error');
          return;
        }
        
        // Simular autenticación
        const result = await mockFirebaseAuth.signInWithEmailAndPassword(
          loginForm.email, 
          loginForm.password
        );
        
        setCurrentUser(result.user);
        setCurrentView('dashboard');
        showNotification(`¡Bienvenido ${result.user.displayName}!`, 'success');
        
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
        
        if (!registerForm.name.trim()) {
          showNotification('Por favor ingresa tu nombre', 'error');
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
      showNotification(error.message || 'Error en autenticación', 'error');
    }
  }, [authMode, loginForm, registerForm, forgotForm]);

  // FUNCIÓN DE LOGOUT
  const handleLogout = useCallback(async () => {
    try {
      await mockFirebaseAuth.signOut();
      setCurrentUser(null);
      setCurrentView('login');
      
      // Limpiar formularios
      setLoginForm({ email: '', password: '' });
      setRegisterForm({ email: '', password: '', confirmPassword: '', name: '' });
      setForgotForm({ email: '' });
      
      showNotification('Sesión cerrada exitosamente', 'info');
    } catch (error) {
      showNotification('Error al cerrar sesión', 'error');
    }
  }, []);

  // FUNCIÓN PARA MANEJAR CARGA DE LOGO DE EMPRESA
  const handleLogoUpload = useCallback((e, setEditingCompany, setNewCompanyLogo) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validar tipo de archivo
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      showNotification('Solo se permiten archivos JPG, PNG o GIF', 'error');
      return;
    }

    // Validar tamaño (5MB máximo)
    if (file.size > 5 * 1024 * 1024) {
      showNotification('El archivo es demasiado grande (máximo 5MB)', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const logoData = event.target.result;
      setNewCompanyLogo(logoData);
      
      if (setEditingCompany) {
        setEditingCompany(prev => ({ ...prev, logo: logoData }));
      }
      
      showNotification('Logo cargado exitosamente', 'success');
    };
    
    reader.readAsDataURL(file);
  }, []);

  // Funciones auxiliares necesarias (placeholder para las que vienen de partes anteriores)
  const showNotification = useCallback((message, type) => {
    console.log(`${type.toUpperCase()}: ${message}`);
  }, []);

  const validateEmail = useCallback((email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }, []);

  const calculateQuotationTotals = useCallback((items, discount) => {
    const subtotal = items.reduce((sum, item) => sum + (item.total || 0), 0);
    const iva = subtotal * 0.19;
    const totalBruto = subtotal + iva;
    const discountAmount = totalBruto * (discount / 100);
    const total = totalBruto - discountAmount;
    return { subtotal, iva, totalBruto, discountAmount, total };
  }, []);

  // Mock Firebase Auth (placeholder)
  const mockFirebaseAuth = useMemo(() => ({
    signInWithEmailAndPassword: async (email, password) => {
      const validUsers = [
        { uid: '1', email: 'admin@empresa.com', displayName: 'Administrador', role: 'admin' },
        { uid: '2', email: 'usuario@empresa.com', displayName: 'Usuario Regular', role: 'user' }
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
    signOut: async () => Promise.resolve(),
    sendPasswordResetEmail: async (email) => Promise.resolve()
  }), []);

  return (


// PARTE 5 - COMPONENTES DE INTERFAZ PRINCIPALES

// COMPONENTE DE VISTA DE AUTENTICACIÓN
  const AuthView = useCallback(() => (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <Building2 className="mx-auto h-12 w-12 text-blue-600" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Sistema de Cotizaciones
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Gestiona tus cotizaciones de manera eficiente
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          {authMode === 'login' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="tu@email.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contraseña
                </label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                />
              </div>
              
              <button
                onClick={handleAuth}
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Iniciar Sesión
              </button>
            </div>
          )}

          {authMode === 'register' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  value={registerForm.name}
                  onChange={(e) => setRegisterForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Tu nombre"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={registerForm.email}
                  onChange={(e) => setRegisterForm(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="tu@email.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contraseña
                </label>
                <input
                  type="password"
                  value={registerForm.password}
                  onChange={(e) => setRegisterForm(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirmar Contraseña
                </label>
                <input
                  type="password"
                  value={registerForm.confirmPassword}
                  onChange={(e) => setRegisterForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                />
              </div>
              
              <button
                onClick={handleAuth}
                className="w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Registrarse
              </button>
            </div>
          )}

          {authMode === 'forgot' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={forgotForm.email}
                  onChange={(e) => setForgotForm(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="tu@email.com"
                />
              </div>
              
              <button
                onClick={handleAuth}
                className="w-full py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Enviar Email de Recuperación
              </button>
            </div>
          )}

          <div className="mt-4 text-center space-y-2">
            {authMode === 'login' && (
              <>
                <button
                  onClick={() => setAuthMode('register')}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  ¿No tienes cuenta? Regístrate
                </button>
                <br />
                <button
                  onClick={() => setAuthMode('forgot')}
                  className="text-sm text-gray-600 hover:text-gray-800"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </>
            )}
            
            {authMode === 'register' && (
              <button
                onClick={() => setAuthMode('login')}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                ¿Ya tienes cuenta? Inicia sesión
              </button>
            )}
            
            {authMode === 'forgot' && (
              <button
                onClick={() => setAuthMode('login')}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Volver al inicio de sesión
              </button>
            )}
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-4">
          <div className="text-xs text-blue-700 space-y-1">
            <p className="font-semibold">Usuarios de prueba:</p>
            <p>admin@empresa.com / 123456 (Administrador)</p>
            <p>usuario@empresa.com / 123456 (Usuario)</p>
          </div>
        </div>
      </div>
    </div>
  ), [authMode, loginForm, registerForm, forgotForm]);

  // COMPONENTE SIDEBAR
  const Sidebar = useCallback(() => (
    <div className="w-64 bg-white shadow-lg h-screen flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <Building2 className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-lg font-bold text-gray-800">CotizApp</h1>
            <p className="text-xs text-gray-500">Sistema de Gestión</p>
          </div>
        </div>
      </div>
      
      <nav className="mt-6 flex-1">
        <div className="px-3 space-y-1">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
            { id: 'quotations', label: 'Cotizaciones', icon: FileText },
            { id: 'clients', label: 'Clientes', icon: Users },
            { id: 'services', label: 'Servicios', icon: Settings },
            { id: 'company', label: 'Empresa', icon: Building2 }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                currentView === item.id
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <item.icon className="w-4 h-4 mr-3" />
              {item.label}
            </button>
          ))}
        </div>
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-700 truncate">
              {currentUser?.displayName || 'Usuario'}
            </p>
            <p className="text-xs text-gray-500 truncate">{currentUser?.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4 mr-3" />
          Cerrar Sesión
        </button>
      </div>
    </div>
  ), [currentView, currentUser]);

  // COMPONENTE DASHBOARD
  const DashboardView = useCallback(() => {
    const stats = useMemo(() => {
      const quotations = data?.quotations || [];
      const clients = data?.clients || [];
      
      return {
        totalQuotations: quotations.length,
        pendingQuotations: quotations.filter(q => q.status === 'Pendiente').length,
        invoicedQuotations: quotations.filter(q => q.status === 'Facturada').length,
        totalRevenue: quotations
          .filter(q => q.status === 'Facturada')
          .reduce((sum, q) => sum + (q.total || 0), 0),
        totalClients: clients.length
      };
    }, [data]);

    return (
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600">Resumen de tu actividad comercial</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Cotizaciones</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalQuotations}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pendientes</p>
                <p className="text-2xl font-bold text-orange-600">{stats.pendingQuotations}</p>
              </div>
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Facturadas</p>
                <p className="text-2xl font-bold text-green-600">{stats.invoicedQuotations}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Clientes</p>
                <p className="text-2xl font-bold text-purple-600">{stats.totalClients}</p>
              </div>
              <Users className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Cotizaciones Recientes</h3>
            <div className="space-y-3">
              {(data?.quotations || []).slice(0, 5).map(quotation => (
                <div key={quotation.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{quotation.number}</p>
                    <p className="text-sm text-gray-600">{quotation.client}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      ${(quotation.total || 0).toLocaleString()}
                    </p>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      quotation.status === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' :
                      quotation.status === 'Facturada' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {quotation.status}
                    </span>
                  </div>
                </div>
              ))}
              
              {(!data?.quotations || data.quotations.length === 0) && (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No hay cotizaciones aún</p>
                  <p className="text-sm">Crea tu primera cotización</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Acciones Rápidas</h3>
            <div className="space-y-3">
              <button
                onClick={() => {
                  setModalType('quotation');
                  setShowModal(true);
                }}
                className="w-full flex items-center justify-center space-x-2 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Nueva Cotización</span>
              </button>
              
              <button
                onClick={() => {
                  setModalType('client');
                  setShowModal(true);
                }}
                className="w-full flex items-center justify-center space-x-2 p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Nuevo Cliente</span>
              </button>
              
              <button
                onClick={() => {
                  setModalType('service');
                  setShowModal(true);
                }}
                className="w-full flex items-center justify-center space-x-2 p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Nuevo Servicio</span>
              </button>
              
              <button
                onClick={generateBackup}
                className="w-full flex items-center justify-center space-x-2 p-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Descargar Backup</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Ingresos Totales</h3>
          <p className="text-3xl font-bold text-blue-900">
            ${stats.totalRevenue.toLocaleString()}
          </p>
          <p className="text-sm text-blue-700 mt-1">
            Generados por {stats.invoicedQuotations} cotizaciones facturadas
          </p>
        </div>
      </div>
    );
  }, [data]);

  // COMPONENTE DE NOTIFICACIONES
  const NotificationContainer = useCallback(() => (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map(notification => (
        <div
          key={notification.id}
          className={`p-4 rounded-lg shadow-lg transform transition-all duration-300 ${
            notification.type === 'success' ? 'bg-green-100 border-green-400 text-green-700' :
            notification.type === 'error' ? 'bg-red-100 border-red-400 text-red-700' :
            notification.type === 'info' ? 'bg-blue-100 border-blue-400 text-blue-700' :
            'bg-yellow-100 border-yellow-400 text-yellow-700'
          } border-l-4 max-w-sm`}
        >
          <div className="flex items-center">
            {notification.type === 'success' && <CheckCircle className="w-5 h-5 mr-2" />}
            {notification.type === 'error' && <AlertCircle className="w-5 h-5 mr-2" />}
            {notification.type === 'info' && <Info className="w-5 h-5 mr-2" />}
            {notification.type === 'warning' && <AlertCircle className="w-5 h-5 mr-2" />}
            <span className="text-sm font-medium">{notification.message}</span>
          </div>
        </div>
      ))}
    </div>
  ), [notifications]);

  // Funciones auxiliares necesarias (placeholder)
  const handleAuth = useCallback(() => {
    console.log('Auth handled');
  }, []);

  const handleLogout = useCallback(() => {
    console.log('Logout handled');
  }, []);

  const generateBackup = useCallback(() => {
    console.log('Backup generated');
  }, []);

  return (


// PARTE 6 - VISTAS PRINCIPALES DEL SISTEMA

// VISTA DE COTIZACIONES
  const QuotationsView = useCallback(() => {
    const getFilteredQuotations = () => {
      if (!data?.quotations) return [];
      
      return data.quotations.filter(quotation => {
        const matchesSearch = !searchTerm || 
          quotation.number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          quotation.client?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilters = 
          (!filters.status || quotation.status === filters.status) &&
          (!filters.priority || quotation.priority === filters.priority) &&
          (!filters.client || quotation.client === filters.client) &&
          (!filters.dateFrom || quotation.date >= filters.dateFrom) &&
          (!filters.dateTo || quotation.date <= filters.dateTo) &&
          (!filters.minAmount || quotation.total >= Number(filters.minAmount)) &&
          (!filters.maxAmount || quotation.total <= Number(filters.maxAmount));

        return matchesSearch && matchesFilters;
      });
    };

    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Cotizaciones</h1>
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

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Buscar cotizaciones por número o cliente..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center space-x-2 px-4 py-2 border rounded-lg transition-colors ${
                  showFilters 
                    ? 'bg-blue-50 border-blue-300 text-blue-700' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Filter className="w-4 h-4" />
                <span>Filtros</span>
              </button>
            </div>

            {showFilters && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Todos los estados</option>
                    <option value="Pendiente">Pendiente</option>
                    <option value="Facturada">Facturada</option>
                    <option value="Rechazada">Rechazada</option>
                    <option value="Cancelada">Cancelada</option>
                  </select>

                  <select
                    value={filters.priority}
                    onChange={(e) => setFilters(prev => ({ ...prev, priority: e.target.value }))}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Todas las prioridades</option>
                    <option value="Alta">Alta</option>
                    <option value="Media">Media</option>
                    <option value="Baja">Baja</option>
                  </select>

                  <select
                    value={filters.client}
                    onChange={(e) => setFilters(prev => ({ ...prev, client: e.target.value }))}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Todos los clientes</option>
                    {(data?.clients || []).map(client => (
                      <option key={client.id} value={client.empresa}>
                        {client.empresa}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-end mt-3">
                  <button
                    onClick={() => {
                      setFilters({
                        dateFrom: '',
                        dateTo: '',
                        status: '',
                        priority: '',
                        minAmount: '',
                        maxAmount: '',
                        client: '',
                        createdBy: ''
                      });
                      setSearchTerm('');
                      setShowFilters(false);
                    }}
                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                  >
                    Limpiar filtros
                  </button>
                </div>
              </div>
            )}
          </div>

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
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {getFilteredQuotations().map(quotation => (
                  <tr key={quotation.id} className="hover:bg-gray-50 transition-colors border-b border-gray-100">
                    <td className="py-4 px-6 font-medium text-gray-900">{quotation.number}</td>
                    <td className="py-4 px-6 text-gray-700">{quotation.client}</td>
                    <td className="py-4 px-6 text-gray-600">{quotation.date}</td>
                    <td className="py-4 px-6 font-semibold text-gray-900">
                      ${(quotation.total || 0).toLocaleString()}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        quotation.status === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' :
                        quotation.status === 'Facturada' ? 'bg-green-100 text-green-800' :
                        quotation.status === 'Rechazada' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {quotation.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        quotation.priority === 'Alta' ? 'bg-red-100 text-red-800' :
                        quotation.priority === 'Media' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {quotation.priority}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex space-x-1">
                        <button 
                          onClick={() => startEdit('quotation', quotation)}
                          className="p-2 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-100 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => exportToPDF(quotation)}
                          className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-lg transition-colors"
                          title="Exportar PDF"
                        >
                          <FileText className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => sendViaWhatsApp(quotation)}
                          className="p-2 text-green-600 hover:text-green-800 hover:bg-green-100 rounded-lg transition-colors"
                          title="WhatsApp"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => deleteItem('quotations', quotation.id)}
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
                <p className="text-lg mb-2">No se encontraron cotizaciones</p>
                <p className="text-sm">
                  {searchTerm || Object.values(filters).some(f => f) 
                    ? 'Prueba ajustando los filtros de búsqueda' 
                    : 'Crea tu primera cotización para empezar'
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }, [data, searchTerm, showFilters, filters]);

  // VISTA DE CLIENTES
  const ClientsView = useCallback(() => {
    const getFilteredClients = () => {
      if (!data?.clients) return [];
      
      if (!searchTerm) return data.clients;
      
      const searchLower = searchTerm.toLowerCase();
      return data.clients.filter(client =>
        client.empresa?.toLowerCase().includes(searchLower) ||
        client.encargado?.toLowerCase().includes(searchLower) ||
        client.rut?.includes(searchTerm) ||
        client.email?.toLowerCase().includes(searchLower) ||
        client.ciudad?.toLowerCase().includes(searchLower)
      );
    };

    return (
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
                placeholder="Buscar clientes por empresa, RUT, encargado, email o ciudad..."
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
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Teléfono</th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {getFilteredClients().map(client => (
                  <tr key={client.id} className="hover:bg-gray-50 transition-colors border-b border-gray-100">
                    <td className="py-4 px-6 font-medium text-gray-900">{client.rut}</td>
                    <td className="py-4 px-6 text-gray-900 font-medium">{client.empresa}</td>
                    <td className="py-4 px-6 text-gray-700">{client.encargado || '-'}</td>
                    <td className="py-4 px-6 text-gray-600">{client.ciudad || '-'}</td>
                    <td className="py-4 px-6 text-gray-600">{client.email || '-'}</td>
                    <td className="py-4 px-6 text-gray-600">{client.telefono || '-'}</td>
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

            {getFilteredClients().length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <Users className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p className="text-lg mb-2">No se encontraron clientes</p>
                <p className="text-sm">
                  {searchTerm 
                    ? 'Prueba con otros términos de búsqueda' 
                    : 'Agrega tu primer cliente para empezar'
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }, [data, searchTerm]);

  // VISTA DE SERVICIOS
  const ServicesView = useCallback(() => {
    const getFilteredServices = () => {
      if (!data?.services) return [];
      
      if (!searchTerm) return data.services;
      
      const searchLower = searchTerm.toLowerCase();
      return data.services.filter(service =>
        service.name?.toLowerCase().includes(searchLower) ||
        service.category?.toLowerCase().includes(searchLower)
      );
    };

    return (
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
                placeholder="Buscar servicios por nombre o categoría..."
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
                    <td className="py-4 px-6 text-gray-700 font-semibold">
                      ${(service.price || 0).toLocaleString()}
                    </td>
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
                          onClick={() => toggleServiceStatus(service.id)}
                          className={`p-2 rounded-lg transition-colors ${
                            service.active 
                              ? 'text-red-600 hover:text-red-800 hover:bg-red-100' 
                              : 'text-green-600 hover:text-green-800 hover:bg-green-100'
                          }`}
                          title={service.active ? 'Desactivar' : 'Activar'}
                        >
                          {service.active ? <XCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
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

            {getFilteredServices().length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <Settings className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p className="text-lg mb-2">No se encontraron servicios</p>
                <p className="text-sm">
                  {searchTerm 
                    ? 'Prueba con otros términos de búsqueda' 
                    : 'Agrega tu primer servicio para empezar'
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }, [data, searchTerm]);

  // Funciones auxiliares necesarias (placeholder)
  const startEdit = useCallback((type, item) => {
    console.log(`Editing ${type}:`, item);
  }, []);

  const deleteItem = useCallback((type, id) => {
    console.log(`Deleting ${type} with id:`, id);
  }, []);

  const exportToPDF = useCallback((quotation) => {
    console.log('Exporting to PDF:', quotation);
  }, []);

  const sendViaWhatsApp = useCallback((quotation) => {
    console.log('Sending via WhatsApp:', quotation);
  }, []);

  const toggleServiceStatus = useCallback((serviceId) => {
    console.log('Toggling service status:', serviceId);
  }, []);

  return (



// PARTE 7 - VISTA DE EMPRESA Y MODAL DE COTIZACIONES

// VISTA DE CONFIGURACIÓN DE EMPRESA
  const CompanySettingsView = useCallback(() => {
    const [editingData, setEditingData] = useState(data?.company || {});
    const [logoFile, setLogoFile] = useState(null);

    const handleSave = () => {
      if (!editingData.razonSocial || !editingData.rut) {
        showNotification('Razón Social y RUT son campos obligatorios', 'error');
        return;
      }
      
      if (!validateRut(editingData.rut)) {
        showNotification('RUT de empresa inválido', 'error');
        return;
      }
      
      if (editingData.email && !validateEmail(editingData.email)) {
        showNotification('Email de empresa inválido', 'error');
        return;
      }
      
      setData(prev => ({
        ...prev,
        company: { ...prev.company, ...editingData, logo: logoFile || editingData.logo }
      }));
      
      showNotification('Datos de empresa actualizados exitosamente', 'success');
    };

    const handleReset = () => {
      setEditingData(data?.company || {});
      setLogoFile(null);
      showNotification('Cambios descartados', 'info');
    };

    const handleLogoUpload = (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        showNotification('Solo se permiten archivos JPG, PNG o GIF', 'error');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        showNotification('El archivo es demasiado grande (máximo 5MB)', 'error');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        setLogoFile(event.target.result);
        setEditingData(prev => ({ ...prev, logo: event.target.result }));
        showNotification('Logo cargado exitosamente', 'success');
      };
      
      reader.readAsDataURL(file);
    };

    return (
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Configuración de Empresa</h1>
          <p className="text-gray-600">Gestiona los datos y configuración de tu empresa</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Información Básica</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Razón Social *</label>
                <input
                  type="text"
                  value={editingData.razonSocial || ''}
                  onChange={(e) => setEditingData(prev => ({ ...prev, razonSocial: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nombre de la empresa"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">RUT *</label>
                <input
                  type="text"
                  value={editingData.rut || ''}
                  onChange={(e) => setEditingData(prev => ({ ...prev, rut: formatRut(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="12.345.678-9"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Dirección</label>
                <input
                  type="text"
                  value={editingData.direccion || ''}
                  onChange={(e) => setEditingData(prev => ({ ...prev, direccion: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Dirección completa"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ciudad</label>
                  <input
                    type="text"
                    value={editingData.ciudad || ''}
                    onChange={(e) => setEditingData(prev => ({ ...prev, ciudad: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ciudad"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Región</label>
                  <select
                    value={editingData.region || ''}
                    onChange={(e) => setEditingData(prev => ({ ...prev, region: e.target.value }))}
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
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Contacto y Configuración</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                <input
                  type="tel"
                  value={editingData.telefono || ''}
                  onChange={(e) => setEditingData(prev => ({ ...prev, telefono: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="+56 32 123 4567"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={editingData.email || ''}
                  onChange={(e) => setEditingData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="contacto@empresa.cl"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tema de Color</label>
                <select
                  value={editingData.theme || 'blue'}
                  onChange={(e) => setEditingData(prev => ({ ...prev, theme: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="blue">Azul</option>
                  <option value="green">Verde</option>
                  <option value="purple">Morado</option>
                  <option value="red">Rojo</option>
                  <option value="gray">Gris</option>
                </select>
              </div>
                            
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Logo de la Empresa</label>
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/gif"
                  onChange={handleLogoUpload}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">Formatos: JPG, PNG, GIF (máx. 5MB)</p>
                
                {(logoFile || editingData.logo) && (
                  <div className="mt-3 flex items-center space-x-3">
                    <img 
                      src={logoFile || editingData.logo} 
                      alt="Logo preview" 
                      className="w-20 h-20 object-contain border border-gray-300 rounded-lg bg-gray-50"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setLogoFile(null);
                        setEditingData(prev => ({ ...prev, logo: null }));
                      }}
                      className="px-3 py-1 text-sm text-red-600 hover:text-red-800 border border-red-300 rounded-lg hover:bg-red-50"
                    >
                      Eliminar
                    </button>
                  </div>
                )}
              </div>             
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Moneda</label>
                <select
                  value={editingData.currency || 'CLP'}
                  onChange={(e) => setEditingData(prev => ({ ...prev, currency: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="CLP">Peso Chileno (CLP)</option>
                  <option value="USD">Dólar Americano (USD)</option>
                  <option value="EUR">Euro (EUR)</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              onClick={handleReset}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Descartar Cambios
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Guardar Cambios
            </button>
          </div>
        </div>
      </div>
    );
  }, [data]);

  // MODAL PARA COTIZACIONES
  const QuotationModal = useCallback(() => {
    const isEditing = editingQuotation !== null;
    const quotationData = isEditing ? editingQuotation : newQuotation;
    const totals = calculateQuotationTotals(quotationData?.items || [], quotationData?.discount || 0);
    
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
            {/* Información básica de la cotización */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cliente *</label>
                <select
                  value={quotationData?.client || ''}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (isEditing) {
                      setEditingQuotation(prev => ({ ...prev, client: value }));
                    } else {
                      setNewQuotation(prev => ({ ...prev, client: value }));
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seleccionar cliente</option>
                  {(data?.clients || []).map(client => (
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
                  value={quotationData?.date || new Date().toISOString().split('T')[0]}
                  onChange={(e) => {
                    const value = e.target.value;
                    const newValidUntil = calculateValidUntilDate(value);
                    if (isEditing) {
                      setEditingQuotation(prev => ({ ...prev, date: value, validUntil: newValidUntil }));
                    } else {
                      setNewQuotation(prev => ({ ...prev, date: value, validUntil: newValidUntil }));
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Válida Hasta</label>
                <input
                  type="date"
                  value={quotationData?.validUntil || ''}
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

            {/* Prioridad y descuento */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Prioridad</label>
                <select
                  value={quotationData?.priority || 'Media'}
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
                  value={quotationData?.discount || 0}
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

            {/* Notas */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Notas</label>
              <textarea
                value={quotationData?.notes || ''}
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

            {/* Sección de servicios */}
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
                      {(quotationData?.items || []).map((item, index) => (
                        <tr key={item.id || index} className="border-t border-gray-200">
                          <td className="py-3 px-4">
                            <input
                              type="number"
                              value={item.quantity || 1}
                              onChange={(e) => updateQuotationItem(index, 'quantity', Number(e.target.value))}
                              className="w-20 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                              min="1"
                            />
                          </td>
                          <td className="py-3 px-4">
                            <select
                              value={item.service || ''}
                              onChange={(e) => updateQuotationItem(index, 'service', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            >
                              <option value="">Seleccionar servicio</option>
                              {(data?.services || []).filter(s => s.active).map(service => (
                                <option key={service.id} value={service.name}>
                                  {service.name}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="py-3 px-4 text-gray-700">
                            ${(item.unitPrice || 0).toLocaleString()}
                          </td>
                          <td className="py-3 px-4 font-semibold text-gray-900">
                            ${(item.total || 0).toLocaleString()}
                          </td>
                          <td className="py-3 px-4">
                            <button
                              onClick={() => removeQuotationItem(index)}
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
                      <span>Descuento ({quotationData?.discount || 0}%):</span>
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
  }, [editingQuotation, newQuotation, data]);

  // Funciones auxiliares necesarias (placeholder)
  const showNotification = useCallback((message, type) => {
    console.log(`${type.toUpperCase()}: ${message}`);
  }, []);

  const validateRut = useCallback((rut) => true, []);
  const validateEmail = useCallback((email) => true, []);
  const formatRut = useCallback((value) => value, []);
  const calculateValidUntilDate = useCallback((date) => date, []);
  const calculateQuotationTotals = useCallback((items, discount) => ({ 
    subtotal: 0, iva: 0, totalBruto: 0, discountAmount: 0, total: 0 
  }), []);
  const cancelEdit = useCallback(() => {}, []);
  const addQuotationItem = useCallback(() => {}, []);
  const updateQuotationItem = useCallback(() => {}, []);
  const removeQuotationItem = useCallback(() => {}, []);
  const saveQuotation = useCallback(() => {}, []);

  return (


// PARTE 8A - MODALES DE CLIENTES Y SERVICIOS

// MODAL PARA CLIENTES
  const ClientModal = useCallback(() => {
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
            {/* Información básica: RUT y Empresa */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">RUT *</label>
                <input
                  type="text"
                  value={clientData?.rut || ''}
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
                />
                <p className="text-xs text-gray-500 mt-1">Formato: 12.345.678-9</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Empresa *</label>
                <input
                  type="text"
                  value={clientData?.empresa || ''}
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
                />
              </div>
            </div>

            {/* Contacto: Encargado y Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Encargado</label>
                <input
                  type="text"
                  value={clientData?.encargado || ''}
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
                  value={clientData?.email || ''}
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

            {/* Dirección */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Dirección</label>
              <input
                type="text"
                value={clientData?.direccion || ''}
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

            {/* Ubicación: Ciudad, Región y Teléfono */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ciudad</label>
                <input
                  type="text"
                  value={clientData?.ciudad || ''}
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
                  value={clientData?.region || ''}
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
                  value={clientData?.telefono || ''}
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
                <p className="text-xs text-gray-500 mt-1">Para WhatsApp</p>
              </div>
            </div>

            {/* Información adicional visual */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-blue-800 mb-2">Información Importante</h4>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>• Los campos marcados con (*) son obligatorios</li>
                <li>• El RUT será validado automáticamente</li>
                <li>• El email debe tener un formato válido</li>
                <li>• Esta información aparecerá en las cotizaciones</li>
                <li>• El teléfono se usará para envío por WhatsApp</li>
              </ul>
            </div>

            {/* Vista previa de datos */}
            {(clientData?.empresa || clientData?.rut) && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Vista Previa</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  {clientData?.empresa && <p><strong>Empresa:</strong> {clientData.empresa}</p>}
                  {clientData?.rut && <p><strong>RUT:</strong> {clientData.rut}</p>}
                  {clientData?.encargado && <p><strong>Contacto:</strong> {clientData.encargado}</p>}
                  {clientData?.email && <p><strong>Email:</strong> {clientData.email}</p>}
                  {clientData?.telefono && <p><strong>Teléfono:</strong> {clientData.telefono}</p>}
                  {(clientData?.ciudad || clientData?.region) && (
                    <p><strong>Ubicación:</strong> {[clientData.ciudad, clientData.region].filter(Boolean).join(', ')}</p>
                  )}
                  {clientData?.direccion && <p><strong>Dirección:</strong> {clientData.direccion}</p>}
                </div>
              </div>
            )}

            {/* Validaciones en tiempo real */}
            {clientData?.rut && !validateRut(clientData.rut) && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <div className="flex items-center">
                  <AlertCircle className="w-4 h-4 text-red-500 mr-2" />
                  <span className="text-sm text-red-700">El RUT ingresado no es válido</span>
                </div>
              </div>
            )}

            {clientData?.email && !validateEmail(clientData.email) && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <div className="flex items-center">
                  <AlertCircle className="w-4 h-4 text-red-500 mr-2" />
                  <span className="text-sm text-red-700">El email ingresado no es válido</span>
                </div>
              </div>
            )}
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
              disabled={!clientData?.rut || !clientData?.empresa}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isEditing ? 'Actualizar' : 'Guardar'} Cliente
            </button>
          </div>
        </div>
      </div>
    );
  }, [editingClient, newClient]);

  // MODAL PARA SERVICIOS
  const ServiceModal = useCallback(() => {
    const isEditing = editingService !== null;
    const serviceData = isEditing ? editingService : newService;
    
    const categoryColors = {
      'General': 'bg-gray-100 text-gray-800',
      'Elevadores': 'bg-blue-100 text-blue-800',
      'Transporte': 'bg-green-100 text-green-800',
      'Personal': 'bg-purple-100 text-purple-800',
      'Maquinaria': 'bg-orange-100 text-orange-800',
      'Otros': 'bg-pink-100 text-pink-800'
    };
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">
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

          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del Servicio *</label>
              <input
                type="text"
                value={serviceData?.name || ''}
                onChange={(e) => {
                  const value = e.target.value;
                  if (isEditing) {
                    setEditingService(prev => ({ ...prev, name: value }));
                  } else {
                    setNewService(prev => ({ ...prev, name: value }));
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ej: Elevador eléctrico 10 MT"
              />
              <p className="text-xs text-gray-500 mt-1">Nombre descriptivo del servicio</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Precio *</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  value={serviceData?.price || ''}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (isEditing) {
                      setEditingService(prev => ({ ...prev, price: value }));
                    } else {
                      setNewService(prev => ({ ...prev, price: value }));
                    }
                  }}
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0"
                  min="0"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Precio en pesos chilenos (CLP)</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
              <select
                value={serviceData?.category || 'General'}
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
              
              {serviceData?.category && (
                <div className="mt-2">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${categoryColors[serviceData.category] || categoryColors.General}`}>
                    {serviceData.category}
                  </span>
                </div>
              )}
            </div>

            <div>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={serviceData?.active ?? true}
                  onChange={(e) => {
                    const value = e.target.checked;
                    if (isEditing) {
                      setEditingService(prev => ({ ...prev, active: value }));
                    } else {
                      setNewService(prev => ({ ...prev, active: value }));
                    }
                  }}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">Servicio activo</span>
              </label>
              <p className="text-xs text-gray-500 mt-1 ml-7">
                Solo servicios activos aparecen en las cotizaciones
              </p>
            </div>

            {/* Vista previa del servicio */}
            {(serviceData?.name || (serviceData?.price && serviceData.price > 0)) && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Vista Previa</h4>
                <div className="text-sm text-gray-600 space-y-2">
                  {serviceData?.name && (
                    <p><strong>Servicio:</strong> {serviceData.name}</p>
                  )}
                  {serviceData?.price && serviceData.price > 0 && (
                    <p><strong>Precio:</strong> ${Number(serviceData.price).toLocaleString()}</p>
                  )}
                  {serviceData?.category && (
                    <p><strong>Categoría:</strong> {serviceData.category}</p>
                  )}
                  <div className="flex items-center space-x-2">
                    <strong>Estado:</strong>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      serviceData?.active !== false 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {serviceData?.active !== false ? 'Activo' : 'Inactivo'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Información adicional */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-blue-800 mb-2">Información Importante</h4>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>• Los campos marcados con (*) son obligatorios</li>
                <li>• Solo servicios activos aparecen en cotizaciones</li>
                <li>• El precio se puede modificar después</li>
                <li>• La categoría ayuda a organizar tus servicios</li>
                <li>• Los precios se muestran con IVA incluido en las cotizaciones</li>
              </ul>
            </div>

            {/* Validaciones en tiempo real */}
            {serviceData?.price && serviceData.price <= 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <div className="flex items-center">
                  <AlertCircle className="w-4 h-4 text-red-500 mr-2" />
                  <span className="text-sm text-red-700">El precio debe ser mayor a cero</span>
                </div>
              </div>
            )}
          </div>

          <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-end space-x-3">
            <button
              onClick={cancelEdit}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={saveService}
              disabled={!serviceData?.name || !serviceData?.price || serviceData.price <= 0}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isEditing ? 'Actualizar' : 'Guardar'} Servicio
            </button>
          </div>
        </div>
      </div>
    );
  }, [editingService, newService]);

  // Funciones auxiliares necesarias (placeholder)
  const cancelEdit = useCallback(() => {
    console.log('Cancelando edición');
  }, []);

  const saveClient = useCallback(() => {
    console.log('Guardando cliente');
  }, []);

  const saveService = useCallback(() => {
    console.log('Guardando servicio');
  }, []);

  const formatRut = useCallback((value) => {
    const cleanRut = value.replace(/[^\dkK]/g, '');
    if (cleanRut.length <= 1) return cleanRut;
    const body = cleanRut.slice(0, -1);
    const dv = cleanRut.slice(-1);
    const formattedBody = body.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `${formattedBody}-${dv}`;
  }, []);

  const validateRut = useCallback((rut) => {
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
  }, []);

  const validateEmail = useCallback((email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }, []);

  return (

 // RENDER PRINCIPAL - INTEGRACIÓN FINAL
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
            {currentView === 'company' && <CompanySettingsView />}
          </div>
        </div>
      )}
      
      {/* MODALES */}
      {showModal && modalType === 'quotation' && <QuotationModal />}
      {showModal && modalType === 'client' && <ClientModal />}
      {showModal && modalType === 'service' && <ServiceModal />}
      
      {/* SISTEMA DE NOTIFICACIONES */}
      <NotificationContainer />
      
      {/* PANEL DE FILTROS AVANZADOS */}
      {showFilters && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Filtros Avanzados</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Monto Mínimo</label>
                <input
                  type="number"
                  value={filters.minAmount}
                  onChange={(e) => setFilters(prev => ({ ...prev, minAmount: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Monto Máximo</label>
                <input
                  type="number"
                  value={filters.maxAmount}
                  onChange={(e) => setFilters(prev => ({ ...prev, maxAmount: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="999999"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={clearFilters}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Limpiar Todo
              </button>
              <button
                onClick={() => setShowFilters(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Aplicar Filtros
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* PANEL DE NOTIFICACIONES DEL SISTEMA */}
      {showNotificationPanel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-96 overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">Notificaciones</h3>
                <button
                  onClick={() => setShowNotificationPanel(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-4 space-y-3">
              {systemNotifications.length > 0 ? (
                systemNotifications.map(notification => (
                  <div key={notification.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-start">
                      <Bell className="w-4 h-4 text-blue-500 mt-0.5 mr-2" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                        <p className="text-xs text-gray-600">{notification.message}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(notification.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Bell className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>No hay notificaciones</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; // <- Esta llave cierra el componente CotizacionesApp

export default CotizacionesApp;
