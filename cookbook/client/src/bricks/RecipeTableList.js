import React, { useContext } from "react";
import Table from "react-bootstrap/Table";
import Icon from "@mdi/react";
import { mdiPencilOutline } from '@mdi/js'
import UserContext from './../UserProvider';


function RecipeTableList(props) {
  const {isAuthorized} = useContext(UserContext);
  return (
    <Table>
      <thead>
        <tr>
          <th>Název</th>
          <th>Postup</th>
        </tr>
      </thead>
      <tbody>
        {props.recipeList.map((recipe) => {
          return (
            <tr key={recipe.id}>
              <td>{recipe.name}</td>
              <td>{recipe.description}</td>
              <td>
                { isAuthorized && 
                  <Icon 
                      size={1} 
                      path={mdiPencilOutline} 
                      style={{ color: 'green', cursor: 'pointer' }} 
                      onClick={() => props.handleAddRecipeShow(recipe)} 
                  />
                }
              </td> 
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default RecipeTableList;