import React from "react";
import styles from "../css/recipe.module.css";
import Card from 'react-bootstrap/Card';
import {Text} from 'react-native';

function Recipe(props) {
    const isSimple = props.simple === "true";
    return (
        <Card className={styles.recipe} key={props.recipe.id} >
            <Card.Img variant="top" src={props.recipe.imgUri} width="400px" height="200px" />
            <Card.Body>
                <Card.Title>{props.recipe.name}</Card.Title>
                <Text numberOfLines={isSimple ? 1 : 0}>{props.recipe.description}</Text> 
            </Card.Body>
        </Card>
    )
}

export default Recipe;