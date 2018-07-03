import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import Buttons from '../components/Buttons';
import CounterListContainer from './CounterListContainer';

import { connect } from 'react-redux';
// import * as actions from '../actions';
import * as actions from '../modules';

import { getRandomColor } from '../utils';

class App extends Component {
    render() {
        const { onCreate, onRemove } = this.props;
        return (
            <div className="App">
                <Buttons
                    onCreate={onCreate}
                    onRemove={onRemove}
                />
                <CounterListContainer/>
            </div>
        );
    }
}

// 액션함수 준비
const mapToDispatch = (dispatch) => ({
    onCreate: () => dispatch(actions.create(getRandomColor())),
    onRemove: () => dispatch(actions.remove())
});

// 리덕스에 연결을 시키고 내보낸다
export default connect(
  null,
  (dispatch) => bindActionCreators({
    onCreate: actions.create,
    onRemove: actions.remove
  }, dispatch)
  // mapToDispatch
)(App);