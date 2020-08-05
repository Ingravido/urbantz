angular
    .module("ohm-delivery", [])
    .controller("tracking", function($scope, $http) {
        $scope.sendData = function() {
            if (this.trackingId && this.trackingId.length) {
                $http.get(`/ohms/order/${this.trackingId}`)
                .then((result) => {
                    if (Object.keys(result.data).length) {
                        this.orderDetails = result;
                        this.errorMessage = '';
                    } else {
                        this.errorMessage = 'Matching tracking id order not found.';
                        this.orderDetails = ''
                    }
                }, (error) => {
                    this.errorMessage = 'Oops, this website is under construction, please come back later.';
                    this.orderDetails = ''
                });
            }
        };
    });