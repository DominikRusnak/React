import React, { useState, useMemo } from "react";
import RecipeTableList from "./RecipeTableList";
import RecipeSimpleList from "./RecipeSimpleList";
import RecipeDetailedList from "./RecipeDetailedList";

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

    const filteredRecipeList = useMemo(() => {
      return props.recipeList.filter((item) => {
        return (
          item.name
            .toLocaleLowerCase()
            .includes(searchBy.toLocaleLowerCase()) ||
          item.description.toLocaleLowerCase().includes(searchBy.toLocaleLowerCase())
        );
      });
    }, [searchBy]);
  
    function handleSearch(event) {
      event.preventDefault();
      setSearchBy(event.target["searchInput"].value);
    }
  
    function handleSearchDelete(event) {
      if (!event.target.value) setSearchBy("");
    }

    return (
        <div>
          <Navbar bg="light">
            <div className="container-fluid">
              <Navbar.Brand>Seznam receptů</Navbar.Brand>
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
                </Form>
              </div>
            </div>
          </Navbar>
          {isGrid ? (
            <RecipeDetailedList recipeList={filteredRecipeList} />
          ) : isTable ? (
            <RecipeTableList recipeList={filteredRecipeList} />
          ) : (
            <RecipeSimpleList recipeList={filteredRecipeList} />
          )}
        </div>
      );
}

export default RecipeList;