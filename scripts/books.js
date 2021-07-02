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

function addBookToLibrary(library, book) {
  library.push(book);
  return library;
}

function renderLibraryToHtml(library, placeToAppend) {
  let newRow = {
    title: document.createElement('td'),
    author: document.createElement('td'),
    pages: document.createElement('td'),
    read: document.createElement('td'),
  }
  for(let i = 0; i < library.length; i++) {
    let newTr = document.createElement('tr');
    newRow.title.innerText = library[i].title;
    newRow.author.innerText = library[i].author;
    newRow.pages.innerText = library[i].pages;
    newRow.read.innerText = library[i].read;
    for(col in newRow) {
      newTr.appendChild(newRow[col]);
    }
    placeToAppend.appendChild(newTr);
  }
  
}

function addBook() {
  let newBookTitle = prompt('Book title: ');
  let newBookAuthor = prompt(`Who's the author? `);
  let newBookPages = prompt('How many pages? ');
  let userHasRead = prompt('Have you read it already? YES/NO');
  userHasRead = userHasRead.toUpperCase();
  let newBookRead = userHasRead === 'YES'? true:false;
  let newBook = Object.create(Book).init(newBookTitle, newBookAuthor,
                                        newBookPages, newBookRead);
  library = addBookToLibrary(library, newBook);                                 
  renderLibraryToHtml(library, tableHeader);
}


const addBookButton = document.querySelector('#newBook');
addBookButton.addEventListener('click', () => {
  addBook();
})
let library = [];
const tableHeader = document.querySelector('table');
library = addBookToLibrary(library, lordOfTheRings);
renderLibraryToHtml(library, tableHeader);

