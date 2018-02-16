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
        let output = '<div class="card-columns">';
        // loop through results
        results.forEach(post =>
        {
            output+= `<div class="card" >
  <img class="card-img-top" src="..." alt="Card image cap">
  <div class="card-block">
    <h4 class="card-title">Card title</h4>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
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
