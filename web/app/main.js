angular
    .module("ohm-delivery", [])
    .controller("tracking", function($scope, $http) {
        $scope.sendData = function() {
            $http.get(`/ohms/order/${this.trackingId}`)
            .then((result) => {
                console.log('Success', result);
                this.errorMessage = '';
                this.orderDetails = result
            }, (error) => {
                console.log('Errored', error);
                this.errorMessage = 'Oops, this website is under construction, please come back later.';
                this.orderDetails = ''
            });
        };
    });