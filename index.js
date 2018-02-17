// import reddit
import reddit from './redditapi';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

// form event listener
searchForm.addEventListener('submit', e =>{

    // Get search term
    const searchTerm = searchInput.value;
    //Get sortBy
    const sortBy = document.querySelector('input[name="sortby"]:checked').value;
    // Get limit
    const searchLimit =document.getElementById('limit').value;

 
    if(searchTerm == ''){
        //message
        showMessage('please add a search-term', 'alert-danger');
    }
    // clear input
    searchInput.value = '';

    // search reddit
    reddit.search(searchTerm, searchLimit, sortBy)
    .then(results => 
    {
        console.log(results);
        // set image
       

        let output = '<div class="card-columns">';
        // loop through results
        results.forEach(post =>
        {
            const image = post.preview ? post.preview.images[0].source.url : 'https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg';
            output+= `<div class="card" >
  <img class="card-img-top" src="${image}" alt="Card image cap">
  <div class="card-block">
    <h4 class="card-title">${post.title}</h4>
    <p class="card-text">${truncateText(post.selftext,100)}</p>
    <a href="${post.url}" target="_blank" class="btn btn-primary">Read more</a>
    <hr>
    <span class="badge badge-secondary">subreddit : ${post.subreddit}</span>
    <span class="badge badge-dark">score : ${post.score}</span>
  </div>
</div>`;
        });

        output+='<div>';
        document.getElementById('results').innerHTML = output;
        console.log(results);
    }
    )

    e.preventDefault();
});


function showMessage(message, className) {
  // Create div
  const div = document.createElement('div');
  // Add classes
  div.className = `alert ${className}`;
  // Add text
  div.appendChild(document.createTextNode(message));
  // Get parent
  const searchContainer = document.getElementById('search-container');
  // Get form
  const search = document.getElementById('search');

  // Insert alert
  searchContainer.insertBefore(div, search);

  // timeout for error message
  setTimeout(function(){
      document.querySelector('.alert').remove()
  },3000)

}

function truncateText(text,limit){
           const shortened = text.indexOf(' ',limit);
           if(shortened == -1){
               return text;
           }
           else{
               return text.substring(0,shortened);
           }

}

