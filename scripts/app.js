'use strict';


// Shortcuts to DOM Elements.
var addBadge = document.getElementById('add-badge');
var addBadgeButton = document.getElementById('add');
var badgeSection = document.getElementById('badge-list');
var newBadgeForm = document.getElementById('new-badge-form');
var newBadgeName = document.getElementById('new-badge-name');
var newBadgeImage = document.getElementById('new-badge-image');










// [START write_fan_out]
function writeNewBadge( name, image) {
  // A badge entry.
  var badgeData = {
    name: name,
    image: image
  };

  // Get a key for a new Post.
  var newBadgeKey = firebase.database().ref().child('badge').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/posts/' + newBadgeKey] = badgeData;
  //updates['/user-posts/' + uid + '/' + newPostKey] = postData;

  return firebase.database().ref().update(updates);

}
// [END write_fan_out]




// Bindings on load.
window.addEventListener('load', function() {
  // Bind Sign in button.
  /*
  signInButton.addEventListener('click', function() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  });
  */

  // Listen for auth state changes
  /*
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      splashPage.style.display = 'none';
      writeUserData(user.uid, user.displayName, user.email);
      startDatabaseQueries();
    } else {
      splashPage.style.display = 'block';
    }
  });
  */

  // Saves message on form submit.
  newBadgeForm.onsubmit = function(e) {
    e.preventDefault();
    if (newBadgeName.value && newBadgeImage.value) {
      writeNewBadge(newBadgeName.value, newBadgeImage.value).then(function() {
        //myPostsMenuButton.click();
      });


    }
  };

  // Bind menu buttons.
  addBadgeButton.onclick = function() {
    addBadge.style.display = 'block';
    newBadgeName.value = '';
    newBadgeImage.value = '';
  };
}, false);
