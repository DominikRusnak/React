import React from "react";
import Recipe from "./Recipe";

function RecipeSimpleList(props) {
    return props.recipeList.map((recipe) => {
        return <Recipe key={recipe.id} recipe={recipe} simple="true" ingredients={props.ingredients} />;
    });
}

export default RecipeSimpleList;