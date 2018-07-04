import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import Buttons from '../components/Buttons';
import CounterListContainer from './CounterListContainer';

import { connect } from 'react-redux';
import * as counterActions from '../modules/counter';
import * as postActions from '../modules/post';

class App extends Component {
  componentDidMount() {
    // 컴포넌트가 처음 마운트 될 때 현재 number 를 postId 로 사용하여 포스트 내용을 불러옵니다.
    const { number, PostActions } = this.props;
    PostActions.getPost(number);
  }

  componentWillReceiveProps(nextProps) {
    // 현재 number 와 새로 받을 number 가 다를 경우에 요청을 시도합니다.
    if(this.props.number !== nextProps.number) {
      this.getPost(nextProps.number)
    }
  }

  getPost = async (postId) => {
    const { PostActions } = this.props;

    try {
      await PostActions.getPost(postId);
      console.log('요청이 완료 된 다음에 실행됨')
    } catch(e) {
      console.log('에러가 발생!');
    }
  }

  render() {
      const { CounterActions, post } = this.props;
      const isLoading = post.pending || false;
      const error = post.error || false;
      const data = post.data;
      return (
          <div className="App">
              <Buttons
                  onCreate={CounterActions.create}
                  onRemove={CounterActions.remove}
              />
              { isLoading && (<h2>로딩중...</h2>) }
              { error
                ? (<h1>에러발생!</h1>)
                : (
                  <div>
                    <h2>{data.title}</h2>
                    <p>{data.body}</p>
                  </div>
                ) }
              <CounterListContainer/>
          </div>
      );
  }
}

// 리덕스에 연결을 시키고 내보낸다
export default connect(
  (state) => {
    const { post, counter } = state;
    const counters = counter.get('counters');
    const firstCounter = counters.get(0);
    return { post, number: firstCounter.get('number') };
  },
  (dispatch) => ({
    CounterActions: bindActionCreators(counterActions, dispatch),
    PostActions: bindActionCreators(postActions, dispatch)
  })
)(App);