import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; 
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent'
import Aboutus from './AboutComponent'
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent'
import Contact from './ContactComponent';
import { postComment, fetchDishes, fetchComments, fetchPromos } from '../redux/ActionCreators';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { actions } from 'react-redux-form';
import '../css/animation.css';

const mapDispatchToProps = dispatch => ({
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes: () => { dispatch(fetchDishes())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos())
});

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

class Main extends Component {

    constructor(props) {
      super(props);
    }

    componentDidMount() {
      this.props.fetchDishes();
      this.props.fetchComments();
      this.props.fetchPromos();
    }

    render() {
      
      const HomePage = ({location}) => {
        return(
          <Home key={location.key}
          dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishErrMess={this.props.dishes.errMess}
          promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
          promoLoading={this.props.promotions.isLoading}
          promoErrMess={this.props.promotions.errMess}
          leader={this.props.leaders.filter((leader) => leader.featured)[0]}
      />
        );
      }
  
      const DishWithId = ({match, location}) => {
        return(
          <DishDetail key={location.key}
          dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
          comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
          commentsErrMess={this.props.comments.errMess}
          postComment={this.props.postComment}
        />
        );
      };

      const AnimatedRouter = withRouter(({location}) => {
          return (
          <TransitionGroup>
            <CSSTransition key={location.key} classNames="slide" timeout={300}>
              <Switch location={location}>
                  <Route path='/home' component={HomePage} />
                  <Route exact path='/aboutus' component={() => <Aboutus leaders={this.props.leaders} />} />
                  <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
                  <Route path='/menu/:dishId' component={DishWithId} />
                  <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
                  <Redirect to="/home" />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
          );  
      });
  
      return (
        <div>
          <Router>
            <Header />
            <AnimatedRouter />
            <Footer />
          </Router>
        </div>
      );
    }
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
