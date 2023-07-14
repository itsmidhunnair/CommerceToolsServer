const userTypeDef = `#graphql

scalar JSON

input UserData{
        access_token: String
        email:String
        phone:String
    }    

    input UserRegister{
        token: String!,
        email:String!,
        password:String!,
        name:String!,
    }

    type Mutation{
        checkUser(input:UserData): JSON
        registerUser(input:UserRegister!): JSON
        registerGoogleUser(token:String!): JSON
        loginUser(token:String!): JSON
    }
`;

module.exports = [userTypeDef];
