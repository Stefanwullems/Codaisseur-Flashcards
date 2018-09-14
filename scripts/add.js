let data,
  index = 0;

$(document).ready(function () {

  const cardInputDiv = $('div.cards div.input'),
    categoryInputDiv = $('div.categories div.input'),
    categoryInput = categoryInputDiv.find('input'),
    addCardButton = $('div.cards button.add'),
    addCategoryButton = $('div.categories button.add'),
    inputCardTemplate = $('template#add-card-input').html(),
    app = {

    init: function () {

      $.ajax({
        async: false,
        url: 'http://api.jsonbin.io/b/5b9b80fe1bf1ca33b06b0fde/latest',
        method: 'GET',
        success: function (out) {
          data = out;
        }
      });

      addCardButton.on('click', this.addCard);
      addCategoryButton.on('click', this.addCategory);

      addCardButton.click();
    },

    addCard: function (e) {
      e.preventDefault();

      cardInputDiv
        .append(inputCardTemplate
        .replace(/__index__/g, index));

      for (const category of data.categories) {
        $(`p#card-${index}`)
          .find('select.category')
          .append(`<option value="${category.categoryName}">${category.categoryName}</option>`)
      }

      index++;
    },

    addCategory: function (e) {
      e.preventDefault();

      const shownBool = $(this).data('shown');

      if (shownBool) {
        const val = categoryInput.val();
        $('select.category')
          .append(`<option value="${val}">${val}</option>`);

        data.categories.push({
          "categoryName": val,
          "questions": []
        });

        console.log(JSON.stringify(data));

        $.ajax({
          url: 'http://api.jsonbin.io/b/5b9b80fe1bf1ca33b06b0fde',
          method: 'PUT',
          data: JSON.stringify(data),
          contentType: 'application/json',
          success: function () {
            console.log('PUT SUCCESS')
          },
          error: function(out) {
            console.log(out)
          }
        });


      }

      categoryInput.val('');
      $(this).closest('.categories').find('.input').toggle();
      $(this).data('shown', !shownBool);
    }

  };

  app.init();

});