import * as XLSX from 'xlsx';

export const exportToExcel = (data, filename, sheetName = 'Datos') => {
  // Crear workbook
  const wb = XLSX.utils.book_new();
  
  // Crear worksheet
  const ws = XLSX.utils.json_to_sheet(data);
  
  // Configurar ancho de columnas
  const cols = Object.keys(data[0] || {}).map(() => ({ wch: 20 }));
  ws['!cols'] = cols;
  
  // Agregar worksheet al workbook
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  
  // Descargar archivo
  XLSX.writeFile(wb, `${filename}.xlsx`);
};

// Funciones específicas
export const exportQuotationsToExcel = (quotations) => {
  const data = quotations.map(q => ({
    'Número': q.number,
    'Cliente': q.client,
    'Fecha': q.date,
    'Subtotal': q.subtotal || 0,
    'IVA': q.iva || 0,
    'Descuento (%)': q.discount,
    'Total': q.total,
    'Estado': q.status
  }));
  
  exportToExcel(data, 'cotizaciones', 'Cotizaciones');
};

export const exportClientsToExcel = (clients) => {
  const data = clients.map(c => ({
    'RUT': c.rut,
    'Empresa': c.empresa,
    'Encargado': c.encargado,
    'Dirección': c.direccion,
    'Ciudad': c.ciudad,
    'Región': c.region,
    'Teléfono': c.telefono,
    'Email': c.email
  }));
  
  exportToExcel(data, 'clientes', 'Clientes');
};

export const exportServicesToExcel = (services) => {
  const data = services.map(s => ({
    'Servicio': s.name,
    'Precio': s.price
  }));
  
  exportToExcel(data, 'servicios', 'Servicios');
};