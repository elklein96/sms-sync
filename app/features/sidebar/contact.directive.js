(function () {
    'use strict';

    angular
        .module('SmsSync')
        .directive('contact', contact);

        function contact() {
            return {
                restrict: 'E',
                scope: {
                    info: '=info',
                    selected: '=',
                    unread: '='
                },
                templateUrl: 'app/features/sidebar/contact.html',
                link: function(scope, element, attrs) {
                    element.bind('click', function() {
                        scope.$apply(function() {
                            scope.selected.name = scope.info.$id;
                        });
                    });
                }
            };
        }
})();