eggApp.controller('videosCtrl', function($scope, eggModel){

//Array for storing videos that are to be displayed
$scope.displayVideos = [];

    //Fetches videos of the right category from database and puts them in $scope.displayVideos array
    $scope.getVideo = function(videoCat){
    $scope.displayVideos = [];
       eggModel.allVideos.once("value", function(snapshot){
            snapshot.forEach(function(childSnapshot){
                if(childSnapshot.child("category").val() == videoCat){
                    $scope.displayVideos.push(childSnapshot.val())
                }
            })
            $scope.$apply();
        })

    }




});
