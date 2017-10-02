import { connect } from 'react-redux';
import idx from 'idx';
import actions from './actions';

const mapStateToProps = (state, props) => ({
  user: idx(state, s => s.auth.user) || null,
  loggedIn: !!idx(state, s => s.auth.user._id) || false,
  reqLogin: idx(state, s => s.auth.reqLogin) || {}
});

export default ({ endpoint, transformJWT }) =>
  connect(mapStateToProps, actions({ endpoint, transformJWT }));
