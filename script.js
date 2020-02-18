const app = {};

// WORKING URL THAT PULLS ENTIRE API BY CITY (TORONTO)
// https://app.ticketmaster.com/discovery/v2/events.json?apikey=bTDdH2M6LG5xlXjLYgM6g2xJnQJgtML1&city=toronto


// Storing date from HTML
app.date = $('.date').val();
// app.submit = $('.submit');

$(".submit").click(function(){

    location.reload();

});

// PULLS LOCAL DATE TIME
app.startTime = `T00:00:00`;
app.startDateTime = `${app.date}${app.startTime}`;
app.endTime = `T23:59:59`;
app.endDateTime = `${app.date}${app.endTime}`;
app.localStartDateTime = `${app.startDateTime},${app.endDateTime}`


app.ajaxCall = function(){
    $.ajax({
        url: `https://app.ticketmaster.com/discovery/v2/events.json?`,
        type: `GET`,
        datatype: `json`,
        async: true,
        data: {
            apikey: `bTDdH2M6LG5xlXjLYgM6g2xJnQJgtML1`,
            city: `toronto`,
            localStartDateTime: app.localStartDateTime,
        }
    }).then(function(result) {

        console.log(result)

        let arrayData = result._embedded.events;

        // Function to sort out duplicate events
        function sortSportsDuplicates() {
            // New array that we will not add duplicate events to (no two events with the same name)
            let noDuplicates = [];
            arrayData.forEach(function(item){
                const genre = item.classifications[0].segment.name;
                const nameOfEvent = item.name;
                const venue = item._embedded.venues[0].name;
                const date = item.dates.start.localDate;
                const time = item.dates.start.localTime;
                const htmlToAppend = `
                <div>
                    <li>Genre: ${genre}</li>
                    <li>Name of event: ${nameOfEvent}</li>
                    <li>Name of venue: ${venue}</li>
                    <li>Date: ${date}</li>
                    <li>Time: ${time}</li>
                </div>
                `;

                // We only care about "item" if its an arts event
                if (genre === "Sports") {
                    // If there's nothing in noDuplicates, that means that we can safely add our first event and it won't be a duplicate
                    if(noDuplicates.length == 0){
                        noDuplicates.push(item);
                        htmlToAppend;
                        $('.sports').append(htmlToAppend);
                    // Otherwise, we have to take a look at what we've added to noDuplicates already
                    } else {
                        // Boolean variable that tells us if the "copied" item matches the "item" we're considering adding 
                        let match = false;
                        noDuplicates.forEach(function(copied) {
                            // If the name and venue are the same, we treat this as the same event, and we don't add it to noDuplicates
                            if(item.name === copied.name && 
                                item._embedded.venues[0].name === copied._embedded.venues[0].name) {
                                    match = true;
                            }
                        });
                        // If no event in noDuplicates matches item, that means we can add it.
                        if(!match) {
                            noDuplicates.push(item);
                            htmlToAppend;
                            $('.sports').append(htmlToAppend);
                        }
                    }
                }
            })
        }
        sortSportsDuplicates();



        // Function to sort out duplicate events
        function sortMusicDuplicates() {
            // New array that we will not add duplicate events to (no two events with the same name)
            let noDuplicates = [];
            arrayData.forEach(function(item){
                const genre = item.classifications[0].segment.name;
                const nameOfEvent = item.name;
                const venue = item._embedded.venues[0].name;
                const date = item.dates.start.localDate;
                const time = item.dates.start.localTime;
                const htmlToAppend = `
                <div>
                    <li>Genre: ${genre}</li>
                    <li>Name of event: ${nameOfEvent}</li>
                    <li>Name of venue: ${venue}</li>
                    <li>Date: ${date}</li>
                    <li>Time: ${time}</li>
                </div>
                `;

                // We only care about "item" if its an arts event
                if (genre === "Music") {
                    // If there's nothing in noDuplicates, that means that we can safely add our first event and it won't be a duplicate
                    if(noDuplicates.length == 0){
                        noDuplicates.push(item);
                        htmlToAppend;
                        $('.music').append(htmlToAppend);
                    // Otherwise, we have to take a look at what we've added to noDuplicates already
                    } else {
                        // Boolean variable that tells us if the "copied" item matches the "item" we're considering adding 
                        let match = false;
                        noDuplicates.forEach(function(copied) {
                            // If the name and venue are the same, we treat this as the same event, and we don't add it to noDuplicates
                            if(item.name === copied.name && 
                                item._embedded.venues[0].name === copied._embedded.venues[0].name) {
                                    match = true;
                            }
                        });
                        // If no event in noDuplicates matches item, that means we can add it.
                        if(!match) {
                            noDuplicates.push(item);
                            htmlToAppend;
                            $('.music').append(htmlToAppend);
                        }
                    }
                }
            })
        }
        sortMusicDuplicates();




        // Function to sort out duplicate events
        function sortArtDuplicates() {
            // New array that we will not add duplicate events to (no two events with the same name)
            let noDuplicates = [];
            arrayData.forEach(function(item){
                const genre = item.classifications[0].segment.name;
                const nameOfEvent = item.name;
                const venue = item._embedded.venues[0].name;
                const date = item.dates.start.localDate;
                const time = item.dates.start.localTime;
                const htmlToAppend = `
                <div>
                    <li>Genre: ${genre}</li>
                    <li>Name of event: ${nameOfEvent}</li>
                    <li>Name of venue: ${venue}</li>
                    <li>Date: ${date}</li>
                    <li>Time: ${time}</li>
                </div>
                `;

                // We only care about "item" if its an arts event
                if (genre === "Arts & Theatre") {
                    // If there's nothing in noDuplicates, that means that we can safely add our first event and it won't be a duplicate
                    if(noDuplicates.length == 0){
                        noDuplicates.push(item);
                        htmlToAppend;
                        $('.arts').append(htmlToAppend);
                    // Otherwise, we have to take a look at what we've added to noDuplicates already
                    } else {
                        // Boolean variable that tells us if the "copied" item matches the "item" we're considering adding 
                        let match = false;
                        noDuplicates.forEach(function(copied) {
                            // If the name and venue are the same, we treat this as the same event, and we don't add it to noDuplicates
                            if(item.name === copied.name && 
                                item._embedded.venues[0].name === copied._embedded.venues[0].name) {
                                    match = true;
                            }
                        });
                        // If no event in noDuplicates matches item, that means we can add it.
                        if(!match) {
                            noDuplicates.push(item);
                            htmlToAppend;
                            $('.arts').append(htmlToAppend);
                        }
                    }
                }
            })
        }
        sortArtDuplicates();
    })
}

app.init = function(){
    app.ajaxCall();
}

$(function() {
    app.init();
})





