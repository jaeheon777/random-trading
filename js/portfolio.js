// 매수/매도, 평균단가, 손익 계산 로직
const Portfolio = {
  // 매수: 수량 검증 → 평균단가 재계산 → 현금 차감 → 거래내역 기록
  buy(state, symbol, qty) {
    qty = Math.floor(qty);
    if (!Number.isFinite(qty) || qty <= 0) {
      return { ok: false, message: '올바른 수량을 입력하세요.' };
    }

    const price = state.prices[symbol];
    if (typeof price !== 'number' || !Number.isFinite(price)) {
      return { ok: false, message: '알 수 없는 종목입니다.' };
    }

    const cost = price * qty;
    // 부동소수점 오차를 감안해 아주 작은 여유(1e-9)를 둔다.
    if (cost > state.cash + 1e-9) {
      return { ok: false, message: '현금이 부족합니다.' };
    }

    const holding = state.holdings[symbol];
    if (holding && holding.qty > 0) {
      const totalCost = holding.avgPrice * holding.qty + cost;
      const totalQty = holding.qty + qty;
      holding.avgPrice = totalCost / totalQty;
      holding.qty = totalQty;
    } else {
      state.holdings[symbol] = { qty, avgPrice: price };
    }

    state.cash = Math.round((state.cash - cost) * 100) / 100;
    Portfolio._recordTransaction(state, symbol, 'BUY', qty, price);
    return { ok: true };
  },

  // 매도: 보유 수량 검증 → 수량 차감(평균단가는 유지) → 현금 증가 → 거래내역 기록
  sell(state, symbol, qty) {
    qty = Math.floor(qty);
    if (!Number.isFinite(qty) || qty <= 0) {
      return { ok: false, message: '올바른 수량을 입력하세요.' };
    }

    const holding = state.holdings[symbol];
    if (!holding || holding.qty < qty) {
      return { ok: false, message: '보유 수량이 부족합니다.' };
    }

    const price = state.prices[symbol];
    if (typeof price !== 'number' || !Number.isFinite(price)) {
      return { ok: false, message: '알 수 없는 종목입니다.' };
    }

    const proceeds = price * qty;
    holding.qty -= qty;
    state.cash = Math.round((state.cash + proceeds) * 100) / 100;

    if (holding.qty === 0) {
      delete state.holdings[symbol];
    }

    Portfolio._recordTransaction(state, symbol, 'SELL', qty, price);
    return { ok: true };
  },

  _recordTransaction(state, symbol, type, qty, price) {
    state.transactions.unshift({
      id: Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8),
      timestamp: new Date().toISOString(),
      symbol,
      type,
      qty,
      price,
      total: Math.round(price * qty * 100) / 100,
    });
  },

  getHoldingValue(state, symbol) {
    const holding = state.holdings[symbol];
    if (!holding || holding.qty <= 0) return 0;
    return holding.qty * state.prices[symbol];
  },

  getHoldingReturnPct(state, symbol) {
    const holding = state.holdings[symbol];
    if (!holding || holding.qty <= 0 || holding.avgPrice <= 0) return 0;
    const currentPrice = state.prices[symbol];
    return ((currentPrice - holding.avgPrice) / holding.avgPrice) * 100;
  },

  getTotalPortfolioValue(state) {
    let total = state.cash;
    STOCKS.forEach(({ symbol }) => {
      total += Portfolio.getHoldingValue(state, symbol);
    });
    return total;
  },

  getTotalReturnPct(state) {
    const total = Portfolio.getTotalPortfolioValue(state);
    return ((total - INITIAL_CASH) / INITIAL_CASH) * 100;
  },
};
