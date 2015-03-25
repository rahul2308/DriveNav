### This file is for the documentation of the JSON file

The sample file present in the `data` folder has the following meaning for each of its values

1. `issueNo` - Stores the issue number that is given to the particular issue. (numeric)
2. `issueDetails` - Stores the description of the issue.
3. `location:latitude` - Stores decimal point latitude GPS Coordinate
4. `location:longitude` - Stores decimal point longitude GPS Coordinate.
5. `issueDate` - Date on which issue is posted
6. `status` - Shows the current status of issue, Anything other than `Resolved` has to be in the `Current issues` tab on the UI and the other in `Resolved`
7. `importance` - Shows the requirement for the row highlighting, `danger` means red, `warning` means yellow, `normal` means no color. Anything in the resolved section should have no color even if the importance is anything other than `normal`
8. `route` - Points to the routing platform with the required coordinates.
