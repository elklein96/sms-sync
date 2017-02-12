(function () {
    'use strict';

    angular
        .module('SmsSync.contact')
        .directive('contact', contact);

        contact.$inject = ['$timeout', '$filter'];

        /* @ngInject */
        function contact($timeout, $filter) {
            return {
                restrict: 'E',
                scope: {
                    info: '=info',
                    selected: '=',
                    unread: '='
                },
                templateUrl: 'app/chat/contact/contact.html',
                link: function(scope, element, attrs) {
                    element.bind('click', function() {
                        scope.$apply(function() {
                            scope.selected.name = scope.info.$id;
                        });
                    });

                    scope.$watch('selected.name', function() {
                        if (scope.selected.name !== undefined && scope.selected.name.length > 0) {
                            (element.find('a').attr('id') === $filter('removeSpacesFilter')(scope.selected.name)) ?
                                element.find('li').addClass('selected') : element.find('li').removeClass('selected');
                            if (element.find('li').hasClass('selected')) {
                                element.find('.unread').remove();
                                document.title = 'SMSSync';
                            }
                        }
                    });

                    scope.$watch('unread', function() {
                        for (var key in scope.unread) {
                            if (key[0] !== '$' && scope.selected.name !== key) {
                                if (element.find('a').attr('id') === $filter('removeSpacesFilter')(key)) {
                                    /* jshint loopfunc: true */
                                    $timeout(function() {
                                        document.title = 'SMSSync *';
                                        if (element.find('a').find('.unread').length < 1)
                                            element.find('a').append('<div class="unread"></div>');
                                    }, 500);
                                }
                            }
                        }
                    });
                }
            };
        }
})();