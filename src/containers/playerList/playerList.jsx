import React, { useState, useEffect } from "react";
import api from "../../api";
import PlayerCard from "../../components/playerCard/playerCard";
import SearchBar from "../../components/searchBar/searchBar";
import Pagination from "../../components/pagination/pagination";
import styles from "./playerList.module.css";

export default function PlayerList() {
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(25); // Mostrar 25 jugadores por página
  const [loading, setLoading] = useState(true);
  const [sortCriteria, setSortCriteria] = useState("difference_value"); // Criterio de orden
  const [sortDirection, setSortDirection] = useState("desc"); // Dirección de orden: asc o desc

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await api.get("/data");
        console.log("Datos de los jugadores:", response.data); // Depuración

        const sortedPlayers = response.data
          .map((player) => ({
            ...player,
            market_value: convertValueToNumber(player.market_value), // Convertir market_value
            difference_value: convertValueToNumber(player.difference_value), // Convertir difference_value
            age: parseInt(player.age, 10) || 0, // Convertir edad a número
          }))
          .sort((a, b) => b.difference_value - a.difference_value); // Ordenar por defecto

        setPlayers(sortedPlayers);
        setFilteredPlayers(sortedPlayers);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los jugadores:", error);
        setLoading(false);
      }
    };
    fetchPlayers();
  }, []);

  const convertValueToNumber = (value) => {
    if (!value) return 0; // Si el valor está vacío, devuelve 0

    const normalizedValue = value
      .replace(/[^\d,.]/g, "") // Eliminar caracteres no numéricos (excepto coma/punto)
      .replace(",", "."); // Reemplazar coma por punto

    if (value.includes("mill")) {
      // Si es en millones
      return parseFloat(normalizedValue) * 1_000_000;
    } else if (value.includes("mil")) {
      // Si es en miles
      return parseFloat(normalizedValue) * 1_000;
    }

    return parseFloat(normalizedValue) || 0; // Devolver valor numérico o 0
  };

  const handleSearch = (term) => {
    const filtered = players.filter((player) =>
      player.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredPlayers(filtered);
    setCurrentPage(1); // Reiniciar a la primera página al buscar
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSortChange = (criteria, direction) => {
    setSortCriteria(criteria);
    setSortDirection(direction);

    const sorted = [...filteredPlayers].sort((a, b) => {
      const valueA = a[criteria] ?? 0; // Usar 0 si no existe el valor
      const valueB = b[criteria] ?? 0;

      if (direction === "asc") {
        return valueA - valueB; // Orden ascendente
      } else {
        return valueB - valueA; // Orden descendente
      }
    });

    setFilteredPlayers(sorted);
    setCurrentPage(1); // Reiniciar a la primera página al cambiar el orden
  };

  // Calcular los elementos para la página actual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredPlayers.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className={styles.loadingOverlay}>
        <div className={styles.spinner}></div>
        <p className={styles.loadingText}>Cargando jugadores...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <SearchBar onSearch={handleSearch} />
      <div className={styles.sorting}>
        <label>
          Ordenar por:
          <select
            value={sortCriteria}
            onChange={(e) => handleSortChange(e.target.value, sortDirection)}
          >
            <option value="difference_value">Aumento de Valor</option>
            <option value="market_value">Valor Actual</option>
            <option value="age">Edad</option>
          </select>
        </label>
        <label>
          Dirección:
          <select
            value={sortDirection}
            onChange={(e) => handleSortChange(sortCriteria, e.target.value)}
          >
            <option value="desc">Descendente</option>
            <option value="asc">Ascendente</option>
          </select>
        </label>
      </div>
      <div className={styles.grid}>
        {currentItems.map((player) => (
          <PlayerCard key={player.id} player={player} sortCriteria={sortCriteria} />
        ))}
      </div>
      <Pagination
        totalItems={filteredPlayers.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
