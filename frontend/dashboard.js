/* ============================================================
   dashboard.js — Stats · Chart.js Revenue · Recent Orders
   ============================================================ */

const Dashboard = {
  chartInstance: null,

  async load() {
    try {
      const data = await api.get('/dashboard/stats');
      this.renderStats(data);
      this.renderChart(data.weekly_revenue);
      this.renderRecent(data.recent_orders);
    } catch(e) {
      toast.show('Failed to load dashboard: ' + e.message, 'error');
    }
  },

  renderStats(data) {
    document.getElementById('stat-revenue').textContent = formatCurrency(data.revenue);
    document.getElementById('stat-tables').textContent  = data.active_tables;
    document.getElementById('stat-orders').textContent  = data.orders_today;
    document.getElementById('stat-top').textContent     = data.top_item?.name || 'N/A';
    document.getElementById('stat-top-sub').textContent = data.top_item?.qty
      ? `${data.top_item.qty} servings served`
      : 'No orders yet';
    document.getElementById('stat-tables-sub').textContent =
      `${data.active_tables} of 12 tables active`;
  },

  renderChart(weekly) {
    // Build complete 7-day array (fill missing days with 0)
    const today  = new Date();
    const days   = [];
    const values = [];

    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      const found = weekly.find(r => r.date === key);
      days.push(d.toLocaleDateString('en-US', { weekday:'short', month:'short', day:'numeric' }));
      values.push(found ? parseFloat(found.revenue) : 0);
    }

    const ctx = document.getElementById('revenue-chart').getContext('2d');

    // Gradient fill for Champagne Gold
    const grad = ctx.createLinearGradient(0, 0, 0, 280);
    grad.addColorStop(0,   'rgba(229,193,88,0.30)');
    grad.addColorStop(0.6, 'rgba(229,193,88,0.06)');
    grad.addColorStop(1,   'rgba(229,193,88,0)');

    if (this.chartInstance) this.chartInstance.destroy();

    Chart.defaults.color = '#64748b';
    Chart.defaults.font.family = "'Plus Jakarta Sans', sans-serif";

    this.chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: days,
        datasets: [{
          label: 'Revenue',
          data: values,
          fill: true,
          backgroundColor: grad,
          borderColor: '#e5c158',
          borderWidth: 2.5,
          pointBackgroundColor: '#e5c158',
          pointBorderColor: '#080b12',
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 7,
          tension: 0.38
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(14,18,30,0.96)',
            borderColor: 'rgba(229,193,88,0.3)',
            borderWidth: 1,
            padding: 12,
            titleFont: { family: "'Plus Jakarta Sans', sans-serif", size: 13, weight: '700' },
            bodyFont:  { family: "'Plus Jakarta Sans', sans-serif", size: 14 },
            callbacks: {
              label: ctx => '  Revenue: ' + formatCurrency(ctx.parsed.y)
            }
          }
        },
        scales: {
          x: {
            grid: { color: 'rgba(255,255,255,0.03)', drawBorder: false },
            ticks: { color: '#64748b', font: { size: 11, weight: '600' } }
          },
          y: {
            grid: { color: 'rgba(255,255,255,0.03)', drawBorder: false },
            ticks: {
              color: '#64748b', font: { size: 11, weight: '600' },
              callback: v => '$' + v.toFixed(0)
            }
          }
        }
      }
    });
  },

  renderRecent(orders) {
    const el = document.getElementById('recent-orders-list');
    if (!orders.length) {
      el.innerHTML = '<div class="empty-state"><div class="empty-icon">📋</div><div class="empty-text">No orders yet</div></div>';
      return;
    }
    el.innerHTML = orders.map(o => `
      <div style="display:flex;align-items:center;gap:14px;padding:14px 22px;border-bottom:1px solid rgba(255,255,255,.03);transition:background 0.15s;"
           onmouseover="this.style.background='rgba(255,255,255,.02)'"
           onmouseout="this.style.background='transparent'">
        <div style="width:38px;height:38px;border-radius:10px;background:var(--bg2);border:1px solid var(--border);display:grid;place-items:center;flex-shrink:0;font-family:var(--f-head);font-size:12px;font-weight:700;color:var(--gold)">
          #${o.id}
        </div>
        <div style="flex:1;min-width:0">
          <div style="font-weight:600;font-size:14px;color:var(--tx1);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${escHtml(o.customer)}</div>
          <div style="font-size:11.5px;color:var(--tx3);font-family:var(--f-head);margin-top:2px">${formatDateTime(o.timestamp)} ${o.table_num ? '· Table ' + o.table_num : ''}</div>
        </div>
        <div style="text-align:right;flex-shrink:0">
          <div style="font-family:var(--f-head);font-size:14.5px;font-weight:700;color:var(--gold-light)">${formatCurrency(o.total)}</div>
          <div style="margin-top:2px">${statusBadge(o.status)}</div>
        </div>
      </div>
    `).join('');
  }
};
