/*!
 * Evo Calendar - Simple and Modern-looking Event Calendar Plugin
 *
 * Licensed under the MIT License
 * 
 * Version: 1.1.3
 * Author: Edlyn Villegas
 * Docs: https://edlynvillegas.github.com/evo-calendar
 * Repo: https://github.com/edlynvillegas/evo-calendar
 * Issues: https://github.com/edlynvillegas/evo-calendar/issues
 * 
 */

;
(function(factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports !== 'undefined') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }

}(function($j) {
    'use strict';
    var EvoCalendar = window.EvoCalendar || {};

    EvoCalendar = (function() {
        var instanceUid = 0;

        function EvoCalendar(element, settings) {
            var _ = this;
            _.defaults = {
                theme: null,
                format: 'mm/dd/yyyy',
                titleFormat: 'MM yyyy',
                eventHeaderFormat: 'MM d, yyyy',
                firstDayOfWeek: 0,
                language: 'en',
                todayHighlight: false,
                sidebarDisplayDefault: true,
                sidebarToggler: true,
                eventDisplayDefault: true,
                eventListToggler: true,
                calendarEvents: null
            };
            _.options = $j.extend({}, _.defaults, settings);

            _.initials = {
                default_class: $j(element)[0].classList.value,
                validParts: /dd?|DD?|mm?|MM?|yy(?:yy)?/g,
                dates: {
                    en: {
                        days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                        daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                        daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
                        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                        monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                        noEventForToday: "No event for today.. so take a rest! :)",
                        noEventForThisDay: "No event for this day.. so take a rest! :)",
                        previousYearText: "Previous year",
                        nextYearText: "Next year",
                        closeSidebarText: "Close sidebar",
                        closeEventListText: "Close event list"
                    },
                    es: {
                        days: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
                        daysShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
                        daysMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
                        months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
                        monthsShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
                        noEventForToday: "No hay evento para hoy.. ¡así que descanse! :)",
                        noEventForThisDay: "Ningún evento para este día.. ¡así que descanse! :)",
                        previousYearText: "Año anterior",
                        nextYearText: "El próximo año",
                        closeSidebarText: "Cerrar la barra lateral",
                        closeEventListText: "Cerrar la lista de eventos"
                    },
                    de: {
                        days: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
                        daysShort: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
                        daysMin: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
                        months: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
                        monthsShort: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
                        noEventForToday: "Keine Veranstaltung für heute.. also ruhen Sie sich aus! :)",
                        noEventForThisDay: "Keine Veranstaltung für diesen Tag.. also ruhen Sie sich aus! :)",
                        previousYearText: "Vorheriges Jahr",
                        nextYearText: "Nächstes Jahr",
                        closeSidebarText: "Schließen Sie die Seitenleiste",
                        closeEventListText: "Schließen Sie die Ereignisliste"
                    },
                    pt: {
                        days: ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"],
                        daysShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
                        daysMin: ["Do", "2a", "3a", "4a", "5a", "6a", "Sa"],
                        months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
                        monthsShort: ["Jan", "Feb", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
                        noEventForToday: "Nenhum evento para hoje.. então descanse! :)",
                        noEventForThisDay: "Nenhum evento para este dia.. então descanse! :)",
                        previousYearText: "Ano anterior",
                        nextYearText: "Próximo ano",
                        closeSidebarText: "Feche a barra lateral",
                        closeEventListText: "Feche a lista de eventos"
                    },
                    fr: {
                        days: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
                        daysShort: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
                        daysMin: ["Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa"],
                        months: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
                        monthsShort: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sept", "Oct", "Nov", "Déc"],
                        noEventForToday: "Rien pour aujourd'hui... Belle journée :)",
                        noEventForThisDay: "Rien pour ce jour-ci... Profite de te réposer :)",
                        previousYearText: "Année précédente",
                        nextYearText: "L'année prochaine",
                        closeSidebarText: "Fermez la barre latérale",
                        closeEventListText: "Fermer la liste des événements"
                    },
                    nl: {
                        days: ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"],
                        daysShort: ["Zon", "Maan", "Din", "Woe", "Don", "Vrij", "Zat"],
                        daysMin: ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za"],
                        months: ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"],
                        monthsShort: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"],
                        noEventForToday: "Geen event voor vandaag.. dus rust even uit! :)",
                        noEventForThisDay: "Geen event voor deze dag.. dus rust even uit! :)",
                        previousYearText: "Vorig jaar",
                        nextYearText: "Volgend jaar",
                        closeSidebarText: "Sluit de zijbalk",
                        closeEventListText: "Sluit de event lijst"
                    },
                    id: {
                        days: ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"],
                        daysShort: ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"],
                        daysMin: ["Mi", "Sn", "Sl", "Ra", "Ka", "Ju", "Sa"],
                        months: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
                        monthsShort: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"],
                        noEventForToday: "Tidak ada Acara untuk Sekarang.. Jadi Beristirahatlah! :)",
                        noEventForThisDay: "Tidak ada Acara untuk Hari Ini.. Jadi Beristirahatlah! :)",
                        previousYearText: "Tahun Sebelumnya",
                        nextYearText: "Tahun Berikutnya",
                        closeSidebarText: "Tutup Sidebar",
                        closeEventListText: "Tutup Daftar Acara"
                    }
                }
            }
            _.initials.weekends = {
                sun: _.initials.dates[_.options.language].daysShort[0],
                sat: _.initials.dates[_.options.language].daysShort[6]
            }


            // Format Calendar Events into selected format
            if (_.options.calendarEvents != null) {
                for (var i = 0; i < _.options.calendarEvents.length; i++) {
                    // If event doesn't have an id, throw an error message
                    if (!_.options.calendarEvents[i].id) {
                        console.log("%c Event named: \"" + _.options.calendarEvents[i].name + "\" doesn't have a unique ID ", "color:white;font-weight:bold;background-color:#e21d1d;");
                    }
                    if (_.isValidDate(_.options.calendarEvents[i].date)) {
                        _.options.calendarEvents[i].date = _.formatDate(_.options.calendarEvents[i].date, _.options.format)
                    }
                }
            }

            // Global variables
            _.startingDay = null;
            _.monthLength = null;
            _.windowW = $j(window).width();

            // CURRENT
            _.$jcurrent = {
                month: (isNaN(this.month) || this.month == null) ? new Date().getMonth() : this.month,
                year: (isNaN(this.year) || this.year == null) ? new Date().getFullYear() : this.year,
                date: _.formatDate(_.initials.dates[_.defaults.language].months[new Date().getMonth()] + ' ' + new Date().getDate() + ' ' + new Date().getFullYear(), _.options.format)
            }

            // ACTIVE
            _.$jactive = {
                month: _.$jcurrent.month,
                year: _.$jcurrent.year,
                date: _.$jcurrent.date,
                event_date: _.$jcurrent.date,
                events: []
            }

            // LABELS
            _.$jlabel = {
                days: [],
                months: _.initials.dates[_.defaults.language].months,
                days_in_month: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
            }

            // HTML Markups (template)
            _.$jmarkups = {
                    calendarHTML: '',
                    mainHTML: '',
                    sidebarHTML: '',
                    eventHTML: ''
                }
                // HTML DOM elements
            _.$jelements = {
                calendarEl: $j(element),
                innerEl: null,
                sidebarEl: null,
                eventEl: null,

                sidebarToggler: null,
                eventListToggler: null,

                activeDayEl: null,
                activeMonthEl: null,
                activeYearEl: null
            }
            _.$jbreakpoints = {
                tablet: 768,
                mobile: 425
            }
            _.$jUI = {
                hasSidebar: true,
                hasEvent: true
            }

            _.formatDate = $j.proxy(_.formatDate, _);
            _.selectDate = $j.proxy(_.selectDate, _);
            _.selectMonth = $j.proxy(_.selectMonth, _);
            _.selectYear = $j.proxy(_.selectYear, _);
            _.selectEvent = $j.proxy(_.selectEvent, _);
            _.toggleSidebar = $j.proxy(_.toggleSidebar, _);
            _.toggleEventList = $j.proxy(_.toggleEventList, _);

            _.instanceUid = instanceUid++;

            _.init(true);
        }

        return EvoCalendar;

    }());

    // v1.0.0 - Initialize plugin
    EvoCalendar.prototype.init = function(init) {
        var _ = this;

        if (!$j(_.$jelements.calendarEl).hasClass('calendar-initialized')) {
            $j(_.$jelements.calendarEl).addClass('evo-calendar calendar-initialized');
            if (_.windowW <= _.$jbreakpoints.tablet) { // tablet/mobile
                _.toggleSidebar(false);
                _.toggleEventList(false);
            } else {
                if (!_.options.sidebarDisplayDefault) _.toggleSidebar(false);
                else _.toggleSidebar(true);

                if (!_.options.eventDisplayDefault) _.toggleEventList(false);
                else _.toggleEventList(true);
            }
            if (_.options.theme) _.setTheme(_.options.theme); // set calendar theme
            _.buildTheBones(); // start building the calendar components
        }
    };
    // v1.0.0 - Destroy plugin
    EvoCalendar.prototype.destroy = function() {
        var _ = this;
        // code here
        _.destroyEventListener();
        if (_.$jelements.calendarEl) {
            _.$jelements.calendarEl.removeClass('calendar-initialized');
            _.$jelements.calendarEl.removeClass('evo-calendar');
            _.$jelements.calendarEl.removeClass('sidebar-hide');
            _.$jelements.calendarEl.removeClass('event-hide');
        }
        _.$jelements.calendarEl.empty();
        _.$jelements.calendarEl.attr('class', _.initials.default_class);
        $j(_.$jelements.calendarEl).trigger("destroy", [_])
    }

    // v1.0.0 - Limit title (...)
    EvoCalendar.prototype.limitTitle = function(title, limit) {
        var newTitle = [];
        limit = limit === undefined ? 18 : limit;
        if ((title).split(' ').join('').length > limit) {
            var t = title.split(' ');
            for (var i = 0; i < t.length; i++) {
                if (t[i].length + newTitle.join('').length <= limit) {
                    newTitle.push(t[i])
                }
            }
            return newTitle.join(' ') + '...'
        }
        return title;
    }

    // v1.1.2 - Check and filter strings
    EvoCalendar.prototype.stringCheck = function(d) {
        return d.replace(/[^\w]/g, '\\$j&');
    }

    // v1.0.0 - Parse format (date)
    EvoCalendar.prototype.parseFormat = function(format) {
        var _ = this;
        if (typeof format.toValue === 'function' && typeof format.toDisplay === 'function')
            return format;
        // IE treats \0 as a string end in inputs (truncating the value),
        // so it's a bad format delimiter, anyway
        var separators = format.replace(_.initials.validParts, '\0').split('\0'),
            parts = format.match(_.initials.validParts);
        if (!separators || !separators.length || !parts || parts.length === 0) {
            console.log("%c Invalid date format ", "color:white;font-weight:bold;background-color:#e21d1d;");
        }
        return { separators: separators, parts: parts };
    };

    // v1.0.0 - Format date
    EvoCalendar.prototype.formatDate = function(date, format, language) {
        var _ = this;
        if (!date)
            return '';
        language = language ? language : _.defaults.language
        if (typeof format === 'string')
            format = _.parseFormat(format);
        if (format.toDisplay)
            return format.toDisplay(date, format, language);

        var ndate = new Date(date);
        // if (!_.isValidDate(ndate)) { // test
        //     ndate = new Date(date.replace(/-/g, '/'))
        // }

        var val = {
            d: ndate.getDate(),
            D: _.initials.dates[language].daysShort[ndate.getDay()],
            DD: _.initials.dates[language].days[ndate.getDay()],
            m: ndate.getMonth() + 1,
            M: _.initials.dates[language].monthsShort[ndate.getMonth()],
            MM: _.initials.dates[language].months[ndate.getMonth()],
            yy: ndate.getFullYear().toString().substring(2),
            yyyy: ndate.getFullYear()
        };

        val.dd = (val.d < 10 ? '0' : '') + val.d;
        val.mm = (val.m < 10 ? '0' : '') + val.m;
        date = [];
        var seps = $j.extend([], format.separators);
        for (var i = 0, cnt = format.parts.length; i <= cnt; i++) {
            if (seps.length)
                date.push(seps.shift());
            date.push(val[format.parts[i]]);
        }
        return date.join('');
    };

    // v1.0.0 - Get dates between two dates
    EvoCalendar.prototype.getBetweenDates = function(dates) {
        var _ = this,
            betweenDates = [];
        for (var x = 0; x < _.monthLength; x++) {
            var active_date = _.formatDate(_.$jlabel.months[_.$jactive.month] + ' ' + (x + 1) + ' ' + _.$jactive.year, _.options.format);
            if (_.isBetweenDates(active_date, dates)) {
                betweenDates.push(active_date);
            }
        }
        return betweenDates;
    };

    // v1.0.0 - Check if date is between the passed calendar date 
    EvoCalendar.prototype.isBetweenDates = function(active_date, dates) {
        var sd, ed;
        if (dates instanceof Array) {
            sd = new Date(dates[0]);
            ed = new Date(dates[1]);
        } else {
            sd = new Date(dates);
            ed = new Date(dates);
        }
        if (sd <= new Date(active_date) && ed >= new Date(active_date)) {
            return true;
        }
        return false;
    }

    // v1.0.0 - Check if event has the same event type in the same date
    EvoCalendar.prototype.hasSameDayEventType = function(date, type) {
        var _ = this,
            eventLength = 0;

        for (var i = 0; i < _.options.calendarEvents.length; i++) {
            if (_.options.calendarEvents[i].date instanceof Array) {
                var arr = _.getBetweenDates(_.options.calendarEvents[i].date);
                for (var x = 0; x < arr.length; x++) {
                    if (date === arr[x] && type === _.options.calendarEvents[i].type) {
                        eventLength++;
                    }
                }
            } else {
                if (date === _.options.calendarEvents[i].date && type === _.options.calendarEvents[i].type) {
                    eventLength++;
                }
            }
        }

        if (eventLength > 0) {
            return true;
        }
        return false;
    }

    // v1.0.0 - Set calendar theme
    EvoCalendar.prototype.setTheme = function(themeName) {
        var _ = this;
        var prevTheme = _.options.theme;
        _.options.theme = themeName.toLowerCase().split(' ').join('-');

        if (_.options.theme) $j(_.$jelements.calendarEl).removeClass(prevTheme);
        if (_.options.theme !== 'default') $j(_.$jelements.calendarEl).addClass(_.options.theme);
    }

    // v1.0.0 - Called in every resize
    EvoCalendar.prototype.resize = function() {
        var _ = this;
        _.windowW = $j(window).width();

        if (_.windowW <= _.$jbreakpoints.tablet) { // tablet
            _.toggleSidebar(false);
            _.toggleEventList(false);

            if (_.windowW <= _.$jbreakpoints.mobile) { // mobile
                $j(window)
                    .off('click.evocalendar.evo-' + _.instanceUid)
            } else {
                $j(window)
                    .on('click.evocalendar.evo-' + _.instanceUid, $j.proxy(_.toggleOutside, _));
            }
        } else {
            if (!_.options.sidebarDisplayDefault) _.toggleSidebar(false);
            else _.toggleSidebar(true);

            if (!_.options.eventDisplayDefault) _.toggleEventList(false);
            else _.toggleEventList(true);

            $j(window)
                .off('click.evocalendar.evo-' + _.instanceUid);
        }
    }

    // v1.0.0 - Initialize event listeners
    EvoCalendar.prototype.initEventListener = function() {
        var _ = this;

        // resize
        $j(window)
            .off('resize.evocalendar.evo-' + _.instanceUid)
            .on('resize.evocalendar.evo-' + _.instanceUid, $j.proxy(_.resize, _));

        // IF sidebarToggler: set event listener: toggleSidebar
        if (_.options.sidebarToggler) {
            _.$jelements.sidebarToggler
                .off('click.evocalendar')
                .on('click.evocalendar', _.toggleSidebar);
        }

        // IF eventListToggler: set event listener: toggleEventList
        if (_.options.eventListToggler) {
            _.$jelements.eventListToggler
                .off('click.evocalendar')
                .on('click.evocalendar', _.toggleEventList);
        }

        // set event listener for each month
        _.$jelements.sidebarEl.find('[data-month-val]')
            .off('click.evocalendar')
            .on('click.evocalendar', _.selectMonth);

        // set event listener for year
        _.$jelements.sidebarEl.find('[data-year-val]')
            .off('click.evocalendar')
            .on('click.evocalendar', _.selectYear);

        // set event listener for every event listed
        _.$jelements.eventEl.find('[data-event-index]')
            .off('click.evocalendar')
            .on('click.evocalendar', _.selectEvent);
    };

    // v1.0.0 - Destroy event listeners
    EvoCalendar.prototype.destroyEventListener = function() {
        var _ = this;

        $j(window).off('resize.evocalendar.evo-' + _.instanceUid);
        $j(window).off('click.evocalendar.evo-' + _.instanceUid);

        // IF sidebarToggler: remove event listener: toggleSidebar
        if (_.options.sidebarToggler) {
            _.$jelements.sidebarToggler
                .off('click.evocalendar');
        }

        // IF eventListToggler: remove event listener: toggleEventList
        if (_.options.eventListToggler) {
            _.$jelements.eventListToggler
                .off('click.evocalendar');
        }

        // remove event listener for each day
        _.$jelements.innerEl.find('.calendar-day').children()
            .off('click.evocalendar')

        // remove event listener for each month
        _.$jelements.sidebarEl.find('[data-month-val]')
            .off('click.evocalendar');

        // remove event listener for year
        _.$jelements.sidebarEl.find('[data-year-val]')
            .off('click.evocalendar');

        // remove event listener for every event listed
        _.$jelements.eventEl.find('[data-event-index]')
            .off('click.evocalendar');
    };

    // v1.0.0 - Calculate days (incl. monthLength, startingDays based on :firstDayOfWeekName)
    EvoCalendar.prototype.calculateDays = function() {
        var _ = this,
            nameDays, weekStart, firstDay;
        _.monthLength = _.$jlabel.days_in_month[_.$jactive.month]; // find number of days in month
        if (_.$jactive.month == 1) { // compensate for leap year - february only!
            if ((_.$jactive.year % 4 == 0 && _.$jactive.year % 100 != 0) || _.$jactive.year % 400 == 0) {
                _.monthLength = 29;
            }
        }
        nameDays = _.initials.dates[_.options.language].daysShort;
        weekStart = _.options.firstDayOfWeek;

        while (_.$jlabel.days.length < nameDays.length) {
            if (weekStart == nameDays.length) {
                weekStart = 0;
            }
            _.$jlabel.days.push(nameDays[weekStart]);
            weekStart++;
        }
        firstDay = new Date(_.$jactive.year, _.$jactive.month).getDay() - weekStart;
        _.startingDay = firstDay < 0 ? (_.$jlabel.days.length + firstDay) : firstDay;
    }

    // v1.0.0 - Build the bones! (incl. sidebar, inner, events), called once in every initialization
    EvoCalendar.prototype.buildTheBones = function() {
        var _ = this;
        _.calculateDays();

        if (!_.$jelements.calendarEl.html()) {
            var markup;

            // --- BUILDING MARKUP BEGINS --- //

            // sidebar
            markup = '<div class="calendar-sidebar">' +
                '<div class="calendar-year">' +
                '<button class="icon-button" role="button" data-year-val="prev" title="' + _.initials.dates[_.options.language].previousYearText + '">' +
                '<span class="chevron-arrow-left"></span>' +
                '</button>' +
                '&nbsp;<p></p>&nbsp;' +
                '<button class="icon-button" role="button" data-year-val="next" title="' + _.initials.dates[_.options.language].nextYearText + '">' +
                '<span class="chevron-arrow-right"></span>' +
                '</button>' +
                '</div><div class="month-list">' +
                '<ul class="calendar-months">';
            for (var i = 0; i < _.$jlabel.months.length; i++) {
                markup += '<li class="month" role="button" data-month-val="' + i + '">' + _.initials.dates[_.options.language].months[i] + '</li>';
            }
            markup += '</ul>';
            markup += '</div></div>';

            // inner
            markup += '<div class="calendar-inner">' +
                '<table class="calendar-table">' +
                '<tr><th colspan="7"></th></tr>' +
                '<tr class="calendar-header">';
            for (var i = 0; i < _.$jlabel.days.length; i++) {
                var headerClass = "calendar-header-day";
                if (_.$jlabel.days[i] === _.initials.weekends.sat || _.$jlabel.days[i] === _.initials.weekends.sun) {
                    headerClass += ' --weekend';
                }
                markup += '<td class="' + headerClass + '">' + _.$jlabel.days[i] + '</td>';
            }
            markup += '</tr></table>' +
                '</div>';

            // events
            markup += '<div class="calendar-events">' +
                '<div class="event-header"><p></p></div>' +
                '<div class="event-list"></div>' +
                '</div>';

            // --- Finally, build it now! --- //
            _.$jelements.calendarEl.html(markup);

            if (!_.$jelements.sidebarEl) _.$jelements.sidebarEl = $j(_.$jelements.calendarEl).find('.calendar-sidebar');
            if (!_.$jelements.innerEl) _.$jelements.innerEl = $j(_.$jelements.calendarEl).find('.calendar-inner');
            if (!_.$jelements.eventEl) _.$jelements.eventEl = $j(_.$jelements.calendarEl).find('.calendar-events');

            // if: _.options.sidebarToggler
            if (_.options.sidebarToggler) {
                $j(_.$jelements.sidebarEl).append('<span id="sidebarToggler" role="button" aria-pressed title="' + _.initials.dates[_.options.language].closeSidebarText + '"><button class="icon-button"><span class="bars"></span></button></span>');
                if (!_.$jelements.sidebarToggler) _.$jelements.sidebarToggler = $j(_.$jelements.sidebarEl).find('span#sidebarToggler');
            }
            if (_.options.eventListToggler) {
                $j(_.$jelements.calendarEl).append('<span id="eventListToggler" role="button" aria-pressed title="' + _.initials.dates[_.options.language].closeEventListText + '"><button class="icon-button"><span class="chevron-arrow-right"></span></button></span>');
                if (!_.$jelements.eventListToggler) _.$jelements.eventListToggler = $j(_.$jelements.calendarEl).find('span#eventListToggler');
            }
        }

        _.buildSidebarYear();
        _.buildSidebarMonths();
        _.buildCalendar();
        _.buildEventList();
        _.initEventListener(); // test

        _.resize();
    }

    // v1.0.0 - Build Event: Event list
    EvoCalendar.prototype.buildEventList = function() {
        var _ = this,
            markup, hasEventToday = false;

        _.$jactive.events = [];
        // Event date
        var title = _.formatDate(_.$jactive.date, _.options.eventHeaderFormat, _.options.language);
        _.$jelements.eventEl.find('.event-header > p').text(title);
        // Event list
        var eventListEl = _.$jelements.eventEl.find('.event-list');
        // Clear event list item(s)
        if (eventListEl.children().length > 0) eventListEl.empty();
        if (_.options.calendarEvents) {
            for (var i = 0; i < _.options.calendarEvents.length; i++) {
                if (_.isBetweenDates(_.$jactive.date, _.options.calendarEvents[i].date)) {
                    eventAdder(_.options.calendarEvents[i])
                } else if (_.options.calendarEvents[i].everyYear) {
                    var d = new Date(_.$jactive.date).getMonth() + 1 + ' ' + new Date(_.$jactive.date).getDate();
                    var dd = new Date(_.options.calendarEvents[i].date).getMonth() + 1 + ' ' + new Date(_.options.calendarEvents[i].date).getDate();
                    // var dates = [_.formatDate(_.options.calendarEvents[i].date[0], 'mm/dd'), _.formatDate(_.options.calendarEvents[i].date[1], 'mm/dd')];

                    if (d == dd) {
                        eventAdder(_.options.calendarEvents[i])
                    }
                }
            };
        }

        function eventAdder(event) {
            hasEventToday = true;
            _.addEventList(event)
        }
        // IF: no event for the selected date
        if (!hasEventToday) {
            markup = '<div class="event-empty">';
            if (_.$jactive.date === _.$jcurrent.date) {
                markup += '<p>' + _.initials.dates[_.options.language].noEventForToday + '</p>';
            } else {
                markup += '<p>' + _.initials.dates[_.options.language].noEventForThisDay + '</p>';
            }
            markup += '</div>';
        }
        eventListEl.append(markup)
    }

    // v1.0.0 - Add single event to event list
    EvoCalendar.prototype.addEventList = function(event_data) {
            var _ = this,
                markup;
            var eventListEl = _.$jelements.eventEl.find('.event-list');
            if (eventListEl.find('[data-event-index]').length === 0) eventListEl.empty();
            _.$jactive.events.push(event_data);
            markup = '<div class="event-container" role="button" data-event-index="' + (event_data.id) + '">';
            markup += '<div class="event-icon"><div class="event-bullet-' + event_data.type + '"';
            if (event_data.color) {
                markup += 'style="background-color:' + event_data.color + '"'
            }
            markup += '></div></div><div class="event-info"><p class="event-title">' + _.limitTitle(event_data.name);
            if (event_data.badge) markup += '<span>' + event_data.badge + '</span>';
            markup += '</p>'
            if (event_data.description) markup += '<p class="event-desc">' + event_data.description + '</p>';
            markup += '</div>';
            markup += '</div>';
            eventListEl.append(markup);

            _.$jelements.eventEl.find('[data-event-index="' + (event_data.id) + '"]')
                .off('click.evocalendar')
                .on('click.evocalendar', _.selectEvent);
        }
        // v1.0.0 - Remove single event to event list
    EvoCalendar.prototype.removeEventList = function(event_data) {
        var _ = this,
            markup;
        var eventListEl = _.$jelements.eventEl.find('.event-list');
        if (eventListEl.find('[data-event-index="' + event_data + '"]').length === 0) return; // event not in active events
        eventListEl.find('[data-event-index="' + event_data + '"]').remove();
        if (eventListEl.find('[data-event-index]').length === 0) {
            eventListEl.empty();
            if (_.$jactive.date === _.$jcurrent.date) {
                markup += '<p>' + _.initials.dates[_.options.language].noEventForToday + '</p>';
            } else {
                markup += '<p>' + _.initials.dates[_.options.language].noEventForThisDay + '</p>';
            }
            eventListEl.append(markup)
        }
    }

    // v1.0.0 - Build Sidebar: Year text
    EvoCalendar.prototype.buildSidebarYear = function() {
        var _ = this;

        _.$jelements.sidebarEl.find('.calendar-year > p').text(_.$jactive.year);
    }

    // v1.0.0 - Build Sidebar: Months list text
    EvoCalendar.prototype.buildSidebarMonths = function() {
        var _ = this;

        _.$jelements.sidebarEl.find('.calendar-months > [data-month-val]').removeClass('active-month');
        _.$jelements.sidebarEl.find('.calendar-months > [data-month-val="' + _.$jactive.month + '"]').addClass('active-month');
    }

    // v1.0.0 - Build Calendar: Title, Days
    EvoCalendar.prototype.buildCalendar = function() {
        var _ = this,
            markup, title;

        _.calculateDays();

        title = _.formatDate(new Date(_.$jlabel.months[_.$jactive.month] + ' 1 ' + _.$jactive.year), _.options.titleFormat, _.options.language);
        _.$jelements.innerEl.find('.calendar-table th').text(title);

        _.$jelements.innerEl.find('.calendar-body').remove(); // Clear days

        markup += '<tr class="calendar-body">';
        var day = 1;
        for (var i = 0; i < 9; i++) { // this loop is for is weeks (rows)
            for (var j = 0; j < _.$jlabel.days.length; j++) { // this loop is for weekdays (cells)
                if (day <= _.monthLength && (i > 0 || j >= _.startingDay)) {
                    var dayClass = "calendar-day";
                    if (_.$jlabel.days[j] === _.initials.weekends.sat || _.$jlabel.days[j] === _.initials.weekends.sun) {
                        dayClass += ' --weekend'; // add '--weekend' to sat sun
                    }
                    markup += '<td class="' + dayClass + '">';

                    var thisDay = _.formatDate(_.$jlabel.months[_.$jactive.month] + ' ' + day + ' ' + _.$jactive.year, _.options.format);
                    markup += '<div class="day" role="button" data-date-val="' + thisDay + '">' + day + '</div>';
                    day++;
                } else {
                    markup += '<td>';
                }
                markup += '</td>';
            }
            if (day > _.monthLength) {
                break; // stop making rows if we've run out of days
            } else {
                markup += '</tr><tr class="calendar-body">'; // add if not
            }
        }
        markup += '</tr>';
        _.$jelements.innerEl.find('.calendar-table').append(markup);

        if (_.options.todayHighlight) {
            _.$jelements.innerEl.find("[data-date-val='" + _.$jcurrent.date + "']").addClass('calendar-today');
        }

        // set event listener for each day
        _.$jelements.innerEl.find('.calendar-day').children()
            .off('click.evocalendar')
            .on('click.evocalendar', _.selectDate)

        var selectedDate = _.$jelements.innerEl.find("[data-date-val='" + _.$jactive.date + "']");

        if (selectedDate) {
            // Remove active class to all
            _.$jelements.innerEl.children().removeClass('calendar-active');
            // Add active class to selected date
            selectedDate.addClass('calendar-active');
        }
        if (_.options.calendarEvents != null) { // For event indicator (dots)
            _.buildEventIndicator();
        }
    };

    // v1.0.0 - Add event indicator/s (dots)
    EvoCalendar.prototype.addEventIndicator = function(event) {
        var _ = this,
            htmlToAppend, thisDate;
        var event_date = event.date;
        var type = _.stringCheck(event.type);

        if (event_date instanceof Array) {
            if (event.everyYear) {
                for (var x = 0; x < event_date.length; x++) {
                    event_date[x] = _.formatDate(new Date(event_date[x]).setFullYear(_.$jactive.year), _.options.format);
                }
            }
            var active_date = _.getBetweenDates(event_date);

            for (var i = 0; i < active_date.length; i++) {
                appendDot(active_date[i]);
            }
        } else {
            if (event.everyYear) {
                event_date = _.formatDate(new Date(event_date).setFullYear(_.$jactive.year), _.options.format);
            }
            appendDot(event_date);
        }

        function appendDot(date) {
            thisDate = _.$jelements.innerEl.find('[data-date-val="' + date + '"]');

            if (thisDate.find('span.event-indicator').length === 0) {
                thisDate.append('<span class="event-indicator"></span>');
            }

            if (thisDate.find('span.event-indicator > .type-bullet > .type-' + type).length === 0) {
                htmlToAppend = '<div class="type-bullet"><div ';

                htmlToAppend += 'class="type-' + event.type + '"'
                if (event.color) { htmlToAppend += 'style="background-color:' + event.color + '"' }
                htmlToAppend += '></div></div>';
                thisDate.find('.event-indicator').append(htmlToAppend);
            }
        }
    };

    // v1.0.0 - Remove event indicator/s (dots)
    EvoCalendar.prototype.removeEventIndicator = function(event) {
        var _ = this;
        var event_date = event.date;
        var type = _.stringCheck(event.type);

        if (event_date instanceof Array) {
            var active_date = _.getBetweenDates(event_date);

            for (var i = 0; i < active_date.length; i++) {
                removeDot(active_date[i]);
            }
        } else {
            removeDot(event_date);
        }

        function removeDot(date) {
            // Check if no '.event-indicator', 'cause nothing to remove
            if (_.$jelements.innerEl.find('[data-date-val="' + date + '"] span.event-indicator').length === 0) {
                return;
            }

            // // If has no type of event, then delete 
            if (!_.hasSameDayEventType(date, type)) {
                _.$jelements.innerEl.find('[data-date-val="' + date + '"] span.event-indicator > .type-bullet > .type-' + type).parent().remove();
            }
        }
    };

    /****************
     *    METHODS    *
     ****************/

    // v1.0.0 - Build event indicator on each date
    EvoCalendar.prototype.buildEventIndicator = function() {
        var _ = this;

        // prevent duplication
        _.$jelements.innerEl.find('.calendar-day > day > .event-indicator').empty();

        for (var i = 0; i < _.options.calendarEvents.length; i++) {
            _.addEventIndicator(_.options.calendarEvents[i]);
        }
    };

    // v1.0.0 - Select event
    EvoCalendar.prototype.selectEvent = function(event) {
        var _ = this;
        var el = $j(event.target).closest('.event-container');
        var id = $j(el).data('eventIndex').toString();
        var index = _.options.calendarEvents.map(function(event) { return (event.id).toString() }).indexOf(id);
        var modified_event = _.options.calendarEvents[index];
        if (modified_event.date instanceof Array) {
            modified_event.dates_range = _.getBetweenDates(modified_event.date);
        }
        $j(_.$jelements.calendarEl).trigger("selectEvent", [_.options.calendarEvents[index]])
    }

    // v1.0.0 - Select year
    EvoCalendar.prototype.selectYear = function(event) {
        var _ = this;
        var el, yearVal;

        if (typeof event === 'string' || typeof event === 'number') {
            if ((parseInt(event)).toString().length === 4) {
                yearVal = parseInt(event);
            }
        } else {
            el = $j(event.target).closest('[data-year-val]');
            yearVal = $j(el).data('yearVal');
        }

        if (yearVal == "prev") {
            --_.$jactive.year;
        } else if (yearVal == "next") {
            ++_.$jactive.year;
        } else if (typeof yearVal === 'number') {
            _.$jactive.year = yearVal;
        }

        if (_.windowW <= _.$jbreakpoints.mobile) {
            if (_.$jUI.hasSidebar) _.toggleSidebar(false);
        }

        $j(_.$jelements.calendarEl).trigger("selectYear", [_.$jactive.year])

        _.buildSidebarYear();
        _.buildCalendar();
    };

    // v1.0.0 - Select month
    EvoCalendar.prototype.selectMonth = function(event) {
        var _ = this;

        if (typeof event === 'string' || typeof event === 'number') {
            if (event >= 0 && event <= _.$jlabel.months.length) {
                // if: 0-11
                _.$jactive.month = (event).toString();
            }
        } else {
            // if month is manually selected
            _.$jactive.month = $j(event.currentTarget).data('monthVal');
        }

        _.buildSidebarMonths();
        _.buildCalendar();

        if (_.windowW <= _.$jbreakpoints.tablet) {
            if (_.$jUI.hasSidebar) _.toggleSidebar(false);
        }

        // EVENT FIRED: selectMonth
        $j(_.$jelements.calendarEl).trigger("selectMonth", [_.initials.dates[_.options.language].months[_.$jactive.month], _.$jactive.month])
    };

    // v1.0.0 - Select specific date
    EvoCalendar.prototype.selectDate = function(event) {
        var _ = this;
        var oldDate = _.$jactive.date;
        var date, year, month, activeDayEl, isSameDate;

        if (typeof event === 'string' || typeof event === 'number' || event instanceof Date) {
            date = _.formatDate(new Date(event), _.options.format)
            year = new Date(date).getFullYear();
            month = new Date(date).getMonth();

            if (_.$jactive.year !== year) _.selectYear(year);
            if (_.$jactive.month !== month) _.selectMonth(month);
            activeDayEl = _.$jelements.innerEl.find("[data-date-val='" + date + "']");
        } else {
            activeDayEl = $j(event.currentTarget);
            date = activeDayEl.data('dateVal')
        }
        isSameDate = _.$jactive.date === date;
        // Set new active date
        _.$jactive.date = date;
        _.$jactive.event_date = date;
        // Remove active class to all
        _.$jelements.innerEl.find('[data-date-val]').removeClass('calendar-active');
        // Add active class to selected date
        activeDayEl.addClass('calendar-active');
        // Build event list if not the same date events built
        if (!isSameDate) _.buildEventList();

        // EVENT FIRED: selectDate
        $j(_.$jelements.calendarEl).trigger("selectDate", [_.$jactive.date, oldDate])
    };

    // v1.0.0 - Return active date
    EvoCalendar.prototype.getActiveDate = function() {
        var _ = this;
        return _.$jactive.date;
    }

    // v1.0.0 - Return active events
    EvoCalendar.prototype.getActiveEvents = function() {
        var _ = this;
        return _.$jactive.events;
    }

    // v1.0.0 - Hide Sidebar/Event List if clicked outside
    EvoCalendar.prototype.toggleOutside = function(event) {
        var _ = this,
            isInnerClicked;

        isInnerClicked = event.target === _.$jelements.innerEl[0];

        if (_.$jUI.hasSidebar && isInnerClicked) _.toggleSidebar(false);
        if (_.$jUI.hasEvent && isInnerClicked) _.toggleEventList(false);
    }

    // v1.0.0 - Toggle Sidebar
    EvoCalendar.prototype.toggleSidebar = function(event) {
        var _ = this;

        if (event === undefined || event.originalEvent) {
            $j(_.$jelements.calendarEl).toggleClass('sidebar-hide');
            _.$jUI.hasSidebar = !_.$jUI.hasSidebar;
        } else {
            if (event) {
                $j(_.$jelements.calendarEl).removeClass('sidebar-hide');
                _.$jUI.hasSidebar = true;
            } else {
                $j(_.$jelements.calendarEl).addClass('sidebar-hide');
                _.$jUI.hasSidebar = false;
            }
        }

        if (_.windowW <= _.$jbreakpoints.tablet) {
            if (_.$jUI.hasSidebar && _.$jUI.hasEvent) _.toggleEventList();
        }
    };

    // v1.0.0 - Toggle Event list
    EvoCalendar.prototype.toggleEventList = function(event) {
        var _ = this;

        if (event === undefined || event.originalEvent) {
            $j(_.$jelements.calendarEl).toggleClass('event-hide');
            _.$jUI.hasEvent = !_.$jUI.hasEvent;
        } else {
            if (event) {
                $j(_.$jelements.calendarEl).removeClass('event-hide');
                _.$jUI.hasEvent = true;
            } else {
                $j(_.$jelements.calendarEl).addClass('event-hide');
                _.$jUI.hasEvent = false;
            }
        }

        if (_.windowW <= _.$jbreakpoints.tablet) {
            if (_.$jUI.hasEvent && _.$jUI.hasSidebar) _.toggleSidebar();
        }
    };

    // v1.0.0 - Add Calendar Event(s)
    EvoCalendar.prototype.addCalendarEvent = function(arr) {
        var _ = this;

        function addEvent(data) {
            if (!data.id) {
                console.log("%c Event named: \"" + data.name + "\" doesn't have a unique ID ", "color:white;font-weight:bold;background-color:#e21d1d;");
            }

            if (data.date instanceof Array) {
                for (var j = 0; j < data.date.length; j++) {
                    if (isDateValid(data.date[j])) {
                        data.date[j] = _.formatDate(new Date(data.date[j]), _.options.format);
                    }
                }
            } else {
                if (isDateValid(data.date)) {
                    data.date = _.formatDate(new Date(data.date), _.options.format);
                }
            }

            if (!_.options.calendarEvents) _.options.calendarEvents = [];
            _.options.calendarEvents.push(data);
            // add to date's indicator
            _.addEventIndicator(data);
            // add to event list IF active.event_date === data.date
            if (_.$jactive.event_date === data.date) _.addEventList(data);
            // _.$jelements.innerEl.find("[data-date-val='" + data.date + "']")

            function isDateValid(date) {
                if (_.isValidDate(date)) {
                    return true;
                } else {
                    console.log("%c Event named: \"" + data.name + "\" has invalid date ", "color:white;font-weight:bold;background-color:#e21d1d;");
                }
                return false;
            }
        }
        if (arr instanceof Array) { // Arrays of events
            for (var i = 0; i < arr.length; i++) {
                addEvent(arr[i])
            }
        } else if (typeof arr === 'object') { // Single event
            addEvent(arr)
        }
    };

    // v1.0.0 - Remove Calendar Event(s)
    EvoCalendar.prototype.removeCalendarEvent = function(arr) {
        var _ = this;

        function deleteEvent(data) {
            // Array index
            var index = _.options.calendarEvents.map(function(event) { return event.id }).indexOf(data);

            if (index >= 0) {
                var event = _.options.calendarEvents[index];
                // Remove event from calendar events
                _.options.calendarEvents.splice(index, 1);
                // remove to event list
                _.removeEventList(data);
                // remove event indicator
                _.removeEventIndicator(event);
            } else {
                console.log("%c " + data + ": ID not found ", "color:white;font-weight:bold;background-color:#e21d1d;");
            }
        }
        if (arr instanceof Array) { // Arrays of index
            for (var i = 0; i < arr.length; i++) {
                deleteEvent(arr[i])
            }
        } else { // Single index
            deleteEvent(arr)
        }
    };

    // v1.0.0 - Check if date is valid
    EvoCalendar.prototype.isValidDate = function(d) {
        return new Date(d) && !isNaN(new Date(d).getTime());
    }

    $j.fn.evoCalendar = function() {
        var _ = this,
            opt = arguments[0],
            args = Array.prototype.slice.call(arguments, 1),
            l = _.length,
            i,
            ret;
        for (i = 0; i < l; i++) {
            if (typeof opt == 'object' || typeof opt == 'undefined')
                _[i].evoCalendar = new EvoCalendar(_[i], opt);
            else
                ret = _[i].evoCalendar[opt].apply(_[i].evoCalendar, args);
            if (typeof ret != 'undefined') return ret;
        }
        return _;
    };

}));