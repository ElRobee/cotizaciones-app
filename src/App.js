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

  return (

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
  );
};

export default CotizacionesApp;
