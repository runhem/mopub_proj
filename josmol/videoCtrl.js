var app = angular.module('myApp', ['youtube-embed']); 
app.controller('videoCtrl', function($scope){


$scope.eggVids = new Firebase("https://eggapp.firebaseio.com/videobase");



//storage.bind($scope, "eggvids", {defaultValue: []});
// $scope.eggvids2 = [
// {"id": "mfRNLcaxTeo", "title": "Get creative with eggs!", "rating": [], "ratingSum": 0, "category": "recipe"},
// {"id": "wdasrVE5NOc", "title": "Learn to boil!", "rating": [], "ratingSum": 0, "category": "tutorial"},
// {"id": "HnLmz3MYtkg", "title": "Tricks with eggs", "rating": [], "ratingSum": 0, "category": "science"},
// {"id": "VT4aUa076H4", "title": "Magic eggs", "rating": [], "ratingSum": 0, "category": "science"},
// {"id": "TVrPv4Qhouw", "title": "Must try with eggs!", "rating": [], "ratingSum": 0, "category": "science"},
// {"id": "lLNcjCeBPA8", "title": "Recipes from Dubai", "rating": [], "ratingSum": 0, "category": "recipe"},
// {"id": "VHZgXuUmO9s", "title": "Marbled eggs for easter", "rating": [], "ratingSum": 0, "category": "decoration"},
// ];

$scope.displayVideos = [];

// This is a hard-coded list, normally you’d proably use
// local storage (store) and/or persistant cookies 

    $scope.addRating = function(rating, video){
        $scope.eggVids.once("value", function(snapshot){   
         snapshot.forEach(function(childSnapshot){
         if(childSnapshot.child('id').val() == video.id){            
            $scope.eggVids.child(childSnapshot.key()).child("rating").push(rating);          
            }
         });
        });

/*        for(j in video.rating){
            ratingCount = ratingCount + video.rating[j];
        } 
        ratingCount = ratingCount / (video.rating.length);
        video.ratingSum = Math.round(ratingCount);   */      
    }
    
    $scope.getRating = function(childSnapshot)

    {           var ratingCount = 0;

        childSnapshot.child("rating").forEach(function(rateSnapshot){
        ratingCount = ratingCount + rateSnapshot.val();
    })

                      console.log("cild",childSnapshot.child("rating").numChildren())
              ratingCount = ratingCount / childSnapshot.child("rating").numChildren();
              console.log(ratingCount)

    }


    $scope.getVideo = function(videoCat){
        $scope.displayVideos = [];
        $scope.eggVids.once("value", function(snapshot){
            snapshot.forEach(function(childSnapshot){
                if(childSnapshot.child("category").val() == videoCat){
                    $scope.displayVideos.push(childSnapshot.val())
                }
            })
            $scope.$apply();
        })

    }




});