class Person {
  constructor(person, people) {
    this.people = people;
    this.id = person.id;
    this.name = person.name;
    this.nicknames = person.nicknames;
    this.born_around = person.born_around;
    this.died_around = person.died_around;
    this.house_names = person.house_names;
    this.title_names = person.title_names;
    this.father_name = person.father_name;
    this.mother_name = person.mother_name;
    this.spouse_names = person.spouse_names;
    this.issue_names = person.issue_names;
  }

  // houses() {
  //   return houses;
  // }
  //
  // titles() {
  //   return titles;
  // }

  father() {
    if (this.people[this.father_name]) {
      return this.people[this.father_name];
    } else {
      return null;
    }
  }

  mother() {
    if (this.people[this.mother_name]) {
      return this.people[this.mother_name];
    } else {
      return null;
    }
  }

  spouses() {
    let result = []
    for (const spouse_name in this.spouse_names) {
      if (this.people[spouse_name]) {
        result.push(this.people[spouse_name]);
      }
    }
    return result;
  }

  issues() {
    let result = []
    for (const issue_name in this.issue_names) {
      if (this.people[issue_name]) {
        result.push(this.people[issue_name]);
      }
    }
    return result;
  }
}
module.exports.Person = Person;
