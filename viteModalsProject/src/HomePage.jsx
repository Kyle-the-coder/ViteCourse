function HomePage() {
  return (
    <div>
      <button data-custom-open>Show Custom Modal</button>
      <br />
      <button data-dialog-open>Show Dialog Modal</button>
    </div>
  );
}

export const homePage = {
  element: <HomePage />,
};
