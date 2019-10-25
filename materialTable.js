//this import 
import MaterialTable from "material-table";

//this is the link to all of the props for this Material-Table
https://material-table.com/#/docs/all-props

//this needs to be put into the index.html so you can have icons on the table or you can npm install @material-ui/icons then import each icon at the top of each component
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

state = {
    columns: [
        //title is the column head in the table, field is the Name of the item that you want from the reducer that is talking to the database
        { title: "First Name", field: "FirstName" },
        { title: "Last Name", field: "LastName" },
        { title: "Middle Name", field: "MiddleName" },
        { title: "Email Address", field: "EmailAddress" },
        { title: "Phone Number", field: "PhoneNumber" },
        //render is used with moment.js so the date appears as month day year
        { title: "Date Of Birth", field: "DateOfBirth", render: (rowData) => <p>{moment(rowData.DateOfBirth).format('MM-DD-YYYY')}</p> },
        //hidden makes it so the column is hidden from view when the page loads
        { title: "Registration Date", field: "RegistrationDate", hidden: true },
        { title: "Check-In date", field: "CheckInDate", hidden: true },
        { title: "Payment Date", field: "PaymentDate", hidden: true },
        { title: "Badge Type ID", field: "BadgeTypeID", hidden: true },
        { title: "Badge Number", field: "BadgeNumber" },
        {
            title: "OrderID",
            field: "orderID"
        }
    ],
}

    //the start of the MaterialTable
    < MaterialTable
//there is the option to have a title on the table
title = "Editable Example"
//this calls the columns heads for you table that you set up in state
columns = { this.state.columns }
options = {{
    //Flag for columns button that controls which column could be rendered
    columnsButton: true,
        // headerStyle: { backgroundColor: 'blue', color: 'white' }, gives you the ability to change the color of the column headers
        //sets the amount of rows that appear in the table on render
        pageSize: 10,
        //this allows you to change the amount of rows that appear in the table
        pageSizeOptions: [10, 20, 50],
        //this makes it so the button for the hide columns appears on the right 
        toolbarButtonAlignment: "right",
        //this makes it so the search field appears on the left side of the table
        searchFieldAlignment: "left",
        //this makes it so you can not see the title of the table
        showTitle: false
}}
//data call information from the reducer and match it up with the fields setup in the columns that are set in state
data = { this.props.reduxStore.AttendeesCheckInReducer }
actions = {
    [
        {
            //renders a material-ui accessability icon in each row
            icon: "accessibility",
            //tooltip shows that message when you hover over the button
            tooltip: "Find this person`s personal info",
            onClick: (event, rowData) => {
                this.props.history.push(`/details/${rowData.AttendeeID}`);
            }
        },
        //rowData allows us to set the row data for this particular column as a object. This object has an icon tooltip and a function that sends the orderID to the OrderID component
        rowData => ({
            icon: "group",
            tooltip: "Find all members of this group",
            onClick: (event, rowData) => {
                console.log(rowData.orderID);
                this.props.history.push(`/OrderID/${rowData.orderID}`);
            },
            disabled: rowData.orderID == null
        }),
        rowData => ({
            icon: "check_circle",
            tooltip: "check this Attendee in!",
            onClick: (event, rowData) => {
                if (rowData.PaymentDate) {
                    this.setState({
                        openPaid: !this.state.openPaid,
                        ...this.state.rowData, rowData: [rowData.AttendeeID]
                    })
                } else {
                    this.setState({
                        open: !this.state.open,
                        ...this.state.rowData, rowData: rowData.AttendeeID
                    })
                }
            },
            disabled: rowData.CheckInDate !== null
        })
    ]}
    //this material-table has the ability to have inline edits, deletes, and create a new row we did not use these functions
editable = {{ }}
/>
