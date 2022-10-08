const table = document.querySelector('.table')
const addBook = document.querySelector('#add-book-button')
const newBookName = document.getElementById('form-book-title')
const newBookAuthor = document.getElementById('form-book-author')
const newBookPages = document.getElementById('form-book-pages')
const newBookRead = document.getElementById('form-book-checkbox')
const cancelButton = document.querySelector('#cancel-button')
const confirmBook = document.querySelector('#confirm-button')
const shelf = document.querySelector('.shelf')
const books = document.getElementsByClassName('book')
const form = document.querySelector('#form-container')
const div = document.createElement('div')
const copy = books[0].cloneNode(true)
let checkboxes = document.querySelectorAll('.book-checkbox')
let deleteButton = document.querySelectorAll('.delete-button')
let editButton = document.querySelectorAll('.edit-button')
let bookNumber = 0
checkboxes[0].addEventListener('click', updateReadStatus)
deleteButton[0].addEventListener('click', deleteBook)
editButton[0].addEventListener('click', editBookForm)
confirmBook.addEventListener('click', addBookToLibrary)
addBook.addEventListener('click', formPopup)
cancelButton.addEventListener('click', formCancel)

function book(name, author, pages, read) {
    this.name = name
    this.author = author
    this.pages = pages
    this.read = read
}

function updateLibrary(newBook) {
  newBook.childNodes[3].textContent = newBookName.value
  newBook.childNodes[5].textContent = newBookAuthor.value
  newBook.childNodes[7].textContent = newBookPages.value + ' pages'
  newBook.childNodes[9].firstElementChild.checked = newBookRead.checked
}

function updateReadStatus() {
  
}

function addBookToLibrary() {
  if (newBookName.value == '' || newBookAuthor.value == '' || newBookPages.value == '' || isNaN(newBookPages.value))
    {
      window.alert('PLEASE FILL OUT ALL FIELDS')
    }
  else if (books[0] == undefined) {
    bookNumber++
    copy.id = `book${bookNumber}`
    updateLibrary(copy)
    shelf.appendChild(copy)
    myLibrary.push(new book(newBookName.value, newBookAuthor.value, newBookPages.value + ' pages', newBookRead.checked))
    deleteButton = document.querySelectorAll('.delete-button')
    editButton = document.querySelectorAll('.edit-button')
    deleteButton.forEach(element => element.addEventListener('click', deleteBook))
    editButton.forEach(element => element.addEventListener('click', editBookForm))
    formCancel()
  }
  else {
    const clone = books[0].cloneNode(true)
    bookNumber++
    clone.id = `book${bookNumber}`
    updateLibrary(clone)
    shelf.appendChild(clone)
    myLibrary.push(new book(newBookName.value, newBookAuthor.value, newBookPages.value + ' pages', newBookRead.checked))
    deleteButton = document.querySelectorAll('.delete-button')
    editButton = document.querySelectorAll('.edit-button')
    deleteButton.forEach(element => element.addEventListener('click', deleteBook))
    editButton.forEach(element => element.addEventListener('click', editBookForm))
    formCancel()
  }
}

function deleteBook(book) {
  book.target.parentNode.parentNode.parentNode.remove()
  myLibrary.splice(book.target.parentNode.parentNode.parentNode.id.slice(-1), 1)
  bookNumber--
}

function editBookForm(e) {
  bookId = +e.target.parentNode.parentNode.parentNode.id.slice(-1)
  currentBook = e.target.parentNode.parentNode.parentNode
  formPopup()
  confirmBook.removeEventListener('click', addBookToLibrary)
  confirmBook.addEventListener('click', editBook)
}

function editBook() {
  if (newBookName.value == '' || newBookAuthor.value == '' || newBookPages.value == '' || isNaN(newBookPages.value))
    {
      window.alert('PLEASE FILL OUT ALL FIELDS')
    }
  else {
    updateLibrary(currentBook)
    myLibrary[bookId].name = newBookName.value
    myLibrary[bookId].author = newBookAuthor.value
    myLibrary[bookId].pages = newBookPages.value + ' pages'
    myLibrary[bookId].read = newBookRead.checked
    formCancel()
    confirmBook.removeEventListener('click', editBook)
    confirmBook.addEventListener('click', addBookToLibrary)
  }
}

function formPopup() {
  table.style.opacity = 0.5
  form.style.display = 'flex'
}

function formCancel() {
  table.style.opacity = 1
  form.style.display = 'none'
  confirmBook.removeEventListener('click', editBook)
  confirmBook.addEventListener('click', addBookToLibrary)
  clearForm()
}

function clearForm() {
  newBookName.value = ''
  newBookAuthor.value = ''
  newBookPages.value = ''
  newBookRead.checked = false
}

let myLibrary = [new book(books[0].childNodes[3].textContent, books[0].childNodes[5].textContent, books[0].childNodes[7].textContent, books[0].childNodes[9].firstElementChild.checked)];