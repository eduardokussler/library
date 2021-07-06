let Book = {
  init: function(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    return this;
  },
  changeReadStatus: function() {
    this.read = !this.read;
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
      alter: document.createElement('td'),
    };
    let newTr = document.createElement('tr');
    let removeButton = document.createElement('button');
    let changeReadStatusButton = document.createElement('button');
    changeReadStatusButton.innerText = (library[i].read) ? 'Mark unread':'Mark read';
    changeReadStatusButton.setAttribute('index', `${i}`);
    changeReadStatusButton.addEventListener('click', (e) => {
      library[i].changeReadStatus(Number(e.target.getAttribute('index')));
      redrawTable();
      updateStorage();
    });
    newRow.alter.appendChild(changeReadStatusButton);
    removeButton.innerText = 'Remove Book';
    removeButton.setAttribute('index', `${i}`);
    removeButton.addEventListener('click', (e) => {
      removeBook(e.target.getAttribute('index'));
      updateStorage();
    });
    newRow.title.innerText = library[i].title;
    newRow.author.innerText = library[i].author;
    newRow.pages.innerText = library[i].pages;
    newRow.read.innerText = library[i].read;
    newRow.alter.appendChild(removeButton);
    for(col in newRow) {
      newTr.appendChild(newRow[col]);
    }
    placeToAppend.appendChild(newTr);
  }
  
}

function removeBook(index) {
  index = Number(index);
  library.splice(index, 1);
  redrawTable();
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

function updateStorage() {
  localStorage.removeItem('library');
  localStorage.setItem('library', JSON.stringify(library));
}

function redrawTable() {
  clearTable();
  renderLibraryToHtml(table);
}

function clearTable() {
  let tableHeader = document.querySelector('thead');
  while(tableHeader.nextSibling) {
    tableHeader.nextSibling.remove();
  }
}

function setupLocalStorage() {
  if(localStorage.getItem('library') === null) {
    localStorage.setItem('library', JSON.stringify(library));
  } else {
    let storedLibrary = JSON.parse(localStorage.getItem('library'));
    for(let i = 0; i < storedLibrary.length; i++) {
      let storedBook = Object.create(Book).init(
        storedLibrary[i].title,
        storedLibrary[i].author,
        storedLibrary[i].pages,
        storedLibrary[i].read
      );
      library.push(storedBook);
    }
  }
}

const addBookButton = document.querySelector('#newBook');
addBookButton.addEventListener('click', () => {
  addBook();
  updateStorage();
})
let library = [];
setupLocalStorage();
const table = document.querySelector('table');
renderLibraryToHtml(table);

