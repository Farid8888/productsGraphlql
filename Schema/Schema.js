const graphql = require('graphql')

const {GraphQLObjectType,GraphQLString,GraphQLSchema,GraphQLID,GraphQLInt,GraphQLList} = graphql


const movies =[
    {id:'1',name:'Ono',genre:'Horror',directorId:2},
    {id:'2',name:'Djentlmeni',genre:'Blockbaster',directorId:4},
    {id:'3',name:'Igra prestolov',genre:'Fantastika',directorId:1},
    {id:4,name:'Ubit Bila',genre:'Boevik',directorId:3},
    {id:'5',name:'Molchaniye Yagnat',genre:'Ujas',directorId:3},
    {id:'6',name:'Vijivjiy',genre:'Triller',directorId:3},
    {id:'7',name:'Oblast tmi',genre:'Triller',directorId:3},
    {id:'8',name:'Tupoy i ewe tupeye',genre:'Komediya',directorId:3}
]

const directors=[
    {id:'1',name:'Tarantino',age:55},
    {id:'2',name:'Michael Radford',age:72},
    {id:'3',name:'Jason McTeigue',age:51},
    {id:'4',name:'Guy Ritchie',age:50},
]

const MovieType=new GraphQLObjectType({
    name:'Movie',
    fields:()=>({
        name:{type:GraphQLString},
        id:{type:GraphQLID},
        genre:{type:GraphQLString},
        director:{
            type:DirectorType,
            resolve(parent,args){
                return directors.find(director=>director.id == parent.directorId)
            }
        }
    })
})

const DirectorType =new GraphQLObjectType({
   name:'Dirrector',
   fields:()=>({
    name:{type:GraphQLString},
    id:{type:GraphQLID},
    age:{type:GraphQLInt},
    movie:{
        type:GraphQLList(MovieType),
        resolve(parent,args){
            return movies.filter(movie=>movie.directorId == parent.id)
        }
    }
   })
})

const Query = new GraphQLObjectType({
    name:'Query',
    fields:{
        movie:{
            type:MovieType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
            return movies.find(movie=>movie.id == args.id)
            }
        },
        director:{
            type:DirectorType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return directors.find(director=>director.id == args.id)
            }
        },
        directors:{
        type:GraphQLList(DirectorType),
        resolve(parent,args){
            return directors
        }
        },
        movies:{
            type:GraphQLList(MovieType),
            resolve(args,parent){
                return movies
            }
        }
    }

})


module.exports = new GraphQLSchema({
    query:Query,
})