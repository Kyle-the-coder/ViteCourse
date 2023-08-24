import { useNavigate } from "react-router-dom";
import { MainNavbar } from "../navbars/MainNavbar";

export function ErrorPage() {
  const navigate = useNavigate();
  function handleBack() {
    return navigate(-1);
  }
  return (
    <>
      <MainNavbar />
      <div className="errorPage">
        <h1>There's a 404 error!</h1>
        <div>
          <button className="btn" onClick={() => handleBack()}>
            Back
          </button>
        </div>
      </div>
    </>
  );
}
