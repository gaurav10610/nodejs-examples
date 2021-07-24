const express = require('express')
const expressGraphQL = require('express-graphql').graphqlHTTP
const app = express()

const authors = [
    { id: 1, name: 'J. K. Rowling' },
    { id: 2, name: 'J. R. R. Tolkien' },
    { id: 3, name: 'Brent Weeks' }
]

const books = [
    { id: 1, name: 'Harry Potter and the Chamber of Secrets', authorId: 1 },
    { id: 2, name: 'Harry Potter and the Prisoner of Azkaban', authorId: 1 },
    { id: 3, name: 'Harry Potter and the Goblet of Fire', authorId: 1 },
    { id: 4, name: 'The Fellowship of the Ring', authorId: 2 },
    { id: 5, name: 'The Two Towers', authorId: 2 },
    { id: 6, name: 'The Return of the King', authorId: 2 },
    { id: 7, name: 'The Way of Shadows', authorId: 3 },
    { id: 8, name: 'Beyond the Shadows', authorId: 3 }
]

const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull, GraphQLInt } = require('graphql')

const AuthorType = new GraphQLObjectType({
    name: 'author',
    description: 'description of author',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        books: {
            type: GraphQLList(BookType),
            resolve: (author) => {
                return books.filter(book => book.authorId === author.id)
            }
        }
    })
})

const BookType = new GraphQLObjectType({
    name: 'book',
    description: 'description of book',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        authorId: { type: GraphQLNonNull(GraphQLInt) },
        author: {
            type: GraphQLNonNull(AuthorType),
            resolve: (book) => {
                return authors.find(author => author.id === book.authorId)
            }
        }
    })
})

const RootQueryType = new GraphQLObjectType({
    name: 'rootQuery',
    description: 'query for book and author',
    fields: () => ({
        getBook: {
            type: BookType,
            description: 'get the book desription by id',
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (parent, args) => books.find(book => book.id === args.id)
        },
        getAuthor: {
            type: AuthorType,
            description: 'get the author desription by id',
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (parent, args) => authors.find(author => author.id === args.id)
        },
        books: {
            type: GraphQLList(BookType),
            description: 'list of books',
            resolve: () => books
        },
        authors: {
            type: GraphQLList(AuthorType),
            description: 'list of authors with their list of books',
            resolve: () => authors
        }
    })
})

const RootMutationType = new GraphQLObjectType({
    name: 'rootMutation',
    description: 'matation for adding book and author',
    fields: () => ({
        addBook: {
            type: BookType,
            description: 'adding a book mutation',
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                authorId: { type: GraphQLNonNull(GraphQLInt) }
            },
            resolve: (parent, args) => {
                const newBook = {
                    id: books.length + 1,
                    name: args.name,
                    authorId: args.authorId
                }
                books.push(newBook)
                return newBook
            }
        },
        addAuthor: {
            type: AuthorType,
            description: 'adding an author mutation',
            args: {
                name: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: (parent, args) => {
                const newAuthor = {
                    id: authors.length + 1,
                    name: args.name
                }
                authors.push(newAuthor)
                return newAuthor
            }
        }
    })
})

const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
})

app.use('/graphql', expressGraphQL({
    graphiql: true,
    schema: schema
}))
app.listen(5000, () => { console.log('server is running') })