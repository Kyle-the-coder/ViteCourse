export function PostForm({ users }) {
  return (
    <Form method="post" className="form">
      <div className="form-row">
        <FormGroup>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="title" />
          <div className="error-message">Required</div>
        </FormGroup>
        <FormGroup>
          <label for="userId">Author</label>
          <select name="userId" id="userId">
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </FormGroup>
      </div>
      <div className="form-row">
        <FormGroup>
          <label for="body">Body</label>
          <textarea name="body" id="body"></textarea>
        </FormGroup>
      </div>
      <div className="form-row form-btn-row">
        <a className="btn btn-outline" href="/posts">
          Cancel
        </a>
        <button className="btn">Save</button>
      </div>
    </Form>
  );
}
