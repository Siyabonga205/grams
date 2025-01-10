// Select Elements
const postOptions = document.querySelector('.post-options');
const postOptionsModal = document.getElementById('post-options-modal');
const createPostButton = document.getElementById('create-post');
const createPostModal = document.getElementById('create-post-modal');
const cancelButton = document.getElementById('cancel');
const postButton = document.getElementById('post-button');
const fileInput = document.getElementById('file-input');
const captionInput = document.getElementById('caption-input');
const mainContent = document.querySelector('main');

// Open Post Options Modal
postOptions.addEventListener('click', () => {
  postOptionsModal.classList.remove('hidden');
});

// Close Post Options Modal
postOptionsModal.addEventListener('click', (e) => {
  if (e.target.id === 'cancel' || e.target === postOptionsModal) {
    postOptionsModal.classList.add('hidden');
  }
});

// Open Create Post Modal
createPostButton.addEventListener('click', () => {
  createPostModal.classList.remove('hidden');
});

// Close Create Post Modal
createPostModal.addEventListener('click', (e) => {
  if (e.target === createPostModal) {
    createPostModal.classList.add('hidden');
  }
});

// Post New Content
postButton.addEventListener('click', () => {
  const file = fileInput.files[0];
  const caption = captionInput.value;

  if (file && caption) {
    const reader = new FileReader();

    // Read the file and create a new post
    reader.onload = function (event) {
      const post = document.createElement('div');
      post.className = 'post';
      post.innerHTML = `
        <div class="post-header">
          <span class="post-user">You</span>
          <i class="fas fa-ellipsis-h post-options-user"></i>
        </div>
        <img src="${event.target.result}" alt="Post Image" class="post-image">
        <p class="post-content">${caption}</p>
        <div class="modal hidden user-options-modal">
          <ul class="modal-options">
            <li class="modal-item">Report</li>
            <li class="modal-item">Unfollow</li>
            <li class="modal-item">Add to favourites</li>
            <li class="modal-item">Go to post</li>
            <li class="modal-item">Share to...</li>
            <li class="modal-item">Copy link</li>
            <li class="modal-item">Embed</li>
            <li class="modal-item">About this account</li>
            <li class="modal-item delete" id="delete-post">Delete</li>
          </ul>
        </div>
      `;

      // Add post to the main content
      mainContent.appendChild(post);
      createPostModal.classList.add('hidden');
      fileInput.value = '';
      captionInput.value = '';

      // Add functionality to the three dots in the user's post
      const postOptionsUser = post.querySelector('.post-options-user');
      const userOptionsModal = post.querySelector('.user-options-modal');
      const deletePost = post.querySelector('#delete-post');

      // Open the user options modal
      postOptionsUser.addEventListener('click', () => {
        userOptionsModal.classList.remove('hidden');
      });

      // Close modal and delete post
      userOptionsModal.addEventListener('click', (e) => {
        if (e.target.id === 'delete-post') {
          post.remove(); // Delete the post
        }
        userOptionsModal.classList.add('hidden'); // Close the modal
      });

      // Close modal when clicking outside
      document.addEventListener('click', (e) => {
        if (e.target !== postOptionsUser && !userOptionsModal.contains(e.target)) {
          userOptionsModal.classList.add('hidden');
        }
      });
    };

    reader.readAsDataURL(file); // Convert image file to a Base64 string
  } else {
    alert('Please select a file and write a caption!');
  }
});
