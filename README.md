<div align="center">

# 📈 Random Stock Trading Simulator

### 모의 주식 트레이딩

실제 시장처럼 계속 변하는 주가를 보며
가상의 자금으로 주식을 사고팔아 볼 수 있는 **랜덤 주식 매매 시뮬레이터**입니다.

<br>

[📈 **트레이딩 시작하기**](https://jaeheon777.github.io/random-trading/)

</div>

---

## 📖 About

**Random Stock Trading Simulator**는 실제 주식 시장 데이터를 사용하지 않고,
JavaScript로 생성되는 랜덤한 가격 변동을 기반으로 주식 거래를 체험할 수 있는 웹 프로젝트입니다.

**$10,000**의 초기 자금으로 시작하여 4개의 종목을 매수·매도할 수 있으며,
가격 변화에 따라 보유 주식의 평가금액과 전체 자산, 수익률이 실시간으로 변화합니다.

실제 금융 서비스가 아닌, 재미와 웹 프로그래밍 연습을 목적으로 제작했습니다.

---

## ✨ Features

* 📈 실시간처럼 지속적으로 변화하는 랜덤 주가
* 🔴 주가 상승 시 **빨간색** 표시
* 🟢 주가 하락 시 **초록색** 표시
* 💵 **$10,000**의 가상 초기 자금
* 🛒 원하는 수량만큼 주식 매수
* 💸 보유 주식 매도
* 📦 종목별 보유 수량 표시
* 💰 평균 매수가 및 평가금액 계산
* 📊 종목별 수익률 계산
* 💼 총 자산가치 / 현금 / 전체 수익률 실시간 반영
* 🧾 매수·매도 거래 내역 기록
* 🔄 초기화 기능
* 🌐 서버 없이 브라우저에서 모든 로직 처리

---

## 📊 Stocks

시뮬레이션에서는 다음 4개 종목을 사용합니다.

|  Ticker | Name             |
| :-----: | ---------------- |
|  `AAPL` | Apple Inc.       |
|  `NVDA` | NVIDIA Corp.     |
| `GOOGL` | Alphabet Inc.    |
|  `SPY`  | SPDR S&P 500 ETF |

> 종목명과 초기 가격은 실제 시장을 참고했지만,
> 이후의 가격 변동은 실제 시세와 관계없이 무작위로 생성됩니다.

---

## 🛠 Tech Stack

<p>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white"/>
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white"/>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"/>
</p>

* **HTML5** — 페이지 구조 및 트레이딩 인터페이스
* **CSS3** — 다크 테마 및 반응형 UI
* **JavaScript** — 랜덤 주가 변동, 매수·매도, 포트폴리오 및 수익률 계산

---

## 🎮 How It Works

1. **$10,000**의 가상 자금으로 시작합니다.
2. 각 종목의 주가는 일정 시간마다 랜덤하게 변화합니다.
3. 가격이 상승하면 🔴 빨간색, 하락하면 🟢 초록색으로 표시됩니다.
4. 원하는 종목과 수량을 선택해 현재 가격으로 매수합니다.
5. 보유 중인 주식은 현재 가격으로 다시 매도할 수 있습니다.
6. 가격 변화와 거래에 따라 평가금액과 수익률이 자동으로 계산됩니다.
7. 모든 거래는 하단의 거래 내역에서 확인할 수 있습니다.

---

<!--
## 📸 Screenshots

### Trading Dashboard

![Trading Dashboard](YOUR_SCREENSHOT_URL)

---
-->

## 🚀 Demo

### 👉 [Random Stock Trading Simulator 실행하기](https://jaeheon777.github.io/random-trading/)

GitHub Pages를 통해 배포되어 있으며,
별도의 로그인이나 설치 없이 브라우저에서 바로 실행할 수 있습니다.

---

## 💻 Run Locally

Repository를 clone합니다.

```bash
git clone https://github.com/jaeheon777/random-trading
```

이후 `index.html`을 브라우저에서 실행하면 됩니다.

별도의 서버, 데이터베이스 또는 패키지 설치가 필요하지 않습니다.

---

## ⚠️ Disclaimer

이 프로젝트는 **프로그래밍 연습 및 재미를 목적으로 제작한 모의 주식 거래 웹사이트**입니다.

표시되는 주가는 무작위로 생성되며 실제 시장 데이터와 연동되지 않습니다.
실제 투자 정보나 금융 서비스를 제공하지 않으며, 투자 판단을 위한 용도로 사용할 수 없습니다.

---

<div align="center">

### 📈 Buy. Sell. Hope.

**No real money was harmed in the making of this project.**

</div>

