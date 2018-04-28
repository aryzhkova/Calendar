
document.addEventListener("DOMContentLoaded", function(){
    var updateBtn = document.getElementById('update');
    updateBtn.addEventListener('click',function (e) {
        e.preventDefault();
        calendar.update();
    });
    $('#date').datepicker(
        {dateFormat: 'yy-mm-dd'}
    );
    calendar.init();
});