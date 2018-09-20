//Book Constructor 
function Book(title, author, isbn){
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//UI Constructor
function UI(){}

//Add book to List
UI.prototype.addBookToList = function(book){
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

  //Show ALert
  UI.prototype.showAlert = function(message, className){
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
  //Delete Book

  UI.prototype.deleteBook = function(target){
    if(target.className === 'delete'){
      target.parentElement.parentElement.remove();
    }
  }
  //Clear Fields
  UI.prototype.clearFields = function(){
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
  }
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

  //Show Alert
  ui.showAlert('Book Removed!', 'success');

})