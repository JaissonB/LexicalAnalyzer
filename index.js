const glAlphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var glDictionaryWords = [];

const constructorInitialDataTable = () => {
    var header = $('#tr-header');
    var lineBlank = $('#q0');
    var thContent = '<th id="id" class="tautomaton-th">Y</th>';
    var tdContent = '<th id="q0-id" class="tautomaton-th-id">> q0</th>';
    glAlphabet.forEach((letter, index) => {
        thContent += `<th id="${letter}" class="tautomaton-th">${letter.toUpperCase()}</th>`;
        tdContent += `<td id="q${index}-${letter}" class="tautomaton-td">-</td>`;
    });
    header.append(thContent);
    lineBlank.append(tdContent);
};constructorInitialDataTable();

const addNewWord = () => {
    console.log("sad")
}