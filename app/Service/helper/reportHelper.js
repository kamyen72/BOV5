function copy(body, document, fileName) {

    if (document.createRange && window.getSelection) {
        range = document.createRange();
        sel = window.getSelection();
        sel.removeAllRanges();

        var el = document.getElementById(fileName);
        try {
            range.selectNodeContents(el);
            sel.addRange(range);
        } catch (e) {
            range.selectNode(el);
            sel.addRange(range);
        }
        document.execCommand('Copy');

    } else if (body.createTextRange) {
        range = body.createTextRange();
        range.moveToElementText(el);
        range.select();
        range.execCommand('Copy');
    }
}

function excel(document, tableNameList, fileName) {
    var downloadLink;
    var dataType = 'application/vnd.ms-excel';

    var tableHTML = '';
    for (var i = 0; i < tableNameList.length; i++) {
        var tableSelect = document.getElementById(tableNameList[i]);
        tableHTML += tableSelect.outerHTML.replace(/ /g, '%20');
    }

    // Create download link element
    downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);

    if (navigator.msSaveOrOpenBlob) {
        var blob = new Blob(['\ufeff', tableHTML], {
            type: dataType
        });
        navigator.msSaveOrOpenBlob(blob, fileName);
    } else {
        // Create a link to the file
        downloadLink.href = 'data:' + dataType + ', ' + tableHTML;

        // Setting the file name
        downloadLink.download = fileName;

        //triggering the function
        downloadLink.click();
    }
}

function print(document,fileName) {
    var el = document.getElementById(fileName);

    var win = window.open('', '', 'height=700,width=700');
    win.document.write(el.outerHTML);
    win.document.close();
    win.print();
}

function sumFunction(column) {
    return function (total, model) {
        if (!model[column]) return total;
        return total + parseFloat(model[column]);
    };
}