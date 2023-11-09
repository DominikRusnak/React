import Icon from "@mdi/react";
import Button from "react-bootstrap/Button";
import { Modal } from 'react-bootstrap';
import { useState } from 'react'
import { mdiPlus } from '@mdi/js'
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function RecipeForm({ ingredients }) {
    const [isModalShown, setShow] = useState(false);
  
    const handleShowModal = () => setShow(true);
    const handleCloseModal = () => setShow(false);

    const [formData, setFormData] = useState({
        name: "",
        procedure: "",
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

    });

    const setField = (name, val) => {
        return setFormData((formData) => {
          const newData = { ...formData };
          newData[name] = val;
          return newData;
        });
    };

    const setIngredientId = (name, val) => {
        return setFormData((formData) => {
            const newData = { ...formData };
            const ingredientInfo = newData[name];
            ingredientInfo.ingredientId = val;
            return newData;
        });
    };

    const setIngredientAmount = (name, val) => {
        return setFormData((formData) => {
            const newData = { ...formData };
            const ingredientInfo = newData[name];
            ingredientInfo.ingredientAmount = val;
            return newData;
        });
    };

    const setIngredientUnit = (name, val) => {
        return setFormData((formData) => {
            const newData = { ...formData };
            const ingredientInfo = newData[name];
            ingredientInfo.ingredientUnit = val;
            return newData;
        });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();
    
        const payload = {
          ...formData,
        };
    
        console.log(payload);
    };
    
    return (
      <>
        <Modal show={isModalShown} onHide={handleCloseModal}>
            <Form onSubmit={(e) => handleSubmit(e)}>
                <Modal.Header closeButton>
                    <Modal.Title>Přidat recept</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form.Group className="mb-3">
                    <Form.Label>Jméno</Form.Label>
                    <Form.Control
                        type="text"
                        value={formData.name}
                        onChange={(e) => setField("name", e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Postup</Form.Label>
                    <div>
                    <Form.Control
                        as="textarea" rows={6}
                        value={formData.procedure}
                        onChange={(e) => setField("procedure", e.target.value)}
                        required
                        className="mb-3"
                    /></div>
                </Form.Group>
                
                <Row>
                    <Form.Group as={Col} className="mb-3">
                        <Form.Label>Ingredience</Form.Label>
                            <Form.Select
                                type="text"
                                defaultValue="Zvol ingredienci"
                                onChange={(e) => setIngredientId("ingredient_1", e.target.value)}
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
                            value={formData.ingredient_1.ingredientAmount}
                            onChange={(e) => setIngredientAmount("ingredient_1", e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3">
                        <Form.Label>Jednotka</Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.ingredient_1.ingredientUnit}
                            onChange={(e) => setIngredientUnit("ingredient_1", e.target.value)}
                            required
                        />
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
                            value={formData.ingredient_2.ingredientAmount}
                            onChange={(e) => setIngredientAmount("ingredient_2", e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3">
                        <Form.Label>Jednotka</Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.ingredient_2.ingredientUnit}
                            onChange={(e) => setIngredientUnit("ingredient_2", e.target.value)}
                            required
                        />
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
                            value={formData.ingredient_3.ingredientAmount}
                            onChange={(e) => setIngredientAmount("ingredient_3", e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3">
                        <Form.Label>Jednotka</Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.ingredient_3.ingredientUnit}
                            onChange={(e) => setIngredientUnit("ingredient_3", e.target.value)}
                            required
                        />
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
                            value={formData.ingredient_4.ingredientAmount}
                            onChange={(e) => setIngredientAmount("ingredient_4", e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3">
                        <Form.Label>Jednotka</Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.ingredient_4.ingredientUnit}
                            onChange={(e) => setIngredientUnit("ingredient_4", e.target.value)}
                            required
                        />
                    </Form.Group>
                </Row>

                </Modal.Body>
                <Modal.Footer>
                    <div className="d-flex flex-row gap-2">
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Zavřít
                        </Button>
                        <Button variant="primary" type="submit">
                            Vytvořit
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