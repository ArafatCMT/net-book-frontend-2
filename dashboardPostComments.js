const getParam = () => {
  const param = new URLSearchParams(window.location.search).get("post_id");
  // console.log(param)
  return param;
};

const displayPost = () => {
  const postId = getParam();
  // console.log(postId)
  loadCommentForSinglePost();
  
  // console.log('hello')
  const parent = document.getElementById("post_containter");
  // post
  fetch(`https://net-book.vercel.app/posts/detail/${postId}/`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      // Authorization : `Token ${token}`
    },
  })
    .then((res) => res.json())
    .then((post) => {
      //   console.log(post);
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
                .then((like) => {
                  fetch(
                    `https://net-book.vercel.app/comments/list/?post_id=${post.id}`
                  )
                    .then((res) => res.json())
                    .then((comment) => {
                      div.innerHTML = `
                            <div class="card mx-auto container col-lg-12 col-md-12 col-sm-12">
                            <div class="card-body">
                                <div class="card-body-container mb-2">
                                    <a href="./visitProfile.html?account_id=${
                                      post.account
                                    }"><div>
                                        <img src=${
                                          account.image_url
                                        } class="pro-img" alt="profile">
                                    </div></a>
                                    <div>
                                        <a href="./visitProfile.html?account_id=${
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
                                <a href="#" onclick="message(event)"><i class="fa-regular fa-thumbs-up fs-5"></i></a>
                                <i class="fs-5">${like?.length || 0}</i>
                                </div>
                                <div class="col-6 text-center">
                                <a href=""><i class="fa-regular fa-comment fs-5"></i></a>
                                
                                <i class="fs-5">${comment?.length || 0}</i>
                                </div>
                            </div> 
  
                            <div class="comment-form mb-3">
                            <form id="post-update-form">
                                <div class="mb-3">
                                <textarea class="form-control" id="comment" rows="2" name="comment" placeholder="Write a comment...."></textarea>
                                </div>
                                <button type="submit" class="btn btn-primary" onclick="message(event)">Comment</button>
                            </form>
                            </div>
                            </div>
                `;
                    });
                });
              parent.appendChild(div);
            });
        });
      // hello
    });
};

const loadCommentForSinglePost = () => {
  const postId = getParam();

  const parent = document.getElementById("comment_container");

  fetch(`https://net-book.vercel.app/comments/list/?post_id=${postId}`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((comments) => {
      // console.log(comments)

      comments.forEach((comment) => {
        const div = document.createElement("div");

        fetch(`https://net-book.vercel.app/accounts/profile/${comment.account}/`)
          .then((res) => res.json())
          .then((account) => {
            // console.log(account)
            fetch(`https://net-book.vercel.app/accounts/user/${account.user}/`)
              .then((res) => res.json())
              .then((user) => {
                // console.log(user)
                div.innerHTML = `
                <div class="card-body mb-3 border col-lg-10 col-md-12 col-sm-12 mx-auto">
                <div class="col-11 card-body-container mb-2">
                    <a href="./visitProfile.html?account_id=${
                      comment.account
                    }"><div>
                                        <img src=${
                                          account.image_url
                                        } class="pro-img" alt="profile">
                                    </div></a>
                    <div>
                    <a href="./visitProfile.html?account_id=${
                      comment.account
                    }" class="link" ><h6 class="title pb-0 mb-0">${
                  user.first_name + " " + user.last_name
                }</h6></a>
                    <small class="small pt-0 mt-0">Created : ${
                      comment.created_on
                    }</small>
                    </div>
                </div>
                
                <p class="card-text">${comment.body}</p>
                </div>
            `;
                parent.appendChild(div);
              });
          });
      });
    });
};

displayPost();
