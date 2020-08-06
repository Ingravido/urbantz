const trackingApp = angular
    .module("ohm-delivery", []);

trackingApp
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
    })

trackingApp
    .controller("orderFinalStatus", function($scope, $http) {
        $scope.status="DELIVERED"
        $scope.sendData = function() {
            const data = {
                status: this.status,
                comment: this.comment
            };
            $http.post(`/ohms/conclude-order/${this.trackingId}`, data).then((result) => {
                this.errorMessage = '';
                this.confirmMessage = 'Order updated.'
            }, (error) => {
                this.errorMessage = 'Oops, an error occurred.';
                this.confirmMessage = ''
            });
        };
    });
