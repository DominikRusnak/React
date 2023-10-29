import React from "react";
import Recipe from "./Recipe";

function RecipeDetailedList(props) {
    return props.recipeList.map((recipe) => {
        return <Recipe key={recipe.id} recipe={recipe} simple="false" />;
    });
}

export default RecipeDetailedList;