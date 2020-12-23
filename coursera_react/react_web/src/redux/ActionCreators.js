import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';


//dishes
export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});

export const fetchDishes = () => (dispatch) => {

    dispatch(dishesLoading());

    return fetch(`${baseUrl}dishes`)
    .then(response => {
        if (response.ok) {  // response code returns 200
          return response;
        } else {
          let nonOkError = new Error(`Error${response.status}: ${response.statusText}`);
          nonOkError.response = response;
          throw nonOkError;
        }
      },
      error => {  // rejected by the server?
            let errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(dishes => dispatch(addDishes(dishes)))
    .catch(error => dispatch(dishesFailed(error.message)));
}


//comments
export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const postComment = (dishId, rating, author, comment) => (dispatch) => {

    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    };
    newComment.date = new Date().toISOString();
    
    return fetch(`${baseUrl}comments`, {
        method: "POST",
        body: JSON.stringify(newComment),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
            let nonOkError = new Error(`Error${response.status}: ${response.statusText}`);
            nonOkError.response = response;
            throw nonOkError;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(response => dispatch(addComment(response)))
    .catch(error => { console.log(`post comments ${error.message}`); 
                       alert(`Your comment could not be posted\nError: ${error.message}`); 
                    });
};

export const fetchComments = () => (dispatch) => {    
    
    return fetch(`${baseUrl}comments`)
    .then(response => {
        if (response.ok) {  // response code returns 200
          return response;
        } else {
          
        }
      },
      error => {  // rejected by the server?
            let errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)))
    .catch(error => dispatch(commentsFailed(error.message)));
};


//promotion
export const promosLoading = () => ({
  type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
  type: ActionTypes.PROMOS_FAILED,
  payload: errmess
});

export const addPromos = (promos) => ({
  type: ActionTypes.ADD_PROMOS,
  payload: promos
});

export const fetchPromos = () => (dispatch) => {
  
  dispatch(promosLoading());

  return fetch(`${baseUrl}promotions`)
  .then(response => {
      if (response.ok) {  // response code returns 200
        return response;
      } else {
        let nonOkError = new Error(`Error${response.status}: ${response.statusText}`);
        nonOkError.response = response;
        throw nonOkError;
      }
    },
    error => {  // rejected by the server?
          let errmess = new Error(error.message);
          throw errmess;
    })
  .then(response => response.json())
  .then(promos => dispatch(addPromos(promos)))
  .catch(error => dispatch(promosFailed(error.message)));
}


// leaders
export const leadersLoading = () => ({
  type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = (errmess) => ({
  type: ActionTypes.LEADERS_FAILED,
  payload: errmess
});

export const addLeaders = (slide) => ({
  type: ActionTypes.ADD_LEADERS,
  payload: slide
});

export const fetchLeaders = () => (dispatch) => {
  
  dispatch(leadersLoading());

  return fetch(`${baseUrl}leaders`)
  .then(response => {
      if (response.ok) {  // response code returns 200
        return response;
      } else {
        let nonOkError = new Error(`Error${response.status}: ${response.statusText}`);
        nonOkError.response = response;
        throw nonOkError;
      }
    },
    error => {  // rejected by the server?
          let errmess = new Error(error.message);
          throw errmess;
    })
  .then(response => response.json())
  .then(slide => dispatch(addLeaders(slide)))
  .catch(error => dispatch(leadersFailed(error.message)));
}


// feedback
export const postFeedback = (
  { firstname, lastname, telnum, email, agree, contactType, message }
  ) => async () => {

    console.log(firstname+contactType);
    const feedBackArrayLength = await fetch(`${baseUrl}feedback`)
    .then(response => {
      if (response.ok) {
        return response;
      } else {
          let nonOkError = new Error(`Error${response.status}: ${response.statusText}`);
          nonOkError.response = response;
          throw nonOkError;
      }
    },
    error => {
          throw error;
    })
    .then(response => response.json())
    .then(response => response.length)
    .catch(error => { console.log(`fetch current length of feedbacks at db ${error.message}`); 
                     alert(`Couldn't fetch length of feedbacks! \nError: ${error.message}`); 
                    });
  
    const newFeedback = {
      firstname: firstname,
      lastname: lastname,
      telnum: telnum,
      email: email,
      agree: agree,
      contactType: contactType,
      message: message,
      date: new Date().toISOString(),
      id: feedBackArrayLength+1
    };
    
    return await fetch(`${baseUrl}feedback`, {
        method: "POST",
        body: JSON.stringify(newFeedback),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
            let nonOkError = new Error(`Error${response.status}: ${response.statusText}`);
            nonOkError.response = response;
            throw nonOkError;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(response => alert(`Thank you for your feedback!\n${JSON.stringify(response)}`))
    .catch(error => { console.log(`post fedback ${error.message}`); 
                       alert(`Your feedback could not be posted\nError: ${error.message}`); 
                    });
};  