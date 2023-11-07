import React from "react";
import Table from "react-bootstrap/Table";

function IngredientTableList(props) {
  return (
    <Table style={{ textAlign: "center" }}>
      <thead>
        <tr>
          <th>Název</th>
        </tr>
      </thead>
      <tbody>
        {props.ingredients.map((ingredient) => {
          return (
            <tr key={ingredient.id}>
              <td>{ingredient.name}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default IngredientTableList;