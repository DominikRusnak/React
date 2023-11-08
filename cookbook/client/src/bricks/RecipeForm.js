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
        ingredientList: [{
            ingredientId: "",
            ingredientAmount: null,
            ingredientUnit: "",
        }],
    });

    const setField = (name, val) => {
        return setFormData((formData) => {
          const newData = { ...formData };
          newData[name] = val;
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
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Postup</Form.Label>
                    <Form.Control
                        type="text"
                        value={formData.procedure}
                        onChange={(e) => setField("procedure", e.target.value)}
                    />
                </Form.Group>
                
                <Row>
                    <Form.Group as={Col} className="mb-3">
                        <Form.Label>Ingredience</Form.Label>
                            <Form.Select
                                value={formData.ingredientList}
                                onChange={(e) => setField("ingredientList.ingredientId", parseInt(e.target.value))}
                                required
                            >
                            <option value="" disabled>Zvol ingredienci</option>
                            {ingredients.map((ingredient) => (
                                <option key={ingredient.id}>{ingredient.name}</option>
                            ))}
                            </Form.Select>
                    </Form.Group>
                </Row>

                </Modal.Body>
                <Modal.Footer>
                                
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