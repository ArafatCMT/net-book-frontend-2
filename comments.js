const getQueryParam = () => {
  const param = new URLSearchParams(window.location.search).get("post_id");
  // console.log(param)
  return param;
};

const showPost = () => {
  const postId = getQueryParam();
  loadComment();
  // console.log(postId)

  const token = localStorage.getItem("authToken");
  const accountId = localStorage.getItem("accountId");
  const parent = document.getElementById("post_section");
  const cmt = document.getElementById("cmt-cnt");

  // post
  fetch(`https://net-book.vercel.app/posts/detail/${postId}/`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Token ${token}`,
    },
  })
    .then((res) => res.json())
    .then((post) => {
      // console.log(post)
      // hello
      fetch(`https://net-book.vercel.app/accounts/profile/${post.account}/`)
        .then((res) => res.json())
        .then((account) => {
          // console.log(account.image_url)

          fetch(`https://net-book.vercel.app/accounts/user/${account.user}/`)
            .then((res) => res.json())
            .then((user) => {
              // console.log(user)
              const div = document.createElement("div");
              div.classList.add("col-lg-12");
              div.classList.add("col-md-12");
              div.classList.add("col-sm-12");
              div.classList.add("mb-5");

              fetch(`https://net-book.vercel.app/likes/total/?post_id=${post.id}`)
                .then((res) => res.json())
                .then((likes) => {
                  let is_like = false;
                  // console.log(likes)
                  likes.forEach((like) =>{
                    if(like.account == accountId)
                    {
                      is_like = true;
                    }
                  })
                  // console.log(is_like)
                  // console.log(accountId)
                  
                  if(is_like == true)
                  {
                    fetch(
                      `https://net-book.vercel.app/comments/list/?post_id=${post.id}`
                    )
                      .then((res) => res.json())
                      .then((comment) => {
                        cmt.innerText = `${comment?.length || 0} Comments`
                        div.innerHTML = `
                              <div class="card mx-auto container col-lg-12 col-md-12 col-sm-12">
                              <div class="card-body">
                                  <div class="card-body-container mb-2">
                                      <a href="./visitProfileForLoggedInUser.html?account_id=${
                                        post.account
                                      }"><div>
                                          <img src=${
                                            account.image_url
                                          } class="pro-img" alt="profile">
                                      </div></a>
                                      <div>
                                          <a href="./visitProfileForLoggedInUser.html?account_id=${
                                            post.account
                                          }" class="link" ><h6 class="title pb-0 mb-0">${
                          user.first_name + " " + user.last_name
                        }</h6></a>
                                          <small class="create pt-0 mt-0">Created: ${
                                            post.created_on
                                          }</small>
                                      </div>
                                  </div>
                                  
                                  <p class="">${post.description}</p>
                                                                 
                              </div>
                              <img src=${
                                post.image_url
                              } class="card-img-top" alt="...">
                              <hr>
                              <div class="d-flex mb-2">
                                  <div class="col-6 text-center">
                                  <a href="#" onclick="Like(event,${
                                    post.id
                                  })"><i class="fa-solid fa-thumbs-up fs-5"></i></a>
                                  <i class="fs-5">${likes?.length || 0}</i>
                                  </div>
                                  <div class="col-6 text-center">
                                  <a href="./comments.html?post_id=${
                                    post.id
                                  }"><i class="fa-regular fa-comment fs-5"></i></a>
                                  
                                  <i class="fs-5">${comment?.length || 0}</i>
                                  </div>
                              </div> 
  
                              <div class="comment-form mb-3">
                              <form id="post-update-form" onsubmit="SubmitComment(event,${postId})" >
                                  <div class="mb-3">
                                  <textarea class="form-control" id="comment" rows="2" name="comment" placeholder="Write a comment...." required></textarea>
                                  </div>
                                  <button type="submit" class="btn btn-primary">Comment</button>
                              </form>
                              </div>
                              </div>
                  `;
                      });
                  }
                  else
                  {
                    fetch(
                      `https://net-book.vercel.app/comments/list/?post_id=${post.id}`
                    )
                      .then((res) => res.json())
                      .then((comment) => {
                        cmt.innerText = `${comment?.length || 0} Comments`
                        div.innerHTML = `
                              <div class="card mx-auto container col-lg-12 col-md-12 col-sm-12">
                              <div class="card-body">
                                  <div class="card-body-container mb-2">
                                      <a href="./visitProfileForLoggedInUser.html?account_id=${
                                        post.account
                                      }"><div>
                                          <img src=${
                                            account.image_url
                                          } class="pro-img" alt="profile">
                                      </div></a>
                                      <div>
                                          <a href="./visitProfileForLoggedInUser.html?account_id=${
                                            post.account
                                          }" class="link" ><h6 class="title pb-0 mb-0">${
                          user.first_name + " " + user.last_name
                        }</h6></a>
                                          <small class="create pt-0 mt-0">Created: ${
                                            post.created_on
                                          }</small>
                                      </div>
                                  </div>
                                  
                                  <p class="">${post.description}</p>
                                                                 
                              </div>
                              <img src=${
                                post.image_url
                              } class="card-img-top" alt="...">
                              <hr>
                              <div class="d-flex mb-2">
                                  <div class="col-6 text-center">
                                  <a href="#" onclick="Like(event,${
                                    post.id
                                  })"><i class="fa-regular fa-thumbs-up fs-5"></i></a>
                                  <i class="fs-5">${likes?.length || 0}</i>
                                  </div>
                                  <div class="col-6 text-center">
                                  <a href="./comments.html?post_id=${
                                    post.id
                                  }"><i class="fa-regular fa-comment fs-5"></i></a>
                                  
                                  <i class="fs-5">${comment?.length || 0}</i>
                                  </div>
                              </div> 
  
                              <div class="comment-form mb-3">
                              <form id="post-update-form" onsubmit="SubmitComment(event,${postId})" >
                                  <div class="mb-3">
                                  <textarea class="form-control" id="comment" rows="2" name="comment" placeholder="Write a comment...." required></textarea>
                                  </div>
                                  <button type="submit" class="btn btn-primary">Comment</button>
                              </form>
                              </div>
                              </div>
                  `;
                      });
                  }
                });
              parent.appendChild(div);
            });
        });
      // hello
    });
};

const SubmitComment = (event, id) => {
  event.preventDefault();
  // console.log(id)

  const token = localStorage.getItem("authToken");

  const form = document.getElementById("post-update-form");
  const formData = new FormData(form);
  const body = formData.get("comment");

  // console.log(body)

  fetch(`https://net-book.vercel.app/posts/detail/${id}/`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Token ${token}`,
    },
  })
    .then((res) => res.json())
    .then((post) => {
      const commentData = {
        post: post.id,
        body: body,
      };
      // console.log(commentData)
      // console.log(JSON.stringify(commentData))

      fetch("https://net-book.vercel.app/comments/post/", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(commentData),
      })
        .then((res) => res.json())
        .then(
          (data) => (window.location.href = `./comments.html?post_id=${id}`)
        )
        .catch((err) => console.log(err));
    });
};

const loadComment = () => {
  const postId = getQueryParam();
  // console.log('nice',postId)

  const token = localStorage.getItem("authToken");
  const accountId = localStorage.getItem("accountId");
  const parent = document.getElementById("comment_section");

  fetch(`https://net-book.vercel.app/comments/list/?post_id=${postId}`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Token ${token}`,
    },
  })
    .then((res) => res.json())
    .then((comments) => {
      // console.log(comments)

      comments.forEach((comment) => {
        // console.log(comment)
        const div = document.createElement("div");

        fetch(`https://net-book.vercel.app/accounts/profile/${comment.account}/`)
          .then((res) => res.json())
          .then((account) => {
            // console.log(account)
            fetch(`https://net-book.vercel.app/accounts/user/${account.user}/`)
              .then((res) => res.json())
              .then((user) => {
                // console.log(user)
                if (accountId == comment.account) {
                  div.innerHTML = `
                <div class="card-body mb-3 border col-lg-10 col-md-12 col-sm-12 mx-auto" style="background: #FFFFFF; border-radius:12px;">
                <div class=" d-flex justify-content-between">
                  <div class=" card-body-container mb-2">
                      <a href="./visitProfileForLoggedInUser.html?account_id=${
                        comment.account
                      }"><div>
                                          <img src=${
                                            account.image_url
                                          } class="pro-img" alt="profile">
                                      </div></a>
                      <div>
                      <a href="./visitProfileForLoggedInUser.html?account_id=${
                        comment.account
                      }" class="link" ><h6 class="title pb-0 mb-0">${
                      user.first_name + " " + user.last_name
                    }</h6></a>
                      <small class="small pt-0 mt-0">Created : ${
                        comment.created_on
                      }</small>
                      </div>
                  </div>

                  <div class="text-center">
                      <a type="button" class="" data-bs-toggle="modal" data-bs-target="#commentModal_${
                        comment.id
                      }"><img src="./images/edit.png" alt="" class="cmnt-img"></a>
                      <a onclick="deleteComment(event,${
                        comment.id
                      })" class=""><img src="./images/delete.png" alt="" class="cmnt-img"></a>
                  </div>
                </div>
      
                <p class="card-text">${comment.body}</p>
                </div>

                <div class="modal fade" id="commentModal_${
                  comment.id
                }" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Edit Your Comment</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">

                  <form id="comment-update-form_${
                    comment.id
                  }" onsubmit="editComment(event,${comment.id})">
                        <div class="mb-3">
                            <label for="description" class="form-label">Description</label>
                              <textarea class="form-control" id="post-description" rows="4" name="comment-body">${
                                comment.body
                              }</textarea>
                        </div>
                                    
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                          <button type="submit" class="btn btn-primary">Save</button>
                        </div>
                    </form>
        
                </div>
      
              </div>
              </div>
              </div>
            `;
            } 
          else {
                  div.innerHTML = `
                <div class="card-body mb-3 border col-lg-10 col-md-12 col-sm-12 mx-auto" style="background: #FFFFFF; border-radius:12px;">
                <div class="col-lg-12 col-md-12 col-sm-12 row">
                <div class="col-12 card-body-container mb-2">
                    <a href="./visitProfileForLoggedInUser.html?account_id=${
                      comment.account
                    }"><div>
                                        <img src=${
                                          account.image_url
                                        } class="pro-img" alt="profile">
                                    </div></a>
                    <div>
                    <a href="./visitProfileForLoggedInUser.html?account_id=${
                      comment.account
                    }" class="link" ><h6 class="title pb-0 mb-0">${
                    user.first_name + " " + user.last_name
                  }</h6></a>
                    <small class="small pt-0 mt-0">Created : ${
                      comment.created_on
                    }</small>
                    </div>
                </div>
                
                </div>
                <p class="card-text">${comment.body}</p>
                </div>
            `;
                }
                parent.appendChild(div);
              });
          });
      });
    });
};

const Like = (event,id) => {
  // const postId = getQueryParam();
  event.preventDefault();
  
  console.log(id)
  const token = localStorage.getItem("authToken");
  // console.log(token)

  fetch(`https://net-book.vercel.app/posts/detail/${id}/`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Token ${token}`,
    },
  })
    .then((res) => res.json())
    .then((post) => {
      const likeData = {
        post: post.id,
      };

      fetch("https://net-book.vercel.app/likes/like/", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(likeData),
      })
        .then((res) => res.json())
        .then(window.location.href = `./comments.html?post_id=${id}`);
    })
    .catch((err) => console.log(err));
};

const editComment = (event, commentId) => {
  event.preventDefault();
  const postId = getQueryParam();

  const form = document.getElementById(`comment-update-form_${commentId}`);
  const formData = new FormData(form);

  const token = localStorage.getItem("authToken");

  const commentData = {
    post: postId,
    body: formData.get("comment-body"),
  };
  // console.log(JSON.stringify(commentData))

  fetch(`https://net-book.vercel.app/comments/detail/${commentId}/`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(commentData),
  })
    .then((res) => (window.location.href = `./comments.html?post_id=${postId}`))
    .catch((err) => console.log(err));
};

const deleteComment = (event, commentId) => {
  event.preventDefault();
  const postId = getQueryParam();
  const token = localStorage.getItem("authToken");

  fetch(`https://net-book.vercel.app/comments/detail/${commentId}/`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      Authorization: `Token ${token}`,
    },
  })
    .then((res) => (window.location.href = `./comments.html?post_id=${postId}`))
    .catch((err) => console.log(err));
};



