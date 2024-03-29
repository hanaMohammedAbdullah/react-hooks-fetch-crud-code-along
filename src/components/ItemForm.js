import React, { useState } from "react";
import { URL } from "./ShoppingList";
function ItemForm({ onAddItem }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Produce");

  function handleSubmit(data) {
    data.preventDefault();
    const itemData = {
      name,
      category,
      isInCart: false,
    };
    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemData),
    })
      .then((res) => res.json())
      .then((newItem) => onAddItem(newItem));
  }

  return (
    <form className='NewItem' onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type='text'
          name='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label>
        Category:
        <select
          name='category'
          value={category}
          onChange={(e) => setCategory(e.target.value)}>
          <option value='Produce'>Produce</option>
          <option value='Dairy'>Dairy</option>
          <option value='Dessert'>Dessert</option>
        </select>
      </label>

      <button type='submit'>Add to List</button>
    </form>
  );
}

export default ItemForm;
