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
    country: String
    postalCode: String!
}

type LineItems{
    anonymousId: String!
    lineItems: [Products]
    totalPrice: PriceValues
    totalLineItemQuantity: Int
}

type CartResponse{
    id: ID!
    version: Int
    lineItems: [Products]
    totalPrice: PriceValues
    anonymousId: String
}


type Mutation{
    addToCart(input:CartData): CartResponse
    fetchCart(cart_id:String): LineItems
    deleteFromCart(input: EditLineItem): CartResponse
    updateItemQty(input: EditLineItem): CartResponse
    addShippingAddr(input: Address): JSON
}
`;

module.exports = [cartTypeDef];
