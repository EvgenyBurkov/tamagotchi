import React from 'react';

class SingleBtn extends React.Component<any> {
  constructor(props: any) {
    super(props);
    this.handleOnclick = this.handleOnclick.bind(this);
  }

  handleOnclick(e: any) {
    this.props.handleOnclick(e.target.textContent);
  }

  render() {
    const { bgcolor, marginTop, btnTitle } = this.props;

    const containerStyles = {
      height: 30,
      width: '95%',
      backgroundColor: "white",
      margin: 10,
      marginTop: `${marginTop}px`
    }

    const btnStyles = {
      height: '100%',
      backgroundColor: bgcolor,
      color: 'white',
      borderRadius: 'inherit',
      width: '100%',
      cursor: 'pointer'
    }

    return (
      <div style={containerStyles}>    
        <button style={btnStyles} onClick={this.handleOnclick}>{btnTitle}</button>
      </div>    
    );
  }
}

class Acts extends React.Component<any> { 

  render() {
    const btns: any = [];

    this.props.data.forEach((item: any) => {
      btns.push(
        <SingleBtn key={item.actTitle + '_btn'} bgcolor={item.bgcolor} marginTop={item.marginTop} btnTitle={item.actTitle} handleOnclick={this.props.handleOnclick} />
      );
    });

    return (
      <div>    
        {btns}
      </div>    
    );
  }
}

export default Acts;
