import { Link } from "react-router-dom";

function NotFound() {
  return (
    <>
    <h1 className="text-center text-danger my-5">Page Not Found | 404</h1>
      <Link className="text-light text-decoration-none" to={"/"}>
        <button className="btn btn-primary text-sussess text-center d-block mx-auto">
          Home
        </button>
      </Link>
    </>
  )
}

export default NotFound;