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
