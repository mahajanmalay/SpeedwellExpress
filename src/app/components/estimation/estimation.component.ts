// import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-estimation',
  templateUrl: './estimation.component.html',
  styleUrl: './estimation.component.css'
})
export class EstimationComponent implements OnInit{
    packageWeight: number = 0;
    weightUnit: string = 'g';
    destinationType: string = '';
    transportMethod: string = '';
    estimatedPrice: number | undefined;

    prices: any = {
      'Pune&PCMC': { byRoad: { base: 50, perKg: 60 } },
      'Mumbai': { byRoad: { base: 60, perKg: 70 } },
      'Maharashtra': { byRoad: { base: 80, perKg: 80 } },
      'Out of Maharashtra': { byRoad: { base: 120, perKg: 90 }, byAir: { base: 160, perKg: 160 } },
      'North-East/J&K': { byRoad: { base: 130, perKg: 120 }, byAir: { base: 180, perKg: 180 } },
    };

    // constructor(private currencyPipe: CurrencyPipe) { } // Inject CurrencyPipe for price formatting
    constructor() { } // Inject CurrencyPipe for price formatting


    ngOnInit() { }

    estimatePrice() {
      const destinationPrices = this.prices[this.destinationType];

      if (!destinationPrices) {
        console.error(`Prices for ${this.destinationType} are not defined.`);
        alert(`Enter valid details.`);
        return;
      }

      const selectedTransportMethod = this.transportMethod === 'byAir' ? 'byAir' : 'byRoad';
      const priceDetails = destinationPrices[selectedTransportMethod];

      if (!priceDetails) {
        console.error(`Price details for ${selectedTransportMethod} are not defined.`);
        return;
      }

      const weightInKg = this.weightUnit === 'g' ? this.packageWeight / 1000 : this.packageWeight;

      this.estimatedPrice = weightInKg <= 0.5 ? priceDetails.base :
        weightInKg > 0.5 && weightInKg < 1 ? priceDetails.perKg :
          priceDetails.perKg * weightInKg;
    }

    getFormattedPrice() {
      if (this.estimatedPrice !== undefined) {
        return this.estimatedPrice;
      }
      return '';
    }
}
