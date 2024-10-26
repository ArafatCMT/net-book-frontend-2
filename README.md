## Netbook - Social Media Platform
Netbook is a unique social media website where users can create customizable profiles with profile pictures, bios, and personal details. Users can connect as friends, view each other’s activities, and share posts with text and images in their feeds. Phibook offers features like comments, likes, and dislikes on posts, along with options to edit or delete posts and comments, giving users enhanced control over their interactions.

### Technology
- HTML
- CSS
- Bootstrap v5
- JavaScript

### Features

### User Management
- User Registration: Allows new users to register an account.
##### Endpoint: /accounts/register/

- User Login: Enables existing users to log in using their credentials.
##### Endpoint: /accounts/login/

### Profile
- User Profile: Users can view and edit their own profiles.
##### Endpoint (specific profile): /accounts/profile/<account_id>/
###### (e.g., /accounts/profile/2/)

- View All Profiles: Lists all user profiles.
##### Endpoint: /accounts/profile/
### Friend System
- Send Friend Request: A user can send a friend request to another user.

##### Endpoint: /accounts/friend/request/
- Accept/Reject Friend Request: A user can accept or reject a received friend request.

##### Endpoint: /accounts/accept/<sender_id>/<receiver_id>/<is_accept>/
- Unfriend: Allows a user to unfriend someone.

##### Endpoint: /accounts/unfriend/<account_id>/ 
###### (e.g., /accounts/unfriend/2/)

- View Friends:

##### Accepted Sent Requests: /accounts/send/accept/
##### Accepted Received Requests: /accounts/receive/accept/

## Post
- Create Post: A user can create a new post with text and images.
##### Endpoint: /posts/upload/

- Edit Post: A user can edit their own post.
##### Endpoint: /posts/detail/<post_id>/
###### (e.g., /posts/detail/2/)

- View All Posts: Displays all posts.
##### Endpoint: /posts/all/

- View Posts for Specific User: Shows posts for a particular user.
##### Endpoint: /posts/all/?account_id=<account_id>
####### (e.g., /posts/all/?account_id=1)

## Like
Like or Dislike Post: Allows a user to like or dislike a post.
##### Endpoint: /likes/like/

- View Total Likes on a Post: Displays the total likes on a specific post.
##### Endpoint: /likes/total/?post_id=<post_id> 
###### (e.g., /likes/total/?post_id=1)


## Comment
- Comment on Post: Allows a user to comment on a post.
##### Endpoint: /comments/post/
- View All Comments on a Post: Lists all comments on a specific post.
##### Endpoint: /comments/list/?post_id=<post_id> 
###### (e.g., /comments/list/?post_id=1)
- Edit or Delete Own Comment: A user can edit or delete their own comment.
##### Endpoint: /comments/detail/<comment_id>/
###### (e.g., /comments/detail/12)
