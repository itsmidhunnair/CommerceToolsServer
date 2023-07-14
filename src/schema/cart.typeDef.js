const cartTypeDef = `#graphql

input CartData{
    cart_id: String
    version: Int
    sku: String
    quantity: Int
}

type LineItems{
    anonymousId: String!
    lineItems: [Products]
    totalPrice: PriceValues
    totalLineItemQuantity: Int!
}

input DeleteItemFromCart{
    cart_id: String!
    version: Int!
    item_id: String!
}

type Mutation{
    addToCart(input:CartData): JSON
    fetchCart(cart_id:String): LineItems
    deleteFromCart(input: DeleteItemFromCart): JSON
}
`;

module.exports = [cartTypeDef];
