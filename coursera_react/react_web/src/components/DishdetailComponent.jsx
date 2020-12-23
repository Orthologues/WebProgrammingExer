import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem,
    Button, Modal, ModalBody, Row, Col, Label } from 'reactstrap';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {

    constructor(props){
        super(props);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            isModalOpen: false
        };
    }

    toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);;
        // alert('Current State is: ' + JSON.stringify(values));
        // event.preventDefault();
    }

    render() {

        const rateOptions = (maxRating) => Array.from(Array(5).keys()).map(key => {
            return (
            <option>{key+1}</option>
            )
        });

        return (
            <div>

            <div toggle={this.toggleModal} style={{marginTop: "1rem"}}>
                <Button outline color="primary" onClick={this.toggleModal}>
                    <span className="fa fa-comment fa-lg"
                    style={{ marginRight: "0.5rem" }}></span>
                Submit Comment</Button> 
            </div>

            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
    
                        <Row className="form-group">
                            <Col md={{size: 10, offset: 1}}>
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select model=".rating" name="rating"
                                    defaultValue="5"
                                    className="form-control">
                                    {rateOptions(5)}
                                </Control.select>
                            </Col> 
                        </Row>
    
                        <Row className="form-group">
                            <Col md={{size: 10, offset: 1}}>
                                <Label htmlFor="author">Your Name</Label>
                                <Control.text model=".author" id="author" name="author"
                                    placeholder="Your Name"
                                    className="form-control"
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                />
                            </Col> 
                        </Row>
    
                        <Row className="form-group">
                            <Col md={{size: 10, offset: 1}}>
                                <Label htmlFor="comment">Comments</Label>
                                <Control.textarea model=".comment" id="comment" name="comment"
                                    rows="6"
                                    className="form-control" />
                            </Col>
                        </Row>
    
                        <Row className="form-group">
                            <Col md={{size: 10, offset: 1}}>
                                <Button type="submit" color="primary">
                                Submit
                                </Button>
                            </Col>
                        </Row>
                        
                    </LocalForm>
                </ModalBody>
            </Modal>
            </div>
        )
    }
}

function RenderDish({dish}) {
    if (dish != null) {
        return(
            <FadeTransform in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
            <Card>
                <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
            </FadeTransform>

        );
    } else{
        return(
            <div></div>
        );
    }
}

function RenderRatingStars({rating, maxRating}) {

    let emojiStars = '';
    if (rating > 0 && rating <= maxRating) {
        let index=0; while (index<rating){
            emojiStars += '⭐';
            index++;
        }
        return (
            <div>{emojiStars}</div>
        );
    } else{
        return (<div></div>);
    }

}


function RenderComments({ comments, postComment, dishId }) {
    if (comments != null){
        return (<div key={'dishID' + dishId}>

            <ul class="list-unstyled">
                <h4>Comments</h4>
                <Stagger in>
                {comments.map(commentObj=>{
                    return (
                    <Fade in>
                        <div style={{marginTop: '0.5rem'}}>
                        <li> <RenderRatingStars rating={commentObj.rating}
                        maxRating={5} /> 
                             {commentObj.comment}
                        </li>
                        <li>-- {commentObj.author}, {new Intl.DateTimeFormat('en-US', 
                        　　{ year: 'numeric', 
                        　　  month: 'short', 
                        　　  day: '2-digit'}).format(new Date(Date.parse(commentObj.date)))}</li>
                    </div>
                    </Fade>
                     );
                })}
                </Stagger>
            </ul>

            <CommentForm dishId={dishId} postComment={postComment}/>

            </div>);
    } else{
        return (<div></div>);
    }
}

const DishDetail = (props) => {

    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">            
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null) {
        return (
            <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>                
            </div>
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish} />
                </div>
                <div className="col-12 col-md-6">
                    <RenderComments key={props.dish.id}
                        comments={props.comments}
                        postComment={props.postComment}
                        dishId={props.dish.id} 
                    />
                </div>
            </div>
            </div>
        );
    }

}
    
export default DishDetail;
