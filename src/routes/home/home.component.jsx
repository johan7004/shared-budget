import { React} from "react";
import HomePage from "./../../components/home-page/home-page.component";
import {Container} from 'react-bootstrap'
import "./home.styles.css";

export default function Home() {
  return (
    <Container className="home-container">
       <HomePage />
       <HomePage />
    </Container>
  );
}
