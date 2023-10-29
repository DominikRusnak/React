import './App.css';
import Cookbook from "./bricks/Cookbook";
import RecipeList from "./bricks/RecipeList";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";
import styles from "./css/cookbook.module.css";

const cookbook = {
  name: "Kuchárska kniha",
};

function App() {
  const [recipeListLoadCall, setRecipeListLoadCall] = useState({
    state: "pending",
  });
  
  const [ingredientsLoadCall, setIngredientsLoadCall] = useState({
    state: "pending",
  });

  useEffect(() => {
    console.log("Recipelist")
    fetch(`http://localhost:3000/recipe/list`, {
      method: "GET",
    }).then(async (response) => {
      console.log("insideResponse")
      const responseJson = await response.json();
      console.log("pastAwait")
      if (response.status >= 400) {
        setRecipeListLoadCall({ state: "error", error: responseJson });
        console.log("RecipeListlistFail")
      } else {
        setRecipeListLoadCall({ state: "success", data: responseJson });
        console.log("RecipeListlistsuccess")
      }
    });
  }, []);

  useEffect(() => {
    console.log("IngredientList")
    fetch(`http://localhost:3000/ingredient/list`, {
      method: "GET",
    }).then(async (response) => {
      const responseJson = await response.json();
      if (response.status >= 400) {
        setIngredientsLoadCall({ state: "error", error: responseJson });
        console.log("ingredientlistFail")
      } else {
        setIngredientsLoadCall({ state: "success", data: responseJson });
        console.log("ingredientlistsuccess")
      }
    });

  }, []);

  function getChild() {
    console.log("getChild")
    console.log({recipeListLoadCall})
    console.log({ingredientsLoadCall})
    if (recipeListLoadCall.state === "success" && ingredientsLoadCall.state === "success") {
      return (
        console.log("OMGUZFUNGUJ"),
        <>
          
          <Cookbook cookbook={cookbook} />
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

  return <div className="App">{getChild()}</div>;
}

export default App;
