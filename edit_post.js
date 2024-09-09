const editPost = (event, postId) => {
  event.preventDefault();

  const form = document.getElementById(`post-update-form_${postId}`);
  const formData = new FormData(form);

  // console.log(des)

  const token = localStorage.getItem("authToken");

  fetch(`http://127.0.0.1:8000/posts/detail/${postId}`)
    .then((res) => res.json())
    .then((data) => {
      const updatePostData = {
        description: formData.get("post-description"),
        image_url: data.image_url,
      };
      // console.log(des)

      fetch(`http://127.0.0.1:8000/posts/detail/${postId}/`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(updatePostData),
      })
        .then((res) => res.json())
        .then((data) => {
          window.location.href = "./profile.html";
        })
        .catch((err) => console.log(err));
    });
};
