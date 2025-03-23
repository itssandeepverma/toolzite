import React from "react";
import CategoryCard from "./CategoryCard";
import { PRODUCT_CATEGORIES } from "../../../constants/constants";

const ListAllCard = () => {
  // Styles object for inline styling
  const styles = {
    container: {
      maxWidth: "1200px",
      margin: "50px auto 0", // Added 50px top margin
      padding: "20px",
    },
    title: {
      textAlign: "center",
      fontSize: "26px",
      fontWeight: "bold",
      color: "#fff",
      marginBottom: "30px",
      marginTop: "30px", // Added 20px top margin
      fontFamily: "Poppins, sans-serif"
    },
    subtitle: {
      textAlign: "center",
      fontSize: "18px",
      color: "#ccc",
      marginBottom: "20px",
    },
    gridContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gap: "20px",
      padding: "20px",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title }>All Categories</h2>
      <div style={styles.gridContainer}>
        {PRODUCT_CATEGORIES.map((category, index) => (
          <CategoryCard key={index} category={category} />
        ))}
      </div>
    </div>
  );
};

export default ListAllCard;
