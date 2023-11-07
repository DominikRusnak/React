import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Cookbook from "./../bricks/Cookbook";
import RecipeList from "./../bricks/RecipeList";
import 'bootstrap/dist/css/bootstrap.min.css';
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";
import styles from "./../css/cookbook.module.css";

const cookbook = {
  name: "Kuchárska kniha",
};

function RecipeDetail() {
  const [recipeLoadCall, setRecipeLoadCall] = useState({
    state: "pending",
  });
  let [searchParams] = useSearchParams();
  const [recipeListLoadCall, setRecipeListLoadCall] = useState({
    state: "pending",
  });
  
  const [ingredientsLoadCall, setIngredientsLoadCall] = useState({
    state: "pending",
  });

  const recipeId = searchParams.get("id");

  useEffect(() => {
    setRecipeLoadCall({
      state: "pending",
    });
    fetch(`http://localhost:3000/recipe/load?id=${recipeId}`, {
      method: "GET",
    }).then(async (response) => {
      const responseJson = await response.json();
      if (response.status >= 400) {
        setRecipeLoadCall({ state: "error", error: responseJson });
      } else {
        setRecipeLoadCall({ state: "success", data: responseJson });
      }
    });
  }, [recipeId]);


  function getChild() {
    if (recipeListLoadCall.state === "success" && ingredientsLoadCall.state === "success") {
      return (
        <>
          <div style={{ textAlign: "center "}}>
            <Cookbook cookbook={cookbook} />
          </div>
          <RecipeList recipeList={recipeListLoadCall.data} ingredients={ingredientsLoadCall.data}/>
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
  
export default RecipeDetail;