import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { Popover } from "react-bootstrap";
import { OverlayTrigger } from "react-bootstrap";

export default function SummaryForm({ setOrderPhase }) {
  const [tcchecked, setTcChecked] = useState(false);
  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>No ice cream will actually be delivered</Popover.Body>
    </Popover>
  );

  const checkboxLabel = (
    <OverlayTrigger placement="right" overlay={popover}>
      <span>
        I agree to
        <span style={{ color: "blue" }}>Terms and Conditions</span>
      </span>
    </OverlayTrigger>
  );

  return (
    <Form>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          checked={tcchecked}
          onChange={(e) => setTcChecked(e.target.checked)}
          label={checkboxLabel}
        />
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        disabled={!tcchecked}
        onClick={() => setOrderPhase("complete")}
      >
        Confirm Order
      </Button>
    </Form>
  );
}
