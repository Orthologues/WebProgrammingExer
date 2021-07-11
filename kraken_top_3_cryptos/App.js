/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
//import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import { Colors } from 'react-native/Libraries/NewAppScreen';


const Section = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const DEFAULT_PRICE = { 
  "BTC": Array(4).fill(''), 
  "ETH": Array(4).fill(''), 
  "USDT": Array(4).fill('') 
} 
const CRYPTO_TABLE_HEADER = ['Ask', 'Bid', 'Low in last 24h', 'High in last 24h'];

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  //use this hook to store crypto price fetched from Kraken API
  const [cryptoPrice, setCryptoPrice] = useState(DEFAULT_PRICE);
  //defines the currency to display, options: "USD"/"EUR"/"JPY", default is "crypto"
  const [currency, setCurrency] = useState('USD');
  const [counter, setCounter] = useState(0);
  
  // sample of pairname: "BTCUSD"
  const get_currency_crypto_pair_ticker = async () => {
    let newCryptoPrice = cryptoPrice;
    // call BTC
    for (const crypto of ['BTC', 'ETH', 'USDT']) {
      try {
        const pair_name = `${crypto}${currency}`;
        const resp = await axios.get(`https://api.kraken.com/0/public/Ticker?pair=${pair_name}`);
        const price_obj = resp.data['result'];
        const price_obj_first_key = Object.keys(price_obj)[0];
        const price_data_obj = price_obj[price_obj_first_key];
        // console.log(price_data_obj)
        //Ask
        newCryptoPrice[crypto][0] = parseFloat(price_data_obj['a'][0]).toFixed(2);
        //Bid
        newCryptoPrice[crypto][1] = parseFloat(price_data_obj['b'][0]).toFixed(2);
        //Low in last 24h
        newCryptoPrice[crypto][2] = parseFloat(price_data_obj['l'][0]).toFixed(2);
        //High in last 24h
        newCryptoPrice[crypto][3] = parseFloat(price_data_obj['h'][0]).toFixed(2);
        // return to updated state
      } catch (err) {
        console.log(err.message)
      }
    }
    return newCryptoPrice;
  }

  const updateCryptoPrice = async () => {
    const newCryptoPrice = await get_currency_crypto_pair_ticker();
    setCryptoPrice(newCryptoPrice)
  }
  //when component mounts
  useEffect(() => {
    //use axios to call Kraken API and update price every 5 seconds
    //API call every 5 seconds
    const interval = setInterval(() => {
      setCounter(counter => counter+1)
    }, 1000)
    return () => {
      clearInterval(interval);
    }
  })

  useEffect(() => {
    // do API call every 10 seconds
    if (counter %10 === 0) {
      updateCryptoPrice()
    }
    if (counter == 100) {
      setCounter(0)
    }
  }, [counter])

  useEffect(() => {
    updateCryptoPrice()
  }, [currency])

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Kraken-api">
            Welcome to Kraken API! {counter}
          </Section>
          <Text style={{marginTop: 12, marginLeft: 8}}>Select currency:</Text>
          <Picker
            selectedValue={currency}
            onValueChange={(val, ind) =>
              setCurrency(val)
            }>
            <Picker.Item label="US Dollar" value="USD" />
            <Picker.Item label="Euro" value="EUR" />
            <Picker.Item label="Japanese Yen" value="JPY" />
          </Picker>
          <Table style={{ marginTop: 10 }} borderStyle={{ borderWidth: 1 }}>
            <Row
              data={[`Currency: ${currency}`].concat(CRYPTO_TABLE_HEADER)}
              flexArr={Array(5).fill(1)}
              style={styles.head}
              textStyle={styles.text}
            />
            <TableWrapper style={styles.wrapper}>
              <Col
                data={Object.keys(DEFAULT_PRICE)}
                style={styles.title}
                heightArr={[28, 28]}
                textStyle={styles.text}
              />
              <Rows
                data={Object.values(cryptoPrice)}
                flexArr={Array(4).fill(1)}
                style={styles.row}
                textStyle={styles.text}
              />
            </TableWrapper>
          </Table>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  container: { 
    flex: 1,
    padding: 16,
    paddingTop: 100,
    backgroundColor: '#fff'
  },
  head: {
    height: 40,
    backgroundColor: 'orange' 
  },
  wrapper: { 
    flexDirection: 'row'
  },
  title: { 
    flex: 1,
    backgroundColor: '#2ecc71'
  },
  row: { 
    height: 28
  },
  text: { 
    textAlign: 'center'
  }
});

export default App;
