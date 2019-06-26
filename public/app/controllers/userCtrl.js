angular.module('userControllers',[])
.controller('regCtrl', function($scope,$http,$location,$timeout,User) {

    $scope.regUser = function(userData){
        User.create(userData).then(function(data){
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