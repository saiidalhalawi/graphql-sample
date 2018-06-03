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
    peopleByName(name: String!): Person
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
  },
  'Louis VI of France': {
    name: 'Louis VI of France',
    nicknames: ['the Fat', 'the Fighter'],
    born_around: 1081,
    died_around: 1137,
    houses: ['House of Capet'],
    titles: ['King of Franks'],
    father: 'Philip I of France',
    mother: 'Bertha of Holland',
    issues: ['Philip of France', 'Louis VII of France']
  },
  'Louis VII of France': {
    name: 'Louis VII of France',
    nicknames: ['the Younger', 'the Young'],
    born_around: 1120,
    died_around: 1180,
    houses: ['House of Capet'],
    titles: ['King of Franks'],
    father: 'Louis VI of France',
    mother: 'Adélaide of Maurienne',
    issues: ['Philip II of France']
  },
  'Philip II of France': {
    name: 'Philip II of France',
    nicknames: ['Philip Augustus', 'the August'],
    born_around: 1165,
    died_around: 1223,
    houses: ['House of Capet'],
    titles: ['King of France'],
    father: 'Louis VII of France',
    mother: 'Adèle of Champagne',
    issues: ['Louis VIII, King of France']
  },
  'Louis VIII of France': {
    name: 'Louis VIII of France',
    nicknames: ['the Lion'],
    born_around: 1187,
    died_around: 1226,
    houses: ['House of Capet'],
    titles: ['King of France'],
    father: 'Philip II of France',
    mother: 'Isabelle of Hainaut',
    issues: ['Louis IX, King of France']
  },
  'Louis IX of France': {
    name: 'Louis IX of France',
    nicknames: ['Saint-Louis'],
    born_around: 1214,
    died_around: 1270,
    houses: ['House of Capet'],
    titles: ['King of France'],
    father: 'Louis VIII of France',
    mother: 'Blanche of Castile',
    issues: ['Louis IX, King of France']
  },
  'Philip III of France': {
    name: 'Philip III of France',
    nicknames: ['the Bold'],
    born_around: 1245,
    died_around: 1285,
    houses: ['House of Capet'],
    titles: ['King of France'],
    father: 'Louis IX of France',
    mother: 'Margaret of Provence',
    issues: ['Philip IV of France']
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
  peopleByName: ({ text }) => {
    let result = []
    for (let name in people) {
      if (name.includes(text)) {
        result.push(new Person(people[name]))
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
