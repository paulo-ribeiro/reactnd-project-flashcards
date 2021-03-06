import React, { Component } from 'react';
import { View, Text, StyleSheet, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { addDeck } from '../actions';
import { black, white } from '../utils/colors';
import { saveDeck } from '../utils/api';
import Button from './Button';
import CustomInput from './CustomInput';

class NewDeck extends Component {
  state = {
    title: "",
    error: false,
    msg: ""
  };

  onSubmit = () => {
    const { title } = this.state;
    const { decks, dispatch, navigation } = this.props;

    if (title.trim() === "") {
      this.setState({
        error: true,
        msg: "Title cant be blank."
      });
      return;
    }

    if (decks[title]) {
      this.setState({
        error: true,
        msg: "A deck with this title already exists."
      });
      return;
    }

    const deck = {
      title,
      questions: []
    };

    dispatch(addDeck(deck));

    this.setState({ title: "", error: false, msg: "" });

    Keyboard.dismiss();

    saveDeck(deck);

    navigation.navigate("DeckDetail", { title: title });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.question}>What is the title of your new deck?</Text>
        <CustomInput
          inputStyle={{ marginTop: 10, marginBottom: 10 }}
          onChange={(title) => this.setState({ title })}
          value={this.state.title} />
        {this.state.error
          && <ErrorMsg text={this.state.msg} />}
        <Button
          text={"Submit"}
          onPress={this.onSubmit}
          btnStyle={{ backgroundColor: black }}
          txtStyle={{ color: white }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 10
  },
  question: {
    fontSize: 26,
    textAlign: "center"
  }
});

const mapStateToProps = (state) => ({
  decks: state
});

export default connect(mapStateToProps)(NewDeck);