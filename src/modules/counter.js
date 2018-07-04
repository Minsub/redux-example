import { createAction, handleActions } from 'redux-actions';
import Immutable from 'immutable';

// 액션 타입
const CREATE = 'counter/CREATE';
const REMOVE = 'counter/REMOVE';
const INCREMENT = 'counter/INCREMENT';
const DECREMENT = 'counter/DECREMENT';
const SET_COLOR = 'counter/SET_COLOR';

const INCREMENT_ASYNC = 'counter/INCREMENT_ASYNC';
const DECREMENT_ASYNC = 'counter/DECREMENT_ASYNC';

// 액션 생성자
export const create = createAction(CREATE); // color
export const remove = createAction(REMOVE);
export const increment = createAction(INCREMENT); // index
export const decrement = createAction(DECREMENT); // index
export const setColor = createAction(SET_COLOR); // { index, color }

// 초기 상태를 정의합니다
const initialState = Immutable.Map({
  counters: Immutable.List([
    Immutable.Map({
      color: 'black',
      number: 1
    })
  ])
});

export const incrementAsync = (index) => dispatch => {
  // 1초 뒤 액션 디스패치
  setTimeout(
    () => { dispatch(increment(index)) },
    1000
  );
}

export const decrementAsync = (index) => dispatch => {
  // 1초 뒤 액션 디스패치
  setTimeout(
    () => { dispatch(decrement(index)) },
    1000
  );
}

export default handleActions({
  [CREATE]: (state, action) => {
    const counters = state.get('counters');

    return state.set('counters', counters.push(
      Immutable.Map({
        color: action.payload,
        number: 0
      })
    ))
  },

  [REMOVE]: (state, action) => {
    const counters = state.get('counters');

    return state.set('counters', counters.pop())
  },

  [INCREMENT]: (state, action) => {
    const counters = state.get('counters');

    return state.set('counters', counters.update(
      action.payload,
      (counter) => counter.set('number', counter.get('number') + 1))
    );
  },

  [DECREMENT]: (state, action) => {
    const counters = state.get('counters');

    return state.set('counters', counters.update(
      action.payload,
      (counter) => counter.set('number', counter.get('number') - 1))
    );
  },

  [SET_COLOR]: (state, action) => {
    const counters = state.get('counters');

    return state.set('counters', counters.update(
      action.payload.index,
      (counter) => counter.set('color', action.payload.color))
    );
  },
  [INCREMENT_ASYNC]: (state, action) => {
    const counters = state.get('counters');

    return state.set('counters', counters.update(
      action.payload,
      (counter) => counter.set('number', counter.get('number') + 1))
    );
  },

  [DECREMENT_ASYNC]: (state, action) => {
    const counters = state.get('counters');

    return state.set('counters', counters.update(
      action.payload,
      (counter) => counter.set('number', counter.get('number') - 1))
    );
  },
}, initialState);