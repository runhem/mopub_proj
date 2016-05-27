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

// Making sure user is logged in, otherwise redirect to login
$scope.checkLoggedIn = function(){
    if(eggModel.loggedIn){
    }else{
    window.location.href = 'http://xml.csc.kth.se/~friekl/mopub_proj/app/index.html';
    }
};



});
