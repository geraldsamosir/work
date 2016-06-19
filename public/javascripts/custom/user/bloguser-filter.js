// filter custom yang digunakan untuk mendapat string tanggal dalam bentuk ISO 8601
// dari database. (Harus di-includekan ke bloguser-angular-module agar dapat berjalan)
angular.module('bloguserCustomFilters', [])
	.filter('customFilterDateOfISO8601', function () {
	    return function (item) {
	    	if(typeof item !== 'undefined')
			return (item.match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/)).toString();
	    }
});