import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";
export const URL = "http://localhost:4000/items";
function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }
  function handleUpdateItem(updatedItem) {
    const updatedItems = items.map((item) => {
      if (item.id === updatedItem.id) {
        return updatedItem;
      } else {
        return item;
      }
    });

    setItems(updatedItems);
  }
  function handleDaleteItem(deletedItem) {
    const updatedItems = items.filter((item) => item.id !== deletedItem.id);
    setItems(updatedItems);
  }

  useEffect(() => {
    const conAbordar = new AbortController();

    fetch(URL)
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log(err);
        } else {
          console.log(err);
        }
      });
    return () => conAbordar.abort();
  }, []);
  function handleAddItem(newItem) {
    setItems([...items, newItem]);
    console.log("In ShoppingList:", newItem);
  }
  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className='ShoppingList'>
      <ItemForm onAddItem={handleAddItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className='Items'>
        {itemsToDisplay.map((item) => (
          <Item
            key={item.id}
            item={item}
            onUpdateItem={handleUpdateItem}
            onDeleteItem={handleDaleteItem}
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
