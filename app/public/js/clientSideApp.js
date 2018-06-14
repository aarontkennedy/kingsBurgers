
$(document).ready(function () {
    const toggleAddBurgerElem = $("#toggleAddBurger");
    const addBurgerElem = $("#addBurger");
    const diplayNoneClass = "d-none";

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
            $.post("/api/addBurger",
                {
                    name: $("input[name=burgerName]").val(),
                    description: $("textarea[name=burgerDescription]").val()
                })
                .done(function (data) {
                    populateSelectedBurger(data.id, data.name, data.description);
                });
        }
    });

    function populateSelectedBurger (id, name, description) {
        $("#burgerSelction").removeClass(diplayNoneClass);
        $("input[name=burgerID]").val(id);
        $("#burgerSelectionName").text(name);
        $("#burgerSelectionDescription").text(description);
    }

});