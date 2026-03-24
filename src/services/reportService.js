export const downloadReport = (format = 'PDF') => {
  return new Promise((resolve, reject) => {
    try {
      // Simulate real download with delay
      const delay = 1500;
      
      setTimeout(() => {
        // Generate mock data
        const mockData = {
          title: 'Analytics Report',
          date: new Date().toLocaleDateString(),
          format: format,
          content: 'Report data here'
        };
        
        // Create blob based on format
        let blob, filename;
        
        if (format === 'CSV') {
          const csv = 'Metric,Value\nTotal CO2 Prevented,22950\nTrees Planted,2660\nPollution Reduced,9960 kg';
          blob = new Blob([csv], { type: 'text/csv' });
          filename = `report-${Date.now()}.csv`;
        } else if (format === 'JSON') {
          blob = new Blob([JSON.stringify(mockData, null, 2)], { type: 'application/json' });
          filename = `report-${Date.now()}.json`;
        } else {
          // PDF format (simulated)
          blob = new Blob(['PDF Report Content'], { type: 'application/pdf' });
          filename = `report-${Date.now()}.pdf`;
        }
        
        // Create download link and trigger download
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        
        resolve(`Report downloaded as ${filename}`);
      }, delay);
    } catch (error) {
      reject('Failed to download report: ' + error.message);
    }
  });
};