export interface StationsDataIF {
  id: string
  code: string
  promisedBy: Date
  shipping: ShippingIF
  status: string
  items: any[]
}

interface ShippingIF {
  address: {
    lines: string[]
  }
}
