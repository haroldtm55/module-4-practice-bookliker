import React from 'react'
import {
  Header,
  Button,
  List,
  Image
} from "semantic-ui-react";

function BookInfo({bookSelected, handleClickLikeButton}) {
  
  const renderButtonStatus = () => (
    bookSelected.users.find(user => user.username==='pouros') === undefined ? 'Like' : 'Dislike'
  )
  
  return (
    <>
      <Header>{bookSelected.title}</Header>
      <Image
        src={bookSelected.img_url}
        size="small"
      />
      <p>{bookSelected.description}</p>
      <Button
        onClick= {()=>handleClickLikeButton(bookSelected)}
        color="red"
        content={renderButtonStatus()}
        icon="heart"
        label={{
          basic: true,
          color: "red",
          pointing: "left",
          content: bookSelected.users.length
        }}
      />
      <Header>Liked by</Header>
      <List>
        {bookSelected.users.map(user => <List.Item key={user.id} icon="user" content={user.username} />)}
      </List>
    </>
  )
}

export default BookInfo


