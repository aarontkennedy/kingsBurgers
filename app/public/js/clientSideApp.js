
$(document).ready(function () {
    const toggleAddBurgerElem = $("#toggleAddBurger");
    const addBurgerElem = $("#addBurger");
    const diplayNoneClass = "d-none";
    const burgerEatenForm = $("#burgerEatenForm");
    const burgerHistory = $("#burgerHistory");

    // Initialize ajax autocomplete:
    $('#burgerAutocomplete').autocomplete({
        serviceUrl: '/autosuggest/burgers',
        onSelect: function (suggestion) {
            populateSelectedBurger(suggestion.data,
                suggestion.value,
                suggestion.description);
        }
    });

    toggleAddBurgerElem.click(function () {
        if (addBurgerElem.hasClass(diplayNoneClass)) {
            addBurgerElem.removeClass(diplayNoneClass);
        }
        else {
            addBurgerElem.addClass(diplayNoneClass);
        }
    });

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

    function populateSelectedBurger(id, name, description) {
        burgerEatenForm.removeClass(diplayNoneClass);
        burgerHistory.hide();
        $("input[name=burgerID]").val(id);
        $("#burgerSelectionName").text(name);
        $("#burgerSelectionDescription").text(description);
        // clear the form
        $("input[name=burgerName]").val("");
        $("textarea[name=burgerDescription]").val("");
    }

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
                showBurgerHistory();
            });
    });

    function showBurgerHistory() {
        burgerEatenForm.addClass(diplayNoneClass);
        burgerHistory.show();

        if ($("input[name=eaterID]").val()) {
            $.get("/api/burgerseaten/" + $("input[name=eaterID]").val().trim())
                .done(function (data) {
                    console.log(data);

                    getNumDifferentBurgersEaten(data);

                    let burgerHistoryTable = $("#burgerHistoryTable");

                    burgerHistoryTable.children().remove();

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

        count = function (array, classifier) {
            return array.reduce(function (counter, item) {
                var p = classifier(item);
                counter[p] = counter.hasOwnProperty(p) ? counter[p] + 1 : 1;
                return counter;
            }, {})
        };

        countByName = count(burgersEaten, function (item) {
            return item.burgerName
        });

        console.log(countByName);

        let numDifBurgers = 0;
        for (let key in countByName) {
            numDifBurgers++;
        }

        $("#numDifferentBurgers").text(numDifBurgers);
    }

    function totalBurgerStatistics() {
        let statisticsElem = $("#totalBurgerStatistics");

        $.get("/api/count")
            .done(function (data) {
                console.log(data);

                statisticsElem.append(`<h3>
                <img src="burgerIconBullet.png"> ${data.burgers} Burgers Listed</h3>
                <h3><img src="burgerIconBullet.png"> ${data.burgersEaten} Burgers Eaten</h3>
                <h3><img src="burgerIconBullet.png"> ${data.eaters} Burger Trackers</h3>`);
            });
    }
    totalBurgerStatistics();



});