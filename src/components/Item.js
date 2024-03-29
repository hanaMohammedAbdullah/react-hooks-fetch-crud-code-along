import React from "react";
import { URL } from "./ShoppingList";

function Item({ item, onUpdateItem, onDeleteItem }) {
  function handleAddToCartClick() {
    console.log("clicked item:", item);
    fetch(`${URL}/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isInCart: !item.isInCart,
      }),
    })
      .then((res) => res.json())
      .then((updateItem) => onUpdateItem(updateItem));
  }
  function handleDeleteClick() {
    fetch(`${URL}/${item.id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => onDeleteItem(item));
  }
  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className='category'>{item.category}</span>
      <button
        onClick={handleAddToCartClick}
        className={item.isInCart ? "remove" : "add"}>
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className='remove' onClick={handleDeleteClick}>
        Delete
      </button>
    </li>
  );
}

export default Item;
