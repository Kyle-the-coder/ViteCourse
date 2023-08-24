import { useNavigate } from "react-router-dom";

export function ErrorPage() {
  const navigate = useNavigate();
  function handleBack() {
    return navigate("/");
  }
  return (
    <>
      There's an error
      <div>
        <button onClick={() => handleBack()}>Back</button>
      </div>
    </>
  );
}
