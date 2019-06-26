angular.module('userControllers',[])
.controller('regCtrl', function($scope,$http,$location,$timeout) {

    $scope.regUser = function(userData){
        $http.post('/api/users',userData).then(function(data){
            if(data.data.success)
            {
                console.log(data.data.success);
                console.log(data.data.msg);
                $timeout(function(){
                    $location.path('/');
                },1000);
            }
            else
            {
                console.log(data.data.success);
                console.log(data.data.msg);
            }
        })
    }
});