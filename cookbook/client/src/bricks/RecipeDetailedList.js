import React from "react";
import Recipe from "./Recipe";

function RecipeDetailedList(props) {
    return (
        <div class="row">
            {props.recipeList.map((recipe) => {
                return( 
                    <div class="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3" style={{ paddingBottom: "16px" }} >
                        <Recipe key={recipe.id} recipe={recipe} simple="false" ingredients={props.ingredients} handleAddRecipeShow={props.handleAddRecipeShow} />
                    </div>
                );
            })}
        </div> 
    );
}

export default RecipeDetailedList;