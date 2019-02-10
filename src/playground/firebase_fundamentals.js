// database.ref('expenses').push(expenses[0]);

database.ref('expenses').on('child_removed', (snapshot) => {
  console.log(snapshot.key, snapshot.val());
});

database.ref('expenses').on('child_changed', (snapshot) => {
  console.log(snapshot.key, snapshot.val());
});

database.ref('expenses').on('child_added', (snapshot) => {
  console.log(snapshot.key, snapshot.val());
});

database.ref('expenses').on('value', (snapshot) => {

  const expenses = [];

  snapshot.forEach((childSnapshot) => {
    expenses.push({
      id: childSnapshot.key,
      ...childSnapshot.val()
    })
  });

  console.log(expenses);

});

database.ref('notes').push({
  title: 'Course topics',
  body: 'React Native, Angular, Python'
});

database.ref().on('value', (snapshot) => {
  const val = snapshot.val();
  console.log(`${val.name} é um ${val.job.title} na ${val.job.company}.`);
}, (e) => {
  console.log('Error with data fetching: ', e);
});

database.ref('location/city')
  .once('value')
  .then((snapshot) => {
    const val = snapshot.val();
    console.log(val);
  })
  .catch((e) => {
    console.log('Error fetching data: ', e);
  });

database.ref().set({
  
  name: 'Edu Innarelli',
  age: 17,
  stressLevel: 6,
  job: {
    title: 'Aluno',
    company: 'Imaculada'
  },
  isSingle: false,
  location: {
    city: 'Campinas',
    country: 'Brasil'
  }

}).then(() => {
  console.log('Data is saved!');
}).catch((e) => {
  console.log('This failed. ', e);
});

database.ref().update({
  age: 21,
  stressLevel: 10,
  'job/company': 'Unicamp',
  isSingle: true
});

database.ref()
  .remove()
  .then(() => {
    console.log('Remove succeeded.');
  }).catch((e) => {
    console.log('Remove failed: ', e.message);
  });