$(document).ready(function () {
  let index = 0;

  const input = $('div.input'),
        addCardButton = $('button.add-card'),
        addCategoryButton = $('button.add-category'),
        inputTemplate = '<p><input id="question-__index__"><input id="answer-__index__"></p>';

  addCardButton.on('click', function (e) {
    e.preventDefault();
    input.append(inputTemplate.replace(/__index__/g, index));
    index++;
  });
  addCardButton.click();



});