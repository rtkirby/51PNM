
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ', ' + cityStr;

    $greeting.text('So, you want to live at ' + address + '?');

    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '?';
    $body.append('<img class="bgimg" src="' + streetviewUrl + '">');

    // YOUR CODE GOES HERE!
    // NYTimes AJAX request
    
 /*   $.getJSON( "ajax/test.json", function( data ) {
  var items = [];
  $.each( data, function( key, val ) {
    items.push( "<li id='" + key + "'>" + val + "</li>" );
  });
 
  $( "<ul/>", {
    "class": "my-new-list",
    html: items.join( "" )
  }).appendTo( "body" );
}); */
    // <ul id="nytimes-articles" class="article-list"> 
    // <li class="article">
    // <a href="http://wwww.nytimes.com/2014/10/03/arts/design/museum-gallery-listings-for-oct-3-9.html">
    // Museum $ Gallery Listings for Oct. 3-9</a> 
    //</ul>

     var nytimesUrl = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q='
                        + cityStr + '&sort=newest&api-key=f967757a6cb2fbe2f3c2d975647a3b32:10:74016243'

    $.getJSON(nytimesUrl, function(data){

        $nytHeaderElem.text('New York Times Articles About ' + cityStr);

        articles = data.response.docs;
        for (var i = 0; i < articles.length; i++) {
            var article = articles[i];
            $nytElem.append('<li class="article">'+
                '<a href="'+article.web_url+'">'+article.headline.main+
                    '</a>'+
                '<p>' + article.snipppet + '</p>'+
            '</li>');
        };
    }).error(function(e){
        $nytHeaderElem.text('New York Times Articles Could Not Be Loaded');
    });
    return false;
};

$('#form-container').submit(loadData);
