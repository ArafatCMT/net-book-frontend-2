const CatchParam = () => {
  // const param = new URLSearchParams(window.location.search).get("post_id");
  const param = new URLSearchParams(window.location.search).get("account_id");
  // console.log(param)
  return param;
};

const OtherProfilePosts = () => {
  const accountId = CatchParam();
  const myAccountId = localStorage.getItem("accountId");
  // console.log(accountId)

  fetch(`http://127.0.0.1:8000/posts/all/?account_id=${accountId}`)
    .then((res) => res.json())
    .then((posts) => {
      // console.log(posts)
      const parent = document.getElementById("otherPost");

      if (posts.length === 0) {
        document.getElementById("empty").style.display = "block";
      } else {
        posts.forEach((post) => {
          // console.log(post)
          fetch(`http://127.0.0.1:8000/accounts/profile/${accountId}/`)
            .then((res) => res.json())
            .then((account) => {
              // console.log(account);

              fetch(`http://127.0.0.1:8000/accounts/user/${account.user}/`)
                .then((res) => res.json())
                .then((user) => {
                  // console.log(user);
                  const div = document.createElement("div");
                  div.classList.add("col-lg-12");
                  div.classList.add("col-md-12");
                  div.classList.add("col-sm-12");
                  div.classList.add("mb-3");

                  fetch(`http://127.0.0.1:8000/likes/total/?post_id=${post.id}`)
                    .then((res) => res.json())
                    .then((likes) => {
                      let is_like = false;
                      // console.log(likes)
                      likes.forEach((like) => {
                        if (like.account == myAccountId) {
                          is_like = true;
                        }
                      });

                      if (is_like == true) {
                        fetch(
                          `http://127.0.0.1:8000/comments/list/?post_id=${post.id}`
                        )
                          .then((res) => res.json())
                          .then((comment) => {
                            div.innerHTML = `
                                  <div class="card mx-auto container col-lg-12 col-md-12 col-sm-12">
                                  <div class="card-body">
                                      <div class="col-12 row">
                                          <div class="col-11 card-body-container mb-2">
                                              <div class="" >
                                              <img src=${
                                                account.image_url
                                              } class="pro-img" alt="profile">
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
                                      })"><i class="fa-solid fa-thumbs-up fs-5"></i></i></a>
                                      <i class="fs-5">${likes?.length || 0}</i>
                                      </div>
                                      <div class="col-6 text-center">
                                      <a href="./comments.html?post_id=${
                                        post.id
                                      }"><i class="fa-regular fa-comment fs-5"></i></a>
                                      <i class="fs-5">${
                                        comment?.length || 0
                                      }</i>
                                  </div> 
                                  <div class="modal fade" id="editModal_${
                                    post.id
                                  }" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      
                                  </div>
                                  </div>
                      `;
                          });
                      } else {
                        fetch(
                          `http://127.0.0.1:8000/comments/list/?post_id=${post.id}`
                        )
                          .then((res) => res.json())
                          .then((comment) => {
                            div.innerHTML = `
                                  <div class="card mx-auto container col-lg-12 col-md-12 col-sm-12">
                                  <div class="card-body">
                                      <div class="col-12 row">
                                          <div class="col-11 card-body-container mb-2">
                                              <div class="" >
                                              <img src=${
                                                account.image_url
                                              } class="pro-img" alt="profile">
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
                                      <i class="fs-5">${
                                        comment?.length || 0
                                      }</i>
                                  </div> 
                                  <div class="modal fade" id="editModal_${
                                    post.id
                                  }" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      
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
  // console.log(accountId)
};

const loadOtherProfile = () => {
  const accountId = CatchParam();
  const user_id = localStorage.getItem("accountId");

  if (accountId == user_id) {
    window.location.href = `./profile.html`;
  }

  const profile_img = document.getElementById("profile-img");
  const profile_name = document.getElementById("profile-name");
  const description = document.getElementById("description");
  const button = document.getElementById("friend-button");

  fetch(`http://127.0.0.1:8000/accounts/friend/${user_id}/${accountId}/`)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data)
      if (data.receiver_account == null) {
        // friend na
        fetch(
          `http://127.0.0.1:8000/accounts/send/request/${user_id}/${accountId}/`
        )
          .then((res) => res.json())
          .then((data) => {
            // console.log(data,'ami dei nai')
            if (data.receiver == null) {
              fetch(
                `http://127.0.0.1:8000/accounts/send/request/${accountId}/${user_id}/`
              )
                .then((res) => res.json())
                .then((data) => {
                  if (data.sender == accountId) {
                    // Confirm and Delete

                    fetch(
                      `http://127.0.0.1:8000/accounts/profile/${accountId}/`
                    )
                      .then((res) => res.json())
                      .then((account) => {
                        description.innerText = `${account.description}`;
                        // document.getElementById("mobile").innerText = `${account.phone_no}`;
                        // document.getElementById("city").innerText = `${account.city}`;
                        button.innerHTML = `
                          <p class="friend-btn confirm text-center py-1" style="font-weight: 500; color: #fff;" onclick="Confirm(event,${accountId})">
                            Confirm
                          </p>
                          <p class="friend-btn delete text-center py-1" style="font-weight: 500;" onclick="removeRequest(event,${accountId},${0})">
                            Delete
                          </p>
                          `;

                        fetch(
                          `http://127.0.0.1:8000/accounts/user/${account.user}/`
                        )
                          .then((res) => res.json())
                          .then((user) => {
                            profile_img.innerHTML = `
                                    <a href=""><img src=${account.image_url} class="img-fluid" alt=""></a>
                                    
                                    `;

                            profile_name.innerHTML = `
                                    <a href="" style="color:#212529;"><h5 class="text-center" >${
                                      user.first_name + " " + user.last_name
                                    }</h5></a>
                                    
                                    `;
                          });
                      });
                  } else {
                    // Add Friend

                    fetch(
                      `http://127.0.0.1:8000/accounts/profile/${accountId}/`
                    )
                      .then((res) => res.json())
                      .then((account) => {
                        description.innerText = `${account.description}`;
                        // document.getElementById("mobile").innerText = `${account.phone_no}`;
                        // document.getElementById("city").innerText = `${account.city}`;
                        button.innerHTML = `
                          <p class="friend-btn confirm text-center py-1" style="font-weight: 500; color: #fff;" onclick="addFriend(event,${accountId})">
                            Add Friend
                          </p>
                          `;

                        fetch(
                          `http://127.0.0.1:8000/accounts/user/${account.user}/`
                        )
                          .then((res) => res.json())
                          .then((user) => {
                            profile_img.innerHTML = `
                                    <a href=""><img src=${account.image_url} class="img-fluid" alt=""></a>
                                    
                                    `;

                            profile_name.innerHTML = `
                                    <a href="" style="color:#212529;"><h5 class="text-center" >${
                                      user.first_name + " " + user.last_name
                                    }</h5></a>
                                    
                                    `;
                          });
                      });
                  }
                });
            } else {
              //Cancel Request

              fetch(`http://127.0.0.1:8000/accounts/profile/${accountId}/`)
                .then((res) => res.json())
                .then((account) => {
                  description.innerText = `${account.description}`;
                  // document.getElementById("mobile").innerText = `${account.phone_no}`;
                  // document.getElementById("city").innerText = `${account.city}`;
                  button.innerHTML = `
                          <p class="friend-btn delete text-center py-1" style="font-weight: 500;" onclick="removeRequest(event,${accountId},${1})">
                            Cancel Request
                          </p>
                          `;

                  fetch(`http://127.0.0.1:8000/accounts/user/${account.user}/`)
                    .then((res) => res.json())
                    .then((user) => {
                      profile_img.innerHTML = `
                                <a href=""><img src=${account.image_url} class="img-fluid" alt=""></a>
                                
                                `;

                      profile_name.innerHTML = `
                                <a href="" style="color:#212529;"><h5 class="text-center" >${
                                  user.first_name + " " + user.last_name
                                }</h5></a>
                                
                                `;
                    });
                });
            }
          });
      } else {
        //Unfriend

        fetch(`http://127.0.0.1:8000/accounts/profile/${accountId}/`)
          .then((res) => res.json())
          .then((account) => {
            description.innerText = `${account.description}`;
            // document.getElementById("mobile").innerText = `${account.phone_no}`;
            // document.getElementById("city").innerText = `${account.city}`;
            button.innerHTML = `
                          
                          <p class="friend-btn delete text-center py-1" style="font-weight: 500;" onclick="Unfriend(event,${accountId})">
                            Unfriend
                          </p>
                          `;

            fetch(`http://127.0.0.1:8000/accounts/user/${account.user}/`)
              .then((res) => res.json())
              .then((user) => {
                profile_img.innerHTML = `
                          <a href=""><img src=${account.image_url} class="img-fluid" alt=""></a>
                          
                          `;

                profile_name.innerHTML = `
                          <a href="" style="color:#212529;"><h5 class="text-center" >${
                            user.first_name + " " + user.last_name
                          }</h5></a>
                          
                          `;
              });
          });
      }
    })
    .catch((err) => console.log(err));

  // total post count
  fetch(`http://127.0.0.1:8000/posts/all/?account_id=${accountId}`)
    .then((res) => res.json())
    .then((posts) => {
      document.getElementById("post-count").innerText = `${posts?.length || 0}`;
      let total = 0;

      const likePromises = posts.map((post) =>
        fetch(`http://127.0.0.1:8000/likes/total/?post_id=${post.id}`)
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
    `http://127.0.0.1:8000/accounts/receive/accept/?account_id=${accountId}`
  )
    .then((res) => res.json())
    .then((data_1) => {
      // console.log(data_1)
      fetch(
        `http://127.0.0.1:8000/accounts/send/accept/?account_id=${accountId}`
      )
        .then((res) => res.json())
        .then((data_2) => {
          let friends = [];

          data_1.forEach((data) => {
            friends.push(data);
          });
          data_2.forEach((data) => {
            friends.push(data);
          });
          document.getElementById("friend-number").innerText = `${
            friends?.length || 0
          } friends`;
          document.getElementById("friend-count").innerText = `${
            friends?.length || 0
          }`;
          const parent = document.getElementById("friend-container");
          len = friends.length;

          if (len === 0) {
            document.getElementById("empty-friend-img").style.display = "block";
          } else {
            document.getElementById("empty-friend-img").style.display = "none";
          }
          for (let i = 0; i < len; i++) {
            const div = document.createElement("div");
            div.classList.add("col-12");
            div.classList.add("border");
            div.classList.add("mx-auto");
            div.classList.add("mb-2");
            div.classList.add("mt-2");
            div.style.borderRadius = "5px";

            if (friends[i].receiver_account == accountId) {
              fetch(
                `http://127.0.0.1:8000/accounts/profile/${friends[i].sender_account}/`
              )
                .then((res) => res.json())
                .then((account) => {
                  // console.log(account, account.id)
                  fetch(`http://127.0.0.1:8000/accounts/user/${account.user}/`)
                    .then((res) => res.json())
                    .then((user) => {
                      div.innerHTML = `
            
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

                `;
                    });
                });
            }
            if (friends[i].sender_account == accountId) {
              fetch(
                `http://127.0.0.1:8000/accounts/profile/${friends[i].receiver_account}/`
              )
                .then((res) => res.json())
                .then((account) => {
                  // console.log(account)
                  fetch(`http://127.0.0.1:8000/accounts/user/${account.user}/`)
                    .then((res) => res.json())
                    .then((user) => {
                      div.innerHTML = `
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
const addFriend = (event, id) => {
  event.preventDefault();
  // console.log('hello', id);
  const token = localStorage.getItem("authToken");

  fetch(`http://127.0.0.1:8000/accounts/profile/${id}/`)
    .then((res) => res.json())
    .then((data) => {
      const receiver = {
        receiver: data.id, // Send the ID only
      };
      console.log(receiver);
      console.log(JSON.stringify(receiver));
      fetch(`http://127.0.0.1:8000/accounts/friend/request/`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(receiver),
      })
        .then((res) => {
          if (res.ok) {
            console.log("Friend request sent successfully.");
          } else {
            console.log("Failed to send friend request.");
          }
          return res.json();
        })
        .then((responseData) => console.log(responseData))
        .then(
          (data) =>
            (window.location.href = `./visitProfileForLoggedInUser.html?account_id=${id}`)
        );
    });
};

const removeRequest = (event, id, track) => {
  event.preventDefault();
  const token = localStorage.getItem("authToken");
  const accountId = localStorage.getItem("accountId");
  // console.log(id)
  // console.log(accountId)

  // ami dici
  if (track == 1) {
    // console.log(track)
    fetch(`http://127.0.0.1:8000/accounts/accept/${accountId}/${id}/${0}/`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => res.json())
      .then(
        (data) =>
          (window.location.href = `./visitProfileForLoggedInUser.html?account_id=${id}`)
      );
  } else {
    fetch(`http://127.0.0.1:8000/accounts/accept/${id}/${accountId}/${0}/`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => res.json())
      .then(
        (data) =>
          (window.location.href = `./visitProfileForLoggedInUser.html?account_id=${id}`)
      );
  }
};

const Confirm = (event, id) => {
  event.preventDefault();
  const token = localStorage.getItem("authToken");
  const accountId = localStorage.getItem("accountId");

  fetch(`http://127.0.0.1:8000/accounts/accept/${id}/${accountId}/${1}/`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Token ${token}`,
    },
  })
    .then((res) => res.json())
    .then(
      (data) =>
        (window.location.href = `./visitProfileForLoggedInUser.html?account_id=${id}`)
    );
};

const Unfriend = (event, id) => {
  event.preventDefault();
  const token = localStorage.getItem("authToken");

  fetch(`http://127.0.0.1:8000/accounts/unfriend/${id}/`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Token ${token}`,
    },
  })
    .then((res) => res.json())
    .then(
      (data) =>
        (window.location.href = `./visitProfileForLoggedInUser.html?account_id=${id}`)
    );
};

loadOtherProfile();
OtherProfilePosts();

// confirm and delete
{
  /* <div class="d-flex justify-content-center" style="gap:10px">
                                <div><a onclick="Confirm(event,${accountId})" class="btn btn-sm" style="background:#0861F2; color:#fff; font-weight:500;">Confirm</a></div>
                                <div><a onclick="removeRequest(event,${accountId},${0})" class="btn btn-sm" style="background:#D8DADF; font-weight:500;">Delete</a></div>
                              </div>


// unfriend
<div class="d-flex justify-content-center" style="gap:10px;">
                      <div><a onclick="Unfriend(event,${accountId})" class="btn btn-sm" style="background:#D8DADF; font-weight:500;">Unfriend</a></div>
                    </div> */
}
