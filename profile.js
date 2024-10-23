const myPosts = () => {
  const accountId = localStorage.getItem("accountId");
  // console.log(accountId)
  fetch(`https://net-book.vercel.app/posts/all/?account_id=${accountId}`)
    .then((res) => res.json())
    .then((posts) => {
      // console.log(posts)
      const parent = document.getElementById("myPost");

      if (posts.length === 0) {
        document.getElementById("empty").style.display = "block";
      } else {
        posts.forEach((post) => {
          // console.log(post)
          fetch(`https://net-book.vercel.app/accounts/profile/${post.account}/`)
            .then((res) => res.json())
            .then((account) => {
              // console.log(account);

              fetch(`https://net-book.vercel.app/accounts/user/${account.user}/`)
                .then((res) => res.json())
                .then((user) => {
                  // console.log(user);
                  const div = document.createElement("div");
                  div.classList.add("col-lg-12");
                  div.classList.add("col-md-12");
                  div.classList.add("col-sm-12");
                  div.classList.add("mb-3");

                  fetch(`https://net-book.vercel.app/likes/total/?post_id=${post.id}`)
                    .then((res) => res.json())
                    .then((likes) => {
                      let is_like = false;
                      // console.log(likes)
                      likes.forEach((like) => {
                        if (like.account == accountId) {
                          is_like = true;
                        }
                      });
                      if (is_like == true) {
                        fetch(
                          `https://net-book.vercel.app/comments/list/?post_id=${post.id}`
                        )
                          .then((res) => res.json())
                          .then((comment) => {
                            div.innerHTML = `
                                <div class="card mx-auto container col-lg-12 col-md-12 col-sm-12 " style="width:100%;" >
                                <div class="card-body">
                                    <div class="d-flex justify-content-between">
                                        <div class="card-body-container mb-2">
                                            <div class="" >
                                            <img src=${
                                              account.image_url
                                            } class="pro-img" alt="">
                                            </div>
                                            <div>
                                            <h6 class="title mb-0 pb-0">${
                                              user.first_name +
                                              " " +
                                              user.last_name
                                            }</h6>
                                            <small class="create mt-0 pt-0">Created: ${
                                              post.created_on
                                            }</small>
                                            </div>
                                        </div> 
                                        
                                        <div>
                                        <div class="dropdown">
                                            <p class="d-down "  id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                              <i class="fa-solid fa-ellipsis fs-4" style="color:#77787B;"></i>
                                            </p>
                                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                  <li><a class="dropdown-item" href="./profile.html?id=${
                                                    post.id
                                                  }" data-bs-toggle="modal" data-bs-target="#editModal_${post.id}">Edit</a></li>
                                                  <li><a class="dropdown-item" href="#" onclick="deletePost(event,${
                                                    post.id
                                                  })">Delete</a></li>
                                            </ul>
                                        </div>
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
                                    <a href="#" onclick="Like(event, ${
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
                                
                                <div class="modal fade" id="editModal_${
                                  post.id
                                }" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                
                                <div class="modal-dialog modal-dialog-centered">
                                    <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Update Your Post</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
    
                                        <div class="d-flex">
                                          <div>
                                            <img src=${
                                              account.image_url
                                            } class="pro-img" alt="profile">
                                          </div>
                                          <div class="ms-3 mt-1">
                                            <h6 class="title pb-0 mb-0">${
                                              user.first_name +
                                              " " +
                                              user.last_name
                                            }</h6>
                                            <small class="create mt-0 pt-0 px-2" style="background-color:#ccfbf1; border-radius: 4px;"><i class="fa-solid fa-earth-americas"></i> Public</small>
                                          </div>
                                        </div>
                                        
                                        <form id="post-update-form_${
                                          post.id
                                        }" onsubmit="editPost(event,${
                              post.id
                            })" class="mt-4">
                                        <div class="mb-3">
                                            <label for="description" class="form-label">Description</label>
                                            <textarea class="form-control" id="post-description" rows="8" name="post-description">${
                                              post.description
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
                                <div class="card mx-auto container col-lg-12 col-md-12 col-sm-12">
                                <div class="card-body">
                                    <div class="d-flex justify-content-between">
                                        <div class="card-body-container mb-2">
                                            <div class="" >
                                            <img src=${
                                              account.image_url
                                            } class="pro-img" alt="">
                                            </div>
                                            <div>
                                            <h6 class="title mb-0 pb-0">${
                                              user.first_name +
                                              " " +
                                              user.last_name
                                            }</h6>
                                            <small class="create mt-0 pt-0">Created: ${
                                              post.created_on
                                            }</small>
                                            </div>
                                        </div>

                                        <div>
                                             <div class="dropdown">
                                            <p class="d-down "  id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                              <i class="fa-solid fa-ellipsis fs-4" style="color:#77787B;"></i>
                                            </p>
                                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                  <li><a class="dropdown-item" href="./profile.html?id=${
                                                    post.id
                                                  }" data-bs-toggle="modal" data-bs-target="#editModal_${post.id}">Edit</a></li>
                                                  <li><a class="dropdown-item" href="#" onclick="deletePost(event,${
                                                    post.id
                                                  })">Delete</a></li>
                                            </ul>
                                          </div>
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
                                    <a href="#" onclick="Like(event, ${
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
                                
                                <div class="modal fade" id="editModal_${
                                  post.id
                                }" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                
                                <div class="modal-dialog modal-dialog-centered">
                                    <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Update Your Post</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
    
                                        <div class="d-flex">
                                          <div>
                                            <img src=${
                                              account.image_url
                                            } class="pro-img" alt="profile">
                                          </div>
                                          <div class="ms-3 mt-1">
                                            <h6 class="title pb-0 mb-0">${
                                              user.first_name +
                                              " " +
                                              user.last_name
                                            }</h6>
                                            <small class="create mt-0 pt-0 px-2" style="background-color:#ccfbf1; border-radius: 4px;"><i class="fa-solid fa-earth-americas"></i> Public</small>
                                          </div>
                                        </div>
                                        
                                        <form id="post-update-form_${
                                          post.id
                                        }" onsubmit="editPost(event,${
                              post.id
                            })" class="mt-4">
                                        <div class="mb-3">
                                            <label for="description" class="form-label">Description</label>
                                            <textarea class="form-control" id="post-description" rows="8" name="post-description">${
                                              post.description
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
};

const deletePost = (event, id) => {
  console.log(id);
  // const postId = getqueryParam("id")
  event.preventDefault();
  // console.log(postId)
  const token = localStorage.getItem("authToken");

  fetch(`https://net-book.vercel.app/posts/detail/${id}/`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      Authorization: `Token ${token}`,
    },
  })
    .then((res) => (window.location.href = "./profile.html"))
    .catch((err) => console.log(err));
};

const loadProfileData = () => {
  accountId = localStorage.getItem("accountId");
  // console.log(accountId)

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
                <a href="./profile.html"><img src=${account.image_url} class="img-fluid" alt=""></a>
                
                `;

          profile_name.innerHTML = `
                <a href="./profile.html" style="color:#212529;"><h5 class="text-center" >${
                  user.first_name + " " + user.last_name
                }</h5></a>
                
                `;
        });
        document.getElementById("mobile").innerText = `${account.phone_no}`;
        document.getElementById("city").innerText = `${account.city}`;
        document.getElementById("phone").value = `${account.phone_no}`;
        document.getElementById("address").value = `${account.city}`;
        document.getElementById("des").value = `${account.description}`;
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


  // friend
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
          // console.log(data_2)
          let friends = [];

          data_1.forEach((data) => {
            friends.push(data);
          });
          data_2.forEach((data) => {
            friends.push(data);
          });
          document.getElementById('friend-count').innerText= `${friends?.length || 0}`
          document.getElementById("friend-number").innerText = `${
            friends?.length || 0
          } friends`;
          const parent = document.getElementById("friend-container");
          len = friends.length;

          if (len === 0) {
            document.getElementById("empty-friend-img").style.display = "block";
          } else {
            document.getElementById("empty-friend-img").style.display = "none";
          }

          for (let i = 0; i < len; i++) {
            if(i == 4){
              break
            }
            const div = document.createElement("div");
            div.classList.add("col-12");
            div.classList.add("border");
            div.classList.add("mx-auto");
            // div.classList.add("mb-2");
            div.classList.add("mt-1");
            div.style.borderRadius = "5px";
            // amake send korcilo
            if (friends[i].receiver_account == accountId) {
              fetch(
                `https://net-book.vercel.app/accounts/profile/${friends[i].sender_account}/`
              )
                .then((res) => res.json())
                .then((account) => {
                  // console.log(account, 'hello')
                  fetch(`https://net-book.vercel.app/accounts/user/${account.user}/`)
                    .then((res) => res.json())
                    .then((user) => {
                      // console.log(user);
                      div.innerHTML = `
                <a href="./visitProfileForLoggedInUser.html?account_id=${
                  account.id
                }" style="text-decoration: none;">
                  <div class="col-11 card-body-container">
                    <div class="p-1">
                      <img src=${
                        account.image_url
                      } class="pro-img mt-1 ms-1" alt="">
                    </div>
                    <div>
                        <h6 class="title mb-0 pb-0 mt-1 me-5" style="color:rgb(62, 61, 61);"><b>${
                          user.first_name + " " + user.last_name
                        }</b></h6>
                    </div>
                </div>
                </a>
                `;
                    });
                });
            }
            // ami send korcilam
            if (friends[i].sender_account == accountId) {
              fetch(
                `https://net-book.vercel.app/accounts/profile/${friends[i].receiver_account}/`
              )
                .then((res) => res.json())
                .then((account) => {
                  // console.log(account,'good')
                  fetch(`https://net-book.vercel.app/accounts/user/${account.user}/`)
                    .then((res) => res.json())
                    .then((user) => {
                      // console.log(user)
                      div.innerHTML = `
                <a href="./visitProfileForLoggedInUser.html?account_id=${
                  account.id
                }" style="text-decoration: none;">
                  <div class="col-11 card-body-container mb-2">
                    <div class="p-1">
                      <img src=${
                        account.image_url
                      } class="pro-img mt-1 ms-1" alt="">
                    </div>
                    <div>
                        <h6 class="title mb-0 pb-0 mt-1 me-5" style="color:rgb(62, 61, 61);"><b>${
                          user.first_name + " " + user.last_name
                        }</b></h6>
                    </div>
                </div>
                </a>
                `;
                    });
                });
            }
            parent.appendChild(div);
          }
        });
    });
  // end
};

const UpdateProfileData = (event) => {
  event.preventDefault();

  const form = document.getElementById("profile-form");
  const formData = new FormData(form);
  const image = formData.get("image");
  const address = formData.get("address");
  const phone_no = formData.get("phone");
  const description = formData.get("description");

  const token = localStorage.getItem("authToken");
  const accountId = localStorage.getItem("accountId");
  const data = new FormData();
  data.append("image", image);

  // img bb te img upload korlam
  fetch("https://api.imgbb.com/1/upload?key=b29cc2bf7ebe056ece5196c75e1d51a0", {
    method: "POST",
    body: data,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const profileData = {
        image_url: data.data.url,
        phone_no: phone_no,
        city: address,
        description:description,
      };
      fetch(`https://net-book.vercel.app/accounts/profile/${accountId}/`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(profileData),
      })
        .then((res) => res.json())
        .then((data) => (window.location.href = "./profile.html"))
        .catch((err) => console.log(data));
    })
    .catch((err) => console.log(err));
};

loadProfileData();
myPosts();


