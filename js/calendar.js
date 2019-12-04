/**
 * calendar.js
 * Configures the calendar on the home page.
 *
 * Requires:
 *   - jQuery
 *   - fullcalendar/fullcalendar.js
 *   - fullcalendar/gcal.js
 *
 * Usage:
 *   Add the following HTML where the calendar should be displayed:
 *       <div id="calendar"></div>
 *   Include all JS dependencies and this script.
 *   Finally, trigger the calendar script by running
 *       calendar.renderCalendar('yourCalendarId@group.calendar.google.com');
 *
 * See README for other maintenance instructions.
 */

var calendar = (function() {
    function renderCalendar(calendarID, defaultView) {
        defaultView = defaultView || 'agendaWeek';

        $('#calendar').fullCalendar({
            googleCalendarApiKey: 'AIzaSyAiEWXOLNCeznI7k6r0-taknkWGh0rcRwU',
            events: {
            googleCalendarId: calendarID
            },

            defaultView: defaultView,
            allDaySlot: true,
            nowIndicator: true,
            scrollTime: "09:30:00",

            header: {
            left: 'month,agendaWeek,agendaDay',
            center: 'title',
            right: 'prev,next'
            },

            eventRender: recolorOfficeHoursEvent,
        });

        // fixes no text in table header error
        $('.fc-axis.fc-widget-header').append( "<p>Date</p>");

    }


    function recolorOfficeHoursEvent(event, element) {
        // changed to darker colors for higher contrast
        var color_tomato = 'rgb(89, 11, 53)';
        var color_basil = 'rgb(24, 74, 72)';
        var color_blueberry = 'rgb(34, 54, 143)';

        // changed from OH to Office Hours
        if (event.title.startsWith('Office Hours: ')) {
          element.css('background-color', color_tomato);
          element.css('border-color', color_tomato);
        }
        else if (event.title.startsWith('Lecture')) {
          element.css('background-color', color_basil);
          element.css('border-color', color_basil);
        }
        else if (event.title.startsWith('Lab: ')) {
          element.css('background-color', color_blueberry);
          element.css('border-color', color_blueberry);
        }
        $(element).removeAttr('href');
        $(element).popup({
          on: 'click',
          title: event.title,
          content: event.location,
        });
    }

    // function isSmallScreen() {
    //     return screen.width < 900;
    // }

    return {
        renderCalendar: renderCalendar,
    }
})();
