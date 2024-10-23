const Friends = () =>{
    const accountId = localStorage.getItem("accountId")
    
// friend 
fetch(`https://net-book.vercel.app/accounts/receive/accept/?account_id=${accountId}`)
.then(res => res.json())
.then(data_1 =>{
  // console.log(data_1)
  fetch(`https://net-book.vercel.app/accounts/send/accept/?account_id=${accountId}`)
  .then(res => res.json())
  .then(data_2 =>{
    // console.log(data_1)
    let friends = []

    data_1.forEach((data)=>{
      friends.push(data)
    })
    data_2.forEach((data)=>{
      friends.push(data)
    })
    // document.getElementById("friend-number").innerText = `${friends?.length||0} friends`
    const parent = document.getElementById("Friends")
    len = friends.length
    
    if(len === 0)
    {
      document.getElementById("f-img").style.display = "block";
    }
    else
    {
      document.getElementById("f-img").style.display = "none";
    }

    for (let i = 0; i < len; i++) {
        const div = document.createElement("div")
        div.classList.add("border")
        div.style.width = "14rem";
        div.style.borderRadius = "8px"

      if(friends[i].receiver_account == accountId)
      {
        fetch(`https://net-book.vercel.app/accounts/profile/${friends[i].sender_account}/`)
        .then((res) => res.json())
        .then((account) => {
        // console.log(friends[i].sender_account, accountId)
          fetch(`https://net-book.vercel.app/accounts/user/${account.user}/`)
          .then((res) => res.json())
          .then(user =>{
            div.innerHTML = `
                <a href="./visitProfileForLoggedInUser.html?account_id=${account.id}" style="text-decoration: none; color:#212529;">
                  <img src=${account.image_url} class="card-img-top img-fluid border-bottom mb-0" alt="...">
                  <div class="card-body pb-0 pt-3" style="background: #EFF2F6;">
                    <h5 class="mt-0 mb-3">${user.first_name + " " + user.last_name}</h5>
                </a>
                    <p class="text-center req-btn delete py-1 mb-3" onclick="Removefriend(event,${account.id})">
                      <a style="text-decoration: none; font-weight: 500;">Unfriend</a>
                    </p>
                  </div>
            `;
          })
        })
      }
      if(friends[i].sender_account == accountId)
      {
        fetch(`https://net-book.vercel.app/accounts/profile/${friends[i].receiver_account}/`)
        .then((res) => res.json())
        .then((account) => {
          // console.log(account,friends[i].receiver_account,'hello')
          fetch(`https://net-book.vercel.app/accounts/user/${account.user}/`)
          .then((res) => res.json())
          .then(user =>{
            div.innerHTML = `
            
              
                <a href="./visitProfileForLoggedInUser.html?account_id=${account.id}" style="text-decoration: none; color:#212529;">
                  <img src=${account.image_url} class="card-img-top img-fluid border-bottom  mb-0" alt="...">
                  <div class="card-body pb-0 pt-3" style="background: #EFF2F6;">
                    <h5 class="mt-0 mb-3">${user.first_name + " " + user.last_name}</h5>
                </a>
                    <p class="text-center req-btn delete py-1 mb-3" onclick="Removefriend(event,${account.id})">
                      <a style="text-decoration: none; font-weight: 500;">Unfriend</a>
                    </p>
                  </div>
            `;
          })
        })
      }
      parent.appendChild(div)
    }
  })
}) 
// end 
};


const Removefriend = (event, id) =>{
  event.preventDefault();
  const token = localStorage.getItem("authToken");

  fetch(`https://net-book.vercel.app/accounts/unfriend/${id}/`,{
    method:"GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Token ${token}`,
    },
  })
  .then(res => res.json())
  .then(data => {
    // console.log(data)
    window.location.href = "./friends.html";
  })
}
// Friends()