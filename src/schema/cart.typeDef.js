const cartTypeDef = `#graphql

input CartData{
    cart_id: String
    version: Int
    sku: String
    quantity: Int
}

input DeleteItemFromCart{
    cart_id: String!
    version: Int!
    item_id: String!
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
    deleteFromCart(input: DeleteItemFromCart): CartResponse
}
`;

module.exports = [cartTypeDef];
