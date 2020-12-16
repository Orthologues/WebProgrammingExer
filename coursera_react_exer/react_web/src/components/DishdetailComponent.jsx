import React from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import CommentForm from './CommentComponent';
import { baseUrl } from '../shared/baseUrl';


function RenderDish({dish}) {
    if (dish != null) {
        return(
            <Card key={dish.id}>
                <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                <CardBody>
                  <CardTitle>{dish.name}</CardTitle>
                  <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
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
        return (<div>

            <ul class="list-unstyled">
                <h4>Comments</h4>
                {comments.map(commentObj=>{
                    return (
                    <div style={{marginTop: '0.5rem'}}>
                        <li> <RenderRatingStars rating={commentObj.rating}
                        maxRating={5} /> 
                             {commentObj.comment}
                        </li>
                        <li>-- {commentObj.author}, {new Intl.DateTimeFormat('en-US', 
                        　　{ year: 'numeric', 
                        　　  month: 'short', 
                        　　  day: '2-digit'}).format(new Date(Date.parse(commentObj.date)))}</li>
                    </div> );
                })}
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
