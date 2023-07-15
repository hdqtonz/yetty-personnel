export interface Establishment {
  id: string;
  name: string;
  photos: string;
  supportedCurrencies: Supported[];
  supportedLanguages: Supported[];
}

export interface Supported {
  code: string;
  name: string;
}
