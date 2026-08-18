// 종목 목록 (표시 순서 = 화면 표시 순서)
const STOCKS = [
  { symbol: 'AAPL', name: 'Apple Inc.' },
  { symbol: 'NVDA', name: 'NVIDIA Corp.' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.' },
  { symbol: 'SPY', name: 'SPDR S&P 500 ETF' },
];

// 종목별 초기 가격
const INITIAL_PRICES = {
  AAPL: 230.0,
  NVDA: 130.0,
  GOOGL: 180.0,
  SPY: 560.0,
};

const INITIAL_CASH = 10000;

// 가격 변동 주기 (ms)
const PRICE_UPDATE_INTERVAL_MS = 3000;

// 1틱당 변동폭 범위 (%)
const PRICE_MIN_CHANGE_PCT = 0.3;
const PRICE_MAX_CHANGE_PCT = 1.5;

// localStorage 키
const STORAGE_KEY = 'fun-trading-state-v1';
