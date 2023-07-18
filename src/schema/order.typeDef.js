const orderTypeDef = `#graphql

type OrderRes{
    id: String
    version: String
    orderNumber: String
    customerId: String
    customerEmail: String!
    totalPrice: PriceValues!
    taxedPrice: TaxPrice
    taxedShippingPrice: TaxPrice
    orderState: String!
    shippingInfo: JSON
    shippingAddress: AddressRes!
    billingAddress: AddressRes
    lineItems: [Products]
}

type Query{
    fetchOrders: [OrderRes] 
}

`;

module.exports = [orderTypeDef];
