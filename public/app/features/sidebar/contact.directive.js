(function () {
    'use strict';

    angular
        .module('SmsSync')
        .directive('contact', contact);

    contact.$inject = ['$rootScope'];

    /* @ngInject */
    function contact($rootScope) {
        return {
            restrict: 'E',
            scope: {
                info: '=info'
            },
            templateUrl: 'app/features/sidebar/contact.html',
            link: function(scope, element, attrs) {
            }
        };
    }
})();