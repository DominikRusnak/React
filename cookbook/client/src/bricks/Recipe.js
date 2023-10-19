import React from "react";
import styles from "../css/recipe.module.css";
import Card from 'react-bootstrap/Card';

function Recipe(props) {
    return (
        <Card className={styles.recipe} key={props.recipe.id}>
            <Card.Img variant="top" src={props.recipe.imgUri} width="400px" height="200px" />
            <Card.Body>
                <Card.Title>{props.recipe.name}</Card.Title>
                <Card.Text>{props.recipe.description}</Card.Text> 
            </Card.Body>
        </Card>
    )
}

export default Recipe;