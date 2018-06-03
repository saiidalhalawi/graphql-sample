import express from 'express';
import graphqlHTTP from 'express-graphql';
import { buildSchema } from 'graphql';

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
    personByName(name: String!): Person
    title(name: String): Title
  }
`);

const people = {
  'Hugh Capet': {
    name: 'Hugh Capet',
    nicknames: [],
    born_around: 939,
    died_around: 996,
    houses: ['Robertiens', 'House of Capet'],
    titles: ['King of Franks'],
    father: null,
    mother: null,
    issues: ['Robert II']
  },
  'Robert II': {
    name: 'Robert II',
    nicknames: ['the Pious', 'the Wise'],
    born_around: 972,
    died_around: 1031,
    houses: ['House of Capet'],
    titles: ['King of Franks', 'Duke of Burgundy'],
    father: 'Hugh Capet',
    mother: 'Adelaide of Aquitaine.',
    issues: ['Henry I']
  },
  'Henry I of France': {
    name: 'Henry I of France',
    nicknames: [],
    born_around: 1008,
    died_around: 1060,
    houses: ['House of Capet'],
    titles: ['King of Franks', 'Duke of Burgundy'],
    father: 'Robert II',
    mother: 'Constance of Arles',
    issues: ['Philip I of France']
  },
  'Philip I of France': {
    name: 'Philip I of France',
    nicknames: ['the Amorous'],
    born_around: 1052,
    died_around: 1108,
    houses: ['House of Capet'],
    titles: ['King of Franks'],
    father: 'Henry I of France',
    mother: '	Anne of Kiev',
    issues: ['Louis VI of France']
  }
};

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
}

const root = {
  people: () => {
    let result = []
    for (let name in people) {
      result.push(new Person(people[name]))
    }
    return result;
  },
  personByName: ({ name }) => {
    if (!people[name]) {
      throw new Error('no message exists with name ' + name);
    }
    return new Person(people[name]);
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
