const textInput = document.getElementById("textInput");
const profileDiv = document.getElementById("profile");

const AJAXCall = (e) => {
    const username = e.target.value;

    //Create the XMLHttpRequest and store it in xhr..
    const xhr = new XMLHttpRequest();

    //Assume this is how we include the client_id&secret??
    xhr.open("GET", `https://api.github.com/users/${username}?client_id=0404d5eb87b7e29e972d&client_secret=b4d7a95e3707ad9c51e1a2c0730730a863ab3e18`, true);

    xhr.onload = function(){
        //Didn't add the else..Keeping this exercise simple
        if (this.status == 200) {
            //Need another AJAX request for the repos..
            const secondxhr = new XMLHttpRequest();
            //responseText will be sorted(Latest Repos first)
            //&sort=created%3Aasc = &sort=created:asc(look at HTML char codes)
            secondxhr.open("GET", `https://api.github.com/users/${username}/repos?client_id=0404d5eb87b7e29e972d&client_secret=b4d7a95e3707ad9c51e1a2c0730730a863ab3e18&sort=created%3Aasc`);
            secondxhr.onload = function(){

                if (this.status == 200) {
                    const repos = JSON.parse(this.responseText); //[{}, {}]
                    const repoDiv = document.getElementById("repos");
                    let repoContent = "";
                    for (var i = 0; i < 5; i++) {
                        repoContent += `
                            <div class="card">
                              <div class="row">
                                <div class="col-md-7">
                                  <strong>${repos[i].name}</strong>: ${repos[i].description}
                                </div>
                                <div class="col-md-3">
                                  <span class="badge badge-dark">Forks: ${repos[i].forks_count}</span>
                                  <span class="badge badge-primary">Watchers: ${repos[i].watchers_count}</span>
                                  <span class="badge badge-success">Stars: ${repos[i].stargazers_count}</span>
                                </div>
                                <div class="col-md-2">
                                  <a href="${repos[i].html_url}" target="_blank" class="btn btn-dark">Repo Page</a>
                                </div>
                              </div>
                            </div>
                        `
                    } //end of for-loop
                    repoDiv.innerHTML = repoContent;
                }
            }
            //Remember to send XMLHttpRequest Obj after onload..
            secondxhr.send();
            //this refers to the first XMLHttpRequest(xhr)!secondxhr
            const user = JSON.parse(this.responseText);

            profileDiv.innerHTML = `
                <div class="card border-primary mb-3" style="max-width: 100rem;">
                  <div class="card-header"><h3>${user.name}</h3></div>
                  <div class="card-body">
                    <div class="row">
                    <div class="col-md-3">
                      <img class="img-thumbnail avatar" src="${user.avatar_url}">
                      <a target="_blank" class="btn btn-primary btn-block" href="${user.html_url}">View Profile</a>
                    </div>
                    <div class="col-md-9">
                      <span class="badge badge-dark">Public Repos: ${user.public_repos}</span>
                      <span class="badge badge-primary">Public Gists: ${user.public_gists}</span>
                      <span class="badge badge-success">Followers: ${user.followers}</span>
                      <span class="badge badge-info">Following: ${user.following}</span>
                      <br><br>
                      <ul class="list-group">
                        <li class="list-group-item">Company: ${user.company}</li>
                        <li class="list-group-item">Website/blog: <a href="${user.blog}" target="_blank">${user.blog}</a></li>
                        <li class="list-group-item">Location: ${user.location}</li>
                        <li class="list-group-item">Member Since: ${user.created_at}</li>
                      </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <h3 class="page-header">Latest Repos</h3>
                <div id="repos"></div>
            `;
        }
    }
    xhr.send();
}

textInput.addEventListener("keyup", AJAXCall);

// $(document).ready(function(){
//   $('#textInput').on('keyup', function(e){
//     let username = e.target.value;

//     // Make request to Github
//     $.ajax({
//         url:'https://api.github.com/users/'+username,
//         data:{
//           client_id:'b9315bcd5a07fcd759d8',
//           client_secret:'a2b698bf7e7c02f898197cf136d1a41f704ca8e4'
//         }
//     }).done(function(user){
//       $.ajax({
//         url:'https://api.github.com/users/'+username+'/repos',
//         data:{
//           client_id:'b9315bcd5a07fcd759d8',
//           client_secret:'a2b698bf7e7c02f898197cf136d1a41f704ca8e4',
//           sort: 'created: asc',
//           per_page: 5
//         }
//       }).done(function(repos){
//         $.each(repos, function(index, repo){
//           $('#repos').append(`
//             <div class="card">
//               <div class="row">
//                 <div class="col-md-7">
//                   <strong>${repo.name}</strong>: ${repo.description}
//                 </div>
//                 <div class="col-md-3">
//                   <span class="badge badge-dark">Forks: ${repo.forks_count}</span>
//                   <span class="badge badge-primary">Watchers: ${repo.watchers_count}</span>
//                   <span class="badge badge-success">Stars: ${repo.stargazers_count}</span>
//                 </div>
//                 <div class="col-md-2">
//                   <a href="${repo.html_url}" target="_blank" class="btn btn-dark">Repo Page</a>
//                 </div>
//               </div>
//             </div>
//           `);
//         });
//       });
//       $('#profile').html(`
//         <div class="card border-primary mb-3" style="max-width: 100rem;">
//           <div class="card-header"><h3>${user.name}</h3></div>
//           <div class="card-body">
//             <div class="row">
//             <div class="col-md-3">
//               <img class="img-thumbnail avatar" src="${user.avatar_url}">
//               <a target="_blank" class="btn btn-primary btn-block" href="${user.html_url}">View Profile</a>
//             </div>
//             <div class="col-md-9">
//               <span class="badge badge-dark">Public Repos: ${user.public_repos}</span>
//               <span class="badge badge-primary">Public Gists: ${user.public_gists}</span>
//               <span class="badge badge-success">Followers: ${user.followers}</span>
//               <span class="badge badge-info">Following: ${user.following}</span>
//               <br><br>
//               <ul class="list-group">
//                 <li class="list-group-item">Company: ${user.company}</li>
//                 <li class="list-group-item">Website/blog: <a href="${user.blog}" target="_blank">${user.blog}</a></li>
//                 <li class="list-group-item">Location: ${user.location}</li>
//                 <li class="list-group-item">Member Since: ${user.created_at}</li>
//               </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//         <h3 class="page-header">Latest Repos</h3>
//         <div id="repos"></div>
//         `);
//     });
//   });
// });