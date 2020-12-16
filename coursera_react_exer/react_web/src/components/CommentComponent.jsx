import React, { Component } from 'react';
import { Button, Modal, ModalBody, Row, Col, Label } from 'reactstrap';
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

export default CommentForm