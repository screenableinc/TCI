$(document).ready(function () {
    new TimezZ('.countdown', {
        date: 'Jan 01, 2021 00:00:00',
        daysName: ':',
        hoursName: ':',
        minutesName: ':',
        secondsName: ':',
        numberTag: 'span',
        letterTag: 'i',
        stop: false, // stop the countdown timer?
    });
    var imgs=document.getElementsByClassName('candidate_pic')
    for (var i = 0; i < imgs.length; i++) {
        var img = imgs[i]
        console.log(img)

        var vibrant = new Vibrant(img);
        var swatches = vibrant.swatches()
        var color = swatches.Vibrant.getHex()


    }
})
var bar = new ProgressBar.Circle(".bar", {
    strokeWidth: 6,
    easing: 'easeInOut',
    duration: 1400,
    color: '#9c27b0',
    trailColor: '#eee',
    trailWidth: .5,
    svgStyle: null
});
new TimezZ('.demo', {
    date: 'Jan 1, 2020'
});



bar.animate(.5);  //