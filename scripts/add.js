let data,
  index = 0,
  categoryIndexes = [];

$(document).ready(function () {

  const cardInputDiv = $('div.cards div.input'),
    categoryInputDiv = $('div.categories div.input'),
    categoryInput = categoryInputDiv.find('input'),
    addCardButton = $('div.cards button.add'),
    addCategoryButton = $('div.categories button.add'),
    finishAddingCards = $('div.cards button.finish'),
    inputCardTemplate = $('template#add-card-input').html(),
    app = {

    init: function () {

      $.ajax({
        async: false,
        url: 'http://api.jsonbin.io/b/5b9bc8bf74ca4633aadcb4ec/latest',
        method: 'GET',
        success: function (out) {
          data = out;
          for (const category of data.categories) {
            categoryIndexes.push(category.categoryName)
          }
        }
      });

      addCardButton.on('click', this.addCard);
      addCategoryButton.on('click', this.addCategory);
      finishAddingCards.on('click', this.finishAddingCards)

      addCardButton.click();
    },

    addCard: function (e) {
      e.preventDefault();

      cardInputDiv
        .append(inputCardTemplate
        .replace(/__index__/g, index)
      );

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

        if (val === '') return;

        $('select.category')
          .append(`<option value="${val}">${val}</option>`);

        categoryIndexes.push(val);

        data.categories.push({
          "categoryName": val,
          "questions": []
        });

        $.ajax({
          url: 'http://api.jsonbin.io/b/5b9bc8bf74ca4633aadcb4ec',
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
    },

    finishAddingCards: function () {
      $('.cards .input').find('.card').each(function () {

        const question = $(this).find('.question').val();
        const answer = $(this).find('.answer').val();
        const category = $(this).find('.category').val();

        const card = {
          "question": question,
          "answer": answer
        };

        const categoryIndex = categoryIndexes.indexOf(category);

        console.log(category, categoryIndex, data);

        data.categories[categoryIndex].questions.push(card);

      });

      $.ajax({
        url: 'http://api.jsonbin.io/b/5b9bc8bf74ca4633aadcb4ec',
        method: 'PUT',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function () {
          console.log('PUT SUCCESS');
          window.location.replace("index.html");
        },
        error: function(out) {
          console.log(out)
        }
      });

    }

  };

  app.init();

});