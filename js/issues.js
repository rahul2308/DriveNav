$(document).ready(function() {
    $.ajax({
    	url: "data/dummyData.json",
        dataType: "json",
        success: function(Data) {
            // variables for different issue properties
        	var issueNo, issueDetails, issueLocationLatitude, issueLocationLongitude, issueDate, issueImportance, driveRoute;
            // resolved stores all the resolved issued and current stores all the current issues
        	var resolved = [], current_normal = [], current_danger = [], current_warning = [];
            // issueList is an array used to store the issues in the json file
        	var issueList = Data.issues;
            // datalength stores the no of issues in the json file
        	var datalength = issueList.length;

        	for(var i=0; i<datalength; i++) {
        		issueNo = issueList[i].issueNo;
        		issueDetails = issueList[i].issueDetails;
        		issueLocationLatitude = issueList[i].location.latitude;
        		issueLocationLongitude = issueList[i].location.longitude;
        		issueDate = issueList[i].issueDate.split('T');
                var iDate = issueDate[0];
                var iTime = issueDate[1].split('Z')[0];
                issueImportance = issueList[i].importance;
        		driveRoute = "<a href='"+issueList[i].route+"' class=\"btn btn-warning\">Route here</a>";

                var day = iDate.split('-')[2];
                var month = iDate.split('-')[1];
                var year = iDate.split('-')[0];
                switch(month){
                    case '01':  month = 'Jan';break;
                    case '02':  month = 'Feb';break;
                    case '03':  month = 'Mar';break;
                    case '04':  month = 'Apr';break;
                    case '05':  month = 'May';break;
                    case '06':  month = 'Jun';break;
                    case '07':  month = 'Jul';break;
                    case '08':  month = 'Aug';break;
                    case '09':  month = 'Sep';break;
                    case '10':  month = 'Oct';break;
                    case '11':  month = 'Nov';break;
                    case '12':  month = 'Dec';break;
                }

        		if(issueList[i].status === "Resolved") {
        			resolved.push("<tr><td>"+issueNo + "</td><td>" + issueDetails + "</td><td>[" + issueLocationLatitude + "," + issueLocationLongitude + "]</td><td>" + day + '-' + month + '-' + year +', '+iTime + "</td><td>" + driveRoute + "</td></tr>");
        		}
        		else if(issueList[i].status === "Current") {
                    if (issueImportance === "danger") {
                        current_danger.push("<tr class=\"danger\"><td>"+issueNo + "</td><td>" + issueDetails + "</td><td>[" + issueLocationLatitude + "," + issueLocationLongitude + "]</td><td>" + day + "-" + month + "-" + year +", "+iTime + "</td><td>" + driveRoute + "</td></tr>");
                    }
                    else if (issueImportance === "warning") {
                        current_warning.push("<tr class=\"warning\"><td>"+issueNo + "</td><td>" + issueDetails + "</td><td>[" + issueLocationLatitude + "," + issueLocationLongitude + "]</td><td>" + day + "-" + month + "-" + year +", "+iTime + "</td><td>" + driveRoute + "</td></tr>");
                    }
                    else {
                        current_normal.push("<tr><td>"+issueNo + "</td><td>" + issueDetails + "</td><td>[" + issueLocationLatitude + "," + issueLocationLongitude + "]</td><td>" + day + "-" + month + "-" + year +", "+iTime + "</td><td>" + driveRoute + "</td></tr>");
        		    }
                }
        	}
            //pushing the required data in the required table
        	$('#current').append(current_danger);
            $('#current').append(current_warning);
            $('#current').append(current_normal);
        	$('#resolved').append(resolved);
        }
    });
});