import React from "react";
import styles from "../css/recipe.module.css";
import Card from 'react-bootstrap/Card';



function Recipe(props) {
    const isSimple = props.simple === "true";
    
    function cutString() {
        if (isSimple) return <Card.Text>{props.recipe.description.substring(0, 50)}{"..."}</Card.Text>
        else return <Card.Text>{props.recipe.description}</Card.Text>
    }

    function getIngredients() {
        console.log("Start IngredientList")
        console.log(props.ingredientList)
        console.log("End IngredientList")
        if (isSimple) {
            return (
                props.recipe.ingredients.slice(0, 4).map((ingredient) => (
                    <li key={ingredient.id}>
                        {ingredient.amount} {ingredient.unit}{" "}
                        {props.ingredients.find((ingredientInList) => ingredientInList.id === ingredient.id).name}
                    </li>
                ))
            );
        } else {
            return(
                props.recipe.ingredients.map((ingredient) => (
                    <li key={ingredient.id}>
                        {ingredient.amount} {ingredient.unit}{" "}
                        {props.ingredients.find((ingredientInList) => ingredientInList.id === ingredient.id).name}
                    </li>
                ))
            );
        }
    }
    
    return (
        <Card className={styles.recipe} key={props.recipe.id} >
            <Card.Img variant="top" src={props.recipe.imgUri} width="400px" height="200px" />
            <Card.Body>
                <Card.Title>{props.recipe.name}</Card.Title>
                {cutString()}
                {getIngredients()}
            </Card.Body>
        </Card>
    )
}

export default Recipe;