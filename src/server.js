import express from 'express';
import graphqlHTTP from 'express-graphql';
import { buildSchema } from 'graphql';

import { Person } from '../src/types/person';

import people from '../src/data/people';

const schema = buildSchema(`
  type Person {
    id: Int!
    name: String!
    nicknames: [String]
    born_around: Int
    died_around: Int
    house_names: [String]
    title_titles: [String]
    father_name: String
    mother_name: String
    spouse_names: [String]
    issue_names: [String]
    father: Person
    mother: Person
    spouses: [Person]
    issues: [Person]
  }

  type Title {
    id: ID!
    name: String!
  }

  type House {
    id: ID!
    name: String!
  }

  type Query {
    people: [Person]
    peopleByName(name: String!): [Person]
    title(name: String): [Title]
  }
`);

const root = {
  people: () => {
    let result = []
    for (let personsName in people) {
      result.push(new Person(people[personsName], people))
    }
    return result;
  },
  peopleByName: ({ name }) => {
    let result = []
    for (let personsName in people) {
      if (personsName.includes(name)) {
        result.push(new Person(people[personsName], people))
      }
    }
    return result;
  },
  title: ({ name }) => {
    return name;
  }
};

const app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
