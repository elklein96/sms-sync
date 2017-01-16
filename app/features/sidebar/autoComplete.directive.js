(function () {
    'use strict';

    angular
        .module('SmsSync')
        .directive('autoComplete', autoComplete);

        autoComplete.$inject = ['$timeout', '$filter'];

        /* @ngInject */
        function autoComplete($timeout, $filter) {
            return {
                restrict: 'E',
                scope: {
                    data: '=data',
                    selected: '='
                },
                templateUrl: 'app/features/sidebar/autoComplete.html',
                link: function(scope, element, attrs) {
                    var input = element.find('input');
                    scope.choices = [];
                    var counter = 0;

                    element.bind('click', function(e) {
                        if (angular.element(e.toElement)[0].localName === 'li') {
                            input.val(angular.element(e.toElement).find('p').text());
                            submit(input.val());
                        }
                        else if (angular.element(e.toElement)[0].localName === 'p') {
                            input.val(angular.element(e.toElement).text());
                            submit(input.val());
                        }
                        scope.$apply(function() {
                            scope.choices;
                        });
                    });

                    input.bind('keyup', function(e) {
                        if (e.which === 13) {
                            submit(input.val());
                        }
                        else if (e.which === 38) {
                            if (counter > 0){
                                input.val(scope.choices[--counter]);
                                element.find('.autocomplete-choice-hover').removeClass('autocomplete-choice-hover');
                                $(element.find('li')[counter]).addClass('autocomplete-choice-hover');
                            }
                        }
                        else if (e.which === 40) {
                            if (counter < scope.choices.length - 1){
                                input.val(scope.choices[++counter]);
                                element.find('.autocomplete-choice-hover').removeClass('autocomplete-choice-hover');
                                $(element.find('li')[counter]).addClass('autocomplete-choice-hover');
                            }
                        }
                        else {
                            counter = -1;
                            scope.choices.length = 0;
                            if (input.val().length > 0) {
                                for (var i = 0; i < scope.data.length; i++) {
                                    if (scope.data.$keyAt(i).includes(input.val()))
                                        scope.choices.push(scope.data.$keyAt(i));
                                }
                            }
                        }
                        scope.$apply(function() {
                            scope.choices;
                        });
                    });

                    function submit(name) {
                        scope.choices.length = 0;
                        input.val('');
                        input.blur();
                        scope.$apply(function() {
                            scope.selected.name = name;
                        });
                    }
                }
            };
        }
})();