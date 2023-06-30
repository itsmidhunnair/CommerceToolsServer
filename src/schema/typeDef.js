const typeDefs = `#graphql
    
    # Scalar can be used to use dataTypes other than the default one
    # will be using JSON for 'Attributes' 
    scalar JSON
    
    type Products {
     id: ID!,
     name: name!
     slug: slug!
     metaDescription: name
    #  Fragmented - A Common Type is created for Variants and MasterVariants
     masterVariant: Variant!
     variants: [Variant]
    }

    # Name of product in different languages
    type name{
         en: String   
         de: String   
        }

    # slug in different languages
    type slug{
        en: String!
        de: String!
    }

    # Common Types of Master Variant & Normal variant of product
    type Variant{
        sku: String!
        images: [Images]!
        prices: [Prices]!
        attributes: [Attributes]
    }

    # masterVariant > Prices
    type Prices{
        id: String!
        value: PriceValues!
    }

    # masterVariant > Prices > values
    type PriceValues{
        currencyCode: String!
        centAmount: Int!
        fractionDigits: Int!
    }

    # masterVariant > Images
    type Images{
        url: String
    }


    # masterVariant > Attributes
    type Attributes{
        name: String!
        value: JSON
    }

    # # Attribute Can contain either of value Object or Strings
    # union AttributeValue = ObjectTyp | StringTyp

    # type ObjectTyp{
    #     value: ValueObj!
    # }

    # type ValueObj{
    #     key: String!
    #     label: LabelValue!
    # }

    type Query{
        products: [Products!]
        product(id: ID!): Products 
    }

`;

module.exports = { typeDefs };
