import Icon from "@mdi/react";
import Button from "react-bootstrap/Button";
import { Modal, Image } from 'react-bootstrap';
import { useState, useEffect } from 'react'
import { mdiPlus, mdiLoading } from '@mdi/js'
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function RecipeForm({ ingredients, show, recipe, setAddRecipeShow, onComplete }) {

    const [hasData, setData] = useState(false);
    const handleSetData = () => setData(true);
    const defaultForm = {
        name: "",
        description: "",
        imgUri: "",
        ingredients: [],
    }

    const defaultIngredients = {
        ingredient_1: {
            ingredientId: "",
            ingredientAmount: 0,
            ingredientUnit: "",
        },
        ingredient_2: {
            ingredientId: "",
            ingredientAmount: 0,
            ingredientUnit: "",
        },
        ingredient_3: {
            ingredientId: "",
            ingredientAmount: 0,
            ingredientUnit: "",
        },
        ingredient_4: {
            ingredientId: "",
            ingredientAmount: 0,
            ingredientUnit: "",
        },
    }

    useEffect(() => {
        if (recipe) {
          setFormData({
            name: recipe.name,
            description: recipe.description,
            imgUri: recipe.imgUri,
            ingredients: recipe.ingredients,
          });
          handleSetData()
        }
        console.log(recipe);
      }, [recipe]);

    const handleShowModal = () => setAddRecipeShow({state: true});
    const handleCloseModal = () => {
        setAddRecipeShow({ state: false });
        setFormData(defaultForm);
        setData(false);
    };


    const [validated, setValidated] = useState(false); 
    const [formData, setFormData] = useState(defaultForm);
    const [formIngredients, setFormIngredients] = useState(defaultIngredients)
    const [recipeAddCall, setRecipeAddCall] = useState({ 
        state: 'inactive' 
      });

    const setField = (name, val) => {
        return setFormData((formData) => {
          const newData = { ...formData };
          newData[name] = val;
          return newData;
        });
    };

    const setIngredientId = (name, val) => {
        return setFormIngredients((formIngredients) => {
            const newData = { ...formIngredients };
            const ingredientInfo = newData[name];
            ingredientInfo.ingredientId = val;
            return newData;
        });
    };

    const setIngredientAmount = (name, val) => {
        return setFormIngredients((formIngredients) => {
            const newData = { ...formIngredients };
            const ingredientInfo = newData[name];
            ingredientInfo.ingredientAmount = val;
            return newData;
        });
    };

    const setIngredientUnit = (name, val) => {
        return setFormIngredients((formIngredients) => {
            const newData = { ...formIngredients };
            const ingredientInfo = newData[name];
            ingredientInfo.ingredientUnit = val;
            return newData;
        });
    };
    
    const handleSubmit = async (e) => {
        const form = e.currentTarget; 

        e.preventDefault();
        e.stopPropagation();
    
        const payload = {
          ...formData, id: recipe ? recipe.id : null
        };



        if (!form.checkValidity()) { 
            setValidated(true); 
            return; 
        } 
        if (!hasData) {
            payload.ingredients.push({id: formIngredients.ingredient_1.ingredientId, amount: formIngredients.ingredient_1.ingredientAmount, unit: formIngredients.ingredient_1.ingredientUnit});
            payload.ingredients.push({id: formIngredients.ingredient_2.ingredientId, amount: formIngredients.ingredient_2.ingredientAmount, unit: formIngredients.ingredient_2.ingredientUnit});
            payload.ingredients.push({id: formIngredients.ingredient_3.ingredientId, amount: formIngredients.ingredient_3.ingredientAmount, unit: formIngredients.ingredient_3.ingredientUnit});
            payload.ingredients.push({id: formIngredients.ingredient_4.ingredientId, amount: formIngredients.ingredient_4.ingredientAmount, unit: formIngredients.ingredient_4.ingredientUnit});
        }
    
        setRecipeAddCall({ state: 'pending' });
        const res = await fetch(`http://localhost:3000/recipe/${recipe ? 'update' : 'create'}`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
        });

        const data = await res.json();
        if (res.status >= 400) {
            setRecipeAddCall({ state: "error", error: data });
        } else {
            setRecipeAddCall({ state: "success", data });
            if (typeof onComplete === 'function') {
                onComplete(data);
            }
            handleCloseModal();
        }
    };
    
    return (
      <>
        <Modal show={show} onHide={handleCloseModal}>
            <Form noValidate validated={validated} onSubmit={(e) => handleSubmit(e)}>
                <Modal.Header closeButton>
                    <Modal.Title>{recipe ? 'Upravit' : 'Přidat'} recept</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form.Group className="mb-3">
                    <Form.Label>Jméno</Form.Label>
                    <Form.Control
                        type="text"
                        value={formData.name}
                        onChange={(e) => setField("name", e.target.value)}
                        maxLength={50}
                        required
                    />
                    <Form.Control.Feedback type="invalid"> 
                        Zadejte název s maximální délkou 50 znaků
                    </Form.Control.Feedback> 
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Postup</Form.Label>
                    
                    <Form.Control
                        as="textarea" rows={6}
                        value={formData.description}
                        onChange={(e) => setField("description", e.target.value)}
                        maxLength={10000}
                        required
                        className="mb-3"
                    />
                    <Form.Control.Feedback type="invalid"> 
                        Zadej postup, který nebude delší, než 10 000 znaků
                    </Form.Control.Feedback> 
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Obrázek</Form.Label>
                    <Form.Control
                        type="text"
                        value={formData.imgUri}
                        onChange={(e) => setField("imgUri", e.target.value)}
                    />
                    {formData.imgUri && <Image className="img-fluid rounded mx-auto d-block m-3" alt={formData.name}
                                            src={formData.imgUri}/>}
                    <Form.Control.Feedback type="invalid">
                    Zadej obrázek pomocí URL
                    </Form.Control.Feedback>
                </Form.Group>
                { hasData ? (<br/>) : (
                <div>
                    <Row>
                        <Form.Group as={Col} className="mb-3">
                            <Form.Label>Ingredience</Form.Label>
                                <Form.Select
                                    type="text"
                                    defaultValue="Zvol ingredienci"
                                    onChange={(e) => setIngredientId("ingredient_1", e.target.value)}
                                    required
                                >
                                    
                                <option>Zvol ingredienci</option>
                                {ingredients.map((ingredient) => (
                                    <option key={ingredient.id} value={ingredient.id}>{ingredient.name}</option>
                                ))}
                                </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3">
                            <Form.Label>Počet</Form.Label>
                            <Form.Control
                                value={formIngredients.ingredient_1.ingredientAmount}
                                onChange={(e) => setIngredientAmount("ingredient_1", parseFloat(e.target.value))}
                                required
                            />
                            <Form.Control.Feedback type="invalid"> 
                                Zadej množství/hmotnost
                            </Form.Control.Feedback> 
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3">
                            <Form.Label>Jednotka</Form.Label>
                            <Form.Control
                                type="text"
                                value={formIngredients.ingredient_1.ingredientUnit}
                                onChange={(e) => setIngredientUnit("ingredient_1", e.target.value)}
                                required
                            />
                            <Form.Control.Feedback type="invalid"> 
                                Zadej jednotku
                            </Form.Control.Feedback> 
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} className="mb-3">
                            <Form.Label>Ingredience</Form.Label>
                                <Form.Select
                                    type="text"
                                    defaultValue="Zvol ingredienci"
                                    onChange={(e) => setIngredientId("ingredient_2", e.target.value)}
                                    required
                                >
                                    
                                <option defaultValue>Zvol ingredienci</option>
                                {ingredients.map((ingredient) => (
                                    <option key={ingredient.id} value={ingredient.id}>{ingredient.name}</option>
                                ))}
                                </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3">
                            <Form.Label>Počet</Form.Label>
                            <Form.Control
                                type="text"
                                value={formIngredients.ingredient_2.ingredientAmount}
                                onChange={(e) => setIngredientAmount("ingredient_2", parseFloat(e.target.value))}
                                required
                            />
                            <Form.Control.Feedback type="invalid"> 
                                Zadej množství/hmotnost
                            </Form.Control.Feedback> 
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3">
                            <Form.Label>Jednotka</Form.Label>
                            <Form.Control
                                type="text"
                                value={formIngredients.ingredient_2.ingredientUnit}
                                onChange={(e) => setIngredientUnit("ingredient_2", e.target.value)}
                                required
                            />
                            <Form.Control.Feedback type="invalid"> 
                                Zadej jednotku
                            </Form.Control.Feedback> 
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} className="mb-3">
                            <Form.Label>Ingredience</Form.Label>
                                <Form.Select
                                    type="text"
                                    defaultValue="Zvol ingredienci"
                                    onChange={(e) => setIngredientId("ingredient_3", e.target.value)}
                                    required
                                >
                                    
                                <option defaultValue>Zvol ingredienci</option>
                                {ingredients.map((ingredient) => (
                                    <option key={ingredient.id} value={ingredient.id}>{ingredient.name}</option>
                                ))}
                                </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3">
                            <Form.Label>Počet</Form.Label>
                            <Form.Control
                                type="text"
                                value={formIngredients.ingredient_3.ingredientAmount}
                                onChange={(e) => setIngredientAmount("ingredient_3", parseFloat(e.target.value))}
                                required
                            />
                            <Form.Control.Feedback type="invalid"> 
                                Zadej množství/hmotnost
                            </Form.Control.Feedback> 
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3">
                            <Form.Label>Jednotka</Form.Label>
                            <Form.Control
                                type="text"
                                value={formIngredients.ingredient_3.ingredientUnit}
                                onChange={(e) => setIngredientUnit("ingredient_3", e.target.value)}
                                required
                            />
                            <Form.Control.Feedback type="invalid"> 
                                Zadej jednotku
                            </Form.Control.Feedback> 
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} className="mb-3">
                            <Form.Label>Ingredience</Form.Label>
                                <Form.Select
                                    type="text"
                                    defaultValue="Zvol ingredienci"
                                    onChange={(e) => setIngredientId("ingredient_4", e.target.value)}
                                    required
                                >
                                    
                                <option defaultValue>Zvol ingredienci</option>
                                {ingredients.map((ingredient) => (
                                    <option key={ingredient.id} value={ingredient.id}>{ingredient.name}</option>
                                ))}
                                </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3">
                            <Form.Label>Počet</Form.Label>
                            <Form.Control
                                type="text"
                                value={formIngredients.ingredient_4.ingredientAmount}
                                onChange={(e) => setIngredientAmount("ingredient_4", parseFloat(e.target.value))}
                                required
                            />
                            <Form.Control.Feedback type="invalid"> 
                                Zadej množství/hmotnost
                            </Form.Control.Feedback> 
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3">
                            <Form.Label>Jednotka</Form.Label>
                            <Form.Control
                                type="text"
                                value={formIngredients.ingredient_4.ingredientUnit}
                                onChange={(e) => setIngredientUnit("ingredient_4", e.target.value)}
                                required
                            />
                            <Form.Control.Feedback type="invalid"> 
                                Zadej jednotku
                            </Form.Control.Feedback> 
                        </Form.Group>
                    </Row>
                    </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <div className="d-flex flex-row gap-2">
                        <div>
                            { recipeAddCall.state === 'error' && 
                                <div className="text-danger">Error: {recipeAddCall.error.errorMessage}</div> 
                            }
                        </div>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Zavřít
                        </Button>
                        <Button variant="primary" type="submit" disabled={recipeAddCall.state === 'pending'}>
                            { recipeAddCall.state === 'pending' ? (
                                <Icon size={0.8} path={mdiLoading} spin={true} />
                                ) : (
                                recipe ? 'Upravit' : 'Vytvořit'
                            )}
                        </Button>
                    </div>                
                </Modal.Footer>
            </Form>
        </Modal>
        <Button
            style={{ float: 'right' }}
            variant="primary"
            class="btn btn-success btn-sm"
            onClick={handleShowModal}
        >
        <Icon path={mdiPlus} size={1} />
            Přidat recept
        </Button>
      </>
    )
  }

  export default RecipeForm;