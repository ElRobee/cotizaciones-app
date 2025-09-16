import React, { useState, useEffect, useCallback, useMemo } from "react";
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
  User,
  Clock,
  Download,
  XCircle
} from "lucide-react";

/*
  PARTE 1 - Estados principales
*/
function App() {
  // Autenticación / usuario
  const [currentUser, setCurrentUser] = useState(null);
  const [authMode, setAuthMode] = useState("login");
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [forgotForm, setForgotForm] = useState({ email: "" });

  // Navegación / UI
  const [currentView, setCurrentView] = useState("dashboard");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null); // 'quotation' | 'client' | 'service'
  const [notifications, setNotifications] = useState([]);

  // Datos principales (puedes reemplazar por Firebase.fetch)
  const [data, setData] = useState({
    quotations: [],
    clients: [],
    services: []
  });

  // Edición
  const [editingQuotation, setEditingQuotation] = useState(null);
  const [editingClient, setEditingClient] = useState(null);
  const [editingService, setEditingService] = useState(null);

  // Búsqueda / filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    dateFrom: "",
    dateTo: "",
    status: "",
    priority: "",
    minAmount: "",
    maxAmount: "",
    client: "",
    createdBy: ""
  });
  const [showFilters, setShowFilters] = useState(false);

  // Reportes / otros
  const [reportType, setReportType] = useState("monthly");
  const [reportPeriod, setReportPeriod] = useState("2025-01");
  const [generatingReport, setGeneratingReport] = useState(false);

// PARTE 2 - FUNCIONES AUXILIARES Y UTILITARIOS

// FUNCIÓN PARA MOSTRAR NOTIFICACIONES
const showNotification = useCallback((message, type = 'success') => {
  const id = Date.now();
  const notification = { id, message, type };
  setNotifications(prev => [...prev, notification]);
  setTimeout(() => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, 4000);
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

const validateClientForm = useCallback((clientData, isEditing, existingClients) => {
  const errors = [];
  if (!clientData.name) errors.push("El nombre es obligatorio");
  if (!clientData.email) errors.push("El email es obligatorio");
  if (!validateEmail(clientData.email)) errors.push("El email no es válido");
  if (!isEditing && existingClients.some(c => c.email === clientData.email)) {
    errors.push("Ya existe un cliente con este email");
  }
  return errors;
}, []);

const validateServiceForm = useCallback((serviceData, isEditing, existingServices) => {
  const errors = [];
  if (!serviceData.name) errors.push("El nombre del servicio es obligatorio");
  if (serviceData.price <= 0) errors.push("El precio debe ser mayor a 0");
  if (!isEditing && existingServices.some(s => s.name === serviceData.name)) {
    errors.push("Ya existe un servicio con este nombre");
  }
  return errors;
}, []);

const validateRut = useCallback((rut) => {
  // Aquí podrías implementar la validación real de RUT chileno
  return typeof rut === "string" && rut.length > 6;
}, []);

const validateEmail = useCallback((email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}, []);

// FUNCIÓN PARA EXPORTAR COTIZACIÓN A PDF
const exportToPDF = useCallback((quotation, client) => {
  // 🔹 Aquí puedes usar librerías como jsPDF o pdfmake.
  // Para este ejemplo usaremos solo un log como placeholder.
  console.log("Generando PDF para la cotización:", quotation);
  showNotification("PDF generado con éxito", "success");
}, [showNotification]);

// FUNCIÓN PARA ENVIAR COTIZACIÓN POR WHATSAPP (Resumen Ejecutivo)
const sendViaWhatsApp = useCallback((quotation, client) => {
  if (!client?.phone) {
    showNotification("El cliente no tiene número de teléfono registrado", "error");
    return;
  }

  // Calcular totales
  const total = quotation.items.reduce((acc, item) => acc + (item.quantity * item.price), 0);
  const descuento = quotation.discount ? `${quotation.discount}%` : "0%";
  const neto = total - (total * (quotation.discount / 100));

  // Mensaje resumen
  let message = `Hola ${client.name},\n\n`;
  message += `Te comparto el *resumen ejecutivo* de tu cotización:\n\n`;
  message += `📌 Cotización N° ${quotation.id}\n`;
  message += `👤 Cliente: ${client.name}\n`;
  message += `💰 Total: $${total.toLocaleString()}\n`;
  message += `🎁 Descuento: ${descuento}\n`;
  message += `🧾 Neto a pagar: $${neto.toLocaleString()}\n\n`;
  message += `✅ Vigencia: ${quotation.validUntil || "30 días"}\n`;
  message += `📅 Fecha: ${quotation.date || new Date().toLocaleDateString()}\n\n`;
  message += `Gracias por tu preferencia 🙌`;

  // Abrir WhatsApp Web
  const url = `https://wa.me/${client.phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}, [showNotification]);

  // ============================
  // PARTE 3 - FUNCIONES CRUD Y GESTIÓN DE ESTADOS
  // ============================

  const startEdit = useCallback((type, item) => {
    switch (type) {
      case "quotation":
        setEditingQuotation({ ...item });
        setModalType("quotation");
        setShowModal(true);
        break;
      case "client":
        setEditingClient({ ...item });
        setModalType("client");
        setShowModal(true);
        break;
      case "service":
        setEditingService({ ...item });
        setModalType("service");
        setShowModal(true);
        break;
      default:
        break;
    }
  }, []);

  const deleteItem = useCallback((type, id) => {
    setData(prev => ({
      ...prev,
      [type]: (prev[type] || []).filter(item => item.id !== id)
    }));
    showNotification("Eliminado correctamente", "success");
  }, [showNotification]);

  const saveQuotation = useCallback((quotation) => {
    const errors = validateQuotationForm(quotation);
    if (errors.length) {
      errors.forEach(e => showNotification(e, "error"));
      return false;
    }

    setData(prev => {
      const quotations = [...(prev.quotations || [])];
      if (quotation.id) {
        const i = quotations.findIndex(q => q.id === quotation.id);
        if (i !== -1) quotations[i] = { ...quotation };
        else quotations.push({ ...quotation });
      } else {
        const newQuotation = { ...quotation, id: Date.now().toString(), number: `COT-${Date.now()}` };
        quotations.push(newQuotation);
      }
      return { ...prev, quotations };
    });

    showNotification("Cotización guardada", "success");
    setShowModal(false);
    setEditingQuotation(null);
    return true;
  }, [validateQuotationForm, showNotification]);

  const saveClient = useCallback((client) => {
    const errors = validateClientForm(client, Boolean(client.id), data.clients || []);
    if (errors.length) {
      errors.forEach(e => showNotification(e, "error"));
      return false;
    }
    setData(prev => {
      const clients = [...(prev.clients || [])];
      if (client.id) {
        const i = clients.findIndex(c => c.id === client.id);
        if (i !== -1) clients[i] = { ...client };
        else clients.push(client);
      } else {
        clients.push({ ...client, id: Date.now().toString() });
      }
      return { ...prev, clients };
    });
    showNotification("Cliente guardado", "success");
    setShowModal(false);
    setEditingClient(null);
    return true;
  }, [validateClientForm, data.clients, showNotification]);

  const saveService = useCallback((service) => {
    const errors = validateServiceForm(service, Boolean(service.id), data.services || []);
    if (errors.length) {
      errors.forEach(e => showNotification(e, "error"));
      return false;
    }
    setData(prev => {
      const services = [...(prev.services || [])];
      if (service.id) {
        const i = services.findIndex(s => s.id === service.id);
        if (i !== -1) services[i] = { ...service };
        else services.push(service);
      } else {
        services.push({ ...service, id: Date.now().toString() });
      }
      return { ...prev, services };
    });
    showNotification("Servicio guardado", "success");
    setShowModal(false);
    setEditingService(null);
    return true;
  }, [validateServiceForm, data.services, showNotification]);

  const toggleServiceStatus = useCallback((serviceId) => {
    setData(prev => ({
      ...prev,
      services: (prev.services || []).map(s => s.id === serviceId ? { ...s, active: !s.active } : s)
    }));
    showNotification("Estado de servicio actualizado", "info");
  }, [showNotification]);

  // Export / WhatsApp placeholders
  const exportToPDF = useCallback((quotation) => {
    console.log("Exporting to PDF:", quotation);
    showNotification("Exportar a PDF (placeholder)", "info");
  }, [showNotification]);

  const sendViaWhatsApp = useCallback((quotation) => {
    console.log("Sending via WhatsApp:", quotation);
    showNotification("Enviar vía WhatsApp (placeholder)", "info");
  }, [showNotification]);

  // Auth / Session placeholders
  const handleAuth = useCallback(() => {
    // simple placeholder: si login coincide con admin -> set user, si register -> set user
    if (authMode === "login") {
      if (loginForm.email && loginForm.password) {
        setCurrentUser({ uid: "u1", displayName: "Admin", email: loginForm.email });
        showNotification("Ingreso correcto", "success");
      } else {
        showNotification("Completa email y contraseña", "error");
      }
    } else if (authMode === "register") {
      // simple register placeholder
      setCurrentUser({ uid: "u_new", displayName: registerForm.name || "Nuevo usuario", email: registerForm.email });
      showNotification("Cuenta creada", "success");
    } else if (authMode === "forgot") {
      showNotification("Email de recuperación enviado (placeholder)", "info");
    }
  }, [authMode, loginForm, registerForm, showNotification]);

  const handleLogout = useCallback(() => {
    setCurrentUser(null);
    showNotification("Sesión cerrada", "info");
  }, [showNotification]);

  const generateBackup = useCallback(() => {
    // placeholder: podrías crear un .json y descargarlo
    console.log("Backup:", data);
    showNotification("Backup descargado (placeholder)", "info");
  }, [data, showNotification]);

  // ============================
  // PARTE 4 - COMPONENTES DE INTERFAZ PRINCIPALES
  // ============================

  function AuthView() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-md w-full space-y-8 p-8">
          <div className="text-center">
            <Building2 className="mx-auto h-12 w-12 text-blue-600" />
            <h2 className="mt-6 text-3xl font-bold text-gray-900">Sistema de Cotizaciones</h2>
            <p className="mt-2 text-sm text-gray-600">Gestiona tus cotizaciones de manera eficiente</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            {authMode === "login" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="tu@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
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

            {authMode === "register" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
                  <input
                    type="text"
                    value={registerForm.name}
                    onChange={(e) => setRegisterForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Tu nombre"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={registerForm.email}
                    onChange={(e) => setRegisterForm(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="tu@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                  <input
                    type="password"
                    value={registerForm.password}
                    onChange={(e) => setRegisterForm(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="••••••••"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar Contraseña</label>
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

            {authMode === "forgot" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
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
              {authMode === "login" && (
                <>
                  <button onClick={() => setAuthMode("register")} className="text-sm text-blue-600 hover:text-blue-800">
                    ¿No tienes cuenta? Regístrate
                  </button>
                  <br />
                  <button onClick={() => setAuthMode("forgot")} className="text-sm text-gray-600 hover:text-gray-800">
                    ¿Olvidaste tu contraseña?
                  </button>
                </>
              )}

              {authMode === "register" && (
                <button onClick={() => setAuthMode("login")} className="text-sm text-blue-600 hover:text-blue-800">
                  ¿Ya tienes cuenta? Inicia sesión
                </button>
              )}

              {authMode === "forgot" && (
                <button onClick={() => setAuthMode("login")} className="text-sm text-blue-600 hover:text-blue-800">
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
    );
  }

  function Sidebar() {
    return (
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
              { id: "dashboard", label: "Dashboard", icon: BarChart3 },
              { id: "quotations", label: "Cotizaciones", icon: FileText },
              { id: "clients", label: "Clientes", icon: Users },
              { id: "services", label: "Servicios", icon: Settings },
              { id: "company", label: "Empresa", icon: Building2 }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  currentView === item.id ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
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
                {currentUser?.displayName || "Usuario"}
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
    );
  }

  function NotificationContainer() {
    return (
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
    );
  }

  // ============================
  // PARTE 5 - VISTAS PRINCIPALES
  // ============================

  function DashboardView() {
    const stats = useMemo(() => {
      const quotations = data?.quotations || [];
      const clients = data?.clients || [];

      return {
        totalQuotations: quotations.length,
        pendingQuotations: quotations.filter(q => q.status === "Pendiente").length,
        invoicedQuotations: quotations.filter(q => q.status === "Facturada").length,
        totalRevenue: quotations
          .filter(q => q.status === "Facturada")
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
                    <p className="font-semibold text-gray-900">${(quotation.total || 0).toLocaleString()}</p>
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
                onClick={() => { setModalType('quotation'); setShowModal(true); }}
                className="w-full flex items-center justify-center space-x-2 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Nueva Cotización</span>
              </button>

              <button
                onClick={() => { setModalType('client'); setShowModal(true); }}
                className="w-full flex items-center justify-center space-x-2 p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Nuevo Cliente</span>
              </button>

              <button
                onClick={() => { setModalType('service'); setShowModal(true); }}
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
  }

function QuotationsView() {
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

  const filtered = getFilteredQuotations();

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Cotizaciones</h1>
        <button
          onClick={() => { setModalType('quotation'); setShowModal(true); }}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Nueva Cotización</span>
        </button>
      </div>

      {/* Tabla con filtros */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Buscador */}
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

            {/* Botón filtros */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center space-x-2 px-4 py-2 border rounded-lg transition-colors ${
                showFilters ? 'bg-blue-50 border-blue-300 text-blue-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Filter className="w-4 h-4" />
              <span>Filtros</span>
            </button>
          </div>

          {/* Panel filtros */}
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
                    <option key={client.id} value={client.empresa}>{client.empresa}</option>
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

        {/* Tabla cotizaciones */}
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
              {filtered.map(quotation => (
                <tr key={quotation.id} className="hover:bg-gray-50 transition-colors border-b border-gray-100">
                  <td className="py-4 px-6 font-medium text-gray-900">{quotation.number}</td>
                  <td className="py-4 px-6 text-gray-700">{quotation.client}</td>
                  <td className="py-4 px-6 text-gray-600">{quotation.date}</td>
                  <td className="py-4 px-6 font-semibold text-gray-900">${(quotation.total || 0).toLocaleString()}</td>
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
                      <button onClick={() => startEdit('quotation', quotation)} className="p-2 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-100 rounded-lg transition-colors" title="Editar">
                        <Edit2 className="w-4 h-4" />
                      </button>

                      <button onClick={() => exportToPDF(quotation, quotation.client)} className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-lg transition-colors" title="Exportar PDF">
                        <FileText className="w-4 h-4" />
                      </button>

                      {/* Botón WhatsApp con Send */}
                      <button
                        onClick={() => sendViaWhatsApp(quotation, quotation.client)}
                        className="p-2 text-green-600 hover:text-green-800 hover:bg-green-100 rounded-lg transition-colors"
                        title="Enviar por WhatsApp"
                      >
                        <Send size={18} />
                      </button>

                      <button onClick={() => deleteItem('quotations', quotation.id)} className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-lg transition-colors" title="Eliminar">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mensaje si no hay resultados */}
          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <FileText className="w-16 h-16 mx-auto mb-4 opacity-30" />
              <p className="text-lg mb-2">No se encontraron cotizaciones</p>
              <p className="text-sm">
                {searchTerm || Object.values(filters).some(f => f) ? 'Prueba ajustando los filtros de búsqueda' : 'Crea tu primera cotización para empezar'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


  function ClientsView() {
    const getFilteredClients = () => {
      if (!data?.clients) return [];

      if (!searchTerm) return data.clients;

      const searchLower = searchTerm.toLowerCase();
      return data.clients.filter(client =>
        (client.empresa || "").toLowerCase().includes(searchLower) ||
        (client.encargado || "").toLowerCase().includes(searchLower) ||
        (client.rut || "").includes(searchTerm) ||
        (client.email || "").toLowerCase().includes(searchLower) ||
        (client.ciudad || "").toLowerCase().includes(searchLower)
      );
    };

    const filtered = getFilteredClients();

    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Clientes</h1>
          <button onClick={() => { setModalType('client'); setShowModal(true); }} className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
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
                {filtered.map(client => (
                  <tr key={client.id} className="hover:bg-gray-50 transition-colors border-b border-gray-100">
                    <td className="py-4 px-6 font-medium text-gray-900">{client.rut}</td>
                    <td className="py-4 px-6 text-gray-900 font-medium">{client.empresa}</td>
                    <td className="py-4 px-6 text-gray-700">{client.encargado || '-'}</td>
                    <td className="py-4 px-6 text-gray-600">{client.ciudad || '-'}</td>
                    <td className="py-4 px-6 text-gray-600">{client.email || '-'}</td>
                    <td className="py-4 px-6 text-gray-600">{client.telefono || '-'}</td>
                    <td className="py-4 px-6">
                      <div className="flex space-x-1">
                        <button onClick={() => startEdit('client', client)} className="p-2 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-100 rounded-lg transition-colors" title="Editar">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => deleteItem('clients', client.id)} className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-lg transition-colors" title="Eliminar">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filtered.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <Users className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p className="text-lg mb-2">No se encontraron clientes</p>
                <p className="text-sm">{searchTerm ? 'Prueba con otros términos de búsqueda' : 'Agrega tu primer cliente para empezar'}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  function ServicesView() {
    const getFilteredServices = () => {
      if (!data?.services) return [];
      if (!searchTerm) return data.services;
      const searchLower = searchTerm.toLowerCase();
      return data.services.filter(service =>
        (service.name || "").toLowerCase().includes(searchLower) ||
        (service.category || "").toLowerCase().includes(searchLower)
      );
    };

    const filtered = getFilteredServices();

    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Servicios</h1>
          <button onClick={() => { setModalType('service'); setShowModal(true); }} className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
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
                {filtered.map(service => (
                  <tr key={service.id} className="hover:bg-gray-50 transition-colors border-b border-gray-100">
                    <td className="py-4 px-6 font-medium text-gray-900">{service.name}</td>
                    <td className="py-4 px-6 text-gray-700 font-semibold">${(service.price || 0).toLocaleString()}</td>
                    <td className="py-4 px-6 text-gray-600">{service.category}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${service.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {service.active ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex space-x-1">
                        <button onClick={() => startEdit('service', service)} className="p-2 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-100 rounded-lg transition-colors" title="Editar">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => toggleServiceStatus(service.id)} className={`p-2 rounded-lg transition-colors ${service.active ? 'text-red-600 hover:text-red-800 hover:bg-red-100' : 'text-green-600 hover:text-green-800 hover:bg-green-100'}`} title={service.active ? 'Desactivar' : 'Activar'}>
                          {service.active ? <XCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                        </button>
                        <button onClick={() => deleteItem('services', service.id)} className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-lg transition-colors" title="Eliminar">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filtered.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <Settings className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p className="text-lg mb-2">No se encontraron servicios</p>
                <p className="text-sm">{searchTerm ? 'Prueba con otros términos de búsqueda' : 'Agrega tu primer servicio para empezar'}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Company settings placeholder (para mantener la referencia "company" en el Sidebar)
  function CompanySettingsView() {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Configuración de Empresa</h1>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <p className="text-gray-700">Aquí puedes agregar información de la empresa, logo, tema, etc. (placeholder)</p>
        </div>
      </div>
    );
  }

  // ============================
  // PARTE 6 - MODAL (básico) y RENDER PRINCIPAL
  // ============================

  function ModalForm() {
    // modal lógico simple: si editing* existe, lo usamos; si no, creamos objetos vacíos
    const onClose = () => {
      setShowModal(false);
      setModalType(null);
      setEditingQuotation(null);
      setEditingClient(null);
      setEditingService(null);
    };

    if (!showModal) return null;

    if (modalType === "quotation") {
      const local = editingQuotation || { client: "", items: [], discount: 0, total: 0, status: "Pendiente" };
      // Form simplificado (para copiar/revisar rápidamente)
      let temp = { ...local };
      return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-40">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h3 className="text-lg font-semibold mb-4">{local.id ? "Editar Cotización" : "Nueva Cotización"}</h3>

            <div className="space-y-3">
              <div>
                <label className="block text-sm">Cliente</label>
                <input defaultValue={local.client} onChange={(e) => (temp.client = e.target.value)} className="w-full border p-2 rounded" />
              </div>

              <div>
                <label className="block text-sm">Total</label>
                <input defaultValue={local.total} onChange={(e) => (temp.total = Number(e.target.value))} className="w-full border p-2 rounded" />
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button onClick={onClose} className="px-4 py-2 rounded border">Cancelar</button>
              <button onClick={() => { saveQuotation({ ...local, ...temp }); }} className="px-4 py-2 rounded bg-blue-600 text-white">Guardar</button>
            </div>
          </div>
        </div>
      );
    }

    if (modalType === "client") {
      const local = editingClient || { empresa: "", rut: "", encargado: "", email: "", telefono: "" };
      let temp = { ...local };
      return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-40">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">{local.id ? "Editar Cliente" : "Nuevo Cliente"}</h3>

            <div className="space-y-3">
              <div>
                <label className="block text-sm">Empresa</label>
                <input defaultValue={local.empresa} onChange={(e) => (temp.empresa = e.target.value)} className="w-full border p-2 rounded" />
              </div>
              <div>
                <label className="block text-sm">RUT</label>
                <input defaultValue={local.rut} onChange={(e) => (temp.rut = e.target.value)} className="w-full border p-2 rounded" />
              </div>
              <div>
                <label className="block text-sm">Email</label>
                <input defaultValue={local.email} onChange={(e) => (temp.email = e.target.value)} className="w-full border p-2 rounded" />
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button onClick={onClose} className="px-4 py-2 rounded border">Cancelar</button>
              <button onClick={() => { saveClient({ ...local, ...temp }); }} className="px-4 py-2 rounded bg-green-600 text-white">Guardar</button>
            </div>
          </div>
        </div>
      );
    }

    if (modalType === "service") {
      const local = editingService || { name: "", price: 0, category: "", active: true };
      let temp = { ...local };
      return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-40">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">{local.id ? "Editar Servicio" : "Nuevo Servicio"}</h3>

            <div className="space-y-3">
              <div>
                <label className="block text-sm">Nombre</label>
                <input defaultValue={local.name} onChange={(e) => (temp.name = e.target.value)} className="w-full border p-2 rounded" />
              </div>
              <div>
                <label className="block text-sm">Precio</label>
                <input defaultValue={local.price} onChange={(e) => (temp.price = Number(e.target.value))} className="w-full border p-2 rounded" />
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button onClick={onClose} className="px-4 py-2 rounded border">Cancelar</button>
              <button onClick={() => { saveService({ ...local, ...temp }); }} className="px-4 py-2 rounded bg-purple-600 text-white">Guardar</button>
            </div>
          </div>
        </div>
      );
    }

    return null;
  }

  // RENDER PRINCIPAL
  return (
    <div className="flex">
      {currentUser ? (
        <>
          <Sidebar />
          <main className="flex-1 bg-gray-50 min-h-screen">
            {currentView === "dashboard" && <DashboardView />}
            {currentView === "quotations" && <QuotationsView />}
            {currentView === "clients" && <ClientsView />}
            {currentView === "services" && <ServicesView />}
            {currentView === "company" && <CompanySettingsView />}
          </main>

          <NotificationContainer />
          <ModalForm />
        </>
      ) : (
        <AuthView />
      )}
    </div>
  );
}

export default App;
