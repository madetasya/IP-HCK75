import React, { useState } from "react";

export default function Pagination({ postsPerPage, totalPosts, page }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="mt-4">
      <ul className="flex justify-center space-x-4">
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => page(number)}
              className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-700"
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
