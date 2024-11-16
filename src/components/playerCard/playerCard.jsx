import React from "react";
import styles from "./playerCard.module.css";
import { formatValue } from "../../utils/formatters";

export default function PlayerCard({ player, sortCriteria }) {
  const handleCardClick = () => {
    const profileUrl = `https://www.transfermarkt.co${player.profile_url}`;
    window.open(profileUrl, "_blank");
  };

  // Determinar el estilo destacado
  const isHighlighted = (criteria) => sortCriteria === criteria;

  return (
    <div className={styles.card} onClick={handleCardClick}>
      <img
        src={player.image_url}
        alt={player.name}
        className={styles.playerImage}
      />
      <h2 className={styles.name}>{player.name}</h2>
      <p className={styles.age}>
        <strong>Edad:</strong>
        <span className={isHighlighted("age") ? styles.highlighted : ""}>
          {player.age}
        </span>
      </p>
      <div className={styles.club}>
        <img
          src={player.club_logo_url}
          alt={player.club}
          className={styles.clubLogo}
        />
        <span>{player.club}</span>
      </div>
      <p className={styles.position}>
        <strong>Posición:</strong> {player.position}
      </p>
      <div className={styles.nationalities}>
        <strong>Nacionalidades:</strong>
        {player.nationalities.map((nat) => (
          <div key={nat.name} className={styles.nationality}>
            <img
              src={nat.flag_url}
              alt={nat.name}
              className={styles.flag}
            />
            <span>{nat.name}</span>
          </div>
        ))}
      </div>
      <p
        className={`${styles.marketValue} ${
          isHighlighted("market_value") ? styles.highlighted : ""
        }`}
      >
        <strong>Valor de Mercado:</strong> {formatValue(player.market_value)}
      </p>
      <p
        className={`${styles.differenceValue} ${
          isHighlighted("difference_value") ? styles.highlighted : ""
        }`}
      >
        <strong>Aumento de Valor:</strong> {formatValue(player.difference_value)}
      </p>
    </div>
  );
}
