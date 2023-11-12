import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";
import styles from "./../css/cookbook.module.css";
import IngredientTableList from "./../bricks/IngredientTableList";

function IngredientList() {

  
  const [ingredientsLoadCall, setIngredientsLoadCall] = useState({
    state: "pending",
  });


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
    if (ingredientsLoadCall.state === "success") {
      return (
        <>
          <IngredientTableList ingredients={ingredientsLoadCall.data}/>
        </>
      );
    } else if (ingredientsLoadCall.state === "error") {
      return (
        <div className={styles.error}>
            <div>Nepodařilo se načíst ingredience.</div>
            <br />
            <pre>{JSON.stringify(ingredientsLoadCall.error, null, 2)}</pre>
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
  
  export default IngredientList;