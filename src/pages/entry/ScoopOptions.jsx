import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Row } from "react-bootstrap";
import { useState } from "react";

export default function ScoopOptions({ name, imagePath, updateItemCount }) {
  const [isValid, setIsValid] = useState(true);
  const handleChange = (event) => {
    updateItemCount(name, event.target.value);

    const currentValueFloat = parseFloat(event.target.value);

    setIsValid(
      0 <= event.target.value &&
        event.target.value <= 10 &&
        Math.floor(event.target.value) === currentValueFloat
    );
  };

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} scoop`}
      />
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: "10px" }}
      >
        <Form.Label column xs="6" style={{ textAlign: "right" }}>
          {name}
        </Form.Label>
        <Col xs="5" style={{ textAlign: "left" }}>
          <Form.Control
            type="number"
            defaultValue={0}
            // min={0}
            // max={10}
            onChange={handleChange}
            isInvalid={!isValid}
          />
        </Col>
      </Form.Group>
    </Col>
  );
}
