const glAlphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var glDictionaryWords = [];
var glStates = ['q0'];

const constructorInitialDataTable = () => {
    var header = $('#tr-header');
    var lineBlank = $('#q0');
    var thContent = '<th id="id" class="tautomaton-th">Y</th>';
    var tdContent = '<th id="q0-id" class="tautomaton-th-id">> q0</th>';
    glAlphabet.forEach((letter, index) => {
        thContent += `<th id="${letter}" class="tautomaton-th">${letter.toUpperCase()}</th>`;
        tdContent += `<td id="q0-${letter}" class="tautomaton-td">-</td>`;
    });
    header.append(thContent);
    lineBlank.append(tdContent);
};constructorInitialDataTable();

const addNewWord = (e) => {
    e.preventDefault();
    var words = $('#input-add-word')[0].value.split(' ');
    var validWord;
    var textareaValue = $('#textarea-dictionary')[0].value;

    words.forEach(word => {
        validWord = word.replace(/[^a-z]/gi, '').toLowerCase();
        if (validWord && !glDictionaryWords.includes(validWord)) {
            glDictionaryWords.push(validWord);
            textareaValue += validWord + ', ';
            addWordOnTable(validWord);
        }
    });
    $('#input-add-word')[0].value = '';
    $('#input-add-word').focus();
    $('#textarea-dictionary')[0].value = textareaValue;
}

const addWordOnTable = (word) => {
    var q = glStates[0];
    var body = $('.tautomaton-body');

    if ($('#' + q + '-' + word[0])[0].innerText === '-') {
        $('#' + q + '-' + word[0])[0].innerText = 'q' + glStates.length;
        for (let i = 0; i < word.length; i++) {
            var final = word.length - 1 === i ? '*' : '';
            var indexNewState = glStates.length;
            var tr = `<tr id="q${indexNewState}" class="tautomaton-tr"></tr>`;
            var td = `<th id="q${indexNewState}-id" class="tautomaton-th-id">${final}q${indexNewState}</th>`;
            glAlphabet.forEach((letter) => {
                var value = letter === word[i+1] ? ('q' + (indexNewState + 1)) : '-';
                td += `<td id="q${indexNewState}-${letter}" class="tautomaton-td">${value}</td>`;
            });
            body.append(tr);
            glStates.push('q' + indexNewState)
            $('#q' + indexNewState).append(td);
        }
    } else {
        var indexLetter = 0;
        var whereIAm = $('#' + q + '-' + word[indexLetter])[0].innerText;

        while (whereIAm !== '-') {
            indexLetter++;
            q = whereIAm;
            whereIAm = $('#' + q + '-' + word[indexLetter])[0].innerText;
        }

        $('#' + q + '-' + word[indexLetter])[0].innerText = 'q' + glStates.length;
        for (let i = indexLetter; i < word.length; i++) {
            var final = word.length - 1 === i ? '*' : '';
            var indexNewState = glStates.length;
            var tr = `<tr id="q${indexNewState}" class="tautomaton-tr"></tr>`;
            var td = `<th id="q${indexNewState}-id" class="tautomaton-th-id">${final}q${indexNewState}</th>`;
            glAlphabet.forEach((letter) => {
                var value = letter === word[i+1] ? ('q' + (indexNewState + 1)) : '-';
                td += `<td id="q${indexNewState}-${letter}" class="tautomaton-td">${value}</td>`;
            });
            body.append(tr);
            glStates.push('q' + indexNewState)
            $('#q' + indexNewState).append(td);
        }
    }
};



$('#form-add-word').submit(function(e) {addNewWord(e)});