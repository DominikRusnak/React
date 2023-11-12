import React from "react";
import Card from 'react-bootstrap/Card';
import Icon from "@mdi/react";
import { mdiPencilOutline } from '@mdi/js'


function Recipe(props) {
    const isSimple = props.simple === "true";
    
    function cutString() {
        if (isSimple) return <Card.Text>{props.recipe.description.substring(0, 50)}{"..."}</Card.Text>
        else return <Card.Text>{props.recipe.description}</Card.Text>
    }

    function getIngredients() {
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
        <Card key={props.recipe.id} >
            <div>
                <Card.Img variant="top" src={props.recipe.imgUri}  />
            </div>
            <td> 
                <Icon 
                    size={1} 
                    path={mdiPencilOutline} 
                    style={{ color: 'green', cursor: 'pointer' }} 
                    onClick={() => props.handleAddRecipeShow(props.recipe)} 
                /> 
            </td> 
            <Card.Body>
                <Card.Title style={{ textAlign: "center" }}>{props.recipe.name}</Card.Title>
                {cutString()}
                {getIngredients()}
            </Card.Body>
        </Card>
    )
}

export default Recipe;