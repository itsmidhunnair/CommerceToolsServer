const cartTypeDef = `#graphql

input CartData{
    cart_id: String
    version: Int
    sku: String
    quantity: Int
}

input EditLineItem{
    cart_id: String!
    version: Int!
    item_id: String!
    quantity: Int
}

input Address{
    cart_id: String!
    version: Int!
    salutation: String
    firstName: String!
    lastName: String!
    mobile: String!
    email: String!
    building: String!
    streetName: String
    state: String
    city: String!
    country: String!
    postalCode: String!
}

input ShippingMethod{
    cart_id: String!
    version: Int!
    method_id: String!
}

input CartInfo{
    cart_id: String!
    version: Int!
}

type CartResponse{
    id: ID!
    version: Int
    lineItems: [Products]
    totalPrice: PriceValues
    anonymousId: String
    shippingAddress: AddressRes
    taxedPrice: TaxPrice
    totalLineItemQuantity: Int
    shippingInfo: JSON
    billingAddress: AddressRes
}

type TaxPrice{
    totalNet: PriceValues
    totalTax: PriceValues
    totalGross: PriceValues
}

type AddressRes{
    salutation: String
    firstName: String!
    lastName: String!
    mobile: String!
    email: String!
    building: String!
    streetName: String
    state: String
    city: String!
    country: String!
    postalCode: String!
}


type Mutation{
    addToCart(input:CartData): CartResponse
    fetchCart(cart_id:String): CartResponse
    deleteFromCart(input: EditLineItem): CartResponse
    updateItemQty(input: EditLineItem): CartResponse
    addShippingAddr(input: Address): CartResponse
    addBillingAddr(input: Address): CartResponse
    addShippingMeth(input: ShippingMethod): CartResponse
    placeOrder(input: CartInfo): JSON
}
`;

module.exports = [cartTypeDef];
