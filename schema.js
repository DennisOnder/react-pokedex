const axios = require('axios');
const { GraphQLObjectType, GraphQLInt, GraphQLString ,GraphQLSchema } = require('graphql');

const PokemonType = new GraphQLObjectType({
    name: 'Pokemon',
    fields: () => ({
        id: {
            type: GraphQLInt
        },
        name: {
            type: GraphQLString
        }
    })
});

const RootQueryType = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        pokemon: {
            type: PokemonType,
            args: {
                id_or_name: {
                    type: GraphQLString
                }
            },
            resolve(parent, args) {
                return axios.get(`https://pokeapi.co/api/v2/pokemon/${args.id_or_name}`)
                    .then(res => res.data);
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQueryType
});