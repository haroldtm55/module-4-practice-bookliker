import React, { useEffect, useState } from "react";
import {
  Container,
  Menu,
} from "semantic-ui-react";
import BookInfo from "./components/BookInfo";

function App() {
  const [{books}, setBooks] = useState({books: []})
  const [{bookIndex}, setBookIndex] = useState({bookIndex: ''})

  useEffect(()=> {
    fetchBooks()
  },[])
  
  const fetchBooks = () => {
    fetch('http://localhost:3000/books')
      .then(resp => resp.json())
      .then(books => {
        setBooks({books})
      })
  }

  const handleClickOnBookName = (bookIndex) => {
    setBookIndex({bookIndex: bookIndex})
  }

  const renderBooks = () => {
    return books.map((book,idx) => (
      <Menu.Item as={"a"} key={book.id} index={idx} onClick={()=>handleClickOnBookName(idx)}>
        {book.title}
      </Menu.Item>
    ))
  }

  const handleClickLikeButton = (bookSelected) => {
    const copyOfBookSelectedUsers = [...bookSelected.users]

    if (bookSelected.users.find(user => user.username==='pouros') === undefined) {
      copyOfBookSelectedUsers.push({id:1,username:'pouros'})
      const newBookUserInfo = {
        users: copyOfBookSelectedUsers
      }
      const configObj = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newBookUserInfo)
      }
      fetch(`http://localhost:3000/books/${bookSelected.id}`,configObj)
        .then(fetchBooks)
    } else {
      const newBookUserInfo = {
        users: copyOfBookSelectedUsers.filter(user=>user.username !== 'pouros')
      }
      const configObj = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newBookUserInfo)
      }
      fetch(`http://localhost:3000/books/${bookSelected.id}`,configObj)
        .then(fetchBooks)
    }
  }

  return (
    <div>
      <Menu inverted>
        <Menu.Item header>Bookliker</Menu.Item>
      </Menu>
      <main>
        <Menu vertical inverted>
        {renderBooks()}
        </Menu>
        <Container text>
        {bookIndex!=='' &&<BookInfo bookSelected={books[bookIndex]} handleClickLikeButton={handleClickLikeButton}/>}
        </Container>
      </main>
    </div>
  );
}

export default App;
