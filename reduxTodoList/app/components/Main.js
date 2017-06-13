import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  ListView
} from 'react-native';
import TodoItem from './TodoItem';
import { addTodo } from '../actions';

class Main extends Component {

  state = {
    newTodoText: ''
  }

    addNewTodo() {
      const { newTodoText } = this.state;
      if (newTodoText && newTodoText !== '') {
        this.setState({
          newTodoText: ''
        });
        this.props.addTodo(newTodoText);
      }
    }

    renderTodos() {
      return this.props.todos.map((todo) => {
         return <TodoItem text={todo.text} key={todo.id} id={todo.id} />;
      });
    }

  render() {
    console.log(this.props.todos);
    return (
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Text style={styles.title}>To-Do List</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            onChange={(event) => {
              this.setState({
                newTodoText: event.nativeEvent.text
              });
            }}
            value={this.state.newTodoText}
            onSubmitEditing={this.addNewTodo.bind(this)}
            returnKeyType="done"
            placeholder="New To-Do"
            style={styles.input}
          />
        </View>
        <ScrollView automaticallyAdjustContentInsets={false}>
          {this.renderTodos()}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  topBar: {
    padding: 16,
    paddingTop: 28,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2ecc71'
  },
  title: {
    color: 'white',
    fontSize: 20
  },
  inputContainer: {
    padding: 8,
    paddingTop: 0,
    backgroundColor: '#2ecc71'
  },
  input: {
    height: 26,
    padding: 4,
    paddingLeft: 8,
    borderRadius: 8,
    backgroundColor: 'white'
  }
});

const mapStateToProps = (state) => {
  return {
    todos: state.todos
  };
};

export default connect(mapStateToProps, { addTodo })(Main);
