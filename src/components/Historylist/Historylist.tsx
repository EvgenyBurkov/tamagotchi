import React from 'react';
import styles from './Historylist.module.scss';

interface IHistory {
  commandType: string[],
  historyText: string[],
  historyTime: Date[]
}

interface IHistoryProps {
  history: IHistory
}

interface IHistroryRowProps {
  commandType: string,
  historyText: string,
  historyTime: Date
}

class HistoryRow extends React.Component<IHistroryRowProps> {
  render() {
    const commandType = this.props.commandType;
    const historyText = this.props.historyText;
    const historyTime = this.props.historyTime;

    const currentTime = historyTime.toLocaleDateString() + ' ' + historyTime.toLocaleTimeString();

    return (
      <tr>
        <td className={styles.commandTD}>{commandType}</td>
        <td className={styles.descriptionTD}>{historyText}</td>
        <td className={styles.timeTD}>{currentTime}</td>
      </tr>
    );
  }
}

class Historylist extends React.Component<IHistoryProps> {
  render() {
    const rows: any[] = [];
    console.log(this.props.history);

    for(let i = 0; i < this.props.history.commandType.length; i++) {
      rows.push(
        <HistoryRow 
          commandType={this.props.history.commandType[i]}
          historyText={this.props.history.historyText[i]}
          historyTime={this.props.history.historyTime[i]}
          key={i}
        />
      );      
    }

    return (
      <div className={styles.Historylist}>
        <h2>История команд</h2>
        <table className={styles.historyTable}>
          <thead>
            <tr>
              <th>Команда</th>
              <th>Описание</th>
              <th>Время</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  }
}

export default Historylist;
