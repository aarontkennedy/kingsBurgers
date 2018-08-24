
$(document).ready(function () {
    const toggleAddBurgerElem = $("#toggleAddBurger");
    const addBurgerElem = $("#addBurger");
    const diplayNoneClass = "d-none";
    const burgerEatenForm = $("#burgerEatenForm");
    const burgerHistory = $("#burgerHistory table");

    // Initialize ajax autocomplete:
    $('#burgerAutocomplete').autocomplete({
        serviceUrl: '/autosuggest/burgers',
        onSelect: function (suggestion) {
            populateSelectedBurger(suggestion.data,
                suggestion.value,
                suggestion.description);
        }
    });

    // handles the validation of the add burger form and
    // sends the post request to the server
    addBurgerElem.submit(function (event) {
        event.preventDefault();
        if (addBurgerElem[0].checkValidity() === false) {
            event.stopPropagation();
            addBurgerElem[0].classList.add('was-validated');
        }
        else {
            $.post("/api/burgers",
                {
                    name: $("input[name=burgerName]").val().trim(),
                    description: $("textarea[name=burgerDescription]").val().trim()
                })
                .done(function (data) {
                    populateSelectedBurger(data.id, data.name, data.description);
                });
        }
    });

    // when a user finds a burger or creates a new one, we
    // need to populate and display the selected burger pane
    // so a user can choose to rate it and indicate if they have eaten it
    function populateSelectedBurger(id, name, description) {
        burgerEatenForm.removeClass(diplayNoneClass);
        burgerHistory.hide();
        $("input[name=burgerID]").val(id);
        $("#burgerSelectionName").text(name);
        $("#burgerSelectionDescription").text(description);
        // clear the form of any inputs
        $("input[name=burgerName]").val("");
        $("textarea[name=burgerDescription]").val("");
        $("#burgerAutocomplete").val("");
    }

    // give them a way to get rid of the add burger eaten form 
    // and see the history
    $("#cancelAddBurgerEaten").click(function (e) {
        e.preventDefault();
        burgerEatenForm.addClass(diplayNoneClass);
        showBurgerHistory();
    });

    // give them a way to clear the add burger form
    $("#clearAddBurger").click(function (e) {
        e.preventDefault();
        $("input[name=burgerName]").val("");
        $("textarea[name=burgerDescription]").val("");
    });

    // this is the form that is submitted when a user has said
    // they have eaten a burger
    // we need to take that info and send it to the server
    burgerEatenForm.submit(function (event) {
        event.preventDefault();
        burgerEatenForm.addClass(diplayNoneClass);

        const bID = $("input[name=burgerID]").val().trim();
        const eID = $("input[name=eaterID]").val().trim();
        const rating = $("input[name=burgerRating]:checked").val().trim();

        $.post("/api/burgerseaten",
            {
                burger_id: bID,
                eater_id: eID,
                rating: rating
            })
            .done(function (data) {
                // success - show the burger history
                // the new burger eaten should be there
                showBurgerHistory();
            });
    });

    // grab an individual's burger eating history
    // i know I should cache the burger history, but
    // i am just going to clear and call for it again...
    function showBurgerHistory() {
        burgerEatenForm.addClass(diplayNoneClass);
        burgerHistory.show();

        if ($("input[name=eaterID]").val()) {
            $.get("/api/burgerseaten/" + $("input[name=eaterID]").val().trim())
                .done(function (data) {
                    //console.log(data);

                    // calculate from the history how many UNIQUE
                    // burgers were eaten
                    getNumDifferentBurgersEaten(data);

                    let burgerHistoryTable = $("#burgerHistoryTable");

                    // clear the history
                    burgerHistoryTable.children().remove();

                    // change the numerical burger rating to an icon
                    for (let i = 0; i < data.length; i++) {
                        let rating = null;
                        switch (data[i].burgerRating) {
                            case 0:
                                rating = `<i class="far fa-frown bad"></i>`;
                                break;
                            case 1:
                                rating = `<i class="far fa-meh okay"></i>`;
                                break;
                            case 2:
                                rating = `<i class="far fa-smile great"></i>`;
                                break;
                            default:
                                rating = `ERROR!`;
                                break;
                        }

                        let row = `<tr>
                        <td>${data[i].burgerDate}</td>
                        <td>${data[i].burgerName}</td>
                        <td>${rating}</td>
                        </tr>`;
                        burgerHistoryTable.append(row);
                    }

                    $("#numBurgersEaten").text(data.length);
                });
        }
    }
    showBurgerHistory();

    function getNumDifferentBurgersEaten(burgersEaten) {

        // this function here will take an array and using the classifier
        // in this case, i pass in the burger name, it makes a new object
        // with an entry with burgerName and how many times it occurs
        function count(array, classifier) {
            return array.reduce(function (counter, item) {
                var p = classifier(item); // get the burgerName
                // check if the burger name already exists
                // if it does, increment else create the entry and set = 1
                counter[p] = counter.hasOwnProperty(p) ? counter[p] + 1 : 1;
                return counter;
            }, {})
        };

        countByName = count(burgersEaten, function (item) {
            return item.burgerName
        });

        // we need to find how many keys there are, that corresponds to the number
        // of different burgers consumed
        let numDifBurgers = 0;
        for (let key in countByName) {
            numDifBurgers++;
        }

        $("#numDifferentBurgers").text(numDifBurgers);
    }





});