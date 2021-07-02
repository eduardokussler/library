let Book = {
  init: function(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    return this;
  },
  info: function() {
      return `${this.title} by ${this.author}, ${pages} pages, ${this.read ? 'already read': 'not read yet'}`;
  }
}

function addBookToLibrary(book) {
  library.push(book);
}

function renderLibraryToHtml(placeToAppend) {
  
  for(let i = 0; i < library.length; i++) {
    let newRow = {
      title: document.createElement('td'),
      author: document.createElement('td'),
      pages: document.createElement('td'),
      read: document.createElement('td'),
      remove: document.createElement('td'),
    };
    let newTr = document.createElement('tr');
    let button = document.createElement('button');
    button.innerText = 'Remove Book';
    newRow.title.innerText = library[i].title;
    newRow.author.innerText = library[i].author;
    newRow.pages.innerText = library[i].pages;
    newRow.read.innerText = library[i].read;
    button.setAttribute('index', `${i}`);
    button.addEventListener('click', (e) => {
      removeBook(e.target.getAttribute('index'));
    })
    newRow.remove.appendChild(button);
    for(col in newRow) {
      newTr.appendChild(newRow[col]);
    }
    placeToAppend.appendChild(newTr);
  }
  
}

function removeBook(index) {
  index = Number(index);
  library.splice(index, 1);
  clearTable();
  renderLibraryToHtml(table);
}

function addBook() {
  let newBookTitle = prompt('Book title: ');
  let newBookAuthor = prompt(`Who's the author? `);
  let newBookPages = prompt('How many pages? ');
  let userHasRead = prompt('Have you read it already? YES/NO');
  userHasRead = userHasRead.toUpperCase();
  let newBookRead = userHasRead === 'YES' ? true:false;
  let newBook = Object.create(Book).init(newBookTitle, newBookAuthor,
                                        newBookPages, newBookRead);
  addBookToLibrary(newBook); 
  clearTable();                                
  renderLibraryToHtml(table);
}

function clearTable() {
  let tableHeader = document.querySelector('thead');
  while(tableHeader.nextSibling) {
    tableHeader.nextSibling.remove();
  }
}

const addBookButton = document.querySelector('#newBook');
addBookButton.addEventListener('click', () => {
  addBook();
})
let library = [];
const table = document.querySelector('table');
renderLibraryToHtml(table);

