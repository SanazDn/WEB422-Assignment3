import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {  Card } from "react-bootstrap";
import Restaurant from './Restaurant';
import {  Table, Pagination } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
const queryString = require("query-string");

function Restaurants(props) {
  
  const [restaurants, setRestaurants] = useState([]);
  const [page, setPage] = useState(1);
  let history = useHistory();
  let borough = "";
  let query = queryString.parse(props.query);

  if(query.borough){
    borough = query.borough;
    }

  useEffect(() => {

      fetch(
        `https://web422assi1.herokuapp.com/api/restaurants?page=${page}&perPage=10&borough=${borough}`
      )
        .then((res) => res.json())
        .then((restaurants) => {
          setRestaurants(restaurants);
        });
  }, [props.query,page]);


  function previousPage() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  function nextPage() {
    setPage(page + 1);
  }

  // Render function
  if (restaurants.length > 0) {
    
    return (
      <div>
      <Card inverse style={{ backgroundColor: '#F5F5F5' }}>
        <Card.Body>
          <Card.Title>Restaurant List</Card.Title>
          <Card.Text>
            Full list of restaurants, Optionally sorted by borough
          </Card.Text>
          </Card.Body>
          </Card>
           <br/>
          <Table hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Address </th>
                <th>Borough</th>
                <th>Cuisine</th>
              </tr>
            </thead>
            <tbody>
              {restaurants.map((restaurant) => (
                <tr
                  key={restaurant._id}
                  onClick={() => {
                    history.push(`/restaurant/${restaurant._id}`);
                  }}
                >
                  <td>{restaurant.name}</td>
                  <td>
                    {restaurant.address.building}
                    {"  "}
                    {restaurant.address.street}
                  </td>
                  <td>{restaurant.borough}</td>
                  <td>{restaurant.cuisine}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        
        <Pagination>
          <Pagination.Prev onClick={previousPage} />
          <Pagination.Item>{page}</Pagination.Item>
          <Pagination.Next onClick={nextPage} />
        </Pagination>
        </div>
    );
  } 
  else
  {
    return <p>No Restaurants Found</p>;
  }
}

export default withRouter(Restaurants);
