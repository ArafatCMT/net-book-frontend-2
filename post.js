const addPost = (event) => {
  event.preventDefault();
  const form = document.getElementById("post-form");
  const formData = new FormData(form);
  const description = formData.get("description");
  const image = formData.get("image");

  const token = localStorage.getItem("authToken");
  // console.log('form add post', token)

  const data = new FormData();
  data.append("image", image);

  // img bb te img upload korlam
  fetch("https://api.imgbb.com/1/upload?key=b29cc2bf7ebe056ece5196c75e1d51a0", {
    method: "POST",
    body: data,
  })
    .then((res) => res.json())
    .then((data) => {
      // console.log(data.data.url)
      const postData = {
        description: description,
        image_url: data.data.url,
      };
      console.log(data.data.url);
      console.log("postData", postData);

      fetch("https://net-book.vercel.app/posts/upload/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(postData),
      })
        .then((res) => res.json())
        .then((data) => (window.location.href = "./home.html"));
    });
};

const getAllPost = () => {
  // total post
  const accountId = localStorage.getItem("accountId");
  fetch("https://net-book.vercel.app/posts/all/")
    .then((res) => res.json())
    .then((posts) => {
      const parent = document.getElementById("allPost");

      if (posts.length === 0) {
        document.getElementById("empty").style.display = "block";
      } else {
        posts.forEach((post) => {
          // console.log(post)
          // kon account thake post kora hoica
          fetch(`https://net-book.vercel.app/accounts/profile/${post.account}/`)
            .then((res) => res.json())
            .then((account) => {
              // console.log(account)

              // account er first_name r last_name bair kortaci
              fetch(`https://net-book.vercel.app/accounts/user/${account.user}/`)
                .then((res) => res.json())
                .then((user) => {
                  // console.log(user);
                  const div = document.createElement("div");
                  div.classList.add("col-lg-12");
                  div.classList.add("col-md-12");
                  div.classList.add("col-sm-12");
                  div.classList.add("mb-3");

                  // ak ta post e total like bair kortaci
                  fetch(`https://net-book.vercel.app/likes/total/?post_id=${post.id}`)
                    .then((res) => res.json())
                    .then((likes) => {
                      // ak ta post e total comment bair kortaci

                      let is_like = false;
                      // console.log(likes)
                      likes.forEach((like) => {
                        if (like.account == accountId) {
                          is_like = true;
                        }
                      });
                      // console.log(is_like)
                      // console.log(accountId)
                      if (is_like == true) {
                        fetch(
                          `https://net-book.vercel.app/comments/list/?post_id=${post.id}`
                        )
                          .then((res) => res.json())
                          .then((comment) => {
                            div.innerHTML = `
                                <div class="card container col-lg-12 col-md-12 col-sm-12">
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
                                            <small class="create mt-0 pt-0">Created: ${
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
                                    })" ><i class="fa-solid fa-thumbs-up fs-5"></i></a>
                                    <i class="fs-5">${likes?.length || 0}</i>
                                    </div>
                                    <div class="col-6 text-center">
                                    <a href="./comments.html?post_id=${
                                      post.id
                                    }"><i class="fa-regular fa-comment fs-5"></i></a>
                                    <i class="fs-5">${comment?.length || 0}</i>
                                    </div>
                                </div> 
                                </div>
                    `;
                          });
                      } else {
                        fetch(
                          `https://net-book.vercel.app/comments/list/?post_id=${post.id}`
                        )
                          .then((res) => res.json())
                          .then((comment) => {
                            div.innerHTML = `
                                <div class="card container col-lg-12 col-md-12 col-sm-12">
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
                                            <small class="create mt-0 pt-0">Created: ${
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
                                    })" ><i class="fa-regular fa-thumbs-up fs-5"></i></a>
                                    <i class="fs-5">${likes?.length || 0}</i>
                                    </div>
                                    <div class="col-6 text-center">
                                    <a href="./comments.html?post_id=${
                                      post.id
                                    }"><i class="fa-regular fa-comment fs-5"></i></a>
                                    <i class="fs-5">${comment?.length || 0}</i>
                                    </div>
                                </div> 
                                </div>
                    `;
                          });
                      }
                    });
                  parent.appendChild(div);
                });
            });
        });
      }
    });

  const profile_img = document.getElementById("profile-img");
  const profile_name = document.getElementById("profile-name");
  const description = document.getElementById("description");
  fetch(`https://net-book.vercel.app/accounts/profile/${accountId}/`)
    .then((res) => res.json())
    .then((account) => {
      // console.log(account)
      description.innerText =`${account.description}`
      fetch(`https://net-book.vercel.app/accounts/user/${account.user}/`)
        .then((res) => res.json())
        .then((user) => {
          profile_img.innerHTML = `
                <a href="#"><img src=${account.image_url} class="img-fluid" alt=""></a>
                
                `;
          // profile_card.appendChild(div)

          profile_name.innerHTML = `
                <a href="#" ><h5 class="text-center" >${
                  user.first_name + " " + user.last_name
                }</h5></a>
                
                `;
        });
    });

  // total post count
  fetch(`https://net-book.vercel.app/posts/all/?account_id=${accountId}`)
    .then((res) => res.json())
    .then((posts) => {
        document.getElementById("post-count").innerText = `${posts?.length || 0}`;
        let total = 0;

        
        const likePromises = posts.map((post) =>
            fetch(`https://net-book.vercel.app/likes/total/?post_id=${post.id}`)
                .then((res) => res.json())
                .then((likes) => {
                    const val = parseInt(likes.length);
                    total += val;
                    return val;
                })
        );

        
        Promise.all(likePromises).then(() => {
            document.getElementById("like_").innerText = `${total}`;
        });
    });


  // total frined count
  fetch(
    `https://net-book.vercel.app/accounts/receive/accept/?account_id=${accountId}`
  )
    .then((res) => res.json())
    .then((data_1) => {
      // console.log(data_1)
      fetch(
        `https://net-book.vercel.app/accounts/send/accept/?account_id=${accountId}`
      )
        .then((res) => res.json())
        .then((data_2) => {
          // console.log(data_1)
          let friends = [];

          data_1.forEach((data) => {
            friends.push(data);
          });
          data_2.forEach((data) => {
            friends.push(data);
          });

          document.getElementById('friend-count').innerText= `${friends?.length || 0}`
        });
    });

  // discover people
  const pro_file = document.getElementById("profile-1");
  fetch(`https://net-book.vercel.app/accounts/profile/`)
    .then((res) => res.json())
    .then((accounts) => {

      for(let i=0; i<accounts.length; i++)
      {
        // console.log(accounts[i])
        if(i==5){
          break;
        }
        if (accounts[i].id != accountId) {
          
          fetch(`https://net-book.vercel.app/accounts/user/${accounts[i].user}/`)
          .then((res) => res.json())
          .then((user) => {
            const div = document.createElement("div");
            div.classList.add("pro-card");
            div.innerHTML = `
              <a href="./visitProfileForLoggedInUser.html?account_id=${
                accounts[i].id
              }" style="text-decoration: none;">
              <div class="col-12 card-body-container mb-1 border" style="border-radius: 7px;">
                  <div class="p-1">
                    <img src=${
                      accounts[i].image_url
                    } class="pro-img mt-1 ms-1" alt="">
                  </div>
                  <div>
                      <h6 class="title mb-0 pb-0 mt-1" style="color:rgb(62, 61, 61);"><b>${
                        user.first_name + " " + user.last_name
                      }</b></h6>
                  </div>
              </div>
              </a>
              `;
            pro_file.appendChild(div);
          });
      }
      }
    });
};

const PostModal = () => {
  const post_modal = document.getElementById("post-modal");

  const div = document.createElement("div");
  const accountId = localStorage.getItem("accountId");

  fetch(`https://net-book.vercel.app/accounts/profile/${accountId}/`)
    .then((res) => res.json())
    .then((account) => {
      fetch(`https://net-book.vercel.app/accounts/user/${account.user}/`)
        .then((res) => res.json())
        .then((user) => {
          div.innerHTML = `
    <div class="modal fade" id="createPostModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel"><b>Create Post</b></h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">

            <div class="d-flex">
              <div>
                <img src=${account.image_url} class="pro-img" alt="profile">
              </div>
              <div class="ms-3 mt-1">
                <h6 class="title pb-0 mb-0" style="color:#0a0a0a;">${
                  user.first_name + " " + user.last_name
                }</h6>
                <small class="create mt-0 pt-0 px-2" style="background-color:#ccfbf1; border-radius: 4px;"><i class="fa-solid fa-earth-americas"></i> Public</small>
              </div>
            </div>

        <form onsubmit="addPost(event)" id="post-form" method="post" enctype="multipart/form-data" class="mt-4">
          <div class="mb-3">
              <label for="image" class="form-label">Image </label>
              <!-- <input id="image" type="file" name="image" accept="image/png, image/gif,image/jpeg"/> -->
              <input type="file" id="imageUpload" name="image" accept="image/*" required>
            </div>
            <div class="mb-3">
              <label for="description" class="form-label">Description</label>
              <textarea class="form-control" id="description" rows="6" name="description" placeholder="What's on your mind, ${
                user.first_name + " " + user.last_name
              }?" required></textarea>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-primary">Create Post</button>
            </div>
      </form>
      </div>
      
    </div>
  </div>
</div>
    `;
          post_modal.appendChild(div);
        });
    });
};
