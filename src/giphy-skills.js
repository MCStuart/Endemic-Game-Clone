$(document).ready(function() {
  // $(this).click(function() {
		console.log(this);
    let skill = $('#searchTerms').val();
    $('#searchTerms').val("");
    
    let request = new XMLHttpRequest();
    const url = `api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}=${searchTerms}&limit=1`;
    
    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    }
    
    request.open("GET", url, true);
    request.send();
		
		$("#reportimage").setAttr("src",response.data.images.fixed_width.url)
    // const getElements = function(response) {
    //     $('.showSkillGif').display(${response.data.images.fixed_width.url});
    // }
  // });
});