import express from 'express';
import graphqlHTTP from 'express-graphql';
import { buildSchema } from 'graphql';

import people from '../src/data/people';

const schema = buildSchema(`
  type Person {
    id: ID!
    name: String
    nicknames: [String]
    born_around: Int
    died_around: Int
    houses: [House]
    titles: [Title]
    father: Person
    mother: Person
    issues: [Person]
  }

  type Title {
    id: ID!
    name: String
  }

  type House {
    id: ID!
    name: String
  }

  type Query {
    people: [Person]
    peopleByName(name: String!): [Person]
    title(name: String): [Title]
  }
`);

class Person {
  constructor(p) {
    this.name = p.name;
    this.nicknames = p.nicknames;
    this.born_around = p.born_around;
    this.died_around = p.died_around;
    this.houses = p.houses;
    this.titles = p.titles;
    this.father = p.father;
    this.mother = p.mother;
    this.issues = p.issues;
  }
};

const root = {
  people: () => {
    let result = []
    for (let name in people) {
      result.push(new Person(people[name]))
    }
    return result;
  },
  peopleByName: ({ name }) => {
    let result = []
    for (let personsName in people) {
      if (personsName.includes(name)) {
        result.push(new Person(people[personsName]))
      }
    }
    return result;
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
