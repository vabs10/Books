// BookShow.js
import { useState, useEffect } from "react";
import axios from "axios";
import BookEdit from "./BookEdit";

function BookShow({ book, onDelete, onEdit }) {
  const [showEdit, setShowEdit] = useState(false);
  const [bookImage, setBookImage] = useState(null);

  useEffect(() => {
    const fetchBookImage = async () => {
      try {
        const response = await axios.get(
          `https://api.unsplash.com/search/photos`,
          {
            headers: {
              Authorization:
                "Client-ID 8O50V7bNzfKdVixwS9W9nZVdr0VnrCv9gmeimfdvp6Y",
            },
            params: {
              query: book.title,
              per_page: 1,
            },
          }
        );

        if (response.data.results.length > 0) {
          setBookImage(response.data.results[0].urls.small);
        }
      } catch (error) {
        console.error("Error fetching book image:", error);
      }
    };

    fetchBookImage();
  }, [book.title]);

  const handleDeleteClick = () => {
    onDelete(book.id);
  };

  const handleEditClick = () => {
    setShowEdit(!showEdit);
  };

  const handleSubmit = (id, newTitle) => {
    setShowEdit(false);
    onEdit(id, newTitle);
  };

  let content = <h3>{book.title}</h3>;
  if (showEdit) {
    content = <BookEdit onSubmit={handleSubmit} book={book} />;
  }

  return (
    <div className="book-show">
      {bookImage && <img alt="books" src={bookImage} />}
      <div>{content}</div>
      <div className="actions">
        <button className="edit" onClick={handleEditClick}>
          Edit
        </button>
        <button className="delete" onClick={handleDeleteClick}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default BookShow;
