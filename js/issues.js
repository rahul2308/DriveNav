$(document).ready(function() {
    $.ajax({
    	url: "/data/dummyData.json",
        dataType: "json",
        success: function(Data) {
            // variables for different issue properties
        	var issueNo, issueDetails, issueLocationLatitude, issueLocationLongitude, issueDate, issueImportance, driveRoute;
            // resolved stores all the resolved issued and current stores all the current issues
        	var resolved = new Array(), current = new Array();
            // issueList is an array used to store the issues in the json file
        	var issueList = Data.issues;
            // datalength stores the no of issues in the json file
        	var datalength = issueList.length;

        	for(i=0; i<datalength; i++) {
        		issueNo = issueList[i].issueNo;
        		issueDetails = issueList[i].issueDetails;
        		issueLocationLatitude = issueList[i].location.latitude;
        		issueLocationLongitude = issueList[i].location.longitude;
        		issueDate = issueList[i].issueDate.split('T');
                iDate = issueDate[0];
                iTime = issueDate[1].split('Z')[0];
                issueImportance = issueList[i].importance;
        		driveRoute = "<a href='"+issueList[i].route+"' class=\"btn btn-warning\">Route here</a>";

                day = iDate.split('-')[2];
                month = iDate.split('-')[1];
                year = iDate.split('-')[0];
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

        		if(issueList[i].status == "Resolved") {
        			resolved.push("<tr><td>"+issueNo + "</td><td>" + issueDetails + "</td><td>[" + issueLocationLatitude + "," + issueLocationLongitude + "]</td><td>" + day + '-' + month + '-' + year +', '+iTime + "</td><td>" + driveRoute + "</td></tr>");
        		}
        		else if(issueList[i].status=="Current") {
                    if (issueImportance === "danger")
                        current.push("<tr class=\"danger\"><td>"+issueNo + "</td><td>" + issueDetails + "</td><td>[" + issueLocationLatitude + "," + issueLocationLongitude + "]</td><td>" + day + '-' + month + '-' + year +', '+iTime + "</td><td>" + driveRoute + "</td></tr>");
                    else if (issueImportance === "warning")
                        current.push("<tr class=\"warning\"><td>"+issueNo + "</td><td>" + issueDetails + "</td><td>[" + issueLocationLatitude + "," + issueLocationLongitude + "]</td><td>" + day + '-' + month + '-' + year +', '+iTime + "</td><td>" + driveRoute + "</td></tr>");
                    else 
                        current.push("<tr><td>"+issueNo + "</td><td>" + issueDetails + "</td><td>[" + issueLocationLatitude + "," + issueLocationLongitude + "]</td><td>" + day + '-' + month + '-' + year +', '+iTime + "</td><td>" + driveRoute + "</td></tr>");
        		}
        	}
            //pushing the required data in the required table
        	$('#current').append(current);
        	$('#resolved').append(resolved);
        }
    });
})