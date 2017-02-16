(function () {
    'use strict';

    angular
        .module('SmsSync.core')
        .filter('phoneNumberFilter', phoneNumber);

        function phoneNumber() {
            return function(string) {
                if (!angular.isString(string)) {
                    return string;
                }
                if (string.length > 10 && string[0] === '1') {
                    string = string.substring(1, string.length);
                }
                return string.replace(/[^\d]/g, '');
            };
        }
})();