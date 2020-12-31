import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';


const ourHistory = [
    `Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.`,
    `The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.`
];

const RenderHistory = ({history}) => {    
    if (Array.isArray(history) && history.length >=1) {
        return(
          <View>
            {history.map( (PieceOfInfo, index) => (
              <Text key={index} style={{margin: 10, fontWeight: 'bold'}}>
                  {PieceOfInfo}
              </Text> )
            )}
          </View>)
    }
    return(<View></View>);
}

const RenderLeaders = ({leaders}) => {
    if (Array.isArray(leaders) && leaders.length >=1) {
        return(
          <View>
            { leaders.map((leader, index) => (
              <ListItem
              key={index}
              title={leader.name}
              subtitle={leader.description}
              hideChevron={true}
              leftAvatar={{source: {uri: baseUrl + leader.image}}}
              />) 
            ) }
          </View>)
    } 
    return(<View></View>)
}

const mapStateToProps = state => {
  return {
    leaders: state.leaders
  }
}

class Aboutus extends Component {

    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: "#fff"            
        }
    };

    render() {

        const styles = StyleSheet.create({
            hrStyle:{
                borderWidth: 1,
                borderColor:'lightgrey',
                margin: 8 },
            cardHeaderStyle:{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 20,
                marginBottom: 5
            }});

        if (this.props.leaders.isLoading) {
          return(
              <ScrollView>
                  <History />
                  <Card
                      title='Corporate Leadership'>
                      <Loading />
                  </Card>
              </ScrollView>
          );
        } else if (this.props.leaders.errMess) {
            return(
                <ScrollView>
                    <History />
                    <Card
                        title='Corporate Leadership'>
                        <Text>{this.props.leaders.errMess}</Text>
                    </Card>
                </ScrollView>
            );
        } 
        return(
            <ScrollView>
              <Card>
                <Text style={styles.cardHeaderStyle}>Our History</Text>
                <View style={styles.hrStyle} />
                <RenderHistory history={ourHistory} />
              </Card>
              <Card>
                <Text style={styles.cardHeaderStyle}>Corporate Leadership</Text>
                <View style={styles.hrStyle} />
                <RenderLeaders leaders={this.props.leaders.leaders}/>
              </Card>
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps)(Aboutus);