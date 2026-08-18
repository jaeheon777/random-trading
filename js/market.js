// 가격 랜덤 변동 시뮬레이션
const Market = {
  // state.prices 를 직접 갱신한다.
  tick(state) {
    STOCKS.forEach(({ symbol }) => {
      const price = state.prices[symbol];
      const changePct =
        (Math.random() * (PRICE_MAX_CHANGE_PCT - PRICE_MIN_CHANGE_PCT) + PRICE_MIN_CHANGE_PCT) / 100;
      const direction = Math.random() < 0.5 ? -1 : 1;
      let newPrice = price * (1 + direction * changePct);
      newPrice = Math.max(0.01, newPrice); // 가격이 0 이하로 내려가지 않도록 보호
      state.prices[symbol] = Math.round(newPrice * 100) / 100;
    });
    return state;
  },
};
