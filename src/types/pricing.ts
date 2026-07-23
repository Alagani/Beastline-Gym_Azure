export interface PricingPlan {
  name: string;
  price: string;
  period: string;
  sub?: string;
  tag?: string;
  highlighted?: boolean;
}
