//clear All(articles,options..)
function clearAll() {
    $('#articles-list').empty();
    $('.is-invalid').removeClass('is-invalid');
    $('.error-message').remove();
    $('#search-term').val("");
    $('#start-year').val("");
    $('#end-year').val("");
}

//To check form for if forms are true
function checkFormValidity() {
    var searchTerm = $('#search-term').val();
    var numberOfRecords = $('#number-of-records').val();
    var startYear = $('#start-year').val();
    var endYear = $('#end-year').val();

    var errors = [];

    if ($('#search-term').is(':required') && !searchTerm.trim()) {
        errors.push({
            id: '#search-term',
            message: 'Search term is empty'
        });
    }
    if (['1', '5', '10'].indexOf(numberOfRecords) === -1) {
        errors.push({
            id: '#number-of-records',
            message: 'Number of records is wrong'
        });
    }
    if ($('#start-year').is(':required') && !startYear.trim()) {
        errors.push({
            id: '#start-year',
            message: 'Start year is wrong'
        });
    }
    if ($('#end-year').is(':required') && !endYear.trim()) {
        errors.push({
            id: '#end-year',
            message: 'End year is wrong'
        });
    }

    if (errors.length) {
        return errors;
    } else {
        return false;
    }
};

//Return Data Json for Ajax
function getQueryData() {
    var searchTerm = $('#search-term').val();
    var numberOfRecords = $('#number-of-records').val();
    var startYear = $('#start-year').val();
    var endYear = $('#end-year').val();
    var obj = {
        q: searchTerm,
        numberOfRecords: numberOfRecords,
        'api-key': '7zd4iPLXfO0OHJ9IWavoIwGJJEhi0KiF'
    }
    if (startYear) {
        obj['begin_date'] = startYear + '0101';
    }
    if (endYear) {
        obj['end_date'] = endYear + '1231';
    }
    return obj;
}
//To handle Success Response
function successResponse(response) {
    if (response.status !== 'OK') {
        alert("Xeta bash verdi")
        return;
    }
    var xeberler = response.response.docs;
    for (let i = 0; i < xeberler.length; i++) {
        var xeber = xeberler[i];
        xeberiGoster(xeber);
    }
}

function xeberiGoster(xeber) {
    var title = xeber.headline.main;
    var abstract = xeber.abstract;
    var webUrl = xeber.web_url;

    $('#articles-list').append(`<div class="news-item">
    <h2><a href="${webUrl}" target="_blank">${title}</a></h2>
    <p>${abstract}</p><hr>
    </div>`)
}

$('#run-search').on('click', function() {
    var netice = checkFormValidity();
    clearAll();
    if (netice !== false) {

        for (let xeta of netice) {
            $(xeta.id).addClass('is-invalid');
            $(xeta.id).after("<div class='error-message'>" + xeta.message + "</div>");

        }
    } else {
        var data = getQueryData();
        $.ajax({
            url: 'https://api.nytimes.com/svc/search/v2/articlesearch.json',
            data: data,
            method: 'GET',
        }).done(successResponse);
    }
});

$('#clear-all').on('click', function() {
    clearAll();
});