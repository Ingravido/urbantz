angular
    .module("ohm-delivery", [])
    .controller("tracking", function($scope, $http) {
        $scope.sendData = function() {
            $http.get(`/ohms/order/${this.trackingId}`)
            .then((result) => {
                this.errorMessage = '';
                if (Object.keys(result.data).length) {
                    this.orderDetails = result
                }
            }, (error) => {
                this.errorMessage = 'Oops, this website is under construction, please come back later.';
            });
        };
    });