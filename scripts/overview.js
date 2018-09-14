let data;

$(document).ready(function () {
  const categoryTemplate = $('template#category').html(),
    questionTemplate = $('template#cards').html(),
    app = {
    init: function () {
      $.ajax({
        async: false,
        url: 'http://api.jsonbin.io/b/5b9b80fe1bf1ca33b06b0fde/latest',
        method: 'GET',
        success: function (out) {
          for (const category of out.categories) {
            const name = (category.categoryName).toLowerCase().replace(/\s/g, '');
            $('main').append(categoryTemplate
              .replace(/__categoryName__/g, category.categoryName)
              .replace(/__categoryNameID__/, name)
            );
            for (const card of category.questions) {
              $(`#${name}`).append(questionTemplate
                .replace(/__question__/g, card.question)
                .replace(/__answer__/g, card.answer)
              )
            }
          }
        }
      });

    }
  };

  app.init();
});