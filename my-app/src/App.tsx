import { useState } from "react";

// ── 데이터 ──────────────────────────────────────────────
const STOCKS = [
  { id: "004521", name: "삼성전자", price: 123212, change: 4000, changeRate: 1.21, up: true },
  { id: "002920", name: "SK하이닉스", price: 83701, change: 1300, changeRate: 0.72, up: false },
  { id: "007288", name: "현대차", price: 91212, change: 2192, changeRate: 3.91, up: true },
  { id: "004590", name: "한화솔루션", price: 347900, change: 7655, changeRate: 4.15, up: true },
  { id: "002920b", name: "HD현대", price: 113964, change: 8450, changeRate: 7.69, up: false },
  { id: "008112", name: "HD현대일렉트릭", price: 55320, change: 12304, changeRate: 9.10, up: false },
  { id: "003044", name: "키움증권", price: 453001, change: 5320, changeRate: 0.36, up: false },
  { id: "005502", name: "삼성전기", price: 210238, change: 23200, changeRate: 7.30, up: true },
  { id: "006524", name: "LG", price: 173000, change: 17300, changeRate: 1.00, up: false },
  { id: "001120", name: "넥슨", price: 112003, change: 7239, changeRate: 2.29, up: true },
  { id: "004037", name: "효성중공업", price: 67100, change: 3800, changeRate: 3.10, up: true },
  { id: "008891", name: "셀트리온", price: 345900, change: 7800, changeRate: 4.10, up: false },
  { id: "001203", name: "한국전력", price: 112900, change: 800, changeRate: 0.90, up: false },
  { id: "009889", name: "하이브", price: 167100, change: 8800, changeRate: 4.00, up: true },
];

const BRIEFINGS = [
  "트럼프 관세 착전에 다시 한번 반등한 방산주 20% 까지 ...",
  "연준의 금리 인하에 따른 기술주 급락 이대로라면 추가하방 ...",
  "레버리지 끌어다 당긴 개미들 주가 하락에 따른 손실은 이 ...",
  "최태원 회장일본과 한일공동 경제 협력 체제 컨금 ...",
];

const SIMULATIONS = [
  { label: "목표 수익률", value: 30 },
  { label: "포트폴리오 달성", value: 70 },
  { label: "리스크 분산도", value: 50 },
];

// ── Header ───────────────────────────────────────────────
function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <a href="/" className="logo-link" aria-label="AI STOCK 홈">
          <div className="logo">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <polyline points="4,28 10,18 16,22 22,10 28,14 32,6" stroke="#e8442a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <circle cx="32" cy="6" r="2.5" fill="#e8442a"/>
            </svg>
            <span className="logo-text">AI STOCK</span>
          </div>
        </a>
        <nav className="nav">
          {["홈", "시황", "시뮬레이션", "AI재무설계 진단", "내 계좌"].map((item) => (
            <a key={item} href={`/${item === "홈" ? "" : encodeURIComponent(item)}`} className="nav-link">
              {item}
            </a>
          ))}
        </nav>
      </div>
      <div className="header-right">
        <input className="search-input" type="text" placeholder="검색하세요" />
        <button className="login-btn">로그인</button>
      </div>
    </header>
  );
}

// ── Sidebar ──────────────────────────────────────────────
function Sidebar() {
  const [open, setOpen] = useState<string | null>(null); // null | 'expand' | '내투자' | '관심' | '최근 본'

    const handleToggle = (key: string) => setOpen(open === key ? null : key);
    
  const sideItems = ["내 투자", "관심", "최근 본"];

  return (
    <aside className="sidebar">
      <button className="sidebar-toggle" onClick={() => handleToggle("expand")} title="펼치기">
        <span className={`toggle-arrow ${open === "expand" ? "open" : ""}`}>&gt;&gt;</span>
      </button>

      {sideItems.map((item) => (
        <div key={item} className="sidebar-item-wrap">
          <button className="sidebar-icon-btn" onClick={() => handleToggle(item)} title={item}>
            {item === "내 투자" && (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
              </svg>
            )}
            {item === "관심" && (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            )}
            {item === "최근 본" && (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
            )}
            <span className="sidebar-label">{item}</span>
          </button>
          <div className={`sidebar-panel ${open === item ? "visible" : ""}`}>
            <div className="sidebar-panel-inner">
              <p className="panel-title">{item}</p>
              <p className="panel-empty">데이터가 없습니다.</p>
            </div>
          </div>
        </div>
      ))}

      <div className={`sidebar-expand-panel ${open === "expand" ? "visible" : ""}`}>
        <div className="sidebar-panel-inner">
          <p className="panel-title">빠른 메뉴</p>
          {["대시보드", "포트폴리오", "뉴스"].map((m) => (
            <a key={m} href={`/${m}`} className="panel-menu-link">{m}</a>
          ))}
        </div>
      </div>
    </aside>
  );
}

// ── LiveChart ────────────────────────────────────────────
function LiveChart() {
  const [filter, setFilter] = useState("가격순");

  const sorted = [...STOCKS].sort((a, b) => {
    if (filter === "가격순") return b.price - a.price;
    if (filter === "급상승") return (b.up ? b.changeRate : -b.changeRate) - (a.up ? a.changeRate : -a.changeRate);
    if (filter === "급하락") return (a.up ? a.changeRate : -a.changeRate) - (b.up ? b.changeRate : -b.changeRate);
    return 0;
  });

  return (
    <section className="live-chart">
      <div className="chart-header">
        <h2 className="chart-title">실시간 차트</h2>
        <div className="chart-filters">
          {["가격순", "급상승", "급하락"].map((opt) => (
            <label key={opt} className={`filter-label ${filter === opt ? "active" : ""}`}>
              <input
                type="radio"
                name="chartFilter"
                value={opt}
                checked={filter === opt}
                onChange={() => setFilter(opt)}
                className="filter-radio"
              />
              {opt}
            </label>
          ))}
        </div>
      </div>
      <div className="stock-list">
        {sorted.map((stock) => (
          <div key={stock.id} className="stock-row">
            <div className="stock-left">
              <button className="fav-btn" aria-label="관심 추가">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </button>
              <div>
                <p className="stock-name">{stock.name}</p>
                <p className="stock-id">{stock.id.replace("b", "")}</p>
              </div>
            </div>
            <div className="stock-right">
              <p className="stock-price">{stock.price.toLocaleString()}원</p>
              <p className={`stock-change ${stock.up ? "up" : "down"}`}>
                {stock.up ? "▲" : "▼"} {stock.change.toLocaleString()} ({stock.changeRate}%)
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── AIChat ───────────────────────────────────────────────
function AIChat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { from: "ai", text: "선택하신 종목들을 분석한 결과, 전기와 배터리 비중이 높습니다. 분산 투자가 필요하신가요?" },
    { from: "ai", text: "방산,반도체,AI,우주 항공 분야를 기반으로 분산 투자를 추천드립니다. 종목 추천해드릴까요?" },
  ]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { from: "user", text: input }]);
    setInput("");
  };

  return (
    <section className="ai-chat card">
      <h3 className="card-title">AI 재무설계사 진단</h3>
      <div className="chat-body">
        {messages.map((m, i) => (
          <div key={i} className={`chat-bubble ${m.from}`}>{m.text}</div>
        ))}
      </div>
      <div className="chat-input-row">
        <input
          className="chat-input"
          type="text"
          placeholder="AI에게 물어보기"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button className="send-btn" onClick={handleSend}>전송</button>
      </div>
    </section>
  );
}

// ── AIBriefing ───────────────────────────────────────────
function AIBriefing() {
  return (
    <section className="ai-briefing card">
      <h3 className="card-title">맞춤 AI 시황 브리핑</h3>
      <ul className="briefing-list">
        {BRIEFINGS.map((b, i) => (
          <li key={i} className="briefing-item">
            <span className="bullet">•</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

// ── Simulation ───────────────────────────────────────────
function Simulation() {
  const [sims, setSims] = useState(SIMULATIONS);

  const handleAdd = () => {
    setSims([...sims, { label: `시뮬레이션 ${sims.length + 1}`, value: Math.floor(Math.random() * 80) + 10 }]);
  };

  return (
    <section className="simulation card">
      <h3 className="card-title">목표 도달 시뮬레이션</h3>
      <div className="sim-list">
        {sims.map((s, i) => (
          <div key={i} className="sim-row">
            <div className="sim-bar-wrap">
              <div className="sim-bar" style={{ width: `${s.value}%` }} />
            </div>
            <span className="sim-pct">{s.value}%</span>
          </div>
        ))}
      </div>
      <button className="add-btn" onClick={handleAdd}>추가</button>
    </section>
  );
}

// ── Footer ───────────────────────────────────────────────
function Footer() {
  const links = ["개인정보 처리 방침", "투자유의 사항", "이용자 권리 및 유의사항", "신용정보 활용체제"];
  return (
    <footer className="footer">
      <nav className="footer-nav">
        {links.map((l) => (
          <a key={l} href={`/${encodeURIComponent(l)}`} className="footer-link">{l}</a>
        ))}
      </nav>
      <div className="footer-info">
        <label>대표 : 김진우, 박찬서, 전우혁, 전유진</label>
        <label>주소 : 08221 서울특별시 구로구 경인로 445 동양미래대학</label>
        <label>호스팅 : www.aiinvestment.com</label>
      </div>
      <p className="footer-disclaimer">
        AI Investment에서 제공하는 투자 정보와 서비스는 고객의 투자 판단을 위한 단순 참고용일 뿐, 투자 제안 및 권유, 종목 추천을 위해 작성된 것이 아닙니다.
      </p>
    </footer>
  );
}

// ── App ──────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&family=Bebas+Neue&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg: #0d0f14;
          --surface: #161921;
          --surface2: #1e2230;
          --border: #2a2f3e;
          --text: #e2e6f0;
          --muted: #6b7280;
          --accent: #e8442a;
          --up: #e84040;
          --down: #3a8ef6;
          --radius: 10px;
        }

        body { background: var(--bg); color: var(--text); font-family: 'Noto Sans KR', sans-serif; font-size: 13px; }

        /* ── HEADER ── */
        .header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 28px; height: 64px; background: var(--surface);
          border-bottom: 1px solid var(--border); position: sticky; top: 0; z-index: 100;
        }
        .header-left { display: flex; align-items: center; gap: 32px; }
        .logo-link { text-decoration: none; }
        .logo { display: flex; align-items: center; gap: 8px; }
        .logo-text { font-family: 'Bebas Neue', sans-serif; font-size: 22px; letter-spacing: 2px; color: var(--accent); }
        .nav { display: flex; gap: 4px; }
        .nav-link {
          padding: 6px 14px; text-decoration: none; color: var(--muted); font-size: 13px; font-weight: 500;
          border-radius: 6px; transition: color .2s, background .2s;
        }
        .nav-link:hover { color: var(--text); background: var(--surface2); }
        .header-right { display: flex; align-items: center; gap: 12px; }
        .search-input {
          background: var(--surface2); border: 1px solid var(--border); border-radius: 20px;
          padding: 7px 16px; color: var(--text); font-size: 13px; width: 200px; outline: none;
          transition: border-color .2s;
        }
        .search-input::placeholder { color: var(--muted); }
        .search-input:focus { border-color: var(--accent); }
        .login-btn {
          background: transparent; border: 1px solid var(--border); color: var(--text);
          padding: 7px 20px; border-radius: 20px; cursor: pointer; font-size: 13px;
          transition: background .2s, border-color .2s;
        }
        .login-btn:hover { background: var(--surface2); border-color: var(--accent); }

        /* ── LAYOUT ── */
        .layout { display: flex; min-height: calc(100vh - 64px); }
        .main-content { flex: 1; display: flex; flex-direction: column; }
        .body-grid {
          display: grid; grid-template-columns: 1fr 320px;
          gap: 20px; padding: 24px 24px 24px 0; flex: 1;
        }
        .right-col { display: flex; flex-direction: column; gap: 16px; }

        /* ── SIDEBAR ── */
        .sidebar {
          width: 56px; background: var(--surface); border-right: 1px solid var(--border);
          display: flex; flex-direction: column; align-items: center;
          padding: 12px 0; gap: 4px; position: relative; z-index: 50;
        }
        .sidebar-toggle, .sidebar-icon-btn {
          background: none; border: none; cursor: pointer; color: var(--muted);
          display: flex; flex-direction: column; align-items: center; gap: 3px;
          padding: 10px 6px; border-radius: 8px; width: 100%;
          transition: color .2s, background .2s; font-size: 10px;
        }
        .sidebar-toggle:hover, .sidebar-icon-btn:hover { color: var(--text); background: var(--surface2); }
        .toggle-arrow { font-size: 12px; transition: transform .3s; display: block; }
        .toggle-arrow.open { transform: rotate(180deg); }
        .sidebar-label { font-size: 10px; }
        .sidebar-item-wrap { position: relative; width: 100%; }
        .sidebar-panel, .sidebar-expand-panel {
          position: absolute; left: 56px; top: 0;
          width: 200px; background: var(--surface2); border: 1px solid var(--border);
          border-radius: 0 var(--radius) var(--radius) 0;
          transform: translateX(-16px); opacity: 0; pointer-events: none;
          transition: transform .25s ease, opacity .25s ease;
        }
        .sidebar-expand-panel { top: 0; left: 56px; }
        .sidebar-panel.visible, .sidebar-expand-panel.visible {
          transform: translateX(0); opacity: 1; pointer-events: all;
        }
        .sidebar-panel-inner { padding: 16px; }
        .panel-title { font-weight: 700; font-size: 13px; margin-bottom: 8px; color: var(--text); }
        .panel-empty { font-size: 12px; color: var(--muted); }
        .panel-menu-link { display: block; padding: 6px 0; color: var(--muted); text-decoration: none; font-size: 13px; }
        .panel-menu-link:hover { color: var(--text); }

        /* ── LIVE CHART ── */
        .live-chart {
          background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius);
          padding: 20px; overflow: hidden;
        }
        .chart-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
        .chart-title { font-size: 16px; font-weight: 700; }
        .chart-filters { display: flex; gap: 2px; }
        .filter-radio { display: none; }
        .filter-label {
          padding: 5px 12px; border-radius: 6px; cursor: pointer; font-size: 12px; color: var(--muted);
          transition: color .2s, background .2s; user-select: none;
        }
        .filter-label.active { color: var(--text); background: var(--surface2); font-weight: 600; }
        .filter-label:hover { color: var(--text); }
        .stock-list { display: flex; flex-direction: column; gap: 2px; max-height: 520px; overflow-y: auto; }
        .stock-list::-webkit-scrollbar { width: 4px; }
        .stock-list::-webkit-scrollbar-track { background: transparent; }
        .stock-list::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }
        .stock-row {
          display: flex; align-items: center; justify-content: space-between;
          padding: 10px 12px; border-radius: 8px; transition: background .15s; cursor: pointer;
        }
        .stock-row:hover { background: var(--surface2); }
        .stock-left { display: flex; align-items: center; gap: 10px; }
        .fav-btn { background: none; border: none; cursor: pointer; padding: 2px; display: flex; align-items: center; }
        .stock-name { font-size: 13px; font-weight: 600; }
        .stock-id { font-size: 11px; color: var(--muted); margin-top: 1px; }
        .stock-right { text-align: right; }
        .stock-price { font-size: 14px; font-weight: 700; font-variant-numeric: tabular-nums; }
        .stock-change { font-size: 11px; margin-top: 2px; font-variant-numeric: tabular-nums; }
        .up { color: var(--up); }
        .down { color: var(--down); }

        /* ── CARDS ── */
        .card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 20px; }
        .card-title { font-size: 15px; font-weight: 700; margin-bottom: 16px; }

        /* ── AI CHAT ── */
        .chat-body { display: flex; flex-direction: column; gap: 10px; min-height: 100px; margin-bottom: 14px; }
        .chat-bubble {
          padding: 10px 14px; border-radius: 10px; font-size: 12px; line-height: 1.6; max-width: 90%;
        }
        .chat-bubble.ai { background: var(--surface2); color: var(--text); align-self: flex-start; }
        .chat-bubble.user { background: var(--accent); color: #fff; align-self: flex-end; border-radius: 10px 10px 0 10px; }
        .chat-input-row { display: flex; gap: 8px; }
        .chat-input {
          flex: 1; background: var(--surface2); border: 1px solid var(--border); border-radius: 8px;
          padding: 8px 12px; color: var(--text); font-size: 13px; outline: none;
          transition: border-color .2s;
        }
        .chat-input:focus { border-color: var(--accent); }
        .send-btn {
          background: var(--accent); color: #fff; border: none; border-radius: 8px;
          padding: 8px 16px; cursor: pointer; font-size: 13px; font-weight: 600;
          transition: opacity .2s;
        }
        .send-btn:hover { opacity: .85; }

        /* ── BRIEFING ── */
        .briefing-list { list-style: none; display: flex; flex-direction: column; gap: 10px; }
        .briefing-item { display: flex; gap: 8px; font-size: 12px; color: var(--text); line-height: 1.5; }
        .bullet { color: var(--accent); flex-shrink: 0; }

        /* ── SIMULATION ── */
        .sim-list { display: flex; flex-direction: column; gap: 10px; margin-bottom: 16px; }
        .sim-row { display: flex; align-items: center; gap: 10px; }
        .sim-bar-wrap {
          flex: 1; height: 8px; background: var(--surface2); border-radius: 4px; overflow: hidden;
        }
        .sim-bar { height: 100%; background: var(--muted); border-radius: 4px; transition: width .4s ease; }
        .sim-pct { font-size: 12px; color: var(--muted); width: 32px; text-align: right; }
        .add-btn {
          background: var(--surface2); border: 1px solid var(--border); color: var(--text);
          padding: 8px 24px; border-radius: 8px; cursor: pointer; font-size: 13px;
          transition: background .2s; display: block; margin: 0 auto;
        }
        .add-btn:hover { background: var(--border); }

        /* ── FOOTER ── */
        .footer {
          background: var(--surface); border-top: 1px solid var(--border);
          padding: 24px 80px; display: flex; flex-direction: column; gap: 12px;
        }
        .footer-nav { display: flex; gap: 24px; flex-wrap: wrap; }
        .footer-link { color: var(--muted); text-decoration: none; font-size: 12px; transition: color .2s; }
        .footer-link:hover { color: var(--text); }
        .footer-info { display: flex; flex-direction: column; gap: 4px; }
        .footer-info label { font-size: 12px; color: var(--muted); }
        .footer-disclaimer { font-size: 11px; color: var(--muted); line-height: 1.6; }
      `}</style>

      <Header />
      <div className="layout">
        <Sidebar />
        <div className="main-content">
          <div className="body-grid">
            <LiveChart />
            <div className="right-col">
              <AIChat />
              <AIBriefing />
              <Simulation />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}