import { useRouteError } from "react-router-dom";

import { Container } from './styles';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <Container>
      <h1>Oops!</h1>
      <p>Desculpe, ocorreu um erro..</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </Container>
  );
}