import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import { deleteTodo } from '../actions';

class TodoItem extends Component {
  render() {
    return (
      <TouchableOpacity onPress={() => this.props.deleteTodo(this.props.id)}>
        <View style={styles.todoContainer}>
          <Text style={styles.todoText}>
            {this.props.text}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = {
  todoContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginBottom: -1,
    borderColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  todoText: {

  }
};

export default connect(null, { deleteTodo })(TodoItem);
