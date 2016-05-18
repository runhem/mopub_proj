eggApp.controller('videosCtrl', function($scope){


$scope.eggVids = new Firebase("https://eggapp.firebaseio.com/videobase");

$scope.displayVideos = [];

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
    
    $scope.getRating = function(childSnapshot){           
    	var ratingCount = 0;
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
