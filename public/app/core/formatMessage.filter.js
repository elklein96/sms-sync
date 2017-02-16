(function () {
    'use strict';

    angular
        .module('SmsSync.core')
        .filter('formatMessageFilter', formatMessageFilter);

        function formatMessageFilter() {
            return function(string) {
                var regex = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/);
                if (regex.test(string)) {
                    var url = '<a href="' + string + '" target="_blank">' + string + '</a>';
                    return url;
                }
                return string;
            };
        }
})();