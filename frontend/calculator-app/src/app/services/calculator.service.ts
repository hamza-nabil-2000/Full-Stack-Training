import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  private display = signal<string>('0');
  private history = signal<string>('');
  private currentMode = signal<'standard' | 'currency'>('standard');
  private fromCurrency = signal<string>('USD');
  private toCurrency = signal<string>('EUR');
  private rates = signal<Record<string, number>>({});
  private conversionResult = signal<string>('');
  private currencies = signal<string[]>(['USD', 'EUR', 'GBP', 'JPY', 'PKR', 'INR', 'AED', 'SAR', 'CAD', 'AUD', 'CNY', 'CHF', 'TRY']);
  private currencyNames = signal<Record<string, string>>({
    'USD': 'United States Dollar',
    'EUR': 'Euro',
    'GBP': 'British Pound Sterling',
    'JPY': 'Japanese Yen',
    'PKR': 'Pakistani Rupee',
    'INR': 'Indian Rupee',
    'AED': 'United Arab Emirates Dirham',
    'SAR': 'Saudi Riyal',
    'CAD': 'Canadian Dollar',
    'AUD': 'Australian Dollar',
    'CNY': 'Chinese Yuan',
    'CHF': 'Swiss Franc',
    'TRY': 'Turkish Lira'
  });
  private lastUpdated = signal<string>('');
  private refreshInterval: any;
  private catalogLoaded = false;

  // Arithmetic state
  private previousValue: number | null = null;
  private currentOperator: string | null = null;
  private shouldResetDisplay = false;

  getDisplay() { return this.display; }
  getHistory() { return this.history; }
  getMode() { return this.currentMode; }
  getFromCurrency() { return this.fromCurrency; }
  getToCurrency() { return this.toCurrency; }
  getCurrencies() { return this.currencies; }
  getCurrencyNames() { return this.currencyNames; }
  getRates() { return this.rates; }
  getLastUpdated() { return this.lastUpdated; }
  getConversionResult() { return this.conversionResult; }

  setMode(mode: 'standard' | 'currency') {
    this.currentMode.set(mode);
    this.clear();
    this.conversionResult.set('');
  }

  clearConversionResult() {
    this.conversionResult.set('');
  }

  setFromCurrency(code: string) { this.fromCurrency.set(code); }
  setToCurrency(code: string) { this.toCurrency.set(code); }

  processInput(input: string) {
    if (this.currentMode() === 'currency') {
      this.handleCurrencyInput(input);
      return;
    }

    if (/[0-9.]/.test(input)) {
      this.handleNumber(input);
    } else if (['+', '-', '*', '/'].includes(input)) {
      this.handleOperator(input);
    } else if (input === '=') {
      this.calculate();
    } else if (input === 'C') {
      this.clear();
    } else if (input === 'sqrt') {
      this.sqrt();
    } else if (input === 'pow') {
      this.handleOperator('pow');
    }
  }

  private handleNumber(num: string) {
    if (this.shouldResetDisplay) {
      this.display.set(num === '.' ? '0.' : num);
      this.shouldResetDisplay = false;
    } else {
      const current = this.display();
      if (num === '.' && current.includes('.')) return;
      this.display.set(current === '0' && num !== '.' ? num : current + num);
    }
  }

  private handleOperator(op: string) {
    const current = parseFloat(this.display());
    if (this.previousValue === null) {
      this.previousValue = current;
    } else if (this.currentOperator) {
      this.calculate();
      this.previousValue = parseFloat(this.display());
    }
    this.currentOperator = op;
    this.history.set(`${this.previousValue} ${op}`);
    this.shouldResetDisplay = true;
  }

  private calculate() {
    if (this.previousValue === null || !this.currentOperator) return;
    const current = parseFloat(this.display());
    let result = 0;

    switch (this.currentOperator) {
      case '+': result = this.previousValue + current; break;
      case '-': result = this.previousValue - current; break;
      case '*': result = this.previousValue * current; break;
      case '/': result = current !== 0 ? this.previousValue / current : NaN; break;
      case 'pow': result = Math.pow(this.previousValue, current); break;
    }

    this.display.set(result.toString());
    this.history.set(`${this.previousValue} ${this.currentOperator} ${current} =`);
    this.previousValue = null;
    this.currentOperator = null;
    this.shouldResetDisplay = true;
  }

  private sqrt() {
    const current = parseFloat(this.display());
    if (current < 0) {
      this.display.set('Error');
    } else {
      const result = Math.sqrt(current);
      this.display.set(result.toString());
      this.history.set(`√(${current})`);
    }
    this.shouldResetDisplay = true;
  }

  private toggleSign() {
    const current = this.display();
    this.display.set(current.startsWith('-') ? current.slice(1) : '-' + current);
  }

  private percentage() {
    const current = parseFloat(this.display());
    this.display.set((current / 100).toString());
  }

  private clear() {
    this.display.set('0');
    this.history.set('');
    this.previousValue = null;
    this.currentOperator = null;
    this.shouldResetDisplay = false;
  }

  private handleCurrencyInput(input: string) {
    if (/[0-9.]/.test(input)) {
        this.handleNumber(input);
    } else if (input === 'C') {
        this.clear();
    } else if (input === '=') {
        this.convert();
    }
  }

  private async convert() {
    const amount = parseFloat(this.display());
    if (isNaN(amount)) return;

    this.history.set(`Converting ${amount} ${this.fromCurrency()}...`);
    
    try {
      const rateResponse = await fetch(`https://open.er-api.com/v6/latest/${this.fromCurrency()}`);
      const data = await rateResponse.json();
      
      if (data.result === 'success') {
          this.rates.set(data.rates);
          const rate = data.rates[this.toCurrency()];
          if (typeof rate !== 'number') {
            this.history.set(`Rate not available for ${this.toCurrency()}`);
            return;
          }
          const result = amount * rate;
          this.conversionResult.set(result.toFixed(2));
          this.history.set(`Converting ${amount} ${this.fromCurrency()} to ${this.toCurrency()}`);
          this.lastUpdated.set(new Date().toLocaleTimeString());
      } else {
          this.history.set('API Error');
      }
    } catch (error) {
      this.history.set('Conversion failed');
    }
  }

  async updateRates() {
    try {
      const res = await fetch(`https://open.er-api.com/v6/latest/${this.fromCurrency()}`);
      const data = await res.json();
      if (data.result === 'success') {
        this.rates.set(data.rates);
        this.lastUpdated.set(new Date().toLocaleTimeString());
      }
    } catch (e) {
      console.error('Failed to update rates');
    }
  }

  private buildCurrencyNames(codes: string[]) {
    const names: Record<string, string> = {};

    // Best effort: use built-in Intl currency display names when available.
    const DisplayNamesCtor: typeof Intl.DisplayNames | undefined = (Intl as any).DisplayNames;
    if (DisplayNamesCtor) {
      const dn = new DisplayNamesCtor([navigator.language || 'en'], { type: 'currency' });
      for (const code of codes) {
        names[code] = dn.of(code) ?? code;
      }
      return names;
    }

    // Fallback: keep existing map + code as last resort.
    const existing = this.currencyNames();
    for (const code of codes) names[code] = existing[code] ?? code;
    return names;
  }

  /**
   * Loads the "full" currency catalog based on the provider's supported rates list.
   * We derive the full code set from a stable base (`USD`) and generate full names via Intl.
   */
  async loadCurrencyCatalog() {
    if (this.catalogLoaded) return;
    try {
      const res = await fetch(`https://open.er-api.com/v6/latest/USD`);
      const data = await res.json();
      if (data.result === 'success' && data.rates) {
        const codes = Object.keys(data.rates).sort();
        this.currencies.set(codes);
        this.currencyNames.set(this.buildCurrencyNames(codes));
        this.catalogLoaded = true;

        // Ensure currently selected currencies exist in the catalog.
        if (!data.rates[this.fromCurrency()]) this.fromCurrency.set('USD');
        if (!data.rates[this.toCurrency()]) this.toCurrency.set('EUR');
      }
    } catch (e) {
      console.error('Failed to load currency catalog');
    }
  }

  startPolling() {
      if (this.refreshInterval) return;
      this.refreshInterval = setInterval(() => {
          if (this.currentMode() === 'currency' && this.display() !== '0') {
              this.convert();
          }
      }, 300000); // Poll every 5 minutes
  }

  stopPolling() {
      if (this.refreshInterval) {
          clearInterval(this.refreshInterval);
          this.refreshInterval = null;
      }
  }
}
