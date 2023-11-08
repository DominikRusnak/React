import React, { useState, useMemo } from "react";
import RecipeTableList from "./RecipeTableList";
import RecipeSimpleList from "./RecipeSimpleList";
import RecipeDetailedList from "./RecipeDetailedList";
import RecipeForm from "./RecipeForm";

import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import Icon from "@mdi/react";
import { mdiTable, mdiViewGridOutline, mdiViewGridCompact, mdiMagnify, mdiPlus } from "@mdi/js";

function RecipeList(props) {
    const [viewType, setViewType] = useState("grid");
    const isGrid = viewType === "grid";
    const isTable = viewType === "table";
    const [searchBy, setSearchBy] = useState("");
    const [addRecipeShow, setAddRecipeShow] = useState(false);
  
    const handleAddRecipeShow = () => setAddRecipeShow(true);

    const filteredRecipeList = useMemo(() => {
      return props.recipeList.filter((item) => {
        return (
          item.name
            .toLocaleLowerCase()
            .includes(searchBy.toLocaleLowerCase()) ||
          item.description.toLocaleLowerCase().includes(searchBy.toLocaleLowerCase())
        );
      });
    }, [searchBy, props.recipeList]);
  
    function handleSearch(event) {
      event.preventDefault();
      setSearchBy(event.target["searchInput"].value);
    }
  
    function handleSearchDelete(event) {
      if (!event.target.value) setSearchBy("");
    }

    return (
      console.log("recipelistingredients"),
      console.log(props.ingredients),
      console.log("recipelistingredientsENDENDEND"),
        <div>
          <Navbar collapseOnSelect expand="sm" bg="light">
            <div className="container-fluid">
              <Navbar.Brand>Seznam receptů</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse style={{ justifyContent: "right" }}>
              <div>
                <Form className="d-flex" onSubmit={handleSearch}>
                    <Form.Control
                        id={"searchInput"}
                        style={{ maxWidth: "150px" }}
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        onChange={handleSearchDelete}
                    />
                    <Button
                        style={{ marginRight: "8px" }}
                        variant="outline-success"
                        type="submit"
                    >
                        <Icon size={1} path={mdiMagnify} />
                    </Button>
                    <Button
                        className={"d-none d-md-block"} 
                        variant="outline-primary"
                        onClick={() =>
                        setViewType((currentState) => {
                            if (currentState === "grid") return "table";
                            else if (currentState === "table") return "simpleGrid";
                            else return "grid";
                        })
                        }
                    >
                        <Icon size={1} path={isGrid ? mdiTable : isTable ? mdiViewGridCompact : mdiViewGridOutline} />{" "}
                        {isGrid ? "Tabulka" : isTable ? "Jednoduchý Grid" : "Grid"}
                    </Button>
                    <RecipeForm
                      ingredients={props.ingredients}
                    />
                </Form>
              </div>
              </Navbar.Collapse>
            </div>
          </Navbar>
          <div class="container">
            <div className={"d-block d-md-none"}>
              <RecipeSimpleList recipeList={filteredRecipeList} ingredients={props.ingredients} />
            </div>
            <div className={"d-none d-md-block"}>
              {isGrid ? (
                <RecipeDetailedList recipeList={filteredRecipeList} ingredients={props.ingredients} />
              ) : isTable ? (
                <RecipeTableList recipeList={filteredRecipeList} ingredients={props.ingredients} />
              ) : (
                <RecipeSimpleList recipeList={filteredRecipeList} ingredients={props.ingredients} />
              )}
            </div>
          </div>
        </div>
        
      );

}

export default RecipeList;