let data,
  index = 0,
  categories = [];

$(document).ready(function () {

  $.ajax({
    async: false,
    url: 'http://api.jsonbin.io/b/5b9b80fe1bf1ca33b06b0fde',
    method: 'GET',
    success: function (out) {
      data = out;
    }
  });

  for (const category of data.categories) {
    categories.push(category.categoryName);
  }

  const cardInputDiv = $('div.cards div.input'),
    categoryInputDiv = $('div.categories div.input'),
    categoryInput = categoryInputDiv.find('input'),
    addCardButton = $('div.cards button.add'),
    addCategoryButton = $('div.categories button.add'),
    inputCardTemplate = $('template#add-card-input').html(),
    app = {

    addCard: function (e) {
      e.preventDefault();

      cardInputDiv
        .append(inputCardTemplate
        .replace(/__index__/g, index));

      for (const category of categories) {
        $(`p#card-${index}`)
          .find('select.category')
          .append(`<option value="${category}">${category}</option>`)
      }

      index++;
    },

    addCategory: function (e) {
      e.preventDefault();

      const shownBool = $(this).data('shown');

      if (shownBool) {
        const val = categoryInput.val();
        $('select.category')
          .append(`<option value="${val}">${val}</option>`)
        categories.push(val);
        categoryInput.val('');
      }

      $(this).closest('.categories').find('.input').toggle();
      $(this).data('shown', !shownBool);
    }

  };

  addCardButton.on('click', app.addCard);
  addCategoryButton.on('click', app.addCategory);
  addCardButton.click();

});