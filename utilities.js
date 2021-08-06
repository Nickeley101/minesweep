/**
 * Gets the desired element on the client page and clicks on it
 */
 function goToActivityTab() {
    var activityTab = document.getElementById('1_1')[0];

    activityTab.click();

    document.title = 'poop';
}

goToActivityTab();