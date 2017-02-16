(function () {
    'use strict';

    angular
        .module('SmsSync.core')
        .filter('removeSpacesFilter', removeSpaces);

        function removeSpaces() {
            return function(string) {
                if (!angular.isString(string)) {
                    return string;
                }
                return string.replace(/[\s]/g, '');
            };
        }
})();