import { MapContainer, TileLayer, Marker } from "react-leaflet";
import React, { useEffect, useState } from "react";
import { Card, CardDeck } from "react-bootstrap";


function Restaurant(props) {
  const [restaurant, setRestaurant] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://web422assi1.herokuapp.com/api/restaurants/${props.id}`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.hasOwnProperty("_id")) {
          setRestaurant(data);
        } else {
          setRestaurant(`$(props.id)`);
        }
      });
  }, [props.id]);

  if (loading) {
    return <p>loading ...</p>;
  } else if (restaurant._id) {
    return (
      <>
        <div>
          <Card inverse style={{ backgroundColor: "#F5F5F5" }}>
            <Card.Body>
              <Card.Title>{restaurant.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {restaurant.address.building} {restaurant.address.street}
              </Card.Subtitle>
            </Card.Body>
          </Card>
          <br />
          <MapContainer
            style={{ height: "400px" }}
            center={[restaurant.address.coord[1], restaurant.address.coord[0]]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker
              position={[
                restaurant.address.coord[1],
                restaurant.address.coord[0],
              ]}
            ></Marker>
          </MapContainer>
          <br />
          <CardDeck>
            {restaurant.grades.map((grade, index) => (
              <Card key={index} inverse style={{ backgroundColor: "#F5F5F5" }}>
                <Card.Body>Grade: {grade.grade}</Card.Body>
                <Card.Footer style={{ backgroundColor: "#FFFFFF" }}>
                  <small>
                    Completed: {new Date(grade.date).toLocaleDateString()}
                  </small>
                </Card.Footer>
              </Card>
            ))}
          </CardDeck>
        </div>
      </>
    );
  } else {
    return (
      <div>
        <Card inverse style={{ backgroundColor: "#F5F5F5" }}>
          <Card.Body>
            <Card.Subtitle className="mb-2 text-muted">
              Unable to find Restaurant with id: {props.id}
            </Card.Subtitle>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Restaurant;
