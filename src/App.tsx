import React from 'react';
import './App.css';
import Bars from './components/Bars/Bars';
import Acts from './components/Acts/Acts';
import CommandField from './components/CommandField/CommandField';
import Historylist from './components/Historylist/Historylist';
import { View, Dimensions } from 'react-native';

interface AppProps {
  data: any
}

interface IHistory {
  commandType: string[],
  historyText: string[],
  historyTime: Date[]
}
interface AppState {
  hpBar: number,
  thirstBar: number,
  hungerBar: number,
  fatigueBar: number,
  commandText: string,
  history: IHistory
}

const EatArray: string[] = ['яблоко', 'грушу', 'мясо', 'рыбу', 'арбуз', 'дыню'];
const LiquidsArray: string[] = ['воду', 'лимонад', 'чай', 'кофе', 'молоко', 'кефир'];

const isMobile: boolean = window.innerWidth < window.innerHeight ? true : false;
const { height, width } = Dimensions.get('window');

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    console.log("width", width);
    console.log("height", height);
    this.state = {
      hpBar: 50,
      thirstBar: 35,
      hungerBar: 60,
      fatigueBar: 20,
      commandText: '',
      history: {
        commandType: [],
        historyText: [],
        historyTime: []
      }
    };

    this.handleOnclick = this.handleOnclick.bind(this);
    this.handleCommandChange = this.handleCommandChange.bind(this);
  }

  setStateFunction(command: string) {
    let commandArray = command.toLowerCase().split(' и ');

    for(let i = 0; i < commandArray.length; i++) {
      if(commandArray[i].indexOf("есть") >= 0) {
        this.setState({ 
          hpBar: this.state.hpBar >= 2 ? this.state.hpBar -2 : 0,
          hungerBar: this.state.hungerBar >= 10 ? this.state.hungerBar - 10 : 0,
          history: {
            commandType: this.state.history.commandType.concat('ЕСТЬ'),
            historyText: this.state.history.historyText.concat('Вы съели ' + EatArray[Math.floor(Math.random()*EatArray.length)]),
            historyTime: this.state.history.historyTime.concat(new Date())
          }
        });
      }
      else if(commandArray[i].indexOf("пить") >= 0) {
        this.setState({ 
          hpBar: this.state.hpBar >= 1 ? this.state.hpBar - 1 : 0,
          thirstBar: this.state.thirstBar >= 10 ? this.state.thirstBar - 10 : 0,
          history: {
            commandType: this.state.history.commandType.concat('ПИТЬ'),
            historyText: this.state.history.historyText.concat('Вы выпили ' + LiquidsArray[Math.floor(Math.random()*LiquidsArray.length)]),
            historyTime: this.state.history.historyTime.concat(new Date())
          }
        });
      }
      else if(commandArray[i].indexOf("отдохнуть") >= 0) {
        this.setState({ 
          hpBar: this.state.hpBar < 90 ? this.state.hpBar + Math.floor(Math.random() * 9) + 1 : 100,
          fatigueBar: this.state.fatigueBar >= 5 ? this.state.fatigueBar - 5 : 0,
          history: {
            commandType: this.state.history.commandType.concat('ОТДОХНУТЬ'),
            historyText: this.state.history.historyText.concat('Вы отдыхаете'),
            historyTime: this.state.history.historyTime.concat(new Date())
          }
        });
      }
      else if(commandArray[i].indexOf("работать") >= 0) {
        this.setState({ 
          thirstBar: this.state.thirstBar <= 70 ? this.state.thirstBar + Math.floor(Math.random() * 10) + 30 : 100,
          hungerBar: this.state.hungerBar <= 90 ? this.state.hungerBar + Math.floor(Math.random() * 10) + 10 : 100,
          fatigueBar: this.state.fatigueBar <= 95 ? this.state.fatigueBar + 5 : 100,
          history: {
            commandType: this.state.history.commandType.concat('РАБОТАТЬ'),
            historyText: this.state.history.historyText.concat('Вы работаете'),
            historyTime: this.state.history.historyTime.concat(new Date())
          }
        });
      }
      else {
        alert("Была введена некорректная команда!\nВведите одну из перечисленных команд:\n 1. \"ЕСТЬ\",\n 2. \"ПИТЬ\",\n 3. \"ОТДОХНУТЬ\",\n 4. \"РАБОТАТЬ\".\nРегистр команд не важен.");
      }
    }
  }

  handleOnclick(command: string) {
    this.setStateFunction(command);
  }

  handleCommandChange(commandText: string) {
    this.setState({ commandText: commandText });
    this.setStateFunction(commandText);
  }

  render() {
    return (
        <div>
          {isMobile && (
            <View style={{ flex: 1, flexDirection: 'column' }}>
              <View style={{ flex: 1, flexDirection: 'column' }}>
                <View style={{ 
                  width: width - 35,
                  height: 210,
                  margin: 20,
                  borderColor: '#D1D3D4',
                  borderStyle: 'solid',
                  borderWidth: 1 
                }}>
                  <Bars data={this.props.data} hpBar={this.state.hpBar} thirstBar={this.state.thirstBar} hungerBar={this.state.hungerBar} fatigueBar={this.state.fatigueBar} />
                </View>
                <View style={{
                  width: width - 35,
                  height: 210,
                  margin: 20,
                  borderColor: '#D1D3D4',
                  borderStyle: 'solid',
                  borderWidth: 1
                }}>
                  <Acts data={this.props.data} handleOnclick={this.handleOnclick} />
                </View>
              </View>
              <View style={{ width: width - 20 }}>
                <CommandField handleCommandChange={this.handleCommandChange} />
              </View>
              <View style={{ width: width - 35 }}>
                <Historylist history={this.state.history} />
              </View>
            </View>
          )} 
          {!isMobile && (<View style={{ flex: 1, flexDirection: 'column' }}>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ 
                  width: 400,
                  height: 210,
                  margin: 20,
                  borderColor: '#D1D3D4',
                  borderStyle: 'solid',
                  borderWidth: 1 
                }}>
                  <Bars data={this.props.data} hpBar={this.state.hpBar} thirstBar={this.state.thirstBar} hungerBar={this.state.hungerBar} fatigueBar={this.state.fatigueBar} />
                </View>
                <View style={{
                  width: 400,
                  height: 210,
                  margin: 20,
                  borderColor: '#D1D3D4',
                  borderStyle: 'solid',
                  borderWidth: 1
                }}>
                  <Acts data={this.props.data} handleOnclick={this.handleOnclick} />
                </View>
              </View>
              <View>
                <CommandField handleCommandChange={this.handleCommandChange} />
              </View>
              <View style={{ width: 834 }}>
                <Historylist history={this.state.history} />
              </View>
            </View>)}
        </div>     
    );
  }
}

export default App;


/* <div>
    <div style={{ display: 'flex' }}>
      <div className="BarItems">
        <Bars data={this.props.data} hpBar={this.state.hpBar} thirstBar={this.state.thirstBar} hungerBar={this.state.hungerBar} fatigueBar={this.state.fatigueBar} />
      </div>
      <div className="ActItems">
        <Acts data={this.props.data} handleOnclick={this.handleOnclick} />
      </div>
    </div>
    <div className="CommandsFieldItem">
      <CommandField handleCommandChange={this.handleCommandChange} />
    </div>
    <div className="HistoryListItem">
      <Historylist history={this.state.history} />
    </div>
  </div> */
