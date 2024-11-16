import React from "react";
import styles from "./pagination.module.css";

export default function Pagination({ totalItems, itemsPerPage, currentPage, onPageChange }) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Calcular rango de páginas visibles
  const maxVisiblePages = 5; // Número máximo de páginas visibles
  const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  const handlePageClick = (page) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className={styles.pagination}>
      <button
        className={styles.pageButton}
        disabled={currentPage === 1}
        onClick={() => handlePageClick(currentPage - 1)}
      >
        &laquo; Anterior
      </button>
      {startPage > 1 && (
        <button
          className={styles.pageButton}
          onClick={() => handlePageClick(1)}
        >
          1
        </button>
      )}
      {startPage > 2 && <span className={styles.ellipsis}>...</span>}
      {pages.map((page) => (
        <button
          key={page}
          className={`${styles.pageButton} ${currentPage === page ? styles.active : ""}`}
          onClick={() => handlePageClick(page)}
        >
          {page}
        </button>
      ))}
      {endPage < totalPages - 1 && <span className={styles.ellipsis}>...</span>}
      {endPage < totalPages && (
        <button
          className={styles.pageButton}
          onClick={() => handlePageClick(totalPages)}
        >
          {totalPages}
        </button>
      )}
      <button
        className={styles.pageButton}
        disabled={currentPage === totalPages}
        onClick={() => handlePageClick(currentPage + 1)}
      >
        Siguiente &raquo;
      </button>
    </div>
  );
}
