var calendar = (function(){
    var nowDate = new Date();
    var today = nowDate.getDate();
    var currentMonth = nowDate.getMonth();
    var currentYear = nowDate.getFullYear();
    var calendar = document.getElementById('calendar');
    var controls = document.querySelector('.calendar__controls');
    var wrapEventForm = document.querySelector('.wrap-event');
    var eventForm = document.getElementById('eventForm');
    var error = 0;
    var month = currentMonth;
    var year = currentYear;
    var date = document.querySelector('.date__text');
    var monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
        "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
    var events = [{
        date : '2018-04-01',
        title : "Встреча",
        desc : "Не забыть бумаги"
        },
        {
        date : "2018-05-05",
        title : "Встреча",
        desc : "Не забыть бумаги"
        }];
    function createElem(className){
        var el = document.createElement('div');
        el.className = className;
        return el;
    }
    function setEmpty(el) {
        el.classList.add('empty');
    }
    function setDay(date,day) {

        var dateDiv = createElem("date");
        dateDiv.innerHTML = date.getDate().toString();
        day.appendChild(dateDiv);
        events.forEach(function(event){
            var eventDate = new Date(event.date);
            if(eventDate.getDate() == date.getDate() &&
                eventDate.getMonth() == date.getMonth()
                && eventDate.getFullYear() == date.getFullYear()){
                setEvent(day,event);
            }
        });
    }
    function setEvent(day,event){
        var eventDiv = createElem("event");
        var titleEvent = createElem("event__title");
        var descEvent = createElem("event__desc");
        titleEvent.innerHTML = event.title;
        descEvent.innerHTML = event.desc;
        eventDiv.appendChild(titleEvent);
        eventDiv.appendChild(descEvent);
        day.appendChild(eventDiv);
        day.classList.add('blue-bg');
    }
    function setCurrentDay(date,el) {
        var now = new Date();
        if(date.getDate() == now.getDate() &&
            date.getMonth()== now.getMonth() &&
            date.getFullYear() == now.getFullYear()){
            el.classList.add('today');
        }
    }
    function getNumDay(date){ // 0 - monday 6-sunday
        var numDay = date.getDay();
        if(numDay == 0){
            numDay = 7;
        }
        return numDay - 1;

    }
    function createTable(year,month){
        var d = new Date (year,month,1);
        var mon = d.getMonth();
        var lastDay = new Date(year,month+1,0);
        var weekNum = 0;

        while(d.getMonth() == mon){
            var week = createElem('calendar__week');
            var i = 0;
            while( i < 7){
                var day = createElem('calendar__day');
                setCurrentDay(d,day);
                if(weekNum ==0){
                    if(i < getNumDay(d)){
                        setEmpty(day);
                    }else{
                        setDay(d,day);
                        d.setDate(d.getDate()+1);
                    }
                }else{
                    if(d.getDate() <= lastDay.getDate() &&
                        d.getMonth()== mon){
                        setDay(d,day);
                    }else{
                        setEmpty(day);
                    }
                    d.setDate(d.getDate()+1);
                }
                week.appendChild(day)   ;
                i=i+1;
            }
            calendar.appendChild(week);
            weekNum++;
        }

    }
    function closeEventForm() {
        eventForm.reset();
        wrapEventForm.style.opacity = 0;
        setTimeout(function () {
            wrapEventForm.classList.remove('show');
        },500);
    }
    function showEventForm() {
        wrapEventForm.classList.add('show');
        wrapEventForm.style.opacity = 1;
    }
    function checkEmptyField(input) {
        if(input.value ==''){
            input.classList.add('error');
            error = 1;
        }else{
            input.classList.remove('error');
        }
    }
    return{
        init : function(){
            date.innerHTML = monthNames[month] +" "+year;
            var addEventBtn = document.getElementById('add');
            var eventForm = document.getElementById('eventForm');
            createTable(year,month,events);
            controls.addEventListener('click',function (e) {
                e.preventDefault();
                if(e.target.classList.contains('btn_today') ||
                    e.target.parentElement.classList.contains("btn_today")){
                    date.innerHTML = monthNames[currentMonth] +" "+currentYear;
                    calendar.innerHTML = "";
                    createTable(currentYear,currentMonth);
                }
                if(e.target.classList.contains('btn_next') ||
                    e.target.parentElement.classList.contains("btn_next")){
                    if(month != 11 ){
                        ++month;
                    }else {
                        ++year;
                        month = 0;
                    }
                    console.log(month);
                    date.innerHTML = monthNames[month] +" "+year;
                    calendar.innerHTML = "";
                    createTable(year,month);
                }
                if(e.target.classList.contains('btn_prev') ||
                    e.target.parentElement.classList.contains("btn_prev")){
                    if(month != 0 ){
                        --month;
                    }else {
                        --year;
                        month = 11;
                    }
                    console.log(month);
                    date.innerHTML = monthNames[month] +" "+year;
                    calendar.innerHTML = "";
                    createTable(year,month);
                }
            });
            addEventBtn.addEventListener('click',function(e){
                e.preventDefault();
                showEventForm();
            });
            eventForm.addEventListener('click',function (e) {

                if (e.target.getAttribute('id')=='close'){
                    e.preventDefault();
                    closeEventForm();
                }

                if(e.target.getAttribute('id')=='save'){
                    error = 0;
                    e.preventDefault();
                    var field = eventForm.elements;
                    var event ={
                        date : field.date.value,
                        title : field.title.value,
                        desc : field.desc.value
                    };
                    for(var i = 0; i < field.length; i++){
                        if (field[i].required == true){
                            checkEmptyField(field[i]);
                        }
                    }
                    if(error == 0){
                        events.push(event);
                        closeEventForm();
                    }
                }
            });


        },
        update : function(){
            calendar.innerHTML = "";
            createTable(year,month);
        }
    }
}());


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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhbGVuZGFyLmpzIiwiYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbE5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgY2FsZW5kYXIgPSAoZnVuY3Rpb24oKXtcclxuICAgIHZhciBub3dEYXRlID0gbmV3IERhdGUoKTtcclxuICAgIHZhciB0b2RheSA9IG5vd0RhdGUuZ2V0RGF0ZSgpO1xyXG4gICAgdmFyIGN1cnJlbnRNb250aCA9IG5vd0RhdGUuZ2V0TW9udGgoKTtcclxuICAgIHZhciBjdXJyZW50WWVhciA9IG5vd0RhdGUuZ2V0RnVsbFllYXIoKTtcclxuICAgIHZhciBjYWxlbmRhciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYWxlbmRhcicpO1xyXG4gICAgdmFyIGNvbnRyb2xzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhbGVuZGFyX19jb250cm9scycpO1xyXG4gICAgdmFyIHdyYXBFdmVudEZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud3JhcC1ldmVudCcpO1xyXG4gICAgdmFyIGV2ZW50Rm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdldmVudEZvcm0nKTtcclxuICAgIHZhciBlcnJvciA9IDA7XHJcbiAgICB2YXIgbW9udGggPSBjdXJyZW50TW9udGg7XHJcbiAgICB2YXIgeWVhciA9IGN1cnJlbnRZZWFyO1xyXG4gICAgdmFyIGRhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGF0ZV9fdGV4dCcpO1xyXG4gICAgdmFyIG1vbnRoTmFtZXMgPSBbXCLQr9C90LLQsNGA0YxcIiwgXCLQpNC10LLRgNCw0LvRjFwiLCBcItCc0LDRgNGCXCIsIFwi0JDQv9GA0LXQu9GMXCIsIFwi0JzQsNC5XCIsIFwi0JjRjtC90YxcIixcclxuICAgICAgICBcItCY0Y7Qu9GMXCIsIFwi0JDQstCz0YPRgdGCXCIsIFwi0KHQtdC90YLRj9Cx0YDRjFwiLCBcItCe0LrRgtGP0LHRgNGMXCIsIFwi0J3QvtGP0LHRgNGMXCIsIFwi0JTQtdC60LDQsdGA0YxcIl07XHJcbiAgICB2YXIgZXZlbnRzID0gW3tcclxuICAgICAgICBkYXRlIDogJzIwMTgtMDQtMDEnLFxyXG4gICAgICAgIHRpdGxlIDogXCLQktGB0YLRgNC10YfQsFwiLFxyXG4gICAgICAgIGRlc2MgOiBcItCd0LUg0LfQsNCx0YvRgtGMINCx0YPQvNCw0LPQuFwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgZGF0ZSA6IFwiMjAxOC0wNS0wNVwiLFxyXG4gICAgICAgIHRpdGxlIDogXCLQktGB0YLRgNC10YfQsFwiLFxyXG4gICAgICAgIGRlc2MgOiBcItCd0LUg0LfQsNCx0YvRgtGMINCx0YPQvNCw0LPQuFwiXHJcbiAgICAgICAgfV07XHJcbiAgICBmdW5jdGlvbiBjcmVhdGVFbGVtKGNsYXNzTmFtZSl7XHJcbiAgICAgICAgdmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgZWwuY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xyXG4gICAgICAgIHJldHVybiBlbDtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHNldEVtcHR5KGVsKSB7XHJcbiAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCgnZW1wdHknKTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHNldERheShkYXRlLGRheSkge1xyXG5cclxuICAgICAgICB2YXIgZGF0ZURpdiA9IGNyZWF0ZUVsZW0oXCJkYXRlXCIpO1xyXG4gICAgICAgIGRhdGVEaXYuaW5uZXJIVE1MID0gZGF0ZS5nZXREYXRlKCkudG9TdHJpbmcoKTtcclxuICAgICAgICBkYXkuYXBwZW5kQ2hpbGQoZGF0ZURpdik7XHJcbiAgICAgICAgZXZlbnRzLmZvckVhY2goZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgICAgICAgICB2YXIgZXZlbnREYXRlID0gbmV3IERhdGUoZXZlbnQuZGF0ZSk7XHJcbiAgICAgICAgICAgIGlmKGV2ZW50RGF0ZS5nZXREYXRlKCkgPT0gZGF0ZS5nZXREYXRlKCkgJiZcclxuICAgICAgICAgICAgICAgIGV2ZW50RGF0ZS5nZXRNb250aCgpID09IGRhdGUuZ2V0TW9udGgoKVxyXG4gICAgICAgICAgICAgICAgJiYgZXZlbnREYXRlLmdldEZ1bGxZZWFyKCkgPT0gZGF0ZS5nZXRGdWxsWWVhcigpKXtcclxuICAgICAgICAgICAgICAgIHNldEV2ZW50KGRheSxldmVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHNldEV2ZW50KGRheSxldmVudCl7XHJcbiAgICAgICAgdmFyIGV2ZW50RGl2ID0gY3JlYXRlRWxlbShcImV2ZW50XCIpO1xyXG4gICAgICAgIHZhciB0aXRsZUV2ZW50ID0gY3JlYXRlRWxlbShcImV2ZW50X190aXRsZVwiKTtcclxuICAgICAgICB2YXIgZGVzY0V2ZW50ID0gY3JlYXRlRWxlbShcImV2ZW50X19kZXNjXCIpO1xyXG4gICAgICAgIHRpdGxlRXZlbnQuaW5uZXJIVE1MID0gZXZlbnQudGl0bGU7XHJcbiAgICAgICAgZGVzY0V2ZW50LmlubmVySFRNTCA9IGV2ZW50LmRlc2M7XHJcbiAgICAgICAgZXZlbnREaXYuYXBwZW5kQ2hpbGQodGl0bGVFdmVudCk7XHJcbiAgICAgICAgZXZlbnREaXYuYXBwZW5kQ2hpbGQoZGVzY0V2ZW50KTtcclxuICAgICAgICBkYXkuYXBwZW5kQ2hpbGQoZXZlbnREaXYpO1xyXG4gICAgICAgIGRheS5jbGFzc0xpc3QuYWRkKCdibHVlLWJnJyk7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBzZXRDdXJyZW50RGF5KGRhdGUsZWwpIHtcclxuICAgICAgICB2YXIgbm93ID0gbmV3IERhdGUoKTtcclxuICAgICAgICBpZihkYXRlLmdldERhdGUoKSA9PSBub3cuZ2V0RGF0ZSgpICYmXHJcbiAgICAgICAgICAgIGRhdGUuZ2V0TW9udGgoKT09IG5vdy5nZXRNb250aCgpICYmXHJcbiAgICAgICAgICAgIGRhdGUuZ2V0RnVsbFllYXIoKSA9PSBub3cuZ2V0RnVsbFllYXIoKSl7XHJcbiAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ3RvZGF5Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gZ2V0TnVtRGF5KGRhdGUpeyAvLyAwIC0gbW9uZGF5IDYtc3VuZGF5XHJcbiAgICAgICAgdmFyIG51bURheSA9IGRhdGUuZ2V0RGF5KCk7XHJcbiAgICAgICAgaWYobnVtRGF5ID09IDApe1xyXG4gICAgICAgICAgICBudW1EYXkgPSA3O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVtRGF5IC0gMTtcclxuXHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBjcmVhdGVUYWJsZSh5ZWFyLG1vbnRoKXtcclxuICAgICAgICB2YXIgZCA9IG5ldyBEYXRlICh5ZWFyLG1vbnRoLDEpO1xyXG4gICAgICAgIHZhciBtb24gPSBkLmdldE1vbnRoKCk7XHJcbiAgICAgICAgdmFyIGxhc3REYXkgPSBuZXcgRGF0ZSh5ZWFyLG1vbnRoKzEsMCk7XHJcbiAgICAgICAgdmFyIHdlZWtOdW0gPSAwO1xyXG5cclxuICAgICAgICB3aGlsZShkLmdldE1vbnRoKCkgPT0gbW9uKXtcclxuICAgICAgICAgICAgdmFyIHdlZWsgPSBjcmVhdGVFbGVtKCdjYWxlbmRhcl9fd2VlaycpO1xyXG4gICAgICAgICAgICB2YXIgaSA9IDA7XHJcbiAgICAgICAgICAgIHdoaWxlKCBpIDwgNyl7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF5ID0gY3JlYXRlRWxlbSgnY2FsZW5kYXJfX2RheScpO1xyXG4gICAgICAgICAgICAgICAgc2V0Q3VycmVudERheShkLGRheSk7XHJcbiAgICAgICAgICAgICAgICBpZih3ZWVrTnVtID09MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoaSA8IGdldE51bURheShkKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldEVtcHR5KGRheSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldERheShkLGRheSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGQuc2V0RGF0ZShkLmdldERhdGUoKSsxKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBpZihkLmdldERhdGUoKSA8PSBsYXN0RGF5LmdldERhdGUoKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkLmdldE1vbnRoKCk9PSBtb24pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXREYXkoZCxkYXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRFbXB0eShkYXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBkLnNldERhdGUoZC5nZXREYXRlKCkrMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB3ZWVrLmFwcGVuZENoaWxkKGRheSkgICA7XHJcbiAgICAgICAgICAgICAgICBpPWkrMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYWxlbmRhci5hcHBlbmRDaGlsZCh3ZWVrKTtcclxuICAgICAgICAgICAgd2Vla051bSsrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBjbG9zZUV2ZW50Rm9ybSgpIHtcclxuICAgICAgICBldmVudEZvcm0ucmVzZXQoKTtcclxuICAgICAgICB3cmFwRXZlbnRGb3JtLnN0eWxlLm9wYWNpdHkgPSAwO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB3cmFwRXZlbnRGb3JtLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcclxuICAgICAgICB9LDUwMCk7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBzaG93RXZlbnRGb3JtKCkge1xyXG4gICAgICAgIHdyYXBFdmVudEZvcm0uY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xyXG4gICAgICAgIHdyYXBFdmVudEZvcm0uc3R5bGUub3BhY2l0eSA9IDE7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBjaGVja0VtcHR5RmllbGQoaW5wdXQpIHtcclxuICAgICAgICBpZihpbnB1dC52YWx1ZSA9PScnKXtcclxuICAgICAgICAgICAgaW5wdXQuY2xhc3NMaXN0LmFkZCgnZXJyb3InKTtcclxuICAgICAgICAgICAgZXJyb3IgPSAxO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBpbnB1dC5jbGFzc0xpc3QucmVtb3ZlKCdlcnJvcicpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybntcclxuICAgICAgICBpbml0IDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgZGF0ZS5pbm5lckhUTUwgPSBtb250aE5hbWVzW21vbnRoXSArXCIgXCIreWVhcjtcclxuICAgICAgICAgICAgdmFyIGFkZEV2ZW50QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZCcpO1xyXG4gICAgICAgICAgICB2YXIgZXZlbnRGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2V2ZW50Rm9ybScpO1xyXG4gICAgICAgICAgICBjcmVhdGVUYWJsZSh5ZWFyLG1vbnRoLGV2ZW50cyk7XHJcbiAgICAgICAgICAgIGNvbnRyb2xzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgaWYoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdidG5fdG9kYXknKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgIGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYnRuX3RvZGF5XCIpKXtcclxuICAgICAgICAgICAgICAgICAgICBkYXRlLmlubmVySFRNTCA9IG1vbnRoTmFtZXNbY3VycmVudE1vbnRoXSArXCIgXCIrY3VycmVudFllYXI7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FsZW5kYXIuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVUYWJsZShjdXJyZW50WWVhcixjdXJyZW50TW9udGgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdidG5fbmV4dCcpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgZS50YXJnZXQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJidG5fbmV4dFwiKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYobW9udGggIT0gMTEgKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgKyttb250aDtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsreWVhcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9udGggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhtb250aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0ZS5pbm5lckhUTUwgPSBtb250aE5hbWVzW21vbnRoXSArXCIgXCIreWVhcjtcclxuICAgICAgICAgICAgICAgICAgICBjYWxlbmRhci5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZVRhYmxlKHllYXIsbW9udGgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdidG5fcHJldicpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgZS50YXJnZXQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJidG5fcHJldlwiKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYobW9udGggIT0gMCApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAtLW1vbnRoO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLS15ZWFyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb250aCA9IDExO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhtb250aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0ZS5pbm5lckhUTUwgPSBtb250aE5hbWVzW21vbnRoXSArXCIgXCIreWVhcjtcclxuICAgICAgICAgICAgICAgICAgICBjYWxlbmRhci5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZVRhYmxlKHllYXIsbW9udGgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgYWRkRXZlbnRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgc2hvd0V2ZW50Rm9ybSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgZXZlbnRGb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxmdW5jdGlvbiAoZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2lkJyk9PSdjbG9zZScpe1xyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICBjbG9zZUV2ZW50Rm9ybSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmKGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnaWQnKT09J3NhdmUnKXtcclxuICAgICAgICAgICAgICAgICAgICBlcnJvciA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBmaWVsZCA9IGV2ZW50Rm9ybS5lbGVtZW50cztcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZXZlbnQgPXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZSA6IGZpZWxkLmRhdGUudmFsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlIDogZmllbGQudGl0bGUudmFsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2MgOiBmaWVsZC5kZXNjLnZhbHVlXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgZmllbGQubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmllbGRbaV0ucmVxdWlyZWQgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja0VtcHR5RmllbGQoZmllbGRbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGVycm9yID09IDApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudHMucHVzaChldmVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlRXZlbnRGb3JtKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdXBkYXRlIDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgY2FsZW5kYXIuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgICAgICAgY3JlYXRlVGFibGUoeWVhcixtb250aCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KCkpO1xyXG4iLCJcclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKXtcclxuICAgIHZhciB1cGRhdGVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXBkYXRlJyk7XHJcbiAgICB1cGRhdGVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGNhbGVuZGFyLnVwZGF0ZSgpO1xyXG4gICAgfSk7XHJcbiAgICAkKCcjZGF0ZScpLmRhdGVwaWNrZXIoXHJcbiAgICAgICAge2RhdGVGb3JtYXQ6ICd5eS1tbS1kZCd9XHJcbiAgICApO1xyXG4gICAgY2FsZW5kYXIuaW5pdCgpO1xyXG59KTsiXX0=
