import { Component } from '@angular/core';
interface Service {
  title: string;
  description: string;
}
@Component({
  selector: 'app-services-details',
  templateUrl: './services-details.component.html',
  styleUrl: './services-details.component.css'
})
export class ServicesDetailsComponent {
  services: Service[] = [
    {
      title: 'Express Delivery',
      description: 'Fast and reliable delivery, ensuring your packages reach their destination quickly.'
    },
    {
      title: 'Standard Delivery',
      description: 'Cost-effective delivery service for non-urgent shipments, delivered within a standard timeframe.'
    },
    {
      title: 'Special Handling',
      description: 'Specialized care for fragile, perishable, or high-value items, guaranteeing safe delivery.'
    },
    {
      title: 'Document Courier',
      description: 'Secure and expedited delivery of important documents, ensuring confidentiality and timeliness.'
    },
    {
      title: 'Global Reach',
      description: 'Extensive network for international deliveries, connecting you to customers worldwide.'
    },
    {
      title: 'Real-Time Tracking',
      description: 'Monitor your package\'s progress every step of the way with our convenient tracking system.'
    },
    {
      title: 'Customer Support',
      description: 'Dedicated customer support team to answer your questions and address any concerns promptly.'
    }
  ]
  
}
