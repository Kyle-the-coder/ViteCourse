function NewPost() {
  return (
    <>
      <h1 class="page-title">New Post</h1>
      <form method="post" action="/posts/new" class="form">
        <div class="form-row">
          <div class="form-group error">
            <label for="title">Title</label>
            <input type="text" name="title" id="title" />
            <div class="error-message">Required</div>
          </div>
          <div class="form-group">
            <label for="userId">Author</label>
            <select name="userId" id="userId">
              <option value="1">Leanne Graham</option>
              <option value="2">Ervin Howell</option>
              <option value="3">Clementine Bauch</option>
              <option value="4">Patricia Lebsack</option>
              <option value="5">Chelsey Dietrich</option>
              <option value="6">Mrs. Dennis Schulist</option>
              <option value="7">Kurtis Weissnat</option>
              <option value="8">Nicholas Runolfsdottir V</option>
              <option value="9">Glenna Reichert</option>
              <option value="10">Clementina DuBuque</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="body">Body</label>
            <textarea name="body" id="body"></textarea>
          </div>
        </div>
        <div class="form-row form-btn-row">
          <a class="btn btn-outline" href="/posts">
            Cancel
          </a>
          <button class="btn">Save</button>
        </div>
      </form>
    </>
  );
}

export const newPostRoute = {
  element: <NewPost />,
};
