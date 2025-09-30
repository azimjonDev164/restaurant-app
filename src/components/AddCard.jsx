import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";

export default function AddCard() {
  const [cards, setCards] = useState([
    {
      id: 1,
      title: "Classic Burger",
      description: "Juicy beef burger with cheese and fresh veggies.",
      price: 12.99,
      image:
        "https://images.unsplash.com/photo-1606756790138-1967f2f6a4a6?w=500&q=80",
    },
  ]);

  const [form, setForm] = useState({
    id: 0,
    title: "",
    description: "",
    price: 0,
    image: "",
  });

  // Add new card
  const handleAdd = () => {
    if (!form.title || !form.description || !form.price) return;
    setCards([
      ...cards,
      {
        ...form,
        id: Date.now(),
      },
    ]);
    setForm({ id: 0, title: "", description: "", price: 0, image: "" });
  };

  // Delete card
  const handleDelete = (id) => {
    setCards(cards.filter((c) => c.id !== id));
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-gray-700">
      <h1 className="text-3xl font-bold mb-6">Manage Cards</h1>

      {/* Form */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-md mb-10">
        <h2 className="text-xl font-semibold mb-4">Add New Card</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Title"
            className="input input-bordered w-full"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Price"
            className="input input-bordered w-full"
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: parseFloat(e.target.value) })
            }
            required
          />
          <input
            type="text"
            placeholder="Image URL"
            className="input input-bordered w-full md:col-span-2"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            required
          />
          <textarea
            placeholder="Description"
            className="textarea textarea-bordered w-full md:col-span-2"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />
        </div>
        <button
          onClick={handleAdd}
          className="btn btn-primary mt-4 flex items-center gap-2"
        >
          <FontAwesomeIcon icon={faPlus} /> Add Card
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.id}
            className="card bg-gray-800 shadow-xl rounded-xl overflow-hidden"
          >
            {card.image && (
              <figure>
                <img
                  src={card.image}
                  alt={card.title}
                  className="h-40 w-full object-cover"
                />
              </figure>
            )}
            <div className="card-body">
              <h2 className="card-title">{card.title}</h2>
              <p className="text-gray-300">{card.description}</p>
              <p className="text-lg font-bold text-green-400">
                ${card.price.toFixed(2)}
              </p>
              <div className="flex justify-end gap-3 mt-4">
                <button className="btn btn-sm btn-outline btn-info">
                  <FontAwesomeIcon icon={faEdit} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(card.id)}
                  className="btn btn-sm btn-outline btn-error"
                >
                  <FontAwesomeIcon icon={faTrash} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
