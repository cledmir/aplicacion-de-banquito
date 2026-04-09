import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

@Injectable({
  providedIn: 'root',
})
export class ExportService {
  constructor() {}

  /**
   * Exporta datos a Excel.
   * @param sheetsData Array de objetos, donde cada objeto representa una hoja: { sheetName: string, data: any[] }
   * @param fileName Nombre del archivo sin la extensión .xlsx
   */
  exportToExcel(sheetsData: { sheetName: string; data: any[] }[], fileName: string): void {
    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    sheetsData.forEach((sheet) => {
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(sheet.data);
      XLSX.utils.book_append_sheet(wb, ws, sheet.sheetName);
    });

    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }

  /**
   * Exporta datos a PDF usando jspdf-autotable.
   * @param title Título principal del documento
   * @param subtitle Subtítulo (ej. Nombre del fondo)
   * @param tables Array de tablas: { head: string[][], body: any[][], title?: string }
   * @param fileName Nombre del archivo sin la extensión .pdf
   */
  exportToPdf(
    title: string,
    subtitle: string,
    tables: { head: string[][]; body: any[][]; title?: string }[],
    fileName: string,
  ): void {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // Configuración de fuentes y colores (Temática Banco Familia)
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(30, 41, 59); // Slate 800
    doc.text(title, pageWidth / 2, 20, { align: 'center' });

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139); // Slate 500
    doc.text(subtitle, pageWidth / 2, 28, { align: 'center' });

    let startY = 40;

    tables.forEach((table, index) => {
      if (table.title) {
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(15, 23, 42); // Slate 900
        doc.text(table.title, 14, startY);
        startY += 8;
      }

      autoTable(doc, {
        startY: startY,
        head: table.head,
        body: table.body,
        theme: 'striped',
        headStyles: {
          fillColor: [37, 99, 235], // Blue 600
          textColor: [255, 255, 255],
          fontStyle: 'bold',
        },
        alternateRowStyles: {
          fillColor: [248, 250, 252], // Slate 50
        },
        margin: { top: 10, left: 14, right: 14, bottom: 10 },
        didDrawPage: function (data: any) {
          // Footer
          const pageTitle = `${fileName} - Generado vía Banco Familia App`;
          doc.setFontSize(8);
          doc.setTextColor(148, 163, 184); // Slate 400
          doc.text(pageTitle, 14, doc.internal.pageSize.getHeight() - 10);
        },
      });

      startY = (doc as any).lastAutoTable.finalY + 15;
    });

    doc.save(`${fileName}.pdf`);
  }
}
