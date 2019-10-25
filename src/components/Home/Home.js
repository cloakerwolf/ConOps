import React, { Component } from 'react';
import { connect } from 'react-redux';



class Home extends Component {

  componentDidMount() {
    this.props.dispatch({
      type: 'FETCH_NEWS',
    });
    this.props.dispatch({
      type: 'FETCH_CONVENTION'
    });
  }


  render() {
    return (
      <div className="homeBigger">
        <h1>HOME</h1>
        <h1>{this.props.convention.ConventionName}</h1>
        <div className="homeBig">

          <div className="homePage">
            <h1>Welcome to ConOps!!</h1>
            {this.props.reduxStore.user.authorization === 1 &&
              <p>You have logged in under the check-in permissions.  You will be allowed to check attendees into the convention! Click on the attendees tab above to navigate to the check in page.
                You will also be able to view other information about the convention in other sections of this application.  Enjoy the convention and smile for the guests!!
    </p>}
            {
              this.props.reduxStore.user.authorization === 4 &&
              <p>
                You have logged in using the Admin permissions.  Welcome back your lordship.  You may create and edit the conventions to your hearts extent.  Try not to kill anyone, this is supposed to be FUN!!!
      </p>
            }
            {this.props.reduxStore.user.authorization === 2 &&
              <p>
                You have logged in with Event Organizer Permissions.  You will be allowed to create and edit Events within the convention!  Click on the Events tab in the header above to navigate to the Events section.
                You will be allowed to view all of the information in the other sections of this application.  Enjoy the convention!!!
  </p>}
            {this.props.reduxStore.user.authorization === 3 &&
              <p>
                You have been logged in with Librarian permissions.  This level of permissions is designed to manage the game library owned by the conventions founders!   Unfortunately, that section of the app is outside of the scope of my work here.
                You will be allowed to view all of the information in this application in the meantime.
  </p>}
            {(this.props.reduxStore.user.authorization !== 1 && this.props.reduxStore.user.authorization !== 2 && this.props.reduxStore.user.authorization !== 3 && this.props.reduxStore.user.authorization !== 4) &&
              <p>Hello! You have been logged in using view only mode.  You can click on the tags in the header above to navigate through the application and view information about this years convention.</p>
            }
          </div>
          <div className="homePage1">
            <h1>Important convention News!</h1>
            <p>{this.props.reduxStore.homePageReducer.ConventionNews}</p>
          </div>
        </div>
      </div>
    )
  }
};

const mapStateToProps = reduxStore => {
  return {
    reduxStore,
    convention: reduxStore.ConventionsReducer,
  };
}


export default connect(mapStateToProps)(Home);
