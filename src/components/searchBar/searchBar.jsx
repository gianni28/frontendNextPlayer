import React from "react";
import styles from "./searchBar.module.css";

export default function SearchBar({ onSearch }) {
  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Buscar jugador..."
        onChange={(e) => onSearch(e.target.value)}
        className={styles.searchInput}
      />
    </div>
  );
}
