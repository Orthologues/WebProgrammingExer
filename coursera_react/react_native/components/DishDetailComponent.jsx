import React, { Component } from 'react';
import { Text, View, FlatList, ScrollView, StyleSheet, Button, Modal } from 'react-native';
import { Card, Icon, Input } from 'react-native-elements';
import { Rating } from 'react-native-ratings';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { postFavorite, postComment } from '../redux/ActionCreators';
import 'intl';
import 'intl/locale-data/jsonp/en';

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 2,
        flexDirection: 'row',
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
     },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black',
        marginBottom: 20
     },
    modalText: {
        fontSize: 30,
        margin: 10
    }
});

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favorites: state.favorites
    }
  }

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
})

function RenderComments({comments}) {
            
    const renderCommentItem = ({item, index}) => {
        
        return (
            <View key={index} style={{margin: 5}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + 
                new Intl.DateTimeFormat('en-US', 
                　　{ year: 'numeric', 
                　　  month: 'short', 
                　　  day: '2-digit'}).format(new Date(Date.parse(item.date)))} </Text>
            </View>
        );
    };
    
    return (
        <Card title='Comments' >
        <FlatList 
            data={comments}
            renderItem={renderCommentItem}
            keyExtractor={item => item.id.toString()}
            />
        </Card>
    );
}

function RenderDish({dish, favorite, onFavoritePress, onCommentPress}) {
    
    if (dish != null) {
        return(
        <View style={styles.formRow}>
          <Card
          featuredTitle={dish.name}
          image={{uri: baseUrl + dish.image}}>
            <Text style={{margin: 10}}>
                {dish.description}
            </Text>
            <Icon
                raised
                reverse
                name={ favorite ? 'heart' : 'heart-o'}
                type='font-awesome'
                color='#f50'
                onPress={() => favorite ? console.log('Already favorite') : onFavoritePress()}
                />
            <Icon
                raised
                reverse
                name={ 'pencil' }
                type='font-awesome'
                color='#8A2BE2'
                onPress={() => onCommentPress()}
                />
          </Card>
        </View>     
        );
    }
    else {
        return(<View></View>);
    }
}

class DishDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
            comments: COMMENTS,
            favorites: [],
            newComment: {
                showCommentForm: false,
                rating: 5,
                author: '',
                comments: '' 
            }
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.resetForm = this.resetForm.bind(this);
    }

    static navigationOptions = {
        title: 'Dish Details',
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: "#fff"            
        }
    };

    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    toggleModal = () => {
        this.setState(prevState => (
            {
                ...prevState,
                newComment: {
                    ...prevState.newComment,
                    showCommentForm: !prevState.newComment.showCommentForm
                }
            }
        ))
    }

    resetForm = () => {
        this.setState(
            {
                newComment: {
                    showCommentForm: false,
                    dishId: -1,
                    rating: 5,
                    author: '',
                    comment: '',
                    date: ''
            }
        })
    }

    render() {
        const dishId = this.props.navigation.getParam('dishId','');

        return(
            <ScrollView>
              <RenderDish dish={this.props.dishes.dishes[+dishId]}
                favorite={this.props.favorites.some(el => el === dishId)}
                onFavoritePress={() => this.markFavorite(dishId)} 
                onCommentPress={() => this.toggleModal()}/>
              <RenderComments 
              comments={typeof this.props.comments.comments.filter === 'function' ?
              this.props.comments.comments.filter(comment => comment.dishId === dishId) :
              this.state.comments.filter(comment => comment.dishId === dishId)} />
              <Modal animationType = {"slide"} transparent = {false}
                  visible = {this.state.newComment.showCommentForm}
                  onDismiss = {() => this.toggleModal() }
                  onRequestClose = {() => this.toggleModal() }>
                <View style = {styles.modal}>
                    <Text style = {styles.modalTitle}>Write a new comment</Text>
                    <Rating
                      type='heart'
                      ratingCount={5}
                      startingValue={5}
                      imageSize={50}
                      showRating
                      onFinishRating={value => this.setState(prevState => 
                        ({  ...prevState, 
                            newComment: {
                              ...prevState.newComment,
                              rating: value} }))}
                    />
                    <Input
                      placeholder="Author"
                      leftIcon={{ type: 'font-awesome', name: 'user' }}
                      onChangeText={value => this.setState(prevState => 
                        ({  ...prevState, 
                            newComment: {
                              ...prevState.newComment,
                              author: value} }))}
                    />
                    <Input
                      placeholder="Comment"
                      leftIcon={{ type: 'font-awesome', name: 'comment' }}
                      onChangeText={value => this.setState(prevState => 
                          ({  ...prevState, 
                              newComment: {
                                ...prevState.newComment,
                                comment: value} }))}
                    />
                    <View style={{height: 20}}></View>
                    <Button 
                        onPress = {() => {  
                            this.props.postComment(
                                dishId, this.state.newComment.rating, 
                                this.state.newComment.author, 
                                this.state.newComment.comment);
                            setTimeout(() => {this.resetForm()}, 2000);
                            }
                        }
                        color="#8A2BE2"
                        title="SUBMIT" 
                        />
                    <View style={{height: 20}}></View>
                    <Button 
                        onPress = {() => {
                            this.resetForm()}}
                        color="#808080"
                        title="CANCEL" 
                        />
                </View>
              </Modal>
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);