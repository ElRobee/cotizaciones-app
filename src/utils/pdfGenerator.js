import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const generateQuotationPDF = async (quotation, company, client) => {
  // Crear contenido HTML
  const content = document.createElement('div');
  content.innerHTML = `
    <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 800px;">
      <div style="text-align: center; border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 30px;">
        <h1 style="color: #333; margin: 0; font-size: 24px;">${company.razonSocial}</h1>
        <p style="margin: 5px 0;">${company.direccion} - ${company.ciudad}, ${company.region}</p>
        <p style="margin: 5px 0;">RUT: ${company.rut} | Tel: ${company.telefono}</p>
        <p style="margin: 5px 0;">Email: ${company.email}</p>
      </div>
      
      <div style="display: flex; justify-content: space-between; margin-bottom: 30px;">
        <div>
          <h2 style="color: #333; margin: 0 0 10px 0;">COTIZACIÓN</h2>
          <p style="margin: 5px 0;"><strong>Número:</strong> ${quotation.number}</p>
          <p style="margin: 5px 0;"><strong>Fecha:</strong> ${quotation.date}</p>
        </div>
        <div style="text-align: right;">
          <h3 style="color: #333; margin: 0 0 10px 0;">CLIENTE</h3>
          <p style="margin: 5px 0;"><strong>${client?.empresa || quotation.client}</strong></p>
          <p style="margin: 5px 0;">RUT: ${client?.rut || ''}</p>
          <p style="margin: 5px 0;">Contacto: ${client?.encargado || ''}</p>
          <p style="margin: 5px 0;">${client?.direccion || ''}</p>
          <p style="margin: 5px 0;">${client?.ciudad || ''}, ${client?.region || ''}</p>
          <p style="margin: 5px 0;">Tel: ${client?.telefono || ''}</p>
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
      
      <div style="text-align: right; margin-bottom: 40px;">
        <div style="display: inline-block; text-align: left;">
          <p style="margin: 5px 0;"><span style="display: inline-block; width: 120px;">Subtotal:</span> $${quotation.subtotal?.toLocaleString() || '0'}</p>
          <p style="margin: 5px 0;"><span style="display: inline-block; width: 120px;">IVA (19%):</span> $${quotation.iva?.toLocaleString() || '0'}</p>
          <p style="margin: 5px 0;"><span style="display: inline-block; width: 120px;">Total Bruto:</span> $${quotation.totalBruto?.toLocaleString() || '0'}</p>
          ${quotation.discountAmount > 0 ? `
            <p style="margin: 5px 0; color: red;"><span style="display: inline-block; width: 120px;">Descuento (${quotation.discount}%):</span> -$${quotation.discountAmount?.toLocaleString() || '0'}</p>
          ` : ''}
          <p style="margin: 10px 0 0 0; font-weight: bold; font-size: 18px; border-top: 2px solid #333; padding-top: 10px;">
            <span style="display: inline-block; width: 120px;">TOTAL:</span> $${quotation.total?.toLocaleString() || '0'}
          </p>
        </div>
      </div>
      
      <div style="padding: 20px; background-color: #f9f9f9; border-left: 4px solid #333; text-align: center;">
        <p style="margin: 0; font-style: italic; color: #666;">
          "Documento válido sólo como Cotización; No constituye venta ni recibo de dinero; No válido como documento tributario."
        </p>
      </div>
    </div>
  `;

  // Agregar temporalmente al DOM
  content.style.position = 'absolute';
  content.style.left = '-9999px';
  document.body.appendChild(content);

  try {
    // Generar canvas
    const canvas = await html2canvas(content, {
      scale: 2,
      useCORS: true,
      logging: false
    });

    // Crear PDF
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    
    let position = 0;
    
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    
    // Descargar PDF
    pdf.save(`cotizacion-${quotation.number}.pdf`);
    
  } finally {
    // Remover del DOM
    document.body.removeChild(content);
  }
};