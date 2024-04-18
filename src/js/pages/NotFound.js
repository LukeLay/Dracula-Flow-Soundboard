import React from 'react';
import { Button, Card, Image } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const NotFound = (props) => {

    const endpoint = useLocation();
    const pathname = endpoint.pathname;

    return (
        <>

            <Card style={{ margin: "1%", width: "98%" }}>

                <Card.Header style={{ backgroundColor: "var(--bs-primary)", color: "var(--bs-light)" }}>404 - Page Not Found</Card.Header>

                <Card.Body className="text-center">

                    <Card.Title>Oops! The page you're looking for doesn't exist.</Card.Title>

                    <Card.Text style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                        <Image src="./public/img/404.png" fluid style={{ width: "360px" }} />
                        "{pathname}" is not a valid location.
                    </Card.Text>

                    <Button as={Link} variant="primary" to="/">Return Home</Button>

                </Card.Body>

            </Card>

        </>
    );
};

export default NotFound;