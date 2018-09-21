class Book{
  constructor(title, author, isbn){
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}
}
class UI{
addBookToList(book){
    const list = document.getElementById('book-list');
    //Create tr element
    const row = document.createElement('tr');
    //insert cols 
    row.innerHTML =`
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href=# class"delete">X<a></td>
    `;

  list.appendChild(row);
}

  showAlert(message, className){
  //Create div
  const div = document.createElement('div');
  //Add classes
  div.className = `alert ${className}`;
  //Add text
  div.appendChild(document.createTextNode(message));
  //Get parent
  const container = document.querySelector('.container');
  //Get form
  const form = document.querySelector('#book-form');
  //Insert alert
  container.insertBefore(div, form);

  //Timeout after 3 sec
  setTimeout(function(){
    document.querySelector('.alert').remove();
  },3000);  
}

deleteBook(target){
  if(target.className === 'delete'){
    target.parentElement.parentElement.remove();
  }
}

clearFields(){
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
  }
}

//Local Storage Class
class Store{
  static getBoooks(){
    let books;
    if(localStorage.getItem('books') === null){
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }
  static displayBooks(){
    const books = Store.getBoooks();

    books.forEach(function(book){
       const ui = new UI;

       //Add book to UI
       ui.addBookToList(book);
    });
  }
  
  static addBook(book){
    const books = Store.getBoooks();

    books.push(book);

    localStorage.setItem('books', JSON.stringify(book));
  }

  static removeBook(isbn) {
    const books = Store.getBoooks();
    books.forEach(function(book, index){
      if(book.isbn === isbn){
        books.splice(index, 1);
      }
    });
    
    localStorage.setItem('books', JSON.stringify(book));


  }
}

//DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks);

//Event Listners
document.getElementById('book-form').addEventListener('submit', function(e){
  e.preventDefault();
  //Get form values
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

  //Book fields
  const book = new Book (title, author, isbn);

  //UI Book fields
  const ui = new UI();

  //Validate
  if(title === '' || author === '' || isbn === ''){
    //Error alert
    ui.showAlert('Please fill in all fields', 'error');
  } else {
    //Add book to list
    ui.addBookToList(book);

    //Add to lockal Storege

    Store.addBook(book);

    //Show succses
    ui.showAlert('Book Added!', 'success');

    //Clear fields
    ui.clearFields();
}

})

// Event Listener for Delete
document.getElementById('book-list').addEventListener('click', function(e){
  e.preventDefault();

  //UI
  const ui = new UI();

  //Delete Book
  ui.deleteBook(e.target);

  //Remove from LS
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  //Show Alert
  ui.showAlert('Book Removed!', 'success');

})