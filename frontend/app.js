function hexToRgba(hex, alpha) {
    const bigint = parseInt(hex.replace('#',''), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r},${g},${b},${alpha})`;
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const alertGrid = document.getElementById('alert-grid');
    const tempCtx = document.getElementById('tempChart').getContext('2d');
    const umiCtx = document.getElementById('umiChart').getContext('2d');
  
    function makeChart(label, ctx, color) {
      return new Chart(ctx, {
        type: 'line',
        data: { labels: [], datasets: [{
          label,
          data: [],
          borderColor: color,
          backgroundColor: hexToRgba(color, 0.1),
          tension: 0.4,
          fill: true,
          pointRadius: 3,
          spanGaps: true
        }] },
        options: {
          animation: false,
          scales: {
            x: { display: true, title: { display: true, text: 'Horário', color: '#9ca3af' }, ticks: { color: '#9ca3af' }, grid: { color: '#374151' } },
            y: { beginAtZero: true, ticks: { color: '#9ca3af' }, grid: { color: '#374151' } }
          },
          plugins: { legend: { labels: { color: '#e5e7eb' } } }
        }
      });
    }
  
    const tempChart = makeChart('Temperatura (ºC)', tempCtx, '#ef4444');
    const umiChart = makeChart('Umidade (%)', umiCtx, '#3b82f6');
    const socket = new WebSocket('ws://localhost:6789');
  
    socket.onmessage = ({ data }) => {
      const time = new Date().toLocaleTimeString();
      const temp = parseFloat(data.match(/Temperatura: (.*?)ºC/)[1]);
      const umi = parseFloat(data.match(/Umidade: (.*?)%/)[1]);
      const fumaca = data.match(/Fumaça: (.*?)\n/)[1].trim() === 'Sim';
      const alertas = data.match(/ALERTAS:\s*(.*)/)?.[1] || '';
  
      [tempChart, umiChart].forEach((chart, i) => {
        chart.data.labels.push(time);
        chart.data.datasets[0].data.push(i === 0 ? temp : umi);
        chart.update();
      });
  
      const nivel = fumaca || alertas.includes('crítica') ? 'critico' : alertas ? 'moderado' : 'normal';
      const card = document.createElement('div');
      card.className = `alert-box ${nivel}`;
      card.innerHTML = `<p><strong>${time}</strong></p><p>Temp: ${temp}ºC</p><p>Umid: ${umi}%</p><p>Fumaça: ${fumaca ? 'Sim' : 'Não'}</p><p>${alertas || 'Nenhum'}</p>`;
      alertGrid.prepend(card);
      if (alertGrid.childNodes.length > 10) alertGrid.removeChild(alertGrid.lastChild);
    };
  });
  
  function startSensor() {
    fetch('http://localhost:5000/start').then(r => r.json()).then(d => alert(d.status));
  }
  function stopSensor() {
    fetch('http://localhost:5000/stop').then(r => r.json()).then(d => alert(d.status));
  }