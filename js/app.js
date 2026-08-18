// 초기화, 이벤트 바인딩, 타이머 시작
let appState = null;
let marketIntervalId = null;

function init() {
  appState = Storage.load() || Storage.createInitialState();
  Storage.save(appState);
  UI.init();
  UI.renderAll(appState);
  bindEvents();
  startMarket();
}

function bindEvents() {
  UI.elements.stockGrid.addEventListener('click', onStockGridClick);
  UI.elements.resetBtn.addEventListener('click', onReset);
}

function onStockGridClick(e) {
  const btn = e.target.closest('button[data-action]');
  if (!btn) return;

  const symbol = btn.dataset.symbol;
  const action = btn.dataset.action;
  const input = document.getElementById(`qty-input-${symbol}`);
  const qty = parseInt(input.value, 10);

  const result = action === 'buy' ? Portfolio.buy(appState, symbol, qty) : Portfolio.sell(appState, symbol, qty);

  if (result.ok) {
    input.value = '';
    Storage.save(appState);
    UI.renderAll(appState);
    UI.showMessage(symbol, action === 'buy' ? '매수 완료' : '매도 완료', false);
  } else {
    UI.showMessage(symbol, result.message, true);
  }
}

function onReset() {
  const confirmed = confirm('정말 초기화하시겠습니까? 모든 거래 내역과 자산이 초기 상태로 돌아갑니다.');
  if (!confirmed) return;

  Storage.clear();
  appState = Storage.createInitialState();
  Storage.save(appState);
  UI.renderAll(appState);
}

function startMarket() {
  if (marketIntervalId) clearInterval(marketIntervalId);
  marketIntervalId = setInterval(() => {
    Market.tick(appState);
    Storage.save(appState);
    UI.renderAll(appState);
  }, PRICE_UPDATE_INTERVAL_MS);
}

document.addEventListener('DOMContentLoaded', init);
