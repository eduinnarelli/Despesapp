// Object destructuring

const person = {
  name: 'Edu',
  age: 21,
  location: {
    city: 'Campinas',
    temp: 28
  }
};

const {name: firstName = 'Anonymous', age} = person;
console.log(`${firstName} is ${age}.`);

const {city, temp: temperature} = person.location;
if (city && temperature) {
  console.log(`It's ${temperature} in ${city}.`);
}

const book = {
  title: 'Calibã e a Bruxa',
  author: 'Silvia Federici',
  publisher: {
    name: 'Editora Elefante'
  }
};

const {name: publisherName = 'Self-Published'} = book.publisher;
console.log(publisherName);

// Array destructuring

const endereço = ['Rua Presidente Bernardes 520', 'Campinas', 'São Paulo', '13061009'];
const [, cidade, estado = 'Brasília'] = endereço;
console.log(`You're in ${cidade}, ${estado}.`);

const item = ['Coffee (hot)', '$2.00', '$2.50', '$2.75'];
const [itemName, , mediumPrice] = item;
console.log(`A medium ${itemName} costs ${mediumPrice}.`);