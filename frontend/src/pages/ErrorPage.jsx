import { useRouteError } from "react-router-dom";
import Footer from "../components/layout/Footer"
import useAuth from "../useAuth";

export default function ErrorPage() {
  useAuth();
  const error = useRouteError();

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}