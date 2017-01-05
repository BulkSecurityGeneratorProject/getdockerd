(function() {
    'use strict';

    angular
        .module('getdockerdApp')
        .controller('BlogController', BlogController);

    BlogController.$inject = ['$scope', '$state', 'Blog', 'BlogSearch'];

    function BlogController ($scope, $state, Blog, BlogSearch) {
        var vm = this;

        vm.blogs = [];
        vm.clear = clear;
        vm.search = search;
        vm.loadAll = loadAll;

        loadAll();

        function loadAll() {
            Blog.query(function(result) {
                vm.blogs = result;
                vm.searchQuery = null;
            });
        }

        function search() {
            if (!vm.searchQuery) {
                return vm.loadAll();
            }
            BlogSearch.query({query: vm.searchQuery}, function(result) {
                vm.blogs = result;
                vm.currentSearch = vm.searchQuery;
            });
        }

        function clear() {
            vm.searchQuery = null;
            loadAll();
        }    }
})();
