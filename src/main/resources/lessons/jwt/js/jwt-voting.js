$(document).ready(function () {
    loginVotes('Guest');
})

function loginVotes(user) {
    $("#name").text(user);
    $.ajax({
        url: 'JWT/votings/login?user=' + user,
        contentType: "application/json"
    }).always(function () {
        getVotings();
    })
}

var html = '<a href="#" class="list-group-item ACTIVE">' +
    '<div class="media col-md-3">' +
    '<figure> ' +
    '<img class="media-object img-rounded" src="images/IMAGE_SMALL" alt="placehold.it/350x250"/>' +
    '</figure>' +
    '</div> ' +
    '<div class="col-md-6">' +
    '<h4 class="list-group-item-heading">TITLE</h4>' +
    '<p class="list-group-item-text">INFORMATION</p>' +
    '</div>' +
    '<div class="col-md-3 text-center">' +
    '<h2 HIDDEN_VIEW_VOTES>NO_VOTES' +
    '<small HIDDEN_VIEW_VOTES> votes</small>' +
    '</h2>' +
    '<button type="button" id="TITLE" class="btn BUTTON btn-lg btn-block" onclick="vote(this.id)">Vote Now!</button>' +
    '<div style="visibility:HIDDEN_VIEW_RATING;" class="stars"> ' +
    '<span class="glyphicon glyphicon-star"></span>' +
    '<span class="glyphicon glyphicon-star"></span>' +
    '<span class="glyphicon glyphicon-star"></span>' +
    '<span class="glyphicon glyphicon-star-empty"></span>' +
    '</div>' +
    '<p HIDDEN_VIEW_RATING>Average AVERAGE<small> /</small>4</p>' +
    '</div>' +
    '<div class="clearfix"></div>' +
    '</a>';

function getVotings() {
    $("#votesList").empty();
    $.get("JWT/votings", function (result, status) {
        for (var i = 0; i < result.length; i++) {
            var $voteItem = $('<a href="#" class="list-group-item"></a>');
            if (i === 0) {
                $voteItem.addClass('active');
            }
            
            var $media = $('<div class="media col-md-3"><figure><img class="media-object img-rounded" alt="placehold.it/350x250"/></figure></div>');
            $media.find('img').attr('src', 'images/' + result[i].imageSmall);
            
            var $content = $('<div class="col-md-6"><h4 class="list-group-item-heading"></h4><p class="list-group-item-text"></p></div>');
            $content.find('h4').text(result[i].title);
            $content.find('p').text(result[i].information || '');
            
            var $voting = $('<div class="col-md-3 text-center"></div>');
            var $votesHeader = $('<h2></h2>');
            if (result[i].numberOfVotes !== undefined) {
                $votesHeader.text(result[i].numberOfVotes).append($('<small> votes</small>'));
            } else {
                $votesHeader.attr('hidden', true);
            }
            $voting.append($votesHeader);
            
            var $button = $('<button type="button" class="btn btn-lg btn-block">Vote Now!</button>');
            $button.addClass(i === 0 ? 'btn-default' : 'btn-primary');
            $button.attr('id', result[i].title);
            $button.on('click', function() { vote(this.id); });
            $voting.append($button);
            
            var $stars = $('<div class="stars"><span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star-empty"></span></div>');
            var $avgText = $('<p>Average <small> /</small>4</p>');
            if (result[i].average !== undefined) {
                $stars.css('visibility', 'visible');
                $avgText.prepend(document.createTextNode(result[i].average));
            } else {
                $stars.css('visibility', 'hidden');
                $avgText.attr('hidden', true);
            }
            $voting.append($stars).append($avgText);
            
            $voteItem.append($media).append($content).append($voting).append($('<div class="clearfix"></div>'));
            $("#votesList").append($voteItem);
        }
    })
}

webgoat.customjs.jwtSigningCallback = function () {
    getVotings();
}

function vote(title) {
    var user = $("#name").text();
    if (user === 'Guest') {
        alert("As a guest you are not allowed to vote, please login first.")
    } else {
        $.ajax({
            type: 'POST',
            url: 'JWT/votings/' + title
        }).then(
            function () {
                getVotings();
            }
        )
    }
}
