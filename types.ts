
export interface StatItem {
  label: string;
  value: string;
  suffix?: string;
}

export interface Advantage {
  feature: string;
  acadup: boolean | string;
  others: boolean | string;
}

export interface ModelFeature {
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  name: string;
  role: string;
  content: string;
  image: string;
}
