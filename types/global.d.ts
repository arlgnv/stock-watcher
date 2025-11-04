declare global {
  interface SignInFormData {
    email: string;
    password: string;
  }

  interface SignUpFormData {
    fullName: string;
    email: string;
    password: string;
    country: string;
    investmentGoals: string;
    riskTolerance: string;
    preferredIndustry: string;
  }

  interface FooterLinkProps {
    text: string;
    linkText: string;
    href: string;
  }

  interface SearchCommandProps {
    renderAs?: 'button' | 'text';
    label?: string;
    initialStocks: StockWithWatchlistStatus[];
  }

  interface WelcomeEmailData {
    email: string;
    name: string;
    intro: string;
  }

  interface User {
    id: string;
    name: string;
    email: string;
  }

  interface Stock {
    symbol: string;
    name: string;
    exchange: string;
    type: string;
  }

  type StockWithWatchlistStatus = Stock & {
    isInWatchlist: boolean;
  };

  interface FinnhubSearchResult {
    symbol: string;
    description: string;
    displaySymbol?: string;
    type: string;
  }

  interface FinnhubSearchResponse {
    count: number;
    result: FinnhubSearchResult[];
  }

  interface StockDetailsPageProps {
    params: Promise<{
      symbol: string;
    }>;
  }

  interface WatchlistButtonProps {
    symbol: string;
    company: string;
    isInWatchlist: boolean;
    showTrashIcon?: boolean;
    type?: 'button' | 'icon';
    onWatchlistChange?: (symbol: string, isAdded: boolean) => void;
  }

  interface QuoteData {
    c?: number;
    dp?: number;
  }

  interface ProfileData {
    name?: string;
    marketCapitalization?: number;
  }

  interface FinancialsData {
    metric?: Record<string, number>;
  }

  interface SelectedStock {
    symbol: string;
    company: string;
    currentPrice?: number;
  }

  interface WatchlistTableProps {
    watchlist: StockWithData[];
  }

  interface StockWithData {
    userId: string;
    symbol: string;
    company: string;
    addedAt: Date;
    currentPrice?: number;
    changePercent?: number;
    priceFormatted?: string;
    changeFormatted?: string;
    marketCap?: string;
    peRatio?: string;
  }

  interface AlertsListProps {
    alertData: Alert[] | undefined;
  }

  interface MarketNewsArticle {
    id: number;
    headline: string;
    summary: string;
    source: string;
    url: string;
    datetime: number;
    category: string;
    related: string;
    image?: string;
  }

  interface WatchlistNewsProps {
    news?: MarketNewsArticle[];
  }

  interface SearchCommandProps {
    open?: boolean;
    setOpen?: (open: boolean) => void;
    renderAs?: 'button' | 'text';
    buttonLabel?: string;
    buttonVariant?: 'primary' | 'secondary';
    className?: string;
  }

  interface AlertData {
    symbol: string;
    company: string;
    alertName: string;
    alertType: 'upper' | 'lower';
    threshold: string;
  }

  interface AlertModalProps {
    alertId?: string;
    alertData?: AlertData;
    action?: string;
    open: boolean;
    setOpen: (open: boolean) => void;
  }

  interface RawNewsArticle {
    id: number;
    headline?: string;
    summary?: string;
    source?: string;
    url?: string;
    datetime?: number;
    image?: string;
    category?: string;
    related?: string;
  }

  interface Alert {
    id: string;
    symbol: string;
    company: string;
    alertName: string;
    currentPrice: number;
    alertType: 'upper' | 'lower';
    threshold: number;
    changePercent?: number;
  }
}

export {};
