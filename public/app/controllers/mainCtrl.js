angular.module('mainController',[])
.controller('mainCtrl',function($scope,Auth,$location,$timeout,$rootScope){

        $scope.userdetails = {};

        // every time when route changes it will execute this function
        $rootScope.$on('$routeChangeStart', function(){
            if(Auth.isLoggedIn()){
                console.log('Success: user is logged in !');
                Auth.getUserFromToken().then(function(data){
                    $scope.userdetails.username = data.data.username;
                    $scope.userdetails.email = data.data.email;
                    console.log($scope.userdetails);
                });
            }
            else {
                // clear username
                $scope.userdetails = {};
                console.log('Failure: user is not logged in !');
            }
        });

        $scope.loginUser = function(data){
            $scope.successMsg = false;
            $scope.errorMsg = false;
            Auth.login(data).then(function(data){
                if(data.data.success)
                {
                    $scope.successMsg = data.data.msg;
                    $timeout(function(){
                        $location.path('/profile');
                    },1000);
                }
                else
                {
                    $scope.errorMsg = data.data.msg;
                }
            })
        };

        $scope.logout = function(){
            Auth.logout();
            $location.path('/logout');
            $timeout(function(){
                $location.path('/login');
            },1000);

        };
});