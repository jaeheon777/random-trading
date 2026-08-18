// 화면 렌더링 (DOM 업데이트) 전담
const UI = {
  elements: {},

  init() {
    this.elements.totalValue = document.getElementById('total-value');
    this.elements.cashValue = document.getElementById('cash-value');
    this.elements.totalReturn = document.getElementById('total-return');
    this.elements.stockGrid = document.getElementById('stock-grid');
    this.elements.transactionBody = document.getElementById('transaction-body');
    this.elements.resetBtn = document.getElementById('reset-btn');

    this._buildStockCards();
  },

  _buildStockCards() {
    this.elements.stockGrid.innerHTML = '';
    STOCKS.forEach(({ symbol, name }) => {
      const card = document.createElement('div');
      card.className = 'stock-card';
      card.id = `card-${symbol}`;
      card.innerHTML = `
        <div class="stock-header">
          <div class="stock-title">
            <span class="stock-symbol">${symbol}</span>
            <span class="stock-name">${name}</span>
          </div>
          <span class="stock-price" id="price-${symbol}">$0.00</span>
        </div>
        <div class="stock-info">
          <div class="info-row"><span>보유 수량</span><span id="qty-${symbol}">0</span></div>
          <div class="info-row"><span>평균 매수가</span><span id="avg-${symbol}">-</span></div>
          <div class="info-row"><span>평가금액</span><span id="value-${symbol}">$0.00</span></div>
          <div class="info-row"><span>수익률</span><span id="return-${symbol}">-</span></div>
        </div>
        <div class="stock-actions">
          <input type="number" id="qty-input-${symbol}" min="1" step="1" placeholder="수량" class="qty-input" />
          <button class="buy-btn" data-symbol="${symbol}" data-action="buy">매수</button>
          <button class="sell-btn" data-symbol="${symbol}" data-action="sell">매도</button>
        </div>
        <div class="stock-message" id="message-${symbol}"></div>
      `;
      this.elements.stockGrid.appendChild(card);
    });
  },

  renderAll(state) {
    this._renderSummary(state);
    STOCKS.forEach(({ symbol }) => this._renderStockCard(state, symbol));
    this._renderTransactions(state);
  },

  _renderSummary(state) {
    const total = Portfolio.getTotalPortfolioValue(state);
    const returnPct = Portfolio.getTotalReturnPct(state);
    this.elements.totalValue.textContent = formatCurrency(total);
    this.elements.cashValue.textContent = formatCurrency(state.cash);
    this.elements.totalReturn.textContent = formatPercent(returnPct);
    this.elements.totalReturn.className = 'value return-value ' + returnClass(returnPct);
  },

  _renderStockCard(state, symbol) {
    const price = state.prices[symbol];
    const priceEl = document.getElementById(`price-${symbol}`);
    const prevPrice = priceEl.dataset.rawPrice !== undefined ? parseFloat(priceEl.dataset.rawPrice) : price;
    priceEl.textContent = formatCurrency(price);
    priceEl.dataset.rawPrice = String(price);

    if (price > prevPrice) {
      flashElement(priceEl, 'price-up');
    } else if (price < prevPrice) {
      flashElement(priceEl, 'price-down');
    }

    const holding = state.holdings[symbol];
    const qty = holding ? holding.qty : 0;
    document.getElementById(`qty-${symbol}`).textContent = qty;
    document.getElementById(`avg-${symbol}`).textContent = holding ? formatCurrency(holding.avgPrice) : '-';

    const value = Portfolio.getHoldingValue(state, symbol);
    document.getElementById(`value-${symbol}`).textContent = formatCurrency(value);

    const returnEl = document.getElementById(`return-${symbol}`);
    if (holding) {
      const returnPct = Portfolio.getHoldingReturnPct(state, symbol);
      returnEl.textContent = formatPercent(returnPct);
      returnEl.className = returnClass(returnPct);
    } else {
      returnEl.textContent = '-';
      returnEl.className = '';
    }
  },

  _renderTransactions(state) {
    const tbody = this.elements.transactionBody;
    if (state.transactions.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" class="empty-row">거래 내역이 없습니다.</td></tr>';
      return;
    }
    tbody.innerHTML = state.transactions
      .map(
        (tx) => `
      <tr>
        <td>${formatDateTime(tx.timestamp)}</td>
        <td>${tx.symbol}</td>
        <td class="${tx.type === 'BUY' ? 'buy-label' : 'sell-label'}">${tx.type === 'BUY' ? '매수' : '매도'}</td>
        <td>${tx.qty}</td>
        <td>${formatCurrency(tx.price)}</td>
        <td>${formatCurrency(tx.total)}</td>
      </tr>`
      )
      .join('');
  },

  showMessage(symbol, message, isError) {
    const el = document.getElementById(`message-${symbol}`);
    if (!el) return;
    el.textContent = message;
    el.className = 'stock-message ' + (isError ? 'error' : 'success');
    clearTimeout(el._timeoutId);
    el._timeoutId = setTimeout(() => {
      el.textContent = '';
      el.className = 'stock-message';
    }, 2500);
  },
};

function formatCurrency(value) {
  const sign = value < 0 ? '-$' : '$';
  return sign + Math.abs(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatPercent(value) {
  const sign = value > 0 ? '+' : '';
  return sign + value.toFixed(2) + '%';
}

function returnClass(value) {
  if (value > 0) return 'positive';
  if (value < 0) return 'negative';
  return '';
}

function formatDateTime(iso) {
  const d = new Date(iso);
  return d.toLocaleString('ko-KR', { hour12: false });
}

function flashElement(el, className) {
  el.classList.remove('price-up', 'price-down');
  void el.offsetWidth; // 리플로우를 강제해 애니메이션을 재시작
  el.classList.add(className);
  setTimeout(() => el.classList.remove(className), 800);
}
