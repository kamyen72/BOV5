function formatDate(date, withTime) {
    if (!date) return;

    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;

    if (withTime) return date.getFullYear() + '-' + (date.getMonth() + 1) + "-" + date.getDate() + "  " + strTime;
    else return date.getFullYear() + '-' + (date.getMonth() + 1) + "-" + date.getDate();
}

function getDateS(date) {
    if (!date) return;

    return date.getFullYear() + '/' + (date.getMonth() + 1) + "/" + date.getDate() + ' 00:00:00';
}

function getDateE(date) {
    if (!date) return;

    return date.getFullYear() + '/' + (date.getMonth() + 1) + "/" + date.getDate() + ' 23:59:59';
}