// localStorage 저장/불러오기 담당
const Storage = {
  load() {
    let raw;
    try {
      raw = localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      console.error('localStorage 접근 실패:', e);
      return null;
    }
    if (!raw) return null;

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (e) {
      console.error('저장된 상태 파싱 실패:', e);
      return null;
    }

    if (!Storage._isValidState(parsed)) {
      console.warn('저장된 상태의 형식이 올바르지 않아 초기 상태로 대체합니다.');
      return null;
    }

    // 이전 버전에 없던 종목이 추가된 경우를 대비해 누락된 가격을 보정
    STOCKS.forEach(({ symbol }) => {
      if (typeof parsed.prices[symbol] !== 'number' || !Number.isFinite(parsed.prices[symbol])) {
        parsed.prices[symbol] = INITIAL_PRICES[symbol];
      }
    });

    return parsed;
  },

  save(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('상태 저장 실패:', e);
    }
  },

  clear() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('상태 초기화 실패:', e);
    }
  },

  createInitialState() {
    const prices = {};
    STOCKS.forEach(({ symbol }) => {
      prices[symbol] = INITIAL_PRICES[symbol];
    });
    return {
      cash: INITIAL_CASH,
      holdings: {},
      prices,
      transactions: [],
    };
  },

  _isValidState(parsed) {
    return (
      parsed &&
      typeof parsed === 'object' &&
      typeof parsed.cash === 'number' &&
      Number.isFinite(parsed.cash) &&
      parsed.prices &&
      typeof parsed.prices === 'object' &&
      parsed.holdings &&
      typeof parsed.holdings === 'object' &&
      Array.isArray(parsed.transactions)
    );
  },
};
