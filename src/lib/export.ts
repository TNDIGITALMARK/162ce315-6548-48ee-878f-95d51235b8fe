interface ExportData {
  id: string;
  submittedAt: string;
  [key: string]: any;
}

interface ExportOptions {
  filename?: string;
  includeHeaders?: boolean;
}

export class ExportService {
  static async exportToCSV(data: ExportData[], options: ExportOptions = {}): Promise<void> {
    const { filename = 'form-submissions', includeHeaders = true } = options;

    if (data.length === 0) {
      console.warn('No data to export');
      return;
    }

    const headers = Object.keys(data[0]);
    const csvContent = [
      ...(includeHeaders ? [headers.join(',')] : []),
      ...data.map(row =>
        headers.map(header => {
          const value = row[header];
          const stringValue = value?.toString() || '';
          return stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')
            ? `"${stringValue.replace(/"/g, '""')}"`
            : stringValue;
        }).join(',')
      )
    ].join('\n');

    this.downloadFile(csvContent, `${filename}.csv`, 'text/csv');
  }

  static async exportToJSON(data: ExportData[], options: ExportOptions = {}): Promise<void> {
    const { filename = 'form-submissions' } = options;

    const jsonContent = JSON.stringify(data, null, 2);
    this.downloadFile(jsonContent, `${filename}.json`, 'application/json');
  }

  static async exportToExcel(data: ExportData[], options: ExportOptions = {}): Promise<void> {
    // For a production app, you'd use a library like xlsx
    // For this MVP, we'll export as CSV with Excel-compatible format
    const { filename = 'form-submissions' } = options;

    if (data.length === 0) {
      console.warn('No data to export');
      return;
    }

    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join('\t'), // Tab-separated for Excel
      ...data.map(row =>
        headers.map(header => {
          const value = row[header];
          return value?.toString() || '';
        }).join('\t')
      )
    ].join('\n');

    this.downloadFile(csvContent, `${filename}.xls`, 'application/vnd.ms-excel');
  }

  static async exportToPDF(data: ExportData[], options: ExportOptions = {}): Promise<void> {
    const { filename = 'form-submissions' } = options;

    // For a production app, you'd use a library like jsPDF or Puppeteer
    // For this MVP, we'll create a simple HTML table and print
    const headers = Object.keys(data[0] || {});

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Form Submissions Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { margin-bottom: 20px; border-bottom: 2px solid #2563eb; padding-bottom: 10px; }
            .title { color: #2563eb; font-size: 24px; font-weight: bold; }
            .subtitle { color: #6b7280; font-size: 14px; margin-top: 5px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #e5e7eb; padding: 8px; text-align: left; }
            th { background-color: #f3f4f6; font-weight: bold; }
            .stats { display: flex; gap: 20px; margin: 20px 0; }
            .stat { background: #f8fafc; padding: 15px; border-radius: 8px; flex: 1; }
            .stat-value { font-size: 24px; font-weight: bold; color: #2563eb; }
            .stat-label { color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="title">JustFormYou - Form Submissions Report</div>
            <div class="subtitle">Generated on ${new Date().toLocaleDateString()}</div>
          </div>

          <div class="stats">
            <div class="stat">
              <div class="stat-value">${data.length}</div>
              <div class="stat-label">Total Submissions</div>
            </div>
            <div class="stat">
              <div class="stat-value">${new Date().toLocaleDateString()}</div>
              <div class="stat-label">Report Date</div>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                ${headers.map(header => `<th>${header}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${data.map(row => `
                <tr>
                  ${headers.map(header => `<td>${row[header] || ''}</td>`).join('')}
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;

    // Open in new window for printing/saving as PDF
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(htmlContent);
      newWindow.document.close();
      newWindow.focus();

      // Trigger print dialog
      setTimeout(() => {
        newWindow.print();
      }, 100);
    }
  }

  private static downloadFile(content: string, filename: string, mimeType: string): void {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.style.display = 'none';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up the URL object
    setTimeout(() => URL.revokeObjectURL(url), 100);
  }

  static formatSubmissionData(submissions: any[]): ExportData[] {
    return submissions.map(submission => ({
      'Submission ID': submission.id,
      'Customer Name': submission.customerName,
      'Email': submission.email,
      'Service Rating': submission.serviceRating,
      'Overall Experience': submission.overallExperience,
      'Improvements': submission.improvements || 'N/A',
      'Contact Method': submission.contactMethod,
      'Status': submission.status,
      'Submitted At': submission.submittedAt
    }));
  }

  static async exportFormSubmissions(
    submissions: any[],
    format: 'csv' | 'excel' | 'json' | 'pdf',
    filename?: string
  ): Promise<void> {
    const formattedData = this.formatSubmissionData(submissions);
    const options = { filename: filename || `form-submissions-${Date.now()}` };

    switch (format) {
      case 'csv':
        await this.exportToCSV(formattedData, options);
        break;
      case 'excel':
        await this.exportToExcel(formattedData, options);
        break;
      case 'json':
        await this.exportToJSON(formattedData, options);
        break;
      case 'pdf':
        await this.exportToPDF(formattedData, options);
        break;
      default:
        throw new Error(`Unsupported export format: ${format}`);
    }
  }
}