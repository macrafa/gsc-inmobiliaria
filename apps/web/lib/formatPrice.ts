export type Currency = 'USD' | 'VES'

type Options = {
  locale?: string
  showDecimals?: boolean
}

export function formatPrice(
    value: number, 
    currency: Currency, 
    options: Options = {}) {
  const locale = options.locale ?? 'es-VE'
  const showDecimals = options.showDecimals ?? (Math.round(value) !== value)

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    currencyDisplay: 'narrowSymbol',
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0,
  }).format(value)
}