import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";
import styles from "./../css/cookbook.module.css";
import DisplayRecipeList from "./../bricks/RecipeList";

function RecipeList() {
  const [recipeListLoadCall, setRecipeListLoadCall] = useState({
    state: "pending",
  });
  
  const [ingredientsLoadCall, setIngredientsLoadCall] = useState({
    state: "pending",
  });

  useEffect(() => {
    fetch(`http://localhost:3000/recipe/list`, {
      method: "GET",
    }).then(async (response) => {
      const responseJson = await response.json();
      if (response.status >= 400) {
        setRecipeListLoadCall({ state: "error", error: responseJson });
      } else {
        setRecipeListLoadCall({ state: "success", data: responseJson });
      }
    });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3000/ingredient/list`, {
      method: "GET",
    }).then(async (response) => {
      const responseJson = await response.json();
      if (response.status >= 400) {
        setIngredientsLoadCall({ state: "error", error: responseJson });
      } else {
        setIngredientsLoadCall({ state: "success", data: responseJson });
      }
    });

  }, []);

  function getChild() {
    if (recipeListLoadCall.state === "success" && ingredientsLoadCall.state === "success") {
      return (
        <>
          <DisplayRecipeList recipeList={recipeListLoadCall.data} ingredients={ingredientsLoadCall.data}/>
        </>
      );
    } else if (recipeListLoadCall.state === "error" || ingredientsLoadCall.state === "error") {
      return (
        <div className={styles.error}>
            <div>Nepodařilo se načíst recepty nebo ingredience.</div>
            <br />
            <pre>{JSON.stringify(recipeListLoadCall.error, null, 2)}</pre>
          </div>
      );
    } else {
      return (
        <div className={styles.loading}>
          <Icon size={2} path={mdiLoading} spin={true} />
        </div>
      );
    }
  }
  return getChild();
}
  
export default RecipeList;