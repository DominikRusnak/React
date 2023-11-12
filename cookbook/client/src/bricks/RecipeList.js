import React, { useState, useMemo } from "react";
import RecipeTableList from "./RecipeTableList";
import RecipeSimpleList from "./RecipeSimpleList";
import RecipeDetailedList from "./RecipeDetailedList";
import RecipeForm from "./RecipeForm";

import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import Icon from "@mdi/react";
import { mdiTable, mdiViewGridOutline, mdiViewGridCompact, mdiMagnify } from "@mdi/js";

function RecipeList(props) {
    const [viewType, setViewType] = useState("grid");
    const isGrid = viewType === "grid";
    const isTable = viewType === "table";
    const [searchBy, setSearchBy] = useState("");
    const [recipeListCall, setRecipeListCall] =
    useState({
      state: "pending",
    });
    const [addRecipeShow, setAddRecipeShow] = useState({ 
      state: false 
    }); 

    const handleAddRecipeShow = (data) => setAddRecipeShow({ state: true, data });

    const handleRecipeAdded = (recipe) => {
      if (recipeListCall.state === "success") {
        let recipeList = [ ...recipeListCall.data];

        if (recipe.id) {
          recipeList = recipeList.filter((r) => r.id !== recipe.id);
        }

        setRecipeListCall({
          state: "success",
          data: [...recipeList, recipe]
        });
      }
    }

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

    console.log(handleAddRecipeShow)
    return (
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
                      show={addRecipeShow.state}
                      recipe={addRecipeShow.data} 
                      setAddRecipeShow={setAddRecipeShow}
                      onComplete={(recipe) => handleRecipeAdded(recipe)}
                    />
                </Form>
              </div>
              </Navbar.Collapse>
            </div>
          </Navbar>
          <div class="container">
            <div className={"d-block d-md-none"}>
              <RecipeSimpleList recipeList={filteredRecipeList} ingredients={props.ingredients} handleAddRecipeShow={handleAddRecipeShow} />
            </div>
            <div className={"d-none d-md-block"}>
              {isGrid ? (
                <RecipeDetailedList recipeList={filteredRecipeList} ingredients={props.ingredients} handleAddRecipeShow={handleAddRecipeShow} />
              ) : isTable ? (
                <RecipeTableList recipeList={filteredRecipeList} ingredients={props.ingredients} handleAddRecipeShow={handleAddRecipeShow} />
              ) : (
                <RecipeSimpleList recipeList={filteredRecipeList} ingredients={props.ingredients} handleAddRecipeShow={handleAddRecipeShow} />
              )}
            </div>
          </div>
        </div>
      );

}

export default RecipeList;