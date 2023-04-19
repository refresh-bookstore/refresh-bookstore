const title = document.querySelector('.title');
const lists = [
  adminBooks = document.querySelector('#list-books'),
  adminUsers = document.querySelector('#list-users'),
  adminOrders = document.querySelector('#list-orders'),
  adminCategories = document.querySelector('#list-categories'),
];

const contents = [
  adminContentBooks = document.querySelector('#admin-books'),
  adminContentUsers = document.querySelector('#admin-users'),
  adminContentOrders = document.querySelector('#admin-orders'),
  adminContentCategories = document.querySelector('#admin-categories'),
];

///테스트 데이터///

const dataLists = [
  bookLists = [
    {
      title: 'hello books',
      author: 'peter',
    }, 
    {
      title: 'gday books',
      author: 'joseph',
    }, 
    {
      title: 'bonjour books',
      author: 'rachel',
    }, 
    {
      title: 'nihao books',
      author: 'aaron',
    }, 
  ],
  userLists = [ 
    {
      userName: 'peter',
      userEmail: 'peter@peter.com',
    }, 
    {
      userName: 'joseph',
      userEmail: 'joseph@peter.com',
    }, 
    {
      userName: 'rachel',
      userEmail: 'rachel@peter.com',
    }, 
    {
      userName: 'aaron',
      userEmail: 'aaron@peter.com',
    }, 
  ],
  orderLists = [
    {
      userName: 'peter',
      userEmail: 'peter@peter.com',
    }, 
    {
      userName: 'joseph',
      userEmail: 'joseph@peter.com',
    }, 
    {
      userName: 'rachel',
      userEmail: 'rachel@peter.com',
    }, 
    {
      userName: 'aaron',
      userEmail: 'aaron@peter.com',
    }, 
  ],
  categoryLists = ['html/css', 'javascript', 'python', 'c++'],
];



lists.forEach((e)=> {
  e.addEventListener('click', ()=>{
    contents.map((el) => {
      if (contents.indexOf(el) === lists.indexOf(e)) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    })
    title.innerText = e.innerText;

    for(let i = 0; i < dataLists[lists.indexOf(e)].length; i++){
      const contentsList = document.createElement('li');
      contents[lists.indexOf(e)]
      .appendChild(contentsList.innerHTML = dataLists[lists.indexOf(e)][i]);
      console.log(contents[lists.indexOf(e)]);
    }

    console.log(contents[lists.indexOf(e)]);
  })
})