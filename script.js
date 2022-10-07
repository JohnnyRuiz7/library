const body = document.querySelector('body')
const button = document.querySelector('button')
const checkbox = document.querySelector('.book-checkbox')
const shelf = document.querySelector('.shelf')
const books = document.getElementsByClassName('book')
const form = document.createElement('div')
let deleteButton = document.querySelectorAll('.delete-button')
let editButton = document.querySelectorAll('.edit-button')
let bookNumber = 0
deleteButton[0].addEventListener('click', deleteBook)
editButton[0].addEventListener('click', editBook)
form.setAttribute('id', 'form')

function book(name, author, pages, read) {
    this.name = name.childNodes[3].textContent
    this.author = author.childNodes[5].textContent
    this.pages = pages.childNodes[7].textContent
    this.read = read.childNodes[9].firstElementChild.checked
}

function addBookToLibrary() {
  const clone = books[0].cloneNode(true)
  bookNumber++
  clone.id = `book${bookNumber}`
  shelf.appendChild(clone)
  myLibrary.push(new book(clone, clone, clone, clone))
  deleteButton = document.querySelectorAll('.delete-button')
  editButton = document.querySelectorAll('.edit-button')
  deleteButton.forEach(element => element.addEventListener('click', deleteBook))
  editButton.forEach(element => element.addEventListener('click', editBook))
}

function deleteBook(e) {
  e.target.parentNode.parentNode.parentNode.remove()
  myLibrary.splice(e.target.parentNode.parentNode.parentNode.id.charAt(4), 1)
  bookNumber--
}

function editBook(name, author, pages, read) {

}


button.addEventListener('click', addBookToLibrary)
let myLibrary = [new book(books[0], books[0], books[0], books[0])];