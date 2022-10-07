const body = document.querySelector('body')
const table = document.querySelector('.table')
const addBook = document.querySelector('#add-book-button')
const newBookName = document.getElementById('form-book-title')
const newBookAuthor = document.getElementById('form-book-author')
const NewBookPages = document.getElementById('form-book-pages')
const newBookRead = document.getElementById('form-book-checkbox')
const cancelButton = document.querySelector('#cancel-button')
const confirmBook = document.querySelector('#confirm-button')
const checkbox = document.querySelector('.book-checkbox')
const shelf = document.querySelector('.shelf')
const books = document.getElementsByClassName('book')
const form = document.querySelector('#form-container')
const div = document.createElement('div')
let deleteButton = document.querySelectorAll('.delete-button')
let editButton = document.querySelectorAll('.edit-button')
let bookNumber = 0
deleteButton[0].addEventListener('click', deleteBook)
editButton[0].addEventListener('click', editBookForm)

function book(name, author, pages, read) {
    this.name = name
    this.author = author
    this.pages = pages
    this.read = read
}

function addBookToLibrary() {
  const clone = books[0].cloneNode(true)
  bookNumber++
  clone.id = `book${bookNumber}`
  clone.childNodes[3].textContent = newBookName.value
  clone.childNodes[5].textContent = newBookAuthor.value
  clone.childNodes[7].textContent = NewBookPages.value + ' pages'
  clone.childNodes[9].firstElementChild.checked = newBookRead.checked
  shelf.appendChild(clone)
  myLibrary.push(new book(newBookName.value, newBookAuthor.value, NewBookPages.value + ' pages', newBookRead.checked))
  clearForm()
  deleteButton = document.querySelectorAll('.delete-button')
  editButton = document.querySelectorAll('.edit-button')
  deleteButton.forEach(element => element.addEventListener('click', deleteBook))
  editButton.forEach(element => element.addEventListener('click', editBookForm))
  formCancel()
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
  currentBook.childNodes[3].textContent = newBookName.value
  currentBook.childNodes[5].textContent = newBookAuthor.value
  currentBook.childNodes[7].textContent = NewBookPages.value + ' pages'
  currentBook.childNodes[9].firstElementChild.checked = newBookRead.checked
  myLibrary[bookId].name = newBookName.value
  myLibrary[bookId].author = newBookAuthor.value
  myLibrary[bookId].pages = NewBookPages.value + ' pages'
  myLibrary[bookId].read = newBookRead.checked
  formCancel()
  confirmBook.removeEventListener('click', editBook)
  confirmBook.addEventListener('click', addBookToLibrary)
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
  NewBookPages.value = ''
  newBookRead.checked = false
}

confirmBook.addEventListener('click', addBookToLibrary)
addBook.addEventListener('click', formPopup)
cancelButton.addEventListener('click', formCancel)
let myLibrary = [new book(books[0].childNodes[3].textContent, books[0].childNodes[5].textContent, books[0].childNodes[7].textContent, books[0].childNodes[9].firstElementChild.checked)];