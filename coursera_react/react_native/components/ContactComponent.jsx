import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer';


const contactInfo = [
    '121, Clear Water Bay Road',
    'Clear Water Bay, Kowloon',
    'HONG KONG',
    'Tel: +852 1234 5678',
    'Fax: +852 8765 4321',
    'Email:confusion@food.net'
];

const RenderContact = ({ contactInfo }) => {
    
    if ( Array.isArray(contactInfo) && contactInfo.length >=1 ) {
        return(
        <View>
            {contactInfo.map( (PieceOfInfo, index) => (
                <Text key={index} style={{margin: 10}}>
                    {PieceOfInfo}
                </Text> )
            )}
        </View> );
    } 
    return(<View></View>);
}


class Contact extends Component {

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

    sendMail() {
        MailComposer.composeAsync({
            recipients: ['confusion@food.net'],
            subject: 'Enquiry',
            body: 'To whom it may concern:'
        })
    }

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

        return(
          <ScrollView>
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
              <Card>
                <Text style={styles.cardHeaderStyle}>Contact Information</Text>
                <View style={styles.hrStyle} />
                <RenderContact contactInfo={contactInfo} />
                <Button
                    title="Send Email"
                    buttonStyle={{backgroundColor: "#512DA8"}}
                    icon={<Icon name='envelope-o' type='font-awesome' color='white' />}
                    onPress={this.sendMail}
                    />
              </Card>
            </Animatable.View>
          </ScrollView>
        );
    }
}

export default Contact;