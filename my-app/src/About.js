import { Card } from "react-bootstrap";

export default function About() {
  return (
    <Card inverse style={{ backgroundColor: "#F5F5F5" }}>
      <Card.Img variant="top" src="/b.png" style={{ width: "14rem" }} />
      <Card.Body>
        <Card.Title></Card.Title>
        <Card.Text class="font-weight-bold">
          Hi! I am Sanaz. I design & build user interfaces living in Toronto.
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
