import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { text } from 'react-native-communications';
import EmployeeForm from './EmployeeForm';
import { employeeUpdate, employeeSave, employeeDelete } from '../actions';
import { CardSection, Card, Button, Confirm } from './common';

class EmployeeEdit extends Component {
  state = {
    modalVisible: false
  }

  componentWillMount() {
    // this function is invoking the employeeUpdate action creator for each
    // property is this.props.employee (which was passed in from the
    // employeeList component). the result is the employeeForm state is updated
    // with the specific employee which then populates the edit form.
    _.each(this.props.employee, (value, prop) => {
      this.props.employeeUpdate({ prop, value });
    });
  }

  onButtonPress() {
    const { name, phone, shift } = this.props;

    this.props.employeeSave({ name, phone, shift, uid: this.props.employee.uid });
  }

  onTextPress() {
    const { phone, shift } = this.props;

    text(phone, `Your upcoming shift is on ${shift}`);
  }

  onAccept() {
    this.props.employeeDelete({ uid: this.props.employee.uid });
  }

  onDecline() {
    this.setState({ modalVisible: false });
  }

  render() {
    return (
      <Card>
        <EmployeeForm {...this.props} />
        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>Save</Button>
        </CardSection>

        <CardSection>
          <Button onPress={this.onTextPress.bind(this)}>Text Schedule</Button>
        </CardSection>

        <CardSection>
          <Button onPress={() => this.setState({ modalVisible: !this.state.modalVisible })}>
              Fire
          </Button>
        </CardSection>

        <Confirm
          onAccept={this.onAccept.bind(this)}
          onDecline={this.onDecline.bind(this)}
          visible={this.state.modalVisible}
        >
          Are you sure you want to fire?
        </Confirm>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const { name, phone, shift } = state.employeeForm;

  return { name, phone, shift };
};

export default connect(mapStateToProps, {
  employeeUpdate, employeeSave, employeeDelete
})(EmployeeEdit);
