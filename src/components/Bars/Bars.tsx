import React from 'react';

class SingleBar extends React.Component<any> {
  render() {
    const item = this.props.item;
    const { bgcolor, labelName } = item;

    const completed = this.props.bar;

    const containerStyles = {
      height: 20,
      width: '90%',
      backgroundColor: 'white',
      margin: 20
    }

    const fillerStyles = {
      height: '100%',
      width: `${completed}%`,
      maxWidth: '100%',
      backgroundColor: bgcolor,
      borderRadius: 'inherit'   
    }

    const labelStyles = {
      padding: 5,
      color: 'black'
    }

    return (
      <div style={containerStyles}>    
        <span style={labelStyles}>{labelName}</span>  
        <div style={{ border: '1px solid black', height: '80%' }}>
          <div style={fillerStyles}></div>
        </div>
      </div>    
    );
  }
}

class Bars extends React.Component<any> {
  render() {
    const hpBar = this.props.hpBar;
    const thirstBar = this.props.thirstBar;
    const hungerBar = this.props.hungerBar;
    const fatigueBar = this.props.fatigueBar;

    const bars: any = [];

    this.props.data.forEach((item: any) => {
      if(item.labelName === "Здоровье") {
        bars.push(
          <SingleBar key={item.actTitle + '_bar'} item={item} bar={hpBar} />
        );      
      }
      else if(item.labelName === "Жажда") {
        bars.push(
          <SingleBar key={item.actTitle + '_bar'} item={item} bar={thirstBar} />
        );
      }
      else if(item.labelName === "Голод") {
        bars.push(
          <SingleBar key={item.actTitle + '_bar'} item={item} bar={hungerBar} />
        );
      }
      else {
        bars.push(
          <SingleBar key={item.actTitle + '_bar'} item={item} bar={fatigueBar} />
        );
      }
    });

    return (
      <div>{bars}</div>
    );
  }
}

export default Bars;
