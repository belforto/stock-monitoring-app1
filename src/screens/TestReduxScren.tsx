import React, { useEffect } from "react";
import { connect } from "react-redux";
import { callNewsApi } from "../api/Api";
import { LOAD_NEWS, fetchNewsFunction } from "../redux/actions";

function TestReduxScren({ count, fetchNewsFunction,numberOfCalls }) {

    useEffect(() => {
        fetchNewsFunction();
        
    }, [])
    
  return (
    <div>
      ReduxTest screen
      {JSON.stringify(count)}
      called {numberOfCalls} times
    </div>
  );
}

// These will be added as props to the component.
function mapState(state) {
  return { count: state.news , numberOfCalls: state.numberOfCalls};
}

const mapActionsToProps = {
    fetchNewsFunction, // <== we pass our action creator to the component, here
  };


// Connect them:
export default connect(
  mapState,
  mapActionsToProps
)(TestReduxScren);
