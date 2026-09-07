import { Component, signal, OnInit, OnDestroy, inject, HostListener, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalculatorService } from './services/calculator.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit, OnDestroy {
  private calcService = inject(CalculatorService);
  private eRef = inject(ElementRef);

  @ViewChild('fromWrapper') fromWrapper!: ElementRef;
  @ViewChild('toWrapper') toWrapper!: ElementRef;

  display = this.calcService.getDisplay();
  history = this.calcService.getHistory();
  mode = this.calcService.getMode();
  lastUpdated = this.calcService.getLastUpdated();
  conversionResult = this.calcService.getConversionResult();

  fromCode = 'USD';
  toCode = 'EUR';

  fromSearch = '';
  toSearch = '';
  fromDropdownOpen = false;
  toDropdownOpen = false;

  currencies = this.calcService.getCurrencies();
  currencyNames = this.calcService.getCurrencyNames();
  rates = this.calcService.getRates();

  filteredFromCurrencies = () =>
    this.currencies().filter((code) => {
      const term = this.fromSearch.trim().toLowerCase();
      const currentCode = this.fromCode.toLowerCase();
      const currentLabel = this.buildCurrencyLabel(this.fromCode).toLowerCase();
      
      // Show all if empty OR if it matches exactly the current label OR the code itself
      // This handles cases where labels might have loaded asynchronously.
      if (!term || term === currentLabel || term === currentCode) return true;
      
      const label = this.buildCurrencyLabel(code).toLowerCase();
      return label.includes(term);
    });

  filteredToCurrencies = () =>
    this.currencies().filter((code) => {
      const term = this.toSearch.trim().toLowerCase();
      const currentCode = this.toCode.toLowerCase();
      const currentLabel = this.buildCurrencyLabel(this.toCode).toLowerCase();
      
      // Show all if empty OR if it matches exactly the current label OR the code itself
      if (!term || term === currentLabel || term === currentCode) return true;
      
      const label = this.buildCurrencyLabel(code).toLowerCase();
      return label.includes(term);
    });

  async ngOnInit() {
    await this.calcService.loadCurrencyCatalog();
    this.calcService.updateRates();
    this.calcService.startPolling();
    // Sync initial codes
    this.fromCode = this.calcService.getFromCurrency()();
    this.toCode = this.calcService.getToCurrency()();

    // Now that catalog is loaded, labels will be correct
    this.fromSearch = this.buildCurrencyLabel(this.fromCode);
    this.toSearch = this.buildCurrencyLabel(this.toCode);
  }

  ngOnDestroy() {
    this.calcService.stopPolling();
  }

  onInput(val: string) {
    this.calcService.processInput(val);
  }

  private buildCurrencyLabel(code: string): string {
    const name = this.currencyNames()[code];
    return name ? `${code} - ${name}` : code;
  }

  onFromSearchChange(term: string) {
    this.fromSearch = term;
  }

  onToSearchChange(term: string) {
    this.toSearch = term;
  }

  selectFromCurrency(code: string) {
    this.fromCode = code;
    this.fromSearch = this.buildCurrencyLabel(code);
    this.fromDropdownOpen = false;
    this.onFromCurrencyChange();
  }

  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    if (this.fromDropdownOpen && !this.fromWrapper.nativeElement.contains(event.target)) {
      this.fromDropdownOpen = false;
    }
    if (this.toDropdownOpen && !this.toWrapper.nativeElement.contains(event.target)) {
      this.toDropdownOpen = false;
    }
  }

  selectToCurrency(code: string) {
    this.toCode = code;
    this.toSearch = this.buildCurrencyLabel(code);
    this.toDropdownOpen = false;
    this.onToCurrencyChange();
  }

  onFromBlur() {
    setTimeout(() => {
      this.fromDropdownOpen = false;
    }, 150);
  }

  onToBlur() {
    setTimeout(() => {
      this.toDropdownOpen = false;
    }, 150);
  }

  onFromCurrencyChange() {
    this.calcService.setFromCurrency(this.fromCode);
    this.fromSearch = this.buildCurrencyLabel(this.fromCode);
    this.calcService.updateRates();
  }

  onToCurrencyChange() {
    this.calcService.setToCurrency(this.toCode);
    this.toSearch = this.buildCurrencyLabel(this.toCode);
  }

  setMode(mode: 'standard' | 'currency') {
    this.calcService.setMode(mode);
  }

  clearResult() {
    this.calcService.clearConversionResult();
  }
}
