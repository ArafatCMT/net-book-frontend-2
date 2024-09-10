const ShowAllPostForPublic = () => {
  // total post
  fetch("https://net-book-klqt.onrender.com/posts/all/")
    .then((res) => res.json())
    .then((posts) => {
      const parent = document.getElementById("allPost");

      if(posts.length === 0)
      {
        document.getElementById("empty").style.display = "block";
      }
      else
      {
        posts.forEach((post) => {
        
          // kon account thake post kora hoica
          fetch(`https://net-book-klqt.onrender.com/accounts/profile/${post.account}/`)
            .then((res) => res.json())
            .then((account) => {
              // console.log(account)
  
              // account er first_name r last_name bair kortaci
              fetch(`https://net-book-klqt.onrender.com/accounts/user/${account.user}/`)
                .then((res) => res.json())
                .then((user) => {
                  // console.log(user);
                  const div = document.createElement("div");
                  div.classList.add("col-lg-12");
                  div.classList.add("col-md-12");
                  div.classList.add("col-sm-12");
                  div.classList.add("mb-3");
  
                  // ak ta post e total like bair kortaci
                  fetch(`https://net-book-klqt.onrender.com/likes/total/?post_id=${post.id}`)
                    .then((res) => res.json())
                    .then((like) => {
                      // ak ta post e total comment bair kortaci
                      
                      fetch(
                        `https://net-book-klqt.onrender.com/comments/list/?post_id=${post.id}`
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
                                  <a href="#" onclick="message(event)"><i class="fa-regular fa-thumbs-up fs-5"></i></a>
                                  <i class="fs-5">${like?.length || 0}</i>
                                  </div>
                                  <div class="col-6 text-center">
                                  <a href="./dashboardPostComments.html?post_id=${
                                    post.id
                                  }" ><i class="fa-regular fa-comment fs-5"></i></a>
                                  <i class="fs-5">${comment?.length || 0}</i>
                                  </div>
                              </div> 
                              </div>
                  `;
                        });
                    });
                  parent.appendChild(div);
                });
            });
        });
      }

    });

    const pro_file = document.getElementById("profile-1")
    fetch(`https://net-book-klqt.onrender.com/accounts/profile/`)
    .then((res) => res.json())
    .then((accounts) => {
      
      accounts.forEach((account) =>{
          fetch(`https://net-book-klqt.onrender.com/accounts/user/${account.user}/`)
              .then((res) => res.json())
              .then((user) => {
                const div = document.createElement("div");
                div.classList.add("pro-card")
                div.innerHTML = `
                <a href="./visitProfile.html?account_id=${account.id}" style="text-decoration: none;">
                <div class="col-12 card-body-container mb-1 border" style="border-radius: 7px;">
                    <div class="p-1">
                      <img src=${account.image_url} class="pro-img mt-1 ms-1" alt="">
                    </div>
                    <div>
                        <h6 class="title mb-0 pb-0 mt-1 me-5" style="color:rgb(62, 61, 61);"><b>${user.first_name + " " + user.last_name}</b></h6>
                    </div>
                </div>
                </a>
                `;
                pro_file.appendChild(div)
              })
      })
    })
};

const message = (event) => {
  event.preventDefault();
  const msg =
    "Unlogged in User can not add a post and like a post and comment a post. Please login. Thank You!! ";
  alert(msg);
};
