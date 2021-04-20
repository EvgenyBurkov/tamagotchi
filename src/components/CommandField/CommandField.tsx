import React from 'react';
import styles from './CommandField.module.scss';

interface ICommandFieldProps {
  handleCommandChange(commandText: string): void
}

interface ICommandFieldState {
  fieldValue: string
}

class CommandField extends React.Component<ICommandFieldProps, ICommandFieldState> {
  constructor(props: ICommandFieldProps) {
    super(props);
    this.state = {
      fieldValue: ''
    }
    this.handleCommandChange = this.handleCommandChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e: any) {
    this.setState({fieldValue: e.target.value});
  }

  handleCommandChange(e: any) {
    if(e.key !== 'Enter') { return; }
    this.props.handleCommandChange(e.target.value);
    e.preventDefault();
    this.setState({ fieldValue: '' });
  }

  render() {
    return (
      <div className={styles.CommandField}>
        <textarea 
          placeholder="Введите команду, после чего нажмите Enter..." 
          onChange={this.handleChange}
          onKeyPress={this.handleCommandChange}
          value={this.state.fieldValue}
        />
      </div>
    );
  }
}

export default CommandField;
